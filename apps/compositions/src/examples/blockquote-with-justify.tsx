import { Blockquote, For, HStack, Stack, Text } from "@chakra-ui/react"

export const BlockquoteWithJustify = () => {
  return (
    <Stack gap="20">
      <For each={["start", "center", "end"]}>
        {(justify) => (
          <HStack key={justify} maxW="xl">
            <Text color="fg.muted" minW="6rem">
              {justify}
            </Text>
            <Blockquote.Root variant="plain" justify={justify}>
              <Blockquote.Content cite="Uzumaki Naruto">
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote.Content>
              <Blockquote.Caption>
                — <cite>Uzumaki Naruto</cite>
              </Blockquote.Caption>
            </Blockquote.Root>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
