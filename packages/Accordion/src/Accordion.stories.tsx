import * as React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "./Accordion"

export default {
  title: "Accordion",
}

export const Basic = () => (
  <Accordion>
    <AccordionItem>
      <AccordionButton>Section 1 title</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Section 2 title</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
)
