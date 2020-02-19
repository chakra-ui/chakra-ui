import { getModeColor, StyleFunctionProps, ComponentTheme } from "./utils";

const Tooltip: ComponentTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    paddingX: "8px",
    paddingY: "2px",
    backgroundColor: getModeColor(props, `gray.700`, `gray.300`),
    color: getModeColor(props, `whiteAlpha.900`, `gray.900`),
    borderRadius: "sm",
    fontWeight: "medium",
    pointerEvents: "none",
    fontSize: "sm",
    shadow: "md",
    maxWidth: "320px",
  }),
};

export default Tooltip;
