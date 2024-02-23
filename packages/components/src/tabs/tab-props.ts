import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseTabsProps } from "./use-tabs"

export const tabsProps = createProps<UseTabsProps>()([
  "defaultIndex",
  "direction",
  "id",
  "index",
  "isLazy",
  "isManual",
  "lazyBehavior",
  "onChange",
  "orientation",
  "orientation",
])

export const splitTabsProps = createSplitProps<UseTabsProps>(tabsProps)
