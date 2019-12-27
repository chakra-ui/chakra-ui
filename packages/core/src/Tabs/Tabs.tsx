// /** @jsx jsx */
// import {
//   useControllableProp,
//   createCtx,
//   useId,
//   useTabbable,
//   TabbableProps,
// } from "@chakra-ui/hooks";
// import { Box, Flex, BoxProps, FlexProps } from "@chakra-ui/layout";
// import { composeEventHandlers, createOnKeyDown, Merge } from "@chakra-ui/utils";
// import { jsx } from "@emotion/core";
// import React, {
//   Children,
//   cloneElement,
//   forwardRef,
//   isValidElement,
//   useRef,
//   useState,
//   useEffect,
//   useLayoutEffect,
// } from "react";
// import { Theme } from "@chakra-ui/theme";
// import useTabsStyle from "./styles";

// ////////////////////////////////////////////////////////////////////////
// interface TabsStyleOptions {
//   /**
//    * The alignment of the tabs
//    */
//   align?: "start" | "center" | "end";
//   /**
//    * The style of the tabs to use
//    */
//   variant?:
//     | "line"
//     | "enclosed"
//     | "enclosed-colored"
//     | "soft-rounded"
//     | "unstyled"
//     | "solid-rounded";
//   /**
//    * If `true`, tabs will stretch to width of the tablist.
//    */
//   isFitted?: boolean;
//   /**
//    * The size of the tab (affects the font-size and padding).
//    */
//   size?: "sm" | "md" | "lg";
//   /**
//    * The color scheme of the tab variant. Use the color keys passed in `theme.colors`.
//    *
//    * Note: Use colors that have 50-900 values
//    */
//   variantColor?: keyof Theme["colors"];
// }

// const [useTabsContext, TabContextProvider] = createCtx<TabContext>();
// export { useTabsContext };

// ////////////////////////////////////////////////////////////////////////
// interface UseTabOptions extends TabbableProps {
//   id?: string;
// }

// export function useTab(props: UseTabOptions, ref: React.Ref<any>) {
//   const tab: any = useTabbable({
//     clickOnSpace: true,
//     clickOnEnter: true,
//     ...props,
//   });

//   return {
//     ...tab,
//     ref,
//     role: "tab",
//     tabIndex: tab.isSelected ? 0 : -1,
//     type: "button",
//     "aria-selected": tab.isSelected ? true : undefined,
//     "aria-controls": `tabpanel-${props.id}`,
//   };
// }

// export const Tab = forwardRef(function Tab(props: any, ref: React.Ref<any>) {
//   const tab = useTab(props, ref);
//   const styleProps = useTabsStyle();
//   return <Box outline="none" {...styleProps.tab} {...props} {...tab} />;
// });

// ////////////////////////////////////////////////////////////////////////
// interface UseTabListOptions {
//   children?: React.ReactNode;
//   onKeyDown?: React.KeyboardEventHandler<any>;
// }

// export function useTabList(props: UseTabListOptions) {
//   const tabs = useTabsContext();

//   const focusableIndexes = Children.map(props.children, (child: any, index) => {
//     const isTrulyDisabled = child.props.isDisabled && !child.props.isFocusable;
//     return isTrulyDisabled ? null : index;
//   }).filter(child => child !== null) as number[];

//   const enabledSelectedIndex = focusableIndexes.indexOf(tabs.focusedIndex);
//   const count = focusableIndexes.length;

//   const updateActiveIndex = (index: number) => {
//     const childIndex = focusableIndexes[index];
//     tabs.tabNodesRef.current[childIndex].focus();
//     tabs.onFocus(childIndex);
//   };

//   const goToNextTab = () => {
//     const nextIndex = (enabledSelectedIndex + 1) % count;
//     updateActiveIndex(nextIndex);
//   };

//   const goToPrevTab = () => {
//     const nextIndex = (enabledSelectedIndex - 1 + count) % count;
//     updateActiveIndex(nextIndex);
//   };

//   const isHorizontal = tabs.orientation === "horizontal";
//   const isVertical = tabs.orientation === "vertical";

