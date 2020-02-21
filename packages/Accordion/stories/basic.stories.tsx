import * as React from "react"
import {
  BaseAccordion,
  BaseAccordionButton,
  BaseAccordionItem,
  BaseAccordionPanel,
} from "../src/Accordion.base"

export default {
  title: "Accordion",
}

export const Basic = () => (
  <BaseAccordion>
    <BaseAccordionItem>
      <BaseAccordionButton>Section 1 title</BaseAccordionButton>
      <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
    </BaseAccordionItem>

    <BaseAccordionItem>
      <BaseAccordionButton>Section 2 title</BaseAccordionButton>
      <BaseAccordionPanel>Panel 2</BaseAccordionPanel>
    </BaseAccordionItem>
  </BaseAccordion>
)
