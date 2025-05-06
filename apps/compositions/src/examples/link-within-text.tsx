import { Link, Text } from "@sh3yk0-ui/react"

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
