/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Alert, { AlertIcon, AlertTitle, AlertDescription } from ".";
import Box from "../Box";
import CloseButton from "../CloseButton";

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
        <AlertDescription>Something just happened!</AlertDescription>
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
        <AlertDescription>Something just happened!</AlertDescription>
      </Box>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
});
