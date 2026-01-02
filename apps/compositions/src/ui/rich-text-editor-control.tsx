"use client"

import type { IconButtonProps } from "@chakra-ui/react"
import {
  Box,
  CloseButton,
  ColorSwatch,
  HStack,
  IconButton,
  Popover,
  Portal,
  Select,
  VStack,
  createListCollection,
} from "@chakra-ui/react"
import { Editor } from "@tiptap/react"
import { useRichTextEditorContext } from "compositions/ui/rich-text-editor-context"
import { Tooltip } from "compositions/ui/tooltip"
import * as React from "react"
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHighlighter,
  LuItalic,
  LuLink,
  LuLink2,
  LuList,
  LuListOrdered,
  LuMinus,
  LuQuote,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuType,
  LuUnderline,
} from "react-icons/lu"

export interface BaseControlConfig {
  label: string
  icon?: React.ElementType
  isDisabled?: (editor: Editor) => boolean
}

export interface ButtonControlProps
  extends Omit<IconButtonProps, "aria-label"> {
  icon: React.ReactNode
  label: string
}

export const ButtonControl = React.forwardRef<
  HTMLButtonElement,
  ButtonControlProps
>(function ButtonControl(props, ref) {
  const { icon, label, ...rest } = props
  return (
    <Tooltip content={label}>
      <IconButton ref={ref} size="2xs" aria-label={label} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  )
})

///////////////////// Boolean Control /////////////////////

export interface BooleanControlConfig extends BaseControlConfig {
  icon: React.ElementType
  command: (editor: Editor) => void
  getVariant?: (editor: Editor) => IconButtonProps["variant"]
}

export function createBooleanControl(config: BooleanControlConfig) {
  const { label, icon: Icon, isDisabled, command, getVariant } = config

  const BooleanControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    function BooleanControl(props, ref) {
      const { editor } = useRichTextEditorContext()
      if (!editor) return null
      const disabled = isDisabled ? isDisabled(editor) : false
      const variant = getVariant ? getVariant(editor) : {}
      return (
        <ButtonControl
          ref={ref}
          label={label}
          icon={<Icon />}
          variant={variant}
          onClick={() => command(editor)}
          disabled={disabled}
          {...props}
        />
      )
    },
  )

  BooleanControl.displayName = `BooleanControl(${label})`
  return BooleanControl
}

///////////////////// Select Control (with options) /////////////////////

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectControlConfig extends BaseControlConfig {
  options: SelectOption[]
  width?: Select.RootProps["width"]
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  placeholder?: string
  renderValue?: (value: string, option?: SelectOption) => React.ReactNode
}

