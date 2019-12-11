import React, { useState } from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, wait, fireEvent } from "@testing-library/react";
import { render } from "../../../../tests/utils";
import Collapse from "../Collapse";

afterEach(cleanup);

it("should render", () => {
  render(<Collapse>Content</Collapse>);
});

it("should hide content", () => {
  const { container, debug } = render(
    <Collapse isOpen={false}>Content</Collapse>,
  );

  expect(container.querySelector(".rah-static")).toHaveStyle(
    "height: 0px; overflow: hidden;",
  );
});

it("should display content", () => {
  const { container } = render(<Collapse isOpen>Content</Collapse>);

  expect(container.querySelector(".rah-static")).toHaveStyle(
    "height: auto; overflow: visible;",
  );
});

it("should set a starting height", () => {
  const { container } = render(
    <Collapse isOpen={false} startingHeight={20}>
      Content
    </Collapse>,
  );

  expect(container.querySelector(".rah-static")).toHaveStyle(
    "height: 20px; overflow: hidden;",
  );
});

it("should set an ending height", () => {
  const { container } = render(
    <Collapse isOpen endingHeight={10}>
      Content
    </Collapse>,
  );

  expect(container.querySelector(".rah-static")).toHaveStyle(
    "height: 10px; overflow: hidden;",
  );
});

it("sets animation start/end hooks", async () => {
  jest.useFakeTimers();
  const spy1 = jest.fn();
  const spy2 = jest.fn();

  function ComponentDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Collapse isOpen={isOpen} onAnimationStart={spy1} onAnimationEnd={spy2}>
          Content
        </Collapse>
        <button onClick={() => setIsOpen(true)}>toggle</button>
      </>
    );
  }

  const { getByText } = render(<ComponentDemo />);
  const button = getByText("toggle");

  if (button) {
    fireEvent.click(button);
  }

  jest.runAllTimers();

  expect(spy1).toHaveBeenCalled();
  expect(spy2).toHaveBeenCalled();
});
