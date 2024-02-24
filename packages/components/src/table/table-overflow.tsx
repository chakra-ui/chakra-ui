import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { cx } from "@chakra-ui/utils/cx"

export interface TableOverflowProps extends HTMLChakraProps<"div"> {}

export const TableOverflow = forwardRef<TableOverflowProps, "div">(
  function TableOverflow(props: HTMLChakraProps<"div">, ref) {
    const { overflow, overflowX, className, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-table__container", className)}
        {...rest}
        __css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: overflow ?? overflowX ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
      />
    )
  },
)
