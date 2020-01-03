import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "./Accordion";

const stories = storiesOf("Accordion", module).addDecorator(setup);

stories.add("default", () => (
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
