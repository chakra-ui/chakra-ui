import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import CloseButton from "../CloseButton";

it("should render", () => {
  render(<CloseButton />);
});

it("should allow setting a custom aria-label for the button", () => {
  const { container } = render(<CloseButton aria-label="my aria label" />);

  expect(container.querySelector("button")).toHaveAttribute(
    "aria-label",
    "my aria label",
  );
});

test('a11y - should have aria-label set to "Close"', () => {
  const { container } = render(<CloseButton />);

  expect(container.querySelector("button")).toHaveAttribute(
    "aria-label",
    "Close",
  );
});
