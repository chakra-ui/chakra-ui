import { callAllHandlers, createOnKeyDown, createHookContext } from "@chakra-ui/utils";
import * as React from "react";
import { useControllableProp, useMergeRefs, useId, useIsomorphicEffect } from "@chakra-ui/hooks";
import { useTabbable, TabbableProps } from "@chakra-ui/tabbable";

/**
|--------------------------------------------------
| Tabs component
|--------------------------------------------------
*/

// Let's start with some type definitions

export interface TabsHookProps {
  /**
   * The orientation of the tablist.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  isManual?: boolean;
  /**
   * The children of the tabs should be tabpanel and tabpanels.
   */
  children: React.ReactNode;
  /**
   * Callback when the index (controlled or un-controlled) changes.
   */
  onChange?: (index: number) => void;
  /**
   * The index of the selected tab (in controlled mode)
   */
  index?: number;
  /**
   * The initial index of the selected tab (in uncontrolled mode)
   */
  defaultIndex?: number;
  /**
   * The id of the tab
   */
  id?: string;
}

export function useTabs(props: TabsHookProps) {
  const { defaultIndex, onChange: onChangeProp, index: selectedIndexProp, isManual, orientation } = props;

  const [selectedIndexState, setSelectedIndex] = React.useState<number>(defaultIndex || 0);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(defaultIndex || 0);

  const [isControlled, selectedIndex] = useControllableProp(selectedIndexProp, selectedIndexState);

  // Reference to all elements with `role=tab`
  const tabNodesRef = React.useRef<HTMLElement[]>([]);

  // Reference to the tablist
  const tablistRef = React.useRef<HTMLElement>();

  // sync focus with selection in controlled mode
  React.useEffect(() => {
    if (isControlled && props.index != undefined) {
      setFocusedIndex(props.index);
    }
  }, [isControlled, props.index]);

  const id = useId(`tabs`, props.id);

  const onChange = React.useCallback(
    (index: number) => {
      if (!isControlled) setSelectedIndex(index);
      if (onChangeProp) onChangeProp(index);
    },
    [isControlled, onChangeProp],
  );

  const onFocus = React.useCallback((index: number) => setFocusedIndex(index), []);

  return {
    id,
    isControlled,
    selectedIndex,
    focusedIndex,
    onChange,
    onFocus,
    isManual,
    orientation,
    tabNodesRef,
    tablistRef,
  };
}

////////////////////////////////////////////////////////////////////////

const [TabsProvider, useTabsContext] = createHookContext(useTabs);
export { TabsProvider };

////////////////////////////////////////////////////////////////////////

export interface TabHookProps extends TabbableProps {
  id?: string;
  isSelected?: boolean;
  panelId?: string;
}

export function useTab(props: TabHookProps) {
  const { isSelected, isDisabled, id, panelId, ...rest } = props;

  const tab = useTabbable({
    ...rest,
    clickOnSpace: true,
    clickOnEnter: true,
    isDisabled,
  });

  const type: "button" | "submit" | "reset" = "button";

  return {
    ...tab,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": panelId,
  };
}

////////////////////////////////////////////////////////////////////////

export interface TabListHookProps {
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.Ref<any>;
}

