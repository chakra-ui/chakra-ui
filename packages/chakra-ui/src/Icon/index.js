/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import styled from "@emotion/styled";
import { useContext, forwardRef } from "react";
import Box from "../Box";

const Svg = styled(Box)`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }
`;

const Icon = forwardRef(
  (
    {
      size = "1em",
      name,
      color = "currentColor",
      role = "presentation",
      focusable = false,
      ...rest
    },
    ref,
  ) => {
    const { icons: iconPaths } = useContext(ThemeContext);

    // Fallback in case you pass the wrong name
    const iconFallback = iconPaths["question-outline"];

    const path =
      iconPaths[name] == null ? iconFallback.path : iconPaths[name].path;

    const viewBox =
      (iconPaths[name] == null
        ? iconFallback.viewBox
        : iconPaths[name].viewBox) || "0 0 24 24";

    return (
      <Svg
        ref={ref}
        as="svg"
        size={size}
        color={color}
        display="inline-block"
        verticalAlign="middle"
        viewBox={viewBox}
        focusable={focusable}
        role={role}
        {...rest}
      >
        {path}
      </Svg>
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
