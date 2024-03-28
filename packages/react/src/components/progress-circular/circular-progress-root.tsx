"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra, defineStyle } from "../../styled-system"
import { getProgressProps } from "../progress/progress-utils"
import { CircularProgressContextProvider } from "./circular-progress-context"
import { CircularProgressOptions } from "./circular-progress-types"

export interface CircularProgressRootProps
  extends Omit<HTMLChakraProps<"div">, "color">,
    CircularProgressOptions {}

/**
 * CircularProgress is used to indicate the progress of an activity.
 * It is built using `svg` and `circle` components with support for
 * theming and `indeterminate` state
 *
 * @see Docs https://chakra-ui.com/circularprogress
 * @todo add theming support for circular progress
 */
export const CircularProgressRoot = forwardRef<
  HTMLDivElement,
  CircularProgressRootProps
>(function CircularProgressRoot(props, ref) {
  const {
    size = "48px",
    max = 100,
    min = 0,
    valueText,
    getValueText,
    value,
    capIsRound,
    children,
    thickness = "10px",
    color = "#0078d4",
    trackColor = "#edebe9",
    indeterminate,
    ...rest
  } = props

  const computed = getProgressProps({
    min,
    max,
    value,
    valueText,
    getValueText,
  })

  const rootStyles = defineStyle({
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
  })

  return (
    <CircularProgressContextProvider
      value={{
        computed,
        thickness,
        trackColor,
        color,
        indeterminate,
        capIsRound,
        size,
      }}
    >
      <chakra.div
        ref={ref}
        role="progressbar"
        {...rest}
        data-indeterminate={indeterminate ? "" : undefined}
        aria-valuemax={computed.max}
        aria-valuemin={computed.min}
        aria-valuenow={indeterminate ? undefined : computed.value}
        aria-valuetext={computed.valueText}
        className={cx("chakra-progress", rest.className)}
        css={rootStyles}
      >
        {children}
      </chakra.div>
    </CircularProgressContextProvider>
  )
})

CircularProgressRoot.displayName = "CircularProgress"
