import { dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
        css={styles.columnHeader}
        data-is-numeric={dataAttr(numeric)}
      />
    )
  },
)
