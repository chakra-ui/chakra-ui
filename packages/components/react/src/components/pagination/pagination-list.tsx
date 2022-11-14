import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/utils"
import { usePaginationStyles } from "./pagination-context"

export interface PaginationListProps extends HTMLChakraProps<"ul"> {}

export const PaginationList = forwardRef<PaginationListProps, "ul">(
  function PaginationList(props, ref) {
    const styles = usePaginationStyles()
    return (
      <chakra.ul
        ref={ref}
        {...props}
        className={cx("chakra-pagination__list", props.className)}
        __css={{
          ...styles.list,
        }}
      />
    )
  },
)
