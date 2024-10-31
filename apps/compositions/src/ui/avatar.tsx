"use client"

import type { GroupProps, SlotRecipeProps } from "@chakra-ui/react"
import { Avatar as ChakraAvatar, Group } from "@chakra-ui/react"
import { forwardRef } from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export interface AvatarProps extends ChakraAvatar.RootProps {
  as?: React.ElementType // Add `as` prop type here
  name?: string
  src?: string
  srcSet?: string
  loading?: ImageProps["loading"]
  icon?: React.ReactElement
  fallback?: React.ReactNode
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      as = "div",
      name,
      src,
      srcSet,
      loading,
      icon,
      fallback,
      children,
      ...rest
    } = props
    return (
      <ChakraAvatar.Root as={as} ref={ref} {...rest}>
        <AvatarFallback name={name} icon={icon}>
          {fallback}
        </AvatarFallback>
        <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
        {children}
      </ChakraAvatar.Root>
    )
  },
)

interface AvatarFallbackProps extends ChakraAvatar.FallbackProps {
  as?: React.ElementType // Add `as` prop type here
  name?: string
  icon?: React.ReactElement
}

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const { as = "div", name, icon, children, ...rest } = props
    return (
      <ChakraAvatar.Fallback as={as} ref={ref} {...rest}>
        {children}
        {name != null && children == null && <>{getInitials(name)}</>}
        {name == null && children == null && (
          <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>
        )}
      </ChakraAvatar.Fallback>
    )
  },
)

function getInitials(name: string) {
  const names = name.trim().split(" ")
  const firstName = names[0] != null ? names[0] : ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

interface AvatarGroupProps extends GroupProps, SlotRecipeProps<"avatar"> {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const { size, variant, borderless, ...rest } = props
    return (
      <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>
        <Group gap="0" spaceX="-3" ref={ref} {...rest} />
      </ChakraAvatar.PropsProvider>
    )
  },
)
