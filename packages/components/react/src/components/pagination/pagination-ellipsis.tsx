import {
  PaginationEllipsis as ArkPaginationEllipsis,
  PaginationEllipsisProps as ArkPaginationEllipsisProps,
} from "@ark-ui/react"
import { chakra, ChakraProps } from "@chakra-ui/system"
import { forwardRef } from "react"
import { Assign } from "../../types"
import { usePaginationStyles } from "./pagination-context"

export interface PaginationEllipsisProps
  extends Assign<ArkPaginationEllipsisProps, ChakraProps> {}

const ChakraPaginationEllipsis = chakra(ArkPaginationEllipsis)

export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis(props, ref) {
  const styles = usePaginationStyles()
  return (
    <ChakraPaginationEllipsis ref={ref} {...props} __css={styles.ellipsis} />
  )
})
