/* eslint-disable react/static-property-placement */
import { nanoid } from "nanoid"
import { ref, subscribe } from "valtio"
import { proxyWithComputed as proxy } from "valtio/utils"
import { Dict, StateMachine as S } from "./types"
import {
  isArray,
  isObject,
  isString,
  keys,
  pickTarget,
  toArray,
  toEvent,
  isFunction,
  executeActions,
  createEveryActivities,
  executeActivities,
  toTransition,
} from "./utils"

const INTERNAL_EVENTS = {
  INIT: "machine.init",
  AFTER: "machine.after",
  EVERY: "machine.every",
  SEND_PARENT: "machine.sendParent",
  STOP: "machine.stop",
}

const MAHCINE_TYPES = {
  MACHINE: "machine",
  ACTOR: "machine.actor",
}

export class Machine<
  TContext extends Dict,
  TState extends string,
  TEvent extends S.EventObject = S.AnyEventObject
> {
  state: S.ProxyState<TContext>
  config: S.MachineConfig<TContext, TState, TEvent>
  context: TContext
  id: string
  parent?: Machine<any, any>
  __type = "machine"
  disposables = new Map<string, Set<VoidFunction>>()
  children = new Map<string, Machine<any, any>>()

  guardsMap?: S.GuardsMap<TContext, TEvent>
  actionsMap?: S.ActionsMap<TContext, TEvent>
  delaysMap?: S.DelaysMap<TContext, TEvent>

  spawn = (src: MachineSrc<any, any>, id = nanoid()) => {
    const actor = isFunction(src) ? src() : src
    actor.id = id
    actor.__type = MAHCINE_TYPES.ACTOR
    actor.setParent(this)
    this.children.set(id, actor)
    return ref(actor)
  }

  constructor(
    config: S.MachineConfig<TContext, TState, TEvent>,
    opts?: S.MachineOptions<TContext, TEvent>,
  ) {
    this.config = config
    this.id = config.id ?? nanoid()
    const context = config.context ?? ({} as TContext)
    this.context = context
    this.state = proxy(
      {
        current: "",
        prev: "",
        event: "",
        context,
        done: false,
        matches(value: string) {
          return this.current === value
        },
      },
      {
        ...config.computed,
        nextEvents(self) {
          const omitTransient = (action: string) => action !== ""
          return keys(
            (config.states as Dict)[self.current]?.["on"] ?? {},
          ).filter(omitTransient)
        },
        changed(self) {
          if (self.event === INTERNAL_EVENTS.INIT) return false
          return self.current !== self.prev
        },
      },
    )

    if (opts?.guards) this.guardsMap = opts.guards
    if (opts?.actions) this.actionsMap = opts.actions
    if (opts?.delays) this.delaysMap = opts.delays
  }

  setParent = (parent: any) => {
    this.parent = parent
  }

  start = () => {
    this.send({ type: INTERNAL_EVENTS.INIT })
  }

  cleanupActivities = (key?: string) => {
    const d = this.disposables
    if (key) {
      d.get(key)?.forEach((fn) => fn())
      d.delete(key)
    } else {
      d.forEach((set) => set.forEach((fn) => fn()))
      d.clear()
    }
  }

  addCleanup = (key: string, cleanup: VoidFunction) => {
    const d = this.disposables
    if (!d.has(key)) {
      d.set(key, new Set([cleanup]))
    } else {
      d.get(key)?.add(cleanup)
    }
  }

  cleanupChildren = () => {
    this.children.forEach((child) => {
      child.stop()
    })
    this.children.clear()
  }

  stop = () => {
    this.state.current = ""
    this.state.event = INTERNAL_EVENTS.STOP
    this.cleanupChildren()
    this.cleanupActivities()
  }

  setNextTarget = (target: string, event: TEvent) => {
    this.state.prev = this.state.current
    this.state.current = target
    this.state.event = toEvent(event).type
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
  withContext = <TTContext extends TContext>(context: TTContext) => {
    return new Machine({ ...this.config, context })
  }

  isFinalState = (stateNode: S.StateNode<TContext, TState, TEvent>) => {
    return stateNode.type === "final"
  }

  getStateConfig = (state: string) => {
    return (this.config.states as Dict)[state] as S.StateNode<
      TContext,
      TState,
      TEvent
    >
  }

  getNextState = (
    event: TEvent,
    transitions: S.Transitions<TContext, TState, TEvent>,
  ) => {
    const transition = pickTarget(this.state.context, event, transitions)
    const stateNode = transition
      ? this.getStateConfig(transition.target ?? this.state.current)
      : undefined

    // check and execute transient state
    const isTransient = stateNode?.on ? keys(stateNode.on).includes("") : false

    return {
      transition,
      stateNode,
      hasTarget: !!transition,
      isTransient,
      target: transition?.target,
    }
  }

  hasActivities = (state: S.StateNode<TContext, TState, TEvent>) => {
    if (!state) return false
    return state.activities || state.every || state.after
  }

  createAfterActions = (state: string) => {
    const event = { type: INTERNAL_EVENTS.AFTER } as TEvent
    const { after } = this.getStateConfig(state) ?? {}
    if (!after) return

    const entries: any[] = []
    const exits: any[] = []

    const makeActions = (
      transition: S.TransitionDefinitionWithDelay<TContext, TState, TEvent>,
    ) => {
      const delay =
        typeof transition.delay === "function"
          ? transition.delay(this.state.context, event)
          : transition.delay

      let id: any
      return {
        entry: () => {
          id = setTimeout(() => {
            const next = this.getNextState(event, transition)
            const current = this.getStateConfig(this.state.current)
            this.sideEffects(current, next, event)
          }, Number(delay ?? 0))
        },
        exit: () => {
          clearTimeout(id)
        },
      }
    }

    if (isArray(after)) {
      const transition = pickTarget(this.state.context, event, after)
      if (!transition) return

      const t = isString(transition) ? { target: transition } : transition
      const { entry, exit } = makeActions(t as any)

      entries.push(entry)
      exits.push(exit)
    } else if (isObject(after)) {
      for (const delay in after) {
        const transition = after[delay]

        type TransitionDelay = S.TransitionDefinitionWithDelay<
          TContext,
          TState,
          TEvent
        >

        let target: TransitionDelay

        if (isArray(transition)) {
          const picked = pickTarget(this.state.context, event, transition)
          if (picked) target = picked
        } else if (isString(transition)) {
          target = { target: transition, delay } as TransitionDelay
        } else {
          target = { ...transition, delay }
        }

        //@ts-ignore
        const { entry, exit } = makeActions(target)
        entries.push(entry)
        exits.push(exit)
      }
    }

    return { entries, exits }
  }

  sideEffects = (
    current: S.StateNode<TContext, TState, TEvent>,
    next: S.NextStateDefinition<TContext, TState, TEvent>,
    event: TEvent,
  ) => {
    /**
     * Effect Order:
     * 1. exit reaction
     * 2. transition reaction
     * 3. go to state
     * 4. enter reaction
     */

    // If no target is defined in transition, use the current state
    if (!next.target) {
      next.target = this.state.current
    }

    const changed = next.target !== this.state.current

    const proceed = (next: any): next is { target: any } =>
      changed && next.target

    const afterActions = this.createAfterActions(next.target)

    if (proceed(next)) {
      // get all exit actions
      const exitActions = toArray(current?.exit)

      /**
       * All `after` events leverage `setTimeout` and `clearTimeout`,
       * we invoke the `clearTimeout` on exit and `setTimeout` on entry.
       *
       * To achieve this, we split the after into `entry` and `exit` functions and
       * append them to the normal `entry` and `exit` actions
       */
      if (next.stateNode?.after && afterActions) {
        exitActions.push(...afterActions.exits)
      }

      // call all transition actions (or side-effects)
      executeActions(this.state.context, event, exitActions)

      // cleanup activities for current state
      if (this.hasActivities(current)) {
        this.cleanupActivities(this.state.current)
      }
    }

    // execute transition actions specified for current state
    executeActions(this.state.context, event, next?.transition?.actions)

    if (proceed(next)) {
      // assign next state
      this.setNextTarget(next.target, event)

      // execute entry actions for next state
      const entryActions = toArray(next.stateNode?.entry)

      if (next.stateNode?.after && afterActions) {
        entryActions.push(...afterActions.entries)
      }

      executeActions(this.state.context, event, entryActions)

      // execute activities for next state
      const activities = toArray(next.stateNode?.activities)

      // if `every` is defined, create an activity and append to activities
      createEveryActivities(next.stateNode?.every, (activity) => {
        activities.unshift(activity)
      })

      if (activities.length > 0) {
        executeActivities(this.state.context, event, activities, (cleanup) =>
          this.addCleanup(this.state.current, cleanup),
        )
      }

      if (next.stateNode && this.isFinalState(next.stateNode)) {
        this.state.done = true
      }
    }
  }

  checkTransient = (
    next: S.NextStateDefinition<TContext, TState, TEvent>,
    event: TEvent,
  ) => {
    if (next.isTransient) {
      const t = next.stateNode?.on?.[""]
      const transition = toTransition(t, this.state.current)
      if (transition) {
        //@ts-ignore
        next = this.getNextState(event, transition)
      }
    }
    return next
  }

  sendParent = (evt: Event) => {
    const event = toEvent(evt) as S.EventWithSrc
    event.src = INTERNAL_EVENTS.SEND_PARENT
    this.parent?.send(event)
  }

  sendChild = (evt: Event, to: any) => {
    const event = toEvent(evt)
    const _to = typeof to === "function" ? to(this.state.context) : to
    const actor = this.children.get(_to)
    actor?.send(event)
  }

  stopChild = (actor: any) => {
    if (this.children.has(actor.id)) {
      actor.stop()
      this.children.delete(actor.id)
    }
  }

  send = <TEvent extends S.EventObject>(evt: TEvent) => {
    const { initial } = this.config
    const event = toEvent(evt) as any
    const isInit = event.type === INTERNAL_EVENTS.INIT
    const stateNode = this.getStateConfig(this.state.current)

    if (isInit && typeof initial === "string") {
      let next = this.getNextState(event, { target: initial })
      //@ts-ignore
      next = this.checkTransient(next, event)
      this.sideEffects(stateNode, next, event)
    } else {
      if (!stateNode) {
        console.warn(
          `State definition does not exist for state: \`${this.state.current}\``,
        )
        return
      }

      const _transition = stateNode.on?.[event.type]
      const transition = toTransition(_transition, this.state.current)
      if (!transition) return
      let next = this.getNextState(event, transition as any)
      //@ts-ignore
      next = this.checkTransient(next, event)
      this.sideEffects(stateNode, next, event)
    }
  }
}

type MachineSrc<
  C extends Dict,
  S extends string,
  E extends S.EventObject = S.AnyEventObject
> = Machine<C, S, E> | (() => Machine<C, S, E>)

export const createMachine = <
  C extends Dict,
  S extends string,
  E extends S.EventObject = S.AnyEventObject
>(
  config: S.MachineConfig<C, S, E>,
) => new Machine(config)

type State = "idle" | "loading"
type Context = { value: number }

export const counter = createMachine<Context, State>({
  id: "counter",
  states: {
    idle: {
      after: {
        3000: "loading",
      },
      on: {
        INC: "loading",
        DEC: {
          actions: (ctx) => {
            ctx.value++
          },
        },
      },
    },
    loading: {},
  },
})
