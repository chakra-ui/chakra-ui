import React from "react";
import { PseudoBox, Box } from "@chakra-ui/core";
import { FaHeart } from "react-icons/fa";

function SponsorButton(props) {
  return (
    <PseudoBox
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      as="a"
      href="https://opencollective.com/chakra-ui"
      target="_blank"
      rel="noopener noreferrer"
      bg="#eff3f6"
      bgImage="linear-gradient(-180deg,#fafbfc,#eff3f6 90%)"
      border="1px"
      borderColor="#1b1f2333"
      padding="calc(0.4em - 1px) 1em"
      mr="5"
      rounded="md"
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
        borderColor: "cyan.600",
        boxShadow: "outline",
      }}
      {...props}
    >
      <Box as={FaHeart} size="4" color="red.500" mr="2" />
      <strong>Sponsor</strong>
    </PseudoBox>
  );
}

export default SponsorButton;
