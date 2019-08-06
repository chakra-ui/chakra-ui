import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import Accordion, { AccordionHeader, AccordionPanel } from ".";
import Icon from "../Icon";
import Box from "../Box";
import Avatar from "../Avatar";

const stories = storiesOf("Accordion", module);

stories.add("Default", () => (
  <Accordion maxWidth="sm" mx="auto" mt={5} bg="blackAlpha.100">
    <AccordionHeader px={4} py={2}>
      Uzumaki Naruto
    </AccordionHeader>
    <AccordionPanel px={4} pt={2} pb={4} display="flex">
      <Avatar
        src="https://resizing.flixster.com/wTgvsiM8vNLhCcCH-6ovV8n5z5U=/300x300/v1.bjsyMDkxMzI5O2o7MTgyMDQ7MTIwMDsxMjAwOzkwMA"
        size="lg"
        name="Naruto"
        mr={3}
      />
      <Box fontSize="sm">
        Naruto is a Japanese manga series written and illustrated by Masashi
        Kishimoto. The eponymous protagonist, Naruto Uzumaki, is a young ninja
        who seeks recognition from his peers and also dreams of becoming the
        Hokage, the leader of his village.
      </Box>
    </AccordionPanel>
  </Accordion>
));

stories.add("styling expanded state", () => (
  <Accordion maxWidth="sm" mx="auto" mt={5} bg="blackAlpha.50">
    <AccordionHeader
      px={4}
      py={2}
      _expanded={{
        bg: "blackAlpha.100",
        fontWeight: "semibold",
        roundedBottom: "0",
      }}
    >
      Uchiha Sasuke
    </AccordionHeader>
    <AccordionPanel px={4} py={2} display="flex">
      <Avatar
        src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
        size="lg"
        name="Sasuke"
        mr={3}
      />
      <Box fontSize="sm">
        Sasuke Uchiha is a fictional character in the Naruto manga and anime
        franchise created by Masashi Kishimoto. Sasuke belongs to the Uchiha
        clan, a notorious ninja family, and one of the most powerful, allied
        with Konohagakure
      </Box>
    </AccordionPanel>
  </Accordion>
));

stories.add("using render prop with icon", () => (
  <Accordion maxWidth="sm" mx="auto" mt={5} bg="gray.50">
    <AccordionHeader
      px={4}
      py={2}
      _expanded={{ bg: "red.100", roundedBottom: "0" }}
    >
      {({ isExpanded }) => {
        return (
          <Fragment>
            <Box flex="1" textAlign="left">
              Uchiha Itachi
            </Box>
            <Icon size="12px" name={isExpanded ? "minus" : "add"} />
          </Fragment>
        );
      }}
    </AccordionHeader>
    <AccordionPanel px={4} py={2} display="flex">
      <Avatar
        src="https://vignette.wikia.nocookie.net/naruto/images/b/bb/Itachi.png/revision/latest/scale-to-width-down/300?cb=20160125182202"
        size="lg"
        mr={3}
        name="Itachi"
      />
      <Box flex="1">
        Itachi Uchiha is a fictional character in the Naruto manga and anime
        series created by Masashi Kishimoto. Itachi is the older brother of
        Sasuke Uchiha and is responsible for killing all the members of their
        clan, sparing only Sasuke.
      </Box>
    </AccordionPanel>
  </Accordion>
));
