import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/alert"
import { applyTransform } from "./test-utils"

describe("alert codemod", () => {
  describe("basic transformations", () => {
    it("should rename Alert to Alert.Root", async () => {
      const input = `
import { Alert } from '@chakra-ui/react'

function App() {
  return <Alert>Content</Alert>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return <Alert.Root>Content</Alert.Root>
        }
        "
      `)
    })

    it("should rename AlertIcon to Alert.Indicator", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

function App() {
  return (
    <Alert>
      <AlertIcon />
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root>
              <Alert.Indicator />
            </Alert.Root>
          )
        }
        "
      `)
    })

    it("should rename AlertTitle to Alert.Title", async () => {
      const input = `
import { Alert, AlertTitle } from '@chakra-ui/react'

function App() {
  return (
    <Alert>
      <AlertTitle>Title</AlertTitle>
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root>
              <Alert.Title>Title</Alert.Title>
            </Alert.Root>
          )
        }
        "
      `)
    })

    it("should rename AlertDescription to Alert.Description", async () => {
      const input = `
import { Alert, AlertDescription } from '@chakra-ui/react'

function App() {
  return (
    <Alert>
      <AlertDescription>Description</AlertDescription>
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root>
              <Alert.Description>Description</Alert.Description>
            </Alert.Root>
          )
        }
        "
      `)
    })

    it("should transform all alert components together", async () => {
      const input = `
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

function App() {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>Something went wrong.</AlertDescription>
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Title>Error!</Alert.Title>
              <Alert.Description>Something went wrong.</Alert.Description>
            </Alert.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform alert with icon, title, and description", async () => {
      const input = `
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

<Alert status='error'>
  <AlertIcon />
  <AlertTitle>Your browser is outdated!</AlertTitle>
  <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>Your browser is outdated!</Alert.Title>
          <Alert.Description>Your Chakra experience may be degraded.</Alert.Description>
        </Alert.Root>
        "
      `)
    })

    it("should transform simple alert with icon and text", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<Alert status='error'>
  <AlertIcon />
  There was an error processing your request
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root status="error">
          <Alert.Indicator />
          There was an error processing your request
        </Alert.Root>
        "
      `)
    })

    it("should transform multiple alerts with different statuses", async () => {
      const input = `
import { Alert, AlertIcon, Stack } from '@chakra-ui/react'

<Stack spacing={3}>
  <Alert status='error'>
    <AlertIcon />
    There was an error processing your request
  </Alert>

  <Alert status='success'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status='warning'>
    <AlertIcon />
    Seems your account is about expire, upgrade now
  </Alert>

  <Alert status='info'>
    <AlertIcon />
    Chakra is going live on August 30th. Get ready!
  </Alert>
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert, Stack } from '@chakra-ui/react'

        ;<Stack spacing={3}>
          <Alert.Root status="error">
            <Alert.Indicator />
            There was an error processing your request
          </Alert.Root>

          <Alert.Root status="success">
            <Alert.Indicator />
            Data uploaded to the server. Fire on!
          </Alert.Root>

          <Alert.Root status="warning">
            <Alert.Indicator />
            Seems your account is about expire, upgrade now
          </Alert.Root>

          <Alert.Root status="info">
            <Alert.Indicator />
            Chakra is going live on August 30th. Get ready!
          </Alert.Root>
        </Stack>
        "
      `)
    })

    it("should transform alerts with different variants", async () => {
      const input = `
import { Alert, AlertIcon, Stack } from '@chakra-ui/react'

<Stack spacing={3}>
  <Alert status='success' variant='subtle'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status='success' variant='solid'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status='success' variant='left-accent'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status='success' variant='top-accent'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert, Stack } from '@chakra-ui/react'

        ;<Stack spacing={3}>
          <Alert.Root status="success" variant="subtle">
            <Alert.Indicator />
            Data uploaded to the server. Fire on!
          </Alert.Root>

          <Alert.Root status="success" variant="solid">
            <Alert.Indicator />
            Data uploaded to the server. Fire on!
          </Alert.Root>

          <Alert.Root
            status="success"
            variant="subtle"
            borderStartWidth="3px"
            borderStartColor="colorPalette.solid"
          >
            <Alert.Indicator />
            Data uploaded to the server. Fire on!
          </Alert.Root>

          <Alert.Root
            status="success"
            variant="subtle"
            borderTopWidth="3px"
            borderTopColor="colorPalette.solid"
          >
            <Alert.Indicator />
            Data uploaded to the server. Fire on!
          </Alert.Root>
        </Stack>
        "
      `)
    })
  })

  describe("variant transformations", () => {
    it("should transform left-accent variant to subtle with border", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<Alert status='success' variant='left-accent'>
  <AlertIcon />
  Data uploaded to the server.
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root
          status="success"
          variant="subtle"
          borderStartWidth="3px"
          borderStartColor="colorPalette.solid"
        >
          <Alert.Indicator />
          Data uploaded to the server.
        </Alert.Root>
        "
      `)
    })

    it("should transform top-accent variant to subtle with border", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<Alert status='warning' variant='top-accent'>
  <AlertIcon />
  Warning message.
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root
          status="warning"
          variant="subtle"
          borderTopWidth="3px"
          borderTopColor="colorPalette.solid"
        >
          <Alert.Indicator />
          Warning message.
        </Alert.Root>
        "
      `)
    })

    it("should preserve subtle and solid variants", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<>
  <Alert status='info' variant='subtle'>
    <AlertIcon />
    Info message
  </Alert>
  <Alert status='error' variant='solid'>
    <AlertIcon />
    Error message
  </Alert>
</>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<>
          <Alert.Root status="info" variant="subtle">
            <Alert.Indicator />
            Info message
          </Alert.Root>
          <Alert.Root status="error" variant="solid">
            <Alert.Indicator />
            Error message
          </Alert.Root>
        </>
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should remove addRole prop", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<Alert status='info' addRole={false}>
  <AlertIcon />
  Info message
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root status="info">
          <Alert.Indicator />
          Info message
        </Alert.Root>
        "
      `)
    })

    it("should remove addRole prop and preserve other props", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

<Alert status='warning' addRole={true} className='my-alert' p={4}>
  <AlertIcon />
  Warning message
</Alert>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        ;<Alert.Root status="warning" className="my-alert" p={4}>
          <Alert.Indicator />
          Warning message
        </Alert.Root>
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra components", async () => {
      const input = `
function App() {
  return (
    <Alert>
      <AlertIcon />
      Content
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <Alert>
              <AlertIcon />
              Content
            </Alert>
          )
        }
        "
      `)
    })

    it("should handle empty alert", async () => {
      const input = `
import { Alert } from '@chakra-ui/react'

function App() {
  return <Alert />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return <Alert.Root />
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

function App() {
  return (
    <Alert status='info' className="my-alert" id="alert-1" p={4}>
      <AlertIcon />
      Info message
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root status="info" className="my-alert" id="alert-1" p={4}>
              <Alert.Indicator />
              Info message
            </Alert.Root>
          )
        }
        "
      `)
    })

    it("should handle alert without icon", async () => {
      const input = `
import { Alert, AlertTitle, AlertDescription } from '@chakra-ui/react'

function App() {
  return (
    <Alert status='warning'>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Please be careful.</AlertDescription>
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root status="warning">
              <Alert.Title>Warning</Alert.Title>
              <Alert.Description>Please be careful.</Alert.Description>
            </Alert.Root>
          )
        }
        "
      `)
    })

    it("should handle alert with only icon", async () => {
      const input = `
import { Alert, AlertIcon } from '@chakra-ui/react'

function App() {
  return (
    <Alert status='success'>
      <AlertIcon />
    </Alert>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Alert } from '@chakra-ui/react'

        function App() {
          return (
            <Alert.Root status="success">
              <Alert.Indicator />
            </Alert.Root>
          )
        }
        "
      `)
    })
  })
})
