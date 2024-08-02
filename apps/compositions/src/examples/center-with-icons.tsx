import { Box, Center, HStack } from "@chakra-ui/react"
import { LuPhone } from "react-icons/lu"

export const CenterWithIcons = () => {
  return (
    <HStack>
      <Center w="40px" h="40px" bg="tomato" color="white">
        <LuPhone />
      </Center>

      <Center w="40px" h="40px" bg="tomato" color="white">
        <Box as="span" fontWeight="bold" fontSize="lg">
          1
        </Box>
      </Center>
    </HStack>
  )
}
