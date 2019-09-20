/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useRef, useState, Fragment } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from ".";
import Button from "../Button";

const stories = storiesOf("AlertDialog", module);

const SampleDialog = () => {
  const [isOpen, setIsOpen] = useState();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <Fragment>
      <Button onClick={onOpen}>Delete something</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay bg="whiteAlpha.700" />
        <AlertDialogContent>
          <AlertDialogHeader>Please Confirm!</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete something? This action is permanent,
            and we're totally not just flipping a field called "deleted" to
            "true" in our database, we're actually deleting something.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Nevermind
            </Button>
            <Button variantColor="red" ml={3}>
              Yes, delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

stories.add("Default", () => <SampleDialog />);
