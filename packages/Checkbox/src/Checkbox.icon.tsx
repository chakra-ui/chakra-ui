import * as React from "react";
import { Icon, IconProps } from "@chakra-ui/icon";

export const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 14 14" {...props}>
      <polygon fill="currentColor" points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
  </Icon>
);

export const MinusIcon = (props: IconProps) => (
  <Icon {...props}>
      <rect fill="currentColor" height="4" width="20" x="2" y="10" />
  </Icon>
);
