import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  statuses,
  Statuses,
} from "../Alert";
import { theme, Icons } from "@chakra-ui/theme";
import { cleanup } from "@testing-library/react";
import { iconPaths } from "@chakra-ui/icons";

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

it.each<[keyof Statuses, Icons]>([
  ["info", statuses.info.icon],
  ["warning", statuses.warning.icon],
  ["success", statuses.success.icon],
  ["error", statuses.error.icon],
])(
  "it should automatically set AlertIcon's icon based on %s status",
  (status: keyof Statuses, icon) => {
    const { getByTestId } = render(
      <Alert status={status}>
        <AlertIcon data-testid={`AlertIcon`} />
      </Alert>,
    );

    expect(getByTestId(`AlertIcon`).querySelector("path")).toHaveAttribute(
      "d",
      iconPaths[icon].path.props.d,
    );
  },
);

it("should override icon if set explicitly", () => {
  const { getByTestId } = render(
    <Alert status="error">
      <AlertIcon data-testid="AlertIcon" name="add" />
    </Alert>,
  );

  expect(getByTestId(`AlertIcon`).querySelector("path")).toHaveAttribute(
    "d",
    iconPaths.add.path.props.d,
  );
});

it("should display title", () => {
  const { getByText } = renderComponent();

  expect(getByText("alert title")).toBeInTheDocument();
});

it("should display description", () => {
  const { getByText } = renderComponent();

  expect(getByText("alert description")).toBeInTheDocument();
});
