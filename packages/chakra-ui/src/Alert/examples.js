/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Alert, { AlertIcon, AlertTitle, AlertBody } from ".";
import Box from "../Box";

const stories = storiesOf("Alert", module).addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

stories.add("Subtle", () => {
  return (
    <Alert status="success" variant="solid">
      <AlertIcon size={5} />
      <Box flex="1">
        <AlertTitle>Holy Smokes!</AlertTitle>
        <AlertBody>Something just happened!</AlertBody>
      </Box>
    </Alert>
  );
});

stories.add("Solid", () => {
  return (
    <Alert status="error" variant="solid">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>Holy Smokes</AlertTitle>
        <AlertBody>Something just happened!</AlertBody>
      </Box>
    </Alert>
  );
});
