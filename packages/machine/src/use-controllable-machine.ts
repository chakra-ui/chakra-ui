import React from "react"
import { createMachine } from "./create-machine"
import { Machine } from "./machine"
import { StateMachine } from "./types"
import { useMachine } from "./use-machine"
import { INTERNAL_EVENTS } from "./utils"

const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const mounted = React.useRef(false)
  React.useEffect(() => {
    if (mounted.current) {
      return effect()
    }
    mounted.current = true
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

type Extend<C extends { value: any }> = C & {
  setValue?: (nextValue: C["value"]) => void
}

export const createControllableMachine = <
  C extends { value: any },
  S extends string,
  E extends StateMachine.EventObject = StateMachine.AnyEventObject
>(
  config: StateMachine.MachineConfig<Extend<C>, S, E>,
  opts?: StateMachine.MachineOptions<Extend<C>, E>,
) =>
  createMachine<Extend<C>, S, E>(
    {
      ...config,
      on: {
        ...config.on,
        [INTERNAL_EVENTS.SYNC]: {
          actions: (ctx: Extend<C>, event: { value: any }) => {
            ctx.value = event.value
          },
        },
      },
    },
    opts,
  )

/**
 * Takes a machine that has `value` in its context and makes it controllable
 * by handling `value`, `defaultValue` and `onChange`
 */

export const useControllableMachine = <
  C extends Extend<{ value: any }>,
  S extends string,
  E extends StateMachine.EventObject = StateMachine.AnyEventObject
>(
  machine: Machine<C, S, E>,
  props: Partial<C> & {
    defaultValue?: C["value"] | (() => C["value"])
    onChange?: (nextValue: C["value"]) => void
  },
) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props
  const isControlled = valueProp !== undefined
  const [valueState] = React.useState(defaultValue)
  const value = isControlled ? valueProp : valueState

  //@ts-expect-error
  const [state, send] = useMachine(() => {
    const context = {
      ...rest,
      value,
      setValue(nextValue: C["value"]) {
        onChange?.(nextValue)
        if (!isControlled) {
          this.value = nextValue
        }
      },
    }
    return machine.withContext(context as any)
  })

  useUpdateEffect(() => {
    send({ type: INTERNAL_EVENTS.SYNC, value: valueProp })
  }, [valueProp, send])

  return [state, send] as const
}
