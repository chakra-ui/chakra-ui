/* eslint-disable no-console */
import styled from "@emotion/styled";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Editable, { EditableInput, EditablePreview, EditableControls } from ".";
import { Box, Flex } from "../Layout";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";

const stories = storiesOf("Editable", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

const ControlButtons = ({ isEditing, onSubmit, onCancel, onRequestEdit }) => (
  <Flex>
    {!isEditing ? (
      <Button size="sm" onClick={onRequestEdit}>
        Edit
      </Button>
    ) : (
      <ButtonGroup size="sm">
        <Button color="green" onClick={onSubmit}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    )}
  </Flex>
);

stories.add("Default", () => (
  <Editable textAlign="center" defaultValue="testing" fontSize="2xl">
    <Flex>
      <EditablePreview flex="1" wordBreak="words" />
      <EditableInput flex="1" />
      <EditableControls children={props => <ControlButtons {...props} />} />
    </Flex>
  </Editable>
));
