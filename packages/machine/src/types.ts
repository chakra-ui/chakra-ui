export type Dict<T = any> = Record<string, T>
export type MaybeArray<T> = T | T[]
export type CleanupFunction = () => void

export declare namespace StateMachine {
  export type EventObject = {
    type: string
  }

  export type Event = string | EventObject
  export type EventWithSrc = EventObject & { src?: any }

  type Expression<
    TContext extends Dict,
    TEvent extends EventObject,
    TReturn
  > = (context: TContext, event: TEvent) => TReturn

  export interface AnyEventObject extends EventObject {
    [key: string]: any
  }

  export type Action<TContext extends Dict, TEvent extends EventObject> =
    | string
    | Expression<TContext, TEvent, void>

  export type Actions<
    TContext extends Dict,
    TEvent extends EventObject
  > = MaybeArray<Action<TContext, TEvent>>

  export type TransitionDefinition<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > = {
    target?: TState
    actions?: Actions<TContext, TEvent>
    cond?: string | Expression<TContext, TEvent, boolean>
  }

  export type TransitionDefinitionWithDelay<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > = TransitionDefinition<TContext, TState, TEvent> & {
    delay?: Delay<TContext, TEvent>
  }

  export type Delay<TContext extends Dict, TEvent extends EventObject> =
    | string
    | number
    | Expression<TContext, TEvent, number>

  export type Transition<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > = TState | TransitionDefinition<TContext, TState, TEvent>

  export type Activity<
    TContext extends Dict,
    TEvent extends EventObject
  > = Expression<TContext, TEvent, CleanupFunction>

  export type Activities<
    TContext extends Dict,
    TEvent extends EventObject
  > = MaybeArray<Activity<TContext, TEvent>>

  export type Transitions<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > =
    | Transition<TContext, TState, TEvent>
    | MaybeArray<TransitionDefinition<TContext, TState, TEvent>>

  export type AfterTransitions<
    TContext,
    TState extends string,
    TEvent extends EventObject
  > =
    | Record<
        string | number,
        TState | MaybeArray<TransitionDefinition<TContext, TState, TEvent>>
      >
    | Array<
        TransitionDefinition<TContext, TState, TEvent> & {
          delay: number | string | Expression<TContext, TEvent, number>
        }
      >

  export type ExtractEvent<
    TEvent extends EventObject,
    K
  > = K extends TEvent["type"] ? Extract<TEvent, { type: K }> : EventObject

  export type TransitionDefinitionMap<
    TContext,
    TState extends string,
    TEvent extends EventObject
  > = {
    [K in TEvent["type"]]?:
      | TState
      | MaybeArray<
          TransitionDefinition<TContext, TState, ExtractEvent<TEvent, K>>
        >
  }

  export interface StateNode<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > {
    type?: "final"
    /**
     * The activities to be started upon entering the state node,
     * and stopped upon exiting the state node.
     */
    activities?: Activities<TContext, TEvent>
    /**
     * The mapping of event types to their potential transition(s).
     */
    on?: TransitionDefinitionMap<TContext, TState, TEvent>
    /**
     * The action(s) to be executed upon entering the state node.
     */
    entry?: Actions<TContext, TEvent>
    /**
     * The action(s) to be executed upon exiting the state node.
     */
    exit?: Actions<TContext, TEvent>
    /**
     * The mapping (or array) of delays (in `ms`) to their potential transition(s) to run after
     * the specified delay. Uses `setTimeout` under the hood.
     */
    after?: AfterTransitions<TContext, TState, TEvent>
    /**
     * An eventless transition that is always taken when this state is active.
     */
    always?: MaybeArray<TransitionDefinition<TContext, TState, TEvent>>
    /**
     * The mapping (or array) of intervals (in `ms`) to their potential actions(s) to run at interval.
     *  Uses `setInterval` under the hood.
     */
    every?:
      | Record<string | number, Actions<TContext, TEvent>>
      | Array<{
          interval?: number | string | Expression<TContext, TEvent, number>
          actions: Actions<TContext, TEvent>
          cond?: string | Expression<TContext, TEvent, boolean>
        }>
  }

  export type Condition<TContext extends Dict, TEvent extends EventObject> =
    | string
    | Expression<TContext, TEvent, boolean>

  export interface MachineConfig<
    TContext extends Dict,
    TState,
    TEvent extends EventObject
  > {
    /**
     * The unique identifier for the invoked machine.
     */
    id?: string
    /**
     * The extended state used to store `data` for your machine
     */
    context?: TContext
    /**
     * The initial state to start with
     */
    initial?: TState
    /**
     * The mapping of state node keys to their state node configurations (recursive).
     */
    //@ts-expect-error
    states?: Partial<Record<TState, StateNode<TContext, TState, TEvent>>>
    /**
     * The `id` of the parent machine for this
     */
    parent?: string
    //@ts-expect-error
    on?: TransitionDefinitionMap<TContext, TState, TEvent>
  }

  export type SubscribeFunction<TContext> = (state: State<TContext>) => void

  export interface State<TContext extends Dict> {
    current: string
    prev: string
    event: string
    context: TContext
    done: boolean
    matches(value: string | string[]): boolean
    nextEvents: string[]
    changed: boolean
    // Useful for computed properties
    [key: string]: any
  }

  export interface StateInfo<
    TContext extends Dict,
    TState extends string,
    TEvent extends EventObject
  > {
    transition: TransitionDefinition<TContext, TState, TEvent> | undefined
    stateNode: StateNode<TContext, TState, TEvent> | undefined
    hasTarget: boolean
    isTransient: boolean
    target: string | undefined
  }

  export type ActionsMap<
    TContext extends Dict,
    TEvent extends EventObject
  > = Record<string, Exclude<Action<TContext, TEvent>, string>>

  export type GuardsMap<
    TContext extends Dict,
    TEvent extends EventObject
  > = Record<string, Expression<TContext, TEvent, boolean>>

  export type TimersMap<TContext extends Dict, TEvent extends EventObject> = {
    [delay: string]: number | Expression<TContext, TEvent, number>
  }

  export interface MachineOptions<
    TContext extends Dict,
    TEvent extends EventObject
  > {
    /**
     * The computed value to derive from the current context
     */
    computed?: Dict<(context: TContext) => any>
    guards?: GuardsMap<TContext, TEvent>
    actions?: ActionsMap<TContext, TEvent>
    delays?: TimersMap<TContext, TEvent>
  }
}
