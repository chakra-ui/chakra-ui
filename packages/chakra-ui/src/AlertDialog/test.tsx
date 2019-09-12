import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
  prettyDOM,
} from "../utils/testing";
import AlertDialog from "./index";
import {
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "./components";

const MockDialog: React.FunctionComponent = () => {
  const [isOpen, setOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const onClose = jest.fn(() => setOpen(false));
  const onConfirm = jest.fn(onClose);

  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogHeader>Dialog Header</AlertDialogHeader>

        <AlertDialogBody>Dialog content</AlertDialogBody>

        <AlertDialogFooter>
          <button ref={cancelRef} onClick={onClose}>
            Cancel
          </button>
          <button onClick={onConfirm}>Confirm</button>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
};

it("should open and close", async () => {
  const { queryByText, getByText } = render(<MockDialog />);
  // Should start closed
  expect(queryByText("Dialog Header")).toBeNull();
  // Open the dialog
  fireEvent.click(getByText("open"));
  // Wait for it to appear
  await waitForElement(() => getByText("Dialog Header"));
  // Content should be there
  getByText("Dialog content");
  // Focus shoudld be on the cancel button
  expect(document.activeElement).toEqual(getByText("Cancel"));
  // Click on the cancel button
  fireEvent.click(getByText("Cancel"));
  // Wait for the dialog to disappear
  await waitForElementToBeRemoved(() => queryByText("Dialog Header"));
});

it("should match snapshot when open", async () => {
  const { getByText, getByTestId } = render(<MockDialog />);
  fireEvent.click(getByText("open"));
  await waitForElement(() => getByText("Dialog Header"));
  const dialog = getByTestId("alert-dialog-overlay");
  expect(dialog).toMatchSnapshot();
});

it("should close when you press escape", async () => {
  const { findByText, getByText } = render(<MockDialog />);
  fireEvent.click(getByText("open"));
  await findByText("Dialog Header");
  fireEvent.keyDown(getByText("Dialog content"), {
    key: "Escape",
    code: 27,
  });
  await waitForElementToBeRemoved(() => getByText("Dialog Header"));
});

it("should close when you click on the overlay", async () => {
  const { getByTestId, findByText, getByText } = render(<MockDialog />);
  fireEvent.click(getByText("open"));
  await findByText("Dialog Header");
  const overlay = getByTestId("alert-dialog-overlay");
  fireEvent.click(overlay);
  await waitForElementToBeRemoved(() => getByText("Dialog Header"));
});

it("should not close when you click inside the alert dialog", async () => {
  const { getByText } = render(<MockDialog />);
  fireEvent.click(getByText("open"));
  await waitForElement(() => getByText("Dialog Header"));
  getByText("Dialog Header");
});

it("should have correct role and aria attributes", async () => {
  const { getByText, getByRole } = render(<MockDialog />);
  fireEvent.click(getByText("open"));
  await waitForElement(() => getByText("Dialog Header"));
  const dialog = getByRole("alertdialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
});
