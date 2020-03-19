import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Skeleton from ".";
import { Text, ColorModeProvider, CSSReset, Stack } from "../";

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

stories.add("no fade in", () => {
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  return (
    <Skeleton fadeInDuration={0} width="100px" isLoaded={isLoaded}>
      <span>Chakra ui is cool</span>
    </Skeleton>
  );
});

stories.add("with borderRadius", () => {
  return <Skeleton size="100px" borderRadius="100px" />;
});

stories.add("isLoaded loop", () => {
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const intervalId = setInterval(() => setLoaded(x => !x), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box position="relative">
      <Box height="100px" border="solid 1px black">
        Content
      </Box>
      <Skeleton width="100px" isLoaded={isLoaded}>
        <span>Chakra ui is cool</span>
      </Skeleton>
      <Box height="100px" border="solid 1px black">
        Content
      </Box>
    </Box>
  );
});

stories.add("with custom speed", () => {
  return <Skeleton size="100px" speed={2.4} borderRadius="100px" />;
});

stories.add("with dark mode", () => {
  return (
    <ColorModeProvider value="dark">
      <CSSReset />
      <Stack>
        <Text>Some text</Text>
        <Skeleton size="100px" />
        <Skeleton size="100px" />
        <Skeleton size="100px" />
      </Stack>
    </ColorModeProvider>
  );
});
