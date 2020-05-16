export { wrapRootElement } from "./gatsby-browser"
import { InitializeColorMode } from "@chakra-ui/core"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<InitializeColorMode />])
}
