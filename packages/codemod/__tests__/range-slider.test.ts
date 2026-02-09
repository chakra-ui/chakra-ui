import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/range-slider"
import { applyTransform } from "./test-utils"

describe("RangeSlider Transform", () => {
  test("basic RangeSlider", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root aria-label={['min', 'max']} defaultValue={[10, 30]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with colorScheme", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='pink'
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            aria-label={['min', 'max']}
            colorPalette="pink"
            defaultValue={[10, 30]}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with orientation vertical", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='pink'
            defaultValue={[10, 30]}
            orientation='vertical'
            minH='32'
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            aria-label={['min', 'max']}
            colorPalette="pink"
            defaultValue={[10, 30]}
            orientation="vertical"
            minH="32"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with custom Track and Thumb styling", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
        Box,
      } from '@chakra-ui/react'
      import { MdGraphicEq } from 'react-icons/md'

      function App() {
        return (
          <RangeSlider aria-label={['min', 'max']} defaultValue={[30, 80]}>
            <RangeSliderTrack bg='red.100'>
              <RangeSliderFilledTrack bg='tomato' />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0}>
              <Box color='tomato' as={MdGraphicEq} />
            </RangeSliderThumb>
            <RangeSliderThumb boxSize={6} index={1}>
              <Box color='tomato' as={MdGraphicEq} />
            </RangeSliderThumb>
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
        Box,
      } from '@chakra-ui/react'
      import { MdGraphicEq } from 'react-icons/md'

      function App() {
        return (
          <Slider.Root aria-label={['min', 'max']} defaultValue={[30, 80]}>
            <Slider.Control>
              <Slider.Track bg="red.100">
                <Slider.Range bg="tomato" />
              </Slider.Track>
              <Slider.Thumb boxSize={6} index={0}>
                <Slider.HiddenInput />
                <Box color="tomato" as={MdGraphicEq} />
              </Slider.Thumb>
              <Slider.Thumb boxSize={6} index={1}>
                <Slider.HiddenInput />
                <Box color="tomato" as={MdGraphicEq} />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with min, max, and step", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30}>
            <RangeSliderTrack bg='red.100'>
              <RangeSliderFilledTrack bg='tomato' />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root defaultValue={[120, 240]} min={0} max={300} step={30}>
            <Slider.Control>
              <Slider.Track bg="red.100">
                <Slider.Range bg="tomato" />
              </Slider.Track>
              <Slider.Thumb boxSize={6} index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb boxSize={6} index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with onChangeEnd", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            onChangeEnd={(val) => console.log(val)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            aria-label={['min', 'max']}
            onValueChangeEnd={(val) => console.log(val)}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with onChange", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            onChange={(val) => console.log(val)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            aria-label={['min', 'max']}
            onValueChange={(val) => console.log(val)}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with focusThumbOnChange should remove prop", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            focusThumbOnChange={false}
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root aria-label={['min', 'max']} defaultValue={[10, 30]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with reversed should remove prop", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            reversed
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root aria-label={['min', 'max']} defaultValue={[10, 30]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with multiple prop transformations", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='teal'
            onChange={(val) => console.log(val)}
            onChangeEnd={(val) => console.log('end', val)}
            focusThumbOnChange={false}
            reversed
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            aria-label={['min', 'max']}
            colorPalette="teal"
            onValueChange={(val) => console.log(val)}
            onValueChangeEnd={(val) => console.log('end', val)}
            defaultValue={[10, 30]}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("controlled RangeSlider", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'
      import { useState } from 'react'

      function App() {
        const [value, setValue] = useState([20, 60])
        return (
          <RangeSlider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'
      import { useState } from 'react'

      function App() {
        const [value, setValue] = useState([20, 60])
        return (
          <Slider.Root value={value} onValueChange={setValue} min={0} max={100}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with size variant", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider size='lg' defaultValue={[10, 30]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root size="lg" defaultValue={[10, 30]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider with isDisabled", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider isDisabled defaultValue={[10, 30]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root isDisabled defaultValue={[10, 30]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("RangeSlider preserves other props", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider
            id='range-slider'
            data-testid='test-slider'
            className='custom-slider'
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root
            id="range-slider"
            data-testid="test-slider"
            className="custom-slider"
            defaultValue={[10, 30]}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })

  test("non-Chakra RangeSlider should not be transformed", async () => {
    const input = `
      import { RangeSlider } from 'some-other-library'

      function App() {
        return (
          <RangeSlider value={[10, 30]}>
            <Track />
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import { RangeSlider } from 'some-other-library'

      function App() {
        return (
          <RangeSlider value={[10, 30]}>
            <Track />
          </RangeSlider>
        )
      }
      "
    `)
  })

  test("RangeSlider with complex thumb children", async () => {
    const input = `
      import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
        Box,
        Text,
      } from '@chakra-ui/react'

      function App() {
        return (
          <RangeSlider defaultValue={[20, 80]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0}>
              <Box>
                <Text>Min</Text>
              </Box>
            </RangeSliderThumb>
            <RangeSliderThumb index={1}>
              <Box>
                <Text>Max</Text>
              </Box>
            </RangeSliderThumb>
          </RangeSlider>
        )
      }
    `

    const output = await applyTransform(transform, input)
    expect(output).toMatchInlineSnapshot(`
      "import {
        RangeSlider,
        RangeSliderTrack,
        RangeSliderFilledTrack,
        RangeSliderThumb,
        Box,
        Text,
      } from '@chakra-ui/react'

      function App() {
        return (
          <Slider.Root defaultValue={[20, 80]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0}>
                <Slider.HiddenInput />
                <Box>
                  <Text>Min</Text>
                </Box>
              </Slider.Thumb>
              <Slider.Thumb index={1}>
                <Slider.HiddenInput />
                <Box>
                  <Text>Max</Text>
                </Box>
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        )
      }
      "
    `)
  })
})
