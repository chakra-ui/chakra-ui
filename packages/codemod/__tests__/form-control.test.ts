import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/form-control"
import { applyTransform } from "./test-utils"

describe("form-control codemod", () => {
  describe("basic transformations", () => {
    it("should rename FormControl to Field.Root", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should rename FormLabel to Field.Label", async () => {
      const input = `
import { FormControl, FormLabel } from '@chakra-ui/react'

function App() {
  return (
    <FormControl>
      <FormLabel>Name</FormLabel>
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root>
              <Field.Label>Name</Field.Label>
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should rename FormHelperText to Field.HelperText", async () => {
      const input = `
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

function App() {
          return (
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          )
        }
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input type="email" />
              <Field.HelperText>We'll never share your email.</Field.HelperText>
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should rename FormErrorMessage to Field.ErrorText", async () => {
      const input = `
import { FormControl, FormErrorMessage } from '@chakra-ui/react'

function App() {
  return (
    <FormControl>
      <FormErrorMessage>Email is required.</FormErrorMessage>
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root>
              <Field.ErrorText>Email is required.</Field.ErrorText>
            </Field.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform isInvalid to invalid", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl isInvalid>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root invalid>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should transform isRequired to required", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl isRequired>
      <FormLabel>First name</FormLabel>
      <Input placeholder='First name' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root required>
              <Field.Label>First name</Field.Label>
              <Input placeholder="First name" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should transform isDisabled to disabled", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl isDisabled>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root disabled>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should transform isReadOnly to readOnly", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
          return (
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input type='email' />
            </FormControl>
          )
        }
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root readOnly>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should transform multiple props together", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl isRequired isInvalid>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root required invalid>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })
  })

  describe("fieldset transformations", () => {
    it("should transform FormControl as='fieldset' to Fieldset.Root", async () => {
      const input = `
import { FormControl, FormLabel, RadioGroup, Radio, HStack } from '@chakra-ui/react'

function App() {
  return (
    <FormControl as='fieldset'>
      <FormLabel as='legend'>Favorite Character</FormLabel>
      <RadioGroup defaultValue='Itachi'>
        <HStack spacing='24px'>
          <Radio value='Sasuke'>Sasuke</Radio>
          <Radio value='Itachi'>Itachi</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { RadioGroup, Radio, HStack, Fieldset } from '@chakra-ui/react'

        function App() {
          return (
            <Fieldset.Root>
              <Fieldset.Legend>Favorite Character</Fieldset.Legend>
              <RadioGroup defaultValue="Itachi">
                <HStack spacing="24px">
                  <Radio value="Sasuke">Sasuke</Radio>
                  <Radio value="Itachi">Itachi</Radio>
                </HStack>
              </RadioGroup>
            </Fieldset.Root>
          )
        }
        "
      `)
    })

    it("should transform FormLabel as='legend' to Fieldset.Legend", async () => {
      const input = `
import { FormControl, FormLabel, FormHelperText, RadioGroup } from '@chakra-ui/react'

function App() {
  return (
    <FormControl as='fieldset'>
      <FormLabel as='legend'>Favorite Naruto Character</FormLabel>
      <RadioGroup defaultValue='Itachi'>
        {/* Radio buttons */}
      </RadioGroup>
      <FormHelperText>Select only if you're a fan.</FormHelperText>
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { RadioGroup, Fieldset } from '@chakra-ui/react'

        function App() {
          return (
            <Fieldset.Root>
              <Fieldset.Legend>Favorite Naruto Character</Fieldset.Legend>
              <RadioGroup defaultValue="Itachi">{/* Radio buttons */}</RadioGroup>
              <Fieldset.HelperText>Select only if you're a fan.</Fieldset.HelperText>
            </Fieldset.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform basic form control example", async () => {
      const input = `
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' />
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        ;<Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input type="email" />
          <Field.HelperText>We'll never share your email.</Field.HelperText>
        </Field.Root>
        "
      `)
    })

    it("should transform form with error message", async () => {
      const input = `
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'

function Example() {
  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ''

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function Example() {
          const [input, setInput] = useState('')
          const handleInputChange = (e) => setInput(e.target.value)
          const isError = input === ''

          return (
            <Field.Root invalid={isError}>
              <Field.Label>Email</Field.Label>
              <Input type="email" value={input} onChange={handleInputChange} />
              {!isError ? (
                <Field.HelperText>
                  Enter the email you'd like to receive the newsletter on.
                </Field.HelperText>
              ) : (
                <Field.ErrorText>Email is required.</Field.ErrorText>
              )}
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should transform required field", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

<FormControl isRequired>
  <FormLabel>First name</FormLabel>
  <Input placeholder='First name' />
</FormControl>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        ;<Field.Root required>
          <Field.Label>First name</Field.Label>
          <Input placeholder="First name" />
        </Field.Root>
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra components", async () => {
      const input = `
function App() {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <FormControl>
              <FormLabel>Email</FormLabel>
            </FormControl>
          )
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function App() {
  return (
    <FormControl isRequired className='my-form' id='form-1' p={4}>
      <FormLabel>Email</FormLabel>
      <Input type='email' />
    </FormControl>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Input, Field } from '@chakra-ui/react'

        function App() {
          return (
            <Field.Root required className="my-form" id="form-1" p={4}>
              <Field.Label>Email</Field.Label>
              <Input type="email" />
            </Field.Root>
          )
        }
        "
      `)
    })

    it("should handle FormControl without children", async () => {
      const input = `
import { FormControl } from '@chakra-ui/react'

function App() {
  return <FormControl />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Field } from '@chakra-ui/react'

        function App() {
          return <Field.Root />
        }
        "
      `)
    })
  })
})
