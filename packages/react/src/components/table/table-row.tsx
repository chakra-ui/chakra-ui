import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableRowProps extends HTMLChakraProps<"tr"> {}

export const TableRow = forwardRef<TableRowProps, "tr">(
  function TableRow(props, ref) {
    const styles = useTableStyles()
    return <chakra.tr {...props} ref={ref} css={styles.row} />
  },
)
