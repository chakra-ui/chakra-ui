import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Skeleton from ".";

const stories = storiesOf("Skeleton", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Default", () => {
  return <Skeleton height="20px" />;
});

stories.add("as Container", () => {
  return (
    <Skeleton>
      <span>Chakra ui is cool</span>
    </Skeleton>
  );
});

stories.add("isLoaded after 1 second", () => {
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  return (
    <Skeleton width="100px" isLoaded={isLoaded}>
      <span>Chakra ui is cool</span>
    </Skeleton>
  );
});

stories.add("with borderRadius", () => {
  return <Skeleton size="100px" borderRadius="100px" />;
});
