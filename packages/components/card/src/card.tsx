import { cx } from "@chakra-ui/shared-utils"
import {
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  chakra,
  omitThemingProps,
  useMultiStyleConfig,
  SystemProps,
} from "@chakra-ui/system"
import { CardStylesProvider } from "./card-context"

export type CardOptions = {
  /**
   * The flex direction of the card
   */
  direction?: SystemProps["flexDirection"]
  /**
   * The flex alignment of the card
   */
  align?: SystemProps["alignItems"]
  /**
   * The flex distribution of the card
   */
  justify?: SystemProps["justifyContent"]
}

export interface CardProps
  extends HTMLChakraProps<"div">,
    CardOptions,
    ThemingProps<"Card"> {}

export const Card = forwardRef<CardProps, "div">(function Card(props, ref) {
  const {
    className,
    children,
    direction = "column",
    justify,
    align,
    ...rest
  } = omitThemingProps(props)

  const styles = useMultiStyleConfig("Card", props)

  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-card", className)}
      __css={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        position: "relative",
        minWidth: 0,
        wordWrap: "break-word",
        ...styles.container,
      }}
      {...rest}
    >
      <CardStylesProvider value={styles}>{children}</CardStylesProvider>
    </chakra.div>
  )
})
