import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useTheme,
  useStyleConfig,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import {
  cx,
  Dict,
  filterUndefined,
  mapResponsive,
  memoizedGet as get,
  __DEV__,
} from "@chakra-ui/utils"
import * as React from "react"

export interface ContainerProps extends HTMLChakraProps<"div">, ThemingProps {
  /**
   * If `true`, container will center its children
   * regardless of their width.
   */
  centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = forwardRef<ContainerProps, "div">((props, ref) => {
  const {
    className,
    centerContent,
    maxW,
    maxWidth,
    width,
    w,
    minWidth,
    minW,
    ...rest
  } = omitThemingProps(props)

  const theme = useTheme()

  const widthProps = transform(theme, {
    maxW,
    maxWidth,
    width,
    w,
    minWidth,
    minW,
  })

  const styles = useStyleConfig("Container", props)

  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-container", className)}
      {...rest}
      {...widthProps}
      __css={{
        ...styles,
        ...(centerContent && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }),
      }}
    />
  )
})

if (__DEV__) {
  Container.displayName = "Container"
}

function transform(theme: Dict, props: Dict) {
  const result: SystemStyleObject = {}

  Object.keys(props).forEach((prop) => {
    const propValue = props[prop]
    result[prop] = mapResponsive(propValue, (value) =>
      get(theme, `sizes.container.${value}`, value),
    )
  })

  return filterUndefined(result)
}
