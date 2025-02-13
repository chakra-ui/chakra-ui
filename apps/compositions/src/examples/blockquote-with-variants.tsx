import { Blockquote, Stack } from "@chakra-ui/react"

export const BlockquoteWithVariants = () => {
  return (
    <Stack gap="8">
      <Blockquote.Root variant="subtle">
        <Blockquote.Content>
          If anyone thinks he is something when he is nothing, he deceives
          himself. Each one should test his own actions. Then he can take pride
          in himself, without comparing himself to anyone else.
        </Blockquote.Content>
      </Blockquote.Root>
      <Blockquote.Root variant="solid">
        <Blockquote.Content>
          If anyone thinks he is something when he is nothing, he deceives
          himself. Each one should test his own actions. Then he can take pride
          in himself, without comparing himself to anyone else.
        </Blockquote.Content>
      </Blockquote.Root>
    </Stack>
  )
}
