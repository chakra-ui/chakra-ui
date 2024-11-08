import {
  ColorPicker,
  HStack,
  IconButton,
  Input,
  Stack,
  parseColor,
} from "@chakra-ui/react"
import { LuPipette } from "react-icons/lu"

export const ColorPickerBasic = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control alignItems="center" maxW="200px">
        <HexInput />
        <Trigger />
      </ColorPicker.Control>
      <Content>
        <ColorArea />
        <SliderControl />
        <SwatchGroup items={["red", "blue", "green"]} />
      </Content>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}

const Trigger = () => (
  <ColorPicker.Trigger>
    <ColorPicker.TransparencyGrid />
    <ColorPicker.ValueSwatch />
  </ColorPicker.Trigger>
)

const HexInput = () => (
  <ColorPicker.ChannelInput channel="hex" asChild>
    <Input size="2xs" />
  </ColorPicker.ChannelInput>
)

const Content = (props: ColorPicker.ContentProps) => (
  <ColorPicker.Positioner>
    <ColorPicker.Content gap="4" {...props} />
  </ColorPicker.Positioner>
)

const SliderControl = () => (
  <HStack>
    <EyeDropper />
    <Stack flex="1">
      <Slider channel="hue" />
      <Slider channel="alpha" />
    </Stack>
  </HStack>
)

const ColorArea = () => (
  <ColorPicker.Area>
    <ColorPicker.AreaBackground />
    <ColorPicker.AreaThumb />
  </ColorPicker.Area>
)

const EyeDropper = () => (
  <ColorPicker.EyeDropperTrigger asChild>
    <IconButton size="sm" variant="outline">
      <LuPipette />
    </IconButton>
  </ColorPicker.EyeDropperTrigger>
)

const Slider = (props: ColorPicker.ChannelSliderProps) => (
  <ColorPicker.ChannelSlider {...props}>
    <ColorPicker.TransparencyGrid />
    <ColorPicker.ChannelSliderTrack />
    <ColorPicker.ChannelSliderThumb />
  </ColorPicker.ChannelSlider>
)

const SwatchGroup = (
  props: ColorPicker.SwatchGroupProps & { items: string[] },
) => (
  <ColorPicker.SwatchGroup {...props}>
    {props.items.map((item) => (
      <ColorPicker.SwatchTrigger key={item} value={item}>
        <ColorPicker.Swatch value={item}>
          <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
        </ColorPicker.Swatch>
      </ColorPicker.SwatchTrigger>
    ))}
  </ColorPicker.SwatchGroup>
)
