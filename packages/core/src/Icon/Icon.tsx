import { iconPaths as icons } from "@chakra-ui/icons";
import { chakra, PropsOf } from "@chakra-ui/system";
import * as React from "react";

interface IconOptions {
  /**
   * The name of the icon.
   */
  name?: keyof typeof icons;
  /**
   * The role of the icon. `presentation` or `img`
   */
  role?: "presentation" | "img";
}

export type IconProps = PropsOf<typeof chakra.svg> & IconOptions;

const Icon = React.forwardRef(
  (
    {
      size = "1em",
      name,
      color = "currentColor",
      role = "presentation",
      focusable = "false",
      ...rest
    }: IconProps,
    ref: React.Ref<any>,
  ) => {
    // Fallback in case you pass the wrong name
    const iconFallback = icons["question-outline"];
    let path: JSX.Element = <React.Fragment></React.Fragment>;
    let viewBox = "0 0 24 24";

    if (name) {
      path = icons[name] == null ? iconFallback.path : icons[name].path;

      viewBox =
        (icons[name] == null
          ? (iconFallback as { viewBox?: string }).viewBox
          : (icons[name] as { viewBox?: string }).viewBox) || "0 0 24 24";
    }

    return (
      <chakra.svg
        ref={ref}
        size={size}
        color={color}
        flexShrink={0}
        display="inline-block"
        verticalAlign="middle"
        viewBox={viewBox}
        focusable={focusable}
        role={role}
        {...rest}
      >
        {path}
      </chakra.svg>
    );
  },
);

export default Icon;
