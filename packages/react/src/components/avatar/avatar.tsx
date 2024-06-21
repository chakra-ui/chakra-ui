"use client"

import { Avatar as ArkAvatar } from "@ark-ui/react/avatar"
import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"
import { getInitials } from "./get-initials"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAvatarStyles,
} = createStyleContext("avatar")

export { useAvatarStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarRootProps
  extends HTMLChakraProps<"div", ArkAvatar.RootProps>,
    SlotRecipeProps<"avatar">,
    UnstyledProp {}

export const AvatarRoot = withProvider<HTMLDivElement, AvatarRootProps>(
  ArkAvatar.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarFallbackProps
  extends HTMLChakraProps<"div", ArkAvatar.FallbackProps> {}

export const AvatarFallback = withContext<HTMLDivElement, AvatarFallbackProps>(
  ArkAvatar.Fallback,
  "fallback",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarImageProps
  extends HTMLChakraProps<"img", ArkAvatar.ImageProps> {}

export const AvatarImage = withContext<HTMLImageElement, AvatarImageProps>(
  ArkAvatar.Image,
  "image",
  { forwardAsChild: true, defaultProps: { draggable: "false" } },
)

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarIconProps extends HTMLChakraProps<"svg"> {}

export const AvatarIcon = forwardRef<SVGElement, AvatarIconProps>(
  function AvatarIcon(props, ref) {
    return (
      <chakra.svg
        role="img"
        viewBox="0 0 128 128"
        width="100%"
        height="100%"
        ref={ref}
        {...props}
      >
        <path
          fill="currentColor"
          d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
        />
        <path
          fill="currentColor"
          d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
        />
      </chakra.svg>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export const AvatarInitial = (props: { name: string }) => {
  const { name } = props
  const initials = useMemo(() => getInitials(name), [name])
  return <>{initials}</>
}
