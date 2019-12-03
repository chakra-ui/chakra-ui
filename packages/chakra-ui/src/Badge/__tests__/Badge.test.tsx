import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import Badge from "../Badge";

afterEach(cleanup);

const renderComponent = () => {
  return render(<Badge>500</Badge>);
};

it("should render", () => {
  renderComponent();
});

it("should display children", () => {
  const { getByText } = renderComponent();

  expect(getByText("500")).toBeInTheDocument();
});
