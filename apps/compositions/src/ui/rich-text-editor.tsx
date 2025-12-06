"use client"

import {
  Box,
  type BoxProps,
  ColorSwatch,
  HStack,
  IconButton,
  type IconButtonProps,
  type SelectRootProps,
  Separator,
  type StackProps,
  createListCollection,
  createRecipeContext,
  defineRecipe,
} from "@chakra-ui/react"
import { Editor, EditorContent } from "@tiptap/react"
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
} from "compositions/ui/select"
import { Tooltip } from "compositions/ui/tooltip"
import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react"
import { LuX } from "react-icons/lu"

export interface RichTextEditorContextValue {
  editor: Editor | null
}

const RichTextEditorContext = createContext<RichTextEditorContextValue | null>(
  null,
)

export function useRichTextEditorContext() {
  const context = useContext(RichTextEditorContext)
  if (!context) {
    throw new Error(
      "useRichTextEditorContext must be used within a RichTextEditorRoot",
    )
  }
  return context
}

export const richTextEditorRecipe = defineRecipe({
  className: "rich-text-editor",
  base: {
    "& .ProseMirror": {
      outline: "none",
      "& > * + *": { marginTop: "0.75em" },
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
      "& blockquote": {
        borderStartWidth: "4px",
        borderStartColor: "border",
        paddingStart: "4",
        fontStyle: "italic",
      },
      "& ul": { paddingInlineStart: "4", listStyleType: "disc" },
      "& ol": { paddingInlineStart: "4", listStyleType: "decimal" },
      "& ul ul": { listStyleType: "circle" },
      "& ul ul ul": { listStyleType: "square" },
      "& ul[data-type='taskList'] li": {
        listStyle: "none",
        display: "flex",
        alignItems: "flex-start",
        gap: "2",
        "& input[type='checkbox']": {
          accentColor: "colorPalette.solid",
          marginTop: "1",
        },
        "& ul[data-type='taskList']": { paddingLeft: "6" },
      },
      "& hr": { my: "4" },
      "& a": { color: "fg.link", textDecoration: "underline" },
      "& em": { fontStyle: "italic" },
      "& p[data-placeholder]::before": {
        content: "attr(data-placeholder)",
        color: "fg.muted",
        pointerEvents: "none",
        userSelect: "none",
      },
    },
  },
  variants: {
    isDisabled: {
      true: {
        "& .ProseMirror": {
          pointerEvents: "none",
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
      false: {
        "& .ProseMirror": {
          pointerEvents: "auto",
          opacity: 1,
          cursor: "text",
        },
      },
    },
    isFocused: {
      true: {
        borderColor: "colorPalette.500",
        boxShadow: "0 0 0 1px var(--chakra-colors-colorPalette-500)",
      },
    },
  },
})

export const { withContext } = createRecipeContext({
  recipe: richTextEditorRecipe,
})

export type RichTextEditorVariantProps = {
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "filled" | "unstyled"
  editorColorScheme?: "gray" | "blue" | "purple"
  isDisabled?: boolean
  isFocused?: boolean
}

export interface RichTextEditorProps
  extends Omit<BoxProps, "size" | "variant">,
    RichTextEditorVariantProps {
  editor: Editor | null
  children: ReactNode
}

export const RichTextEditorRoot = withContext<
  HTMLDivElement,
  RichTextEditorProps
>(
  forwardRef(function RichTextEditorRoot({ editor, children, ...rest }, ref) {
    return (
      <RichTextEditorContext.Provider value={{ editor }}>
        <Box ref={ref} {...rest}>
          {children}
        </Box>
      </RichTextEditorContext.Provider>
    )
  }),
)

export interface RichTextEditorContentProps extends BoxProps {}

export const RichTextEditorContent = forwardRef<
  HTMLDivElement,
  RichTextEditorContentProps
>(function RichTextEditorContent(props, ref) {
  const { editor } = useRichTextEditorContext()
  if (!editor) return null
  return (
    <Box ref={ref} minH="300px" p="5" {...props}>
      <EditorContent editor={editor} />
    </Box>
  )
})

export interface RichTextEditorButtonGroupProps extends StackProps {
  noSeparator?: boolean
}

export const RichTextEditorButtonGroup = forwardRef<
  HTMLDivElement,
  RichTextEditorButtonGroupProps
>(function ButtonGroup({ children, noSeparator = false, ...rest }, ref) {
  if (!children) return null
  return (
    <HStack ref={ref} {...rest}>
      {children}
      {!noSeparator && <Separator orientation="vertical" alignSelf="stretch" />}
    </HStack>
  )
})

export interface BaseControlConfig {
  label: string
  icon?: React.ElementType
  isDisabled?: (editor: Editor) => boolean
}

export interface ButtonControlConfig extends BaseControlConfig {
  icon: React.ElementType
  command: (editor: Editor) => void
  getVariant?: (editor: Editor) => IconButtonProps["variant"]
}

export interface RichTextEditorControlProps
  extends Omit<IconButtonProps, "aria-label"> {
  icon: ReactNode
  label: string
}

export const RichTextEditorButtonControl = forwardRef<
  HTMLButtonElement,
  RichTextEditorControlProps
>(function ButtonControl({ icon, label, ...rest }, ref) {
  return (
    <Tooltip content={label}>
      <IconButton ref={ref} size="xs" aria-label={label} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  )
})

export function createButtonControl(config: ButtonControlConfig) {
  const { label, icon: Icon, isDisabled, command, getVariant } = config

  const ButtonControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
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

  ButtonControl.displayName = `ButtonControl(${label})`
  return ButtonControl
}

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectControlConfig extends BaseControlConfig {
  options: SelectOption[]
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  placeholder?: string
  renderValue?: (value: string, option?: SelectOption) => ReactNode
}

export function createSelectControl(config: SelectControlConfig) {
  const {
    label,
    options,
    getValue,
    command,
    placeholder = "Select",
    renderValue,
    isDisabled,
  } = config

  const SelectControl = forwardRef<
    HTMLButtonElement,
    Omit<SelectRootProps, "collection">
  >((props, ref) => {
    const { editor } = useRichTextEditorContext()
    if (!editor) return null
    const currentValue = getValue(editor)
    const disabled = isDisabled ? isDisabled(editor) : false
    const currentOption = options.find((o) => o.value === currentValue)
    const displayValue =
      renderValue && currentOption
        ? renderValue(currentValue, currentOption)
        : currentOption?.label || placeholder

    const collection = createListCollection({
      items: options.map((o) => ({
        label: o.label,
        value: o.value,
        icon: o.icon,
      })),
    })

    return (
      <SelectRoot
        {...props}
        collection={collection}
        value={[currentValue]}
        onValueChange={(details) => command(editor, details.value[0])}
        disabled={disabled}
      >
        <Tooltip content={label}>
          <Box as="span">
            <SelectTrigger ref={ref}>{displayValue}</SelectTrigger>
          </Box>
        </Tooltip>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} item={opt.value}>
              {opt.icon && (
                <Box as="span" mr="2">
                  {opt.icon}
                </Box>
              )}
              <SelectItemText>{opt.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    )
  })

  SelectControl.displayName = `SelectControl(${label})`
  return SelectControl
}

export interface SwatchOption {
  value: string
  color: string
  label?: string
}
export interface SwatchControlConfig extends BaseControlConfig {
  swatches: SwatchOption[]
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  columns?: number
  showRemove?: boolean
  onRemove?: (editor: Editor) => void
}

export function createSwatchControl(config: SwatchControlConfig) {
  const {
    label,
    swatches,
    getValue,
    command,
    columns = 7,
    showRemove = false,
    onRemove,
    isDisabled,
    icon: Icon,
  } = config

  const SwatchControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
      const { editor } = useRichTextEditorContext()
      const [open, setOpen] = useState(false)
      if (!editor) return null
      const currentValue = getValue(editor)
      const disabled = isDisabled ? isDisabled(editor) : false

      return (
        <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
          <PopoverTrigger asChild>
            <Box as="span">
              <RichTextEditorButtonControl
                ref={ref}
                label={label}
                icon={
                  Icon ? <Icon /> : <Box bg={currentValue} w="100%" h="100%" />
                }
                bg={currentValue}
                disabled={disabled}
                {...props}
              />
            </Box>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverBody>
              <Box
                display="grid"
                gridTemplateColumns={`repeat(${columns}, 1fr)`}
                gap={1}
              >
                {swatches.map((s) => (
                  <Tooltip key={s.value} content={s.label || s.value}>
                    <ColorSwatch
                      cursor="button"
                      value={s.color}
                      onClick={() => {
                        command(editor, s.value)
                        setOpen(false)
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              {showRemove && onRemove && (
                <HStack justify="flex-end" mt={2}>
                  <PopoverCloseTrigger asChild>
                    <IconButton
                      aria-label="Remove"
                      onClick={() => {
                        onRemove(editor)
                        setOpen(false)
                      }}
                    >
                      <LuX />
                    </IconButton>
                  </PopoverCloseTrigger>
                </HStack>
              )}
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      )
    },
  )

  SwatchControl.displayName = `SwatchControl(${label || "Unnamed"})`
  return SwatchControl
}
