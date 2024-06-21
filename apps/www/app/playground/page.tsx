import * as Playground from "@/components/playground"
import { Switch } from "@/compositions/ui/switch"
import { ColorPalette, Container, Stack, Text } from "@chakra-ui/react"

const colorPalettes: ColorPalette[] = [
  "gray",
  "red",
  "green",
  "blue",
  "teal",
  "pink",
  "purple",
  "cyan",
  "orange",
  "yellow",
]

export default function Page() {
  return (
    <Container py="20" fontSize="sm">
      <Playground.Section>
        <Playground.SectionTitle id="switch">Switch</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack key={colorPalette} direction="row" gap="10" px="4">
              <Text minW="8ch">{colorPalette}</Text>
              <Switch colorPalette={colorPalette} />
              <Switch colorPalette={colorPalette} defaultChecked />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>
    </Container>
  )
}
