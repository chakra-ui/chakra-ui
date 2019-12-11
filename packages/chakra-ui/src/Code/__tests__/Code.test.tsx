import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { render } from "../../../../tests/utils";
import Code from "../Code";

afterEach(cleanup);

it("should render", () => {
  render(<Code>content</Code>);
});

it("should render a code element", () => {
  const { container } = render(<Code>content</Code>);

  expect(container.querySelector("code")).toHaveTextContent("content");
});
