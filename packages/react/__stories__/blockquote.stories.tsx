import { Blockquote, For, Stack } from "../src"

export default {
  title: "Typography / Blockquote",
}

export const Basic = () => (
  <Stack spacing="8">
    <For each={["gray", "red", "blue", "pink", "yellow"] as const}>
      {(color) => (
        <Blockquote.Root colorPalette={color}>
          <Blockquote.Content cite="#">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            sapiente.
          </Blockquote.Content>
          <Blockquote.Caption>
            — Blockquote Caption, <cite>Book</cite>
          </Blockquote.Caption>
        </Blockquote.Root>
      )}
    </For>
  </Stack>
)
