/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import * as React from "react";
import { Box, BoxProps } from "../Box";
import iconPaths from "./IconPaths";
import { Theme } from "../theme";

type Icons = keyof typeof iconPaths;

interface IconOptions {
  /**
   * The name of the icon.
   */
  name?: Icons;
  /**
   * The role of the icon. `presentation` or `img`
   */
  role?: "presentation" | "img";
}

export type IconProps<P = {}> = BoxProps<P, SVGElement> &
  IconOptions &
  React.SVGAttributes<SVGElement>;

const Icon = React.forwardRef(function Icon<P>(
  props: IconProps<P>,
  ref: React.Ref<SVGElement>,
) {
  const { icons: iconPaths } = React.useContext<Theme>(
    ThemeContext as React.Context<Theme>,
  );

  // Fallback in case you pass the wrong name
  const iconFallback = iconPaths["question-outline"];
  let path: JSX.Element = <React.Fragment></React.Fragment>;
  let viewBox = "0 0 24 24";

  if (props.name) {
    path =
      iconPaths[props.name] == null
        ? iconFallback.path
        : iconPaths[props.name].path;

    viewBox =
      (iconPaths[props.name] == null
        ? iconFallback.viewBox
        : iconPaths[props.name].viewBox) || "0 0 24 24";
  }

  return (
    <Box<{}, SVGElement>
      ref={ref}
      as="svg"
      flexShrink="0"
      display="inline-block"
      verticalAlign="middle"
      viewBox={viewBox}
      focusable="false"
      role="presentation"
      textColor="red"
      {...props}
    >
      {path}
    </Box>
  );
}) as <P>(props: IconProps<P>) => React.ReactElement<IconProps<P>>;

export default Icon;
