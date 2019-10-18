import { storiesOf } from "@storybook/react";
import React from "react";
import useToast from "../Toast";
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
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Success Toast
      </Button>
    );
  };

  return <Toaster />;
});

stories.add("Custom Component", () => {
  const Toaster = () => {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            position: "bottom-left",
            render: () => (
              <Box m={3} color="white" p={3} bg="blue.500">
                Hello World
              </Box>
            ),
          })
        }
      >
        Show Toast
      </Button>
    );
  };

  return <Toaster />;
});
