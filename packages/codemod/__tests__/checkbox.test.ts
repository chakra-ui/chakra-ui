import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/checkbox"
import { applyTransform } from "./test-utils"

describe("checkbox codemod", () => {
  describe("basic transformations", () => {
    it("should transform basic Checkbox to Checkbox.Root structure", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox defaultChecked>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root defaultChecked>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform isDisabled to disabled", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox isDisabled>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root disabled>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform isDisabled with defaultChecked", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox isDisabled defaultChecked>
      Checkbox
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root disabled defaultChecked>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform colorScheme to colorPalette", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox colorScheme='red' defaultChecked>
      Checkbox
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root colorPalette=\"red\" defaultChecked>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform multiple color schemes and sizes", async () => {
      const input = `
import { Checkbox, Stack } from '@chakra-ui/react'

function App() {
  return (
    <Stack spacing={[1, 5]} direction={['column', 'row']}>
      <Checkbox size='sm' colorScheme='red'>
        Checkbox
      </Checkbox>
      <Checkbox size='md' colorScheme='green' defaultChecked>
        Checkbox
      </Checkbox>
      <Checkbox size='lg' colorScheme='orange' defaultChecked>
        Checkbox
      </Checkbox>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox, Stack } from '@chakra-ui/react'

        function App() {
          return (
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox.Root size="sm" colorPalette=\"red\">
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Checkbox</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root size="md" colorPalette=\"green\" defaultChecked>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Checkbox</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root size="lg" colorPalette=\"orange\" defaultChecked>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Checkbox</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform isChecked to checked", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App({ checked }) {
  return <Checkbox isChecked={checked}>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App({ checked }) {
          return (
            <Checkbox.Root checked={checked}>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform isInvalid to invalid", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox isInvalid>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root invalid>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform isReadOnly to readOnly", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox isReadOnly>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root readOnly>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform isRequired to required", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox isRequired>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root required>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should transform onChange to onCheckedChange", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  const handleChange = (e) => console.log(e)
  return <Checkbox onChange={handleChange}>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          const handleChange = (e) => console.log(e)
          return (
            <Checkbox.Root onCheckedChange={handleChange}>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should remove isFocusable prop", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox isFocusable>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })
  })

  describe("indeterminate state", () => {
    it("should transform isIndeterminate to checked='indeterminate'", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App({ indeterminate }) {
  return <Checkbox isIndeterminate={indeterminate}>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App({ indeterminate }) {
          return (
            <Checkbox.Root checked={indeterminate ? 'indeterminate' : false}>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should handle isIndeterminate with isChecked", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App({ indeterminate, checked }) {
  return (
    <Checkbox isIndeterminate={indeterminate} isChecked={checked}>
      Checkbox
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App({ indeterminate, checked }) {
          return (
            <Checkbox.Root checked={indeterminate ? 'indeterminate' : checked}>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })
  })

  describe("icon customization", () => {
    it("should handle iconColor and iconSize on Indicator", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox iconColor='blue.400' iconSize='1rem'>
      Option
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator
                  color=\"blue.400\"
                  boxSize=\"1rem\"
                ></Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label>Option</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should handle custom icon prop", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

function App() {
  return (
    <Checkbox icon={<CheckIcon />}>
      Custom Icon
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'
        import { CheckIcon } from '@chakra-ui/icons'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <CheckIcon />
              </Checkbox.Control>
              <Checkbox.Label>Custom Icon</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should apply iconColor and iconSize to custom icon", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

function App() {
  return (
    <Checkbox icon={<CheckIcon />} iconColor='red.500' iconSize='24px'>
      Custom Icon
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'
        import { CheckIcon } from '@chakra-ui/icons'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <CheckIcon color=\"red.500\" boxSize=\"24px\" />
              </Checkbox.Control>
              <Checkbox.Label>Custom Icon</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })
  })

  describe("inputProps and tabIndex", () => {
    it("should move tabIndex to HiddenInput", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox tabIndex={-1}>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput tabIndex={-1} />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should spread inputProps into HiddenInput", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox inputProps={{ 'data-testid': 'checkbox-input' }}>
      Checkbox
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput {...{ 'data-testid': 'checkbox-input' }} />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should handle both tabIndex and inputProps", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox tabIndex={0} inputProps={{ name: 'terms' }}>
      Checkbox
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput tabIndex={0} {...{ name: 'terms' }} />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })
  })

  describe("CheckboxGroup transformations", () => {
    it("should transform CheckboxGroup isDisabled to disabled", async () => {
      const input = `
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <CheckboxGroup isDisabled>
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
    </CheckboxGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <CheckboxGroup disabled>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Option 1</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Option 2</Checkbox.Label>
              </Checkbox.Root>
            </CheckboxGroup>
          )
        }
        "
      `)
    })

    it("should remove isNative from CheckboxGroup", async () => {
      const input = `
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <CheckboxGroup isNative>
      <Checkbox>Option 1</Checkbox>
    </CheckboxGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <CheckboxGroup>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Option 1</Checkbox.Label>
              </Checkbox.Root>
            </CheckboxGroup>
          )
        }
        "
      `)
    })

    it("should transform onChange to onValueChange on CheckboxGroup", async () => {
      const input = `
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

function App() {
  const handleChange = (values) => console.log(values)
  return (
    <CheckboxGroup onChange={handleChange}>
      <Checkbox value='1'>Option 1</Checkbox>
      <Checkbox value='2'>Option 2</Checkbox>
    </CheckboxGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

        function App() {
          const handleChange = (values) => console.log(values)
          return (
            <CheckboxGroup onValueChange={handleChange}>
              <Checkbox.Root value="1">
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Option 1</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root value="2">
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>Option 2</Checkbox.Label>
              </Checkbox.Root>
            </CheckboxGroup>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra Checkbox", async () => {
      const input = `
function App() {
  return <Checkbox isDisabled>Checkbox</Checkbox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return <Checkbox isDisabled>Checkbox</Checkbox>
        }
        "
      `)
    })

    it("should handle Checkbox without children", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return <Checkbox />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox.Root>
          )
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Checkbox } from '@chakra-ui/react'

function App() {
  return (
    <Checkbox
      id='terms'
      name='terms'
      value='agreed'
      className='custom-checkbox'
    >
      I agree
    </Checkbox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Checkbox } from '@chakra-ui/react'

        function App() {
          return (
            <Checkbox.Root
              id=\"terms\"
              name=\"terms\"
              value=\"agreed\"
              className=\"custom-checkbox\"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>I agree</Checkbox.Label>
            </Checkbox.Root>
          )
        }
        "
      `)
    })
  })
})
