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

export const toArray = <T>(v: T | T[] = []) => (isArray(v) ? v : [v])

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
  currentState?: string | null,
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

export const INTERNAL_EVENTS = {
  INIT: "machine.init",
  AFTER: "machine.after",
  EVERY: "machine.every",
  SEND_PARENT: "machine.sendParent",
  STOP: "machine.stop",
}

export const MACHINE_TYPES = {
  MACHINE: "machine",
  ACTOR: "machine.actor",
}
