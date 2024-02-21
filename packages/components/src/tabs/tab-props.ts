import { createProps, splitProps } from "@chakra-ui/utils"
import { UseTabsProps } from "."

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

export const splitTabsProps = <T extends UseTabsProps>(props: T) =>
  splitProps(props, tabsProps) as [UseTabsProps, Omit<T, keyof UseTabsProps>]
