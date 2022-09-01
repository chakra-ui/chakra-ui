import { Box, BoxProps, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
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
      minH="200px"
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

export const Custom = () => (
  <LoadingOverlay variant="fullscreen">
    <Box
      display="flex"
      rounded="md"
      p="2"
      bg="blackAlpha.200"
      alignItems="center"
    >
      <LoadingSpinner size="sm" me="2" color="teal.500" />
      <LoadingText fontSize="sm">Loading...</LoadingText>
    </Box>
  </LoadingOverlay>
)

export const OverlayVariant = () => (
  <Card>
    <Box fontSize="sm">
      There are many benefits to a joint design and development system. Not only
      does it bring benefits to the design team, but it also brings benefits to
      engineering teams. It makes sure that our experiences have a consistent
      look and feel, not just in our design specs, but in production
    </Box>
    <LoadingOverlay variant="overlay">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const WithMotionPreset = () => {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let timeout
    if (isLoading) {
      timeout = setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  return (
    <Card>
      <Box fontSize="sm">
        There are many benefits to a joint design and development system. Not
        only does it bring benefits to the design team, but it also brings
        benefits to engineering teams. It makes sure that our experiences have a
        consistent look and feel, not just in our design specs, but in
        production
      </Box>

      <Button onClick={() => setLoading(true)}>Refresh</Button>

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
