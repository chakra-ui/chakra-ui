import { For, Heading, Stack } from "../src"

export default {
  title: "Typography / Heading",
}

export const WithSizes = () => (
  <Stack gap="8">
    <For each={["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]}>
      {(size) => <Heading size={size}>Heading {size}</Heading>}
    </For>
  </Stack>
)

export const WithStyleOverride = () => (
  <Heading color="red.500" fontSize="40px">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
  </Heading>
)
