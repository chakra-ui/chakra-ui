import type { IconButtonProps, StackProps } from "@chakra-ui/react"
import {
  ColorPicker as ChakraColorPicker,
  IconButton,
  Portal,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuCheck, LuPipette } from "react-icons/lu"

export const ColorPickerTrigger = forwardRef<
  HTMLButtonElement,
  ChakraColorPicker.TriggerProps
>(function ColorPickerTrigger(props, ref) {
  return (
    <ChakraColorPicker.Trigger ref={ref} {...props}>
      {props.children || <ChakraColorPicker.ValueSwatch />}
    </ChakraColorPicker.Trigger>
  )
})

export const ColorPickerInput = forwardRef<
  HTMLInputElement,
  Omit<ChakraColorPicker.ChannelInputProps, "channel">
>(function ColorHexInput(props, ref) {
  return <ChakraColorPicker.ChannelInput channel="hex" ref={ref} {...props} />
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
        <ChakraColorPicker.Content ref={ref} {...rest} />
      </ChakraColorPicker.Positioner>
    </Portal>
  )
})

export const ColorPickerSliderControl = forwardRef<HTMLDivElement, StackProps>(
  function ColorPickerSliderControl(props, ref) {
    return (
      <Stack gap="1" flex="1" px="1" ref={ref} {...props}>
        <ColorPickerSlider channel="hue" />
        <ColorPickerSlider channel="alpha" />
      </Stack>
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
  IconButtonProps
>(function ColorPickerEyeDropper(props, ref) {
  return (
    <ChakraColorPicker.EyeDropperTrigger asChild>
      <IconButton size="xs" variant="outline" ref={ref} {...props}>
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

export const ColorPickerSwatchTrigger = forwardRef<
  HTMLButtonElement,
  ChakraColorPicker.SwatchTriggerProps
>(function ColorPickerSwatchTrigger(props, ref) {
  return (
    <ChakraColorPicker.SwatchTrigger
      ref={ref}
      style={{ ["--color" as string]: props.value }}
      {...props}
    >
      <ChakraColorPicker.Swatch value={props.value}>
        <ChakraColorPicker.SwatchIndicator>
          <LuCheck />
        </ChakraColorPicker.SwatchIndicator>
      </ChakraColorPicker.Swatch>
    </ChakraColorPicker.SwatchTrigger>
  )
})

export const ColorPickerSwatchGroup = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.SwatchGroupProps & { rowCount?: number }
>(function ColorPickerSwatchGroup(props, ref) {
  const { rowCount = 7, ...rest } = props
  return (
    <ChakraColorPicker.SwatchGroup
      ref={ref}
      style={{ ["--swatch-per-row" as string]: rowCount }}
      {...rest}
    />
  )
})

export const ColorPickerRoot = forwardRef<
  HTMLDivElement,
  ChakraColorPicker.RootProps
>(function ColorPickerRoot(props, ref) {
  return (
    <ChakraColorPicker.Root ref={ref} {...props}>
      {props.children}
      <ChakraColorPicker.HiddenInput tabIndex={-1} />
    </ChakraColorPicker.Root>
  )
})

const formatMap = {
  rgba: ["red", "green", "blue", "alpha"],
  hsla: ["hue", "saturation", "lightness", "alpha"],
  hsba: ["hue", "saturation", "brightness", "alpha"],
  hexa: ["hex", "alpha"],
} as const

export const ColorPickerFormatInput = (props: ChakraColorPicker.ViewProps) => {
  const channels = formatMap[props.format]
  return (
    <ChakraColorPicker.View
      display="flex"
      flexDirection="row"
      gap="2"
      {...props}
    >
      {channels.map((channel) => (
        <VStack gap="1" key={channel} flex="1">
          <ColorPickerChannelInput
            channel={channel}
            px="0"
            textAlign="center"
          />
          <Text textStyle="xs" color="fg.muted" fontWeight="medium">
            {channel.charAt(0).toUpperCase()}
          </Text>
        </VStack>
      ))}
    </ChakraColorPicker.View>
  )
}

export const ColorPickerLabel = ChakraColorPicker.Label
export const ColorPickerControl = ChakraColorPicker.Control
export const ColorPickerValueText = ChakraColorPicker.ValueText
export const ColorPickerValueSwatch = ChakraColorPicker.ValueSwatch
export const ColorPickerChannelInput = ChakraColorPicker.ChannelInput
