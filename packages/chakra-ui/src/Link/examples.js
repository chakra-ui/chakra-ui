/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Link from "../Link";

const stories = storiesOf("Link", module);
stories.add("Default", () => (
  <div>
    <Link variant="nice-border">Home</Link>
    <br />
    <Link variant="nice-bg">Docs</Link>
    <br />
    <Link>Reference</Link>
  </div>
));
