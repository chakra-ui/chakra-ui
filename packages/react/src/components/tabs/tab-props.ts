import { createProps, createSplitProps } from "@chakra-ui/utils"
import type { UseTabProps } from "./use-tab"
import type { UseTabsProps } from "./use-tabs"

const tabsProps = createProps<UseTabsProps>()([
  "defaultValue",
  "direction",
  "id",
  "value",
  "lazyMount",
  "activationMode",
  "lazyBehavior",
  "onChange",
  "orientation",
  "orientation",
])

export const splitTabsProps = createSplitProps<UseTabsProps>(tabsProps)

const tabProps = createProps<UseTabProps>()(["disabled", "focusable", "value"])

export const splitTabProps = createSplitProps<UseTabProps>(tabProps)
