import React, { useState } from "react";
import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import CircularProgress, { CircularProgressLabel } from "../CircularProgress";

afterEach(cleanup);

it("should render", () => {
  render(<CircularProgress value={40} />);
});

it("should display a label", () => {
  const { queryByText } = render(
    <CircularProgress value={40}>
      <CircularProgressLabel>40%</CircularProgressLabel>
    </CircularProgress>,
  );

  expect(queryByText("40%")).toBeInTheDocument();
});

test('a11y - progress has a "role" set to "progressbar"', () => {
  const { queryByRole } = render(<CircularProgress value={40} />);

  expect(queryByRole("progressbar")).toBeInTheDocument();
});

test('a11y - progress has a "aria-valuenow" set to the percentage completion value', () => {
  const { queryByTestId } = render(
    <CircularProgress value={40} data-testid="CircularProgress" />,
  );

  expect(queryByTestId("CircularProgress")).toHaveAttribute(
    "aria-valuenow",
    "40",
  );
});
