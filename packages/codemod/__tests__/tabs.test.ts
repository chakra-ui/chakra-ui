import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/tabs"
import { applyTransform } from "./test-utils"

describe("Tabs Transform", () => {
  describe("component transformations", () => {
    test("transforms basic Tabs structure", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms Tabs with variant", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='enclosed'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root variant="enclosed">
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("transforms index to value", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs index={1}>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root value={1}>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms defaultIndex to defaultValue", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root defaultValue={0}>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms onChange to onValueChange", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  const handleChange = (index) => console.log(index)

  return (
    <Tabs onChange={handleChange}>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          const handleChange = (index) => console.log(index)

          return (
            <Tabs.Root onValueChange={({ value: value }) => handleChange(value)}>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms isManual to activationMode", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs isManual>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root activationMode="manual">
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms isLazy to lazyMount", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root lazyMount>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms lazyBehavior unmount to unmountOnExit", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs isLazy lazyBehavior="unmount">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root lazyMount unmountOnExit>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms isFitted to fitted", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root fitted>
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })

    test("transforms align to justifyContent", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs align='end' variant='enclosed'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tabs.Root justifyContent="flex-end" variant="enclosed">
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })
  })

  describe("variant transformations", () => {
    test("transforms variant line (unchanged)", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='line'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('variant="line"')
    })

    test("transforms variant enclosed-colored to enclosed", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='enclosed-colored'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('variant="enclosed"')
    })

    test("transforms variant soft-rounded to subtle", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='soft-rounded'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('variant="subtle"')
    })

    test("transforms variant solid-rounded to outline", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='solid-rounded'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('variant="outline"')
    })

    test("transforms variant unstyled to unstyled prop", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs variant='unstyled'>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain("unstyled")
      expect(output).not.toContain("variant=")
    })
  })

  describe("combined transformations", () => {
    test("transforms multiple props together", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  const handleChange = (index) => console.log(index)

  return (
    <Tabs
      defaultIndex={0}
      onChange={handleChange}
      variant='enclosed'
      size='lg'
      isFitted
      isLazy
    >
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

        export default function App() {
          const handleChange = (index) => console.log(index)

          return (
            <Tabs.Root
              defaultValue={0}
              onValueChange={({ value: value }) => handleChange(value)}
              variant="enclosed"
              size="lg"
              fitted
              lazyMount
            >
              <Tabs.List>
                <Tab>One</Tab>
                <Tab>Two</Tab>
              </Tabs.List>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("preserves other props", async () => {
      const input = `
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs colorScheme="blue" size="md" orientation="vertical">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><p>one!</p></TabPanel>
        <TabPanel><p>two!</p></TabPanel>
      </TabPanels>
    </Tabs>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toContain('colorScheme="blue"')
      expect(output).toContain('size="md"')
      expect(output).toContain('orientation="vertical"')
    })

    test("handles Tabs without TabList or TabPanels", async () => {
      const input = `
import { Tabs } from '@chakra-ui/react'

export default function App() {
  return <Tabs defaultIndex={0}>Custom content</Tabs>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs } from '@chakra-ui/react'

        export default function App() {
          return <Tabs.Root defaultValue={0}>Custom content</Tabs.Root>
        }
        "
      `)
    })

    test("no transformation for non-Chakra Tabs", async () => {
      const input = `
import { Tabs } from 'some-other-library'

export default function App() {
  return <Tabs>Content</Tabs>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tabs } from 'some-other-library'

        export default function App() {
          return <Tabs>Content</Tabs>
        }
        "
      `)
    })
  })
})
