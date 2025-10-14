import { AbsoluteCenter, Box, For, Text, VStack } from "@chakra-ui/react"

export const AbsoluteCenterWithAxis = () => {
  return (
    <VStack gap="6" align="stretch">
      <For each={["horizontal", "vertical", "both"]}>
        {(axis) => (
          <VStack gap="2" key={axis}>
            <Text fontWeight="medium">{`<AbsoluteCenter axis="${axis}" />`}</Text>
            <Box position="relative" h="80px" outline="1px solid red">
              <AbsoluteCenter axis={axis}>
                <Box
                  bg="blue.solid"
                  px="3"
                  py="1"
                  borderRadius="sm"
                  color="white"
                >
                  {axis}
                </Box>
              </AbsoluteCenter>
            </Box>
          </VStack>
        )}
      </For>
    </VStack>
  )
}
