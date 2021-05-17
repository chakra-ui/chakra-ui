/* eslint-disable react/static-property-placement */
import { nanoid } from "nanoid"
import { ref, subscribe } from "valtio"
import { proxyWithComputed as proxy } from "valtio/utils"
import { Dict, MaybeArray, StateMachine as S } from "./types"
import {
  INTERNAL_EVENTS,
  isArray,
  isFunction,
  isObject,
  isString,
  keys,
  MACHINE_TYPES,
  toArray,
  toEvent,
  toTarget,
  toTransition,
  toComputed,
  isGuardHelper,
} from "./utils"

export enum MachineStatus {
  NotStarted = "Not Started",
  Running = "Running",
  Stopped = "Stopped",
}

/**
 * Machine is used to create, interpret, and execute finite state machines.
 * It is inspired by XState, State Designer and Robot3.
 */
export class Machine<
  TContext extends Dict,
  TState extends string,
  TEvent extends S.EventObject = S.AnyEventObject
> {
  status: MachineStatus = MachineStatus.NotStarted
  state: S.State<TContext>
  config: S.MachineConfig<TContext, TState, TEvent>
  options: S.MachineOptions<TContext, TEvent> | undefined
  context: TContext
  id: string
  __type = MACHINE_TYPES.MACHINE

  // Cleanup function map (per state)
  private disposables = new Map<string, Set<VoidFunction>>()
  private afterEventsMap = new Map<string, any[]>()

  // For Parent <==> Spawned Actor relationship
  private parent?: Machine<any, any>
  private children = new Map<string, Machine<any, any>>()

  // A map of gaurd, action, delay implementations
  private guardsMap?: S.GuardsMap<TContext, TEvent>
  private actionsMap?: S.ActionsMap<TContext, TEvent>
  private delaysMap?: S.TimersMap<TContext, TEvent>

  // Let's get started!
  constructor(
    config: S.MachineConfig<TContext, TState, TEvent>,
    options?: S.MachineOptions<TContext, TEvent>,
  ) {
    this.options = options
    this.config = config
    this.id = config.id ?? `machine-${nanoid()}`
    const context = config.context ?? ({} as TContext)
    this.context = context
    this.state = proxy(
      {
        current: "",
        prev: "",
        event: "",
        context,
        done: false,
        tags: new Set<string>(),
        hasTag(tag: string): boolean {
          return this.tags.has(tag)
        },
        matches(value: string | string[]): boolean {
          return isArray(value)
            ? value.includes(this.current)
            : this.current === value
        },
      },
      {
        ...toComputed(options?.computed),
        nextEvents(self) {
          const stateEvents =
            (config.states as Dict)?.[self.current]?.["on"] ?? {}
          const globalEvents = config?.on ?? {}
          Object.assign(stateEvents, globalEvents)
          return keys(stateEvents).filter(
            (event) => event !== INTERNAL_EVENTS.SYNC,
          )
        },
        changed(self) {
          if (self.event === INTERNAL_EVENTS.INIT || !self.prev) return false
          return self.current !== self.prev
        },
      },
    )

    if (options?.guards) this.guardsMap = options.guards
    if (options?.actions) this.actionsMap = options.actions
    if (options?.delays) this.delaysMap = options.delays
  }

  // Starts the interpreted machine.
  start = () => {
    // Don't start if it's already running
    if (this.status === MachineStatus.Running) return

    this.status = MachineStatus.Running
    this.send(INTERNAL_EVENTS.INIT)
    return this
  }

  // Stops the interpreted machine
  stop = () => {
    // No need to call if already stopped
    if (this.status === MachineStatus.Stopped) return

    this.state.current = ""
    this.state.event = INTERNAL_EVENTS.STOP
    if (this.config.context) {
      this.state.context = this.config.context
    }
    // cleanups
    this.stopChildren()
    this.stopActivities()
    this.stopAfterEvents()

    this.status = MachineStatus.Stopped
    return this
  }

  private stopAfterEvents = () => {
    this.afterEventsMap.forEach((fns) => {
      fns.forEach((stop) => stop())
    })
    this.afterEventsMap.clear()
  }

  // Cleanup running activities (e.g `setInterval`, invoked callbacks, promises)
  private stopActivities = (key?: string) => {
    if (key) {
      this.disposables.get(key)?.forEach((cleanup) => cleanup())
      this.disposables.delete(key)
    } else {
      this.disposables.forEach((set) => {
        set.forEach((cleanup) => cleanup())
      })
      this.disposables.clear()
    }
  }

  // Stop and delete spawned children
  private stopChildren = () => {
    this.children.forEach((child) => child.stop())
    this.children.clear()
  }

  private setParent = (parent: any) => {
    this.parent = parent
  }

  spawn = (src: MachineSrc<any, any>, id = nanoid()) => {
    const actor = isFunction(src) ? src() : src
    actor.id = id
    actor.__type = MACHINE_TYPES.ACTOR
    actor.setParent(this)
    this.children.set(id, actor)
    return ref(actor)
  }

  private addCleanup = (key: string, cleanup: VoidFunction) => {
    if (!this.disposables.has(key)) {
      this.disposables.set(key, new Set([cleanup]))
    } else {
      this.disposables.get(key)?.add(cleanup)
    }
  }

  private assignState = (target: string) => {
    this.state.prev = this.state.current
    this.state.current = target
  }

  private assignTags = (next: S.StateInfo<TContext, TState, TEvent>) => {
    this.state.tags = new Set(next.stateNode?.tags ?? [])
  }

  subscribe = (listener: S.SubscribeFunction<TContext>) => {
    return subscribe(this.state, () => {
      this.context = this.state.context
      listener(this.state)
    })
  }

  /**
   * Used to create a new machine from existing machine
   * but with modified context.
   */
  withContext = (context: Partial<TContext>) => {
    const newContext = { ...this.config.context, ...context } as TContext
    return new Machine({ ...this.config, context: newContext }, this.options)
  }

  withConfig = (config: Partial<S.MachineConfig<TContext, TState, TEvent>>) => {
    return new Machine({ ...this.config, ...config }, this.options)
  }

  withOptions = (options: Partial<S.MachineOptions<TContext, TEvent>>) => {
    return new Machine(this.config, { ...this.options, ...options })
  }

  private isFinalState = (stateNode: S.StateNode<TContext, TState, TEvent>) => {
    return stateNode.type === "final"
  }

  private getStateConfig = (state: string) => {
    if (!state) return
    type StateConfig = S.StateNode<TContext, TState, TEvent>
    return (this.config.states as Dict)[state] as StateConfig
  }

  private getNextState = (
    event: TEvent,
    transitions: S.Transitions<TContext, TState, TEvent>,
  ) => {
    const transition = this.pickTransition(event, transitions)

    const stateNode = transition
      ? this.getStateConfig(transition.target ?? this.state.current)
      : undefined

    const isTransient = !!stateNode?.always

    return {
      transition,
      stateNode,
      hasTarget: !!transition,
      isTransient,
      target: transition?.target,
    }
  }

  /**
   * Check if a state has running activities. A state is considering to
   * have running activity if it defined `activities` or `every`
   */
  private hasActivities = (state: S.StateNode<TContext, TState, TEvent>) => {
    if (!state) return false
    return state.activities || state.every
  }

  /**
   * Delay can be specified as:
   * - a string (reference to `options.delays`)
   * - a number (in ms)
   * - a function that returns a number (in ms)
   *
   * Let's resolve this to a number
   */
  private determineDelay = (
    delay: S.Delay<TContext, TEvent> | undefined,
    event: TEvent,
  ) => {
    if (typeof delay === "number") {
      return delay
    }

    if (isFunction(delay)) {
      return delay(this.state.context, event)
    }

    if (isString(delay)) {
      if (this.delaysMap) {
        const value = this.delaysMap?.[delay]
        return isFunction(value) ? value(this.state.context, event) : value
      }
      return Number(delay)
    }

    return delay
  }

  /**
   * Guards or conditions can be specified as:
   * - a string (reference to `options.guards`)
   * - a function that returns a number (in ms)
   */
  private determineGuard = (
    cond: S.Condition<TContext, TEvent> | undefined,
  ) => {
    if (isString(cond)) {
      return this.guardsMap?.[cond]
    }
    if (isGuardHelper(cond)) {
      return cond.exec(this.guardsMap ?? {})
    }
    return cond
  }

  /**
   * A transition is an object that describes the next state, or/and actions
   * that should run when an event is sent.
   *
   * Transitions can be specified as:
   * - A single string: "spinning"
   * - An object with `target`, `actions`, or `cond`: { target: "spinning", actions: [...], cond: isValid }
   * - An array of possible transitions. In this case, we'll pick the first matching transition
   * depending on the `cond` specified
   */
  private pickTransition = (
    event: TEvent,
    transitions?: S.Transitions<TContext, TState, TEvent>,
  ): S.TransitionDefinitionWithDelay<TContext, TState, TEvent> | undefined => {
    type TransitionDfn = S.TransitionDefinition<TContext, TState, TEvent>

    return toArray(transitions).find((t) => {
      // convert to transition object, if it's a string
      const transition = toTarget(t) as TransitionDfn
      // get condition function
      const cond = this.determineGuard(transition.cond)
      return (
        cond?.(this.state.context, event) ??
        transition.target ??
        transition.actions
      )
    })
  }

  /**
   * All `after` events leverage `setTimeout` and `clearTimeout`,
   * we invoke the `clearTimeout` on exit and `setTimeout` on entry.
   *
   * To achieve this, we split the after into `entry` and `exit` functions and
   * append them to the normal `entry` and `exit` actions
   */
  private convertAfterToActions = (state: string) => {
    type DelayedTransition = S.TransitionDefinitionWithDelay<
      TContext,
      TState,
      TEvent
    >

    const event = toEvent(INTERNAL_EVENTS.AFTER) as TEvent
    const { after } = this.getStateConfig(state) ?? {}

    if (!after) return

    const entries: any[] = []
    const exits: any[] = []

    const toActions = (transition: DelayedTransition) => {
      // get the computed delay
      const delay = this.determineDelay(transition.delay, event) ?? 0

      let id: any

      return {
        entry: () => {
          id = setTimeout(() => {
            const next = this.getNextState(event, transition)
            const current = this.getStateConfig(this.state.current)
            if (current) {
              this.performTransitionSideEffects(current, next, event)
            }
          }, delay)
        },
        exit: () => {
          clearTimeout(id)
        },
      }
    }

    if (isArray(after)) {
      const transition = this.pickTransition(event, after)
      if (!transition) return

      const t = isString(transition)
        ? ({ target: transition } as DelayedTransition)
        : transition

      const { entry, exit } = toActions(t)

      entries.push(entry)
      exits.push(exit)
    } else if (isObject(after)) {
      for (const delay in after) {
        const transition = after[delay]
        let _transition: DelayedTransition

        if (isArray(transition)) {
          const picked = this.pickTransition(event, transition)
          if (picked) _transition = picked
        } else if (isString(transition)) {
          _transition = { target: transition, delay }
        } else {
          _transition = { ...transition, delay }
        }

        //@ts-ignore
        const { entry, exit } = toActions(_transition)
        entries.push(entry)
        exits.push(exit)
      }
    }

    return { entries, exits }
  }

  /**
   * Function to executes defined actions. It can accept actions as string
   * (referencing `options.actionsMap`) or actual functions.
   */
  private executeActions = (
    event: TEvent,
    actions?: S.Actions<TContext, TEvent>,
  ) => {
    if (!actions) return
    actions = toArray(actions)
    for (const action of actions) {
      const fn = isString(action) ? this.actionsMap?.[action] : action
      fn?.(this.state.context, event)
    }
  }

  /**
   * Function to execute running activities and registers
   * their cleanup function internally (to be called later on when we exit the state)
   */
  private executeActivities = (
    event: TEvent,
    activities: S.Activities<TContext, TEvent>,
  ) => {
    if (isArray(activities)) {
      for (const activity of activities) {
        const cleanup = activity(this.state.context, event)
        this.addCleanup(this.state.current, cleanup)
      }
    } else {
      const cleanup = activities?.(this.state.context, event)
      this.addCleanup(this.state.current, cleanup)
    }
  }

  /**
   * Normalizes the `every` definition to object transition. Every transitions
   * can be:
   * - An array of possible actions to run (we need to pick the first match based on cond)
   * - An object of intervals and actions
   */
  private createEveryActivities = (
    every: S.StateNode<TContext, TState, TEvent>["every"],
    iterator: (activity: S.Activity<TContext, TEvent>) => void,
  ) => {
    if (!every) return
    const event = toEvent(INTERNAL_EVENTS.EVERY) as TEvent

    // every: [{ interval: 2000, actions: [...], cond: "isValid" },  { interval: 1000, actions: [...] }]
    if (isArray(every)) {
      // picked = { interval: string | number | <ref>, actions: [...], cond: ... }
      const picked = toArray(every).find((t) => {
        t.interval = this.determineDelay(t.interval, event)
        const cond = t.cond ? this.determineGuard(t.cond) : undefined
        return cond?.(this.state.context, event) ?? t.interval
      })

      if (!picked) return

      const ms = this.determineDelay(picked.interval, event) ?? 0

      const activity = (_: TContext, event: TEvent) => {
        const id = setInterval(() => {
          this.executeActions(event, picked.actions)
        }, ms)
        return () => clearInterval(id)
      }
      iterator(activity)
    } else {
      // every = { 1000: [fn, fn] | fn, [ref]: fn }
      for (const interval in every) {
        const actions = every?.[interval]

        // interval could be a `ref` not the actual interval value, let's determine the actual value
        const ms = this.determineDelay(interval, event) ?? 0

        // create the activity to run for each `every` reaction
        const activity = (_: TContext, event: TEvent) => {
          const id = setInterval(() => {
            this.executeActions(event, actions)
          }, ms)
          return () => clearInterval(id)
        }
        iterator(activity)
      }
    }
  }

  private setEvent = (event: TEvent) => {
    const eventType = toEvent(event).type
    this.state.event =
      eventType === INTERNAL_EVENTS.SYNC
        ? [this.state.event, INTERNAL_EVENTS.SYNC].join(" > ")
        : eventType
  }

  /**
   * Performs all the requires side-effects or reactions when
   * we move from state A => state B.
   *
   * The Effect order:
   * Exit actions (current state) => Transition actions  => Go to state => Entry actions (next state)
   */
  private performTransitionSideEffects = (
    current: S.StateNode<TContext, TState, TEvent> | undefined,
    next: S.StateInfo<TContext, TState, TEvent>,
    event: TEvent,
  ) => {
    this.setEvent(event)
    next.target = next.target ?? this.state.current

    const changed = next.target !== this.state.current
    const go = (next: any): next is { target: any } => changed && next.target

    if (go(next)) {
      // get explicit exit and implicit "after.exit" actions for current state
      const exitActions = toArray(current?.exit)
      const afterExitActions = this.afterEventsMap.get(this.state.current)
      if (afterExitActions) {
        exitActions.push(...afterExitActions)
      }

      // call all exit actions for current state
      this.executeActions(event, exitActions)

      // cleanup activities for current state
      if (current && this.hasActivities(current)) {
        this.stopActivities(this.state.current)
      }
    }

    // execute transition actions
    this.executeActions(event, next?.transition?.actions)

    // go to next state
    this.assignState(next.target)
    this.assignTags(next)

    if (go(next)) {
      // get all entry actions
      const entryActions = toArray(next.stateNode?.entry)
      const afterActions = this.convertAfterToActions(next.target)

      if (next.stateNode?.after && afterActions) {
        this.afterEventsMap.set(next.target, afterActions?.exits)
        entryActions.push(...afterActions.entries)
      }

      // execute entry actions for next state
      this.executeActions(event, entryActions)

      // execute activities for next state
      const activities = toArray(next.stateNode?.activities)

      // if `every` is defined, create an activity and append to activities
      this.createEveryActivities(next.stateNode?.every, (activity) => {
        activities.unshift(activity)
      })

      if (activities.length > 0) {
        this.executeActivities(event, activities)
      }

      if (next.stateNode && this.isFinalState(next.stateNode)) {
        this.state.done = true
      }
    }
  }

  /**
   * Check if the next state is transient and updates the
   * next state to go to target of transient state.
   */
  private checkTransient = (
    next: S.StateInfo<TContext, TState, TEvent>,
    event: TEvent,
  ) => {
    if (!next.stateNode?.always) return next

    type TransitionDfn = S.TransitionDefinition<TContext, TState, TEvent>
    const dfn = next.stateNode.always
    const transition = toTransition(dfn, null) as MaybeArray<TransitionDfn>

    const _transition = isArray(transition)
      ? this.pickTransition(event, transition)
      : transition

    if (_transition?.target) {
      next = this.getNextState(event, _transition)
    }

    if (!_transition?.target && _transition?.actions) {
      // execute transient actions
      const cond = this.determineGuard(_transition.cond) || (() => true)
      if (cond(this.state.context, event)) {
        this.executeActions(event, _transition.actions)
      }
    }

    return next
  }

  /**
   * Function to send event to parent machine from spawned child
   */
  sendParent = (evt: Event) => {
    const event = toEvent(evt) as S.EventWithSrc
    event.src = INTERNAL_EVENTS.SEND_PARENT
    this.parent?.send(event)
  }

  /**
   * Function to send event to spawned child machine or actor
   */
  sendChild = (evt: Event, to: string | ((ctx: TContext) => string)) => {
    const event = toEvent(evt)
    const id = typeof to === "function" ? to(this.state.context) : to
    const child = this.children.get(id)
    child?.send(event)
  }

  /**
   * Function to stop a running child machine or actor
   */
  stopChild = (child: Machine<any, any>) => {
    if (this.children.has(child.id)) {
      child.stop()
      this.children.delete(child.id)
    }
  }

  /**
   * Function to send an event to current machine
   */
  send = (evt: string | TEvent) => {
    const event = toEvent(evt) as TEvent
    const isInit = event.type === INTERNAL_EVENTS.INIT
    const stateNode = this.getStateConfig(this.state.current)

    if (isInit) {
      let next = this.getNextState(event, { target: this.config.initial })
      //@ts-ignore
      next = this.checkTransient(next, event)
      this.performTransitionSideEffects(stateNode, next, event)
    } else {
      this.transition(stateNode, event)
    }
  }

  transition = (
    stateNode: S.StateNode<TContext, TState, TEvent> | undefined,
    evt: TEvent | string,
  ) => {
    type TransitionDfn = S.TransitionDefinition<TContext, TState, TEvent>

    const event = toEvent(evt) as TEvent
    if (!stateNode && !this.config.on) {
      console.warn("[machine]: state doesn't have a definition")
      return
    }

    const _transition =
      stateNode?.on?.[event.type] ?? this.config.on?.[event.type]

    const transition = toTransition(_transition, this.state.current)
    if (!transition) {
      console.warn("[machine]: Could not determine transition")
      return
    }

    let next = this.getNextState(event, transition as TransitionDfn)
    //@ts-ignore
    next = this.checkTransient(next, event)
    this.performTransitionSideEffects(stateNode, next, event)
    return next.stateNode
  }
}

export type MachineSrc<
  C extends Dict,
  S extends string,
  E extends S.EventObject = S.AnyEventObject
> = Machine<C, S, E> | (() => Machine<C, S, E>)
