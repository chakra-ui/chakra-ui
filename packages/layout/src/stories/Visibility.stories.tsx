import React from "react";
import { storiesOf } from "@storybook/react";
import { ShowAt, HideAt, Hide, Show } from "../Visibility";

const stories = storiesOf("Visibility", module);

stories.add("show at", () => (
  <ShowAt breakpoint="320px">
    <div>Hey! I'll show at 320px</div>
  </ShowAt>
));

stories.add("hide at", () => (
  <HideAt breakpoint="320px">
    <div>Hallos! I'll hide at 320px</div>
  </HideAt>
));

stories.add("hide with query", () => (
  <Hide query="(max-width: 400px)">
    <div>Hallos! I'll be hide at 400px</div>
  </Hide>
));

stories.add("show with query", () => (
  <Show query="(max-width: 400px)">
    <div>Hallos! I'll be show at 400px</div>
  </Show>
));
