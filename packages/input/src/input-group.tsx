import {
  chakra,
  PropsOf,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
  StylesProvider,
  forwardRef,
} from "@chakra-ui/system"
import { cx, __DEV__, getValidChildren } from "@chakra-ui/utils"
import * as React from "react"

export interface InputGroupProps
  extends PropsOf<typeof chakra.div>,
    ThemingProps {}

export const InputGroup = forwardRef<InputGroupProps, "div">(
  function InputGroup(props, ref) {
    const styles = useMultiStyleConfig("Input", props)
    const { children, className, ...rest } = omitThemingProps(props)

    const _className = cx("chakra-input__group", className)
    const stylesRef = React.useRef<InputGroupProps>({})

    const validChildren = getValidChildren(children)

    const input: any = styles.field

    validChildren.forEach((child: any) => {
      if (!styles) return

      if (child.type.id === "InputLeftElement") {
        stylesRef.current.paddingLeft = input.height ?? input.h
      }

      if (child.type.id === "InputRightElement") {
        stylesRef.current.paddingRight = input.height ?? input.h
      }

      if (child.type.id === "InputRightAddon") {
        stylesRef.current.borderRightRadius = 0
      }

      if (child.type.id === "InputLeftAddon") {
        stylesRef.current.borderLeftRadius = 0
      }
    })

    const clones = validChildren.map((child: any) => {
      const theming = { size: props.size, variant: props.variant }
      const { pl, paddingLeft, pr, paddingRight } = child.props

      return child.type.id !== "Input"
        ? React.cloneElement(child, theming)
        : React.cloneElement(child, {
            ...theming,
            paddingLeft: pl ?? paddingLeft ?? stylesRef.current?.paddingLeft,
            paddingRight: pr ?? paddingRight ?? stylesRef.current?.paddingRight,
            borderLeftRadius: stylesRef.current?.borderLeftRadius,
            borderRightRadius: stylesRef.current?.borderRightRadius,
          })
    })

    return (
      <chakra.div
        className={_className}
        ref={ref}
        __css={{
          width: "100%",
          display: "flex",
          position: "relative",
        }}
        {...rest}
      >
        <StylesProvider value={styles}>{clones}</StylesProvider>
      </chakra.div>
    )
  },
)

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
