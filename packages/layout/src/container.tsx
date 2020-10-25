import {
  chakra,
  forwardRef,
  SystemStyleObject,
  useTheme,
  WithChakraProps,
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

export interface ContainerProps extends WithChakraProps<"div"> {
  /**
   * If `true`, container will center it's children
   * regardless of their width.
   */
  centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep it's content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = forwardRef<ContainerProps, "div">(function Container(
  props,
  ref,
) {
  const {
    maxWidth,
    width,
    minWidth,
    w,
    minW,
    maxW,
    className,
    centerContent,
    ...rest
  } = props

  const theme = useTheme()

  const widthProps = transform(theme, {
    maxW,
    maxWidth,
    width,
    w,
    minWidth,
    minW,
  })

  const styles: SystemStyleObject = {
    w: "100%",
    mx: "auto",
    maxW: "60ch",
    px: "1rem",
    ...(centerContent && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    ...widthProps,
  }

  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-container", className)}
      {...rest}
      __css={styles}
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
