import React from "react"
import { Box, Icon } from "@chakra-ui/core"
import { FaHeart } from "react-icons/fa"

const SponsorButton = (props) => {
  return (
    <Box
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      as="a"
      href="https://opencollective.com/chakra-ui"
      target="_blank"
      rel="noopener noreferrer"
      bg="#eff3f6"
      bgImage="linear-gradient(-180deg,#fafbfc,#eff3f6 90%)"
      borderWidth="1px"
      borderColor="gray.300"
      paddingX="1em"
      minHeight="36px"
      borderRadius="md"
      fontSize="sm"
      color="gray.800"
      fontWeight="normal"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: "#e6ebf1",
        bgImage: "linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%)",
        borderColor: "gray.300",
        bgPosition: "-0.5em",
      }}
      _active={{
        borderColor: "#4a4a4a",
      }}
      _focus={{
        boxShadow: "outline",
      }}
      {...props}
    >
      <Icon as={FaHeart} boxSize="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit">
        Sponsor
      </Box>
    </Box>
  )
}

export default SponsorButton
