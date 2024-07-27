import { Blockquote } from "compositions/ui/blockquote"
import { LuMail } from "react-icons/lu"

export const BlockquoteWithCustomIcon = () => {
  return (
    <Blockquote
      cite="Uzumaki Naruto"
      colorPalette="blue"
      icon={<LuMail />}
      ps="6"
    >
      If anyone thinks he is something when he is nothing, he deceives himself.
      Each one should test his own actions. Then he can take pride in himself,
      without comparing himself to anyone else.
    </Blockquote>
  )
}
