import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/modal"
import { applyTransform } from "./test-utils"

describe("Modal Transform", () => {
  describe("Basic transformation", () => {
    test("basic modal", async () => {
      const input = `
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Body content</ModalBody>
        <ModalFooter>
          <Button>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>Modal Title</Dialog.Header>
                    <Dialog.CloseTrigger />
                    <Dialog.Body>Body content</Dialog.Body>
                    <Dialog.Footer>
                      <Button>Close</Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )
        }
        "
      `)
    })

    test("modal without overlay", async () => {
      const input = `
import { Modal, ModalContent, ModalBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody>Body content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>Body content</Dialog.Body>
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

  describe("Prop transformations", () => {
    test("isOpen to open", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={true}
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

    test("onClose to onOpenChange", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  const handleClose = () => console.log('closing')
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const handleClose = () => console.log('closing')
          return (
            <Dialog.Root
              open={isOpen}
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

    test("onClose with inline arrow function", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={() => console.log('closed')}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  console.log('closed')
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
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              placement="center"
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

    test("closeOnOverlayClick to closeOnInteractOutside", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              closeOnInteractOutside={false}
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
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              closeOnEscape={false}
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

    test("blockScrollOnMount to preventScroll", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              preventScroll={false}
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

    test("finalFocusRef to finalFocusEl with function", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  const finalRef = React.useRef()
  return (
    <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const finalRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              finalFocusEl={() => finalRef.current}
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

    test("initialFocusRef to initialFocusEl with function", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  const initialRef = React.useRef()
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          const initialRef = React.useRef()
          return (
            <Dialog.Root
              open={isOpen}
              initialFocusEl={() => initialRef.current}
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

    test("onCloseComplete to onExitComplete", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={handleComplete}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onExitComplete={handleComplete}
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

    test("onEsc to onEscapeKeyDown", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onEsc={handleEsc}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onEscapeKeyDown={handleEsc}
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

    test("onOverlayClick to onInteractOutside", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={handleOverlay}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onInteractOutside={handleOverlay}
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
    test("size xs to xl stay the same", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              size="md"
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

    test("size 2xl to 6xl map to xl", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent><ModalBody>2xl</ModalBody></ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent><ModalBody>3xl</ModalBody></ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalContent><ModalBody>6xl</ModalBody></ModalContent>
      </Modal>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Dialog.Root
                open={isOpen}
                size="xl"
                onOpenChange={(e) => {
                  if (!e.open) {
                    onClose()
                  }
                }}
              >
                <Portal>
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Body>2xl</Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
              <Dialog.Root
                open={isOpen}
                size="xl"
                onOpenChange={(e) => {
                  if (!e.open) {
                    onClose()
                  }
                }}
              >
                <Portal>
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Body>3xl</Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
              <Dialog.Root
                open={isOpen}
                size="xl"
                onOpenChange={(e) => {
                  if (!e.open) {
                    onClose()
                  }
                }}
              >
                <Portal>
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Body>6xl</Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </>
          )
        }
        "
      `)
    })

    test("size with expression preserved", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              size={modalSize}
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

  describe("Pass-through props", () => {
    test("motionPreset, scrollBehavior, trapFocus pass through", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      trapFocus={false}
    >
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              motionPreset="slideInBottom"
              scrollBehavior="inside"
              trapFocus={false}
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

  describe("Removed props", () => {
    test("removes deprecated props", async () => {
      const input = `
import { Modal, ModalContent, ModalBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      allowPinchZoom
      autoFocus
      lockFocusAcrossFrames
      preserveScrollBarGap
      returnFocusOnClose={false}
      useInert
      portalProps={{ containerRef: portalRef }}
    >
      <ModalContent>
        <ModalBody>Content</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
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
    test("consolidates modal imports to Dialog", async () => {
      const input = `
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Body</ModalBody>
      </ModalContent>
    </Modal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Dialog, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Dialog.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>Title</Dialog.Header>
                    <Dialog.Body>Body</Dialog.Body>
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

  describe("Edge cases", () => {
    test("non-Chakra modal unchanged", async () => {
      const input = `
import { Modal } from 'some-other-library'

export default function App() {
  return <Modal>Custom modal</Modal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Modal } from 'some-other-library'

        export default function App() {
          return <Modal>Custom modal</Modal>
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No modal here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No modal here</div>
        }
        "
      `)
    })
  })
})
