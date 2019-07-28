/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useContext } from "react";
import Icon from ".";
import Text from "../Text";
import Flex from "../Flex";

const stories = storiesOf("Icons", module);

const Icons = () => {
  const { icons: iconPaths } = useContext(ThemeContext);
  return Object.keys(iconPaths).map(icon => (
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
      <Text mt={2} fontSize="sm" textAlign="center">
        {icon}
      </Text>
    </Flex>
  ));
};

stories.add("Default", () => <Icons />);
