import { Box } from "@chakra-ui/layout";
import { createChakra } from "@chakra-ui/system";
import { Icon } from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  useAccordionButton,
  useAccordionPanel,
  useAccordionItemState,
} from "./useAccordion";

const stories = storiesOf("useAccordion", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

const AccordionButton = createChakra("button", {
  hook: useAccordionButton,
});

const AccordionPanel = createChakra("div", {
  hook: useAccordionPanel,
});

stories.add("Accordion", () => (
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

const AccordionHeader = createChakra("div", {
  hook: useAccordionButton,
});

const AccordionIcon = (props: any) => {
  const { isDisabled, isOpen } = useAccordionItemState();
  return (
    <Icon
      aria-hidden
      focusable="false"
      size="1.25em"
      name={isOpen ? "chevron-up" : "chevron-down"}
      opacity={isDisabled ? 0.4 : 1}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  );
};

stories.add("Chakra Accordion", () => (
  <Accordion allowMultiple>
    <AccordionItem>
      <AccordionHeader
        px={4}
        py={2}
        width="100%"
        display="flex"
        alignItems="center"
        transition="all 0.2s"
        borderBottom="1px solid red"
        _focus={{ boxShadow: "outline" }}
        _hover={{ bg: "blackAlpha.50" }}
        _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
      >
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel px={4} py={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeader
        px={4}
        py={2}
        width="100%"
        display="flex"
        alignItems="center"
        transition="all 0.2s"
        borderBottom="1px solid red"
        _focus={{ boxShadow: "outline" }}
        _hover={{ bg: "blackAlpha.50" }}
        _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
      >
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel px={4} py={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
));
