import {
  Box,
  Button,
  DarkMode,
  Heading,
  Image,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import { FaPlayCircle } from "react-icons/fa"

const EggheadCourseBanner = ({ href }) => {
  return (
    <LinkBox role="group" mt="10">
      <Flex align="center" rounded="3xl" bg="gray.900" padding="8">
        <Image
          display={{ base: "none", lg: "block" }}
          flexShrink={0}
          w="20"
          mr={{ lg: "10" }}
          src="/egghead-banner/egghead.svg"
          alt="Egghead Logo"
        />
        <Box>
          <LinkOverlay href={href} target="_blank" color="white">
            <Flex align="center" mb="4">
              <Heading size="md">
                Build a Modern User Interface with Chakra UI
              </Heading>
              <Image
                display={{ lg: "none" }}
                ml="3"
                flexShrink={0}
                w="10"
                src="/egghead-banner/egghead.svg"
                alt="Egghead Logo"
              />
            </Flex>
          </LinkOverlay>
          <Text mb="5" color="gray.400">
            In this free course, you will learn the basics of Chakra UI and how
            to build well-designed, accessible user interfaces with speed!
          </Text>
          <DarkMode>
            <Button
              as="a"
              target="_blank"
              href="https://egghead.io/courses/build-a-modern-user-interface-with-chakra-ui-fac68106"
              leftIcon={<FaPlayCircle />}
              color="white"
            >
              Start learning
            </Button>
          </DarkMode>
        </Box>
      </Flex>
    </LinkBox>
  )
}

export default EggheadCourseBanner
