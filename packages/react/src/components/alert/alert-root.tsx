import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { AlertProvider, AlertStylesProvider } from "./alert-context"

export interface AlertRootProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"Alert"> {}

/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 *
 * @see Docs https://chakra-ui.com/docs/components/alert
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const AlertRoot = forwardRef<AlertRootProps, "div">(
  function AlertRoot(props, ref) {
    const recipe = useSlotRecipe("Alert")
    const [variantProps, localProps] = recipe.splitVariantProps(props)

    const styles = recipe(variantProps)

    return (
      <AlertProvider value={{ status: variantProps.status || "info" }}>
        <AlertStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...localProps}
            className={cx("chakra-alert", props.className)}
            css={styles.root}
          />
        </AlertStylesProvider>
      </AlertProvider>
    )
  },
)

AlertRoot.displayName = "AlertRoot"
