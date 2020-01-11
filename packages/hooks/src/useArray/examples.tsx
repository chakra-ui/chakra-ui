import { storiesOf } from "@storybook/react";
import React from "react";
import useArray from "./useArray";

const stories = storiesOf("useArray", module);

function useInput(props: any = {}) {
  const [value, setValue] = React.useState(props.defaultValue || "");

  const ref = React.useRef<HTMLInputElement>(null);

  const onChange = React.useCallback(event => {
    setValue(event.target.value);
  }, []);

  const clearValue = React.useCallback(() => {
    setValue("");
  }, []);

  const focus = React.useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return {
    bind: {
      ...props,
      ref,
      value,
      onChange,
    },
    helpers: {
      clearValue,
      focus,
    },
  };
}

function Example() {
  const { value, removeAt, add, isOutOfRange } = useArray({
    defaultValue: ["option 1"],
    max: 3,
    keepWithinMax: false,
  });

  const input = useInput();

  return (
    <div>
      {value.map((item, idx) => (
        <div key={item}>
          {item} - <button onClick={() => removeAt(idx)}>Delete</button>
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          add(input.bind.value);
          input.helpers.clearValue();
          input.helpers.focus();
        }}
      >
        <input {...input.bind} />
        <button type="submit">Add new item</button>
      </form>
      {isOutOfRange && <p>Hey! You're out of range</p>}
    </div>
  );
}

stories.add("Default", () => <Example />);
