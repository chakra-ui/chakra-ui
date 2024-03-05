import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  RecipePropsProvider,
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"

interface AvatarGroupOptions {
  /**
   * The space between the avatars in the group.
   * @default "-0.75rem"
   * @type SystemStyleObject["margin"]
   */
  spacing?: SystemStyleObject["margin"]
}

export interface AvatarGroupProps
  extends AvatarGroupOptions,
    HTMLChakraProps<"div">,
    SystemRecipeProps<"Avatar"> {}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps, "div">(
  function AvatarGroup(props, ref) {
    const recipe = useSlotRecipe("Avatar")
    const [variantProps, { spacing = "-0.75rem", ...localProps }] =
      recipe.splitVariantProps(props)

    return (
      <RecipePropsProvider value={variantProps}>
        <chakra.div
          ref={ref}
          role="group"
          {...localProps}
          css={{
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            flexDirection: "row",
            "& > *:not(style) ~ *:not(style)": {
              marginInlineStart: spacing,
            },
          }}
          className={cx("chakra-avatar__group", props.className)}
        />
      </RecipePropsProvider>
    )
  },
)

AvatarGroup.displayName = "AvatarGroup"
