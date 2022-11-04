import { cx } from "@chakra-ui/shared-utils"
import {
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  chakra,
  omitThemingProps,
  useMultiStyleConfig,
  createStylesContext,
} from "@chakra-ui/system"

const [StylesProvider, useStyles] = createStylesContext("Card")

export type CardOptions = {
  /**
   * Whether the card is interactive.
   * When set to `true`, the card will be focusable and hoverable
   */
  isInteractive?: boolean
}

export interface CardProps
  extends HTMLChakraProps<"div">,
    CardOptions,
    ThemingProps<"Card"> {}

export const Card = forwardRef<CardProps, "div">(function Card(props, ref) {
  const { className, children, ...rest } = omitThemingProps(props)
  const styles = useMultiStyleConfig("Card", props)
  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-card", className)}
      __css={styles.container}
      {...rest}
    >
      <StylesProvider value={styles}>{children}</StylesProvider>
    </chakra.div>
  )
})

export interface CardHeaderProps extends HTMLChakraProps<"div"> {}

export const CardHeader = forwardRef<CardHeaderProps, "div">(
  function CardHeader(props, ref) {
    const { className, ...rest } = props
    const styles = useStyles()
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
  const styles = useStyles()
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
    const styles = useStyles()
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
