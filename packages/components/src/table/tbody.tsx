import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useTableStyles } from "./table"

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const Tbody = forwardRef<TableBodyProps, "tbody">((props, ref) => {
  const styles = useTableStyles()
  return <chakra.tbody {...props} ref={ref} __css={styles.tbody} />
})
