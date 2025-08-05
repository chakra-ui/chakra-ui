"use client"

import { chakra } from "@chakra-ui/react"

const TRAILING_PSEUDO_REGEX = /(::?[\w-]+(?:\([^)]*\))?)+$/
const EXCLUDE_CLASSNAME = ".not-prose"
function inWhere<T extends string>(selector: T): T {
  const rebuiltSelector = selector.startsWith("& ")
    ? selector.slice(2)
    : selector
  const match = selector.match(TRAILING_PSEUDO_REGEX)
  const pseudo = match ? match[0] : ""
  const base = match ? selector.slice(0, -match[0].length) : rebuiltSelector
  return `& :where(${base}):not(${EXCLUDE_CLASSNAME}, ${EXCLUDE_CLASSNAME} *)${pseudo}` as T
}

export const Prose = chakra("div", {
  base: {
    color: "fg.muted",
    maxWidth: "65ch",
    fontSize: "sm",
    lineHeight: "1.7em",
    [inWhere("& p")]: {
      marginTop: "1em",
      marginBottom: "1em",
    },
    [inWhere("& blockquote")]: {
      marginTop: "1.285em",
      marginBottom: "1.285em",
      paddingInline: "1.285em",
      borderInlineStartWidth: "0.25em",
      color: "fg",
    },
    [inWhere("& a")]: {
      color: "fg",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "2px",
      textDecorationColor: "border.muted",
      fontWeight: "500",
    },
    [inWhere("& strong")]: {
      fontWeight: "600",
    },
    [inWhere("& a strong")]: {
      color: "inherit",
    },
    [inWhere("& h1")]: {
      fontSize: "2.15em",
      letterSpacing: "-0.02em",
      marginTop: "0",
      marginBottom: "0.8em",
      lineHeight: "1.2em",
    },
    [inWhere("& h2")]: {
      fontSize: "1.4em",
      letterSpacing: "-0.02em",
      marginTop: "1.6em",
      marginBottom: "0.8em",
      lineHeight: "1.4em",
    },
    [inWhere("& h3")]: {
      fontSize: "1.285em",
      letterSpacing: "-0.01em",
      marginTop: "1.5em",
      marginBottom: "0.4em",
      lineHeight: "1.5em",
    },
    [inWhere("& h4")]: {
      marginTop: "1.4em",
      marginBottom: "0.5em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    [inWhere("& img")]: {
      marginTop: "1.7em",
      marginBottom: "1.7em",
      borderRadius: "lg",
      boxShadow: "inset",
    },
    [inWhere("& picture")]: {
      marginTop: "1.7em",
      marginBottom: "1.7em",
    },
    [inWhere("& picture > img")]: {
      marginTop: "0",
      marginBottom: "0",
    },
    [inWhere("& video")]: {
      marginTop: "1.7em",
      marginBottom: "1.7em",
    },
    [inWhere("& kbd")]: {
      fontSize: "0.85em",
      borderRadius: "xs",
      paddingTop: "0.15em",
      paddingBottom: "0.15em",
      paddingInlineEnd: "0.35em",
      paddingInlineStart: "0.35em",
      fontFamily: "inherit",
      color: "fg.muted",
      "--shadow": "colors.border",
      boxShadow: "0 0 0 1px var(--shadow),0 1px 0 1px var(--shadow)",
    },
    [inWhere("& code")]: {
      fontSize: "0.925em",
      letterSpacing: "-0.01em",
      borderRadius: "md",
      borderWidth: "1px",
      padding: "0.25em",
    },
    [inWhere("& pre code")]: {
      fontSize: "inherit",
      letterSpacing: "inherit",
      borderWidth: "inherit",
      padding: "0",
    },
    [inWhere("& h2 code")]: {
      fontSize: "0.9em",
    },
    [inWhere("& h3 code")]: {
      fontSize: "0.8em",
    },
    [inWhere("& pre")]: {
      backgroundColor: "bg.subtle",
      marginTop: "1.6em",
      marginBottom: "1.6em",
      borderRadius: "md",
      fontSize: "0.9em",
      paddingTop: "0.65em",
      paddingBottom: "0.65em",
      paddingInlineEnd: "1em",
      paddingInlineStart: "1em",
      overflowX: "auto",
      fontWeight: "400",
    },
    [inWhere("& ol")]: {
      marginTop: "1em",
      marginBottom: "1em",
      paddingInlineStart: "1.5em",
    },
    [inWhere("& ul")]: {
      marginTop: "1em",
      marginBottom: "1em",
      paddingInlineStart: "1.5em",
    },
    [inWhere("& li")]: {
      marginTop: "0.285em",
      marginBottom: "0.285em",
    },
    [inWhere("& ol > li")]: {
      paddingInlineStart: "0.4em",
      listStyleType: "decimal",
      "&::marker": {
        color: "fg.muted",
      },
    },
    [inWhere("& ul > li")]: {
      paddingInlineStart: "0.4em",
      listStyleType: "disc",
      "&::marker": {
        color: "fg.muted",
      },
    },
    [inWhere("& > ul > li p")]: {
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    [inWhere("& > ul > li > p:first-of-type")]: {
      marginTop: "1em",
    },
    [inWhere("& > ul > li > p:last-of-type")]: {
      marginBottom: "1em",
    },
    [inWhere("& > ol > li > p:first-of-type")]: {
      marginTop: "1em",
    },
    [inWhere("& > ol > li > p:last-of-type")]: {
      marginBottom: "1em",
    },
    [inWhere("& ul ul, ul ol, ol ul, ol ol")]: {
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    [inWhere("& dl")]: {
      marginTop: "1em",
      marginBottom: "1em",
    },
    [inWhere("& dt")]: {
      fontWeight: "600",
      marginTop: "1em",
    },
    [inWhere("& dd")]: {
      marginTop: "0.285em",
      paddingInlineStart: "1.5em",
    },
    [inWhere("& hr")]: {
      marginTop: "2.25em",
      marginBottom: "2.25em",
    },
    [inWhere("& :is(h1,h2,h3,h4,h5,hr) + *")]: {
      marginTop: "0",
    },
    [inWhere("& table")]: {
      width: "100%",
      tableLayout: "auto",
      textAlign: "start",
      lineHeight: "1.5em",
      marginTop: "2em",
      marginBottom: "2em",
    },
    [inWhere("& thead")]: {
      borderBottomWidth: "1px",
      color: "fg",
    },
    [inWhere("& tbody tr")]: {
      borderBottomWidth: "1px",
      borderBottomColor: "border",
    },
    [inWhere("& thead th")]: {
      paddingInlineEnd: "1em",
      paddingBottom: "0.65em",
      paddingInlineStart: "1em",
      fontWeight: "medium",
      textAlign: "start",
    },
    [inWhere("& thead th:first-of-type")]: {
      paddingInlineStart: "0",
    },
    [inWhere("& thead th:last-of-type")]: {
      paddingInlineEnd: "0",
    },
    [inWhere("& tbody td, tfoot td")]: {
      paddingTop: "0.65em",
      paddingInlineEnd: "1em",
      paddingBottom: "0.65em",
      paddingInlineStart: "1em",
    },
    [inWhere("& tbody td:first-of-type, tfoot td:first-of-type")]: {
      paddingInlineStart: "0",
    },
    [inWhere("& tbody td:last-of-type, tfoot td:last-of-type")]: {
      paddingInlineEnd: "0",
    },
    [inWhere("& figure")]: {
      marginTop: "1.625em",
      marginBottom: "1.625em",
    },
    [inWhere("& figure > *")]: {
      marginTop: "0",
      marginBottom: "0",
    },
    [inWhere("& figcaption")]: {
      fontSize: "0.85em",
      lineHeight: "1.25em",
      marginTop: "0.85em",
      color: "fg.muted",
    },
    [inWhere("& h1, h2, h3, h4")]: {
      color: "fg",
      fontWeight: "600",
    },
  },
  variants: {
    size: {
      md: {
        fontSize: "sm",
      },
      lg: {
        fontSize: "md",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
