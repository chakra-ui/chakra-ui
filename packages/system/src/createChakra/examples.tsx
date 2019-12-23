/**@jsx jsx */
import { jsx } from "@emotion/core";
import { theme } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import createThemeContext from "../create-theme-context";
import createChakra from "./create-chakra";
import { chakra } from "../chakra";

const [ThemeProvider] = createThemeContext({
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
});

const stories = storiesOf("createChakra", module);

stories.addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

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

const Button = createChakra("button", { hook: useTab });

function Bacon(props: any) {
  return (
    <chakra.div {...props}>
      <button>This is menu disclosure</button>
      <div>This is menu</div>
    </chakra.div>
  );
}

stories.add("as prop", () => (
  <Button
    as={Bacon}
    margin="20px"
    borderTop="2px solid crimson"
    css={{ background: "tomato" }}
  />
));
