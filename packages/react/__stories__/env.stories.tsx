import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import Frame, { type FrameContextProps, useFrame } from "react-frame-component"
import { EnvironmentProvider, useEnvironmentContext } from "../src"

export default {
  title: "Components / Environment",
}

const Portal = (props: React.PropsWithChildren<{}>) => {
  useDefer(true)
  const { getRootNode } = useEnvironmentContext()
  const doc: any = getRootNode?.() ?? globalThis.document
  return createPortal(props.children, doc.body)
}

function useDefer(defer?: boolean) {
  const [ready, setReady] = useState(false)
  useLayoutEffect(() => {
    if (!defer) return
    setReady(true)
  }, [defer])
  return ready
}

function useWindow() {
  const { getRootNode } = useEnvironmentContext()
  const doc: any = getRootNode?.() ?? globalThis.document
  const win = doc.defaultView ?? globalThis.window

  const [match, setMatch] = useState(false)

  useEffect(() => {
    const handler = (query: MediaQueryListEvent) => {
      setMatch(query.matches)
    }

    const mql = win.matchMedia("(min-width: 600px)")
    setMatch(mql.matches)

    mql.addEventListener("change", handler)
    return () => {
      mql.removeEventListener("change", handler)
    }
  }, [win])

  return {
    w: win.innerWidth,
    h: win.innerHeight,
    match,
  }
}

function FrameContext(props: {
  children: (ctx: FrameContextProps) => React.ReactNode
}) {
  const ctx = useFrame()
  return props.children(ctx)
}

function WindowSize() {
  const data = useWindow()
  return <pre>{JSON.stringify(data)}</pre>
}

export const WithPortal = () => {
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

export const WithSize = () => {
  return (
    <>
      <WindowSize />
      <Frame style={{ background: "yellow", width: "100%", maxWidth: "300px" }}>
        <FrameContext>
          {({ document }) => (
            <EnvironmentProvider value={() => document ?? globalThis.document}>
              <WindowSize />
            </EnvironmentProvider>
          )}
        </FrameContext>
      </Frame>
    </>
  )
}
