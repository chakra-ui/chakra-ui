import { useDisclosure } from "@chakra-ui/hooks"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "."
import { Button } from "../button"
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "../modal"
import { chakra } from "../system"
import { Container } from "../container"
import { Box } from "../box"

export default {
  title: "Components / Disclosure / Accordion",
  decorators: [(story: Function) => <Container>{story()}</Container>],
}

export const Basic = () => (
  <Accordion>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export const allowToggle = () => (
  <Accordion allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export const allowMultiple = () => (
  <Accordion allowMultiple>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 1 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <chakra.div flex="1" textAlign="left">
            Section 2 title
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export const stylingExpanded = () => (
  <Accordion allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
          <chakra.div flex="1" textAlign="left">
            Click me to see a different style
          </chakra.div>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export const Controlled = () => {
  const [value, setValue] = useState(["1"])
  return (
    <Accordion value={value} onChange={setValue}>
      <AccordionItem value="1">
        <h2>
          <AccordionButton>
            <chakra.div flex="1" textAlign="left">
              Item 1
            </chakra.div>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <h2>
          <AccordionButton>
            <chakra.div flex="1" textAlign="left">
              Item 2
            </chakra.div>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
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

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
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
        <Accordion allowToggle value={value} onChange={setValue}>
          {displayData.map((item, i) => (
            <AccordionItem key={`accordion-item-${i}`}>
              <h2>
                <AccordionButton>
                  <chakra.div flex="1" textAlign="left">
                    {item.title}
                  </chakra.div>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.text}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
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
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-1">
                    Chakra 1
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-2">
                    Chakra 2
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-3">
                    Chakra 3
                  </a>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-4">
                    Chakra 1
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-5">
                    Chakra 2
                  </a>
                  <a href="https://chakra-ui.com/should-not-have-focus-if-panel-closed-6">
                    Chakra 3
                  </a>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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

export const WithDisabledAccordionItem = () => {
  return (
    <Accordion value={["1"]}>
      <AccordionItem value="1" isDisabled>
        <AccordionButton>Button 1</AccordionButton>
        <AccordionPanel>One Content</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2" isDisabled>
        <AccordionButton>Button 2</AccordionButton>
        <AccordionPanel>Two Content</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionButton>Button 3</AccordionButton>
        <AccordionPanel>Three Content</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="4" isDisabled>
        <AccordionButton>Button 4</AccordionButton>
        <AccordionPanel>Four Content</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="5">
        <AccordionButton>Button 5</AccordionButton>
        <AccordionPanel>Five Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
