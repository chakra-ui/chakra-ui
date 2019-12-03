import React, { useState } from "react";
import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  statuses,
} from "../Alert";

afterEach(cleanup);

const renderComponent = (props = {}) => {
  return render(
    <Alert {...props}>
      <AlertIcon />
      <AlertTitle>alert title</AlertTitle>
      <AlertDescription>alert description</AlertDescription>
    </Alert>,
  );
};

it("should render", () => {
  renderComponent();
});

it.each([
  ["info", statuses.info.icon],
  ["warning", statuses.warning.icon],
  ["success", statuses.success.icon],
  ["error", statuses.error.icon],
])(
  "it should automatically set AlertIcon's icon based on %s status",
  (status, iconName: string) => {
    const { getByTestId } = renderComponent({ status });

    expect(getByTestId(`icon-${iconName}`)).toBeInTheDocument();
  },
);

it("should override icon if set explicitly", () => {
  const { getByTestId } = render(
    <Alert status="error">
      <AlertIcon name="add" />
    </Alert>,
  );

  expect(getByTestId(`icon-add`)).toBeInTheDocument();
});

it("should display title", () => {
  const { getByText } = renderComponent();

  expect(getByText("alert title")).toBeInTheDocument();
});

it("should display description", () => {
  const { getByText } = renderComponent();

  expect(getByText("alert description")).toBeInTheDocument();
});
