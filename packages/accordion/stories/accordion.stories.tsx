import * as React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "../src"
import { chakra } from "@chakra-ui/system"
import { Container } from "@chakra-ui/layout"
import { AnimatePresence, motion } from "framer-motion"

export default {
  title: "Accordion",
  decorators: [(story: Function) => <Container>{story()}</Container>],
}

const Acc = ({ i, expanded, setExpanded }) => {
  const isOpen = i === expanded

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        Toggle
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            This approach is if you only want max one section open at a time. If
            you want multiple sections to potentially be open simultaneously,
            they can all be given their own `useState`.
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export const FramerExample = () => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = React.useState<false | number>(0)

  return accordionIds.map((i) => (
    <Acc i={i} expanded={expanded} setExpanded={setExpanded} />
  ))
}

const accordionIds = [0, 1, 2, 3]

/**
 * By default, only one accordion can be visible
 * at a time, and it can't be toggled.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
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
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 1 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 2 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
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
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 1 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 2 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
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
      <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
        <chakra.div flex="1" textAlign="left">
          Click me to see a different style
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
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

export function Bug_2160() {
  const inputRef = React.useRef<HTMLInputElement>()
  const [displayData, setDisplayData] = React.useState(data)
  const [filter, setFilter] = React.useState("")

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

  function onInputChange(e) {
    setFilter(e.target.value)
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
        <Accordion allowToggle>
          {displayData.map((item, i) => {
            return (
              <AccordionItem key={`accordion-item-${i}`}>
                <AccordionButton>
                  <chakra.div flex="1" textAlign="left">
                    {item.title}
                  </chakra.div>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>{item.text}</AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </chakra.div>
  )
}
