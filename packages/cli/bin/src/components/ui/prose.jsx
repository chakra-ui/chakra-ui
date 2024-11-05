"use client"

import { chakra } from "@chakra-ui/react"

export const Prose = chakra("div", {
  base: {
    color: "fg.muted",
    maxWidth: "65ch",
    fontSize: "sm",
    lineHeight: "1.7em",
    "& p": {
      marginTop: "1em",
      marginBottom: "1em",
    },
    "& blockquote": {
      marginTop: "1.285em",
      marginBottom: "1.285em",
      paddingInline: "1.285em",
      borderInlineStartWidth: "0.25em",
    },
    "& a": {
      color: "fg",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "2px",
      textDecorationColor: "border.muted",
      fontWeight: "500",
    },
    "& strong": {
      fontWeight: "600",
    },
    "& a strong": {
      color: "inherit",
    },
    "& h1": {
      fontSize: "2.15em",
      letterSpacing: "-0.02em",
      marginTop: "0",
      marginBottom: "0.8em",
      lineHeight: "1.2em",
    },
    "& h2": {
      fontSize: "1.4em",
      letterSpacing: "-0.02em",
      marginTop: "1.6em",
      marginBottom: "0.8em",
      lineHeight: "1.4em",
    },
    "& h3": {
      fontSize: "1.285em",
      letterSpacing: "-0.01em",
      marginTop: "1.5em",
      marginBottom: "0.4em",
      lineHeight: "1.5em",
    },
    "& h4": {
      marginTop: "1.4em",
      marginBottom: "0.5em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    "& img": {
      marginTop: "1.7em",
      marginBottom: "1.7em",
      borderRadius: "lg",
      boxShadow: "inset",
    },
    "& picture": {
      marginTop: "1.7em",
      marginBottom: "1.7em",
    },
    "& picture > img": {
      marginTop: "0",
      marginBottom: "0",
    },
    "& video": {
      marginTop: "1.7em",
      marginBottom: "1.7em",
    },
    "& kbd": {
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
    "& code": {
      fontSize: "0.925em",
      letterSpacing: "-0.01em",
      borderRadius: "md",
      borderWidth: "1px",
      padding: "0.25em",
    },
    "& pre code": {
      fontSize: "inherit",
      letterSpacing: "inherit",
      borderWidth: "inherit",
      padding: "0",
    },
    "& h2 code": {
      fontSize: "0.9em",
    },
    "& h3 code": {
      fontSize: "0.8em",
    },
    "& pre": {
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
    "& ol": {
      marginTop: "1em",
      marginBottom: "1em",
      paddingInlineStart: "1.5em",
    },
    "& ul": {
      marginTop: "1em",
      marginBottom: "1em",
      paddingInlineStart: "1.5em",
    },
    "& li": {
      marginTop: "0.285em",
      marginBottom: "0.285em",
    },
    "& ol > li": {
      paddingInlineStart: "0.4em",
      listStyleType: "decimal",
      "&::marker": {
        color: "fg.muted",
      },
    },
    "& ul > li": {
      paddingInlineStart: "0.4em",
      listStyleType: "disc",
      "&::marker": {
        color: "fg.muted",
      },
    },
    "& > ul > li p": {
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    "& > ul > li > p:first-of-type": {
      marginTop: "1em",
    },
    "& > ul > li > p:last-of-type": {
      marginBottom: "1em",
    },
    "& > ol > li > p:first-of-type": {
      marginTop: "1em",
    },
    "& > ol > li > p:last-of-type": {
      marginBottom: "1em",
    },
    "& ul ul, ul ol, ol ul, ol ol": {
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    "& dl": {
      marginTop: "1em",
      marginBottom: "1em",
    },
    "& dt": {
      fontWeight: "600",
      marginTop: "1em",
    },
    "& dd": {
      marginTop: "0.285em",
      paddingInlineStart: "1.5em",
    },
    "& hr": {
      marginTop: "2.25em",
      marginBottom: "2.25em",
    },
    "& :is(h1,h2,h3,h4,h5,hr) + *": {
      marginTop: "0",
    },
    "& table": {
      width: "100%",
      tableLayout: "auto",
      textAlign: "start",
      lineHeight: "1.5em",
      marginTop: "2em",
      marginBottom: "2em",
    },
    "& thead": {
      borderBottomWidth: "1px",
      color: "fg",
    },
    "& tbody tr": {
      borderBottomWidth: "1px",
      borderBottomColor: "border",
    },
    "& thead th": {
      paddingInlineEnd: "1em",
      paddingBottom: "0.65em",
      paddingInlineStart: "1em",
      fontWeight: "medium",
      textAlign: "start",
    },
    "& thead th:first-of-type": {
      paddingInlineStart: "0",
    },
    "& thead th:last-of-type": {
      paddingInlineEnd: "0",
    },
    "& tbody td, tfoot td": {
      paddingTop: "0.65em",
      paddingInlineEnd: "1em",
      paddingBottom: "0.65em",
      paddingInlineStart: "1em",
    },
    "& tbody td:first-of-type, tfoot td:first-of-type": {
      paddingInlineStart: "0",
    },
    "& tbody td:last-of-type, tfoot td:last-of-type": {
      paddingInlineEnd: "0",
    },
    "& figure": {
      marginTop: "1.625em",
      marginBottom: "1.625em",
    },
    "& figure > *": {
      marginTop: "0",
      marginBottom: "0",
    },
    "& figcaption": {
      fontSize: "0.85em",
      lineHeight: "1.25em",
      marginTop: "0.85em",
      color: "fg.muted",
    },
    "& h1, h2, h3, h4": {
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
