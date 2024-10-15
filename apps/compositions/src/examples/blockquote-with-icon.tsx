import { Float } from "@chakra-ui/react"
import { Blockquote, BlockquoteIcon } from "compositions/ui/blockquote"

export const BlockquoteWithIcon = () => {
  return (
    <Blockquote
      variant="plain"
      colorPalette="teal"
      showDash
      icon={
        <Float placement="top-start" offsetY="2">
          <BlockquoteIcon />
        </Float>
      }
      cite="Uzumaki Naruto"
    >
      If anyone thinks he is something when he is nothing, he deceives himself.
      Each one should test his own actions. Then he can take pride in himself,
      without comparing himself to anyone else.
    </Blockquote>
  )
}
