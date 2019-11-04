import * as React from "react";
import * as ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Box } from "../index";

describe("Box Component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<Box>Welcome to Box</Box>);
    expect(getByText("Welcome to Box")).toBeInTheDocument();
  });
});
