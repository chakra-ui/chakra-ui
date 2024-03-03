import type { HTMLChakraProps } from "../../styled-system"
import { chakra, forwardRef } from "../../styled-system"
import { useListStyles } from "./list-context"

export interface ListItemProps extends HTMLChakraProps<"li"> {}

export const ListItem = forwardRef<ListItemProps, "li">(
  function ListItem(props, ref) {
    const styles = useListStyles()
    return <chakra.li ref={ref} {...props} css={styles.item} />
  },
)

ListItem.displayName = "ListItem"
