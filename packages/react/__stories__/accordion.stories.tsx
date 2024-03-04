import { useDisclosure } from "@chakra-ui/hooks"
import { useEffect, useRef, useState } from "react"
import { Accordion, Box, Button, Container, Drawer, chakra } from "../src"

export default {
  title: "Disclosure / Accordion",
  decorators: [(story: Function) => <Container>{story()}</Container>],
}

export const Basic = () => (
  <Accordion.Root>
    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content>Panel 1</Accordion.Content>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content>Panel 2</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)

export const WithCollapsible = () => (
  <Accordion.Root collapsible>
    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)

export const allowMultiple = () => (
  <Accordion.Root multiple>
    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item>
      <h2>
        <Accordion.Trigger>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)

export const stylingExpanded = () => (
  <Accordion.Root collapsible>
    <Accordion.Item>
      <h2>
        <Accordion.Trigger _expanded={{ bg: "tomato", color: "white" }}>
          <chakra.div flex="1" textAlign="left">
            Click me to see a different style
          </chakra.div>
          <Accordion.Icon />
        </Accordion.Trigger>
      </h2>
      <Accordion.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)

export const Controlled = () => {
  const [value, setValue] = useState(["1"])
  return (
    <Accordion.Root value={value} onChange={setValue}>
      <Accordion.Item value="1">
        <h2>
          <Accordion.Trigger>
            <chakra.div flex="1" textAlign="left">
              Item 1
            </chakra.div>
            <Accordion.Icon />
          </Accordion.Trigger>
        </h2>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="2">
        <h2>
          <Accordion.Trigger>
            <chakra.div flex="1" textAlign="left">
              Item 2
            </chakra.div>
            <Accordion.Icon />
          </Accordion.Trigger>
        </h2>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [displayData, setDisplayData] = useState(data)
  const [filter, setFilter] = useState("")
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    if (!filter || filter === "") {
      setDisplayData(data)
    }

    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()),
    )
    setDisplayData(filteredData)
  }, [filter])

  useEffect(() => {
    inputRef.current?.focus()
  }, [displayData])

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
    setValue([])
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
        <Accordion.Root collapsible value={value} onChange={setValue}>
          {displayData.map((item, i) => (
            <Accordion.Item key={`accordion-item-${i}`}>
              <h2>
                <Accordion.Trigger>
                  <chakra.div flex="1" textAlign="left">
                    {item.title}
                  </chakra.div>
                  <Accordion.Icon />
                </Accordion.Trigger>
              </h2>
              <Accordion.Content pb={4}>{item.text}</Accordion.Content>
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
      <Drawer.Root isOpen={isOpen} placement="right" onClose={onClose}>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header>Create your account</Drawer.Header>

            <Drawer.Body>
              <Accordion.Root multiple>
                <Accordion.Item>
                  <h2>
                    <Accordion.Trigger>
                      <Box flex="1" textAlign="left">
                        Section 1 title
                      </Box>
                      <Accordion.Icon />
                    </Accordion.Trigger>
                  </h2>
                  <Accordion.Content pb={4}>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-1">
                      Chakra 1
                    </a>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-2">
                      Chakra 2
                    </a>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-3">
                      Chakra 3
                    </a>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item>
                  <h2>
                    <Accordion.Trigger>
                      <Box flex="1" textAlign="left">
                        Section 2 title
                      </Box>
                      <Accordion.Icon />
                    </Accordion.Trigger>
                  </h2>
                  <Accordion.Content pb={4}>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-4">
                      Chakra 1
                    </a>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-5">
                      Chakra 2
                    </a>
                    <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-6">
                      Chakra 3
                    </a>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Drawer.Body>

            <Drawer.Footer>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  )
}

export const WithDisabledItem = () => {
  return (
    <Accordion.Root value={["1"]}>
      <Accordion.Item value="1" isDisabled>
        <Accordion.Trigger>Button 1</Accordion.Trigger>
        <Accordion.Content>One Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="2" isDisabled>
        <Accordion.Trigger>Button 2</Accordion.Trigger>
        <Accordion.Content>Two Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="3">
        <Accordion.Trigger>Button 3</Accordion.Trigger>
        <Accordion.Content>Three Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="4" isDisabled>
        <Accordion.Trigger>Button 4</Accordion.Trigger>
        <Accordion.Content>Four Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="5">
        <Accordion.Trigger>Button 5</Accordion.Trigger>
        <Accordion.Content>Five Content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
