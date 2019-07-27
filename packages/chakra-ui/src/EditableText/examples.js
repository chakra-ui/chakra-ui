/* eslint-disable no-console */
import styled from "@emotion/styled";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import EditableText, { EditableInput, EditablePreview } from "../EditableText";
import { Box } from "../Layout";

const stories = storiesOf("EditableText", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

const StyledInput = styled(EditableInput)`
  &:focus {
    color: red;
  }
`;

stories.add("Default", () => (
  <EditableText textAlign="center" defaultValue="testing" fontSize="2xl">
    <EditablePreview fontWeight="bold"/>
    <EditableInput />
  </EditableText>
));
