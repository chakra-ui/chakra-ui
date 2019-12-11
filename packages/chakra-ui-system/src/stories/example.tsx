import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "../create-chakra";
import createComponent from "../create-component";

const stories = storiesOf("", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

interface TabOptions {
  isDisabled?: boolean;
  value?: string;
  onClick?: React.MouseEventHandler;
}

const useTab = (props: TabOptions) => {
  return {
    ...props,
    role: "tab",
    disabled: props.isDisabled,
    "aria-disabled": props.isDisabled,
    "data-value": props.value,
    onClick: (event: React.MouseEvent) => {
      props.onClick && props.onClick(event);
      console.log("useTab click");
    },
  };
};

const BaseBox = createComponent({
  as: "button",
  hook: useTab,
});

stories.add("createComponent", () => (
  <BaseBox
    type="button"
    onClick={event => {
      console.log(event);
    }}
  >
    Typical
  </BaseBox>
));

// createComponent as, swaps out the base element completely
// so you can't pass props from the base element

stories.add("createComponent with as", () => (
  <BaseBox
    as="a"
    target="blank"
    type="button"
    onClick={event => {
      console.log(event);
    }}
  >
    Typical
  </BaseBox>
));

const Box = createChakra({
  as: "button",
  hook: useTab,
  baseProps: {
    tabIndex: 0,
    _hover: { color: "green" },
    isDisabled: true,
  },
});

stories.add("createChakra", () => (
  <Box
    as="a"
    onKeyDown={event => {
      console.log(event);
    }}
    margin="20px"
  >
    This is a box
  </Box>
));

type LinkProps = React.HTMLProps<HTMLLinkElement>;

// createChakra as, extends the functionality of `styled` as
// You should be able to pass the props from base and the new element

stories.add("createChakra with generics", () => (
  <Box<LinkProps>
    as="a"
    ref={node => {
      console.log(node);
    }}
    onKeyDown={event => {
      console.log(event);
    }}
    margin="20px"
  >
    This is a box
  </Box>
));
