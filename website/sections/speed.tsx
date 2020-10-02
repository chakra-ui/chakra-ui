import { chakra, Container, Box, Text } from "@chakra-ui/core"
import React from "react"

export default function Speed() {
  return (
    <Box as="section">
      <Container py="80px">
        <Box mb="3em" textAlign="center">
          <chakra.h2 textStyle="heading">Less code. More speed</chakra.h2>
          <Text opacity={0.7} fontSize="lg" mt="3" mx="auto" maxW="600px">
            Spend less time writing UI code and more time building a great
            experience for your customers.
          </Text>
        </Box>
        <Box
          maxW="7xl"
          mx="auto"
          mb="-300px"
          px={{ base: "4", md: 0 }}
          position="relative"
        >
          <Box
            as="iframe"
            tabIndex={-1}
            src="https://codesandbox.io/embed/chakra-home-page-xqt3d?codemirror=1&fontsize=12&hidenavigation=1&theme=dark"
            style={{
              width: "100%",
              background: "white",
              height: "600px",
              border: "0",
              borderRadius: 8,
              overflow: "hidden",
              position: "static",
              zIndex: 0,
            }}
            shadow="2xl"
            title="dazzling-swanson-wne32"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </Box>
      </Container>
    </Box>
  )
}
