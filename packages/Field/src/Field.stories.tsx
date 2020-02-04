import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { Field, Label, Input, HelpText, ErrorText, Textarea } from "./Field";

const stories = storiesOf("FormControl", module);
stories.addDecorator(setup);

stories.add("input", () => (
  <Field id="first-name" isRequired isInvalid>
    <Label>First name:</Label>
    <Input placeholder="First Name" />
    <HelpText>Keep it very short and sweet!</HelpText>
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
));

stories.add("textarea", () => (
  <Field id="first-name" isInvalid>
    <Label>First name:</Label>
    <br />
    <Textarea placeholder="First Name" />
    <HelpText>Keep it very short and sweet!</HelpText>
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
));

stories.add("styled", () => (
  <Field id="first-name" isInvalid>
    <Label>First name:</Label>
    <br />
    <Input
      variant="outline"
      variantSize="sm"
      placeholder="First Name"
      width="100%"
      focusBorderColor="red.200"
    />
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
));
