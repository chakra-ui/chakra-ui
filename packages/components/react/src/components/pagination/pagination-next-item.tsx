import {
  PaginationNextItem as ArkPaginationNextItem,
  PaginationNextItemProps as ArkPaginationNextItemProps,
} from "@ark-ui/react"
import { chakra, ChakraProps } from "@chakra-ui/system"
import { forwardRef } from "react"
import { Assign } from "../../types"
import { usePaginationStyles } from "./pagination-context"

export interface PaginationNextItemProps
  extends Assign<ArkPaginationNextItemProps, ChakraProps> {}

const ChakraPaginationNextItem = chakra(ArkPaginationNextItem)

export const PaginationNextItem = forwardRef<
  HTMLAnchorElement,
  PaginationNextItemProps
>(function PaginationNextItem(props, ref) {
  const styles = usePaginationStyles()
  return (
    <ChakraPaginationNextItem ref={ref} {...props} __css={styles.nextItem} />
  )
})
