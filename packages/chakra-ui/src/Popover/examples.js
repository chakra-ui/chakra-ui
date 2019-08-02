import { storiesOf } from "@storybook/react";
import React, {Fragment} from "react";
import Popover, { PopoverBody, PopoverFooter, PopoverHeader } from ".";
import Button from "../Button";
import Box from "../Box";

const stories = storiesOf("Popover", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Fragment>
    <Popover
      trigger={<Button>Trigger</Button>}
      usePortal
      placement="bottom"
      showCloseButton
      // showArrow
    >
      {({ onClose }) => (
        <Fragment>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button color="blue" onClick={onClose}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </Fragment>
      )}
    </Popover>
    <Button color="green">Content Inside</Button>
  </Fragment>
));
