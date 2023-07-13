import { chakra, forwardRef, SystemStyleObject } from "@chakra-ui/system"
import { useMemo } from "react"
import { useMenuStyles } from "./menu"
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

    const buttonStyles: SystemStyleObject = useMemo(
      () => ({
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
      }),
      [styles.item],
    )

    return (
      <chakra.button ref={ref} type={btnType} {...rest} __css={buttonStyles} />
    )
  },
)
