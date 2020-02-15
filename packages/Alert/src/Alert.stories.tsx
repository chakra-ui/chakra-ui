import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "./Alert";
import { chakra } from "@chakra-ui/system";

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
    </Alert>
  );
});

stories.add("Subtle", () => {
  return (
    <Alert status="success" maxWidth="sm" mx="auto" alignItems="start">
      <AlertIcon />
      <chakra.div flex="1">
        <AlertTitle>Holy Smokes!</AlertTitle>
        <AlertDescription>Something just happened!</AlertDescription>
      </chakra.div>
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
      <chakra.div flex="1">
        <AlertTitle>Holy Smokes</AlertTitle>
        <AlertDescription>Something just happened!</AlertDescription>
      </chakra.div>
    </Alert>
  );
});
