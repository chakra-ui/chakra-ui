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
import { CardStylesProvider, useCardStyles } from "./card-context"

export type CardOptions = {
  /**
   * The flex direction of the card
   */
  direction?: SystemProps["flexDirection"]
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
        ...styles.container,
      }}
      {...rest}
    >
      <CardStylesProvider value={styles}>{children}</CardStylesProvider>
    </chakra.div>
  )
})

export interface CardHeaderProps extends HTMLChakraProps<"div"> {}

export const CardHeader = forwardRef<CardHeaderProps, "div">(
  function CardHeader(props, ref) {
    const { className, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-card__header", className)}
        __css={styles.header}
        {...rest}
      />
    )
  },
)

export interface CardBodyProps extends HTMLChakraProps<"div"> {}

export const CardBody = forwardRef<CardHeaderProps, "div">(function CardBody(
  props,
  ref,
) {
  const { className, ...rest } = props
  const styles = useCardStyles()
  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-card__body", className)}
      __css={styles.body}
      {...rest}
    />
  )
})

export interface CardFooterProps extends HTMLChakraProps<"div"> {}

export const CardFooter = forwardRef<CardHeaderProps, "div">(
  function CardFooter(props, ref) {
    const { className, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-card__footer", className)}
        __css={styles.footer}
        {...rest}
      />
    )
  },
)
