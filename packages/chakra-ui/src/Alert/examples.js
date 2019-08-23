/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Alert, { AlertIcon, AlertTitle, AlertDescription } from ".";
import Box from "../Box";
import CloseButton from "../CloseButton";

const stories = storiesOf("Alert", module);

stories.add("Default", () => {
  return (
    <Alert status="error" variant="solid" justifyContent="center">
      <AlertIcon />
      <AlertTitle display="inline-block" mr={2}>
        Your browser is outdated!
      </AlertTitle>
      <AlertDescription display="inline-block">
        Your Chakra experience may be degraded.
      </AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
});

stories.add("Subtle", () => {
  return (
    <Alert status="success" maxWidth="sm" mx="auto" alignItems="start">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>Holy Smokes!</AlertTitle>
        <AlertDescription>Something just happened!</AlertDescription>
      </Box>
    </Alert>
  );
});

stories.add("Solid", () => {
  return (
    <Alert
      status="error"
      variant="solid"
      maxWidth="sm"
      mx="auto"
      alignItems="start"
    >
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>Holy Smokes</AlertTitle>
        <AlertDescription>Something just happened!</AlertDescription>
      </Box>
      <CloseButton position="absolute" right="4px" top="4px" />
    </Alert>
  );
});
