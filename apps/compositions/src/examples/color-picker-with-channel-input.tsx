"use client"

import {
  ColorPicker,
  For,
  HStack,
  Portal,
  VStack,
  getColorChannels,
  parseColor,
} from "@chakra-ui/react"

const ChannelInputs = (props: { format: ColorPicker.ColorFormat }) => {
  const channels = getColorChannels(props.format)
  return (
    <ColorPicker.View format={props.format}>
      <For each={channels}>
        {(channel) => (
          <VStack gap="1" key={channel} flex="1">
            <ColorPicker.ChannelInput
              channel={channel}
              px="0"
              height="7"
              textStyle="xs"
              textAlign="center"
            />
            <ColorPicker.ChannelText>
              {channel.charAt(0).toUpperCase()}
            </ColorPicker.ChannelText>
          </VStack>
        )}
      </For>
    </ColorPicker.View>
  )
}

export const ColorPickerWithChannelInput = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
            <ChannelInputs format="rgba" />
            <ChannelInputs format="hsla" />
            <ChannelInputs format="hsba" />
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}
