import {
  AbsoluteCenter,
  Box,
  For,
  HStack,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react"

export const AbsoluteCenterWithRtl = () => {
  return (
    <VStack gap="6" align="stretch">
      <For each={["horizontal", "vertical", "both"]}>
        {(axis) => (
          <VStack gap="2" dir="rtl" key={axis}>
            <Text fontWeight="medium">RTL ({axis})</Text>
            <Box
              position="relative"
              h="100px"
              bg="bg.muted"
              borderRadius="md"
              outline="1px solid red"
            >
              <AbsoluteCenter axis={axis}>
                <HStack
                  bg="green.solid"
                  color="white"
                  px="4"
                  py="2"
                  borderRadius="md"
                  gap="2"
                >
                  <Span>البداية</Span>
                </HStack>
              </AbsoluteCenter>
            </Box>
          </VStack>
        )}
      </For>
    </VStack>
  )
}
