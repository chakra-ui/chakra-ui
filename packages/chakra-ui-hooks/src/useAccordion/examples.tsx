import React from "react";
import { storiesOf } from "@storybook/react";
import {
  useAccordion,
  useAccordionItem,
  AccordionItemProvider,
  useAccordionButton,
  useAccordionPanel,
} from "./useAccordion";

const stories = storiesOf("useAccordion", module);

function Accordion(props: any) {
  const { FocusManager, children } = useAccordion(props);
  return <FocusManager>{children}</FocusManager>;
}

function AccordionItem(props: any) {
  const accordionItem = useAccordionItem(props);
  return (
    <AccordionItemProvider>
      <div>{props.children}</div>
    </AccordionItemProvider>
  );
}

function AccordionButton(props: any) {
  const button = useAccordionButton(props);
  return <button {...props} {...button} />;
}

function AccordionPanel(props: any) {
  const panel = useAccordionPanel(props);
  return <div {...props} {...panel} />;
}

stories.add("Accordion", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>Toggle 1</AccordionButton>
      <AccordionPanel>
        Panel 1
        <Accordion>
          <AccordionItem>
            <AccordionButton>InnerButton 1</AccordionButton>
            <AccordionPanel>InnerPanel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>InnerButton 2</AccordionButton>
            <AccordionPanel>InnerPanel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Toggle 2</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));
