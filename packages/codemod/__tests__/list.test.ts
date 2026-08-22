import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/list"
import { applyTransform } from "./test-utils"

describe("list codemod", () => {
  describe("basic transformations", () => {
    it("should rename UnorderedList to List.Root with as='ul'", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
    </UnorderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root as="ul">
              <List.Item>Lorem ipsum dolor sit amet</List.Item>
              <List.Item>Consectetur adipiscing elit</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should rename OrderedList to List.Root with as='ol'", async () => {
      const input = `
import { OrderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <OrderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
    </OrderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root as="ol">
              <List.Item>Lorem ipsum dolor sit amet</List.Item>
              <List.Item>Consectetur adipiscing elit</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should rename List to List.Root", async () => {
      const input = `
import { List, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </List>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root>
              <List.Item>Item 1</List.Item>
              <List.Item>Item 2</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should rename ListIcon to List.Indicator", async () => {
      const input = `
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'

function App() {
  return (
    <List>
      <ListItem>
        <ListIcon as={MdCheckCircle} color='green.500' />
        Lorem ipsum dolor sit amet
      </ListItem>
    </List>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'
        import { MdCheckCircle } from 'react-icons/md'

        function App() {
          return (
            <List.Root>
              <List.Item>
                <List.Indicator as={MdCheckCircle} color="green.500" />
                Lorem ipsum dolor sit amet
              </List.Item>
            </List.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    it("should transform spacing prop to gap", async () => {
      const input = `
import { List, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <List spacing={3}>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </List>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root gap={3}>
              <List.Item>Item 1</List.Item>
              <List.Item>Item 2</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should transform styleType prop to listStyleType on UnorderedList", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <UnorderedList styleType='lower-roman'>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
    </UnorderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root as="ul" listStyleType="lower-roman">
              <List.Item>Lorem ipsum dolor sit amet</List.Item>
              <List.Item>Consectetur adipiscing elit</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should transform stylePosition prop to listStylePosition", async () => {
      const input = `
import { OrderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <OrderedList stylePosition='inside'>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
    </OrderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root as="ol" listStylePosition="inside">
              <List.Item>Lorem ipsum dolor sit amet</List.Item>
              <List.Item>Consectetur adipiscing elit</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should transform multiple props together", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <UnorderedList spacing={2} styleType='circle' stylePosition='inside'>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </UnorderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root
              as="ul"
              gap={2}
              listStyleType="circle"
              listStylePosition="inside"
            >
              <List.Item>Item 1</List.Item>
              <List.Item>Item 2</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform complete unordered list example", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

<UnorderedList>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
  <ListItem>Integer molestie lorem at massa</ListItem>
  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
</UnorderedList>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        ;<List.Root as="ul">
          <List.Item>Lorem ipsum dolor sit amet</List.Item>
          <List.Item>Consectetur adipiscing elit</List.Item>
          <List.Item>Integer molestie lorem at massa</List.Item>
          <List.Item>Facilisis in pretium nisl aliquet</List.Item>
        </List.Root>
        "
      `)
    })

    it("should transform complete ordered list example", async () => {
      const input = `
import { OrderedList, ListItem } from '@chakra-ui/react'

<OrderedList>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
  <ListItem>Integer molestie lorem at massa</ListItem>
  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
</OrderedList>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        ;<List.Root as="ol">
          <List.Item>Lorem ipsum dolor sit amet</List.Item>
          <List.Item>Consectetur adipiscing elit</List.Item>
          <List.Item>Integer molestie lorem at massa</List.Item>
          <List.Item>Facilisis in pretium nisl aliquet</List.Item>
        </List.Root>
        "
      `)
    })

    it("should transform list with icons example", async () => {
      const input = `
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'

<List spacing={3}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Assumenda, quia temporibus eveniet a libero incidunt suscipit
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
  </ListItem>
  <ListItem>
    <ListIcon as={MdSettings} color='green.500' />
    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
  </ListItem>
</List>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'
        import { MdCheckCircle, MdSettings } from 'react-icons/md'

        ;<List.Root gap={3}>
          <List.Item>
            <List.Indicator as={MdCheckCircle} color="green.500" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </List.Item>
          <List.Item>
            <List.Indicator as={MdCheckCircle} color="green.500" />
            Assumenda, quia temporibus eveniet a libero incidunt suscipit
          </List.Item>
          <List.Item>
            <List.Indicator as={MdCheckCircle} color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </List.Item>
          <List.Item>
            <List.Indicator as={MdSettings} color="green.500" />
            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
          </List.Item>
        </List.Root>
        "
      `)
    })

    it("should transform list with custom styleType", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

<UnorderedList styleType='lower-roman'>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
  <ListItem>Integer molestie lorem at massa</ListItem>
  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
</UnorderedList>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        ;<List.Root as="ul" listStyleType="lower-roman">
          <List.Item>Lorem ipsum dolor sit amet</List.Item>
          <List.Item>Consectetur adipiscing elit</List.Item>
          <List.Item>Integer molestie lorem at massa</List.Item>
          <List.Item>Facilisis in pretium nisl aliquet</List.Item>
        </List.Root>
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra components", async () => {
      const input = `
function App() {
  return (
    <UnorderedList>
      <ListItem>Item 1</ListItem>
    </UnorderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <UnorderedList>
              <ListItem>Item 1</ListItem>
            </UnorderedList>
          )
        }
        "
      `)
    })

    it("should handle empty list", async () => {
      const input = `
import { List } from '@chakra-ui/react'

function App() {
  return <List />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return <List.Root />
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { UnorderedList, ListItem } from '@chakra-ui/react'

function App() {
  return (
    <UnorderedList className="my-list" id="list-1" px={4}>
      <ListItem>Item 1</ListItem>
    </UnorderedList>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'

        function App() {
          return (
            <List.Root as="ul" className="my-list" id="list-1" px={4}>
              <List.Item>Item 1</List.Item>
            </List.Root>
          )
        }
        "
      `)
    })

    it("should handle mixed list components in same file", async () => {
      const input = `
import { List, OrderedList, UnorderedList, ListItem, ListIcon } from '@chakra-ui/react'
import { MdCheck } from 'react-icons/md'

function App() {
  return (
    <>
      <List spacing={2}>
        <ListItem>
          <ListIcon as={MdCheck} />
          Item 1
        </ListItem>
      </List>
      <OrderedList>
        <ListItem>Ordered Item</ListItem>
      </OrderedList>
      <UnorderedList>
        <ListItem>Unordered Item</ListItem>
      </UnorderedList>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { List } from '@chakra-ui/react'
        import { MdCheck } from 'react-icons/md'

        function App() {
          return (
            <>
              <List.Root gap={2}>
                <List.Item>
                  <List.Indicator as={MdCheck} />
                  Item 1
                </List.Item>
              </List.Root>
              <List.Root as="ol">
                <List.Item>Ordered Item</List.Item>
              </List.Root>
              <List.Root as="ul">
                <List.Item>Unordered Item</List.Item>
              </List.Root>
            </>
          )
        }
        "
      `)
    })
  })
})
