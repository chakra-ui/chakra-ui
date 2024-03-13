import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  SystemStyleObject,
  chakra,
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
    SlotRecipeProps<"Card"> {}

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  function CardRoot(props, ref) {
    const recipe = useSlotRecipe("Card", props.recipe)
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
