/** @jsx jsx */
import {
  Selection,
  useCreateContext,
  useFocusEffect,
  useForkRef,
  useSelectionItem,
  useSelectionState,
} from "@chakra-ui/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useRef,
} from "react";
import { getNextIndex } from "../Select/utils";

/**
 * TODO:
 * 1. Fix autoFocus on mount issue
 * 2. Complete useTabbable hook and use it within useTab hook
 */

////////////////////////////////////////////////////////////////////////

const [useSelection, SelectionProvider] = useCreateContext<Selection>();
const [useTabsContext, TabContextProvider] = useCreateContext<any>();

////////////////////////////////////////////////////////////////////////

function useTab(props: any, ref: React.Ref<any>) {
  const selection = useSelection();
  const tabs = useTabsContext();
  const { isSelected, isHighlighted, item } = useSelectionItem({
    ...props,
    ...selection,
  });

  useFocusEffect(isHighlighted, item.ref);

  const _ref = useForkRef(ref, item.ref);

  const onClick = () => {
    if (!tabs.isControlled) {
      selection.select(item, true);
    }
    const currentIndex = selection.items.findIndex(
      _item => _item.id === item.id,
    );
    if (tabs.onChange) {
      tabs.onChange(currentIndex);
    }
  };

  const goToNextTab = () => {
    if (!tabs.isControlled || tabs.options.isManual) {
      selection.next("highlight", "keyboard-arrows");
    }
    if (!tabs.options.isManual && tabs.onChange) {
      const nextIndex = getNextIndexFunc();
      tabs.onChange(nextIndex);
    }
  };

  const goToPrevTab = () => {
    if (!tabs.isControlled || tabs.options.isManual) {
      selection.previous("highlight", "keyboard-arrows");
    }
    if (!tabs.options.isManual && tabs.onChange) {
      const nextIndex = getPrevIndexFunc();
      tabs.onChange(nextIndex);
    }
  };

  const getPrevIndexFunc = () => {
    const currentIndex = selection.highlightedItem
      ? selection.items.indexOf(selection.highlightedItem)
      : -1;

    const prevIndex = getNextIndex({
      step: -1,
      currentIndex,
      itemsLength: selection.items.length,
      loop: true,
    });

    return prevIndex;
  };

  const { isManual, orientation } = tabs.options;
  const isHorizontal = orientation === "horizontal";
  const isVertical = orientation === "vertical";

  const onKeyDown = createOnKeyDown({
    stopPropagation: true,
    keyMap: {
      ArrowRight: () => isHorizontal && goToNextTab(),
      ArrowDown: () => isVertical && goToNextTab(),
      ArrowLeft: () => isHorizontal && goToPrevTab(),
      ArrowUp: () => isVertical && goToPrevTab(),
      Home: () => selection.first("highlight", "keyboard-arrows"),
      End: () => selection.last("highlight", "keyboard-arrows"),
      Enter: () => {
        if (!tabs.isControlled) {
          selection.select(null, false, "keyboard-enter");
        }
        const currentIndex = selection.highlightedItem
          ? selection.items.indexOf(selection.highlightedItem)
          : -1;
        if (tabs.onChange) {
          tabs.onChange(currentIndex);
        }
      },
    },
  });

  const getNextIndexFunc = () => {
    const currentIndex = selection.highlightedItem
      ? selection.items.indexOf(selection.highlightedItem)
      : -1;

    const nextIndex = getNextIndex({
      currentIndex,
      itemsLength: selection.items.length,
      loop: true,
    });

    return nextIndex;
  };

  const onFocus = () => {
    if (!isManual) {
      if (!tabs.isControlled) {
        selection.select(null);
      }
    }
  };

  return {
    ref: _ref,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    id: `tab-${item.id}`,
    type: "button",
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": `tab-${item.id}-panel`,
    onClick: composeEventHandlers(props.onClick, onClick),
    onFocus: composeEventHandlers(props.onFocus, onFocus),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  };
}

////////////////////////////////////////////////////////////////////////

function useTabList(props: any, ref: React.Ref<any>) {
  const tabs = useTabsContext();
  return {
    ref,
    role: "tablist",
    "aria-orientation": tabs.options.orientation,
  };
}

////////////////////////////////////////////////////////////////////////

function useTabPanel(props: any, ref: React.Ref<any>) {
  return {
    role: "tabpanel",
    tabIndex: -1,
    hidden: !props.isSelected,
  };
}

////////////////////////////////////////////////////////////////////////

function useTabPanels(props: any, ref: React.Ref<any>) {
  const selection = useSelection();

  const children = Children.map(props.children, (child, index) => {
    if (!isValidElement(child)) return;

    if (selection.items.length === 0) return child;

    const tabId = selection.items[index]["id"];
    const isSelected = selection.selectedItem
      ? selection.selectedItem.id === tabId
      : false;

    return cloneElement(
      child as React.ReactElement<{ isSelected: boolean; id: string }>,
      {
        isSelected,
        id: `tab-${tabId}-panel`,
      },
    );
  });

  return children;
}

////////////////////////////////////////////////////////////////////////

const Tabs = forwardRef(function Tabs(props: any, ref: React.Ref<any>) {
  const selection = useSelectionState({
    selectFirstItemOnMount: !Boolean(
      props.defaultActiveIndex || props.activeIndex,
    ),
    highlightFirstItemOnMount: !Boolean(
      props.defaultActiveIndex || props.activeIndex,
    ),
  });

  const { current: isControlled } = useRef(props.activeIndex != undefined);

  React.useLayoutEffect(() => {
    if (props.defaultActiveIndex != undefined && selection.items.length) {
      const item = selection.items[props.defaultActiveIndex];
      selection.select(item, true);
    }
    // eslint-disable-next-line
  }, [selection.items]);

  React.useLayoutEffect(() => {
    if (props.activeIndex != undefined && selection.items.length) {
      const item = selection.items[props.activeIndex];
      selection.select(item, true);
    }
    // eslint-disable-next-line
  }, [props.activeIndex, selection.items]);

  const selectionContext = React.useMemo(
    () => selection,
    // eslint-disable-next-line
    Object.values(selection),
  );
  const tabContext = {
    onChange: props.onChange,
    isControlled,
    options: {
      isManual: props.isManual,
      orientation: props.orientation,
    },
  };

  return (
    <TabContextProvider value={tabContext}>
      <SelectionProvider value={selectionContext}>
        <Box ref={ref}>{props.children}</Box>
      </SelectionProvider>
    </TabContextProvider>
  );
});

const Tab = forwardRef(function Tab(props: any, ref: React.Ref<any>) {
  const tab = useTab(props, ref);
  return <Box {...props} {...tab} />;
});

const TabList = forwardRef(function TabList(props: any, ref: React.Ref<any>) {
  const tablist = useTabList(props, ref);
  return <Flex {...props} {...tablist} />;
});

const TabPanel = forwardRef(function TabPanel(props: any, ref: React.Ref<any>) {
  const tabpanel = useTabPanel(props, ref);
  return <Box {...props} {...tabpanel} />;
});

const TabPanels = forwardRef(function TabPanels(
  props: any,
  ref: React.Ref<any>,
) {
  const tabpanels = useTabPanels(props, ref);
  return <React.Fragment>{tabpanels}</React.Fragment>;
});

export function TabsExample() {
  const [index, setIndex] = React.useState(1);
  return (
    <Tabs
      defaultActiveIndex={2}
      // activeIndex={index}
      onChange={console.log}
      // onChange={setIndex}
      orientation="horizontal"
      isManual
    >
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
