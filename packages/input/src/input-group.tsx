import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
  StylesProvider,
} from "@chakra-ui/system"
import { cx, __DEV__, getValidChildren } from "@chakra-ui/utils"
import * as React from "react"

export type InputGroupProps = PropsOf<typeof chakra.div> & ThemingProps

export const InputGroup = React.forwardRef(function InputGroup(
  props: InputGroupProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Input", props)
  const { children, className, variant, size, ...rest } = omitThemingProps(
    props,
  )

  const _className = cx("chakra-input__group", className)
  const stylesRef = React.useRef<InputGroupProps>({})

  const validChildren = getValidChildren(children)

  validChildren.forEach((child: any) => {
    if (!styles) return

    if (child.type.__hidden === "InputLeftElement") {
      stylesRef.current.paddingLeft = styles.Container["height"]
    }

    if (child.type.__hidden === "InputRightElement") {
      stylesRef.current.paddingRight = styles.Container["height"]
    }

    if (child.type.__hidden === "InputRightAddon") {
      stylesRef.current.borderRightRadius = 0
    }

    if (child.type.__hidden === "InputLeftAddon") {
      stylesRef.current.borderLeftRadius = 0
    }
  })

  const clones = validChildren.map((child: any) => {
    const theming = { size, variant }
    const { pl, paddingLeft, pr, paddingRight } = child.props

    return child.type.__hidden !== "Input"
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
})

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
