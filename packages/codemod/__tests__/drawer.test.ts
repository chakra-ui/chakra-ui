import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/drawer"
import { applyTransform } from "./test-utils"

describe("Drawer Transform", () => {
  describe("Basic transformation", () => {
    test("basic drawer", async () => {
      const input = `
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Title</DrawerHeader>
        <DrawerBody>Body</DrawerBody>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>Title</Drawer.Header>
                    <Drawer.Body>Body</Drawer.Body>
                    <Drawer.Footer>
                      <Button>Close</Button>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("drawer without overlay", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("Placement transformations", () => {
    test("placement left to start", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="start"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("placement right to end", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="end"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("placement top unchanged", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="top">
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="top"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("placement bottom unchanged", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="bottom"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("isFullHeight transformation", () => {
    test("isFullHeight adds height='100%' to Content", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} isFullHeight>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content height=\"100%\">
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("without isFullHeight, no height prop added", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("Prop transformations (inherited from dialog-utils)", () => {
    test("isOpen to open and onClose to onOpenChange", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  const handleClose = () => console.log('closing')
  return (
    <Drawer isOpen={true} onClose={handleClose}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          const handleClose = () => console.log('closing')
          return (
            <Drawer.Root
              open={true}
              onOpenChange={(e) => {
                if (!e.open) {
                  handleClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("closeOnEsc to closeOnEscape", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} closeOnEsc={false}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              closeOnEscape={false}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("closeOnOverlayClick to closeOnInteractOutside", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              closeOnInteractOutside={false}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("blockScrollOnMount to preventScroll", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} blockScrollOnMount={true}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              preventScroll={true}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("finalFocusRef to finalFocusEl", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  const buttonRef = React.useRef()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={buttonRef}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          const buttonRef = React.useRef()
          return (
            <Drawer.Root
              open={isOpen}
              finalFocusEl={() => buttonRef.current}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("initialFocusRef to initialFocusEl", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  const inputRef = React.useRef()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef}>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          const inputRef = React.useRef()
          return (
            <Drawer.Root
              open={isOpen}
              initialFocusEl={() => inputRef.current}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("size remapping", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="3xl">
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              size="xl"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("Combined transformations", () => {
    test("placement and isFullHeight together", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" isFullHeight>
      <DrawerContent>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="start"
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content height="100%">
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })

    test("all props together", async () => {
      const input = `
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      isFullHeight
      size="lg"
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Title</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>Body content</DrawerBody>
        <DrawerFooter>
          <Button>Action</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              placement="end"
              size="lg"
              closeOnEscape={false}
              closeOnInteractOutside={false}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content height="100%">
                    <Drawer.Header>Title</Drawer.Header>
                    <Drawer.CloseTrigger />
                    <Drawer.Body>Body content</Drawer.Body>
                    <Drawer.Footer>
                      <Button>Action</Button>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("Import updates", () => {
    test("consolidates drawer imports to Drawer and Portal", async () => {
      const input = `
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Title</DrawerHeader>
        <DrawerBody>Body</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>Title</Drawer.Header>
                    <Drawer.Body>Body</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
      // Verify imports are consolidated
      expect(output).toContain("Drawer")
      expect(output).toContain("Portal")
    })

    test("adds Portal if not present", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerBody>Body</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain("Portal")
    })
  })

  describe("Edge cases", () => {
    test("non-Chakra drawer unchanged", async () => {
      const input = `
import { Drawer } from 'some-other-library'

export default function App() {
  return <Drawer>Custom drawer</Drawer>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer } from 'some-other-library'

        export default function App() {
          return <Drawer>Custom drawer</Drawer>
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No drawer here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No drawer here</div>
        }
        "
      `)
    })

    test("drawer with existing content props", async () => {
      const input = `
import { Drawer, DrawerContent, DrawerBody } from '@chakra-ui/react'

export default function App() {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent bg="gray.100" p={4}>
        <DrawerBody>Content</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Drawer.Root
              open={isOpen}
              onOpenChange={(e) => {
                if (!e.open) {
                  onClose()
                }
              }}
            >
              <Portal>
                <Drawer.Positioner>
                  <Drawer.Content bg=\"gray.100\" p={4}>
                    <Drawer.Body>Content</Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )
        }
        "
      `)
    })
  })

  describe("Complete example", () => {
    test("full drawer with all features", async () => {
      const input = `
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        isFullHeight
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Drawer, Button, useDisclosure, Portal } from '@chakra-ui/react'

        export default function App() {
          const { isOpen, onOpen, onClose } = useDisclosure()
          const btnRef = React.useRef()

          return (
            <>
              <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Open
              </Button>
              <Drawer.Root
                open={isOpen}
                placement="end"
                finalFocusEl={() => btnRef.current}
                size="md"
                onOpenChange={(e) => {
                  if (!e.open) {
                    onClose()
                  }
                }}
              >
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content height="100%">
                      <Drawer.CloseTrigger />
                      <Drawer.Header>Create your account</Drawer.Header>
                      <Drawer.Body>
                        <input placeholder="Type here..." />
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Button variant="outline" mr={3} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                      </Drawer.Footer>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </>
          )
        }
        "
      `)
    })
  })
})
