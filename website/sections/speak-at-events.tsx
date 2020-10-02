import {
  useColorModeValue,
  chakra,
  Box,
  Button,
  Circle,
  Container,
  Text,
  Flex,
} from "@chakra-ui/core"
import { FaMicrophone, FaArrowRight } from "react-icons/fa"

export default function SpeakAtEvents() {
  return (
    <Box
      bg={useColorModeValue("teal.50", "#81e6d91c")}
      bgImage="url(/audio-bar.svg)"
      bgPos="bottom center"
      bgSize="120px"
      bgRepeat="repeat no-repeat"
    >
      <Container
        pt="7.5rem"
        pb="10rem"
        maxW="50rem"
        mx="auto"
        textAlign="center"
      >
        <Flex direction="column" align="center" maxW="600px" mx="auto">
          <Circle size="80px" bg="blackAlpha.200">
            <FaMicrophone size="40px" />
          </Circle>
          <chakra.h2 textStyle="heading" mt="6" mb="6">
            Invite us to speak at your next event
          </chakra.h2>
          <Text mb="40px" fontSize="lg" opacity={0.7}>
            Want a Chakra UI core team member to speak at your next event?
            Invite us to create a memorable and engaging experience for your
            attendees.
          </Text>
        </Flex>
        <Button
          h="4rem"
          px="40px"
          fontSize="1.2rem"
          as="a"
          href="mailto:sage@adebayosegun.com?subject=Invitation to Speak!"
          size="lg"
          colorScheme="teal"
          rightIcon={<FaArrowRight fontSize="0.8em" />}
        >
          Invite us to speak
        </Button>
      </Container>
    </Box>
  )
}
