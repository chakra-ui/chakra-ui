import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/transitions"
import { applyTransform } from "./test-utils"

describe("Transitions Transform", () => {
  describe("Fade Component", () => {
    test("basic transformation", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return <Fade in={isOpen}>Content</Fade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with expression for in prop", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return <Fade in={visible && !loading}>Content</Fade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={visible && !loading}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with multiple children", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return (
    <Fade in={isOpen}>
      <div>First</div>
      <div>Second</div>
    </Fade>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              <div>First</div>
              <div>Second</div>
            </Presence>
          )
        }
        "
      `)
    })
  })

  describe("ScaleFade Component", () => {
    test("basic transformation", async () => {
      const input = `
import { ScaleFade } from '@chakra-ui/react'

export default function App() {
  return <ScaleFade in={isOpen}>Content</ScaleFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationStyle={{
                _open: 'scale-fade-in',
                _closed: 'scale-fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with initialScale prop removed", async () => {
      const input = `
import { ScaleFade } from '@chakra-ui/react'

export default function App() {
  return <ScaleFade in={isOpen} initialScale={0.9}>Content</ScaleFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationStyle={{
                _open: 'scale-fade-in',
                _closed: 'scale-fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with other props preserved", async () => {
      const input = `
import { ScaleFade } from '@chakra-ui/react'

export default function App() {
  return (
    <ScaleFade in={isOpen} initialScale={0.9} style={{ zIndex: 10 }}>
      Content
    </ScaleFade>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              style={{ zIndex: 10 }}
              animationStyle={{
                _open: 'scale-fade-in',
                _closed: 'scale-fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })
  })

  describe("Slide Component", () => {
    test("basic transformation with default direction", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide in={isOpen}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              position="fixed"
              bottom="0"
              insetX="0"
              animationName={{
                _open: 'slide-from-bottom-full',
                _closed: 'slide-to-bottom-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with direction='top'", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide direction='top' in={isOpen}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              position="fixed"
              top="0"
              insetX="0"
              animationName={{
                _open: 'slide-from-top-full',
                _closed: 'slide-to-top-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with direction='bottom'", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide direction='bottom' in={isOpen}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              position="fixed"
              bottom="0"
              insetX="0"
              animationName={{
                _open: 'slide-from-bottom-full',
                _closed: 'slide-to-bottom-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with direction='left'", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide direction='left' in={isOpen}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              position="fixed"
              left="0"
              insetY="0"
              animationName={{
                _open: 'slide-from-left-full',
                _closed: 'slide-to-left-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with direction='right'", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide direction='right' in={isOpen}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              position="fixed"
              right="0"
              insetY="0"
              animationName={{
                _open: 'slide-from-right-full',
                _closed: 'slide-to-right-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with style prop preserved", async () => {
      const input = `
import { Slide } from '@chakra-ui/react'

export default function App() {
  return <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>Content</Slide>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              style={{ zIndex: 10 }}
              position="fixed"
              bottom="0"
              insetX="0"
              animationName={{
                _open: 'slide-from-bottom-full',
                _closed: 'slide-to-bottom-full',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })
  })

  describe("SlideFade Component", () => {
    test("basic transformation", async () => {
      const input = `
import { SlideFade } from '@chakra-ui/react'

export default function App() {
  return <SlideFade in={isOpen}>Content</SlideFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'slide-from-bottom, fade-in',
                _closed: 'slide-to-bottom, fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with offsetY prop removed", async () => {
      const input = `
import { SlideFade } from '@chakra-ui/react'

export default function App() {
  return <SlideFade in={isOpen} offsetY='20px'>Content</SlideFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'slide-from-bottom, fade-in',
                _closed: 'slide-to-bottom, fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })

    test("with offsetX prop removed", async () => {
      const input = `
import { SlideFade } from '@chakra-ui/react'

export default function App() {
  return <SlideFade in={isOpen} offsetX='20px'>Content</SlideFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'slide-from-bottom, fade-in',
                _closed: 'slide-to-bottom, fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })
  })

  describe("Import Updates", () => {
    test("single transition component import", async () => {
      const input = `
import { Fade, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Fade in={isOpen}>Content</Fade>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Content
              </Presence>
            </Box>
          )
        }
        "
      `)
    })

    test("multiple transition components import", async () => {
      const input = `
import { Fade, ScaleFade, Slide, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Fade in={isOpen}>Fade Content</Fade>
      <ScaleFade in={isOpen}>ScaleFade Content</ScaleFade>
      <Slide in={isOpen}>Slide Content</Slide>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Fade Content
              </Presence>
              <Presence
                present={isOpen}
                animationStyle={{
                  _open: 'scale-fade-in',
                  _closed: 'scale-fade-out',
                }}
                animationDuration="moderate"
              >
                ScaleFade Content
              </Presence>
              <Presence
                present={isOpen}
                position="fixed"
                bottom="0"
                insetX="0"
                animationName={{
                  _open: 'slide-from-bottom-full',
                  _closed: 'slide-to-bottom-full',
                }}
                animationDuration="moderate"
              >
                Slide Content
              </Presence>
            </Box>
          )
        }
        "
      `)
    })

    test("Presence already imported", async () => {
      const input = `
import { Fade, Presence, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Fade in={isOpen}>Content</Fade>
      <Presence present={otherOpen}>Other Content</Presence>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Content
              </Presence>
              <Presence present={otherOpen}>Other Content</Presence>
            </Box>
          )
        }
        "
      `)
    })

    test("mixed with other Chakra imports", async () => {
      const input = `
import { Fade, Button, Stack, useDisclosure } from '@chakra-ui/react'

export default function App() {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack>
      <Button onClick={onToggle}>Toggle</Button>
      <Fade in={open}>Content</Fade>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Stack, useDisclosure, Presence } from '@chakra-ui/react'

        export default function App() {
          const { open, onToggle } = useDisclosure()
          return (
            <Stack>
              <Button onClick={onToggle}>Toggle</Button>
              <Presence
                present={open}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Content
              </Presence>
            </Stack>
          )
        }
        "
      `)
    })

    test("all four transition components together", async () => {
      const input = `
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Fade in={isOpen}>Fade</Fade>
      <ScaleFade in={isOpen}>ScaleFade</ScaleFade>
      <Slide in={isOpen}>Slide</Slide>
      <SlideFade in={isOpen}>SlideFade</SlideFade>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Fade
              </Presence>
              <Presence
                present={isOpen}
                animationStyle={{
                  _open: 'scale-fade-in',
                  _closed: 'scale-fade-out',
                }}
                animationDuration="moderate"
              >
                ScaleFade
              </Presence>
              <Presence
                present={isOpen}
                position="fixed"
                bottom="0"
                insetX="0"
                animationName={{
                  _open: 'slide-from-bottom-full',
                  _closed: 'slide-to-bottom-full',
                }}
                animationDuration="moderate"
              >
                Slide
              </Presence>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'slide-from-bottom, fade-in',
                  _closed: 'slide-to-bottom, fade-out',
                }}
                animationDuration="moderate"
              >
                SlideFade
              </Presence>
            </>
          )
        }
        "
      `)
    })
  })

  describe("Children Preservation", () => {
    test("text children", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return <Fade in={isOpen}>Simple text content</Fade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              Simple text content
            </Presence>
          )
        }
        "
      `)
    })

    test("element children", async () => {
      const input = `
import { Fade, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Fade in={isOpen}>
      <Box p="4">Element content</Box>
    </Fade>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              <Box p="4">Element content</Box>
            </Presence>
          )
        }
        "
      `)
    })

    test("nested children", async () => {
      const input = `
import { Fade, Stack, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Fade in={isOpen}>
      <Stack>
        <Button>Click Me</Button>
        <div>Nested content</div>
      </Stack>
    </Fade>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, Button, Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              <Stack>
                <Button>Click Me</Button>
                <div>Nested content</div>
              </Stack>
            </Presence>
          )
        }
        "
      `)
    })
  })

  describe("Edge Cases", () => {
    test("non-Chakra components unchanged", async () => {
      const input = `
import { CustomFade } from './custom'

export default function App() {
  return <CustomFade in={isOpen}>Content</CustomFade>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { CustomFade } from './custom'

        export default function App() {
          return <CustomFade in={isOpen}>Content</CustomFade>
        }
        "
      `)
    })

    test("empty transition component", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return <Fade in={isOpen} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            ></Presence>
          )
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No Chakra here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No Chakra here</div>
        }
        "
      `)
    })
  })

  describe("Complex Scenarios", () => {
    test("multiple instances of same component", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Fade in={isOpen}>First</Fade>
      <Fade in={isSecondOpen}>Second</Fade>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Presence
                present={isOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                First
              </Presence>
              <Presence
                present={isSecondOpen}
                animationName={{
                  _open: 'fade-in',
                  _closed: 'fade-out',
                }}
                animationDuration="moderate"
              >
                Second
              </Presence>
            </>
          )
        }
        "
      `)
    })

    test("with additional props preserved", async () => {
      const input = `
import { Fade } from '@chakra-ui/react'

export default function App() {
  return (
    <Fade in={isOpen} unmountOnExit delay={0.2}>
      Content
    </Fade>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Presence } from '@chakra-ui/react'

        export default function App() {
          return (
            <Presence
              present={isOpen}
              unmountOnExit
              delay={0.2}
              animationName={{
                _open: 'fade-in',
                _closed: 'fade-out',
              }}
              animationDuration="moderate"
            >
              Content
            </Presence>
          )
        }
        "
      `)
    })
  })
})
