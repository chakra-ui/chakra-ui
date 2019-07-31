import { storiesOf } from "@storybook/react";
import React from "react";
import useToast from ".";
import Button from "../Button";
import Box from "../Box";

const stories = storiesOf("Toast", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => {
  const Toaster = () => {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            title: "My primary message for the user.",
            duration: 5000,
            position: "top",
            subtitle: "Details to report to the user.",
            variant: "solid",
            status: "success"
          })
        }
      >
        Show Toast
      </Button>
    );
  };

  return <Toaster />;
});
