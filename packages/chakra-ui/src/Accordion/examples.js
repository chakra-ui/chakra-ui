/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Accordion, { AccordionHeader, AccordionPanel } from ".";

const stories = storiesOf("Accordion", module);

stories.add("Default", () => (
  <Accordion maxWidth="sm" mx="auto" mt={5} bg="gray.50">
    <AccordionHeader px={4} py={2} _expanded={{ py: 3, bg: "red.100" }}>
      Personal Info
    </AccordionHeader>
    <AccordionPanel px={4} py={2}>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
      richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
      dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
      moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
      assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
      wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
      butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
      aesthetic synth nesciunt you probably haven't heard of them accusamus
      labore sustainable VHS.
    </AccordionPanel>
  </Accordion>
));
