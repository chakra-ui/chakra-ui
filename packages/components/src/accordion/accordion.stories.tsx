import { useDisclosure } from "@chakra-ui/hooks/use-disclosure"
import * as React from "react"
import { ChangeEvent } from "react"
import {
  Accordion,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  chakra,
} from ".."

export default {
  title: "Components / Disclosure / Accordion",
  decorators: [(story: Function) => <Container>{story()}</Container>],
}

/**
 * By default, only one accordion can be visible
 * at a time, and it can't be toggled.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const Basic = () => (
  <Accordion.Root>
    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel>Panel 1</Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel>Panel 2</Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
)

export const allowToggle = () => (
  <Accordion.Root allowToggle>
    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
)

export const allowMultiple = () => (
  <Accordion.Root allowMultiple>
    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Button>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
)

export const stylingExpanded = () => (
  <Accordion.Root allowToggle>
    <Accordion.Item>
      <h2>
        <Accordion.Button _expanded={{ bg: "tomato", color: "white" }}>
          <chakra.div flex="1" textAlign="left">
            Click me to see a different style
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Button>
      </h2>
      <Accordion.Panel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
)

const data = [
  { title: "First Item", text: "Some value 1..." },
  { title: "Second Item", text: "Some value 2..." },
  { title: "Third Item", text: "Some value 3..." },
  { title: "Fourth Item", text: "Some value 4..." },
  { title: "Fifth Item", text: "Some value 5..." },
  { title: "Some other text", text: "Some value 6..." },
  { title: "Another one", text: "Some value 7..." },
]

export function WithSearchFilter() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [displayData, setDisplayData] = React.useState(data)
  const [filter, setFilter] = React.useState("")
  const [index, setIndex] = React.useState(-1)

  React.useEffect(() => {
    if (!filter || filter === "") {
      setDisplayData(data)
    }

    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()),
    )
    setDisplayData(filteredData)
  }, [filter])

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [displayData])

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
    setIndex(-1)
  }

  return (
    <chakra.div padding={4}>
      <chakra.div mt={3} mb={12}>
        <chakra.input
          ref={inputRef}
          value={filter}
          onChange={onInputChange}
          placeholder="Write filter for data title"
        />
      </chakra.div>
      {displayData.length > 0 && (
        <Accordion.Root
          allowToggle
          index={index}
          onChange={(index) => {
            if (!Array.isArray(index)) {
              setIndex(index)
            }
          }}
        >
          {displayData.map((item, i) => (
            <Accordion.Item key={`accordion-item-${i}`}>
              <h2>
                <Accordion.Button>
                  <chakra.div flex="1" textAlign="left">
                    {item.title}
                  </chakra.div>
                  <Accordion.Icon />
                </Accordion.Button>
              </h2>
              <Accordion.Panel pb={4}>{item.text}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </chakra.div>
  )
}

export const FocusBug = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box textAlign="center" fontSize="xl">
      <Button colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Accordion.Root allowMultiple>
              <Accordion.Item>
                <h2>
                  <Accordion.Button>
                    <Box flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <Accordion.Icon />
                  </Accordion.Button>
                </h2>
                <Accordion.Panel pb={4}>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-1">
                    Chakra 1
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-2">
                    Chakra 2
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-3">
                    Chakra 3
                  </a>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item>
                <h2>
                  <Accordion.Button>
                    <Box flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    <Accordion.Icon />
                  </Accordion.Button>
                </h2>
                <Accordion.Panel pb={4}>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-4">
                    Chakra 1
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-5">
                    Chakra 2
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-6">
                    Chakra 3
                  </a>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion.Root>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export const WithDisabledItem = () => {
  return (
    <Accordion.Root index={1}>
      <Accordion.Item isDisabled>
        <Accordion.Button>Button 1</Accordion.Button>
        <Accordion.Panel>One Content</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item isDisabled>
        <Accordion.Button>Button 2</Accordion.Button>
        <Accordion.Panel>Two Content</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Button>Button 3</Accordion.Button>
        <Accordion.Panel>Three Content</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item isDisabled>
        <Accordion.Button>Button 4</Accordion.Button>
        <Accordion.Panel>Four Content</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Button>Button 5</Accordion.Button>
        <Accordion.Panel>Five Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}
