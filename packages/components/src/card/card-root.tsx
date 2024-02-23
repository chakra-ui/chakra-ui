import {
  SystemProps,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { CardStylesProvider } from "./card-context"

export interface CardOptions {
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

export interface CardRootProps
  extends HTMLChakraProps<"div">,
    CardOptions,
    ThemingProps<"Card"> {}

export const CardRoot = forwardRef<CardRootProps, "div">(
  function CardRoot(props, ref) {
    const {
      children,
      direction = "column",
      justify,
      align,
      ...rest
    } = omitThemingProps(props)

    const styles = useMultiStyleConfig("Card", props)

    return (
      <CardStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...rest}
          className={cx("chakra-card", props.className)}
          flexDirection={direction}
          justifyContent={justify}
          alignItems={align}
          __css={styles.root}
        >
          {children}
        </chakra.div>
      </CardStylesProvider>
    )
  },
)
