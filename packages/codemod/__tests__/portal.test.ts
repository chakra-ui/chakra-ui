import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/portal"
import { applyTransform } from "./test-utils"

describe("portal transform", () => {
  describe("appendToParentPortal removal", () => {
    test("removes appendToParentPortal prop from Portal", async () => {
      const input = `
import { Portal } from '@chakra-ui/react'

export default function App() {
  return <Portal appendToParentPortal={false}>Content</Portal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return <Portal>Content</Portal>
        }
        "
      `)
    })

    test("removes appendToParentPortal prop without value", async () => {
      const input = `
import { Portal } from '@chakra-ui/react'

export default function App() {
          return <Portal appendToParentPortal>Content</Portal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return <Portal>Content</Portal>
        }
        "
      `)
    })

    test("preserves other Portal props", async () => {
      const input = `
import { Portal } from '@chakra-ui/react'

export default function App() {
  return (
    <Portal containerRef={ref} appendToParentPortal={true}>
      Content
    </Portal>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return <Portal containerRef={ref}>Content</Portal>
        }
        "
      `)
    })
  })

  describe("PortalManager removal", () => {
    test("removes PortalManager import", async () => {
      const input = `
import { Portal, PortalManager } from '@chakra-ui/react'

export default function App() {
  return <Portal>Content</Portal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return <Portal>Content</Portal>
        }
        "
      `)
    })

    test("removes PortalManager usage and replaces with first child", async () => {
      const input = `
import { PortalManager } from '@chakra-ui/react'

export default function App() {
  return (
    <PortalManager>
      <div>App Content</div>
    </PortalManager>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "
        import '@chakra-ui/react';

        export default function App() {
          return (

              
          );
        }
              "
      `)
    })

    test("removes PortalManager with multiple children", async () => {
      const input = `
import { PortalManager } from '@chakra-ui/react'

export default function App() {
          return (
    <PortalManager>
      <div>Child 1</div>
      <div>Child 2</div>
    </PortalManager>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "
        import '@chakra-ui/react';

        export default function App() {
                  return (

                      
                  );
        }
              "
      `)
    })

    test("replaces PortalManager with fragment if no children", async () => {
      const input = `
import { PortalManager } from '@chakra-ui/react'

export default function App() {
  return <PortalManager />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import '@chakra-ui/react'

        export default function App() {
          return <></>
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("removes both appendToParentPortal and PortalManager", async () => {
      const input = `
import { Portal, PortalManager } from '@chakra-ui/react'

export default function App() {
  return (
    <PortalManager>
      <Portal appendToParentPortal={false}>
        <div>Portal Content</div>
      </Portal>
    </PortalManager>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "
        import { Portal } from '@chakra-ui/react';

        export default function App() {
          return (

              
          );
        }
              "
      `)
    })

    test("handles multiple Portal components", async () => {
      const input = `
import { Portal } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Portal appendToParentPortal={true}>Content 1</Portal>
      <Portal appendToParentPortal={false}>Content 2</Portal>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Portal>Content 1</Portal>
              <Portal>Content 2</Portal>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Portal", async () => {
      const input = `
import { Portal } from './custom'

export default function App() {
  return <Portal appendToParentPortal={false}>Content</Portal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from './custom'

        export default function App() {
          return <Portal appendToParentPortal={false}>Content</Portal>
        }
        "
      `)
    })

    test("handles Portal with no props", async () => {
      const input = `
import { Portal } from '@chakra-ui/react'

export default function App() {
  return <Portal>Content</Portal>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Portal } from '@chakra-ui/react'

        export default function App() {
          return <Portal>Content</Portal>
        }
        "
      `)
    })
  })
})
