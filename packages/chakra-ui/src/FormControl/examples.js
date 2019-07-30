/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import FormControl, { FormLabel, HelperMessage } from ".";
import InputAddon from "../InputAddon";
import Input from "../Input";
import Box from "../Box";
import Flex from "../Flex";

const stories = storiesOf("FormControl", module);

stories.add("Default", () => (
  <Box maxWidth="sm" mx="auto">
    <FormControl id="boo">
      <FormLabel>How much you wan buy am?</FormLabel>
      <Flex>
        <InputAddon>https://</InputAddon>
        <Input rounded="0" placeholder="Welcome" />
        <InputAddon placement="right">.com</InputAddon>
      </Flex>
      <HelperMessage>Add your website here</HelperMessage>
    </FormControl>
  </Box>
));
