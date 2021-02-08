import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"InputGroup"> {}

export const InputGroup = forwardRef<InputGroupProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Input", props)
  const { children, className, ...rest } = omitThemingProps(props)

  const validChildren = getValidChildren(children)

  const hasLeftAddon = validChildren.some(
    (child: any) => child.type.id === "InputLeftAddon",
  )
  const hasRightAddon = validChildren.some(
    (child: any) => child.type.id === "InputRightAddon",
  )

  const hasLeftElement = validChildren.some(
    (child: any) => child.type.id === "InputLeftElement",
  )
  const hasRightElement = validChildren.some(
    (child: any) => child.type.id === "InputRightElement",
  )

  const _className = cx(
    "chakra-input__group",
    hasLeftAddon && "chakra-input__group--has-left-addon",
    hasRightAddon && "chakra-input__group--has-right-addon",
    hasLeftElement && "chakra-input__group--has-left-element",
    hasRightElement && "chakra-input__group--has-right-element",
    className,
  )

  const clones = validChildren.map((child: any) => {
    /**
     * Make it possible to override the size and variant from `Input`
     */
    const theming = {
      size: child.props?.size || props.size,
      variant: child.props?.variant || props.variant,
    }

    return React.cloneElement(child, theming)
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
