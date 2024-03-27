import type { HTMLChakraProps } from "../system"
import { chakra, forwardRef } from "../system"
import { useListStyles } from "./list-context"

export interface ListItemProps extends HTMLChakraProps<"li"> {}

export const ListItem = forwardRef<ListItemProps, "li">(
  function ListItem(props, ref) {
    const styles = useListStyles()
    return <chakra.li ref={ref} {...props} __css={styles.item} />
  },
)

ListItem.displayName = "ListItem"
