import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/icons"
import { applyTransform } from "./test-utils"

describe("Icons Transform", () => {
  describe("Basic Icon Transformation", () => {
    test("single icon without props - uses react-icon directly", async () => {
      const input = `
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <AddIcon />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <LuPlus />
        }
        "
      `)
    })

    test("multiple icons without props - uses react-icons directly", async () => {
      const input = `
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <AddIcon />
      <CheckIcon />
      <CloseIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuCheck, LuPlus, LuX } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuPlus />
              <LuCheck />
              <LuX />
            </div>
          )
        }
        "
      `)
    })

    test("icon with props (boxSize, color)", async () => {
      const input = `
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <AddIcon boxSize={6} color="blue.500" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Icon } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <Icon as={LuPlus} boxSize={6} color="blue.500" />
        }
        "
      `)
    })

    test("icon in JSX expression without props", async () => {
      const input = `
import { CheckIcon, AddIcon } from '@chakra-ui/icons'

export default function App() {
  const icon = <CheckIcon />
  const icons = [<AddIcon />, <CheckIcon />]
  return <div>{icon}</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuCheck, LuPlus } from 'react-icons/lu'

        export default function App() {
          const icon = <LuCheck />
          const icons = [<LuPlus />, <LuCheck />]
          return <div>{icon}</div>
        }
        "
      `)
    })

    test("icon as variable", async () => {
      const input = `
import { StarIcon } from '@chakra-ui/icons'

export default function App() {
  const MyIcon = <StarIcon color="yellow.500" />
  return <div>{MyIcon}</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Icon } from '@chakra-ui/react'
        import { LuStar } from 'react-icons/lu'

        export default function App() {
          const MyIcon = <Icon as={LuStar} color="yellow.500" />
          return <div>{MyIcon}</div>
        }
        "
      `)
    })
  })

  describe("Import Handling", () => {
    test("replace @chakra-ui/icons with react-icons/lu (no Icon import if no props)", async () => {
      const input = `
import { AddIcon, CheckIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <AddIcon />
      <CheckIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuCheck, LuPlus } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuPlus />
              <LuCheck />
            </div>
          )
        }
        "
      `)
    })

    test("preserve other Chakra imports, no Icon import if not needed", async () => {
      const input = `
import { Box, Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Box>
      <Button>Click</Button>
      <AddIcon />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Button } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return (
            <Box>
              <Button>Click</Button>
              <LuPlus />
            </Box>
          )
        }
        "
      `)
    })

    test("deduplicate Lucide icons (no Icon import if no props)", async () => {
      const input = `
import { AddIcon, SmallAddIcon, CloseIcon, SmallCloseIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <AddIcon />
      <SmallAddIcon />
      <CloseIcon />
      <SmallCloseIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuPlus, LuX } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuPlus />
              <LuPlus />
              <LuX />
              <LuX />
            </div>
          )
        }
        "
      `)
    })

    test("add Icon only when icon has props", async () => {
      const input = `
import { Box, Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <AddIcon color="blue.500" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Button, Icon } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <Icon as={LuPlus} color="blue.500" />
        }
        "
      `)
    })
  })

  describe("Icon in Components", () => {
    test("icon in Button leftIcon prop", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <Button leftIcon={<AddIcon />}>Add Item</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <Button leftIcon={<LuPlus />}>Add Item</Button>
        }
        "
      `)
    })

    test("icon in IconButton", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton aria-label="Search" icon={<SearchIcon />} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { LuSearch } from 'react-icons/lu'

        export default function App() {
          return <IconButton aria-label="Search" icon={<LuSearch />} />
        }
        "
      `)
    })

    test("icon with props in Button wraps in Icon", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <Button leftIcon={<AddIcon boxSize={5} color="blue.500" />}>Add Item</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, Icon } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return (
            <Button leftIcon={<Icon as={LuPlus} boxSize={5} color="blue.500" />}>
              Add Item
            </Button>
          )
        }
        "
      `)
    })

    test("icon as children", async () => {
      const input = `
