/** @jsx jsx */
import { jsx } from "@emotion/core";
import { render } from "@test-utils";

const Button = (props: any) => (
  <button
    css={{
      color: "hotpink",
    }}
    {...props}
  />
);

test("Button renders correctly", () => {
  const { asFragment } = render(<Button>This is hotpink.</Button>);
  expect(asFragment()).toMatchSnapshot();
});
