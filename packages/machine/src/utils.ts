import { Dict, StateMachine as S } from "./types"

export const isString = (value: any): value is string =>
  typeof value === "string"

export const isArray = (value: any): value is any[] => Array.isArray(value)

export const isObject = (value: any): value is Dict =>
  value != null && typeof value === "object" && !isArray(value)

export const isFunction = (value: any): value is Function =>
  typeof value === "function"

export const keys = <T extends Record<string, any>>(value: T) =>
  Object.keys(value) as string[]

export const toArray = (v: any | any[] = []) => (isArray(v) ? v : [v])

export function executeActions<
  TContext extends Dict,
  TEvent extends S.EventObject
>(context: TContext, event: TEvent, actions?: S.Actions<TContext, TEvent>) {
  if (!actions) return
  actions = toArray(actions)
  for (const action of actions) {
    action(context, event)
  }
}

export function toEvent<T extends string | S.Event>(event: T) {
  return isString(event) ? ({ type: event } as S.EventObject) : event
}

export function toTarget<T extends string | { target?: string }>(target: T) {
  return isString(target) ? { target } : target
}

export function toTransition<
  TContext extends Dict,
  TState extends string,
  TEvent extends S.EventObject
>(
  transition: S.Transitions<TContext, TState, TEvent> | undefined,
  currentState?: string,
) {
  const _transition = isString(transition) ? toTarget(transition) : transition

  const check = (t: S.TransitionDefinition<TContext, string, TEvent>) => {
    const isTargetless = t.actions && !t.target
    if (isTargetless && currentState) t.target = currentState
    return t
  }

  if (isArray(_transition)) {
    return _transition.map(check)
  }

  if (isObject(_transition)) {
    return check(_transition)
  }
}

export function pickTarget<
  TContext extends Dict,
  TState extends string,
  TEvent extends S.EventObject
>(
  context: Dict,
  event: TEvent,
  transitions?: S.Transitions<TContext, TState, TEvent>,
): S.TransitionDefinitionWithDelay<TContext, TState, TEvent> | undefined {
  return toArray(transitions).find((t) => {
    const transition = toTarget(t)
    return transition.cond?.(context, event) ?? transition.target
  })
}

export function createEveryActivities<
  TContext extends Dict,
  TState extends string,
  TEvent extends S.EventObject
>(
  every: S.StateNode<TContext, TState, TEvent>["every"],
  iterator: (activity: S.Activity<TContext, TEvent>) => void,
) {
  if (!every) return
  for (const timeout in every) {
    const activity = (context: TContext, event: TEvent) => {
      const actions = every?.[timeout]
      const id = setInterval(() => {
        executeActions(context, event, actions as S.Actions<TContext, TEvent>)
      }, +timeout)
      return () => clearInterval(id)
    }
    iterator(activity)
  }
}

export function executeActivities<
  TContext extends Dict,
  TEvent extends S.EventObject
>(
  context: TContext,
  event: TEvent,
  activities: S.Activities<TContext, TEvent>,
  iterator: (fn: VoidFunction) => void,
) {
  if (isArray(activities)) {
    for (const activity of activities) {
      const fn = activity(context, event)
      iterator(fn)
    }
  } else {
    const fn = activities?.(context, event)
    iterator(fn)
  }
}
