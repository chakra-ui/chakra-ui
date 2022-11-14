import {
  PaginationPrevItem as ArkPaginationPrevItem,
  PaginationPrevItemProps as ArkPaginationPrevItemProps,
} from "@ark-ui/react"
import { chakra, ChakraProps } from "@chakra-ui/system"
import { forwardRef } from "react"
import { Assign } from "../../types"
import { usePaginationStyles } from "./pagination-context"

export interface PaginationPrevItemProps
  extends Assign<ArkPaginationPrevItemProps, ChakraProps> {}

const ChakraPaginationPrevItem = chakra(ArkPaginationPrevItem)

export const PaginationPrevItem = forwardRef<
  HTMLAnchorElement,
  PaginationPrevItemProps
>(function PaginationPrevItem(props, ref) {
  const styles = usePaginationStyles()
  return (
    <ChakraPaginationPrevItem ref={ref} {...props} __css={styles.prevItem} />
  )
})
