"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  mergeProps,
  mergeRefs,
  useParentRecipeProps,
  useSlotRecipe,
} from "../../styled-system"
import { AvatarContextProvider, AvatarStylesProvider } from "./avatar-context"
import { useAvatar } from "./use-avatar"

export interface AvatarRootProps
  extends HTMLChakraProps<"span">,
    SlotRecipeProps<"Avatar">,
    UnstyledProp {}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(
  function AvatarRoot({ unstyled, ...props }, ref) {
    const api = useAvatar()

    const recipe = useSlotRecipe("Avatar", props.recipe)
    const parentVariantProps = useParentRecipeProps()
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const _variantProps = mergeProps<any>(parentVariantProps, variantProps)

    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(_variantProps)

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
