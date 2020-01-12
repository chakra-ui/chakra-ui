import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../../core/src/story.setup";
import {
  Accordions,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from ".";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("Accordion", module).addDecorator(setup);

stories.add("default", () => (
  <Accordions>
    <Accordion>
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 1 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </Accordion>

    <Accordion>
      <AccordionButton>
        <chakra.div flex="1" textAlign="left">
          Section 2 title
        </chakra.div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </Accordion>
  </Accordions>
));

stories.add("allow multiple - default index", () => (
  <Accordions allowMultiple defaultIndex={[1]}>
    <Accordion>
      <AccordionButton>Section 1 title</AccordionButton>
      <AccordionPanel>Panel 1</AccordionPanel>
    </Accordion>

    <Accordion>
      <AccordionButton>Section 2 title</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </Accordion>
  </Accordions>
));
