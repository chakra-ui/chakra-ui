/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useRef, useState } from "react";
import AlertDialog, {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
} from ".";
import Button from "../Button";
import Heading from "../Heading";

const stories = storiesOf("AlertDialog", module);

const SampleDialog = () => {
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Delete something</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogHeader>
          <Heading size="md" as="h2">
            Please Confirm!
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to delete something? This action is permanent,
          and we're totally not just flipping a field called "deleted" to "true"
          in our database, we're actually deleting something.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Nevermind
          </Button>
          <Button variantColor="red" onClick={onClose} ml={3}>
            Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
};

stories.add("Default", () => <SampleDialog />);
