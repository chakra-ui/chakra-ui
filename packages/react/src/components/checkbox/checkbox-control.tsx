import { keyframes } from "@emotion/react"
import { cloneElement, useMemo } from "react"
import { defineStyle } from "../../styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"
import { CheckboxIcon } from "./checkbox-icon"
import { useInitialAnimationState } from "./use-initial-animation-state"

const checkAnim = keyframes({
  from: {
    opacity: 0,
    strokeDashoffset: 16,
    transform: "scale(0.95)",
  },
  to: {
    opacity: 1,
    strokeDashoffset: 0,
    transform: "scale(1)",
  },
})

const indeterminateOpacityAnim = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const indeterminateScaleAnim = keyframes({
  from: {
    transform: "scaleX(0.65)",
  },
  to: {
    transform: "scaleX(1)",
  },
})

export interface CheckboxControlProps extends HTMLChakraProps<"span"> {
  /**
   * The color of the checkbox icon when checked or indeterminate
   */
  iconColor?: string
  /**
   * The size of the checkbox icon when checked or indeterminate
   */
  iconSize?: string | number
  /**
   * The checked icon to use
   *
   * @type React.ReactElement
   * @default CheckboxIcon
   */
  icon?: React.ReactElement
}

export const CheckboxControl = forwardRef<CheckboxControlProps, "span">(
  function CheckboxControl(props, ref) {
    const { icon = <CheckboxIcon />, iconColor, iconSize, ...restProps } = props

    const { getCheckboxProps, state } = useCheckboxContext()
    const styles = useCheckboxStyles()

    const shouldAnimate = useInitialAnimationState(state.isChecked)

    const iconStyles = useMemo(
      () =>
        defineStyle({
          animation: !shouldAnimate
            ? undefined
            : state.isIndeterminate
            ? `${indeterminateOpacityAnim} 20ms linear, ${indeterminateScaleAnim} 200ms linear`
            : `${checkAnim} 200ms linear`,
          fontSize: iconSize,
          color: iconColor,
          ...styles.icon,
        }),
      [iconColor, iconSize, shouldAnimate, state.isIndeterminate, styles.icon],
    )

    const clonedIcon = cloneElement(icon, {
      __css: iconStyles,
      isIndeterminate: state.isIndeterminate,
      isChecked: state.isChecked,
    })

    return (
      <chakra.span
        ref={ref}
        {...restProps}
        css={styles.control}
        className="chakra-checkbox__control"
        {...getCheckboxProps()}
      >
        {clonedIcon}
      </chakra.span>
    )
  },
)

CheckboxControl.displayName = "CheckboxControl"
