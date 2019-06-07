/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useContext } from "react";
import Icon, { iconPaths } from "../src/Icon";
import { Box, Flex } from "../src/Layout";
import Text from "../src/Text";

const stories = storiesOf("Primitives", module);

const Colors = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Flex>
      {[
        colors.cyan,
        colors.blue,
        colors.linkedin,
        colors.yellow,
        colors.teal,
        colors.green,
        colors.gray
      ].map(set => (
        <Flex flex="1" flexDirection="column" height="100vh">
          {Object.values(set).map(color => (
            <Box flex="1" bg={color} />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

stories.add("Colors", () => {
  return <Colors />;
});

stories.add("Icons", () =>
  Object.keys(iconPaths).map(icon => (
    <Flex
      border="normal"
      borderColor="gray.100"
      minWidth="100px"
      p={3}
      mr={2}
      mb={2}
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
    >
      <Icon name={icon} size="24px" />
      <Text mt={2} fontSize="xs" textAlign="center">
        {icon}
      </Text>
    </Flex>
  ))
);
