import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { useTableStyles } from "./table"

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   * @default false
   */
  isNumeric?: boolean
}
export const Th = forwardRef<TableColumnHeaderProps, "th">(
  ({ isNumeric, ...rest }, ref) => {
    const styles = useTableStyles()
    return (
      <chakra.th
        {...rest}
        ref={ref}
        __css={styles.th}
        data-is-numeric={isNumeric}
      />
    )
  },
)