export function createSelectControl(config: SelectControlConfig) {
  const {
    label,
    options,
    width,
    getValue,
    command,
    placeholder = "Select",
    renderValue,
    isDisabled,
  } = config

  const SelectControl = React.forwardRef<
    HTMLButtonElement,
    Omit<Select.RootProps, "collection">
  >(function SelectControl(props, ref) {
    const { editor } = useRichTextEditorContext()
    const controlId = React.useId()

    if (!editor) return null

    const currentValue = getValue(editor)
    const disabled = isDisabled ? isDisabled(editor) : false

    const currentOption = options.find((o) => o.value === currentValue)
    const displayValue =
      renderValue && currentOption
        ? renderValue(currentValue, currentOption)
        : currentOption?.label || placeholder

    const collection = createListCollection({ items: options })

    return (
      <Select.Root
        width={width}
        {...props}
        size="xs"
        variant="ghost"
        collection={collection}
        value={[currentValue]}
        onValueChange={(details) => command(editor, details.value[0])}
        disabled={disabled}
        ids={{ trigger: controlId }}
        positioning={{ sameWidth: false }}
        css={{
          "--select-trigger-height": "sizes.6",
          "--select-trigger-padding-x": "spacing.2",
        }}
      >
        <Tooltip content={label} ids={{ trigger: controlId }}>
          <Select.Trigger ref={ref}>
            <Select.ValueText>{displayValue}</Select.ValueText>
            <Select.Indicator />
          </Select.Trigger>
        </Tooltip>
        <Portal>
          <Select.Positioner>
            <Select.Content minW="20">
              {options.map((opt) => (
                <Select.Item key={opt.value} item={opt.value}>
                  {opt.icon && (
                    <Box as="span" marginEnd="2">
                      {opt.icon}
                    </Box>
                  )}
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    )
  })

  SelectControl.displayName = `SelectControl(${label})`
  return SelectControl
}

///////////////////// Swatch Control (with color swatches) /////////////////////

export interface SwatchOption {
  value: string
  color: string
  label?: string
}
export interface SwatchControlConfig extends BaseControlConfig {
  swatches: SwatchOption[]
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  showRemove?: boolean
  onRemove?: (editor: Editor) => void
}

export function createSwatchControl(config: SwatchControlConfig) {
  const {
    label,
    swatches,
    getValue,
    command,
    showRemove = false,
    onRemove,
    isDisabled,
    icon: Icon,
  } = config

  const SwatchControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    function SwatchControl(props, ref) {
      const { editor } = useRichTextEditorContext()
      const [open, setOpen] = React.useState(false)
      const triggerId = React.useId()

      if (!editor) return null
      const currentValue = getValue(editor)
      const disabled = isDisabled ? isDisabled(editor) : false

      return (
        <Popover.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          ids={{ trigger: triggerId }}
          size="sm"
        >
          <Tooltip content={label} ids={{ trigger: triggerId }}>
            <Popover.Trigger asChild>
              <IconButton
                ref={ref}
                size="2xs"
                variant="subtle"
                aria-label={label}
                disabled={disabled}
                {...props}
              >
                <VStack gap="1px">
                  {Icon && <Icon />}
                  <ColorSwatch value={currentValue} h="4px" w="100%" />
                </VStack>
              </IconButton>
            </Popover.Trigger>
          </Tooltip>

          <Portal>
            <Popover.Positioner>
              <Popover.Content width="auto">
                <Popover.Body>
                  <HStack wrap="wrap">
                    {swatches.map((swatch) => (
                      <ColorSwatch
                        key={swatch.value}
                        cursor="button"
                        value={swatch.color}
                        onClick={() => {
                          command(editor, swatch.value)
                          setOpen(false)
                        }}
                      />
                    ))}
                    {showRemove && onRemove && (
                      <Popover.CloseTrigger asChild>
                        <CloseButton
                          size="2xs"
                          onClick={() => {
                            onRemove(editor)
                            setOpen(false)
                          }}
                        />
                      </Popover.CloseTrigger>
                    )}
                  </HStack>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      )
    },
  )

  SwatchControl.displayName = `SwatchControl(${label || "Unnamed"})`
  return SwatchControl
}

export const FontFamily = createSelectControl({
  label: "Font Family",
  width: "80px",
  options: [
    { value: "default", label: "Default" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Monospace" },
    { value: "cursive", label: "Cursive" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? editor.chain().focus().unsetFontFamily().run()
      : editor.chain().focus().setFontFamily(value).run(),
})

export const FontSize = createSelectControl({
  label: "Font Size",
  width: "64px",
  options: [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) =>
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run(),
})

export const Bold = createBooleanControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
})

export const Italic = createBooleanControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
})

export const Underline = createBooleanControl({
  label: "Underline",
  icon: LuUnderline,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
})

export const Strikethrough = createBooleanControl({
  label: "Strikethrough",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

export const Code = createBooleanControl({
  label: "Code",
  icon: LuCode,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
})

export const Subscript = createBooleanControl({
  label: "Subscript",
  icon: LuSubscript,
  command: (editor) => editor.chain().focus().toggleSubscript().run(),
  getVariant: (editor) => (editor.isActive("subscript") ? "subtle" : "ghost"),
})

export const Superscript = createBooleanControl({
  label: "Superscript",
  icon: LuSuperscript,
  command: (editor) => editor.chain().focus().toggleSuperscript().run(),
  getVariant: (editor) => (editor.isActive("superscript") ? "subtle" : "ghost"),
})

export const H1 = createBooleanControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

export const H2 = createBooleanControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

export const H3 = createBooleanControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

export const H4 = createBooleanControl({
  label: "H4",
  icon: LuHeading4,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 4 }) ? "subtle" : "ghost",
})

export const BulletList = createBooleanControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

export const OrderedList = createBooleanControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

export const Blockquote = createBooleanControl({
  label: "Blockquote",
  icon: LuQuote,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

export const Hr = createBooleanControl({
  label: "Horizontal Rule",
  icon: LuMinus,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
})

export const Link = createBooleanControl({
  label: "Link",
  icon: LuLink,
  command: (editor) => {
    const url = window.prompt("Enter URL")
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

export const Unlink = createBooleanControl({
  label: "Unlink",
  icon: LuLink2,
  command: (editor) => editor.chain().focus().unsetLink().run(),
})

export const AlignLeft = createBooleanControl({
  label: "Align Left",
  icon: LuAlignLeft,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
})

export const AlignCenter = createBooleanControl({
  label: "Align Center",
  icon: LuAlignCenter,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
})

export const AlignJustify = createBooleanControl({
  label: "Align Justify",
  icon: LuAlignJustify,
  command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
})

export const AlignRight = createBooleanControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
})

export const Undo = createBooleanControl({
  label: "Undo",
  icon: LuRotateCcw,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
})

export const Redo = createBooleanControl({
  label: "Redo",
  icon: LuRotateCw,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
})

const SWATCH_OPTIONS = [
  { label: "Black", value: "#000000", color: "#000000" },
  { label: "Red", value: "#FF0000", color: "#FF0000" },
  { label: "Green", value: "#00FF00", color: "#00FF00" },
  { label: "Blue", value: "#0000FF", color: "#0000FF" },
  { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
  { label: "Purple", value: "#800080", color: "#800080" },
  { label: "Orange", value: "#FFA500", color: "#FFA500" },
]

export const TextColor = createSwatchControl({
  label: "Text Color",
  swatches: SWATCH_OPTIONS,
  getValue: (editor) => editor.getAttributes("textStyle")?.color || "#000000",
  command: (editor, color) =>
    editor.chain().focus().setMark("textStyle", { color }).run(),
  icon: LuType,
  onRemove: (editor) => editor.chain().focus().unsetMark("textStyle").run(),
})

const HIGHLIGHT_SWATCH_OPTIONS = [
  { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
  { label: "Green", value: "#00FF00", color: "#00FF00" },
  { label: "Cyan", value: "#00FFFF", color: "#00FFFF" },
  { label: "Pink", value: "#FF69B4", color: "#FF69B4" },
  { label: "Orange", value: "#FFA500", color: "#FFA500" },
  { label: "Purple", value: "#DDA0DD", color: "#DDA0DD" },
]

export const Highlight = createSwatchControl({
  label: "Highlight",
  swatches: HIGHLIGHT_SWATCH_OPTIONS,
  getValue: (editor) => editor.getAttributes("highlight")?.color || "",
  command: (editor, color) =>
    editor.chain().focus().toggleHighlight({ color }).run(),
  icon: LuHighlighter,
  showRemove: true,
  onRemove: (editor) => editor.chain().focus().unsetHighlight().run(),
})

const TEXT_STYLE_OPTIONS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading1", label: "Heading 1" },
  { value: "heading2", label: "Heading 2" },
  { value: "heading3", label: "Heading 3" },
  { value: "blockquote", label: "Quote" },
  { value: "horizontalRule", label: "Divider", icon: <LuMinus /> },
]

export const TextStyle = createSelectControl({
  label: "Text Style",
  width: "120px",
  placeholder: "Paragraph",
  options: TEXT_STYLE_OPTIONS,
  getValue: (editor) => {
    if (editor.isActive("heading", { level: 1 })) return "heading1"
    if (editor.isActive("heading", { level: 2 })) return "heading2"
    if (editor.isActive("heading", { level: 3 })) return "heading3"
    if (editor.isActive("blockquote")) return "blockquote"
    return "paragraph"
  },
  command: (editor, value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run()
    } else if (value === "heading1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    } else if (value === "heading2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if (value === "heading3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else if (value === "blockquote") {
      editor.chain().focus().toggleBlockquote().run()
    } else if (value === "horizontalRule") {
      editor.chain().focus().setHorizontalRule().run()
    }
  },
  renderValue: (value, option) => {
    const textStyle: any = {
      paragraph: { fontWeight: "normal", fontSize: "sm" },
      heading1: { fontWeight: "bold", fontSize: "lg" },
      heading2: { fontWeight: "semibold", fontSize: "md" },
      heading3: { fontWeight: "medium", fontSize: "sm" },
      blockquote: { fontStyle: "italic", fontSize: "sm" },
      horizontalRule: { fontWeight: "medium", fontSize: "sm" },
    }
    return <Box {...textStyle[value]}>{option?.label || "Paragraph"}</Box>
  },
})
