import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTableStyles } from "./table-context"

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const TableFooter = forwardRef<TableFooterProps, "tfoot">(
  function TableFooter(props, ref) {
    const styles = useTableStyles()
    return <chakra.tfoot {...props} ref={ref} __css={styles.footer} />
  },
)
