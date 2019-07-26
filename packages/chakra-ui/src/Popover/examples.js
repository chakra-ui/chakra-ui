import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import { Box } from "../Layout";
import Popover, { PopoverBody, PopoverFooter, PopoverHeader } from "../Popover";

const stories = storiesOf("Popover", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <>
    <Popover
      trigger={<Button>Trigger</Button>}
      usePortal
      placement="bottom"
      // showArrow
      // showCloseButton
    >
      {({ onClose }) => (
        <>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button color="blue" onClick={onClose}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </>
      )}
    </Popover>
    <Button color="green">Content Inside</Button>
  </>
));
