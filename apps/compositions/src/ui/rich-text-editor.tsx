"use client"

import type { BoxProps, StackProps } from "@chakra-ui/react"
import { Box, HStack, StackSeparator, defineStyle } from "@chakra-ui/react"
import { Editor, EditorContent } from "@tiptap/react"
import {
  RichTextEditorContext,
  useRichTextEditorContext,
} from "compositions/ui/rich-text-editor-context"
import * as React from "react"

const proseMirrorBaseCss = defineStyle({
  display: "flex",
  flexDirection: "column",
  borderWidth: "1px",
  rounded: "l2",
  lineHeight: "1.5",

  "--content-padding-x": "spacing.5",
  "--content-padding-y": "spacing.5",

  "& img.ProseMirror-selectednode": {
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: "blue.focusRing",
  },

  "& .ProseMirror": {
    outline: "none",
    minHeight: "var(--content-min-height)",
    px: "var(--content-padding-x)",
    py: "var(--content-padding-y)",
    "& > * + *": { marginTop: "0.75em" },
    "& h1": {
      fontSize: "2.15em",
      letterSpacing: "-0.02em",
      lineHeight: "1.2em",
    },
    "& h2": {
      fontSize: "1.4em",
      letterSpacing: "-0.02em",
      lineHeight: "1.4em",
    },
    "& h3": {
      fontSize: "1.285em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    "& h4": {
      fontSize: "1.14em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    "& h5": {
      fontSize: "1em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    "& h6": {
      fontSize: "0.85em",
      letterSpacing: "-0.01em",
      lineHeight: "1.5em",
    },
    "& h1, h2, h3, h4, h5, h6": {
      color: "fg",
      fontWeight: "600",
    },
    "& code": {
      bg: "bg.muted",
      paddingInline: "0.25em",
      rounded: "sm",
      fontFamily: "mono",
      fontSize: "0.9em",
      borderWidth: "1px",
    },
    "& pre": {
      bg: "gray.900",
      color: "gray.100",
      padding: "4",
      rounded: "lg",
      overflowX: "auto",
      fontSize: "sm",
      lineHeight: "1.6",
      borderWidth: "1px",
      borderColor: "gray.700",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
    },
    "& pre code": {
      bg: "transparent",
      padding: "0",
      fontFamily: "mono",
      color: "inherit",
      borderWidth: "0",
    },
    "& blockquote": {
      borderStartWidth: "4px",
      borderStartColor: "border",
      paddingStart: "4",
    },
    "& ul:not([data-type='taskList'])": {
      paddingInlineStart: "1rem",
      listStyleType: "disc",
    },
    "& ol:not([data-type='taskList'])": {
      paddingInlineStart: "1rem",
      listStyleType: "decimal",
    },
    "& ul ul": {
      listStyleType: "circle",
    },
    "& ul ul ul": {
      listStyleType: "square",
    },
    "& ul[data-type='taskList'] li": {
      listStyle: "none",
      display: "flex",
      alignItems: "flex-start",
      gap: "2",
      "& input[type='checkbox']": {
        accentColor: "colorPalette.solid",
        marginTop: "1",
      },
    },
    "& hr": { my: "4" },
    "& a": { color: "blue.fg", textDecoration: "underline" },
    "& em": { fontStyle: "italic" },
    "& strong": { fontWeight: "bold" },
    "& p.is-editor-empty:first-of-type::before": {
      content: "attr(data-placeholder)",
      color: "fg.muted",
      pointerEvents: "none",
      float: "left",
      height: "0",
    },

    "& .node-hashtag": {
      layerStyle: "fill.surface",
      px: "0.25em",
      py: "2px",
      rounded: "l1",
    },
  },

  "&[data-disabled] .ProseMirror": {
    pointerEvents: "none",
    opacity: 0.5,
    cursor: "not-allowed",
  },
})

export interface RichTextEditorProps extends BoxProps {
  editor: Editor | null
  disabled?: boolean
}

export const RichTextEditorRoot = React.forwardRef<
  HTMLDivElement,
  RichTextEditorProps
>(function RichTextEditorRoot(props, ref) {
  const { editor, children, css, disabled, ...rest } = props
  const contextValue = React.useMemo(() => ({ editor }), [editor])
  return (
    <RichTextEditorContext.Provider value={contextValue}>
      <Box
        ref={ref}
        data-disabled={disabled || undefined}
        css={[proseMirrorBaseCss, css]}
        {...rest}
      >
        {children}
      </Box>
    </RichTextEditorContext.Provider>
  )
})

export interface RichTextEditorToolbarProps extends StackProps {
  sticky?: boolean
  stickyOffset?: string
}

export const RichTextEditorToolbar = React.forwardRef<
  HTMLDivElement,
  RichTextEditorToolbarProps
>(function RichTextEditorToolbar(props, ref) {
  const { sticky, stickyOffset = "0px", ...rest } = props
  return (
    <HStack
      ref={ref}
      py="1.5"
      px="3"
      roundedTop="l2"
      borderBottomWidth="1px"
      bg="bg"
      flexWrap="wrap"
      data-sticky={sticky || undefined}
      separator={<StackSeparator h="5" alignSelf="center" />}
      {...rest}
      style={{
        ["--sticky-offset" as string]: stickyOffset,
        ...rest.style,
      }}
      css={{
        "&[data-sticky]": {
          position: "sticky",
          top: "var(--sticky-offset, 0px)",
          zIndex: "1",
        },
      }}
    />
  )
})

export const RichTextEditorFooter = React.forwardRef<
  HTMLDivElement,
  StackProps
>(function RichTextEditorFooter(props, ref) {
  return <HStack ref={ref} gap="1" {...props} />
})

export interface RichTextEditorContentProps
  extends Omit<React.ComponentProps<typeof EditorContent>, "editor"> {}

export const RichTextEditorContent = React.forwardRef<
  HTMLDivElement,
  RichTextEditorContentProps
>(function RichTextEditorContent(props, ref) {
  const { editor } = useRichTextEditorContext()
  if (!editor) return null
  return <EditorContent editor={editor} {...props} innerRef={ref} />
})

export interface RichTextEditorControlGroupProps extends StackProps {}

export const RichTextEditorControlGroup = React.forwardRef<
  HTMLDivElement,
  RichTextEditorControlGroupProps
>(function RichTextEditorButtonGroup(props, ref) {
  return <HStack ref={ref} gap="1" {...props} />
})

export const RichTextEditor = {
  Root: RichTextEditorRoot,
  Toolbar: RichTextEditorToolbar,
  Content: RichTextEditorContent,
  ControlGroup: RichTextEditorControlGroup,
  Footer: RichTextEditorFooter,
} as const

export * from "compositions/ui/rich-text-editor-core"
export * as Control from "compositions/ui/rich-text-editor-control"

export {
  createBooleanControl,
  createSelectControl,
  createSwatchControl,
} from "compositions/ui/rich-text-editor-control"

export { useRichTextEditorContext } from "compositions/ui/rich-text-editor-context"
