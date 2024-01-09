import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { Box } from "../box/box"
import { forwardRef, HTMLChakraProps, useStyleConfig } from "../system"

export interface MarkProps
  extends ThemingProps<"Mark">,
    HTMLChakraProps<"mark"> {}

export const Mark = forwardRef<MarkProps, "mark">(function Mark(props, ref) {
  const styles = useStyleConfig("Mark", props)
  const ownProps = omitThemingProps(props)
  return (
    <Box
      ref={ref}
      {...ownProps}
      as="mark"
      __css={{ bg: "transparent", whiteSpace: "nowrap", ...styles }}
    />
  )
})
