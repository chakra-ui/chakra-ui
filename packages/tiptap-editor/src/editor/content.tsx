"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Box, defineStyle } from "@chakra-ui/react"
import { EditorContent } from "@tiptap/react"
import { useEditorContext } from "../context"

const editorCSS = defineStyle({
  "& .ProseMirror": {
    outline: "none",
    wordBreak: "break-word",
    minHeight: "full",
    padding: "1rem",
    fontSize: "0.9375rem",
    lineHeight: "1.6",
    color: "fg",

    // Paragraph spacing
    "& p": {
      margin: "0 0 0.75rem 0",
      lineHeight: "1.6",
      "&:last-child": { marginBottom: "0" },
    },

    // Headings with better hierarchy
    "& h1": {
      fontSize: "1.875rem",
      fontWeight: "700",
      lineHeight: "1.3",
      marginTop: "1.5rem",
      marginBottom: "0.875rem",
      "&:first-child": { marginTop: "0" },
    },
    "& h2": {
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "1.35",
      marginTop: "1.25rem",
      marginBottom: "0.75rem",
      "&:first-child": { marginTop: "0" },
    },
    "& h3": {
      fontSize: "1.25rem",
      fontWeight: "600",
      lineHeight: "1.4",
      marginTop: "1rem",
      marginBottom: "0.625rem",
      "&:first-child": { marginTop: "0" },
    },
    "& h4": {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.4",
      marginTop: "0.875rem",
      marginBottom: "0.5rem",
    },
    "& h5, & h6": {
      fontSize: "1rem",
      fontWeight: "600",
      lineHeight: "1.5",
      marginTop: "0.75rem",
      marginBottom: "0.5rem",
    },

    // Lists with better spacing
    "& ul, & ol": {
      paddingLeft: "1.75rem",
      marginTop: "0.625rem",
      marginBottom: "0.75rem",
    },
    "& li": {
      marginBottom: "0.375rem",
      paddingLeft: "0.25rem",
      "& > p": { marginBottom: "0.375rem" },
    },
    "& ul ul, & ol ol, & ul ol, & ol ul": {
      marginTop: "0.375rem",
      marginBottom: "0.375rem",
    },

    // Text formatting
    "& strong, & b": { fontWeight: "600" },
    "& em, & i": { fontStyle: "italic" },
    "& u": { textDecoration: "underline" },
    "& s": { textDecoration: "line-through" },

    // Inline code
    "& code": {
      fontFamily: "mono",
      fontSize: "0.875em",
      backgroundColor: "bg.muted",
      color: "fg.emphasized",
      padding: "0.125rem 0.375rem",
      borderRadius: "0.25rem",
      border: "1px solid",
      borderColor: "border.subtle",
    },

    // Code blocks
    "& pre": {
      fontFamily: "mono",
      fontSize: "0.875rem",
      backgroundColor: "bg.muted",
      border: "1px solid",
      borderColor: "border",
      borderRadius: "0.5rem",
      padding: "1rem",
      overflow: "auto",
      marginTop: "0.75rem",
      marginBottom: "0.75rem",
      "& code": {
        backgroundColor: "transparent",
        padding: "0",
        border: "none",
        color: "inherit",
      },
    },

    // Blockquotes
    "& blockquote": {
      borderLeftWidth: "3px",
      borderLeftColor: "border.emphasized",
      paddingLeft: "1rem",
      marginLeft: "0",
      marginTop: "0.75rem",
      marginBottom: "0.75rem",
      fontStyle: "italic",
      color: "fg.muted",
      "& p": { marginBottom: "0.5rem" },
    },

    // Horizontal rule
    "& hr": {
      border: "none",
      borderTop: "1px solid",
      borderColor: "border",
      margin: "1.5rem 0",
    },

    // Links
    "& a": {
      color: "colorPalette.fg",
      textDecoration: "underline",
      cursor: "pointer",
      textUnderlineOffset: "2px",
      _hover: {
        color: "colorPalette.emphasized",
        textDecorationColor: "colorPalette.emphasized",
      },
    },

    // Tables
    "& table": {
      borderCollapse: "collapse",
      width: "100%",
      marginTop: "0.75rem",
      marginBottom: "0.75rem",
      fontSize: "0.875rem",
    },
    "& th, & td": {
      border: "1px solid",
      borderColor: "border",
      padding: "0.5rem 0.75rem",
      textAlign: "left",
    },
    "& th": {
      fontWeight: "600",
      backgroundColor: "bg.subtle",
    },

    // Images
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "0.5rem",
      marginTop: "0.75rem",
      marginBottom: "0.75rem",
    },

    // Empty state
    "&.ProseMirror-focused": {
      outline: "none",
    },

    // Placeholder
    "& p.is-editor-empty:first-child::before": {
      content: "attr(data-placeholder)",
      float: "left",
      color: "fg.muted",
      pointerEvents: "none",
      height: "0",
    },
  },
})

export interface EditorRootProps extends BoxProps {
  /**
   * Minimum height of the editor
   * @default "200px"
   */
  minHeight?: string | number
}

export function EditorRoot(props: EditorRootProps) {
  const { css, minHeight = "200px", ...rest } = props
  const { editor } = useEditorContext()

  if (!editor) return null

  return (
    <Box css={[editorCSS, css]} minHeight={minHeight} {...rest}>
      <EditorContent editor={editor} />
    </Box>
  )
}
