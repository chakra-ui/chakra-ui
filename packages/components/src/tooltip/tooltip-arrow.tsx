import { HTMLChakraProps, chakra, forwardRef } from "../system"

export interface TooltipArrowProps extends HTMLChakraProps<"div"> {}

export const TooltipArrow = forwardRef<TooltipArrowProps, "div">(
  function TooltipArrow(props, ref) {
    return (
      <chakra.div
        ref={ref}
        data-popper-arrow
        className="chakra-tooltip__arrow"
        {...props}
      >
        <chakra.div
          data-popper-arrow-inner
          className="chakra-tooltip__arrow-inner"
          __css={{ bg: "inherit" }}
        />
      </chakra.div>
    )
  },
)

TooltipArrow.displayName = "TooltipArrow"
