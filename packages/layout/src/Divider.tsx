import { chakra, PropsOf } from "@chakra-ui/styled"
import * as React from "react"

interface DividerOptions {
  orientation?: "horizontal" | "vertical"
}

export type DividerProps = PropsOf<typeof StyledDivider> & DividerOptions

const StyledDivider = chakra("hr", { themeKey: "Divider" })

const Divider = React.forwardRef(
  ({ orientation, ...props }: DividerProps, ref: React.Ref<any>) => (
    <StyledDivider
      ref={ref}
      marginY="8px"
      role="separator"
      aria-orientation={orientation}
      border="0"
      borderBottom="1px"
      opacity={0.6}
      borderColor="inherit"
      {...props}
    />
  ),
)

export default Divider
