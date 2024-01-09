import {
  LinkProps as ChakraLinkProps,
  HTMLChakraProps,
  ThemingProps,
  chakra,
  omitThemingProps,
  useStyleConfig,
} from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { forwardRef, type FC, type RefAttributes } from "react"
import { interopDefault } from "./interop"

const LinkEl = interopDefault(NextLink)

const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

type Pretty<T> = { [K in keyof T]: T[K] } & {}
type Merge<P, T> = Pretty<Omit<P, keyof T> & T>
type LegacyProps = "as" | "legacyBehavior" | "passHref"

type LinkComponent = FC<RefAttributes<HTMLAnchorElement> & LinkProps>

export type LinkProps = Merge<
  HTMLChakraProps<"a"> & ThemingProps<"Link"> & ChakraLinkProps,
  Omit<NextLinkProps, LegacyProps>
>

export const Link: LinkComponent = forwardRef(function Link(props, ref) {
  const styles = useStyleConfig("Link", props)
  const { className, isExternal, href, children, ...rest } =
    omitThemingProps(props)

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      ref={ref}
      href={href as any}
      {...rest}
      className={cx("chakra-link", className)}
      __css={styles}
      as={LinkEl}
    >
      {children}
    </chakra.a>
  )
})
