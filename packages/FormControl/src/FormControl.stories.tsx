import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import {
  FormControl,
  FormLabel,
  FormInput,
  FormHelpText,
  FormErrorText,
  FormTextarea,
} from "./FormControl.base";
import * as Styled from "./FormControl";

const stories = storiesOf("FormControl", module);
stories.addDecorator(setup);

stories.add("input", () => (
  <FormControl id="first-name" isRequired isInvalid>
    <FormLabel>First name:</FormLabel>
    <FormInput placeholder="First Name" />
    <FormHelpText>Keep it very short and sweet!</FormHelpText>
    <FormErrorText>Your First name is invalid</FormErrorText>
  </FormControl>
));

stories.add("textarea", () => (
  <FormControl id="first-name" isInvalid>
    <FormLabel>First name:</FormLabel>
    <br />
    <FormTextarea placeholder="First Name" />
    <FormHelpText>Keep it very short and sweet!</FormHelpText>
    <FormErrorText>Your First name is invalid</FormErrorText>
  </FormControl>
));

stories.add("styled", () => (
  <FormControl id="first-name" isInvalid>
    <Styled.FormLabel>First name:</Styled.FormLabel>
    <br />
    <Styled.Input
      variant="outline"
      variantSize="sm"
      placeholder="First Name"
      width="100%"
      //@ts-ignore
      focusBorderColor="red.200"
    />
    <Styled.FormErrorText>Your First name is invalid</Styled.FormErrorText>
  </FormControl>
));
