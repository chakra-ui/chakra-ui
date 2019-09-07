import * as React from "react";
import { render } from "../utils/testing";

import Badge, { IBadge } from "./index";

it("should render all variants", () => {
  const variants: IBadge["variant"][] = [
    undefined,
    "outline",
    "solid",
    "subtle",
  ];
  const colors: IBadge["variantColor"][] = ["red", "green"];
  const rendered: HTMLElement[] = [];

  variants.map(variant => {
    colors.map(color => {
      const { container } = render(
        <Badge variant={variant} variantColor={color}>
          content
        </Badge>,
      );
      rendered.push(container);
    });
  });
  expect(rendered).toMatchSnapshot();
});
