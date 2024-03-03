import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { CardStylesProvider } from "./card-context"

export interface CardOptions {
  /**
   * The flex direction of the card
   */
  direction?: SystemStyleObject["flexDirection"]
  /**
   * The flex alignment of the card
   */
  align?: SystemStyleObject["alignItems"]
  /**
   * The flex distribution of the card
   */
  justify?: SystemStyleObject["justifyContent"]
  /**
   * If `true`, the card will not have any styles
   */
  unstyled?: boolean
}

export interface CardRootProps
  extends HTMLChakraProps<"div", CardOptions>,
    SystemRecipeProps<"Card"> {}

export const CardRoot = forwardRef<CardRootProps, "div">(
  function CardRoot(props, ref) {
    const recipe = useSlotRecipe("Card")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const {
      children,
      direction = "column",
      justify,
      align,
      unstyled,
      ...rest
    } = localProps

    return (
      <CardStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...rest}
          className={cx("chakra-card", props.className)}
          flexDirection={direction}
          justifyContent={justify}
          alignItems={align}
          css={[!unstyled && styles.root, props.css]}
        >
          {children}
        </chakra.div>
      </CardStylesProvider>
    )
  },
)
