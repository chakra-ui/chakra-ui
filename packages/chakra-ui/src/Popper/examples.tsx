import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import { usePopper } from "@chakra-ui/hooks";
import { mergeTransform } from "@chakra-ui/utils";

const stories = storiesOf("Popper", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Example = () => {
  const [open, setOpen] = React.useState(false);
  const { reference, popper, arrow } = usePopper<
    HTMLButtonElement,
    HTMLDivElement,
    HTMLDivElement
  >({
    placement: "right",
  });

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <button ref={reference.ref}>hover me</button>
      <div
        ref={popper.ref}
        style={{
          ...popper.styles,
          transform:
            popper.styles.transform &&
            mergeTransform(popper.styles.transform, "translateX(30px)"),
        }}
        data-placement={popper.placement}
      >
        <div>Hello!</div>
        {/* <div ref={arrow.ref} style={arrow.styles} /> */}
      </div>
    </>
  );
};

stories.add("Default", () => <Example />);
