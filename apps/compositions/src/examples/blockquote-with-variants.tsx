import { Stack } from "@chakra-ui/react"
import { Blockquote } from "compositions/ui/blockquote"

export const BlockquoteWithVariants = () => {
  return (
    <Stack gap="8">
      <Blockquote variant="subtle">
        If anyone thinks he is something when he is nothing, he deceives
        himself. Each one should test his own actions. Then he can take pride in
        himself, without comparing himself to anyone else.
      </Blockquote>
      <Blockquote variant="solid">
        If anyone thinks he is something when he is nothing, he deceives
        himself. Each one should test his own actions. Then he can take pride in
        himself, without comparing himself to anyone else.
      </Blockquote>
    </Stack>
  )
}
