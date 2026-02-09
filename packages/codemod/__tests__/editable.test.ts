import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/editable"
import { applyTransform } from "./test-utils"

describe("editable codemod", () => {
  describe("basic transformations", () => {
    it("should transform basic Editable with Input", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Take some chakra'>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Take some chakra">
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform Editable with Textarea", async () => {
      const input = `
import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Take some chakra'>
      <EditablePreview />
      <EditableTextarea />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Take some chakra">
              <Editable.Preview />
              <Editable.Textarea />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform isDisabled to disabled", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Disabled' isDisabled>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Disabled" disabled>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform onCancel to onValueRevert", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  const handleCancel = () => console.log('cancelled')
  return (
    <Editable defaultValue='Edit me' onCancel={handleCancel}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          const handleCancel = () => console.log('cancelled')
          return (
            <Editable.Root defaultValue="Edit me" onValueRevert={handleCancel}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform onChange to onValueChange", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log(value)
  return (
    <Editable defaultValue='Edit me' onChange={handleChange}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log(value)
          return (
            <Editable.Root defaultValue="Edit me" onValueChange={handleChange}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform onSubmit to onValueCommit", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  const handleSubmit = (value) => console.log(value)
  return (
    <Editable defaultValue='Edit me' onSubmit={handleSubmit}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          const handleSubmit = (value) => console.log(value)
          return (
            <Editable.Root defaultValue="Edit me" onValueCommit={handleSubmit}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform selectAllOnFocus to selectOnFocus", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' selectAllOnFocus={false}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me" selectOnFocus={false}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform startWithEditView to defaultEdit", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' startWithEditView>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me" defaultEdit={true}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform submitOnBlur={false} to submitMode='enter'", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' submitOnBlur={false}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me" submitMode="enter">
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should not add submitMode when submitOnBlur={true}", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' submitOnBlur={true}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me">
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })

  describe("finalFocusRef transformation", () => {
    it("should transform finalFocusRef to finalFocusEl function", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import { useRef } from 'react'

function App() {
  const ref = useRef(null)
  return (
    <Editable defaultValue='Edit me' finalFocusRef={ref}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
        import { useRef } from 'react'

        function App() {
          const ref = useRef(null)
          return (
            <Editable.Root defaultValue="Edit me" finalFocusEl={() => ref.current}>
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })

  describe("isPreviewFocusable transformation", () => {
    it("should add tabIndex={undefined} to Preview when isPreviewFocusable={false}", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' isPreviewFocusable={false}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me">
              <Editable.Preview tabIndex={undefined} />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should not add tabIndex when isPreviewFocusable={true}", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable defaultValue='Edit me' isPreviewFocusable={true}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root defaultValue="Edit me">
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })

  describe("useEditableControls transformation", () => {
    it("should transform useEditableControls import to useEditableContext", async () => {
      const input = `
import { Editable, useEditableControls } from '@chakra-ui/react'

function App() {
  return <div />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, useEditableContext } from '@chakra-ui/react'

        function App() {
          return <div />
        }
        "
      `)
    })

    it("should transform useEditableControls() call to useEditableContext()", async () => {
      const input = `
import { useEditableControls } from '@chakra-ui/react'

function CustomControls() {
  const controls = useEditableControls()
  return null
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { useEditableContext } from '@chakra-ui/react'

        function CustomControls() {
          const controls = useEditableContext()
          return null
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform editable with multiple props", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable
      defaultValue='Rasengan ⚡️'
      fontSize='2xl'
      isPreviewFocusable={false}
      submitOnBlur={false}
      selectAllOnFocus
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root
              defaultValue="Rasengan ⚡️"
              fontSize="2xl"
              selectOnFocus
              submitMode="enter"
            >
              <Editable.Preview tabIndex={undefined} />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })

    it("should transform editable with all event handlers", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log('change', value)
  const handleSubmit = (value) => console.log('submit', value)
  const handleCancel = () => console.log('cancel')

  return (
    <Editable
      defaultValue='Edit me'
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log('change', value)
          const handleSubmit = (value) => console.log('submit', value)
          const handleCancel = () => console.log('cancel')

          return (
            <Editable.Root
              defaultValue="Edit me"
              onValueChange={handleChange}
              onValueCommit={handleSubmit}
              onValueRevert={handleCancel}
            >
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra Editable", async () => {
      const input = `
function App() {
  return (
    <Editable isDisabled>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <Editable isDisabled>
              <EditablePreview />
              <EditableInput />
            </Editable>
          )
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

function App() {
  return (
    <Editable
      defaultValue='Edit me'
      placeholder='Enter text'
      isDisabled
      className='custom-editable'
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'

        function App() {
          return (
            <Editable.Root
              defaultValue="Edit me"
              placeholder="Enter text"
              disabled
              className="custom-editable"
            >
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          )
        }
        "
      `)
    })
  })
})
