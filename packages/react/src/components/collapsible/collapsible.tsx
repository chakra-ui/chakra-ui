import {
  Collapsible as ArkCollapsible,
  type CollapsibleContentProps as ArkCollapsibleContentProps,
  type CollapsibleRootProps as ArkCollapsibleRootProps,
  type CollapsibleTriggerProps as ArkCollapsibleTriggerProps,
} from "@ark-ui/react/collapsible"
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
  extends HTMLChakraProps<"div", ArkCollapsibleRootProps>,
    SlotRecipeProps<"Collapsible">,
    UnstyledProp {}

export const CollapsibleRoot = withProvider<
  HTMLDivElement,
  CollapsibleRootProps
>(ArkCollapsible.Root, "root")

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleTriggerProps
  extends HTMLChakraProps<"button", ArkCollapsibleTriggerProps> {}

export const CollapsibleTrigger = withContext<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(ArkCollapsible.Trigger, "trigger")

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleContentProps
  extends HTMLChakraProps<"div", ArkCollapsibleContentProps> {}

export const CollapsibleContent = withContext<
  HTMLDivElement,
  CollapsibleContentProps
>(ArkCollapsible.Content, "content")
