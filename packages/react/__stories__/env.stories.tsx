import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Frame from "react-frame-component"
import { EnvironmentProvider, useEnvironment } from "../src/components/env"

export default {
  title: "System / Environment",
}

const Portal = ({ children }: React.PropsWithChildren<{}>) => {
  const { getDocument } = useEnvironment({ defer: true })
  return createPortal(children, getDocument().body)
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

function useWindow({ defer }: { defer?: boolean } = {}) {
  const { getWindow } = useEnvironment({ defer })
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const win = getWindow()

    const handler = (query: MediaQueryListEvent) => {
      setMatch(query.matches)
    }

    const mql = win.matchMedia("(min-width: 600px)")
    setMatch(mql.matches)

    mql.addEventListener("change", handler)
    return () => {
      mql.removeEventListener("change", handler)
    }
  }, [getWindow])

  return {
    w: getWindow().innerWidth,
    h: getWindow().innerHeight,
    match,
  }
}

function WindowSize({ defer }: { defer?: boolean } = {}) {
  const data = useWindow({ defer })
  return <pre>{JSON.stringify(data)}</pre>
}

export function SizeWithinIframe() {
  return (
    <>
      <WindowSize />
      <Frame style={{ background: "yellow", width: "100%", maxWidth: "300px" }}>
        <EnvironmentProvider>
          <WindowSize defer />
        </EnvironmentProvider>
      </Frame>
    </>
  )
}
