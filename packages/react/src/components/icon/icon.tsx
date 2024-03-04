import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

const fallbackIcon = {
  path: (
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        fill="none"
        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      />
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  ),
}

export interface IconProps
  extends HTMLChakraProps<"svg">,
    SystemRecipeProps<"Icon"> {}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = forwardRef<IconProps, "svg">(function Icon(props, ref) {
  const recipe = useRecipe("Icon")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  return (
    <chakra.svg
      verticalAlign="middle"
      viewBox="0 0 24 24"
      ref={ref}
      {...localProps}
      css={[styles, props.css]}
      className={cx("chakra-icon", props.className)}
    >
      {props.children ?? fallbackIcon.path}
    </chakra.svg>
  )
})

Icon.displayName = "Icon"
