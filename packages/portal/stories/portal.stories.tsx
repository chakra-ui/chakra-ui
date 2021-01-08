import * as React from "react"
import Frame from "react-frame-component"
import { Portal, PortalManager } from "../src"

export default {
  title: "Portal",
}

export const BasicPortal = () => (
  <>
    <p>Welcome</p>
    <Portal>This text has been portaled</Portal>
  </>
)

export const WithinIFrame = () => (
  <Frame>
    <PortalManager>
      <h1>Welcome</h1>
      <Portal>Welcome</Portal>
    </PortalManager>
  </Frame>
)

export const WithMountRef = () => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <p>Welcome</p>
      <Portal getContainer={() => ref.current}>
        <span>This text has been portaled</span>
      </Portal>
      <div id="iframe" ref={ref}>
        Portal Div
      </div>
    </>
  )
}

function Wrapper(props: any) {
  const { offset, color, children } = props
  return (
    <div
      style={{
        position: "fixed",
        top: offset || "46%",
        left: offset || "46%",
        width: "200px",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: color,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  )
}

export const NestedPortals = () => {
  return (
    <Portal>
      <Wrapper color="red">Welcome</Wrapper>
      <Portal>
        <Wrapper offset="40%" color="green">
          Welcome
        </Wrapper>
        <Portal>
          <Wrapper offset="30%" color="tomato">
            Welcome
          </Wrapper>
        </Portal>
      </Portal>
    </Portal>
  )
}
