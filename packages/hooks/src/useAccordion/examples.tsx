import { createChakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  useAccordionButton,
  useAccordionPanel,
} from "./useAccordion";

const stories = storiesOf("useAccordion", module);

const AccordionButton = createChakra("button", {
  hook: useAccordionButton,
});

AccordionButton.defaultProps = {
  display: "block",
  width: "100%",
  border: 0,
  borderBottom: "1px solid #e2e2e2",
  padding: "16px 20px",
  fontWeight: 600,
  textAlign: "left",
  fontSize: "16px",
  _expanded: {
    bg: "lightgray",
  },
};

const AccordionPanel = createChakra("div", {
  hook: useAccordionPanel,
});

AccordionPanel.defaultProps = {
  padding: "16px",
  fontFamily: "system-ui",
};

stories.add("default", () => (
  <Accordion>
    <AccordionItem>
      <AccordionButton>Toggle 1</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Toggle 2</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("allow toggle", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>Toggle 1</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Toggle 2</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("allow multiple", () => (
  <Accordion allowMultiple>
    <AccordionItem>
      <AccordionButton>Section 1 title</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Section 2 title</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("allow multiple - default index", () => (
  <Accordion allowMultiple defaultIndex={[1]}>
    <AccordionItem>
      <AccordionButton>Section 1 title</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Section 2 title</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));
