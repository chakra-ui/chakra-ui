/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import SimpleGrid from ".";
import Grid from "../Grid";

const stories = storiesOf("SimpleGrid", module);

stories.add("with columns", () => (
  <SimpleGrid columns={[2, null, 3]} spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));

stories.add("with autofit and min child width", () => (
  <SimpleGrid minChildWidth="300px" spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));

stories.add("responsive columns", () => (
  <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr 1fr" }} columnGap="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </Grid>
));

stories.add("responsive columns 2", () => (
  <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} columnGap="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </Grid>
));
