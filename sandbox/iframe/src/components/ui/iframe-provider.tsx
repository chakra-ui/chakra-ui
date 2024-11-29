import {
  ChakraProvider,
  EnvironmentProvider,
  defaultSystem,
} from "@chakra-ui/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import weakMemoize from "@emotion/weak-memoize"
import Iframe, { FrameContextConsumer } from "react-frame-component"

const createCacheFn = weakMemoize((container: HTMLElement) =>
  createCache({ container, key: "frame" }),
)

export const IframeProvider = (props: React.PropsWithChildren) => {
  const { children } = props
  return (
    <Iframe>
      <FrameContextConsumer>
        {(frame) => {
          const head = frame.document?.head
          if (!head) return null
          return (
            <CacheProvider value={createCacheFn(head)}>
              <EnvironmentProvider value={() => head.ownerDocument}>
                <ChakraProvider value={defaultSystem}>
                  {children}
                </ChakraProvider>
              </EnvironmentProvider>
            </CacheProvider>
          )
        }}
      </FrameContextConsumer>
    </Iframe>
  )
}
