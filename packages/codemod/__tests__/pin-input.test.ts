import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/pin-input"
import { applyTransform } from "./test-utils"

describe("pin-input codemod", () => {
  describe("basic transformations", () => {
    it("should transform basic PinInput", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform PinInput with type alphanumeric", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput type='alphanumeric'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root type="alphanumeric">
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform PinInput with otp prop", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput otp>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root otp>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform PinInput with mask", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput type='alphanumeric' mask>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root type="alphanumeric" mask>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("value transformations", () => {
    it("should convert defaultValue string to array", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput defaultValue='234'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root defaultValue={['2', '3', '4']}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should convert partial defaultValue string to array", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput defaultValue='23'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root defaultValue={['2', '3']}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should convert value string to array", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput value='1234'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root value={['1', '2', '3', '4']}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should wrap value expression in split method", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  const pinValue = '1234'
  return (
    <HStack>
      <PinInput value={pinValue}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          const pinValue = '1234'
          return (
            <HStack>
              <PinInput.Root value={pinValue.split('')}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform isDisabled to disabled", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput isDisabled>
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root disabled>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform isInvalid to invalid", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput isInvalid>
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root invalid>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform onChange to onValueChange", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log(value)
  return (
    <HStack>
      <PinInput onChange={handleChange}>
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log(value)
          return (
            <HStack>
              <PinInput.Root onValueChange={handleChange}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform onComplete to onValueComplete", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  const handleComplete = (value) => console.log(value)
  return (
    <HStack>
      <PinInput onComplete={handleComplete}>
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          const handleComplete = (value) => console.log(value)
          return (
            <HStack>
              <PinInput.Root onValueComplete={handleComplete}>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should remove manageFocus prop", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput manageFocus={false}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("styling props", () => {
    it("should transform focusBorderColor to CSS variable", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput>
        <PinInputField focusBorderColor='red.200' />
        <PinInputField focusBorderColor='red.200' />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should transform errorBorderColor to CSS variable", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput>
        <PinInputField errorBorderColor='red.500' />
        <PinInputField errorBorderColor='red.500' />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root>
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("special props", () => {
    it("should preserve placeholder prop", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput placeholder='🥳'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root placeholder="🥳">
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra PinInput", async () => {
      const input = `
function App() {
  return (
    <PinInput>
      <PinInputField />
    </PinInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <PinInput>
              <PinInputField />
            </PinInput>
          )
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  return (
    <HStack>
      <PinInput
        defaultValue='123'
        type='alphanumeric'
        mask
        isDisabled
        placeholder='0'
        className='custom-pin'
      >
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          return (
            <HStack>
              <PinInput.Root
                defaultValue={['1', '2', '3']}
                type="alphanumeric"
                mask
                disabled
                placeholder="0"
                className="custom-pin"
              >
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })

    it("should handle multiple prop transformations", async () => {
      const input = `
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log(value)
  const handleComplete = (value) => console.log('done')
  return (
    <HStack>
      <PinInput
        isDisabled
        isInvalid
        onChange={handleChange}
        onComplete={handleComplete}
        manageFocus={false}
      >
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { PinInput, PinInputField, HStack } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log(value)
          const handleComplete = (value) => console.log('done')
          return (
            <HStack>
              <PinInput.Root
                disabled
                invalid
                onValueChange={handleChange}
                onValueComplete={handleComplete}
              >
                <PinInput.HiddenInput />

                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                </PinInput.Control>
              </PinInput.Root>
            </HStack>
          )
        }
        "
      `)
    })
  })
})
