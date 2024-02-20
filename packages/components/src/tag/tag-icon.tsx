import { forwardRef } from "../system"
import { Icon, IconProps } from "../icon"

export const TagStartIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginEnd="0.5rem" {...props} />
))

TagStartIcon.displayName = "TagStartIcon"

export const TagEndIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginStart="0.5rem" {...props} />
))

TagEndIcon.displayName = "TagEndIcon"
