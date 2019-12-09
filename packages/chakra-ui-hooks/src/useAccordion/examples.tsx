import { Box } from "@chakra-ui/layout";
// import { Collapse } from "@chakra-ui/core"
import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  AccordionItemProvider,
  useAccordion,
  useAccordionButton,
  useAccordionItem,
  useAccordionPanel,
} from "./useAccordion";

const stories = storiesOf("useAccordion", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

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

function ChakraAccordionButton(props: any) {
  const button = useAccordionButton(props);
  return (
    //@ts-ignore
    <Box<ButtonType>
      {...button}
      display="flex"
      alignItems="center"
      width="100%"
      transition="all 0.2s"
      _focus={{ boxShadow: "outline" }}
      _hover={{ bg: "blackAlpha.50" }}
      _disabled={{ opacity: "0.4", cursor: "not-allowed" }}
      as="button"
      type="button"
      outline="0"
      px={4}
      py={2}
      {...props}
    />
  );
}

function ChakraAccordionPanel(props: any) {
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

stories.add("Chakra Accordion", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <ChakraAccordionButton>Toggle 1</ChakraAccordionButton>
      <ChakraAccordionPanel>
        Panel 1
        <Accordion>
          <AccordionItem>
            <ChakraAccordionButton>InnerButton 1</ChakraAccordionButton>
            <ChakraAccordionPanel>InnerPanel 1</ChakraAccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <ChakraAccordionButton>InnerButton 2</ChakraAccordionButton>
            <ChakraAccordionPanel>InnerPanel 2</ChakraAccordionPanel>
          </AccordionItem>
        </Accordion>
      </ChakraAccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <ChakraAccordionButton>Toggle 2</ChakraAccordionButton>
      <ChakraAccordionPanel>Panel 2</ChakraAccordionPanel>
    </AccordionItem>
  </Accordion>
));
