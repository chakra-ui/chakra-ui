import { Badge, For, HStack } from ".."

export default {
  title: "Data Display / Badge",
}

const colorSchemes = ["gray", "green", "red", "orange", "purple", "teal"]

export const Basic = () => <Badge>Success</Badge>

export const WithSolidVariant = () => (
  <HStack>
    <For each={colorSchemes}>
      {(colorScheme) => (
        <Badge colorScheme={colorScheme} variant="solid">
          {colorScheme}
        </Badge>
      )}
    </For>
  </HStack>
)

export const WithSubtleVariant = () => (
  <HStack>
    <For each={colorSchemes}>
      {(colorScheme) => <Badge colorScheme={colorScheme}>{colorScheme}</Badge>}
    </For>
  </HStack>
)

export const WithOutlineVariant = () => (
  <HStack>
    <For each={colorSchemes}>
      {(colorScheme) => (
        <Badge colorScheme={colorScheme} variant="outline">
          {colorScheme}
        </Badge>
      )}
    </For>
  </HStack>
)
