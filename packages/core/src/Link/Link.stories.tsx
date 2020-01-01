import * as React from "react";
import { storiesOf } from "@storybook/react";
import Link from "./Link";
import setup from "../story.setup";

const stories = storiesOf("Link", module);
stories.addDecorator(setup);

stories.add("Default", () => (
  <div>
    <Link href="google.com">Home</Link>
    <Link mx="20px" color="red.200" isExternal>
      Docs
    </Link>
    <Link>Reference</Link>
  </div>
));

// Add example for react-router & reach-router

// Add example for JSX generics
