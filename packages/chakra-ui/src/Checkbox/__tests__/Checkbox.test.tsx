import React, { useState } from "react";
import { cleanup, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import Checkbox, { CheckboxOptions } from "../Checkbox";

afterEach(cleanup);

const renderComponent = (props: CheckboxOptions = {}) => {
  return render(
    <Checkbox onChange={jest.fn()} {...props}>
      checkbox
    </Checkbox>,
  );
};

it("should render", () => {
  renderComponent();
});

it("should display children", () => {
  const { getByText } = renderComponent();

  expect(getByText("checkbox")).toBeInTheDocument();
});

it("should display a disabled checkbox", () => {
  const { getByText, container } = renderComponent({ isDisabled: true });
  const input = container.querySelector("input");

  expect(input).toHaveAttribute("disabled");
  expect(getByText("checkbox").parentNode).toHaveStyle("cursor: not-allowed;");
});

it("should display a checkbox with a checked state", () => {
  const { container } = renderComponent({ isChecked: true });
  const input = container.querySelector("input");

  expect(input).toHaveAttribute("checked");
});

it("should display a checkbox with an unchecked state", () => {
  const { container } = renderComponent({ isChecked: false });
  const input = container.querySelector("input");

  expect(input).not.toHaveAttribute("checked");
});

it("should toggle checkbox state", async () => {
  const Component = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Checkbox
        isChecked={isChecked}
        onChange={e => setIsChecked(e.target.checked)}
      />
    );
  };

  const { container } = render(<Component />);
  const label = container.querySelector("label");
  const input = container.querySelector("input");

  expect(input).toHaveAttribute("aria-checked", "false");

  act(() => {
    label && fireEvent.click(label);
  });

  expect(input).toHaveAttribute("aria-checked", "true");
});

it("should have a checked state when setting defaultIsChecked", () => {
  const { container } = renderComponent({ defaultIsChecked: true });
  const input = container.querySelector("input");

  expect(input).toHaveAttribute("checked");
});
