import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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

function useMounted() {
  const [isMounted, setMounted] = React.useState(false)
  const mount = () => setMounted(true)
  const unmount = () => setMounted(false)
  return { isMounted, mount, unmount }
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

  const leftElement = useMounted() as UseMountedReturn | undefined
  const rightElement = useMounted() as UseMountedReturn | undefined
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
