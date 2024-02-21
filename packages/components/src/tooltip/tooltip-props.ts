import { createProps, splitProps } from "@chakra-ui/utils"
import { UseTooltipProps } from "./use-tooltip"

export const tooltipProps = createProps<UseTooltipProps>()([
  "arrowPadding",
  "arrowShadowColor",
  "arrowSize",
  "closeDelay",
  "closeOnClick",
  "closeOnEsc",
  "closeOnPointerDown",
  "closeOnScroll",
  "defaultIsOpen",
  "direction",
  "gutter",
  "id",
  "isDisabled",
  "isOpen",
  "modifiers",
  "offset",
  "onClose",
  "onOpen",
  "openDelay",
  "placement",
])

export const splitTooltipProps = <T extends UseTooltipProps>(props: T) => {
  return splitProps(props, tooltipProps) as [
    UseTooltipProps,
    Omit<T, keyof UseTooltipProps>,
  ]
}
