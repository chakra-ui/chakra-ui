import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/popover"
import { applyTransform } from "./test-utils"

describe("Popover Transform", () => {
  describe("Basic transformation", () => {
    test("basic popover", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.CloseTrigger />
                  <Popover.Title>Confirmation!</Popover.Title>
                  <Popover.Body>
                    Are you sure you want to have that milkshake?
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("popover with anchor", async () => {
      const input = `
import { Popover, PopoverAnchor, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      <PopoverAnchor>
        <div>Anchor element</div>
      </PopoverAnchor>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>Content</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Anchor>
                <div>Anchor element</div>
              </Popover.Anchor>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Body>Content</Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("popover with footer", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>Body content</PopoverBody>
        <PopoverFooter>This is the footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Title>Header</Popover.Title>
                  <Popover.CloseTrigger />
                  <Popover.Body>Body content</Popover.Body>
                  <Popover.Footer>This is the footer</Popover.Footer>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })

  describe("Prop transformations", () => {
    test("pass-through props (autoFocus, direction, id)", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover autoFocus={false} direction='rtl' id='my-popover'>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root autoFocus={false} direction="rtl" id="my-popover">
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("initialFocusRef to initialFocusEl with function", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  const firstFieldRef = React.useRef()
  return (
    <Popover initialFocusRef={firstFieldRef}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          const firstFieldRef = React.useRef()
          return (
            <Popover.Root initialFocusEl={() => firstFieldRef.current}>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("closeOnBlur to closeOnInteractOutside", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover closeOnBlur={false}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root closeOnInteractOutside={false}>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("isOpen to open", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          const [isOpen, setIsOpen] = React.useState(false)
          return (
            <Popover.Root open={isOpen}>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("isLazy to lazyMount", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root lazyMount>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("onOpen and onClose to onOpenChange", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  const handleOpen = () => console.log('opened')
  const handleClose = () => console.log('closed')
  return (
    <Popover onOpen={handleOpen} onClose={handleClose}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          const handleOpen = () => console.log('opened')
          const handleClose = () => console.log('closed')
          return (
            <Popover.Root
              onOpenChange={(e) => {
                if (e.open) {
                  handleOpen()
                } else {
                  handleClose()
                }
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("onOpen and onClose with inline functions", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover
      onOpen={() => console.log('opened')}
      onClose={() => console.log('closed')}
    >
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              onOpenChange={(e) => {
                if (e.open) {
                  console.log('opened')
                } else {
                  console.log('closed')
                }
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })

  describe("Positioning props", () => {
    test("arrowSize transferred from root to Arrow", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover arrowSize={20}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>Content</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow
                    css={{
                      '--arrow-size': 20,
                    }}
                  />
                  <Popover.Body>Content</Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("arrowSize merged with existing css prop on Arrow", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover arrowSize="2rem">
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow css={{ color: 'red' }} />
        <PopoverBody>Content</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow
                    css={{
                      color: 'red',
                      '--arrow-size': '2rem',
                    }}
                  />
                  <Popover.Body>Content</Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("placement as positioning prop", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover placement='top-start'>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              positioning={{
                placement: 'top-start',
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("multiple positioning props", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover placement='bottom' gutter={8} flip={false}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              positioning={{
                placement: 'bottom',
                gutter: 8,
                flip: false,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("matchWidth to sameWidth", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover matchWidth>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              positioning={{
                sameWidth: true,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("boundary prop", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  const boundaryRef = React.useRef()
  return (
    <Popover boundary={boundaryRef.current}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          const boundaryRef = React.useRef()
          return (
            <Popover.Root
              positioning={{
                boundary: () => boundaryRef.current,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("eventListeners prop", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover eventListeners={{ scroll: true, resize: true }}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              positioning={{
                listeners: {
                  ancestorScroll: true,
                  ancestorResize: true,
                },
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("preventOverflow to positioning", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover preventOverflow={false}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root
              positioning={{
                preventOverflow: false,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("positioning props with expressions", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  const shouldMatch = true
  const gutterValue = 16
  return (
    <Popover
      matchWidth={shouldMatch}
      placement={shouldMatch ? 'top' : 'bottom'}
      gutter={gutterValue}
      flip={!shouldMatch}
    >
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          const shouldMatch = true
          const gutterValue = 16
          return (
            <Popover.Root
              positioning={{
                sameWidth: shouldMatch,
                placement: shouldMatch ? 'top' : 'bottom',
                gutter: gutterValue,
                flip: !shouldMatch,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })

  describe("Import updates", () => {
    test("all popover imports consolidated", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Header</PopoverHeader>
        <PopoverBody>Body</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Title>Header</Popover.Title>
                  <Popover.Body>Body</Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })

  describe("HoverCard transformation", () => {
    test("trigger='hover' transforms to HoverCard", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover trigger='hover' openDelay={500} closeDelay={300}>
      <PopoverTrigger>
        <Button>Hover me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>This appears on hover</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, HoverCard, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <HoverCard.Root openDelay={500} closeDelay={300}>
              <HoverCard.Trigger asChild>
                <Button>Hover me</Button>
              </HoverCard.Trigger>
              <HoverCard.Positioner>
                <HoverCard.Content>
                  <HoverCard.Arrow />
                  <HoverCard.Body>This appears on hover</HoverCard.Body>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </HoverCard.Root>
          )
        }
        "
      `)
    })
  })

  describe("Removed props", () => {
    test("removes modifiers for Popover", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover
      modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
    >
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>Trigger</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>Content</Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })

  describe("Edge cases", () => {
    test("non-Chakra popover unchanged", async () => {
      const input = `
import { Popover } from 'some-other-library'

export default function App() {
  return <Popover>Custom popover</Popover>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover } from 'some-other-library'

        export default function App() {
          return <Popover>Custom popover</Popover>
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No popover here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No popover here</div>
        }
        "
      `)
    })
  })

  describe("Render prop pattern", () => {
    test("popover with render prop", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button, Box } from '@chakra-ui/react'

function InternalStateEx() {
  const initRef = React.useRef()
  return (
    <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Click to {isOpen ? 'close' : 'open'}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>This is the header</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                Hello. Nice to meet you! This is the body of the popover
              </Box>
              <Button
                mt={4}
                colorScheme='blue'
                onClick={onClose}
                ref={initRef}
              >
                Close
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button, Box } from '@chakra-ui/react'

        function InternalStateEx() {
          const initRef = React.useRef()
          return (
            <Popover.Root
              closeOnInteractOutside={false}
              initialFocusEl={() => initRef.current}
              positioning={{
                placement: 'left',
              }}
            >
              <Popover.Context>
                {({ open: isOpen, setOpen: setOpen }) => {
                  const onClose = () => setOpen(false)

                  return (
                    <>
                      <Popover.Trigger asChild>
                        <Button>Click to {isOpen ? 'close' : 'open'}</Button>
                      </Popover.Trigger>
                      <Popover.Positioner>
                        <Popover.Content>
                          <Popover.Title>This is the header</Popover.Title>
                          <Popover.CloseTrigger />
                          <Popover.Body>
                            <Box>
                              Hello. Nice to meet you! This is the body of the popover
                            </Box>
                            <Button
                              mt={4}
                              colorScheme="blue"
                              onClick={onClose}
                              ref={initRef}
                            >
                              Close
                            </Button>
                          </Popover.Body>
                        </Popover.Content>
                      </Popover.Positioner>
                    </>
                  )
                }}
              </Popover.Context>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("render prop with arrow function", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button>Status: {isOpen ? 'Open' : 'Closed'}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>Content here</PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Context>
                {({ open: isOpen }) => (
                  <>
                    <Popover.Trigger asChild>
                      <Button>Status: {isOpen ? 'Open' : 'Closed'}</Button>
                    </Popover.Trigger>
                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.Body>Content here</Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </>
                )}
              </Popover.Context>
            </Popover.Root>
          )
        }
        "
      `)
    })

    test("render prop with all three props", async () => {
      const input = `
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Popover>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <PopoverTrigger>
            <Button onClick={isOpen ? onClose : onOpen}>
              {isOpen ? 'Close' : 'Open'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Button onClick={onClose}>Close</Button>
              <Button onClick={onOpen}>Open</Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Popover, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Popover.Root>
              <Popover.Context>
                {({ open: isOpen, setOpen: setOpen }) => {
                  const onClose = () => setOpen(false)
                  const onOpen = () => setOpen(true)

                  return (
                    <>
                      <Popover.Trigger asChild>
                        <Button onClick={isOpen ? onClose : onOpen}>
                          {isOpen ? 'Close' : 'Open'}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Positioner>
                        <Popover.Content>
                          <Popover.Body>
                            <Button onClick={onClose}>Close</Button>
                            <Button onClick={onOpen}>Open</Button>
                          </Popover.Body>
                        </Popover.Content>
                      </Popover.Positioner>
                    </>
                  )
                }}
              </Popover.Context>
            </Popover.Root>
          )
        }
        "
      `)
    })
  })
})
