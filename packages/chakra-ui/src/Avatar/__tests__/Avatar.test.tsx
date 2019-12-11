import React, { useState } from "react";
import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import Avatar, { AvatarBadge } from "../Avatar";

afterEach(cleanup);

const renderComponent = ({ name = "Sasuke Uchiha" } = {}) => {
  return render(<Avatar name={name} src="img-src.com" />);
};

it("should render", () => {
  renderComponent();
});

it("should render image if loaded correctly", () => {
  const { getByAltText } = renderComponent();

  expect(getByAltText("Sasuke Uchiha")).toBeInTheDocument();
});

it("should render avatar name as fallback if image didn't loaded correctly", () => {
  const { getByAltText, queryByAltText, getByText } = renderComponent();
  const image = getByAltText("Sasuke Uchiha");

  fireEvent.error(image);

  expect(queryByAltText("Sasuke Uchiha")).not.toBeInTheDocument();
  expect(getByText("SU")).toBeInTheDocument();
});

it("should render default avatar if name is not provided and image didn't load", () => {
  const { container, queryByTestId } = renderComponent({ name: "" });
  const image = container.querySelector("img");

  if (image) {
    fireEvent.error(image);
  }

  expect(
    container.querySelector('div[aria-label="default-avatar"]'),
  ).toBeInTheDocument();
});

it("should display a badge near the avatar", () => {
  const { getByText } = render(
    <Avatar>
      <AvatarBadge>5</AvatarBadge>
    </Avatar>,
  );

  expect(getByText("5")).toBeInTheDocument();
});
