import {
  forwardRef,
  chakra,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import type { FC, RefAttributes } from "react"

const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

type Pretty<T> = { [K in keyof T]: T[K] } & {}
type Merge<P, T> = Pretty<Omit<P, keyof T> & T>
type LegacyProps = "as" | "legacyBehavior" | "passHref"

type LinkComponent = FC<RefAttributes<HTMLAnchorElement> & LinkProps>

export type LinkProps = Merge<
  HTMLChakraProps<"a"> & ThemingProps<"Link">,
  Omit<NextLinkProps, LegacyProps>
>

export const Link: LinkComponent = forwardRef(function Link(props, ref) {
  const styles = useStyleConfig("Link", props)
  const { className, href, children, ...rest } = omitThemingProps(props)

  return (
    <chakra.a
      ref={ref}
      href={href as any}
      {...rest}
      className={cx("chakra-link", className)}
      __css={styles}
      as={NextLink}
    >
      {children}
    </chakra.a>
  )
})
