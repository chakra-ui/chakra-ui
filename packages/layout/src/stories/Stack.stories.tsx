import React from "react";
import Box from "../Box";
import Heading from "../Heading";
import { Stack, StackDivider } from "../Stack";
import Text from "../Text";

///////////////////////////////////////////////////////////////////////////////////

export default {
  title: "Stack",
};

export const Vertical = () => (
  <Stack spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
);

export const Inline = () => (
  <Stack w="100%" bg="blue.500" direction="row">
    <Box size="40px" bg={"#fff"} borderRadius="full" />
    <Box size="40px" bg={"#fff"} borderRadius="full" />
    <Box size="40px" bg={"#fff"} borderRadius="full" />
  </Stack>
);

export const Reversed = () => (
  <Stack direction="column" isReversed spacing="40px" w="100%">
    <Box w="100%" h="40px" bg="yellow.200">
      1
    </Box>
    <Box w="100%" h="40px" bg="tomato">
      2
    </Box>
    <Box w="100%" h="40px" bg="pink.100">
      3
    </Box>
  </Stack>
);

export const WithDivider = () => (
  <>
    <Stack
      isInline
      divider={<StackDivider borderColor="red.200" />}
      spacing="40px"
    >
      <Box w="100%" h="40px" bg="yellow.200">
        1
      </Box>
      <Box w="100%" h="40px" bg="tomato">
        2
      </Box>
      <Box w="100%" h="40px" bg="pink.100">
        3
      </Box>
    </Stack>

    <Stack divider={<StackDivider borderColor="red.200" />} spacing="40px">
      <Box w="100%" h="40px" bg="yellow.200">
        1
      </Box>
      <Box w="100%" h="40px" bg="tomato">
        2
      </Box>
      <Box w="100%" h="40px" bg="pink.100">
        3
      </Box>
    </Stack>
  </>
);

function Feature({ title, desc, ...rest }: any) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      {...rest}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

export const WithContent = () => (
  <Stack direction="row" isReversed spacing={8}>
    <Feature
      title="Plan Money"
      desc="The future can be even brighter but a goal without a plan is just a wish"
    />
    <Feature
      title="Save Money"
      desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
    />
  </Stack>
);