//   const onKeyDown = createOnKeyDown({
//     keyMap: {
//       ArrowRight: () => isHorizontal && goToNextTab(),
//       ArrowLeft: () => isHorizontal && goToPrevTab(),
//       ArrowDown: () => isVertical && goToNextTab(),
//       ArrowUp: () => isVertical && goToPrevTab(),
//       Home: () => updateActiveIndex(0),
//       End: () => updateActiveIndex(count - 1),
//     },
//   });

//   const children = Children.map(props.children, (child: any, index) => {
//     let isSelected = index === tabs.selectedIndex;

//     const onClick = (event: React.MouseEvent) => {
//       (event.target as HTMLElement).focus();
//       tabs.onFocus(index);

//       if (tabs.onChange) {
//         tabs.onChange(index);
//       }
//     };

//     const onFocus = () => {
//       const isDisabledButFocusable =
//         child.props.isDisabled && child.props.isFocusable;
//       if (!tabs.isManual && !isDisabledButFocusable) {
//         tabs.onChange(index);
//       }
//     };
//     return cloneElement(child as any, {
//       id: `${tabs.id}--tab-${index}`,
//       ref: (node: HTMLElement) => (tabs.tabNodesRef.current[index] = node),
//       isSelected,
//       onClick: composeEventHandlers(child.props.onClick, onClick),
//       onFocus: composeEventHandlers(child.props.onFocus, onFocus),
//     });
//   });

//   return {
//     ref: tabs.tablistRef,
//     role: "tablist",
//     "aria-orientation": tabs.orientation,
//     onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
//     children,
//   };
// }

// export const TabList = forwardRef(function TabList(
//   props: FlexProps<{}, any>,
//   ref: React.Ref<any>,
// ) {
//   const tablist = useTabList(props);
//   const styleProps = useTabsStyle();
//   return <Flex ref={ref} {...styleProps.tabList} {...props} {...tablist} />;
// });

// ////////////////////////////////////////////////////////////////////////

// export function useTabPanel(props: { isSelected?: boolean }) {
//   return {
//     role: "tabpanel",
//     hidden: !props.isSelected,
//   };
// }

// export const TabPanel = forwardRef(function TabPanel(
//   props: any,
//   ref: React.Ref<any>,
// ) {
//   const tabpanel = useTabPanel(props);
//   return <Box ref={ref} {...props} {...tabpanel} />;
// });

// ////////////////////////////////////////////////////////////////////////

// export function useTabPanels(props: { children: React.ReactNode }) {
//   const tabs = useTabsContext();

//   const children = Children.map(props.children, (child, index) => {
//     if (!isValidElement(child)) return;

//     return cloneElement(child as any, {
//       isSelected: index === tabs.selectedIndex,
//       id: `${tabs.id}--tabpanel-${index}`,
//     });
//   });

//   return children;
// }

// export const TabPanels = function TabPanels(props: any) {
//   const tabpanels = useTabPanels(props);
//   return <React.Fragment>{tabpanels}</React.Fragment>;
// };

// ////////////////////////////////////////////////////////////////////////

// export function useTabIndicator() {
//   const tabs = useTabsContext();
//   const isHorizontal = tabs.orientation === "horizontal";
//   const isVertical = tabs.orientation === "vertical";

//   const [rect, setRect] = useState(() => {
//     if (isHorizontal) return { left: 0, width: 0 };
//     if (isVertical) return { top: 0, height: 0 };
//   });

//   useLayoutEffect(() => {
//     if (tabs.selectedIndex == undefined) return;
//     const selectedTabNode = tabs.tabNodesRef.current[tabs.selectedIndex];
//     const selectedTabRect =
//       selectedTabNode && selectedTabNode.getBoundingClientRect();
//     const tabListRect =
//       tabs.tablistRef.current &&
//       tabs.tablistRef.current.getBoundingClientRect();

//     // For horizontal tabs
//     if (tabs.orientation === "horizontal" && tabListRect) {
//       const left = selectedTabRect && selectedTabRect.left - tabListRect.left;
//       const width = selectedTabRect && selectedTabRect.width;
//       setRect({ left, width });
//     }

//     // For vertical tabs
//     if (tabs.orientation === "vertical" && tabListRect) {
//       const top = selectedTabRect && selectedTabRect.top - tabListRect.top;
//       const height = selectedTabRect && selectedTabRect.width;
//       setRect({ top, height });
//     }
//   }, [tabs.selectedIndex, tabs.tabNodesRef, tabs.tablistRef, tabs.orientation]);

