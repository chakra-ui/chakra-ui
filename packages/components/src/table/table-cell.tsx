import { dataAttr } from "@chakra-ui/utils"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useTableStyles } from "./table-context"

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   * @default false
   */
  numeric?: boolean
}

export const TableCell = forwardRef<TableCellProps, "td">(
  function TableCell(props, ref) {
    const { numeric, ...rest } = props
    const styles = useTableStyles()

    return (
      <chakra.td
        {...rest}
        ref={ref}
        __css={styles.cell}
        data-is-numeric={dataAttr(numeric)}
      />
    )
  },
)
