import * as React from "react";
import { Icon, IconProps } from "@chakra-ui/icon";

type IconType = IconProps & { hidden?: boolean };

export const CheckIcon = (props: IconType) => (
  <Icon viewBox="0 0 14 14" {...props}>
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
    </g>
  </Icon>
);

export const MinusIcon = (props: IconType) => (
  <Icon {...props}>
    <g fill="currentColor">
      <rect height="4" width="20" x="2" y="10" />
    </g>
  </Icon>
);
