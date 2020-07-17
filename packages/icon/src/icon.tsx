import { chakra, PropsOf } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

const fallbackIcon = {
  path: (
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        fill="none"
        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      />
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  ),
  viewBox: "0 0 24 24",
}

export type IconProps = PropsOf<typeof chakra.svg>

export const Icon = React.forwardRef(function Icon(
  props: IconProps,
  ref: React.Ref<any>,
) {
  const {
    as: element,
    boxSize = "1em",
    viewBox,
    color = "currentColor",
    role = "presentation",
    focusable = false,
    children,
    className,
    ...rest
  } = props

  const _className = cx("chakra-icon", className)

  const shared: IconProps = {
    ref,
    display: "inline-block",
    lineHeight: "1em",
    color,
    focusable,
    role,
    flexShrink: 0,
    boxSize,
    className: _className,
  }

  /**
   * If you're using an icon library like `react-icons`
   */
  if (element && typeof element !== "string") {
    return <chakra.svg as={element} {...shared} {...rest} />
  }

  const _path = (children ?? fallbackIcon.path) as React.ReactNode
  const _viewBox = viewBox ?? fallbackIcon.viewBox

  return (
    <chakra.svg verticalAlign="middle" viewBox={_viewBox} {...shared} {...rest}>
      {_path}
    </chakra.svg>
  )
})

if (__DEV__) {
  Icon.displayName = "Icon"
}

export default Icon
