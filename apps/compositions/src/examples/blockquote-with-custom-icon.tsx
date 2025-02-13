import { Blockquote, Circle, Float } from "@chakra-ui/react"
import { LuQuote } from "react-icons/lu"

export const BlockquoteWithCustomIcon = () => {
  return (
    <Blockquote.Root colorPalette="blue" ps="8">
      <Float placement="middle-start">
        <Circle bg="blue.600" size="8" color="white">
          <LuQuote />
        </Circle>
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