import { Box } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Box>
      <CheckIcon />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'
        import { LuCheck } from 'react-icons/lu'

        export default function App() {
          return (
            <Box>
              <LuCheck />
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("Prop Preservation", () => {
    test("boxSize preserved on Icon wrapper", async () => {
      const input = `
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <AddIcon boxSize={8} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Icon } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <Icon as={LuPlus} boxSize={8} />
        }
        "
      `)
    })

    test("color tokens preserved", async () => {
      const input = `
import { StarIcon } from '@chakra-ui/icons'

export default function App() {
  return <StarIcon color="yellow.500" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Icon } from '@chakra-ui/react'
        import { LuStar } from 'react-icons/lu'

        export default function App() {
          return <Icon as={LuStar} color="yellow.500" />
        }
        "
      `)
    })

    test("other props preserved", async () => {
      const input = `
import { CheckIcon } from '@chakra-ui/icons'

export default function App() {
  return <CheckIcon className="my-icon" data-testid="check" aria-label="Completed" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Icon } from '@chakra-ui/react'
        import { LuCheck } from 'react-icons/lu'

        export default function App() {
          return (
            <Icon
              as={LuCheck}
              className="my-icon"
              data-testid="check"
              aria-label="Completed"
            />
          )
        }
        "
      `)
    })
  })

  describe("Edge Cases", () => {
    test("no @chakra-ui/icons imports", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box>No icons here</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return <Box>No icons here</Box>
        }
        "
      `)
    })

    test("self-closing JSX", async () => {
      const input = `
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <AddIcon />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return <LuPlus />
        }
        "
      `)
    })

    test("icons in expressions/arrays", async () => {
      const input = `
import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'

export default function App() {
  const actions = [
    { icon: <AddIcon />, label: 'Add' },
    { icon: <CheckIcon />, label: 'Confirm' },
    { icon: <DeleteIcon />, label: 'Delete' },
  ]
  return <div>{actions.map(a => a.icon)}</div>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuCheck, LuPlus, LuTrash2 } from 'react-icons/lu'

        export default function App() {
          const actions = [
            { icon: <LuPlus />, label: 'Add' },
            { icon: <LuCheck />, label: 'Confirm' },
            { icon: <LuTrash2 />, label: 'Delete' },
          ]
          return <div>{actions.map((a) => a.icon)}</div>
        }
        "
      `)
    })
  })

  describe("Mapping Coverage", () => {
    test("all basic icons transform correctly", async () => {
      const input = `
import {
  AddIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon
} from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <AddIcon />
      <ArrowBackIcon />
      <ArrowDownIcon />
      <CheckIcon />
      <ChevronDownIcon />
      <CloseIcon />
      <DeleteIcon />
      <EditIcon />
      <SearchIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          LuArrowDown,
          LuArrowLeft,
          LuCheck,
          LuChevronDown,
          LuPencil,
          LuPlus,
          LuSearch,
          LuTrash2,
          LuX,
        } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuPlus />
              <LuArrowLeft />
              <LuArrowDown />
              <LuCheck />
              <LuChevronDown />
              <LuX />
              <LuTrash2 />
              <LuPencil />
              <LuSearch />
            </div>
          )
        }
        "
      `)
    })

    test("special cases (SmallAddIcon, TriangleDownIcon)", async () => {
      const input = `
import { SmallAddIcon, SmallCloseIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <SmallAddIcon />
      <SmallCloseIcon />
      <TriangleDownIcon />
      <TriangleUpIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuPlus, LuTriangle, LuX } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuPlus />
              <LuX />
              <LuTriangle />
              <LuTriangle />
            </div>
          )
        }
        "
      `)
    })

    test("duplicate mappings (ArrowLeftIcon/ArrowBackIcon)", async () => {
      const input = `
import { ArrowLeftIcon, ArrowBackIcon, ArrowRightIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <div>
      <ArrowLeftIcon />
      <ArrowBackIcon />
      <ArrowRightIcon />
      <ArrowForwardIcon />
    </div>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

        export default function App() {
          return (
            <div>
              <LuArrowLeft />
              <LuArrowLeft />
              <LuArrowRight />
              <LuArrowRight />
            </div>
          )
        }
        "
      `)
    })
  })

  describe("Complete Example", () => {
    test("full app with multiple icon patterns", async () => {
      const input = `
import { Box, Button, IconButton, HStack } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Box>
      <HStack>
        <Button leftIcon={<AddIcon />}>Add</Button>
        <Button rightIcon={<CheckIcon />}>Save</Button>
        <IconButton aria-label="Edit" icon={<EditIcon />} />
        <IconButton aria-label="Delete" icon={<DeleteIcon color="red.500" />} />
      </HStack>
      <Box mt={4}>
        <CloseIcon boxSize={6} color="gray.600" />
      </Box>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Button, IconButton, HStack, Icon } from '@chakra-ui/react'
        import { LuCheck, LuPencil, LuPlus, LuTrash2, LuX } from 'react-icons/lu'

        export default function App() {
          return (
            <Box>
              <HStack>
                <Button leftIcon={<LuPlus />}>Add</Button>
                <Button rightIcon={<LuCheck />}>Save</Button>
                <IconButton aria-label="Edit" icon={<LuPencil />} />
                <IconButton
                  aria-label="Delete"
                  icon={<Icon as={LuTrash2} color="red.500" />}
                />
              </HStack>
              <Box mt={4}>
                <Icon as={LuX} boxSize={6} color="gray.600" />
              </Box>
            </Box>
          )
        }
        "
      `)
    })
  })
})
