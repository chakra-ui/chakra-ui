import { createChakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  AccordionItem,
  Accordion,
  useAccordionButton,
  useAccordionPanel,
} from "./useAccordion";

const stories = storiesOf("useAccordion", module);

const AccordionButton = createChakra({
  as: "button",
  hook: useAccordionButton,
});

const AccordionPanel = createChakra({
  as: "div",
  hook: useAccordionPanel,
});

stories.add("Accordion", () => (
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
