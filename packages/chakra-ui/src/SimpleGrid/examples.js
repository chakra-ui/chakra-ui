/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import SimpleGrid from ".";

const stories = storiesOf("SimpleGrid", module);
stories.add("Default", () => (
  <SimpleGrid columns={2} autoFit spacing="40px" minChildWidth="300px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));
