import { storiesOf } from "@storybook/react";
import React from "react";
import setup from "../story.setup";
import useCounter from "./Counter.hook";
const stories = storiesOf("useCounter", module).addDecorator(setup);

function Counter() {
  const counter = useCounter({
    defaultValue: 1.53,
    max: 10,
    min: 0,
    step: 0.1,
    keepWithinRange: true,
    precision: 4,
    onChange: (num, str) => console.log({ num, str }),
  });

  return (
    <div>
      <div>current: {counter.value}</div>
      <br />
      <button
        // onKeyDown={event => {
        //   if (event.key === "Enter" || event.key === " ") {
        //     counter.incrementWithThrottle();
        //   }
        // }}
        // onMouseDown={counter.keepIncrementing}
        // onMouseUp={counter.stop}
        onClick={() => counter.increment()}
        disabled={counter.isAtMax}
      >
        Increment
      </button>
      <button
        // onKeyDown={event => {
        //   if (event.key === "Enter" || event.key === " ") {
        //     counter.decrementWithThrottle();
        //   }
        // }}
        onClick={() => counter.decrement()}
        // onMouseDown={counter.keepDecrementing}
        // onMouseUp={counter.stop}
        disabled={counter.isAtMin}
      >
        Decrement
      </button>
    </div>
  );
}

stories.add("default", () => <Counter />);
