import { Center, For, SimpleGrid, Stack, Text } from "../src"

export default {
  title: "Foundations / Tokens",
}

export const Shadows = () => {
  return (
    <Stack gap="6" padding="10">
      <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(shadow) => (
          <Center
            shadow={shadow}
            width="400px"
            height="20"
            color="fg.subtle"
            borderRadius="md"
          >
            {shadow}
          </Center>
        )}
      </For>
    </Stack>
  )
}

export const StatusTokens = () => {
  return (
    <SimpleGrid columns={4} gap="10">
      <For each={["bg.error", "bg.warning", "bg.success", "bg.info"]}>
        {(color) => (
          <Center bg={color} height="40px">
            <Text>{color}</Text>
          </Center>
        )}
      </For>

      <For each={["fg.error", "fg.warning", "fg.success", "fg.info"]}>
        {(color) => (
          <Center bg={color} height="40px">
            <Text color="fg.inverted">{color}</Text>
          </Center>
        )}
      </For>

      <For
        each={[
          "border.error",
          "border.warning",
          "border.success",
          "border.info",
        ]}
      >
        {(color) => (
          <Center borderColor={color} height="40px" borderWidth="2px">
            <Text color="fg">{color}</Text>
          </Center>
        )}
      </For>
    </SimpleGrid>
  )
}
