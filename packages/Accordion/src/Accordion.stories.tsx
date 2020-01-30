import { storiesOf } from "@storybook/react";
import * as React from "react";
import setup from "../story.setup";
import { BaseAccordion } from ".";
import {
  BaseAccordionItem,
  BaseAccordionButton,
  BaseAccordionPanel,
} from "./Accordion.base";

const stories = storiesOf("accordion", module).addDecorator(setup);

stories.add("basic", () => (
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
));
