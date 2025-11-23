"use client"

import {
  Box,
  type BoxProps,
  Button,
  HStack,
  IconButton,
  type IconButtonProps,
  Input,
  Popover,
  Portal,
  Separator,
  type StackProps,
  defineStyle,
} from "@chakra-ui/react"
import { type ChainedCommands, type Editor, EditorContent } from "@tiptap/react"
import { Tooltip } from "compositions/ui/tooltip"
import type { ReactNode } from "react"
import { createContext, forwardRef, useContext, useState } from "react"
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuEraser,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuMinus,
  LuQuote,
  LuRedo,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
  LuUndo,
  LuUnlink,
} from "react-icons/lu"

////////////////////////////////////////////////////////////////////////////////////

interface RichTextEditorContextValue {
  editor: Editor | null
}

type EditorChain = ChainedCommands & {
  [key: string]: any
}

const RichTextEditorContext = createContext<RichTextEditorContextValue | null>(
  null,
)

export function useRichTextEditorContext() {
  const context = useContext(RichTextEditorContext)
  if (!context) {
    throw new Error(
      "useRichTextEditorContext must be used within a RichTextEditor",
    )
  }
  return context
}

////////////////////////////////////////////////////////////////////////////////////

export interface RichTextEditorProps extends BoxProps {
  editor: Editor | null
  children: ReactNode
}

export const RichTextEditorRoot = forwardRef<
  HTMLDivElement,
  RichTextEditorProps
>(function RichTextEditor(props, ref) {
  const { editor, children, ...rest } = props

  return (
    <RichTextEditorContext.Provider value={{ editor }}>
      <Box
        ref={ref}
        border="1px solid"
        borderColor="border"
        borderRadius="md"
        overflow="hidden"
        {...rest}
      >
        {children}
      </Box>
    </RichTextEditorContext.Provider>
  )
})

////////////////////////////////////////////////////////////////////////////////////

const baseCss = defineStyle({
  "& .ProseMirror": {
    outline: "none",
    minHeight: "100px",
    padding: "4",
    "& > * + *": {
      marginTop: "0.75em",
    },
    "& ul, & ol": {
      paddingInlineStart: "4",
    },
    "& h1": {
      fontSize: "2xl",
      fontWeight: "bold",
    },
    "& h2": {
      fontSize: "xl",
      fontWeight: "bold",
    },
    "& h3": {
      fontSize: "lg",
      fontWeight: "bold",
    },
    "& code": {
      bg: "bg.muted",
      px: "1",
      rounded: "sm",
    },
    "& blockquote": {
      borderStartWidth: "4px",
      borderStartColor: "border",
      paddingStart: "4",
      fontStyle: "italic",
    },
    "& ul": {
      paddingInlineStart: "4",
      listStyleType: "disc",
      listStylePosition: "outside",
    },
    "& ol": {
      paddingInlineStart: "4",
      listStyleType: "decimal",
      listStylePosition: "outside",
    },
    "& ul ul": {
      listStyleType: "circle",
    },
    "& ul ul ul": {
      listStyleType: "square",
    },
    "& hr": {
      my: "4",
    },
    "& a": {
      color: "fg.link",
      textDecoration: "underline",
    },
    "& em": {
      fontStyle: "italic",
    },
    "& p[data-placeholder]::before": {
      content: "attr(data-placeholder)",
      color: "fg.muted",
      pointerEvents: "none",
      userSelect: "none",
    },
  },
})

export interface RichTextEditorContentProps extends BoxProps {}

