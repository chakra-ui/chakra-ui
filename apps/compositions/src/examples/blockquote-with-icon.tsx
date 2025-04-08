import { Blockquote, Float } from "@chakra-ui/react"

export const BlockquoteWithIcon = () => {
  return (
    <Blockquote.Root variant="plain" colorPalette="teal">
      <Float placement="top-start" offsetY="2">
        <Blockquote.Icon />
      </Float>
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
