import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useTableStyles } from "./table-context"

export interface TableHeaderProps extends HTMLChakraProps<"thead"> {}

export const TableHeader = forwardRef<TableHeaderProps, "thead">(
  function TableHeader(props, ref) {
    const styles = useTableStyles()
    return <chakra.thead {...props} ref={ref} __css={styles.header} />
  },
)
