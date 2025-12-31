"use client"

import type { Select as ChakraSelect, IconButtonProps } from "@chakra-ui/react"
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
import type { Editor } from "@tiptap/react"
import { Tooltip } from "compositions/ui/tooltip"
import * as React from "react"

export interface RichTextEditorContextValue {
  editor: Editor | null
}

export const RichTextEditorContext =
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

export interface BaseControlConfig {
  label: string
  icon?: React.ElementType
  isDisabled?: (editor: Editor) => boolean
}

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

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectControlConfig extends BaseControlConfig {
  options: SelectOption[]
  width?: ChakraSelect.RootProps["width"]
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
  icon?: React.ElementType
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
