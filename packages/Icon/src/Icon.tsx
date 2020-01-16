import { chakra, PropsOf } from "@chakra-ui/system";
import * as React from "react";

export interface IconOptions {
  role?: "presentation" | "img";
  path?: JSX.Element;
  viewBox?: string;
}

const fallbackIcon = {
  path: (
    <g fillRule="evenodd">
      <circle fill="currentColor" cx="12" cy="12" r="10" />
      <circle fill="inherit" cx="12" cy="18" r="1" />
      <path
        d="M15.89 9.05a3.975 3.975 0 0 0-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 0 0 .982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 0 1 4.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 0 0-1 .987v2.014a1.001 1.001 0 0 0 2.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0 0 15.89 9.05"
        fill="inherit"
      />
    </g>
  ),
  viewBox: "0 0 24 24",
};

export type IconProps = Omit<PropsOf<typeof chakra.svg>, "path" | "viewBox"> &
  IconOptions;

export const Icon = React.forwardRef(
  (
    {
      as,
      size = "1em",
      path,
      viewBox,
      color = "currentColor",
      role = "presentation",
      focusable = false,
      ...rest
    }: IconProps,
    ref: React.Ref<any>,
  ) => {
    const sharedProps = {
      ref,
      display: "inline-block",
      lineHeight: "1em",
      size,
      color,
      focusable,
      role,
      flexShrink: 0,
    };

    // If you're using an icon-library like `react-icons`
    if (as && typeof as !== "string") {
      return <chakra.svg data-custom-icon as={as} {...sharedProps} {...rest} />;
    }

    const iconPath = path ?? fallbackIcon.path;
    const iconViewbox = viewBox ?? fallbackIcon.viewBox;

    return (
      <chakra.svg
        {...sharedProps}
        verticalAlign="middle"
        viewBox={iconViewbox}
        {...rest}
      >
        {iconPath}
      </chakra.svg>
    );
  },
);

export default Icon;
