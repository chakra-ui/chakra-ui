import { storiesOf } from "@storybook/react";
import * as React from "react";
import chakra from "../chakra";
import setup from "./setup";

const stories = storiesOf("chakra", module);

stories.addDecorator(setup);

stories.add("default", () => (
  <div>
    <chakra.h1
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
      href="www.google.com"
      target="__blank"
      rel="noreferrer"
    >
      This is anchor
    </chakra.a>

    <chakra.div bg="red.200" color="white">
      This is a chakra div
    </chakra.div>

    <chakra.img src="image.png" htmlHeight="900" />
  </div>
));
