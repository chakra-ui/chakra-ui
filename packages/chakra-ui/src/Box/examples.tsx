import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from ".";

const stories = storiesOf("Components", module);

stories.add("default", () => (
  <Box<React.ImgHTMLAttributes<any>>
    src="naa.png"
    as="img"
    size="40px"
    _hover={{ bg: "red" }}
  ></Box>
));
