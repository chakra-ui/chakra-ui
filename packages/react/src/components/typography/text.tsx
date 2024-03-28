"use client"

import { compact, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  SystemStyleObject,
  chakra,
  useRecipe,
} from "../../styled-system"

interface TextOptions {
  /**
   * The CSS `text-align` property
   * @type SystemStyleObject["textAlign"]
   */
  align?: SystemStyleObject["textAlign"]
  /**
   * The CSS `text-decoration` property
   * @type SystemStyleObject["textDecoration"]
   */
  decoration?: SystemStyleObject["textDecoration"]
  /**
   * The CSS `text-transform` property
   * @type SystemStyleObject["textTransform"]
   */
  casing?: SystemStyleObject["textTransform"]
}

export interface TextProps
  extends HTMLChakraProps<"p", TextOptions>,
    RecipeProps<"Text"> {}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/text
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  function Text(props, ref) {
    const recipe = useRecipe("Text", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)

    const aliasedProps = compact({
      textAlign: localProps.align,
      textDecoration: localProps.decoration,
      textTransform: localProps.casing,
    })

    return (
      <chakra.p
        ref={ref}
        className={cx("chakra-text", props.className)}
        {...aliasedProps}
        {...localProps}
        css={[recipe(variantProps), localProps.css]}
      />
    )
  },
)

Text.displayName = "Text"
