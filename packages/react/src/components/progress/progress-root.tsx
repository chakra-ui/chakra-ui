"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import {
  ProgressContextProvider,
  ProgressStylesProvider,
} from "./progress-context"
import { splitProgressProps } from "./progress-props"
import { ProgressOptions } from "./progress-types"
import { getProgressProps } from "./progress-utils"

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

export interface ProgressRootProps
  extends ProgressOptions,
    SlotRecipeProps<"Progress">,
    HTMLChakraProps<"div">,
    UnstyledProp {}

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
  function ProgressRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Progress")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [progressProps, restProps] = splitProgressProps(localProps)
    const computed = getProgressProps(progressProps)

    return (
      <ProgressStylesProvider value={styles}>
        <ProgressContextProvider value={{ computed, ...progressProps }}>
          <chakra.div
            ref={ref}
            {...restProps}
            css={[styles.root, props.css]}
            className={cx("chakra-progress", props.className)}
          />
        </ProgressContextProvider>
      </ProgressStylesProvider>
    )
  },
)

ProgressRoot.displayName = "Progress"
