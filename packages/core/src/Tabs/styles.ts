// import { useColorMode, useTheme, Theme, ColorMode } from "@chakra-ui/theme";
// import { useTabsContext, TabContext } from "./Tabs";

// export const baseProps = {
//   display: "flex",
//   cursor: "pointer",
//   alignItems: "center",
//   justifyContent: "center",
//   transition: "all 0.2s",
//   _focus: {
//     zIndex: "1",
//     boxShadow: "outline",
//   },
// };

// export const disabledProps = {
//   _disabled: {
//     opacity: 0.4,
//     cursor: "not-allowed",
//   },
// };

// const lineStyle = (props: VariantProps) => {
//   const _color = { light: `${props.color}.600`, dark: `${props.color}.300` };
//   return {
//     tabList: {
//       borderBottom: "2px",
//       borderColor: "inherit",
//     },
//     tab: {
//       borderBottom: "2px",
//       borderColor: "transparent",
//       mb: "-2px",
//       _selected: {
//         color: _color[props.colorMode],
//         borderColor: "currentColor",
//       },
//       _active: {
//         bg: "gray.200",
//       },
//       _disabled: {
//         opacity: 0.4,
//         cursor: "not-allowed",
//       },
//     },
//   };
// };

// const enclosedStyle = (props: VariantProps) => {
//   const _selectedColor = {
//     light: `${props.color}.600`,
//     dark: `${props.color}.300`,
//   };
//   const _selectedBg = { light: "#fff", dark: props.theme.colors.gray[800] };

//   return {
//     tab: {
//       roundedTop: "md",
//       border: "1px",
//       borderColor: "transparent",
//       mb: "-1px",
//       _selected: {
//         color: _selectedColor[props.colorMode],
//         borderColor: "inherit",
//         borderBottomColor: _selectedBg[props.colorMode],
//       },
//     },
//     tabList: {
//       mb: "-1px",
//       borderBottom: "1px",
//       borderColor: "inherit",
//     },
//   };
// };

// const enclosedColoredStyle = (props: VariantProps) => {
//   const bg = { light: "gray.50", dark: "whiteAlpha.50" };
//   const selectedColor = {
//     light: `${props.color}.600`,
//     dark: `${props.color}.300`,
//   };
//   const selectedBg = { light: `#fff`, dark: `gray.800` };

//   return {
//     tab: {
//       border: "1px",
//       borderColor: "inherit",
//       bg: bg[props.colorMode],
//       mb: "-1px",
//       _notLast: {
//         mr: "-1px",
//       },
//       _selected: {
//         bg: selectedBg[props.colorMode],
//         color: selectedColor[props.colorMode],
//         borderColor: "inherit",
//         borderTopColor: "currentColor",
//         borderBottomColor: "transparent",
//       },
//     },
//     tabList: {
//       mb: "-1px",
//       borderBottom: "1px",
//       borderColor: "inherit",
//     },
//   };
// };

// const softRoundedStyle = (props: VariantProps) => {
//   return {
//     tab: {
//       rounded: "full",
//       fontWeight: "semibold",
//       color: "gray.600",
//       _selected: {
//         color: `${props.color}.700`,
//         bg: `${props.color}.100`,
//       },
//     },
//     tabList: {},
//   };
// };

// const solidRoundedStyle = (props: VariantProps) => {
//   const _color = { light: "gray.600", dark: "inherit" };
//   const _selectedBg = {
//     light: `${props.color}.600`,
//     dark: `${props.color}.300`,
//   };
//   const _selectedColor = { light: `#fff`, dark: `gray.800` };

//   return {
//     tab: {
//       rounded: "full",
//       fontWeight: "semibold",
//       color: _color[props.colorMode],
//       _selected: {
//         color: _selectedColor[props.colorMode],
//         bg: _selectedBg[props.colorMode],
//       },
//     },
//     tabList: {},
//   };
// };

// interface VariantProps {
//   variant: TabContext["variant"];
//   color: TabContext["variantColor"];
//   theme: Theme;
//   colorMode: ColorMode;
// }

// export function getVariantStyle(props: VariantProps) {
//   switch (props.variant) {
//     case "line":
//       return lineStyle(props);
//     case "enclosed":
//       return enclosedStyle(props);
//     case "enclosed-colored":
//       return enclosedColoredStyle(props);
//     case "soft-rounded":
//       return softRoundedStyle(props);
//     case "solid-rounded":
//       return solidRoundedStyle(props);
//     case "unstyled":
//       return { tab: {}, tabList: {} };
//     default:
//       break;
//   }
// }

// // TO DO: Add support for vertical orientation
// export function getOrientationStyle({
//   align,
//   orientation,
// }: Pick<TabContext, "align" | "orientation">) {
//   const alignments = {
//     end: "flex-end",
//     center: "center",
//     start: "flex-start",
//   };

//   let tabListStyle;
//   let tabStyle;

//   if (orientation === "horizontal") {
//     tabListStyle = {
//       alignItems: "center",
//       justifyContent: alignments[align],
//       maxWidth: "full",
//     };

//     tabStyle = {
//       height: "100%",
//     };
//   }

//   if (orientation === "vertical") {
//     tabListStyle = { flexDirection: "column" };

//     tabStyle = {
//       width: "100%",
//     };
//   }

//   return {
//     tabList: tabListStyle,
//     tab: tabStyle,
//   };
// }

// const tabSizes = {
//   sm: {
//     padding: "0.25rem 1rem",
//     fontSize: "0.85rem",
//   },
//   md: {
//     fontSize: "1rem",
//     padding: "0.5rem 1rem",
//   },
//   lg: {
//     fontSize: "1.15rem",
//     padding: "0.75rem 1rem",
//   },
// };

// // Styles for the tab's variant and variantColor
// function useTabsStyle() {
//   const theme = useTheme();
//   const {
//     variant,
//     variantColor,
//     size,
//     isFitted,
//     orientation,
//     align,
//   } = useTabsContext();

//   const { colorMode } = useColorMode();

//   const variantStyle = getVariantStyle({
//     variant,
//     color: variantColor,
//     theme,
//     colorMode,
//   });

//   const orientationStyle = getOrientationStyle({ orientation, align });

//   return {
//     tab: {
//       ...baseProps,
//       ...disabledProps,
//       ...(size && tabSizes[size]),
//       ...(variantStyle && variantStyle.tab),
//       ...(orientationStyle && orientationStyle.tab),
//       ...(isFitted && { flex: 1 }),
//     },
//     tabList: {
//       ...(variantStyle && variantStyle.tabList),
//       ...(orientationStyle && orientationStyle.tabList),
//     },
//   };
// }

// export default useTabsStyle;
