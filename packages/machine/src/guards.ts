import { Dict, StateMachine } from "./types"

function or<TContext extends Dict, TEvent extends StateMachine.EventObject>(
  ...conditions: Array<string | StateMachine.ConditionHelper<TContext, TEvent>>
): StateMachine.ConditionHelper<TContext, TEvent> {
  return {
    exec: (guards: Dict) => (ctx: TContext, event: TEvent) =>
      conditions.some((condition) => {
        if (typeof condition === "string") {
          return guards[condition]?.(ctx, event)
        }
        return condition.exec(guards)(ctx, event)
      }),
  }
}

function and<TContext extends Dict, TEvent extends StateMachine.EventObject>(
  ...conditions: Array<string | StateMachine.ConditionHelper<TContext, TEvent>>
): StateMachine.ConditionHelper<TContext, TEvent> {
  return {
    exec: (guards: Dict) => (ctx: TContext, event: TEvent) =>
      conditions.every((condition) => {
        if (typeof condition === "string") {
          return guards[condition]?.(ctx, event)
        }
        return condition.exec(guards)(ctx, event)
      }),
  }
}

function not<TContext extends Dict, TEvent extends StateMachine.EventObject>(
  condition: string | StateMachine.ConditionHelper<TContext, TEvent>,
): StateMachine.ConditionHelper<TContext, TEvent> {
  return {
    exec: (guards: Dict) => (ctx: TContext, event: TEvent) => {
      if (typeof condition === "string") {
        return !guards[condition]?.(ctx, event)
      }
      return !condition.exec(guards)(ctx, event)
    },
  }
}

export const guards = { or, and, not }
