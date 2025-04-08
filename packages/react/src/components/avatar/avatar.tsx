"use client"

import type { Assign } from "@ark-ui/react"
import { Avatar as ArkAvatar } from "@ark-ui/react/avatar"
import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
  useSlotRecipe,
} from "../../styled-system"
import { cx } from "../../utils"
import { Group, type GroupProps } from "../group"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAvatarStyles,
  useClassNames,
  PropsProvider,
} = createSlotRecipeContext({ key: "avatar" })

export { useAvatarStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarRootProviderBaseProps
  extends Assign<ArkAvatar.RootProviderBaseProps, SlotRecipeProps<"avatar">>,
    UnstyledProp {}

export interface AvatarRootProviderProps
  extends HTMLChakraProps<"div", AvatarRootProviderBaseProps> {}

export const AvatarRootProvider = withProvider<
  HTMLDivElement,
  AvatarRootProviderProps
>(ArkAvatar.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarRootBaseProps
  extends Assign<ArkAvatar.RootBaseProps, SlotRecipeProps<"avatar">>,
    UnstyledProp {}

export interface AvatarRootProps
  extends HTMLChakraProps<"div", AvatarRootBaseProps> {}

export const AvatarRoot = withProvider<HTMLDivElement, AvatarRootProps>(
  ArkAvatar.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const AvatarPropsProvider =
  PropsProvider as React.Provider<AvatarRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarFallbackProps
  extends HTMLChakraProps<"div", ArkAvatar.FallbackProps> {
  /**
   * The name to derive the initials from.
   * If not provided, the fallback will display a generic icon.
   */
  name?: string
}

const StyledFallback = chakra(ArkAvatar.Fallback, {}, { forwardAsChild: true })

function getFallbackChildren(props: AvatarFallbackProps) {
  if (props.children || props.asChild) return props.children
  if (props.name) return getInitials(props.name)
  return <AvatarIcon />
}

function getInitials(name: string) {
  const names = name.trim().split(" ")
  const firstName = names[0] != null ? names[0] : ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const styles = useAvatarStyles()
    const classNames = useClassNames()
    const { name: _, ...rest } = props
    return (
      <StyledFallback
        ref={ref}
        {...rest}
        className={cx(props.className, classNames.fallback)}
        css={[styles.fallback, props.css]}
      >
        {getFallbackChildren(props)}
      </StyledFallback>
    )
  },
)
////////////////////////////////////////////////////////////////////////////////////

export interface AvatarImageProps
  extends HTMLChakraProps<"img", ArkAvatar.ImageProps> {}

export const AvatarImage = withContext<HTMLImageElement, AvatarImageProps>(
  ArkAvatar.Image,
  "image",
  {
    forwardAsChild: true,
    defaultProps: {
      draggable: "false",
      referrerPolicy: "no-referrer",
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarIconProps extends HTMLChakraProps<"svg"> {}

export const AvatarIcon = forwardRef<SVGElement, AvatarIconProps>(
  function AvatarIcon(props, ref) {
    return (
      <chakra.svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1.2em"
        width="1.2em"
        ref={ref}
        {...props}
      >
        <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
      </chakra.svg>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export const AvatarContext = ArkAvatar.Context

export interface AvatarStatusChangeDetails
  extends ArkAvatar.StatusChangeDetails {}

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarGroupProps
  extends GroupProps,
    SlotRecipeProps<"avatar"> {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const recipe = useSlotRecipe({ key: "avatar" })
    const [variantProps, localProps] = useMemo(
      () => recipe.splitVariantProps(props),
      [props, recipe],
    )
    return (
      <PropsProvider value={variantProps}>
        <Group gap="0" spaceX="-3" ref={ref} {...localProps} />
      </PropsProvider>
    )
  },
)
