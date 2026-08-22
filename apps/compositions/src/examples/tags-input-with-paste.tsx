"use client"

import { Box, Clipboard, IconButton, Stack, TagsInput } from "@chakra-ui/react"

export const TagsInputWithPaste = () => (
  <Stack gap="8">
    <SampleClipboard value="React,Chakra,TypeScript" />
    <TagsInput.Root addOnPaste delimiter=",">
      <TagsInput.Label>Paste Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Paste" />
        <TagsInput.ClearTrigger />
      </TagsInput.Control>

      <TagsInput.HiddenInput />
    </TagsInput.Root>
  </Stack>
)

const SampleClipboard = (props: { value: string }) => (
  <Clipboard.Root value={props.value}>
    <Box textStyle="label" mb="2">
      Copy Tags
    </Box>
    <Clipboard.ValueText me="3" textStyle="sm" fontFamily="mono" />
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="2xs">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  </Clipboard.Root>
)
