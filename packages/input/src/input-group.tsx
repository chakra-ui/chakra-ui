import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
  useComponentStyle,
} from "@chakra-ui/system"
import { cx, __DEV__, getValidChildren } from "@chakra-ui/utils"
import * as React from "react"

export type InputGroupProps = PropsOf<typeof chakra.div> & ThemingProps

export const InputGroup = React.forwardRef(function InputGroup(
  props: InputGroupProps,
  ref: React.Ref<any>,
) {
  const defaults = useThemeDefaultProps("Input")

  const {
    children,
    size = defaults?.size,
    variant = defaults?.variant,
    className,
    ...rest
  } = props

  const _className = cx("chakra-input__group", className)

  const stylesRef = React.useRef<InputGroupProps>({})

  const validChildren = getValidChildren(children)

  const styles = useComponentStyle({
    themeKey: "Input",
    size,
    variant,
  })

  validChildren.forEach((child: any) => {
    if (!styles) return

    if (child.type.displayName === "InputLeftElement") {
      stylesRef.current.paddingLeft = styles["minHeight"]
    }

    if (child.type.displayName === "InputRightElement") {
      stylesRef.current.paddingRight = styles["minHeight"]
    }

    if (child.type.displayName === "InputRightAddon") {
      stylesRef.current.borderRightRadius = 0
    }

    if (child.type.displayName === "InputLeftAddon") {
      stylesRef.current.borderLeftRadius = 0
    }
  })

  const clones = validChildren.map((child: any) => {
    const theming = { size, variant }
    const { pl, paddingLeft, pr, paddingRight } = child.props

    return child.type.displayName !== "Input"
      ? React.cloneElement(child, theming)
      : React.cloneElement(child, {
          ...theming,
          paddingLeft: pl || paddingLeft || stylesRef.current?.paddingLeft,
          paddingRight: pr || paddingRight || stylesRef.current?.paddingRight,
          borderLeftRadius: stylesRef.current?.borderLeftRadius,
          borderRightRadius: stylesRef.current?.borderRightRadius,
        })
  })

  return (
    <chakra.div
      className={_className}
      ref={ref}
      width="100%"
      display="flex"
      position="relative"
      {...rest}
    >
      {clones}
    </chakra.div>
  )
})

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
