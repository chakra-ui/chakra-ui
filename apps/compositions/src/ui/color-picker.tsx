import {
  ColorPicker as ChakraColorPicker,
  HStack,
  IconButton,
  Input,
  Portal,
  Stack,
  type StackProps,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuPipette } from "react-icons/lu"

export const ColorPickerTrigger = forwardRef<
  HTMLButtonElement,
  ChakraColorPicker.TriggerProps
>(function ColorPickerTrigger(props, ref) {
  return (
    <ChakraColorPicker.Trigger ref={ref} {...props}>
      <ChakraColorPicker.TransparencyGrid />
      <ChakraColorPicker.ValueSwatch />
    </ChakraColorPicker.Trigger>
  )
})

export const ColorPickerHexInput = forwardRef<
  HTMLInputElement,
  Omit<ChakraColorPicker.ChannelInputProps, "channel">
>(function ColorHexInput(props, ref) {
  return (
    <ChakraColorPicker.ChannelInput channel="hex" asChild {...props}>
      <Input size="2xs" ref={ref} />
    </ChakraColorPicker.ChannelInput>
  )
})

interface ColorPickerContentProps extends ChakraColorPicker.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const ColorPickerContent = forwardRef<
  HTMLDivElement,
  ColorPickerContentProps
>(function ColorPickerContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraColorPicker.Positioner>
        <ChakraColorPicker.Content gap="4" ref={ref} {...rest} />
      </ChakraColorPicker.Positioner>
    </Portal>
  )
})

export const ColorPickerSliderControl = forwardRef<HTMLDivElement, StackProps>(
  function ColorPickerSliderControl(props, ref) {
    return (
      <HStack ref={ref} {...props}>
        <ColorPickerEyeDropper />
        <Stack flex="1">
          <ColorPickerSlider channel="hue" />
          <ColorPickerSlider channel="alpha" />
        </Stack>
      </HStack>
    )
  },
)

export const ColorPickerArea = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.AreaProps
>(function ColorPickerArea(props, ref) {
  return (
    <ChakraColorPicker.Area ref={ref} {...props}>
      <ChakraColorPicker.AreaBackground />
      <ChakraColorPicker.AreaThumb />
    </ChakraColorPicker.Area>
  )
})

export const ColorPickerEyeDropper = forwardRef<
  HTMLButtonElement,
  ChakraColorPicker.EyeDropperTriggerProps
>(function ColorPickerEyeDropper(props, ref) {
  return (
    <ChakraColorPicker.EyeDropperTrigger asChild {...props}>
      <IconButton size="sm" variant="outline" ref={ref}>
        <LuPipette />
      </IconButton>
    </ChakraColorPicker.EyeDropperTrigger>
  )
})

export const ColorPickerSlider = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.ChannelSliderProps
>(function ColorPickerSlider(props, ref) {
  return (
    <ChakraColorPicker.ChannelSlider ref={ref} {...props}>
      <ChakraColorPicker.TransparencyGrid />
      <ChakraColorPicker.ChannelSliderTrack />
      <ChakraColorPicker.ChannelSliderThumb />
    </ChakraColorPicker.ChannelSlider>
  )
})

export const ColorPickerSwatchGroup = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.SwatchGroupProps & { items: string[] }
>(function ColorPickerSwatchGroup(props, ref) {
  return (
    <ChakraColorPicker.SwatchGroup ref={ref} {...props}>
      {props.items.map((item) => (
        <ChakraColorPicker.SwatchTrigger key={item} value={item}>
          <ChakraColorPicker.Swatch value={item}>
            <ChakraColorPicker.SwatchIndicator>
              ✓
            </ChakraColorPicker.SwatchIndicator>
          </ChakraColorPicker.Swatch>
        </ChakraColorPicker.SwatchTrigger>
      ))}
    </ChakraColorPicker.SwatchGroup>
  )
})

export const ColorPickerRoot = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.RootProps
>(function ColorPickerRoot(props, ref) {
  return (
    <ChakraColorPicker.Root ref={ref} {...props}>
      {props.children}
      <ChakraColorPicker.HiddenInput />
    </ChakraColorPicker.Root>
  )
})

export const ColorPickerLabel = ChakraColorPicker.Label
export const ColorPickerControl = ChakraColorPicker.Control
