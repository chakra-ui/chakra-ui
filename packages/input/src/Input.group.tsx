import { useDimensions, useSafeLayoutEffect } from "@chakra-ui/hooks"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useRef, useState } from "react"

type GroupContext = Omit<ReturnType<typeof useProvider>, "htmlProps">

const [InputGroupProvider, useInputGroup] = createContext<GroupContext>({
  strict: false,
  name: "InputGroupContext",
})

export { useInputGroup }

export type InputGroupProps = PropsOf<typeof chakra.div> & ThemingProps

export const InputGroup = React.forwardRef(
  (props: InputGroupProps, ref: React.Ref<any>) => {
    const { className, ...rest } = props
    const { htmlProps, ...context } = useProvider(rest)

    const _className = cx("chakra-input__group", className)

    return (
      <chakra.div
        className={_className}
        ref={ref}
        width="100%"
        display="flex"
        position="relative"
        {...htmlProps}
      >
        <InputGroupProvider value={context} children={props.children} />
      </chakra.div>
    )
  },
)

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}

function useMeasurement() {
  const [hasMeasured, setHasMeasured] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<any>(null)

  const rect = useDimensions(ref, true)?.borderBox
  useSafeLayoutEffect(() => {
    if (rect) {
      setHasMeasured(true)
    }
  }, [rect])

  return { ref, rect, mounted, setMounted, hasMeasured }
}

type UseMeasurementReturn = ReturnType<typeof useMeasurement>

function useMounted() {
  const [mounted, setMounted] = useState(false)
  return { mounted, setMounted }
}

type UseMountedReturn = ReturnType<typeof useMounted>

function useProvider(props: any) {
  const defaults = useThemeDefaultProps("Input")

  const {
    children,
    size = defaults?.size,
    variant = defaults?.variant,
    ...htmlProps
  } = props

  const leftElement = useMeasurement() as UseMeasurementReturn | undefined
  const rightElement = useMeasurement() as UseMeasurementReturn | undefined

  const leftAddon = useMounted() as UseMountedReturn | undefined
  const rightAddon = useMounted() as UseMountedReturn | undefined

  return {
    leftElement,
    rightElement,
    leftAddon,
    rightAddon,
    htmlProps,
    size,
    variant,
  }
}
