/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";

const stories = storiesOf("Link", module);
stories.add("Default", () => (
  <>
    <Link variant="nice-border">Home</Link>
    <Link>Docs</Link>
    <Link>Reference</Link>
  </>
));
