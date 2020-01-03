import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "./Accordion";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("Accordion", module).addDecorator(setup);

stories.add("default", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 1 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton>Toggle 2</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));
