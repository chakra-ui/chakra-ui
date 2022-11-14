import {
  Pagination as ArkPagination,
  PaginationProps as ArkPaginationProps,
} from "@ark-ui/react"
import {
  chakra,
  ChakraProps,
  omitThemingProps,
  shouldForwardProp,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { Assign } from "../../types"
import { PaginationStylesProvider } from "./pagination-context"

export interface PaginationProps
  extends Assign<ArkPaginationProps, ChakraProps>,
    ThemingProps<"Pagination"> {}

// const chakraForwardAs = (comp) =>
//   chakra(comp, {
//     shouldForwardProp: (prop) => prop === "as" || shouldForwardProp(prop),
//   })

const ChakraPagination = chakra(ArkPagination, {
  shouldForwardProp: (prop) => prop === "as" || shouldForwardProp(prop),
})

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const styles = useMultiStyleConfig("Pagination", props)
    const ownProps = omitThemingProps(props)
    return (
      <PaginationStylesProvider value={styles}>
        <ChakraPagination
          ref={ref}
          {...ownProps}
          className={cx("chakra-pagination", props.className)}
          __css={styles.root}
        />
      </PaginationStylesProvider>
    )
  },
)
