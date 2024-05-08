import { Collapsible as ArkCollapsible } from "@ark-ui/react/collapsible"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCollapsibleStyles,
} = createStyleContext("Collapsible")

export { useCollapsibleStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleRootProps
  extends HTMLChakraProps<"div", ArkCollapsible.RootProps>,
    SlotRecipeProps<"Collapsible">,
    UnstyledProp {}

export const CollapsibleRoot = withProvider<
  HTMLDivElement,
  CollapsibleRootProps
>(ArkCollapsible.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleTriggerProps
  extends HTMLChakraProps<"button", ArkCollapsible.TriggerProps> {}

export const CollapsibleTrigger = withContext<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(ArkCollapsible.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleContentProps
  extends HTMLChakraProps<"div", ArkCollapsible.ContentProps> {}

export const CollapsibleContent = withContext<
  HTMLDivElement,
  CollapsibleContentProps
>(ArkCollapsible.Content, "content", { forwardAsChild: true })
