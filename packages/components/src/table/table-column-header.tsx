import { dataAttr } from "@chakra-ui/utils"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useTableStyles } from "./table-context"

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   * @default false
   */
  numeric?: boolean
}

export const TableColumnHeader = forwardRef<TableColumnHeaderProps, "th">(
  function TableColumnHeader(props, ref) {
    const { numeric, ...rest } = props
    const styles = useTableStyles()

    return (
      <chakra.th
        {...rest}
        ref={ref}
        __css={styles.columnHeader}
        data-is-numeric={dataAttr(numeric)}
      />
    )
  },
)
