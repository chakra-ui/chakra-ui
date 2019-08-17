import { BoxProps } from "../Box";
import * as React from "react";
import { FlexProps } from "../Flex";
import { IconProps } from "../Icon";

export const StatLabel: React.FC<BoxProps>;

export const StatHelpText: React.FC<BoxProps>;

export const StatNumber: React.FC<BoxProps>;

type StatArrowProps = IconProps & {
  type?: "increase" | "decrease";
  "aria-label"?: string;
};
export const StatArrow: React.FC<StatArrowProps>;

export const Stat: React.FC<BoxProps>;

export const StatGroup: React.FC<FlexProps>;
