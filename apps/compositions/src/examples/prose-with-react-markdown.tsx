import { Prose } from "compositions/ui/prose"
import Markdown from "react-markdown"

export const ProseWithReactMarkdown = () => {
  return (
    <Prose mx="auto">
      <Markdown>
        {`
  ## Heading
  
  Based on your Chakra package. So [click here](http://chakra-ui.com) to confirm your plan.
  
  - first item
  - second item
  - second item
  - second item
  
  [title](http://chakra-ui.com)
    `}
      </Markdown>
    </Prose>
  )
}
