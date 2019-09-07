import * as React from "react";
import { render } from "../utils/testing";

import Badge from "./index";

describe("variants", () => {
  test("default", () => {
    const { container } = render(<Badge>content</Badge>);
    expect(container).toMatchSnapshot();
  });

  test("outline variant", () => {
    const { container } = render(<Badge variant="outline">content</Badge>);
    expect(container).toMatchSnapshot();
  });

  test("solid variant", () => {
    const { container } = render(<Badge variant="solid">content</Badge>);
    expect(container).toMatchSnapshot();
  });

  test("subtle variant", () => {
    const { container } = render(<Badge variant="subtle">content</Badge>);
    expect(container).toMatchSnapshot();
  });

  test("variant color", () => {
    const { container } = render(<Badge variantColor="green">content</Badge>);
    expect(container).toMatchSnapshot();
  });
});
