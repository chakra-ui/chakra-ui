# @chakra-ui/modal

A modal is a window overlaid on either the primary window or another dialog
window. Contents behind a modal dialog are **inert** meaning that users cannot
interact with content behind the dialog.

## Installation

```sh
yarn add @chakra-ui/modal

# or

npm i @chakra-ui/modal
```

## Import components

```jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"
```

## Usage

When the modal opens, focus is sent into the modal and set to the first tabbable
element. If there are no tabbled element, focus is set on the `ModalContent`.

```jsx
function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Lorem count={2} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
```

### Control Focus when Modal closes

When the dialog closes, it returns focus to the element that triggered. Set
`finalFocusRef` to element that should receive focus when the modal opens.

```jsx
function ReturnFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef()

  return (
    <>
      <Box ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        Some other content that'll receive focus on close.
      </Box>

      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem count={2} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
```

# Alert Dialog

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
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
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
              <Button colorScheme="red" onClick={onClose} ml={3}>
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
