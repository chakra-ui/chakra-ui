import { Blockquote } from "@chakra-ui/react"

export const BlockquoteWithCite = () => {
  return (
    <Blockquote.Root>
      <Blockquote.Content cite="Uzumaki Naruto">
        If anyone thinks he is something when he is nothing, he deceives
        himself. Each one should test his own actions. Then he can take pride in
        himself, without comparing himself to anyone else.
      </Blockquote.Content>
      <Blockquote.Caption>
        — <cite>Uzumaki Naruto</cite>
      </Blockquote.Caption>
    </Blockquote.Root>
  )
}
