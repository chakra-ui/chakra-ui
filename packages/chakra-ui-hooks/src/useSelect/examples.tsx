import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "@chakra-ui/theme";
import {
  SelectProvider,
  useSelectOption,
  useSelectButton,
  useSelectListBox,
} from "./useSelect";
// import { countryList } from "./data";
import list2 from "./data2";
import styled from "@emotion/styled";

const StyledOption = styled.div`
  &[data-highlighted] {
    background: tomato;
    color: white;
  }

  &[data-selected] {
    background: yellow;
    color: black;
  }
`;

const stories = storiesOf("useSelect", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

function Option(props: any) {
  const option = useSelectOption(props);
  return (
    <StyledOption
      style={{
        padding: "0 2px 1px 2px",
        whiteSpace: "pre",
        minHeight: "1.2em",
      }}
      {...option}
    >
      {props.children}
    </StyledOption>
  );
}

function SelectButton(props: any) {
  const { selected, ...button } = useSelectButton(props);
  return (
    <button {...(button as any)}>
      {selected ? button["data-selected-text"] : props.children}
    </button>
  );
}

function SelectMenu(props: any) {
  const listbox = useSelectListBox(props);
  return (
    <div
      {...listbox}
      style={{
        maxWidth: 400,
        height: 400,
        overflow: "auto",
        background: "white",
        ...listbox.style,
      }}
    >
      {props.children}
    </div>
  );
}

export function SelectExample() {
  console.log(list2.length);
  return (
    <SelectProvider defaultValue="Claus">
      <SelectButton>Select</SelectButton>
      <SelectMenu>
        {list2.map(list => (
          <Option key={list.value} value={list.value}>
            {list.label}
          </Option>
        ))}
      </SelectMenu>
    </SelectProvider>
  );
}

stories.add("Default", () => <SelectExample />);
