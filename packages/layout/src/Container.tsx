import { chakra, PropsOf, useTheme } from "@chakra-ui/system"
import { cx, Dict, get, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import React from "react"

export type ContainerProps = PropsOf<typeof chakra.div>

export const StyledContainer = chakra("div", {
  baseStyle: {
    width: "100%",
    marginX: "auto",
    maxWidth: "60ch",
    paddingX: "1rem",
  },
})

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
export const Container = React.forwardRef(
  (props: ContainerProps, ref: React.Ref<any>) => {
    const {
      maxWidth,
      width,
      minWidth,
      w,
      minW,
      maxW,
      className,
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

    return (
      <StyledContainer
        className={_className}
        ref={ref}
        {...widthProps}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  Container.displayName = "Container"
}
