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
  <Accordion allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton>Toggle 1</AccordionButton>
      </h2>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>Toggle 2</AccordionButton>
      </h2>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));
