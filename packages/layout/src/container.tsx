import { chakra, PropsOf, useTheme, SystemStyleObject } from "@chakra-ui/system"
import { cx, Dict, get, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type ContainerProps = PropsOf<typeof chakra.div> & {
  /**
   * If `true`, container will center it's children
   * regardless of their width.
   */
  centerContent?: boolean
}

function transform(theme: Dict, props: Dict) {
  const result = {} as Dict

  for (const prop in props) {
    const propValue = props[prop]
    result[prop] = mapResponsive(propValue, (value) =>
      get(theme, `sizes.container.${value}`, value),
    )
  }

  return result
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep it's content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = React.forwardRef(function Container(
  props: ContainerProps,
  ref: React.Ref<any>,
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

  const _className = cx("chakra-container", className)

  const styles: SystemStyleObject = {
    width: "100%",
    marginX: "auto",
    maxWidth: "60ch",
    paddingX: "1rem",
    ...(centerContent && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
  }

  return (
    <chakra.div
      className={_className}
      ref={ref}
      {...widthProps}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Container.displayName = "Container"
}
