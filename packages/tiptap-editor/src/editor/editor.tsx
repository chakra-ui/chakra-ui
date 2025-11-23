"use client"

import {
  Box,
  type BoxProps,
  Button,
  ColorPicker as ChakraColorPicker,
  ColorSwatch,
  HStack,
  IconButton,
  type IconButtonProps,
  Input,
  Popover,
  Portal,
  Separator,
  type StackProps,
  defineStyle,
  parseColor,
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
  LuDroplet,
  LuEraser,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuIndentDecrease,
  LuIndentIncrease,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuMinus,
  LuPalette,
  LuQuote,
  LuRedo,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
  LuUndo,
  LuUnlink,
  LuX,
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

    "& h1": { fontSize: "2xl", fontWeight: "bold" },
    "& h2": { fontSize: "xl", fontWeight: "bold" },
    "& h3": { fontSize: "lg", fontWeight: "bold" },

    "& code": {
      bg: "bg.muted",
      px: "1",
      rounded: "sm",
      fontFamily: "mono",
      fontSize: "0.9em",
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
    },

    "& .hljs-comment, & .hljs-quote": {
      color: "#616161",
      fontStyle: "italic",
    },

    "& .hljs-variable, \
       .hljs-template-variable, \
       .hljs-attribute, \
       .hljs-tag, \
       .hljs-regexp, \
       .hljs-link, \
       .hljs-name, \
       .hljs-selector-id, \
       .hljs-selector-class": {
      color: "#f98181",
    },

    "& .hljs-number, \
       .hljs-meta, \
       .hljs-built_in, \
       .hljs-builtin-name, \
       .hljs-literal, \
       .hljs-type, \
       .hljs-params": {
      color: "#fbbc88",
    },

    "& .hljs-string, \
       .hljs-symbol, \
       .hljs-bullet": {
      color: "#b9f18d",
    },

    "& .hljs-title, \
       .hljs-section": {
      color: "#faf594",
    },

    "& .hljs-keyword, \
       .hljs-selector-tag": {
      color: "#70cff8",
      fontWeight: 600,
    },

    "& .hljs-emphasis": { fontStyle: "italic" },
    "& .hljs-strong": { fontWeight: "700" },

    "& blockquote": {
      borderStartWidth: "4px",
      borderStartColor: "border",
      paddingStart: "4",
      fontStyle: "italic",
    },

    "& ul": {
      paddingInlineStart: "4",
      listStyleType: "disc",
    },

    "& ol": {
      paddingInlineStart: "4",
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

      "& ul[data-type='taskList']": {
        paddingLeft: "6",
      },
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

export interface RichTextEditorToolbarProps extends StackProps {
  /**
   * Pass `sticky={true}` to make your toolbar stick to the top
   * when scrolling inside the editor.
   */
  sticky?: boolean
}

export const Toolbar = forwardRef<HTMLDivElement, RichTextEditorToolbarProps>(
  function Toolbar({ sticky = false, ...props }, ref) {
    return (
      <HStack
        ref={ref}
        borderBottom="1px solid"
        borderColor="border"
        p="2"
        gap="1"
        wrap="wrap"
        bg="bg"
        zIndex={sticky ? 10 : undefined}
        position={sticky ? "sticky" : undefined}
        top={sticky ? 0 : undefined}
        {...props}
      />
    )
  },
)
////////////////////////////////////////////////////////////////////////////////////

export interface RichTextEditorControlsGroupProps extends StackProps {
  /**
   * If true, the vertical separator at the end of the control group will be hidden.
   * Default behavior is to show the separator.
   */
  noSeparator?: boolean
}

export const ControlsGroup = forwardRef<
  HTMLDivElement,
  RichTextEditorControlsGroupProps
>(function ControlsGroup(
  { children, noSeparator = false, ...rest }: RichTextEditorControlsGroupProps,
  ref,
) {
  return (
    <HStack bgColor="bg" ref={ref} gap="1" {...rest}>
      {children}
      {!noSeparator && <Separator orientation="vertical" h="5" mx="1" />}
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

  CreatedControl.displayName = `RichTextEditorControl(${label})`

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
  isDisabled: (editor) => !(editor.can() as any).undo(),
  command: (chain) => chain.undo(),
})

export const Redo = createControl({
  label: "Redo",
  icon: LuRedo,
  isDisabled: (editor) => !(editor.can() as any).undo(),
  command: (chain) => chain.redo(),
})

export const ClearFormatting = createControl({
  label: "Clear Formatting",
  icon: LuEraser,
  isDisabled: (editor) => !editor,
  command: (chain) =>
    (chain.focus().unsetAllMarks().clearNodes() as any).setParagraph(),
})

export const TaskListControl = createControl({
  label: "Task List",
  icon: LuList,
  isActive: { name: "taskItem" },
  command: (chain) => chain.toggleTaskList(),
})

export const TaskListSinkControl = createControl({
  label: "Indent Task",
  icon: LuIndentIncrease,
  command: (chain) => chain.sinkListItem("taskItem"),
  isDisabled: (editor) => !editor.can().sinkListItem("taskItem"),
})

export const TaskListLiftControl = createControl({
  label: "Outdent Task",
  icon: LuIndentDecrease,
  command: (chain) => chain.liftListItem("taskItem"),
  isDisabled: (editor) => !editor.can().liftListItem("taskItem"),
})

export const CodeBlock = createControl({
  label: "Code Block",
  icon: LuCode,
  isDisabled: (editor) => !editor,
  isActive: { name: "codeBlock" },
  command: (chain) => chain.toggleCodeBlock(),
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

interface ColorProps
  extends Omit<RichTextEditorControlProps, "icon" | "label"> {
  color: string
}

export const Color = forwardRef<HTMLButtonElement, ColorProps>(function Color(
  { color, ...props },
  ref,
) {
  const { editor } = useRichTextEditorContext()

  if (!editor) return null

  const isActive = editor.getAttributes("textStyle").color === color

  const handleClick = () => {
    ;(editor.chain().focus() as any).setColor(color).run()
  }

  return (
    <Control
      ref={ref}
      label={`Set text color ${color}`}
      icon={
        <Box
          width="16px"
          height="16px"
          bg={color}
          borderRadius="sm"
          border="1px solid"
          borderColor="border"
        />
      }
      isActive={isActive}
      onClick={handleClick}
      {...props}
    />
  )
})

const DEFAULT_COLORS = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
]

interface ColorPickerProps
  extends Omit<RichTextEditorControlProps, "icon" | "label"> {
  colors?: string[]
}

export const ColorPicker = forwardRef<
  HTMLButtonElement,
  Partial<ColorPickerProps>
>(function ColorPicker({ colors = DEFAULT_COLORS, ...props }, ref) {
  const { editor } = useRichTextEditorContext()
  const [state, setState] = useState({
    open: false,
    mode: "swatches" as "swatches" | "picker",
  })

  if (!editor) return null

  const chain = editor.chain().focus() as any
  const currentColor = editor.getAttributes("textStyle").color || colors[0]

  const handleColorSelect = (color: string) => {
    chain.setColor(color).run()
    setState({ open: false, mode: "swatches" })
  }

  const handlePickerChange = (details: any) => {
    chain.setColor(details.valueAsString).run()
  }

  const handleUnsetColor = () => {
    chain.unsetColor().run()
    setState({ open: false, mode: "swatches" })
  }

  return (
    <Popover.Root
      open={state.open}
      onOpenChange={(e) => setState((prev) => ({ ...prev, open: e.open }))}
    >
      <Popover.Trigger>
        <Control
          ref={ref}
          label="Text Color"
          icon={
            <Box position="relative">
              <LuDroplet />
              <Box
                position="absolute"
                bottom="-2px"
                left="50%"
                transform="translateX(-50%)"
                width="12px"
                height="2px"
                bg={currentColor}
                borderRadius="sm"
              />
            </Box>
          }
          isActive={editor.isActive("textStyle")}
          {...props}
        />
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content p="3" minW="200px">
            <Popover.Body p="0">
              {state.mode === "swatches" ? (
                <Box>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(7, 1fr)"
                    gap="1"
                    mb="2"
                  >
                    {colors.map((color) => (
                      <ColorSwatch
                        key={color}
                        value={color}
                        onClick={() => handleColorSelect(color)}
                      />
                    ))}
                  </Box>
                  <HStack
                    justify="space-between"
                    pt="2"
                    borderTop="1px solid"
                    borderColor="border"
                  >
                    <IconButton
                      aria-label="Remove color"
                      size="xs"
                      variant="ghost"
                      onClick={handleUnsetColor}
                    >
                      <LuX />
                    </IconButton>
                    <IconButton
                      aria-label="Custom color"
                      size="xs"
                      variant="ghost"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          mode: "picker",
                          open: true,
                        }))
                      }
                    >
                      <LuPalette />
                    </IconButton>
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <ChakraColorPicker.Root
                    defaultValue={parseColor(currentColor)}
                    onValueChange={handlePickerChange}
                  >
                    <ChakraColorPicker.Area mb="2" />
                    <HStack mb="2">
                      <ChakraColorPicker.EyeDropper
                        size="xs"
                        variant="outline"
                      />
                      <ChakraColorPicker.Sliders />
                    </HStack>
                    <ChakraColorPicker.Input />
                  </ChakraColorPicker.Root>
                  <HStack
                    justify="flex-end"
                    pt="2"
                    borderTop="1px solid"
                    borderColor="border"
                    mt="2"
                  >
                    <IconButton
                      aria-label="Back to swatches"
                      size="xs"
                      variant="ghost"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          mode: "swatches",
                          open: true,
                        }))
                      }
                    >
                      <LuX />
                    </IconButton>
                  </HStack>
                </Box>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
})

export const UnsetColor = forwardRef<
  HTMLButtonElement,
  Partial<RichTextEditorControlProps>
>(function UnsetColor(props, ref) {
  const { editor } = useRichTextEditorContext()

  if (!editor) return null

  const handleClick = () => {
    ;(editor.chain().focus() as any).unsetColor().run()
  }

  return (
    <Control
      ref={ref}
      label="Remove Color"
      icon={<LuX />}
      onClick={handleClick}
      disabled={!editor.isActive("textStyle")}
      {...props}
    />
  )
})
