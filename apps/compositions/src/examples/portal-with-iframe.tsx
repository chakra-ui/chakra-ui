import { Portal } from "@chakra-ui/react"
import Frame from "react-frame-component"

export const PortalWithIframe = () => (
  <Frame>
    <h1>Welcome</h1>
    <Portal>Welcome</Portal>
  </Frame>
)
