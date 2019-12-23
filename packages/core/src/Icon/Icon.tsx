/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { useTheme, Theme } from "@chakra-ui/theme";

interface IconOptions {
  /**
   * The name of the icon.
   */
  name?: keyof Theme["icons"];
  /**
   * The role of the icon. `presentation` or `img`
   */
  role?: "presentation" | "img";
}

export type IconProps<P = {}> = BoxProps<P, SVGElement> &
  IconOptions &
  React.SVGAttributes<SVGElement>;

const Icon = React.forwardRef(function Icon<P>(
  {
    size = "1em",
    name,
    color = "currentColor",
    role = "presentation",
    focusable = "false",
    ...rest
  }: IconProps<P>,
  ref: React.Ref<SVGElement>,
) {
  const { icons } = useTheme();

  // Fallback in case you pass the wrong name
  const iconFallback = icons["question-outline"];
  let path: JSX.Element = <React.Fragment></React.Fragment>;
  let viewBox = "0 0 24 24";

  if (name) {
    path = icons[name] == null ? iconFallback.path : icons[name].path;

    viewBox =
      (icons[name] == null ? iconFallback.viewBox : icons[name].viewBox) ||
      "0 0 24 24";
  }

  return (
    <Box<{}, SVGElement>
      ref={ref}
      as="svg"
      size={size}
      color={color}
      flexShrink="0"
      display="inline-block"
      verticalAlign="middle"
      viewBox={viewBox}
      focusable={focusable}
      role={role}
      {...rest}
    >
      {path}
    </Box>
  );
}) as <P>(props: IconProps<P>) => React.ReactElement<IconProps<P>>;

export default Icon;
