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

const Box = createChakra({
  as: "button",
  hook: useTab,
});

stories.add("createChakra", () => (
  <Box
    isTruncated
    type="reset"
    marginX="20px"
    _hover={{ backgroundColor: "scale(X)", marginX: "auto" }}
    onKeyDown={event => {
      console.log(event);
    }}
  >
    This is an empowered box
  </Box>
));
