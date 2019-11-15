import React from "react";
import { storiesOf } from "@storybook/react";
import { Icon } from ".";
import { Text, Flex } from "@chakra-ui/layout";
import { ThemeProvider, CSSReset, useTheme } from "@chakra-ui/theme";

const stories = storiesOf("Icons", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Icons = () => {
  const { icons: iconPaths } = useTheme();
  return (
    <>
      {Object.keys(iconPaths).map(icon => (
        <Flex
          border="normal"
          borderColor="gray.100"
          minWidth="100px"
          padding={3}
          marginRight={2}
          marginBottom={2}
          display="inline-flex"
          flexDirection="column"
          alignItems="center"
        >
          <Icon name={icon as any} size="24px" />
          <Text mt={2} fontSize="sm" textAlign="center">
            {icon}
          </Text>
        </Flex>
      ))}
    </>
  );
};

stories.add("Default", () => <Icons />);
