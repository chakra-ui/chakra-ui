/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Select from ".";
import Box from "../Box";
import Stack from "../Stack";

const stories = storiesOf("Select", module);

stories.add("Default", () => (
  <Select placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>
));

stories.add("sizes", () => (
  <Box>
    <Stack>
      {["sm", "md", "lg"].map(size => (
        <Select key={size} placeholder="Placeholder" size={size} />
      ))}
    </Stack>
  </Box>
));
