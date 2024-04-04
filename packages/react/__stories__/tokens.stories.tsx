import { Center, For, Stack } from "../src"

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
