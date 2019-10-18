import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import Editable, { EditableInput, EditablePreview } from "../Editable";
import Box from "../Box";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Flex from "../Flex";

const stories = storiesOf("Editable", module);
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
    {props => (
      <Fragment>
        <Flex>
          <EditablePreview flex="1" wordBreak="words" />
          <EditableInput flex="1" />
        </Flex>
        <ControlButtons {...props} />
      </Fragment>
    )}
  </Editable>
));
