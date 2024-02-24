import { ThemingProps, omitThemingProps } from "../styled-system"
import { HTMLChakraProps, chakra, forwardRef, useStyleConfig } from "../system"

export interface MarkProps
  extends ThemingProps<"Mark">,
    HTMLChakraProps<"mark"> {}

export const Mark = forwardRef<MarkProps, "mark">(function Mark(props, ref) {
  const styles = useStyleConfig("Mark", props)
  const ownProps = omitThemingProps(props)
  return <chakra.mark ref={ref} {...ownProps} __css={styles} />
})
