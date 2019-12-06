import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { createChakra } from "../create-chakra";
import { createComponent } from "../create-component";
import { BoxHTMLProps } from "../system-props";

const stories = storiesOf("", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

const Box = createChakra({
  as: "div",
});

interface TabOptions {
  isDisabled?: boolean;
  value?: string;
}

const useTab = (props: TabOptions & BoxHTMLProps) => {
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
  as: "div",
});

stories.add("createComponent", () => (
  <>
    <Box
      isTruncated
      onKeyDown={event => {
        console.log(event);
      }}
    >
      This is an empowered box
    </Box>
    <BaseBox>Typical </BaseBox>
  </>
));
