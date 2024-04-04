"use client"

import { forwardRef } from "react"
import type { HTMLChakraProps } from "../../styled-system"
import { chakra } from "../../styled-system"
import { useListStyles } from "./list-context"

export interface ListItemProps extends HTMLChakraProps<"li"> {}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    const styles = useListStyles()
    return <chakra.li ref={ref} {...props} css={[styles.item, props.css]} />
  },
)

ListItem.displayName = "ListItem"
