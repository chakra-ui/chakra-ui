import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/alertdialog"
import { applyTransform } from "./test-utils"

describe("AlertDialog Transform", () => {
  describe("Basic transformation", () => {
    test("basic alertdialog", async () => {
      const input = `
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete Customer</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
            <Button colorScheme='red' onClick={onDelete}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Backdrop>
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>Delete Customer</Dialog.Header>
                      <Dialog.Body>
                        Are you sure? You can't undo this action afterwards.
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onDelete}>
                          Delete
                        </Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Dialog.Backdrop>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })

    test("alertdialog without overlay", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody, Button } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogContent>
        <AlertDialogBody>Are you sure?</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Are you sure?</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })
  })

  describe("AlertDialog-specific props", () => {
    test("leastDestructiveRef to initialFocusEl", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Content</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })

    test("role='alertdialog' is added", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('role="alertdialog"')
    })
  })

  describe("Prop transformations (inherited from Modal)", () => {
    test("isOpen to open and onClose to onOpenChange", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  const handleClose = () => console.log('closing')
  return (
    <AlertDialog isOpen={true} leastDestructiveRef={cancelRef} onClose={handleClose}>
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          const handleClose = () => console.log('closing')
          return (
            <Dialog.Root
              open={true}
              initialFocusEl={() => cancelRef.current}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  handleClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Content</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })

    test("isCentered to placement=center", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              placement="center"
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Content</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })

    test("closeOnEsc to closeOnEscape", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} closeOnEsc={false}>
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              closeOnEscape={false}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Content</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })
  })

  describe("Size remapping", () => {
    test("size 2xl to 6xl map to xl", async () => {
      const input = `
import { AlertDialog, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} size="3xl">
      <AlertDialogContent>
        <AlertDialogBody>Content</AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              size="xl"
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Content</Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })
  })

  describe("Import updates", () => {
    test("consolidates alertdialog imports to Dialog and Portal", async () => {
      const input = `
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'

export default function App() {
  const cancelRef = React.useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Title</AlertDialogHeader>
          <AlertDialogBody>Body</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const cancelRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => cancelRef.current}
              role="alertdialog"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Backdrop>
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>Title</Dialog.Header>
                      <Dialog.Body>Body</Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Dialog.Backdrop>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })
  })

  describe("Edge cases", () => {
    test("non-Chakra alertdialog unchanged", async () => {
      const input = `
import { AlertDialog } from 'some-other-library'

export default function App() {
  return <AlertDialog>Custom alertdialog</AlertDialog>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { AlertDialog } from 'some-other-library'

        export default function App() {
          return <AlertDialog>Custom alertdialog</AlertDialog>
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No alertdialog here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No alertdialog here</div>
        }
        "
      `)
    })
  })

  describe("Complete example", () => {
    test("full alertdialog with all features", async () => {
      const input = `
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>
            <AlertDialogCloseButton />

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
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, useDisclosure, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const { isOpen, onOpen, onClose } = useDisclosure()
          const cancelRef = React.useRef()

          return (
            <>
              <Button colorScheme="red" onClick={onOpen}>
                Delete Customer
              </Button>
              <Dialog.Root
                open={isOpen}
                initialFocusEl={() => cancelRef.current}
                placement="center"
                motionPreset="slideInBottom"
                role="alertdialog"
                onOpenChange={(e) => {
                  if (!e.open) {
                    onClose()
                  }
                }}
              >
                <Portal>
                  <Dialog.Backdrop>
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header fontSize="lg" fontWeight="bold">
                          Delete Customer
                        </Dialog.Header>
                        <Dialog.CloseTrigger />
                        <Dialog.Body>
                          Are you sure? You can't undo this action afterwards.
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button colorScheme="red" onClick={onClose} ml={3}>
                            Delete
                          </Button>
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Dialog.Backdrop>
                </Portal>
              </Dialog.Root>
            </>
          )
        }
        "
      `)
    })
  })
})
