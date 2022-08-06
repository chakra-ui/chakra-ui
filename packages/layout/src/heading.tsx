import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
    ThemingProps<"Heading"> {}

export const Heading = forwardRef<HeadingProps, "h2">(function Heading(
  props,
  ref,
) {
  const styles = useStyleConfig("Heading", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.h2
      ref={ref}
      className={cx("chakra-heading", props.className)}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Heading.displayName = "Heading"
}
