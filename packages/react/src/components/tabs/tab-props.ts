import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseTabProps } from "./use-tab"
import { UseTabsProps } from "./use-tabs"

const tabsProps = createProps<UseTabsProps>()([
  "defaultValue",
  "direction",
  "id",
  "value",
  "isLazy",
  "isManual",
  "lazyBehavior",
  "onChange",
  "orientation",
  "orientation",
])

export const splitTabsProps = createSplitProps<UseTabsProps>(tabsProps)

const tabProps = createProps<UseTabProps>()([
  "isDisabled",
  "isFocusable",
  "value",
])

export const splitTabProps = createSplitProps<UseTabProps>(tabProps)
