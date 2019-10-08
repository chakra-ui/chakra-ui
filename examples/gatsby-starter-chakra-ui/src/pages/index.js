import React from "react";
import { Box, Button, Heading, Text, useColorMode } from "@chakra-ui/core";

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={5}>
      <Heading size="md" mb={5}>
        Hello World
      </Heading>
      <Text mb={3}>Color mode: {colorMode}</Text>
      <Button variantColor="teal" onClick={toggleColorMode}>
        Toggle color mode
      </Button>
    </Box>
  );
};

export default IndexPage;
