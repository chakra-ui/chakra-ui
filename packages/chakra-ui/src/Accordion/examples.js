import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
} from ".";
import Icon from "../Icon";
import Box from "../Box";

const stories = storiesOf("Accordion", module).addDecorator(story => (
  <Box maxW="sm" mx="auto" mt={5}>
    {story()}
  </Box>
));

stories.add("default", () => (
  <Accordion>
    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("allow toggle", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("allow multiple", () => (
  <Accordion allowMultiple>
    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
));

stories.add("styling expanded state", () => (
  <AccordionItem>
    <AccordionHeader _expanded={{ bg: "red.100", color: "red.500" }}>
      Section title
    </AccordionHeader>
    <AccordionPanel>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
));

stories.add("using render prop with icon", () => (
  <AccordionItem>
    {({ isExpanded }) => (
      <Fragment>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            Section 2 title
          </Box>
          <Icon size="12px" name={isExpanded ? "minus" : "add"} />
        </AccordionHeader>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </Fragment>
    )}
  </AccordionItem>
));
