import { select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import useToast from "../src/Toast";
import Button from "../src/Button";
import Alert from "../src/Alert";

const stories = storiesOf("Messaging & Alert", module);
stories.addDecorator(withKnobs);

stories.add("Alert", () =>
  ["info", "warning", "error", "success"].map(status => (
    <Alert
      mb={4}
      status={status}
      variant={select(
        "variant",
        ["subtle", "left-accent", "top-accent", "card", "solid"],
        "subtle"
      )}
      isClosable
      title="Nostrud non magna quis veniam dolore magna voluptate."
      children="Ut ut eiusmod ad cillum ad magna cillum non esse labore exercitation qui minim minim."
    />
  ))
);

stories.add("Toast", () => {
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

// stories.add("Editable Control", () => (
//   <EditableControl onSave={val => console.log(val)} />
// ));
