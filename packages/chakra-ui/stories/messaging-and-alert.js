import { select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Alert from "../src/Alert";

const stories = storiesOf("Messaging & Alert", module);
stories.addDecorator(withKnobs);

stories.add("Alert", () =>
  ["info", "warning", "danger", "success"].map(status => (
    <Alert
      mb={4}
      status={status}
      variant={select("variant", ["subtle", "outline", "card"], "subtle")}
      isClosable
      title="You're testing Radar for Fraud Teams"
    >
      You can change dates and currency to appear in formats that are typical
      for United Kingdom.
    </Alert>
  ))
);
// stories.add("Editable Control", () => (
//   <EditableControl onSave={val => console.log(val)} />
// ));
