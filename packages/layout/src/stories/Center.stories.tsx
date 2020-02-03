import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Center from "../Center";
import setup from "../story.setup";

///////////////////////////////////////////////////////////////////////////////////

const stories = storiesOf("Center", module).addDecorator(setup);

stories.add("flex", () => (
  <Center size="400px">
    <Box size="200px" bg="green.200">
      Box
    </Box>
  </Center>
));

stories.add("absolute", () => (
  <Center use="absolute" size="400px" bg="green.200">
    Box
  </Center>
));
