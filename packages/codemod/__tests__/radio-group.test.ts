import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/radio-group"
import { applyTransform } from "./test-utils"

describe("RadioGroup Transform", async () => {
  test("basic RadioGroup with Radio children", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='2'>
            <Stack spacing={5} direction='row'>
              <Radio value='1'>Radio 1</Radio>
              <Radio value='2'>Radio 2</Radio>
              <Radio value='3'>Radio 3</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="2">
            <Stack spacing={5} direction="row">
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 3</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("controlled RadioGroup with onChange", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
      import React from 'react'

      function RadioExample() {
        const [value, setValue] = React.useState('1')
        return (
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
              <Radio value='1'>First</Radio>
              <Radio value='2'>Second</Radio>
              <Radio value='3'>Third</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
      import React from 'react'

      function RadioExample() {
        const [value, setValue] = React.useState('1')
        return (
          <RadioGroup.Root onValueChange={setValue} value={value}>
            <Stack direction="row">
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>First</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Second</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Third</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with colorScheme prop should be removed", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='2'>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='red' value='1'>Radio 1</Radio>
              <Radio colorScheme='green' value='2'>Radio 2</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="2">
            <Stack spacing={5} direction="row">
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with isDisabled transforms to disabled", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='1'>
            <Stack>
              <Radio value='1' isDisabled>Checked</Radio>
              <Radio value='2'>Unchecked</Radio>
              <Radio value='3'>Unchecked</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="1">
            <Stack>
              <RadioGroup.Item value="1" disabled>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Checked</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Unchecked</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Unchecked</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with isInvalid prop should be removed", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Radio value='1' isInvalid>Radio 1</Radio>
            <Radio value='2'>Radio 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with isChecked prop should be removed", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Radio value='1' isChecked>Radio 1</Radio>
            <Radio value='2'>Radio 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with defaultChecked prop should be removed", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Radio value='1' defaultChecked>Radio 1</Radio>
            <Radio value='2'>Radio 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with inputProps moves to ItemHiddenInput", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Radio value='1' inputProps={{ 'aria-label': 'Option 1' }}>Radio 1</Radio>
            <Radio value='2'>Radio 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput inputProps={{ 'aria-label': 'Option 1' }} />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("multiple prop transformations", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='1'>
            <Stack spacing={4} direction='row'>
              <Radio value='1' isDisabled colorScheme='red'>Radio 1</Radio>
              <Radio value='2' isInvalid>Radio 2</Radio>
              <Radio value='3'>Radio 3</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="1">
            <Stack spacing={4} direction="row">
              <RadioGroup.Item value="1" disabled>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio 3</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("RadioGroup with size variant", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup size='lg' defaultValue='1'>
            <Radio value='1'>Large Radio 1</Radio>
            <Radio value='2'>Large Radio 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root size="lg" defaultValue="1">
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Large Radio 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Large Radio 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("RadioGroup with variant prop", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup variant='outline' defaultValue='1'>
            <Radio value='1'>Option 1</Radio>
            <Radio value='2'>Option 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root variant="outline" defaultValue="1">
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("RadioGroup with colorPalette (already v3 prop)", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup colorPalette='teal' defaultValue='1'>
            <Radio value='1'>Option 1</Radio>
            <Radio value='2'>Option 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root colorPalette="teal" defaultValue="1">
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("nested Stack with multiple Radios", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='2'>
            <Stack spacing={5} direction='row'>
              <Radio value='1'>Radio</Radio>
              <Radio value='2'>Radio</Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="2">
            <Stack spacing={5} direction="row">
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Radio</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("preserves other Radio props", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Radio value='option1' id='radio-1' name='options' data-testid='test-radio'>
              Option 1
            </Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <RadioGroup.Item
              value="option1"
              id="radio-1"
              name="options"
              data-testid="test-radio"
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("preserves children structure and whitespace", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='1'>
            <Radio value='1'>
              First Option
            </Radio>
            <Radio value='2'>
              Second Option
            </Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="1">
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>First Option</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Second Option</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("RadioGroup with onChange and event handler", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        const handleChange = (value) => console.log(value)
        return (
          <RadioGroup onChange={handleChange}>
            <Radio value='1'>Option 1</Radio>
            <Radio value='2'>Option 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        const handleChange = (value) => console.log(value)
        return (
          <RadioGroup.Root onValueChange={handleChange}>
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with isDisabled expression", async () => {
    const input = `
      import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        const isDisabled = true
        return (
          <RadioGroup>
            <Radio value='1' isDisabled={isDisabled}>Option 1</Radio>
            <Radio value='2'>Option 2</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup } from '@chakra-ui/react'

      function App() {
        const isDisabled = true
        return (
          <RadioGroup.Root>
            <RadioGroup.Item value="1" disabled={isDisabled}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("non-Chakra RadioGroup should not be transformed", async () => {
    const input = `
      import { RadioGroup } from 'some-other-library'

      function App() {
        return (
          <RadioGroup>
            <Radio value='1'>Option 1</Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { RadioGroup } from 'some-other-library'

      function App() {
        return (
          <RadioGroup>
            <Radio value="1">Option 1</Radio>
          </RadioGroup>
        )
      }
      "
    `)
  })

  test("preserves non-Radio children", async () => {
    const input = `
      import { Radio, RadioGroup, Box } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup>
            <Box>
              <Radio value='1'>Option 1</Radio>
            </Box>
            <Box>
              <Radio value='2'>Option 2</Radio>
            </Box>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Box } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root>
            <Box>
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Box>
            <Box>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Box>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("complex example with all transformations", async () => {
    const input = `
      import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
      import React from 'react'

      function ComplexRadioExample() {
        const [value, setValue] = React.useState('1')
        return (
          <RadioGroup
            onChange={setValue}
            value={value}
            size='lg'
            variant='outline'
          >
            <Stack direction='row' spacing={5}>
              <Radio
                value='1'
                isDisabled
                colorScheme='red'
                inputProps={{ 'aria-label': 'First' }}
              >
                First
              </Radio>
              <Radio value='2' isInvalid colorScheme='green'>
                Second
              </Radio>
              <Radio value='3' isChecked>
                Third
              </Radio>
            </Stack>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
      import React from 'react'

      function ComplexRadioExample() {
        const [value, setValue] = React.useState('1')
        return (
          <RadioGroup.Root
            onValueChange={setValue}
            value={value}
            size="lg"
            variant="outline"
          >
            <Stack direction="row" spacing={5}>
              <RadioGroup.Item value="1" disabled>
                <RadioGroup.ItemHiddenInput inputProps={{ 'aria-label': 'First' }} />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>First</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Second</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Third</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })

  test("Radio with complex children structure", async () => {
    const input = `
      import { Radio, RadioGroup, Box, Text } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup defaultValue='1'>
            <Radio value='1'>
              <Box>
                <Text fontWeight='bold'>Option 1</Text>
                <Text fontSize='sm' color='gray.500'>Description for option 1</Text>
              </Box>
            </Radio>
            <Radio value='2'>
              <span>Option with <strong>markup</strong></span>
            </Radio>
            <Radio value='3'>
              Option {3} with expression
            </Radio>
          </RadioGroup>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { Radio, RadioGroup, Box, Text } from '@chakra-ui/react'

      function App() {
        return (
          <RadioGroup.Root defaultValue="1">
            <RadioGroup.Item value="1">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>
                <Box>
                  <Text fontWeight="bold">Option 1</Text>
                  <Text fontSize="sm" color="gray.500">
                    Description for option 1
                  </Text>
                </Box>
              </RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>
                <span>
                  Option with <strong>markup</strong>
                </span>
              </RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="3">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Option {3}with expression</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }
      "
    `)
  })
})
