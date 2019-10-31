import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { SelectExample } from "./useSelect";
// import useLogger from "./useLogger";
import {
  useSelection,
  useSelectionState,
  UseSelectionOptions,
} from "./useSelection/useSelection";
import useFocusEffect from "./useFocusEffect";

const stories = storiesOf("Hooks", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Item: React.FC<UseSelectionOptions> = ({ state, actions, id }) => {
  const ss = useSelection({ state, actions, id });
  const isFocused = state.focusedId === id;
  const isSelected = state.selectedId === id;

  useFocusEffect(isFocused, ss.ref);

  return (
    <button
      ref={ss.ref}
      tabIndex={isFocused ? 0 : -1}
      id={id}
      onClick={() => actions.mouse_select(ss.id)}
      onKeyDown={e => {
        if (e.key === "Enter") {
          e.preventDefault();
          actions.keyboard_select();
        }
        if (e.key === "ArrowRight") {
          actions.next("keyboard-select");
        }
        if (e.key === "ArrowLeft") {
          actions.previous("keyboard-select");
        }
        if (e.key === "End") {
          actions.last();
        }
        if (e.key === "Home") {
          actions.first();
        }
      }}
    >
      Button {id} {isSelected && "selected"}
    </button>
  );
};

const Selection = () => {
  const ss = useSelectionState({
    loop: true,
    selectOnFocus: false,
    onSelect: item => console.log(item),
    defaultSelectedId: "tab3",
  });

  return (
    <div>
      <Item id="tab1" {...ss}>
        Welcome 1
      </Item>
      <Item id="tab2" {...ss}>
        Welcome 2
      </Item>
      <Item id="tab3" {...ss}>
        Welcome 2
      </Item>
    </div>
  );
};

stories.add("Test", () => <Selection />);
stories.add("Select", () => <SelectExample />);
