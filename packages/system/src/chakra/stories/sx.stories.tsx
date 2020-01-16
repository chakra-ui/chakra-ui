/**@jsx jsx */
import { storiesOf } from "@storybook/react";
import { jsx } from "../../system/jsx";
import setup from "../../../story.setup";

const stories = storiesOf("sx", module);

stories.addDecorator(setup);

stories.add("default", () => (
  <h1
    sx={{
      color: "red.100",
      transition: "all 0.3s",
      paddingInlineStart: "30px",
      _hover: {
        color: "red.300",
      },
      _active: {
        color: "red.400",
      },
    }}
  >
    This is a heading
  </h1>
));
