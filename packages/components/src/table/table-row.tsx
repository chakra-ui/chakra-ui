import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useTableStyles } from "./table-context"

export interface TableRowProps extends HTMLChakraProps<"tr"> {}

export const TableRow = forwardRef<TableRowProps, "tr">(
  function TableRow(props, ref) {
    const styles = useTableStyles()
    return <chakra.tr {...props} ref={ref} __css={styles.row} />
  },
)