export function useTabList(props: TabListHookProps) {
  // Read from context
  const tabs = useTabsContext();

  // Get all the focusable tab indexes
  // A tab is focusable if it's not disabled or is disabled and has focusable prop
  // ARIA: It's a good idea to allow users focus on disabled tabs so you tell them why it's disabled
  const focusableIndexes = React.Children.map(props.children, (child: any, index) => {
    const isTrulyDisabled = child.props.isDisabled && !child.props.isFocusable;
    return isTrulyDisabled ? null : index;
  }).filter(child => child !== null) as number[];
  const enabledSelectedIndex = focusableIndexes.indexOf(tabs.focusedIndex);
  const count = focusableIndexes.length;

  // Function to update the selected tab index
  const updateActiveIndex = (index: number) => {
    const childIndex = focusableIndexes[index];
    tabs.tabNodesRef.current[childIndex].focus();
    tabs.onFocus(childIndex);
  };

  // Helper functions for keyboard navigation
  const goToNextTab = () => {
    const nextIndex = (enabledSelectedIndex + 1) % count;
    updateActiveIndex(nextIndex);
  };
  const goToPrevTab = () => {
    const nextIndex = (enabledSelectedIndex - 1 + count) % count;
    updateActiveIndex(nextIndex);
  };
  const goToFirst = () => updateActiveIndex(0);
  const goToLast = () => updateActiveIndex(count - 1);

  const isHorizontal = tabs.orientation === "horizontal";
  const isVertical = tabs.orientation === "vertical";

  // Function to handle keyboard navigation
  const onKeyDown = createOnKeyDown({
    preventDefault: false,
    keyMap: {
      ArrowRight: () => isHorizontal && goToNextTab(),
      ArrowLeft: () => isHorizontal && goToPrevTab(),
      ArrowDown: event => {
        event.preventDefault();
        isVertical && goToNextTab();
      },
      ArrowUp: event => {
        event.preventDefault();
        isVertical && goToPrevTab();
      },
      Home: () => goToFirst(),
      End: () => goToLast(),
    },
  });

  // Enhance the children by passing some props to them
  const children = React.Children.map(props.children, (child: any, index) => {
    const isSelected = index === tabs.selectedIndex;

    const onClick = () => {
      tabs.onFocus(index);
      if (tabs.onChange) {
        tabs.onChange(index);
      }
    };

    const onFocus = () => {
      const isDisabledButFocusable = child.props.isDisabled && child.props.isFocusable;
      if (!tabs.isManual && !isDisabledButFocusable) {
        tabs.onChange(index);
      }
    };

    return React.cloneElement(child as any, {
      id: `${tabs.id}--tab-${index}`,
      panelId: `${tabs.id}--tabpanel-${index}`,
      ref: (node: HTMLElement) => (tabs.tabNodesRef.current[index] = node),
      isSelected,
      onClick: callAllHandlers(child.props.onClick, onClick),
      onFocus: callAllHandlers(child.props.onFocus, onFocus),
    });
  });

  const ref = useMergeRefs(props.ref, tabs.tablistRef);

  return {
    ...props,
    ref,
    role: "tablist",
    "aria-orientation": tabs.orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    children,
  };
}

////////////////////////////////////////////////////////////////////////

export function useTabPanels(props: { children?: React.ReactNode }) {
  const tabs = useTabsContext();

  const children = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child as any, {
      isSelected: index === tabs.selectedIndex,
      id: `${tabs.id}--tabpanel-${index}`,
    });
  });

  return children;
}

////////////////////////////////////////////////////////////////////////

export function useTabPanel(props: { isSelected?: boolean; id?: string }) {
  return {
    ...props,
    role: "tabpanel",
    hidden: !props.isSelected,
    id: props.id,
  };
}

////////////////////////////////////////////////////////////////////////

export function useTabIndicator(): React.CSSProperties {
  const tabs = useTabsContext();
  const isHorizontal = tabs.orientation === "horizontal";
  const isVertical = tabs.orientation === "vertical";

  // Get the clientRect of the selected tab
  const [rect, setRect] = React.useState(() => {
    if (isHorizontal) return { left: 0, width: 0 };
    if (isVertical) return { top: 0, height: 0 };
  });

  // Update the selected tab rect when the selectedIndex changes
  useIsomorphicEffect(() => {
    if (tabs.selectedIndex == undefined) return;
    const selectedTabNode = tabs.tabNodesRef.current[tabs.selectedIndex];

    // Get the rect of the selected tab
    const selectedTabRect = selectedTabNode && selectedTabNode.getBoundingClientRect();

    // Get the rect of the tablist
    const tabListRect = tabs.tablistRef.current && tabs.tablistRef.current.getBoundingClientRect();

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal && tabListRect && selectedTabRect) {
      const left = selectedTabRect.left - tabListRect.left;
      const width = selectedTabRect.width;
      setRect({ left, width });
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical && tabListRect && selectedTabRect) {
      const top = selectedTabRect.top - tabListRect.top;
      const height = selectedTabRect.height;
      setRect({ top, height });
    }
  }, [tabs.selectedIndex, tabs.tabNodesRef, tabs.tablistRef, tabs.orientation, isHorizontal, isVertical]);

  return {
    position: "absolute",
    transition: "all 200ms cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  };
}
