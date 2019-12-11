import * as React from "react";
import { BoxProps } from "../Box";
import { FlexProps } from "../Flex";
import { PseudoBoxProps } from "../PseudoBox";
import { VariantColor } from "../theme";
import { Omit } from "../common-types";

export interface ITabs {
  /**
   * The alignment of the tabs
   */
  align?: "start" | "center" | "end";
  /**
   * The style of the tabs to use
   */
  variant?:
    | "line"
    | "enclosed"
    | "enclosed-colored"
    | "soft-rounded"
    | "solid-rounded"
    | "unstyled";
  /**
   * If `true`, tabs will stretch to width of the tablist.
   */
  isFitted?: boolean;
  /**
   * The orientation of the <TabList/>.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * The size of the tab (affects the font-size and padding).
   */
  size?: "sm" | "md" | "lg";
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  isManual?: boolean;
  /**
   * The children of the tabs should be `TabPanel` and `TabList`.
   */
  children: React.ReactNode;
  /**
   * Callback when the index (controlled or un-controlled) changes.
   */
  onChange?: (index: number) => void;
  /**
   * The index of the activated tab
   */
  index?: number;
  /**
   * The index of the tab that should be activated initially
   */
  defaultIndex?: number;
  /**
   * The color scheme of the tabs
   * Value should be the key of the colors in the theme object.
   * @example "blue" | "green" | "yellow"
   */
  variantColor?: VariantColor;
}

export type TabsProps = ITabs & Omit<BoxProps, "onChange" | "size">;

declare const Tabs: React.FC<TabsProps>;
export default Tabs;

////////////////////////////////////////////////////////////////////////

export interface ITabList {
  /**
   * The children of the tab list should be `Tab`.
   */
  children: React.ReactNode;
}

export type TabListProps = ITabList & FlexProps;
export const TabList: React.FC<TabListProps>;

////////////////////////////////////////////////////////////////////////

export interface ITabPanel {
  /**
   * The id of the tab panel.
   * @private Used during `cloneElement`
   */
  id?: string;
  /**
   * If `true`, indicates that the panel is selected.
   * @private Used during `cloneElement`
   */
  isSelected?: boolean;
  /**
   * The children of the tab panel.
   */
  children: React.ReactNode;
  /**
   * The ref of the panel if it is selected.
   * @private Used during `cloneElement`
   */
  selectedPanelRef?: React.RefObject<HTMLElement>;
}
export type TabPanelProps = ITabPanel & BoxProps;
export const TabPanel: React.FC<TabPanelProps>;

////////////////////////////////////////////////////////////////////////

export interface ITabPanels {
  /**
   * The children of the tab panels should be `TabPanel`.
   */
  children: React.ReactNode;
}

export type TabPanelsProps = ITabPanels & BoxProps;
export const TabPanels: React.FC<TabPanelsProps>;

////////////////////////////////////////////////////////////////////////
type TabProps = PseudoBoxProps & React.ButtonHTMLAttributes<any>;
export const Tab: React.FC<TabProps>;
