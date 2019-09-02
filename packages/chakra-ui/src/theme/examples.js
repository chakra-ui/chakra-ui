/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import { useTheme } from "../ThemeProvider";

const stories = storiesOf("Theme", module);
stories.add("Spacing", () => {
  function Ex() {
    const theme = useTheme();
    const sizes = Object.keys(theme.space);
    return (
      <Box>
        {sizes.map(size => (
          <Box width={size} height={6} mb={2} bg="pink.100" />
        ))}
      </Box>
    );
  }
  return <Ex />;
});
