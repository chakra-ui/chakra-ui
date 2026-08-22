import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/breadcrumb"
import { applyTransform } from "./test-utils"

describe("Breadcrumb Transform", () => {
  describe("Basic transformation", () => {
    test("basic breadcrumb", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("breadcrumb with single item", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("Separator prop", () => {
    test("breadcrumb with string separator", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb separator='-'>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>-</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">About</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>-</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Contact</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("breadcrumb with icon separator", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'
        import { ChevronRightIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  {<ChevronRightIcon color="gray.500" />}
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">About</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  {<ChevronRightIcon color="gray.500" />}
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Contact</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("Spacing prop", () => {
    test("breadcrumb with spacing", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb spacing='8px'>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List gap="8px">
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("breadcrumb with spacing and separator", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'
        import { ChevronRightIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List gap="8px">
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  {<ChevronRightIcon color="gray.500" />}
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">About</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  {<ChevronRightIcon color="gray.500" />}
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Contact</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("ListProps", () => {
    test("breadcrumb with listProps", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb listProps={{ className: 'breadcrumb-list' }}>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List {...{ className: 'breadcrumb-list' }}>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("Style props", () => {
    test("breadcrumb with style props", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb fontWeight='medium' fontSize='sm'>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root fontWeight="medium" fontSize="sm">
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">About</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("BreadcrumbItem props", () => {
    test("BreadcrumbItem with isCurrentPage", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("BreadcrumbItem with isLastChild removed", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isLastChild>
        <BreadcrumbLink href='#'>Last</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Last</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("BreadcrumbItem with spacing to gap", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem spacing='2'>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item gap="2">
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("BreadcrumbLink props", () => {
    test("BreadcrumbLink with isCurrentPage", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#' isCurrentPage>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink href="#">Current</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("BreadcrumbLink with isCurrentPage expression", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App({ isCurrent }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#' isCurrentPage={isCurrent}>Maybe Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App({ isCurrent }) {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Maybe Current</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })

  describe("Import updates", () => {
    test("all breadcrumb imports", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })

    test("breadcrumb with other chakra imports", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("Edge cases", () => {
    test("non-Chakra breadcrumb unchanged", async () => {
      const input = `
import { Breadcrumb } from 'some-other-library'

export default function App() {
  return (
    <Breadcrumb>
      <div>Custom breadcrumb</div>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from 'some-other-library'

        export default function App() {
          return (
            <Breadcrumb>
              <div>Custom breadcrumb</div>
            </Breadcrumb>
          )
        }
        "
      `)
    })

    test("no Chakra imports", async () => {
      const input = `
export default function App() {
  return <div>No breadcrumb here</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "export default function App() {
          return <div>No breadcrumb here</div>
        }
        "
      `)
    })
  })

  describe("Complex scenarios", () => {
    test("multiple breadcrumbs", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Current</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separator='-'>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Item</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>-</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Item</Breadcrumb.Link>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </>
          )
        }
        "
      `)
    })

    test("breadcrumb with all props", async () => {
      const input = `
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function App() {
  return (
    <Breadcrumb
      spacing='8px'
      separator='/'
      fontWeight='medium'
      fontSize='sm'
      listProps={{ className: 'custom-list' }}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Breadcrumb } from '@chakra-ui/react'

        export default function App() {
          return (
            <Breadcrumb.Root fontWeight="medium" fontSize="sm">
              <Breadcrumb.List gap="8px" {...{ className: 'custom-list' }}>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )
        }
        "
      `)
    })
  })
})
