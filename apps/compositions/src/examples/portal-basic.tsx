import { Portal } from "@chakra-ui/react"

export default {
  title: "Components / Portal",
}

export const PortalBasic = () => (
  <>
    <p>Welcome</p>
    <Portal>This text has been portaled</Portal>
  </>
)
