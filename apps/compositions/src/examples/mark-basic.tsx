import { Mark, Text } from "@chakra-ui/react"

export const MarkBasic = () => {
  return (
    <Text>
      The
      <Mark variant="subtle" colorPalette="yellow">
        design system
      </Mark>
      is a collection of UI elements
    </Text>
  )
}
