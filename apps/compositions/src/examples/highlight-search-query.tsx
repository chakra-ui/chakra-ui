import { Highlight, Stack, Text } from "@chakra-ui/react"

const query = "spot"
const results = ["Spotlight bulb", "Spot cleaner", "Spot ceiling"]

export const HighlightSearchQuery = () => {
  return (
    <Stack gap="6">
      <Text>Search result for: spot</Text>
      <Stack gap="1">
        {results.map((item) => (
          <p key={item}>
            <Highlight
              ignoreCase
              query={query}
              styles={{ fontWeight: "semibold" }}
            >
              {item}
            </Highlight>
          </p>
        ))}
      </Stack>
    </Stack>
  )
}
