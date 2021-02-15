import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import { runIfFn } from "@chakra-ui/utils"
import * as React from "react"
import { useCallbackRef } from "./use-callback-ref"

interface ControllablePropSchema {
  states: {
    unknown: {}
    controlled: {}
    uncontrolled: {}
  }
}
interface ControllablePropContext<T> {
  value?: T
}

type ControllablePropEvent<T> = { type: "SYNC"; prop?: T; state: T }

const createControllablePropMachine = <T>() =>
  Machine<
    ControllablePropContext<T>,
    ControllablePropSchema,
    ControllablePropEvent<T>
  >(
    {
      id: "controllable-prop",
      initial: "unknown",
      on: {
        SYNC: [
          { target: "controlled", cond: "hasProp" },
          { target: "uncontrolled" },
        ],
      },
      states: {
        unknown: {},
        controlled: {
          entry: "setPropAsValue",
        },
        uncontrolled: {
          entry: "setStateAsValue",
        },
      },
    },
    {
      guards: {
        hasProp: (_context, event) => typeof event.prop !== "undefined",
      },
      actions: {
        setPropAsValue: assign({
          value: (_context, event) => event.prop,
        }),
        setStateAsValue: assign({
          value: (_context, event) => event.state,
        }),
      },
    },
  )

export function useControllableProp<T>(prop: T | undefined, state: T) {
  const [currentState, send] = useMachine(createControllablePropMachine())

  React.useEffect(() => {
    send({ type: "SYNC", prop, state })
  }, [send, prop, state])

  return [
    currentState.matches("controlled"),
    currentState.context.value,
  ] as const
}

export interface UseControllableStateProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T)
  /**
   * The callback fired when the value changes
   */
  onChange?: (value: T) => void
  /**
   * The component name (for warnings)
   */
  name?: string
}

interface ControllableStateSchema {
  states: {
    init: {}
    controlled: {}
    uncontrolled: {}
  }
}

interface ControllableStateContext<T> {
  state: T
  defaultValue: T
}

type ControllableStateEvent<T> = SyncEvent<T> | UpdateEvent<T>
type SyncEvent<T> = { type: "SYNC"; value?: T; defaultValue: T }
type UpdateEvent<T> = { type: "UPDATE"; value: T }

const createControllableStateMachine = <T>({
  value,
  defaultValue,
}: {
  value?: T
  defaultValue: T
}) =>
  Machine<
    ControllableStateContext<T>,
    ControllableStateSchema,
    ControllableStateEvent<T>
  >(
    {
      id: "controllable-state",
      initial: "init",
      context: {
        defaultValue,
        state: value !== undefined ? value : defaultValue,
      },
      states: {
        init: {
          always: [{ target: "controlled", cond: "hasValue" }],
        },
        controlled: {},
        uncontrolled: {},
      },
    },
    {
      actions: {},
    },
  )

/**
 * React hook for using controlling component state.
 * @param props
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value: valueProp, defaultValue, onChange } = props
  const handleChange = useCallbackRef(onChange)

  const [valueState, setValue] = React.useState(defaultValue as T)
  const isControlled = valueProp !== undefined

  const value = isControlled ? (valueProp as T) : valueState

  const updateValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const nextValue = runIfFn(next, value)
      if (!isControlled) {
        setValue(nextValue)
      }
      handleChange(nextValue)
    },
    [isControlled, handleChange, value],
  )

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}
