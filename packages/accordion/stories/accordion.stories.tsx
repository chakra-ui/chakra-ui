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

export default {
  title: "Accordion",
  decorators: [(story: Function) => <Container>{story()}</Container>],
}

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