//   return {
//     position: "absolute",
//     transition: "all 200ms cubic-bezier(0, 0, 0.2, 1)",
//     ...rect,
//   };
// }

// export const TabIndicator = forwardRef(function TabPanel(
//   props: BoxProps,
//   ref: React.Ref<any>,
// ) {
//   const indicatorStyle = useTabIndicator();
//   return (
//     <Box ref={ref} {...props} style={indicatorStyle as React.CSSProperties} />
//   );
// });

// ////////////////////////////////////////////////////////////////////////

// export interface UseTabsOptions {
//   /**
//    * The orientation of the <TabList/>.
//    */
//   orientation?: "vertical" | "horizontal";
//   /**
//    * If `true`, the tabs will be manually activated and
//    * display its panel by pressing Space or Enter.
//    *
//    * If `false`, the tabs will be automatically activated
//    * and their panel is displayed when they receive focus.
//    */
//   isManual?: boolean;
//   /**
//    * The children of the tabs should be `TabPanel` and `TabList`.
//    */
//   children: React.ReactNode;
//   /**
//    * Callback when the index (controlled or un-controlled) changes.
//    */
//   onChange?: (index: number) => void;
//   /**
//    * The index of the selected tab (in controlled mode)
//    */
//   index?: number;
//   /**
//    * The initial index of the selected tab (in uncontrolled mode)
//    */
//   defaultIndex?: number;
//   /**
//    * The id of the tab
//    */
//   id?: string;
// }

// ////////////////////////////////////////////////////////////////////////

// export function useTabs(props: UseTabsOptions) {
//   const [selectedIndex, setSelectedIndex] = useState<number>(
//     props.defaultIndex || 0,
//   );
//   const [focusedIndex, setFocusedIndex] = useState<number>(
//     props.defaultIndex || 0,
//   );

//   const [isControlled, _selectedIndex] = useControllableProp(
//     props.index,
//     selectedIndex,
//   );

//   // Reference to all elements with `role=tab`
//   const tabNodesRef = useRef<HTMLElement[]>([]);
//   // Reference to the tablist
//   const tablistRef = useRef<HTMLElement>();

//   // sync focus with selection in controlled mode
//   useEffect(() => {
//     if (isControlled && props.index != undefined) {
//       setFocusedIndex(props.index);
//     }
//   }, [isControlled, props.index]);

//   const uuid = useId(`tabs`);
//   const id = props.id || uuid;

//   const onChange = (index: number) => {
//     if (!isControlled) {
//       setSelectedIndex(index);
//     }

//     if (props.onChange) {
//       props.onChange(index);
//     }
//   };

//   const onFocus = (index: number) => {
//     setFocusedIndex(index);
//   };

//   return {
//     id,
//     isControlled,
//     selectedIndex: _selectedIndex,
//     focusedIndex,
//     onChange,
//     onFocus,
//     isManual: props.isManual,
//     orientation: props.orientation,
//     tabNodesRef,
//     tablistRef,
//   };
// }

// export type TabContext = ReturnType<typeof useTabs> &
//   Required<Omit<TabsStyleOptions, "isFitted">> &
//   Pick<TabsStyleOptions, "isFitted">;

// ////////////////////////////////////////////////////////////////////////

// export type BaseTabProps = UseTabsOptions & TabsStyleOptions;
// export type TabsProps = Merge<BoxProps, BaseTabProps>;

// const defaultProps: Partial<BaseTabProps> = {
//   variant: "line",
//   variantColor: "blue",
//   align: "start",
//   size: "md",
//   orientation: "horizontal",
// };

// export const Tabs = forwardRef(function Tabs(
//   props: TabsProps,
//   ref: React.Ref<any>,
// ) {
//   const baseProps = { ...defaultProps, ...props };
//   const tabsProps = useTabs(baseProps);
//   const tabs = { ...baseProps, ...tabsProps };
//   const context = React.useMemo(() => tabs, [tabs]);

//   return (
//     <TabContextProvider value={context as any}>
//       <Box ref={ref}>{props.children}</Box>
//     </TabContextProvider>
//   );
// });
