import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/button"
import { applyTransform } from "./test-utils"

describe("button codemod", () => {
  describe("prop transformations", () => {
    it("should transform isActive to data-active", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button isActive>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button data-active>Click me</Button>
        }
        "
      `)
    })

    it("should transform isDisabled to disabled", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button isDisabled>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button disabled>Click me</Button>
        }
        "
      `)
    })

    it("should transform isLoading to loading", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button isLoading>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button loading>Click me</Button>
        }
        "
      `)
    })

    it("should transform colorScheme to colorPalette", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button colorScheme='blue'>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button colorPalette=\"blue\">Click me</Button>
        }
        "
      `)
    })

    it("should transform variant unstyled to unstyled prop", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button variant='unstyled'>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button unstyled>Click me</Button>
        }
        "
      `)
    })

    it("should preserve other variant values", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button variant='solid'>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button variant=\"solid\">Click me</Button>
        }
        "
      `)
    })

    it("should transform variant link to plain", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button variant='link'>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button variant=\"plain\">Click me</Button>
        }
        "
      `)
    })

    it("should transform iconSpacing to gap", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button iconSpacing={4}>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button gap={4}>Click me</Button>
        }
        "
      `)
    })

    it("should remove iconSpacing if gap already exists", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button gap={2} iconSpacing={4}>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button gap={2}>Click me</Button>
        }
        "
      `)
    })

    it("should handle multiple prop transformations", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return (
    <Button
      colorScheme='blue'
      isActive
      isDisabled
      isLoading
    >
      Click me
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return (
            <Button colorPalette=\"blue\" data-active disabled loading>
              Click me
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("icon transformations", () => {
    it("should move leftIcon to children", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Icon } from 'lucide-react'

function App() {
  return <Button leftIcon={<Icon />}>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Icon } from 'lucide-react'

        function App() {
          return (
            <Button>
              <Icon />
              Click me
            </Button>
          )
        }
        "
      `)
    })

    it("should move rightIcon to children", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Icon } from 'lucide-react'

function App() {
  return <Button rightIcon={<Icon />}>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Icon } from 'lucide-react'

        function App() {
          return (
            <Button>
              Click me
              <Icon />
            </Button>
          )
        }
        "
      `)
    })

    it("should move both leftIcon and rightIcon to children", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  return (
    <Button leftIcon={<ChevronLeft />} rightIcon={<ChevronRight />}>
      Click me
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { ChevronLeft, ChevronRight } from 'lucide-react'

        function App() {
          return (
            <Button>
              <ChevronLeft />
              Click me
              <ChevronRight />
            </Button>
          )
        }
        "
      `)
    })

    it("should transform leftIcon with iconSpacing to gap", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Icon } from 'lucide-react'

function App() {
  return (
    <Button leftIcon={<Icon />} iconSpacing={4}>
      Click me
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Icon } from 'lucide-react'

        function App() {
          return (
            <Button gap={4}>
              <Icon />
              Click me
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform button with all features", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Download } from 'lucide-react'

function App() {
  return (
    <Button
      colorScheme='blue'
      variant='solid'
      size='lg'
      isLoading
      leftIcon={<Download />}
      iconSpacing={2}
    >
      Download
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Download } from 'lucide-react'

        function App() {
          return (
            <Button colorPalette=\"blue\" variant=\"solid\" size=\"lg\" loading gap={2}>
              <Download />
              Download
            </Button>
          )
        }
        "
      `)
    })

    it("should handle dynamic prop values", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App({ isLoading, color }) {
  return (
    <Button colorScheme={color} isLoading={isLoading}>
      Click me
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App({ isLoading, color }) {
          return (
            <Button colorPalette={color} loading={isLoading}>
              Click me
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra Button", async () => {
      const input = `
function App() {
  return <Button isActive>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return <Button isActive>Click me</Button>
        }
        "
      `)
    })

    it("should handle Button with no props", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button>Click me</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button>Click me</Button>
        }
        "
      `)
    })

    it("should handle self-closing Button", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return <Button isDisabled />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return <Button disabled />
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

function App() {
  return (
    <Button
      colorScheme='blue'
      onClick={() => console.log('clicked')}
      className='my-button'
      id='btn-1'
    >
      Click me
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        function App() {
          return (
            <Button
              colorPalette=\"blue\"
              onClick={() => console.log('clicked')}
              className=\"my-button\"
              id=\"btn-1\"
            >
              Click me
            </Button>
          )
        }
        "
      `)
    })

    it("should handle Button with existing children and leftIcon", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Icon } from 'lucide-react'

function App() {
  return (
    <Button leftIcon={<Icon />}>
      <span>Click</span>
      <span>me</span>
    </Button>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Icon } from 'lucide-react'

        function App() {
          return (
            <Button>
              <Icon />
              <span>Click</span>
              <span>me</span>
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("ButtonGroup transformations", () => {
    it("should transform isAttached to attached", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App() {
  return (
    <ButtonGroup isAttached>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App() {
          return (
            <ButtonGroup attached>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should propagate isDisabled to Button children", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App() {
  return (
    <ButtonGroup isDisabled>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App() {
          return (
            <ButtonGroup>
              <Button disabled>Button 1</Button>
              <Button disabled>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should transform both isAttached and isDisabled together", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App() {
  return (
    <ButtonGroup isAttached isDisabled>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App() {
          return (
            <ButtonGroup attached>
              <Button disabled>Button 1</Button>
              <Button disabled>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should not override existing disabled on Button children", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App() {
  return (
    <ButtonGroup isDisabled>
      <Button disabled={false}>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App() {
          return (
            <ButtonGroup>
              <Button disabled={false}>Button 1</Button>
              <Button disabled>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should propagate isDisabled to IconButton children", async () => {
      const input = `
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react'

function App() {
  return (
    <ButtonGroup isDisabled>
      <Button>Button 1</Button>
      <IconButton aria-label="Icon">Icon</IconButton>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button, IconButton } from '@chakra-ui/react'

        function App() {
          return (
            <ButtonGroup>
              <Button disabled>Button 1</Button>
              <IconButton aria-label="Icon" disabled>
                Icon
              </IconButton>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should propagate isDisabled expression to Button children", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App({ loading }) {
  return (
    <ButtonGroup isDisabled={loading}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App({ loading }) {
          return (
            <ButtonGroup>
              <Button disabled={loading}>Button 1</Button>
              <Button disabled={loading}>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should propagate complex isDisabled expression to Button children", async () => {
      const input = `
import { ButtonGroup, Button } from '@chakra-ui/react'

function App({ loading, error }) {
  return (
    <ButtonGroup isDisabled={loading || error}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { ButtonGroup, Button } from '@chakra-ui/react'

        function App({ loading, error }) {
          return (
            <ButtonGroup>
              <Button disabled={loading || error}>Button 1</Button>
              <Button disabled={loading || error}>Button 2</Button>
            </ButtonGroup>
          )
        }
        "
      `)
    })

    it("should not transform non-Chakra ButtonGroup", async () => {
      const input = `
function App() {
  return (
    <ButtonGroup isAttached>
      <button>Button 1</button>
    </ButtonGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <ButtonGroup isAttached>
              <button>Button 1</button>
            </ButtonGroup>
          )
        }
        "
      `)
    })
  })
})
