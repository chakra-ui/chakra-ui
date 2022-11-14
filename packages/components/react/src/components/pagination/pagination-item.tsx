import {
  PaginationItem as ArkPaginationItem,
  PaginationItemProps as ArkPaginationItemProps,
} from "@ark-ui/react"
import { chakra, ChakraProps } from "@chakra-ui/system"
import { forwardRef } from "react"
import { Assign } from "../../types"
import { usePaginationStyles } from "./pagination-context"

export interface PaginationItemProps
  extends Assign<ArkPaginationItemProps, ChakraProps> {}

const ChakraPaginationItem = chakra(ArkPaginationItem)

export const PaginationItem = forwardRef<
  HTMLAnchorElement,
  PaginationItemProps
>(function PaginationItem(props, ref) {
  const styles = usePaginationStyles()
  return <ChakraPaginationItem ref={ref} {...props} __css={styles.item} />
})
