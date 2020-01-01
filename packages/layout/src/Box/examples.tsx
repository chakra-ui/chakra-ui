import { PropsOf } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Box } from ".";
import setup from "../story.setup";

const stories = storiesOf("Box", module);

stories.addDecorator(setup);

stories.add("default", () => (
  <Box
    color="tomato"
    // fontWeight="medium"
    _hover={{ bg: "red.500", color: "white" }}
  >
    Welcome to Box
  </Box>
));

stories.add("as prop + generic", () => (
  <Box<PropsOf<"img">>
    rounded="sm"
    as="img"
    _hover={{ rounded: "md" }}
    margin={[3, 4]}
    src="https://avatars3.githubusercontent.com/u/14854048?s=180&v=4"
  />
));
