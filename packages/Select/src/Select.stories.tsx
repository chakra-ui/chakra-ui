import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  SelectProvider,
  useSelectOption,
  useSelectButton,
  useSelectListBox,
} from ".";
import data from "./data";
import styled from "@emotion/styled";
import setup from "../story.setup";

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

const stories = storiesOf("useSelect", module).addDecorator(setup);

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
      }}
    >
      {props.children}
    </div>
  );
}

export function SelectExample() {
  return (
    <SelectProvider>
      <SelectButton>Select</SelectButton>
      <SelectMenu>
        {data.map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </SelectMenu>
    </SelectProvider>
  );
}

stories.add("Default", () => <SelectExample />);
