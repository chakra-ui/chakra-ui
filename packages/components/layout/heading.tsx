import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
    ThemingProps<"Heading"> {}

/**
 * `Heading` is used to render semantic HTML heading elements.
 *
 * By default, renders as `h2` with themantic size `xl`
 *
 * @see Docs https://chakra-ui.com/docs/components/heading
 */
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

Heading.displayName = "Heading"
