import { forwardRef, chakra, HTMLChakraProps } from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import type { FC, RefAttributes } from "react"

type Pretty<T> = { [K in keyof T]: T[K] } & {}
type Merge<P, T> = Pretty<Omit<P, keyof T> & T>
type LegacyProps = "as" | "legacyBehavior" | "passHref"

type LinkComponent = FC<RefAttributes<HTMLAnchorElement> & LinkProps>

export type LinkProps = Merge<
  HTMLChakraProps<"a">,
  Omit<NextLinkProps, LegacyProps>
>

export const Link: LinkComponent = forwardRef<LinkProps, typeof NextLink>(
  function Link(props, ref) {
    const { href, children, ...rest } = props
    return (
      <chakra.a ref={ref} href={href as any} {...rest} as={NextLink}>
        {children}
      </chakra.a>
    )
  },
)
