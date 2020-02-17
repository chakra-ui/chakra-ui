import * as React from "react";
import { storiesOf } from "@storybook/react";
import CloseButton from "./CloseButton";

export default {
  title: "CloseButton",
};

export const Default = () => (
  <>
    <CloseButton />
    <CloseButton variantSize="sm" />
  </>
);
