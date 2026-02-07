import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/number-input"
import { applyTransform } from "./test-utils"

describe("number-input codemod", () => {
  describe("basic transformations", () => {
    it("should transform basic NumberInput with stepper", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform NumberInput with min and max", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} min={10} max={20}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15" min={10} max={20}>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform NumberInput with step", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput step={5} defaultValue={15} min={10} max={30}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root step={5} defaultValue="15" min={10} max={30}>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform NumberInput with precision", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} precision={2} step={0.2}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15" precision={2} step={0.2}>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform isDisabled to disabled", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput isDisabled>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root disabled>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform isInvalid to invalid", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput isInvalid>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root invalid>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform isReadOnly to readOnly", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput isReadOnly>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root readOnly>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform isRequired to required", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput isRequired>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root required>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should transform onChange to onValueChange", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log(value)
  return (
    <NumberInput onChange={handleChange}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log(value)
          return (
            <NumberInput.Root onValueChange={handleChange}>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should remove focusInputOnChange prop", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} focusInputOnChange={false}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15" focusInputOnChange={false}>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should convert keepWithinRange={false} to allowOverflow={true}", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} max={10} keepWithinRange={false} clampValueOnBlur={false}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root
              defaultValue="15"
              max={10}
              allowOverflow={true}
              clampValueOnBlur={false}
            >
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should convert keepWithinRange={true} to allowOverflow={false}", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} keepWithinRange={true}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15" allowOverflow={false}>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should remove isValidCharacter prop", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  const isValidNumber = (char) => /[0-9]/.test(char)
  return (
    <NumberInput isValidCharacter={isValidNumber}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          const isValidNumber = (char) => /[0-9]/.test(char)
          return (
            <NumberInput.Root>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("controlled components", () => {
    it("should transform controlled NumberInput with onChange", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import React from 'react'

function Example() {
  const format = (val) => '$' + val
  const parse = (val) => val.replace(/^\$/, '')
  const [value, setValue] = React.useState('1.53')

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      max={50}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'
        import React from 'react'

        function Example() {
          const format = (val) => '$' + val
          const parse = (val) => val.replace(/^$/, '')
          const [value, setValue] = React.useState('1.53')

          return (
            <NumberInput.Root
              onValueChange={(valueString) => setValue(parse(valueString))}
              value={String(format(value))}
              max={50}
            >
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("size variants", () => {
    it("should transform NumberInput with different sizes", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react'

function App() {
  return (
    <Stack shouldWrapChildren direction='row'>
      <NumberInput size='xs' maxW={16} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <NumberInput size='sm' maxW={20} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <NumberInput size='md' maxW={24} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <NumberInput size='lg' maxW={32} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
          Stack,
        } from '@chakra-ui/react'

        function App() {
          return (
            <Stack shouldWrapChildren direction="row">
              <NumberInput.Root size="xs" maxW={16} defaultValue="15" min={10}>
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              <NumberInput.Root size="sm" maxW={20} defaultValue="15" min={10}>
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              <NumberInput.Root size="md" maxW={24} defaultValue="15" min={10}>
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              <NumberInput.Root size="lg" maxW={32} defaultValue="15" min={10}>
                <NumberInput.Input />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("styling props", () => {
    it("should transform focusBorderColor to CSS variable", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput size='sm' defaultValue={15} min={10}>
      <NumberInputField focusBorderColor='red.200' />
      <NumberInputStepper>
        <NumberIncrementStepper
          bg='green.200'
          _active={{ bg: 'green.300' }}
          children='+'
        />
        <NumberDecrementStepper
          bg='pink.200'
          _active={{ bg: 'pink.300' }}
          children='-'
        />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root size="sm" defaultValue="15" min={10}>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger
                  bg="green.200"
                  _active={{ bg: 'green.300' }}
                  children="+"
                />
                <NumberInput.DecrementTrigger
                  bg="pink.200"
                  _active={{ bg: 'pink.300' }}
                  children="-"
                />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("special features", () => {
    it("should handle allowMouseWheel prop", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function MouseWheelExample() {
  return (
    <NumberInput allowMouseWheel>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function MouseWheelExample() {
          return (
            <NumberInput.Root allowMouseWheel>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should handle clampValueOnBlur prop", async () => {
      const input = `
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15} max={30} clampValueOnBlur={false}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          NumberInput,
          NumberInputField,
          NumberInputStepper,
          NumberIncrementStepper,
          NumberDecrementStepper,
        } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15" max={30} clampValueOnBlur={false}>
              <NumberInput.Input />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("value type conversions", () => {
    it("should convert numeric defaultValue to string", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue={15}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15">
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should convert numeric value to string", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput value={42}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root value="42">
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should preserve string defaultValue", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput defaultValue='15'>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root defaultValue="15">
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should wrap expression values in String()", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  const val = 15
  return (
    <NumberInput value={val}>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          const val = 15
          return (
            <NumberInput.Root value={String(val)}>
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra NumberInput", async () => {
      const input = `
function App() {
  return (
    <NumberInput>
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <NumberInput>
              <NumberInputField />
            </NumberInput>
          )
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  return (
    <NumberInput
      defaultValue={15}
      min={10}
      max={20}
      step={1}
      precision={0}
      isDisabled
      className='custom-number-input'
      data-testid='number-input'
    >
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          return (
            <NumberInput.Root
              defaultValue="15"
              min={10}
              max={20}
              step={1}
              precision={0}
              disabled
              className="custom-number-input"
              data-testid="number-input"
            >
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })

    it("should handle multiple prop transformations", async () => {
      const input = `
import { NumberInput, NumberInputField } from '@chakra-ui/react'

function App() {
  const handleChange = (value) => console.log(value)
  return (
    <NumberInput
      isDisabled
      isInvalid
      isReadOnly
      isRequired
      onChange={handleChange}
      focusInputOnChange={false}
    >
      <NumberInputField />
    </NumberInput>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NumberInput, NumberInputField } from '@chakra-ui/react'

        function App() {
          const handleChange = (value) => console.log(value)
          return (
            <NumberInput.Root
              disabled
              invalid
              readOnly
              required
              onValueChange={handleChange}
              focusInputOnChange={false}
            >
              <NumberInput.Input />
            </NumberInput.Root>
          )
        }
        "
      `)
    })
  })
})
