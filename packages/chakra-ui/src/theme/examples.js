/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";

const stories = storiesOf("Theme", module);
stories.add("Spacing", () => (
  <div>
    {Array(18)
      .fill(1)
      .map((_, size) => (
        <Box width={size} height="24px" mb={2} bg="pink.100" />
      ))}
  </div>
));
