/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import List from "../List";
import Progress from ".";

const stories = storiesOf("Progress", module).addDecorator(story => (
  <Box maxWidth="400px" mx="auto" mt={8} p={3}>
    {story()}
  </Box>
));

stories.add("basic usage", () => {
  return <Progress value={20} />;
});

stories.add("with theme color ", () => {
  return <Progress color="pink" value={20} />;
});

stories.add("with stripe", () => {
  return <Progress color="green" hasStripe value={20} />;
});

stories.add("with sizes", () => {
  return (
    <List spacing={5}>
      <Progress color="green" size="sm" value={20} />
      <Progress color="green" size="md" value={20} />
      <Progress color="green" size="lg" value={20} />
    </List>
  );
});

stories.add("with stripe animation", () => {
  return <Progress color="green" hasStripe isAnimated value={20} />;
});
