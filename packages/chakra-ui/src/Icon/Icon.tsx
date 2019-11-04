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
  props: IconProps<P>,
  ref: React.Ref<SVGElement>,
) {
  const { icons } = useTheme();

  // Fallback in case you pass the wrong name
  const iconFallback = icons["question-outline"];
  let path: JSX.Element = <React.Fragment></React.Fragment>;
  let viewBox = "0 0 24 24";

  if (props.name) {
    path =
      icons[props.name] == null ? iconFallback.path : icons[props.name].path;

    viewBox =
      (icons[props.name] == null
        ? iconFallback.viewBox
        : icons[props.name].viewBox) || "0 0 24 24";
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
