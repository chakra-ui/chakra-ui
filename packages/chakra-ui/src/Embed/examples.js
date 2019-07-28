/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Embed from ".";

const stories = storiesOf("Embed", module);
stories.add("Default", () => (
  <Embed aspectRatio="16:9">
    <iframe
      title="test"
      src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
      allowFullScreen
    />
  </Embed>
));
