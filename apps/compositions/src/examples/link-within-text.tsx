import { Link, Text } from "@chakra-ui/react"

export const LinkWithinText = () => {
  return (
    <Text>
      Visit the{" "}
      <Link
        variant="underline"
        href="https://chakra-ui.com"
        colorPalette="teal"
      >
        Chakra UI
      </Link>{" "}
      website
    </Text>
  )
}
