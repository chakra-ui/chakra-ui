"use client"

import type { BoxProps, IconButtonProps, StackProps } from "@chakra-ui/react"
import {
  Box,
  CloseButton,
  ColorSwatch,
  HStack,
  IconButton,
  Popover,
  Portal,
  Select,
  StackSeparator,
  VStack,
  createListCollection,
  defineStyle,
} from "@chakra-ui/react"
import { Editor, EditorContent } from "@tiptap/react"
import { Tooltip } from "compositions/ui/tooltip"
import * as React from "react"

export interface RichTextEditorContextValue {
  editor: Editor | null
}

const RichTextEditorContext =
  React.createContext<RichTextEditorContextValue | null>(null)
RichTextEditorContext.displayName = "RichTextEditorContext"

export function useRichTextEditorContext() {
  const context = React.useContext(RichTextEditorContext)
  if (!context) {
    throw new Error(
      "useRichTextEditorContext must be used within a RichTextEditorRoot",
    )
  }
  return context
}

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

export interface BaseControlConfig {
  label: string
  icon?: React.ElementType
  isDisabled?: (editor: Editor) => boolean
}

export interface RichTextEditorControlProps
  extends Omit<IconButtonProps, "aria-label"> {
  icon: React.ReactNode
  label: string
}

export const RichTextEditorButtonControl = React.forwardRef<
  HTMLButtonElement,
  RichTextEditorControlProps
>(function RichTextEditorButtonControl(props, ref) {
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
        <RichTextEditorButtonControl
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

export const RichTextEditor = {
  Root: RichTextEditorRoot,
  Toolbar: RichTextEditorToolbar,
  Content: RichTextEditorContent,
  ControlGroup: RichTextEditorControlGroup,
  ButtonControl: RichTextEditorButtonControl,
} as const

export * as Control from "compositions/ui/rich-text-editor-control"
