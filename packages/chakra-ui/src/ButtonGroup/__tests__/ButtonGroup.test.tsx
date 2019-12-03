import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import { Button } from "../../Button/index";
import ButtonGroup from "../ButtonGroup";

afterEach(cleanup);

const renderComponent = () => {
  return render(
    <ButtonGroup>
      <Button>Button1</Button>
      <Button>Button2</Button>
    </ButtonGroup>,
  );
};

it("should render", () => {
  renderComponent();
});

it("should display children", () => {
  const { getByText } = renderComponent();

  expect(getByText("Button1")).toBeInTheDocument();
  expect(getByText("Button2")).toBeInTheDocument();
});
