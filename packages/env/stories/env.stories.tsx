import React, { createPortal } from "react-dom"
import Frame from "react-frame-component"

import { useEnvironment, EnvironmentProvider } from ".."

export default {
  title: "Environment",
}

const Portal = ({ children }) => {
  const env = useEnvironment()
  return createPortal(children, env.document.body)
}

export function WithIframe() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Portal>Outside iframe</Portal>
      <Frame style={{ background: "yellow" }}>
        <EnvironmentProvider>
          <span>Welcome home</span>
          <Portal>Inside iframe</Portal>
        </EnvironmentProvider>
      </Frame>
    </div>
  )
}

function WindowSize() {
  const { window } = useEnvironment()
  return (
    <pre>{JSON.stringify({ w: window.innerWidth, h: window.innerHeight })}</pre>
  )
}

export function SizeWithinIframe() {
  return (
    <>
      <WindowSize />
      <Frame style={{ background: "yellow" }}>
        <EnvironmentProvider>
          <WindowSize />
        </EnvironmentProvider>
      </Frame>
    </>
  )
}
