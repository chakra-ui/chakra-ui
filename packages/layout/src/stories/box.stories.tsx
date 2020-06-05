import * as React from "react"
import { Box, Flex, Spacer, DataList, Stack, Kbd, Square, Circle } from ".."

export default {
  title: "Box",
}

export const basic = () => (
  <Box>
    <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
      Welcome to Box
    </Box>
  </Box>
)

export const dataList = () => (
  <Stack bg="teal.500">
    <DataList
      empty={<Box>Data is empty</Box>}
      data={["Segun", "Chakra", "Sage"]}
      renderItem={(item) => (
        <Box width="100%" p="2" bg="tomato">
          {item}
        </Box>
      )}
    />
  </Stack>
)

export const kbd = () => <Kbd>Ctrl + L</Kbd>

export const spacer = () => (
  <Flex color="white" direction={{ base: "column", md: "row" }}>
    <Box bg="pink.500" boxSize="100px">
      Box 1
    </Box>
    <Spacer />
    <Box bg="green.500" boxSize="100px">
      Box 2
    </Box>
  </Flex>
)

export const square = () => (
  <Square bg="red.300" size={["40px", "60px", "100px"]}>
    <Circle size="60px" bg="tomato" color="white">
      Bee
    </Circle>
  </Square>
)
