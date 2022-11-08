import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { useTableStyles } from "./table"

export interface TableRowProps extends HTMLChakraProps<"tr"> {}
export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => {
  const styles = useTableStyles()

  return <chakra.tr {...props} ref={ref} __css={styles.tr} />
})
