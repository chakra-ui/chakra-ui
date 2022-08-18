import { Box, BoxProps, Heading } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "@chakra-ui/system"
import { mergeWith } from "@chakra-ui/utils"
import * as React from "react"
import { LoadingOverlay, LoadingSpinner, LoadingText } from "../src"

export default {
  title: "Components / Feedback / LoadingOverlay",
}

const Card = (props: BoxProps) => {
  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      position="relative"
      width="400px"
      height="200px"
      p="8"
    >
      <Heading size="md">Chakra UI</Heading>
      {props.children}
    </Box>
  )
}

export const Basic = () => (
  <LoadingOverlay>
    <LoadingSpinner />
  </LoadingOverlay>
)

export const FullScreen = () => (
  <Card>
    <LoadingOverlay variant="fullscreen">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const Overlay = () => (
  <Card>
    <LoadingOverlay variant="overlay">
      <LoadingSpinner />
    </LoadingOverlay>
  </Card>
)

export const Color = () => (
  <LoadingOverlay>
    <LoadingSpinner color="teal.500" />
  </LoadingOverlay>
)

export const WithText = () => (
  <LoadingOverlay>
    <LoadingSpinner color="teal.500" />
    <LoadingText>Loading...</LoadingText>
  </LoadingOverlay>
)

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
