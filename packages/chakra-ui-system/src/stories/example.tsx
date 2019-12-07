import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { createChakra } from "../create-chakra";
import { createComponent } from "../create-component";
import { BoxHTMLProps } from "../system-props";

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

const Box = createChakra({
  as: "button",
  hook: useTab,
});

Box.displayName = "Box";
Box.defaultProps = {
  margin: "20px",
};

stories.add("createComponent", () => (
  <>
    <BaseBox
      type="button"
      onClick={event => {
        console.log(event);
      }}
    >
      Typical
    </BaseBox>
    <Box
      isTruncated
      onKeyDown={event => {
        console.log(event);
      }}
    >
      This is an empowered box
    </Box>
  </>
));
