import * as React from "react"
import { Box, BoxProps } from "./Box"

export interface FlexOptions {
  /**
   * Shorthand for Styled-System `alignItems` prop
   */
  align?: BoxProps["alignItems"]
  /**
   * Shorthand for Styled-System `justifyContent` prop
   */
  justify?: BoxProps["justifyContent"]
  /**
   * Shorthand for Styled-System `flexWrap` prop
   */
  wrap?: BoxProps["flexWrap"]
  /**
   * Shorthand for Styled-System `flexDirection` prop
   */
  direction?: BoxProps["flexDirection"]
  /**
   * Shorthand for Styled-System `flexBasis` prop
   */
  basis?: BoxProps["flexBasis"]
  /**
   * Shorthand for Styled-System `flexGrow` prop
   */
  grow?: BoxProps["flexGrow"]
}

export type FlexProps = BoxProps & FlexOptions

export const Flex = React.forwardRef(
  (props: FlexProps, ref: React.Ref<any>) => {
    const { direction, align, justify, wrap, basis, grow, ...rest } = props
    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection={direction}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        flexBasis={basis}
        flexGrow={grow}
        {...rest}
      />
    )
  },
)
