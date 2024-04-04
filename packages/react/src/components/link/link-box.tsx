"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface LinkOverlayProps extends HTMLChakraProps<"a"> {
  /**
   *  If `true`, the link will open in new tab
   *
   * @default false
   */
  external?: boolean
}

export const LinkOverlay = forwardRef<HTMLAnchorElement, LinkOverlayProps>(
  function LinkOverlay(props, ref) {
    const { external, target, rel, className, ...rest } = props
    return (
      <chakra.a
        {...rest}
        ref={ref}
        className={cx("chakra-linkbox__overlay", className)}
        rel={external ? "noopener noreferrer" : rel}
        target={external ? "_blank" : target}
        css={[
          {
            position: "static",
            "&::before": {
              content: "''",
              cursor: "inherit",
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              width: "100%",
              height: "100%",
            },
          },
          props.css,
        ]}
      />
    )
  },
)

export interface LinkBoxProps extends HTMLChakraProps<"div"> {}

/**
 * `LinkBox` is used to wrap content areas within a link while ensuring semantic html
 *
 * @see Docs https://chakra-ui.com/docs/navigation/link-overlay
 * @see Resources https://www.sarasoueidan.com/blog/nested-links
 */
export const LinkBox = forwardRef<HTMLDivElement, LinkBoxProps>(
  function LinkBox(props, ref) {
    const { className, ...rest } = props

    return (
      <chakra.div
        ref={ref}
        position="relative"
        {...rest}
        className={cx("chakra-linkbox", className)}
        css={[
          {
            /* Elevate the links and abbreviations up */
            "& a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
              position: "relative",
              zIndex: 1,
            },
          },
          props.css,
        ]}
      />
    )
  },
)
