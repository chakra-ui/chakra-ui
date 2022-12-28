import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { PropsWithChildren } from "react"

export type NextChakraLinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, "as">
>

//  Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: NextChakraLinkProps) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink as="span" {...chakraProps}>
        {children}
      </ChakraLink>
    </NextLink>
  )
}
