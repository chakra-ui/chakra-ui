import { BoxProps } from "../Box";
import { IconProps } from "../Icon";
import { FC } from "react";

interface IAlert {
  status?: "error" | "success" | "warning" | "info";
  variant?: "subtle" | "solid" | "left-accent" | "top-accent" | "card";
}

export const AlertTitle: FC<BoxProps>;

export const AlertBody: FC<BoxProps>;

export const AlertIcon: FC<IconProps>;

export type AlertProps = IAlert & BoxProps;

declare const Alert: FC<AlertProps>;

export default Alert;
