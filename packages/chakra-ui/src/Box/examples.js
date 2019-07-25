/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from ".";

const stories = storiesOf("Box", module);
stories.add("Generic", () => {
  return (
    <Box
      bg="white"
      display={["flex", "block"]}
      rounded="lg"
      p={6}
      boxShadow="lg"
      transition="all 0.2s"
    >
      <Box
        as="img"
        size={["24", "16"]}
        rounded="full"
        mx={["0", "auto"]}
        mr={[5, null]}
        mb={[null, 4]}
        display="block"
        src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
      />
      <Box textAlign={["left", "center"]}>
        <Box as="h2" fontSize="lg" fontWeight="bold">
          Erin Lindford
        </Box>
        <Box color="purple.500">Customer Support</Box>
        <Box color="gray.600">erinlindford@example.com</Box>
        <Box color="gray.600">(555) 765-4321</Box>
      </Box>
    </Box>
  );
});

stories.add("Cards", () => (
  <Box maxWidth="340px" mx="auto">
    <Box mt={5} boxShadow="0 0 0 1px #e3e8ee" height="16">
      This is a box
    </Box>
    <br />
    <Box
      mt={5}
      boxShadow="0 2px 5px 0 rgba(60,66,87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, .07)"
      height="16"
    >
      This is a box
    </Box>
    <br />
    <Box
      mt={5}
      boxShadow="0 7px 14px 0 rgba(60,66,87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, .07)"
      height="16"
    >
      This is a box
    </Box>
    <Box
      mt={5}
      boxShadow="0 15px 35px 0 rgba(60,66,87, 0.1),
      0 5px 15px 0 rgba(0, 0, 0, .07)"
      height="16"
    >
      This is a box
    </Box>
    <Box
      mt={5}
      boxShadow="0 50px 100px 0 rgba(60,66,87, 0.1),
      0 15px 35px 0 rgba(60,66,87, 0.1), 0 5px 15px 0 rgba(0, 0, 0, .07)"
      height="16"
    >
      This is a box
    </Box>
  </Box>
));
