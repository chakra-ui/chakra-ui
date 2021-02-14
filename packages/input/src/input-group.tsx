import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  css,
  useTheme,
  SystemStyleObject,
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
      size: child.props?.size ?? props.size,
      variant: child.props?.variant ?? props.variant,
    }

    return React.cloneElement(child, theming)
  })

  const theme = useTheme()
  const inputCss = css(styles.field)({ theme })
  const inputGroupCssVariables = mapCssPropNames(inputCss, {
    height: "--chakra-input-group-height",
    fontSize: "--chakra-input-group-font-size",
    paddingLeft: "--chakra-input-group-padding-left",
  })

  return (
    <chakra.div
      className={_className}
      ref={ref}
      __css={{
        width: "100%",
        display: "flex",
        position: "relative",
        ...inputGroupCssVariables,
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

/**
 * Returns a new `props` object where keys listed
 * in `mapping` are mapped to new name and all other props are dropped.
 * Any media query will be preserved and props inside will be mapped as well.
 */
function mapCssPropNames(
  props: SystemStyleObject,
  mapping: Record<string, string>,
): SystemStyleObject {
  return Object.fromEntries(
    Object.entries(props).flatMap(([key, val]) => {
      if (Object.prototype.hasOwnProperty.call(mapping, key)) {
        return [[mapping[key], val]]
      }

      if (isMediaQuery(key)) {
        return [[key, mapCssPropNames(val as SystemStyleObject, mapping)]]
      }

      return []
    }),
  )
}

function isMediaQuery(key: string) {
  return key.startsWith("@media ")
}
