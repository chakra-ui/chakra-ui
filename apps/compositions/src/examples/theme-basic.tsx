import { Button, Stack, Theme } from "@chakra-ui/react"

export const ThemeBasic = () => {
  return (
    <Stack align="flex-start">
      <Button variant="surface" colorPalette="teal">
        Auto Button
      </Button>
      <Theme p="4" appearance="dark" colorPalette="teal">
        <Button variant="surface">Dark Button</Button>
      </Theme>
      <Theme p="4" appearance="light" colorPalette="teal">
        <Button variant="surface">Light Button</Button>
      </Theme>
    </Stack>
  )
}
