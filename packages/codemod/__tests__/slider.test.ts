import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/slider"
import { applyTransform } from "./test-utils"

describe("slider transform", () => {
  describe("component transformation", () => {
    test("transforms Slider to Slider.Root", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider defaultValue={30} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root defaultValue={30} />
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("transforms onChange to onValueChange", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider onChange={(val) => console.log(val)} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root onValueChange={(val) => console.log(val)} />
        }
        "
      `)
    })

    test("transforms onChangeEnd to onValueChangeEnd", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider onChangeEnd={(val) => console.log(val)} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root onValueChangeEnd={(val) => console.log(val)} />
        }
        "
      `)
    })

    test("transforms isDisabled to disabled", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider isDisabled />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root disabled />
        }
        "
      `)
    })

    test("transforms isReadOnly to readOnly", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider isReadOnly />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root readOnly />
        }
        "
      `)
    })

    test("removes onChangeStart prop", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider onChangeStart={(val) => console.log(val)} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root />
        }
        "
      `)
    })

    test("removes isReversed prop", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider isReversed />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root />
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("transforms all Slider props together", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return (
    <Slider
      defaultValue={30}
      min={0}
      max={100}
      onChange={(val) => console.log(val)}
      onChangeEnd={(val) => console.log('end', val)}
      onChangeStart={(val) => console.log('start', val)}
      isDisabled={false}
      isReadOnly={false}
      isReversed
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return (
            <Slider.Root
              defaultValue={30}
              min={0}
              max={100}
              onValueChange={(val) => console.log(val)}
              onValueChangeEnd={(val) => console.log('end', val)}
              disabled={false}
              readOnly={false}
            />
          )
        }
        "
      `)
    })

    test("preserves other props", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return (
    <Slider
      defaultValue={50}
      onChange={(val) => console.log(val)}
      colorScheme='blue'
      size='lg'
      step={10}
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return (
            <Slider.Root
              defaultValue={50}
              onValueChange={(val) => console.log(val)}
              colorScheme="blue"
              size="lg"
              step={10}
            />
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Slider", async () => {
      const input = `
import { Slider } from './custom-slider'

export default function App() {
  return <Slider onChange={(val) => console.log(val)} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from './custom-slider'

        export default function App() {
          return <Slider onChange={(val) => console.log(val)} />
        }
        "
      `)
    })

    test("handles Slider with no props", async () => {
      const input = `
import { Slider } from '@chakra-ui/react'

export default function App() {
  return <Slider />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Slider } from '@chakra-ui/react'

        export default function App() {
          return <Slider.Root />
        }
        "
      `)
    })
  })
})
