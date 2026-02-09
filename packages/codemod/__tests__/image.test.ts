import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/image"
import { applyTransform } from "./test-utils"

describe("Image Transform", () => {
  describe("Img to Image rename", () => {
    test("basic Img to Image rename", async () => {
      const input = `
import { Img } from '@chakra-ui/react'

export default function App() {
  return <Img src="image.jpg" alt="Test" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" alt="Test" />
        }
        "
      `)
    })

    test("Img to Image with closing tag", async () => {
      const input = `
import { Img } from '@chakra-ui/react'

export default function App() {
  return <Img src="image.jpg" alt="Test"></Img>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" alt="Test"></Image>
        }
        "
      `)
    })

    test("multiple Img components", async () => {
      const input = `
import { Img } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Img src="image1.jpg" alt="First" />
      <Img src="image2.jpg" alt="Second" />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Image src="image1.jpg" alt="First" />
              <Image src="image2.jpg" alt="Second" />
            </>
          )
        }
        "
      `)
    })

    test("Img imported alongside Image", async () => {
      const input = `
import { Img, Image } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Img src="image1.jpg" alt="First" />
      <Image src="image2.jpg" alt="Second" />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Image src="image1.jpg" alt="First" />
              <Image src="image2.jpg" alt="Second" />
            </>
          )
        }
        "
      `)
    })

    test("Img and Image both used with prop transformations", async () => {
      const input = `
import { Img, Image, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Img src="img1.jpg" fit="cover" fallbackSrc="placeholder1.jpg" />
      <Image src="img2.jpg" align="center" ignoreFallback />
      <Img src="img3.jpg" fit="contain" align="top" fallbackSrc="placeholder2.jpg" />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Image src="img1.jpg" objectFit="cover" />
              <Image src="img2.jpg" objectPosition="center" />
              <Image src="img3.jpg" objectFit="contain" objectPosition="top" />
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("Prop transformations", () => {
    test("fit to objectFit", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" fit="cover" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" objectFit="cover" />
        }
        "
      `)
    })

    test("align to objectPosition", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" align="center" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" objectPosition="center" />
        }
        "
      `)
    })

    test("fit and align together", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" fit="cover" align="center" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" objectFit="cover" objectPosition="center" />
        }
        "
      `)
    })

    test("fit with expression value", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App({ objectFit }) {
  return <Image src="image.jpg" fit={objectFit} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App({ objectFit }) {
          return <Image src="image.jpg" objectFit={objectFit} />
        }
        "
      `)
    })
  })

  describe("Fallback prop removal", () => {
    test("remove fallbackSrc", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" fallbackSrc="https://via.placeholder.com/150" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" />
        }
        "
      `)
    })

    test("remove fallback element", async () => {
      const input = `
import { Image, Spinner } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" fallback={<Spinner />} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" />
        }
        "
      `)
    })

    test("remove ignoreFallback", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" ignoreFallback />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" />
        }
        "
      `)
    })

    test("remove fallbackStrategy", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" fallbackStrategy="onError" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" />
        }
        "
      `)
    })

    test("remove all fallback props together", async () => {
      const input = `
import { Image, Spinner } from '@chakra-ui/react'

export default function App() {
  return (
    <Image
      src="image.jpg"
      fallbackSrc="placeholder.jpg"
      fallback={<Spinner />}
      ignoreFallback={false}
      fallbackStrategy="onError"
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" />
        }
        "
      `)
    })
  })

  describe("Combined transformations", () => {
    test("Img with fit, align and fallback props", async () => {
      const input = `
import { Img } from '@chakra-ui/react'

export default function App() {
  return (
    <Img
      src="image.jpg"
      fit="cover"
      align="center"
      fallbackSrc="placeholder.jpg"
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" objectFit="cover" objectPosition="center" />
        }
        "
      `)
    })

    test("Image with all transformations", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return (
    <Image
      src="image.jpg"
      alt="Test image"
      fit="contain"
      align="top"
      fallbackSrc="placeholder.jpg"
      ignoreFallback={false}
      width="200px"
      height="200px"
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return (
            <Image
              src="image.jpg"
              alt="Test image"
              objectFit="contain"
              objectPosition="top"
              width="200px"
              height="200px"
            />
          )
        }
        "
      `)
    })

    test("preserve other props", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return (
    <Image
      src="image.jpg"
      alt="Test"
      fit="cover"
      width="100%"
      height="auto"
      loading="lazy"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return (
            <Image
              src="image.jpg"
              alt="Test"
              objectFit="cover"
              width="100%"
              height="auto"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          )
        }
        "
      `)
    })
  })

  describe("Import updates", () => {
    test("Img import becomes Image", async () => {
      const input = `
import { Img, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Img src="image.jpg" />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Image src="image.jpg" />
            </Box>
          )
        }
        "
      `)
    })

    test("Image import unchanged", async () => {
      const input = `
import { Image, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Image src="image.jpg" />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Image src="image.jpg" />
            </Box>
          )
        }
        "
      `)
    })

    test("Img import removed when Image already imported", async () => {
      const input = `
import { Img, Image, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Img src="image1.jpg" />
      <Image src="image2.jpg" />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Image src="image1.jpg" />
              <Image src="image2.jpg" />
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("Edge cases", () => {
    test("non-Chakra Image unchanged", async () => {
      const input = `
import Image from 'next/image'

export default function App() {
  return <Image src="image.jpg" fit="cover" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import Image from 'next/image'

        export default function App() {
          return <Image src="image.jpg" fit="cover" />
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <img src="image.jpg" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <img src="image.jpg" />
        }
        "
      `)
    })

    test("Image with no props to transform", async () => {
      const input = `
import { Image } from '@chakra-ui/react'

export default function App() {
  return <Image src="image.jpg" alt="Test" width="200px" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" alt="Test" width="200px" />
        }
        "
      `)
    })

    test("self-closing Img", async () => {
      const input = `
import { Img } from '@chakra-ui/react'

export default function App() {
  return <Img src="image.jpg" fit="cover" fallbackSrc="placeholder.jpg" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Image } from '@chakra-ui/react'

        export default function App() {
          return <Image src="image.jpg" objectFit="cover" />
        }
        "
      `)
    })
  })
})
