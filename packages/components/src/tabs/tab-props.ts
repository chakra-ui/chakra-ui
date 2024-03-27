import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseTabsProps } from "./use-tabs"

export const tabsProps = createProps<UseTabsProps>()([
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
