import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import { Box } from ".";

const stories = storiesOf("Box", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("default", () => (
  <Box
    color={["tomato", "papaya"]}
    fontWeight="medium"
    _hover={{ bg: "red.500", color: "white" }}
  >
    Welcome to Box
  </Box>
));

stories.add("as prop", () => (
  <Box<React.ImgHTMLAttributes<any>, HTMLImageElement>
    rounded="sm"
    as="img"
    _hover={{ rounded: "md" }}
    margin={[3, 4]}
    src="https://avatars3.githubusercontent.com/u/14854048?s=180&v=4"
  />
));
