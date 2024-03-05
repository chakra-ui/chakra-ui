import { compact, cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  mergeRefs,
  useParentRecipeProps,
  useSlotRecipe,
} from "../../styled-system"
import { AvatarContextProvider, AvatarStylesProvider } from "./avatar-context"
import { useAvatar } from "./use-avatar"

export interface AvatarRootProps
  extends HTMLChakraProps<"span">,
    SystemRecipeProps<"Avatar"> {}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(
  function AvatarRoot(props, ref) {
    const recipe = useSlotRecipe("Avatar")
    const parentVariantProps = useParentRecipeProps()

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe({ ...parentVariantProps, ...compact(variantProps) })

    const api = useAvatar()

    return (
      <AvatarStylesProvider value={styles}>
        <AvatarContextProvider value={api}>
          <chakra.span
            {...localProps}
            ref={mergeRefs(api.rootRef, ref)}
            className={cx("chakra-avatar", props.className)}
            data-loaded={dataAttr(api.isLoaded)}
            data-in-group={dataAttr(!!parentVariantProps)}
            css={styles.root}
          />
        </AvatarContextProvider>
      </AvatarStylesProvider>
    )
  },
)

AvatarRoot.displayName = "AvatarRoot"
