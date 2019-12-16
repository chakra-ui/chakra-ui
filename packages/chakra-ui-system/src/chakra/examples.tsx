import { theme } from "@chakra-ui/theme";
import { ThemeContext } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import chakra from "./chakra";

const stories = storiesOf("chakra", module);

stories.addDecorator(story => (
  <ThemeContext.Provider
    value={{
      ...theme,
      styles: {
        h1: {
          fontSize: 40,
          margin: 30,
          color: "green.200",
        },
        h2: {
          fontSize: "2xl",
          margin: 10,
          color: "red.500",
        },
      },
    }}
  >
    {story()}
  </ThemeContext.Provider>
));

stories.add("chakra", () => (
  <>
    <h1>This is a heading</h1>
    <chakra.h1
      margin="0"
      color="red.400"
      transition="all 0.3s"
      pl="30px"
      _hover={{ color: "red.700" }}
    >
      This is chakra heading
    </chakra.h1>

    <chakra.a
      apply="styles.h1"
      textDecor="none"
      _hover={{ textDecor: "underline" }}
      ref={node => {
        console.log(node);
      }}
      href="www.google.com"
      target="__blank"
      rel="noreferrer"
    >
      This is anchor
    </chakra.a>

    <chakra.h2 apply="styles.h1" fontFamily="Inter">
      This is chakra heading
    </chakra.h2>

    <div>This is a normal div</div>
    <chakra.div bg="red.200" color="white">
      This is a chakra div
    </chakra.div>

    <chakra.img src="image.png" htmlHeight="900" />
  </>
));
