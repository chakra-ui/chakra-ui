import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const TableBody = forwardRef<TableBodyProps, "tbody">(
  function TableBody(props, ref) {
    const styles = useTableStyles()
    return <chakra.tbody {...props} ref={ref} css={styles.body} />
  },
)
