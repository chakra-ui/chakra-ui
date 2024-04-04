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
import { AlertProvider, AlertStylesProvider } from "./alert-context"

export interface AlertRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"Alert">,
    UnstyledProp {}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 *
 * @see Docs https://chakra-ui.com/docs/components/alert
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(
  function AlertRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Alert", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    return (
      <AlertProvider value={{ status: variantProps.status || "info" }}>
        <AlertStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...localProps}
            className={cx("chakra-alert", props.className)}
            css={[styles.root, props.css]}
          />
        </AlertStylesProvider>
      </AlertProvider>
    )
  },
)

AlertRoot.displayName = "AlertRoot"
