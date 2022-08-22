import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { useTableStyles } from "./table"

export interface TableHeadProps extends HTMLChakraProps<"thead"> {}

export const Thead = forwardRef<TableHeadProps, "thead">((props, ref) => {
  const styles = useTableStyles()
  return <chakra.thead {...props} ref={ref} __css={styles.thead} />
})
