/**@jsx jsx */
import { theme } from "@chakra-ui/theme";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import createThemeContext from "../create-theme-context";
import { isPropValid } from "../system";
import createChakra from "./create-chakra";
import { sanitize, clean } from "./utils";

const NewLink = sanitize(Link);

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

stories.add("react-router + hooks", () => (
  <BrowserRouter>
    <Tab
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

const Bacon = (props: any) => (
  <div {...props}>
    <button>This is menu disclosure</button>
    <div>This is menu</div>
  </div>
);

stories.add("as prop", () => (
  <Button
    as={sanitize(Bacon)}
    margin="20px"
    borderTop="2px solid crimson"
    css={{ background: "tomato" }}
  />
));

const Tabbable = ({ isInvalid, ...props }: { isInvalid?: boolean }) => (
  <div role="checkbox" aria-invalid={isInvalid} {...clean(props)} />
);

const ChakraTabbable = createChakra(Tabbable, {
  hook: useTab,
});

stories.add("beesama test", () => (
  <ChakraTabbable isInvalid isSelected>
    This is a tab
  </ChakraTabbable>
));
