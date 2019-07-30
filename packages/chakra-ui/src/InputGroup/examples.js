/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import InputGroup, { InputInnerAddon } from ".";
import Input from "../Input";
import Icon from "../Icon";
import Box from "../Box";
import InputAddon from "../InputAddon";
import Button from "../Button";

const stories = storiesOf("Input Group", module);

const size = "md";

stories.add("Default", () => (
  <Box display="flex" maxWidth="sm" mx="auto" mt={5}>
    <InputAddon size={size}>+234</InputAddon>

    <InputGroup size={size}>
      <InputInnerAddon>
        <Icon name="phone" size="1em" />
      </InputInnerAddon>

      <Input roundedLeft="0" placeholder="Welcome" />

      <InputInnerAddon placement="right">
        <Button color="blue" size="sm" my="3px" mx={1}>
          Submits
        </Button>
      </InputInnerAddon>
    </InputGroup>
  </Box>
));
