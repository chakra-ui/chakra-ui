import { theme } from "@chakra-ui/theme";
import { ThemeContext } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "./create-chakra";
import { BrowserRouter, Link, LinkProps } from "react-router-dom";

const stories = storiesOf("createChakra", module);

stories.addDecorator(story => (
  <ThemeContext.Provider
    value={{
      ...theme,
      components: {
        tab: {
          variantSize: {
            sm: {
              fontSize: 24,
              padding: 20,
            },
            md: {
              fontSize: 40,
              padding: 40,
            },
          },
        },
      },
    }}
  >
    {story()}
  </ThemeContext.Provider>
));

const useTab = (props: { id?: string; isSelected?: boolean }) => {
  return {
    ...props,
    role: "tab",
    id: props.id,
    "data-selected": props.isSelected,
    tabIndex: -1,
  };
};

const Tab = createChakra(Link, {
  themeKey: "components.tab",
  hook: useTab,
});

stories.add("with hooks", () => (
  <BrowserRouter>
    <Tab<{ ref?: React.Ref<HTMLAnchorElement> }>
      to="/home"
      replace
      isSelected
      variantSize="sm"
      margin="30px"
      fontSize="40px"
      onClick={() => {
        console.log("clicked");
      }}
      children="Welcome to create chakra"
    />
  </BrowserRouter>
));
