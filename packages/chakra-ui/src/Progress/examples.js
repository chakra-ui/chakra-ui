/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import Progress from ".";

const stories = storiesOf("Progress", module);
stories.add("Progress", () => {
  return (
    <Box maxWidth="400px" mx="auto" mt={8} p={3}>
      <Progress
        borderRadius="full"
        size="sm"
        color="green"
        value={20}
        // hasStripe
        // isAnimated
      />
      <br />
      <Progress size="sm" color="yellow" value={34} borderRadius="full" />
      <br />
    </Box>
  );
});
