import { defineStyle } from "@chakra-ui/styled-system"
import { chakra, forwardRef } from "../system"
import { useMenuStyles } from "./menu-context"
import { StyledMenuItemProps } from "./menu-item"

export const StyledMenuItem = forwardRef<StyledMenuItemProps, "button">(
  (props, ref) => {
    const { type, ...rest } = props
    const styles = useMenuStyles()

    /**
     * Given another component, use its type if present
     * Else, use no type to avoid invalid html, e.g. <a type="button" />
     * Else, fall back to "button"
     */
    const btnType = rest.as || type ? type ?? undefined : "button"

    const buttonStyles = defineStyle({
      textDecoration: "none",
      color: "inherit",
      userSelect: "none",
      display: "flex",
      width: "100%",
      alignItems: "center",
      textAlign: "start",
      flex: "0 0 auto",
      outline: 0,
      ...styles.item,
    })

    return (
      <chakra.button ref={ref} type={btnType} {...rest} __css={buttonStyles} />
    )
  },
)
