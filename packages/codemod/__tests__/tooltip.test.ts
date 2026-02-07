import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/tooltip"
import { applyTransform } from "./test-utils"

describe("tooltip transform", () => {
  describe("import transformation", () => {
    test("updates import from @chakra-ui/react to @/components/ui/tooltip", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Tooltip">Hover me</Tooltip>
        }
        "
      `)
    })

    test("preserves other Chakra imports", async () => {
      const input = `
import { Box, Button, Tooltip } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Button>Click</Button>
      <Tooltip label="Info">Hover</Tooltip>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Button } from '@chakra-ui/react'

        import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Box>
              <Button>Click</Button>
              <Tooltip content="Info">Hover</Tooltip>
            </Box>
          )
        }
        "
      `)
    })

    test("removes empty Chakra import if Tooltip was the only import", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Tooltip">Hover me</Tooltip>
        }
        "
      `)
    })
  })

  describe("prop renames", () => {
    test("transforms closeOnEsc to closeOnEscape", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip closeOnEsc={false} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip closeOnEscape={false} content="Tooltip">
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("transforms closeOnMouseDown to closeOnPointerDown", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip closeOnMouseDown label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip closeOnPointerDown content="Tooltip">
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("transforms both closeOnEsc and closeOnMouseDown together", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip closeOnEsc={false} closeOnMouseDown label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip closeOnEscape={false} closeOnPointerDown content="Tooltip">
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })
  })

  describe("positioning props grouping", () => {
    test("groups placement prop into positioning object", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip placement="top-start" label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                placement: 'top-start',
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("groups gutter prop into positioning object", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip gutter={8} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                gutter: 8,
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("groups offset prop into positioning object", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip offset={[0, 10]} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                offset: {
                  mainAxis: 0,
                  crossAxis: 10,
                },
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("groups arrow prop into positioning object", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip arrow={{ size: 10 }} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                arrow: { size: 10 },
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("groups multiple positioning props together", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip placement="bottom" gutter={12} offset={[0, 5]} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                placement: 'bottom',
                gutter: 12,

                offset: {
                  mainAxis: 0,
                  crossAxis: 5,
                },
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("groups all positioning props including arrow", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip placement="right" gutter={8} offset={[0, 10]} arrow={{ size: 8 }} label="Tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              positioning={{
                placement: 'right',
                gutter: 8,

                offset: {
                  mainAxis: 0,
                  crossAxis: 10,
                },

                arrow: { size: 8 },
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("applies both prop renames and positioning grouping", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip closeOnEsc={false} placement="top" gutter={8} label="Info">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              closeOnEscape={false}
              content="Info"
              positioning={{
                placement: 'top',
                gutter: 8,
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("transforms complex tooltip with all props", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return (
    <Tooltip
      label="Click to edit"
      closeOnEsc={false}
      closeOnMouseDown
      placement="bottom-end"
      gutter={16}
      offset={[10, 5]}
      hasArrow
      openDelay={500}
    >
      <button>Edit</button>
    </Tooltip>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Click to edit"
              closeOnEscape={false}
              closeOnPointerDown
              showArrow
              openDelay={500}
              positioning={{
                placement: 'bottom-end',
                gutter: 16,

                offset: {
                  mainAxis: 10,
                  crossAxis: 5,
                },
              }}
            >
              <button>Edit</button>
            </Tooltip>
          )
        }
        "
      `)
    })
  })

  describe("other props preservation", () => {
    test("preserves other props unchanged", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return (
    <Tooltip
      label="Tooltip text"
      hasArrow
      bg="gray.800"
      color="white"
      openDelay={500}
      closeDelay={100}
      defaultOpen
    >
      Hover me
    </Tooltip>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip text"
              showArrow
              bg="gray.800"
              color="white"
              openDelay={500}
              closeDelay={100}
              defaultOpen
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("preserves event handlers", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return (
    <Tooltip
      label="Tooltip"
      onOpen={() => console.log('opened')}
      onClose={() => console.log('closed')}
      placement="top"
    >
      Hover me
    </Tooltip>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              content="Tooltip"
              onOpenChange={(e) => {
                if (e.open) {
                  console.log('opened')
                } else {
                  console.log('closed')
                }
              }}
              positioning={{
                placement: 'top',
              }}
            >
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })
  })

  describe("deprecated props removal", () => {
    test("removes modifiers prop", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip content="Info" modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}>Hover</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Info">Hover</Tooltip>
        }
        "
      `)
    })

    test("removes motionProps prop", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip content="Info" motionProps={{ initial: { opacity: 0 } }}>Hover</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Info">Hover</Tooltip>
        }
        "
      `)
    })

    test("removes portalProps prop", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip content="Info" portalProps={{ appendToParentPortal: true }}>Hover</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Info">Hover</Tooltip>
        }
        "
      `)
    })
  })

  describe("shouldWrapChildren", () => {
    test("wraps children in span when shouldWrapChildren is true", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip content="Info" shouldWrapChildren>Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip content="Info">
              <span>Hover me</span>
            </Tooltip>
          )
        }
        "
      `)
    })

    test("wraps JSX children in span when shouldWrapChildren is true", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip content="Info" shouldWrapChildren><button>Click</button></Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip content="Info">
              <span>
                <button>Click</button>
              </span>
            </Tooltip>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Tooltip", async () => {
      const input = `
import { Tooltip } from './custom-tooltip'

export default function App() {
  return <Tooltip closeOnEsc placement="top">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from './custom-tooltip'

        export default function App() {
          return (
            <Tooltip closeOnEsc placement="top">
              Hover me
            </Tooltip>
          )
        }
        "
      `)
    })

    test("handles self-closing Tooltip", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip closeOnEsc={false} placement="top" label="Info" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <Tooltip
              closeOnEscape={false}
              content="Info"
              positioning={{
                placement: 'top',
              }}
            />
          )
        }
        "
      `)
    })

    test("handles Tooltip with no props to transform", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return <Tooltip label="Simple tooltip">Hover me</Tooltip>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return <Tooltip content="Simple tooltip">Hover me</Tooltip>
        }
        "
      `)
    })

    test("handles multiple Tooltip components", async () => {
      const input = `
import { Tooltip } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Tooltip closeOnEsc placement="top" label="First">
        <button>First</button>
      </Tooltip>
      <Tooltip closeOnMouseDown gutter={8} label="Second">
        <button>Second</button>
      </Tooltip>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tooltip } from '@/components/ui/tooltip'

        export default function App() {
          return (
            <>
              <Tooltip
                closeOnEscape
                content="First"
                positioning={{
                  placement: 'top',
                }}
              >
                <button>First</button>
              </Tooltip>
              <Tooltip
                closeOnPointerDown
                content="Second"
                positioning={{
                  gutter: 8,
                }}
              >
                <button>Second</button>
              </Tooltip>
            </>
          )
        }
        "
      `)
    })
  })
})
