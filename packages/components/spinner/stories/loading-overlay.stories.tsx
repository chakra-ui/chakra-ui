import { Box, BoxProps, Button, Heading } from "@chakra-ui/react"
import { forwardRef, ThemeProvider, useTheme } from "@chakra-ui/system"
import { mergeWith } from "@chakra-ui/utils"
import * as React from "react"
import { LoadingOverlay, LoadingSpinner, LoadingText } from "../src"

export default {
  title: "Components / Feedback / LoadingOverlay",
}

const Card = forwardRef<BoxProps, "div">((props, ref) => {
  return (
    <Box
      ref={ref}
      borderRadius="md"
      borderWidth="1px"
      position="relative"
      width="400px"
      height="200px"
      p="8"
    >
      <Heading size="md" mb="4">
        Chakra UI
      </Heading>
      {props.children}
    </Box>
  )
})

export const Basic = () => (
  <LoadingOverlay>
    <LoadingSpinner />
  </LoadingOverlay>
)

export const WithText = () => (
  <LoadingOverlay>
    <LoadingSpinner />
    <LoadingText>Loading...</LoadingText>
  </LoadingOverlay>
)

export const SpinnerColor = () => (
  <LoadingOverlay>
    <LoadingSpinner color="teal.500" />
  </LoadingOverlay>
)

export const FullScreenVariant = () => (
  <Card>
    <LoadingOverlay variant="fullscreen">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const OverlayVariant = () => (
  <Card>
    <LoadingOverlay variant="overlay">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const WithContainerRef = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let timeout
    if (isLoading) {
      timeout = setTimeout(() => {
        setLoading(false)
      }, 5000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  return (
    <Card ref={containerRef}>
      <Button onClick={() => setLoading(true)}>Refresh</Button>
      <LoadingOverlay
        variant="overlay"
        containerRef={containerRef}
        isLoading={isLoading}
      >
        <LoadingSpinner />
      </LoadingOverlay>
    </Card>
  )
}

export const WithMotionPreset = () => {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Card>
      <LoadingOverlay
        variant="overlay"
        motionPreset="none"
        isLoading={isLoading}
      >
        <LoadingSpinner />
      </LoadingOverlay>
    </Card>
  )
}

export const WithCustomStyleConfig = () => {
  const theme = useTheme()
  return (
    <ThemeProvider
      theme={mergeWith(theme, {
        components: {
          LoadingOverlay: {
            variants: {
              fill: {
                overlay: {
                  bg: "teal.100",
                },
              },
            },
          },
        },
      })}
    >
      <LoadingOverlay>
        <LoadingSpinner color="teal.500" />
      </LoadingOverlay>
    </ThemeProvider>
  )
}
