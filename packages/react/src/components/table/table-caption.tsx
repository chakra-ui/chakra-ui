import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTableStyles } from "./table-context"

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const TableCaption = forwardRef<TableCaptionProps, "caption">(
  function TableCaption(props, ref) {
    const { placement = "bottom", ...rest } = props
    const styles = useTableStyles()
    return (
      <chakra.caption
        {...rest}
        ref={ref}
        css={{
          ...styles.caption,
          captionSide: placement,
        }}
      />
    )
  },
)

TableCaption.displayName = "TableCaption"
