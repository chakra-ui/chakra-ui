import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import Button, { ButtonOptions } from "../Button";

afterEach(cleanup);

const renderComponent = (props: Omit<ButtonOptions, "children"> = {}) => {
  return render(<Button {...props}>Button</Button>);
};

it("should render", () => {
  renderComponent();
});

it("should display children", () => {
  const { getByText } = renderComponent();

  expect(getByText("Button")).toBeInTheDocument();
});

it("should display button with left icon", () => {
  const { container } = renderComponent({ leftIcon: "email" });

  expect(container.querySelector("button > svg")).toBeInTheDocument();
});

it("should display button with right icon", () => {
  const { container } = renderComponent({ rightIcon: "email" });

  expect(container.querySelector("button > svg")).toBeInTheDocument();
});

xit("should display spinner and hide text", () => {
  // TODO: find a way to easily grab the spinner element
  const { container, getByText, getByTestId } = renderComponent({
    isLoading: true,
  });
  const button = container.querySelector("button");

  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-disabled", "true");
  expect(button).toHaveAttribute("data-loading", "true");

  expect(getByTestId("Spinner")).toBeInTheDocument();
  expect(getByText("Button")).toHaveStyle("opacity: 0");
});

xit("should display spinner with text", () => {
  // TODO: find a way to easily grab the spinner element
  const { getByText, getByTestId } = renderComponent({
    isLoading: true,
    loadingText: "Submitting",
  });

  expect(getByText("Submitting")).toBeInTheDocument();
  expect(getByTestId("Spinner")).toBeInTheDocument();
});

it("should display a custom spinner", () => {
  const { getByText, queryByTestId } = renderComponent({
    isLoading: true,
    spinnerComponent: () => <div>custom spinner</div>,
  });

  expect(queryByTestId("Spinner")).not.toBeInTheDocument();
  expect(getByText("custom spinner")).toBeInTheDocument();
});

it("should display a disabled button", () => {
  const { getByText } = renderComponent({
    isDisabled: true,
  });

  expect(getByText("Button")).toHaveAttribute("disabled");
});
