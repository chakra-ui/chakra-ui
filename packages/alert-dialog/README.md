# @chakra-ui/alert-dialog

AlertDialog component is used interrupt the user with a mandatory confirmation
or action.

## Installation

```sh
yarn add @chakra-ui/alert-dialog

# or

npm i @chakra-ui/alert-dialog
```

## Import components

```jsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/core"
```

## Basic usage

## Usage

AlertDialog requires that you provide the `leastDestructiveRef` prop.

Based on
[WAI-ARIA specifications](https://www.w3.org/TR/wai-aria-practices/#alertdialog),
focus should be placed on the least destructive element when the dialog opens,
to prevent users from accidentally confirming the destructive action.

```jsx
function AlertDialogExample() {
  const [isOpen, setIsOpen] = React.useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <>
      <Button variantColor="red" onClick={() => setIsOpen(true)}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variantColor="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
```
