import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from ".";
import { createThemeContext } from "@chakra-ui/system";
import theme from "@chakra-ui/preset-base";

const [ThemeProvider] = createThemeContext(theme);

const stories = storiesOf("Box", module);

stories.addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

stories.add("default", () => (
  <Box
    color="tomato"
    fontWeight="medium"
    _hover={{ bg: "red.500", color: "white" }}
  >
    Welcome to Box
  </Box>
));

stories.add("as prop + generic", () => (
  <Box<React.ImgHTMLAttributes<any>>
    rounded="sm"
    as="img"
    _hover={{ rounded: "md" }}
    margin={[3, 4]}
    src="https://avatars3.githubusercontent.com/u/14854048?s=180&v=4"
  />
));
