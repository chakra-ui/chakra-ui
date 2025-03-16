"use client"

import {
  ColorPicker,
  For,
  Portal,
  Stack,
  getColorChannels,
  parseColor,
} from "@chakra-ui/react"

const ChannelSliders = (props: { format: ColorPicker.ColorFormat }) => {
  const channels = getColorChannels(props.format)
  return (
    <ColorPicker.View format={props.format}>
      <For each={channels}>
        {(channel) => (
          <Stack gap="1" key={channel}>
            <ColorPicker.ChannelText minW="5ch">
              {channel}
            </ColorPicker.ChannelText>
            <ColorPicker.ChannelSlider channel={channel} />
          </Stack>
        )}
      </For>
    </ColorPicker.View>
  )
}

export const ColorPickerChannelSliderOnly = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.Control>
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.FormatSelect />
            <ChannelSliders format="hsla" />
            <ChannelSliders format="hsba" />
            <ChannelSliders format="rgba" />
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}