export const Content = forwardRef<HTMLDivElement, RichTextEditorContentProps>(
  function Content(props, ref) {
    const { editor } = useRichTextEditorContext()
    if (!editor) return null
    const { css, ...rest } = props
    return (
      <Box ref={ref} css={[baseCss, css]} {...rest}>
        <EditorContent editor={editor} />
      </Box>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RichTextEditorToolbarProps extends StackProps {}

export const Toolbar = forwardRef<HTMLDivElement, RichTextEditorToolbarProps>(
  function Toolbar(props, ref) {
    return (
      <HStack
        ref={ref}
        borderBottom="1px solid"
        borderColor="border"
        p="2"
        gap="1"
        wrap="wrap"
        {...props}
      />
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RichTextEditorControlsGroupProps extends StackProps {}

export const ControlsGroup = forwardRef<
  HTMLDivElement,
  RichTextEditorControlsGroupProps
>(function ControlsGroup(props, ref) {
  return (
    <HStack ref={ref} gap="1" {...props}>
      {props.children}
      <Separator orientation="vertical" h="5" mx="1" />
    </HStack>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface RichTextEditorControlProps
  extends Omit<IconButtonProps, "aria-label"> {
  icon: ReactNode
  label: string
  isActive?: boolean
}

export const Control = forwardRef<
  HTMLButtonElement,
  RichTextEditorControlProps
>(function Control(props, ref) {
  const { icon, label, isActive, ...rest } = props
  return (
    <Tooltip content={label}>
      <IconButton
        ref={ref}
        variant={isActive ? "subtle" : "ghost"}
        aria-label={label}
        size="xs"
        {...rest}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
})

export interface RichTextEditorControlProps
  extends Omit<IconButtonProps, "aria-label"> {
  icon: ReactNode
  label: string
  isActive?: boolean
}

interface CreateControlOptions {
  label: string
  icon: React.ElementType
  isActive?: {
    name: string
    attributes?: Record<string, any>
  }
  isDisabled?: (editor: Editor) => boolean
  command: (chain: EditorChain) => ChainedCommands
}

function createControl({
  label,
  icon: Icon,
  isActive,
  command,
  isDisabled,
}: CreateControlOptions) {
  const CreatedControl = forwardRef<
    HTMLButtonElement,
    Partial<RichTextEditorControlProps>
  >((props, ref) => {
    const { editor } = useRichTextEditorContext()

    if (!editor) return null

    const active = isActive
      ? editor.isActive(isActive.name, isActive.attributes)
      : false

    const disabled = isDisabled ? isDisabled(editor) : false

    const handleClick = () => {
      command(editor.chain().focus()).run()
    }

    return (
      <Control
        ref={ref}
        label={label}
        icon={<Icon />}
        isActive={active}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      />
    )
  })

  return CreatedControl
}

export const Bold = createControl({
  label: "Bold",
  icon: LuBold,
  isActive: { name: "bold" },
  command: (chain) => chain.toggleBold(),
})

export const Italic = createControl({
  label: "Italic",
  icon: LuItalic,
  isActive: { name: "italic" },
  command: (chain) => chain.toggleItalic(),
})

export const Underline = createControl({
  label: "Underline",
  icon: LuUnderline,
  isActive: { name: "underline" },
  command: (chain) => chain.toggleUnderline(),
})

export const Strike = createControl({
  label: "Strike",
  icon: LuStrikethrough,
  isActive: { name: "strike" },
  command: (chain) => chain.toggleStrike(),
})

export const Code = createControl({
  label: "Code",
  icon: LuCode,
  isActive: { name: "code" },
  command: (chain) => chain.toggleCode(),
})

export const H1 = createControl({
  label: "Heading 1",
  icon: LuHeading1,
  isActive: { name: "heading", attributes: { level: 1 } },
  command: (chain) => chain.toggleHeading({ level: 1 }),
})

export const H2 = createControl({
  label: "Heading 2",
  icon: LuHeading2,
  isActive: { name: "heading", attributes: { level: 2 } },
  command: (chain) => chain.toggleHeading({ level: 2 }),
})

export const H3 = createControl({
  label: "Heading 3",
  icon: LuHeading3,
  isActive: { name: "heading", attributes: { level: 3 } },
  command: (chain) => chain.toggleHeading({ level: 3 }),
})

export const H4 = createControl({
  label: "Heading 4",
  icon: LuHeading4,
  isActive: { name: "heading", attributes: { level: 4 } },
  command: (chain) => chain.toggleHeading({ level: 4 }),
})

export const BulletList = createControl({
  label: "Bullet List",
  icon: LuList,
  isActive: { name: "bulletList" },
  command: (chain) => chain.toggleBulletList(),
})

export const OrderedList = createControl({
  label: "Ordered List",
  icon: LuListOrdered,
  isActive: { name: "orderedList" },
  command: (chain) => chain.toggleOrderedList(),
})

export const Blockquote = createControl({
  label: "Blockquote",
  icon: LuQuote,
  isActive: { name: "blockquote" },
  command: (chain) => chain.toggleBlockquote(),
})

export const Hr = createControl({
  label: "Horizontal Rule",
  icon: LuMinus,
  command: (chain) => chain.setHorizontalRule(),
})

export const Unlink = createControl({
  label: "Unlink",
  icon: LuUnlink,
  isActive: { name: "link" },
  command: (chain) => chain.unsetLink(),
})

export const Subscript = createControl({
  label: "Subscript",
  icon: LuSubscript,
  isActive: { name: "subscript" },
  command: (chain) => chain.toggleSubscript(),
})

export const Superscript = createControl({
  label: "Superscript",
  icon: LuSuperscript,
  isActive: { name: "superscript" },
  command: (chain) => chain.toggleSuperscript(),
})

export const AlignLeft = createControl({
  label: "Align Left",
  icon: LuAlignLeft,
  isActive: { name: "textAlign", attributes: { textAlign: "left" } },
  command: (chain) => chain.setTextAlign("left"),
})

export const AlignCenter = createControl({
  label: "Align Center",
  icon: LuAlignCenter,
  isActive: { name: "textAlign", attributes: { textAlign: "center" } },
  command: (chain) => chain.setTextAlign("center"),
})

export const AlignRight = createControl({
  label: "Align Right",
  icon: LuAlignRight,
  isActive: { name: "textAlign", attributes: { textAlign: "right" } },
  command: (chain) => chain.setTextAlign("right"),
})

export const AlignJustify = createControl({
  label: "Align Justify",
  icon: LuAlignJustify,
  isActive: { name: "textAlign", attributes: { textAlign: "justify" } },
  command: (chain) => chain.setTextAlign("justify"),
})

// TODO: Implement a safe, type-aware pattern to extract and call TipTap commands
// Goals:
// 1. Avoid using `any` when calling `editor.chain()` or `editor.can()`.
// 2. Make command calls type-safe while supporting all TipTap basic extensions.
// 3. Ensure commands exist before executing (e.g., `undo`, `redo`, `setLink`).
// 4. Provide a reusable helper to check command availability and execute safely.
// 5. Keep rich TypeScript types for all editor controls without manual type casting.
export const Undo = createControl({
  label: "Undo",
  icon: LuUndo,
  isDisabled: (editor) => (!editor.can() as any).undo(),
  command: (chain) => chain.undo(),
})

export const Redo = createControl({
  label: "Redo",
  icon: LuRedo,
  isDisabled: (editor) => (!editor.can() as any).redo(),
  command: (chain) => chain.redo(),
})

export const ClearFormatting = createControl({
  label: "Clear Formatting",
  icon: LuEraser,
  isDisabled: (editor) => !editor,
  command: (chain) =>
    (chain.focus().unsetAllMarks().clearNodes() as any).setParagraph(),
})

export const LinkControl = forwardRef<
  HTMLButtonElement,
  Omit<RichTextEditorControlProps, "icon" | "label">
>(function LinkControl(props, ref) {
  const { editor } = useRichTextEditorContext()
  const [linkState, setLinkState] = useState({
    open: false,
    url: "",
    external: false,
  })

  if (!editor) return null

  const handleOpen = () => {
    const markAttrs = editor.getAttributes("link")
    setLinkState({
      open: true,
      url: markAttrs.href ?? "",
      external: markAttrs.target === "_blank",
    })
  }

  const handleApply = () => {
    const trimmed = linkState.url.trim()

    const chain = editor.chain() as any

    if (!trimmed) {
      chain.focus().unsetLink().run()
      setLinkState((prev) => ({ ...prev, open: false }))
      return
    }

    const finalUrl = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`

    chain
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: finalUrl,
        ...(linkState.external ? { target: "_blank" } : {}),
      })
      .run()

    setLinkState((prev) => ({ ...prev, open: false }))
  }

  return (
    <Popover.Root
      open={linkState.open}
      onOpenChange={(e) => setLinkState((prev) => ({ ...prev, open: e.open }))}
    >
      <Popover.Trigger>
        <Control
          ref={ref}
          icon={<LuLink />}
          isActive={editor.isActive("link")}
          onClick={handleOpen}
          label="Insert Link"
          {...props}
        />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p="0" minW="240px">
            <Popover.Body p="3">
              <HStack mb="2" gap="2">
                <Box position="relative" flex="1">
                  <Input
                    placeholder="Enter URL"
                    value={linkState.url}
                    onChange={(e) =>
                      setLinkState((prev) => ({ ...prev, url: e.target.value }))
                    }
                    size="sm"
                    pr="8"
                    h="12"
                  />
                  <Tooltip
                    content={
                      linkState.external
                        ? "Open in new tab"
                        : "Open in same tab"
                    }
                  >
                    <IconButton
                      aria-label="Toggle external link"
                      size="xs"
                      variant={linkState.external ? "solid" : "outline"}
                      onClick={() =>
                        setLinkState((prev) => ({
                          ...prev,
                          external: !prev.external,
                        }))
                      }
                      position="absolute"
                      top="50%"
                      right="2"
                      transform="translateY(-50%)"
                    >
                      <LuLink />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Button size="sm" onClick={handleApply}>
                  Save
                </Button>
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
})
