import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { useTableStyles } from "./table"

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">((props, ref) => {
  const styles = useTableStyles()
  return <chakra.tfoot {...props} ref={ref} __css={styles.tfoot} />
})
