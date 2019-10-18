/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Select from "../Select";
import Box from "../Box";
import Stack from "../Stack";

const stories = storiesOf("Select", module);
stories.add("Default", () => <Select />);
stories.add("sizes", () => (
  <Box>
    <Stack>
      {["sm", "md", "lg"].map(size => (
        <Select placeholder="Placeholder" size={size} />
      ))}
    </Stack>
  </Box>
));
