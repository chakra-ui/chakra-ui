import React from "react";
import { storiesOf } from "@storybook/react";
import setup from "./story.setup";
import Box from "./Box";
import { PropsOf, chakra } from "@chakra-ui/system";
import AspectRatioBox from "./AspectRatioBox";
import Stack from "./Stack";
import Heading from "./Heading";
import Text from "./Text";
import SimpleGrid from "./SimpleGrid";

///////////////////////////////////////////////////////////////////////////////////

const boxStories = storiesOf("Box", module).addDecorator(setup);

boxStories.add("default", () => (
  <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
    Welcome to Box
  </Box>
));

boxStories.add("as prop + generic", () => (
  <Box<PropsOf<"img">>
    rounded="sm"
    as="img"
    _hover={{ rounded: "md" }}
    margin={[3, 4]}
    src="https://avatars3.githubusercontent.com/u/14854048?s=180&v=4"
  />
));

///////////////////////////////////////////////////////////////////////////////////

const ratioBoxStories = storiesOf("AspectRatioBox", module).addDecorator(setup);

ratioBoxStories.add("with video", () => (
  <AspectRatioBox maxW="300px" ratio={1}>
    <chakra.iframe
      title="test"
      src="https://www.youtube.com/embed/QhBnZ6NPOY0"
      allowFullScreen
    />
  </AspectRatioBox>
));

ratioBoxStories.add("with image", () => (
  <AspectRatioBox maxW="400px" ratio={4 / 3}>
    <chakra.img
      src="https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png"
      alt="minions"
      objectFit="cover"
    />
  </AspectRatioBox>
));

ratioBoxStories.add("with map", () => (
  <AspectRatioBox maxW="600px" ratio={16 / 9}>
    <chakra.iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
      title="demo"
    />
  </AspectRatioBox>
));

///////////////////////////////////////////////////////////////////////////////////

const stackStories = storiesOf("Stack", module);

stackStories.addDecorator(setup);

stackStories.add("vertical stack", () => (
  <Stack shouldWrapChildren spacing={4} direction="row">
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
));

stackStories.add("Inline Stack", () => (
  <Stack w="100%" bg="blue.500" direction="row">
    <Box size="40px" bg={"#fff"} rounded="full" />
    <Box size="40px" bg={"#fff"} rounded="full" />
    <Box size="40px" bg={"#fff"} rounded="full" />
  </Stack>
));

stackStories.add("Reversed + Inline Stack", () => (
  <Stack spacing="40px" w="100%" h="60px">
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
));

stackStories.add("Reverse direction prop", () => (
  <Stack direction="column-reverse" spacing="40px" w="100%">
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
));

function Feature({ title, desc, ...rest }: any) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

stackStories.add("Reverse example in docs", () => (
  <Stack direction="row-reverse" spacing={8}>
    <Feature
      title="Plan Money"
      desc="The future can be even brighter but a goal without a plan is just a wish"
    />
    <Feature
      title="Save Money"
      desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
    />
  </Stack>
));

///////////////////////////////////////////////////////////////////////////////////

const simplegrid = storiesOf("SimpleGrid", module);

simplegrid.add("with columns", () => (
  <SimpleGrid columns={[2, null, 3]} spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));

simplegrid.add("with autofit and min child width", () => (
  <SimpleGrid minChildWidth="300px" spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));
