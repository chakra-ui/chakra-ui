"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTabsStyles } from "./tabs-context"

export interface TabContentGroupProps extends HTMLChakraProps<"div"> {}

export const TabContentGroup = forwardRef<HTMLDivElement, TabContentGroupProps>(
  function TabContentGroup(props, ref) {
    const styles = useTabsStyles()
    return (
      <chakra.div
        {...props}
        ref={ref}
        className={cx("chakra-tabs__content-group", props.className)}
        css={[styles.contentGroup, props.css]}
      />
    )
  },
)

TabContentGroup.displayName = "TabPanels"
