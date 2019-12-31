/**@jsx jsx */
import { theme } from "@chakra-ui/theme";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import setup from "../../chakra/stories/setup";
import { sanitize, clean } from "../utils";
import createChakra from "../create-chakra";

const NewLink = sanitize(Link);

const stories = storiesOf("createChakra + hooks", module);

stories.addDecorator(setup);

const useTab = (props: { id?: string; isSelected?: boolean }) => {
  React.useEffect(() => {
    console.log("mounted");
  }, []);

  return {
    ...props,
    role: "tab",
    id: props.id,
    "data-selected": props.isSelected,
    tabIndex: -1,
  };
};

const Tab = createChakra(NewLink, {
  themeKey: "components.Button",
  hook: useTab,
});

stories.add("react-router + hooks", () => (
  <BrowserRouter>
    <Tab
      to="/home"
      replace
      isSelected
      variantSize="sm"
      variantColor="pink"
      variant="solid"
      textDecor="none"
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

stories.add("caveat 1", () => (
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

stories.add("caveat 2", () => (
  <ChakraTabbable margin="30px" color="green.500" isInvalid isSelected>
    This is a tab
  </ChakraTabbable>
));
