import { Badge, Box, Center, Flex, Icon, Image, Text } from "@chakra-ui/react"
import { MdStar } from "react-icons/md"

export const AccessibilityDemo = () => (
  <Center>
    <Box p="5" maxW="320px" borderWidth="1px" borderColor="teal.900/30">
      <Image borderRadius="md" src="https://bit.ly/2k1H1t6" alt="Room" />
      <Flex align="baseline" mt={2}>
        <Badge colorPalette="teal">Plus</Badge>
        <Text
          ml={2}
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
          Verified &bull; Cape Town
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        Modern, Chic Penthouse with Mountain, City & Sea Views
      </Text>
      <Text mt={2}>$119/night</Text>
      <Flex mt={2} align="center">
        <Icon color="orange.400">
          <MdStar />
        </Icon>
        <Text ml={1} fontSize="sm">
          <b>4.84</b> (190)
        </Text>
      </Flex>
    </Box>
  </Center>
)
