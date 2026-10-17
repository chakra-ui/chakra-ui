import { Kbd, KbdGroup, Stack } from "@chakra-ui/react"

export const KbdWithGroup = () => {
  return (
    <Stack gap="4" align="flex-start">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup size="sm" variant="subtle">
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Shift</Kbd>
        <span>+</span>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Stack>
  )
}
