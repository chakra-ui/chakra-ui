import * as React from "react"
import { Button } from "@chakra-ui/button"
import { Box, Grid } from "@chakra-ui/layout"
import { useBreakpointValue, useViewportSize } from "./media-query.hook"
import { Hide, Show, useBreakpoint } from "."

export default {
  title: "Breakpoints",
}

export const show = () => (
  <Show above="sm">
    <div>Hey! I'll show above sm (480px)</div>
  </Show>
)

export const hide = () => (
  <Hide below="md">
    <div>Hallos! I'll hide below 768px</div>
  </Hide>
)

export const HideWithQuery = () => (
  <Hide breakpoint="(max-width: 400px)">
    <div>Hallos! I'll be hide at 400px</div>
  </Hide>
)

export const ShowWithQuery = () => (
  <Show breakpoint="(max-width: 400px)">
    <div>Hallos! I'll be show at 400px</div>
  </Show>
)

export const BreakpointHook = () => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === "sm" || breakpoint === "base"
  return (
    <code style={{ fontSize: isMobile ? 15 : 30 }}>
      The current breakpoint is {JSON.stringify(breakpoint, null, 2)}!
    </code>
  )
}

export const BreakpointValueHook = () => {
  const width = useBreakpointValue({ base: "150px", md: "250px" })
  return <Button width={width}>I'm {width} wide</Button>
}

export const ViewportSizeHook = () => {
  const ref = React.useRef()
  const [width, height] = useViewportSize(ref)
  return (
    <Grid w="100vw" minH="100vh" placeItems="center">
      <Box ref={ref} w="50%" h="50%" bg="purple.50">
        {width}px x {height}px
      </Box>
    </Grid>
  )
}
