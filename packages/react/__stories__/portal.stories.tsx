import * as React from "react"
import Frame from "react-frame-component"
import { Portal } from "../src/components/portal"

export default {
  title: "Components / Portal",
}

export const Basic = () => (
  <>
    <p>Welcome</p>
    <Portal>This text has been portaled</Portal>
  </>
)

export const WithIframe = () => (
  <Frame>
    <h1>Welcome</h1>
    <Portal>Welcome</Portal>
  </Frame>
)

export const WithContainer = () => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <p>Welcome</p>
      <Portal containerRef={ref}>
        <span>This text has been portaled</span>
      </Portal>
      <div id="iframe" ref={ref}>
        Portal Div
      </div>
    </>
  )
}
