/** @jsx jsx */
import {
  useControllableValue,
  useCreateContext,
  useId,
  useTabbable,
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
  useState,
  useEffect,
} from "react";

////////////////////////////////////////////////////////////////////////

const [useTabsContext, TabContextProvider] = useCreateContext<any>();

////////////////////////////////////////////////////////////////////////

function useTab(props: any, ref: React.Ref<any>) {
  const tab: any = useTabbable(
    { clickOnSpace: true, clickOnEnter: true, ...props },
    ref,
  );

  return {
    ...tab,
    ref,
    role: "tab",
    tabIndex: tab.isSelected ? 0 : -1,
    type: "button",
    "aria-selected": tab.isSelected ? true : undefined,
    "aria-controls": `tabpanel-${props.id}`,
  };
}

////////////////////////////////////////////////////////////////////////

function useTabList(props: any) {
  const tabs = useTabsContext();
  const allNodes = useRef<HTMLElement[]>([]);

  const focusableIndexes = Children.map(props.children, (child, index) => {
    const isTrulyDisabled = child.props.isDisabled && !child.props.isFocusable;
    return isTrulyDisabled ? null : index;
  }).filter(child => child !== null) as number[];

  const enabledSelectedIndex = focusableIndexes.indexOf(tabs.focusedIndex);
  const count = focusableIndexes.length;

  const updateActiveIndex = (index: number) => {
    const childIndex = focusableIndexes[index];
    allNodes.current[childIndex].focus();
    tabs.onFocus(childIndex);
  };

  const goToNextTab = () => {
    const nextIndex = (enabledSelectedIndex + 1) % count;
    updateActiveIndex(nextIndex);
  };

  const goToPrevTab = () => {
    const nextIndex = (enabledSelectedIndex - 1 + count) % count;
    updateActiveIndex(nextIndex);
  };

  const isHorizontal = tabs.orientation === "horizontal";
  const isVertical = tabs.orientation === "vertical";

  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowRight: () => isHorizontal && goToNextTab(),
      ArrowLeft: () => isHorizontal && goToPrevTab(),
      ArrowDown: () => isVertical && goToNextTab(),
      ArrowUp: () => isVertical && goToPrevTab(),
      Home: () => updateActiveIndex(0),
      End: () => updateActiveIndex(count - 1),
    },
  });

  const children = Children.map(props.children, (child, index) => {
    let isSelected = index === tabs.selectedIndex;

    const onClick = (event: React.MouseEvent) => {
      (event.target as HTMLElement).focus();
      tabs.onFocus(index);

      if (tabs.onChange) {
        tabs.onChange(index);
      }
    };

    const onFocus = () => {
      const isDisabledButFocusable =
        child.props.isDisabled && child.props.isFocusable;
      if (!tabs.isManual && !isDisabledButFocusable) {
        tabs.onChange(index);
      }
    };

    return cloneElement(child, {
      id: `${tabs.id}--tab-${index}`,
      ref: (node: HTMLElement) => (allNodes.current[index] = node),
      isSelected,
      onClick: composeEventHandlers(child.props.onClick, onClick),
      onFocus: composeEventHandlers(child.props.onFocus, onFocus),
    });
  });

  return {
    role: "tablist",
    "aria-orientation": tabs.orientation,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    children,
  };
}

////////////////////////////////////////////////////////////////////////

function useTabPanel(props: any) {
  return {
    role: "tabpanel",
    tabIndex: -1,
    hidden: !props.isSelected,
  };
}

////////////////////////////////////////////////////////////////////////

function useTabPanels(props: any) {
  const tabs = useTabsContext();

  const children = Children.map(props.children, (child, index) => {
    if (!isValidElement(child)) return;

    return cloneElement(child as any, {
      isSelected: index === tabs.selectedIndex,
      id: `${tabs.id}--tabpanel-${index}`,
    });
  });

  return children;
}

////////////////////////////////////////////////////////////////////////

function useTabs(props: any) {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    props.defaultIndex || 0,
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(
    props.defaultIndex || 0,
  );

  const [isControlled, _selectedIndex] = useControllableValue(
    props.index,
    selectedIndex,
  );

  // sync up the focus index if we're in controlled mode
  useEffect(() => {
    if (isControlled) {
      setFocusedIndex(props.index);
    }
  }, [props.index]);

  const uuid = useId(`tabs`);
  const id = props.id || uuid;

  const onChange = (index: number) => {
    if (!isControlled) {
      setSelectedIndex(index);
    }

    if (props.onChange) {
      props.onChange(index);
    }
  };

  const onFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return {
    id,
    isControlled,
    selectedIndex: _selectedIndex,
    focusedIndex,
    onChange,
    onFocus,
    isManual: props.isManual,
    orientation: props.orientation,
  };
}

////////////////////////////////////////////////////////////////////////

const Tabs = forwardRef(function Tabs(props: any, ref: React.Ref<any>) {
  const tabs = useTabs(props);
  const context = React.useMemo(() => tabs, [tabs]);

  return (
    <TabContextProvider value={context}>
      <Box ref={ref}>{props.children}</Box>
    </TabContextProvider>
  );
});

const Tab = forwardRef(function Tab(props: any, ref: React.Ref<any>) {
  const tab = useTab(props, ref);
  return <Box {...props} {...tab} />;
});

const TabList = forwardRef(function TabList(props: any, ref: React.Ref<any>) {
  const tablist = useTabList(props);
  return <Flex ref={ref} {...props} {...tablist} />;
});

const TabPanel = forwardRef(function TabPanel(props: any, ref: React.Ref<any>) {
  const tabpanel = useTabPanel(props);
  return <Box ref={ref} {...props} {...tabpanel} />;
});

const TabPanels = function TabPanels(props: any) {
  const tabpanels = useTabPanels(props);
  return <React.Fragment>{tabpanels}</React.Fragment>;
};

export function TabsExample() {
  const [index, setIndex] = React.useState(1);
  return (
    <Tabs
      // defaultIndex={1}
      isManual
      onChange={console.log}
      orientation="vertical"
    >
      <TabList>
        <Tab isDisabled isFocusable>
          Tab 1
        </Tab>
        <Tab isDisabled>Tab 2</Tab>
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

export function TabsExample2() {
  const [index, setIndex] = React.useState(2);
  return (
    <React.Fragment>
      <input
        type="range"
        max="4"
        min="0"
        value={index}
        onChange={e => setIndex(Number(e.target.value))}
      />
      <Tabs
        color="green"
        index={index}
        // isManual
        orientation="horizontal"
        onChange={setIndex}
      >
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab isDisabled>Tab 2</Tab>
          <Tab>Tab 3</Tab>
          <Tab>Tab 4</Tab>
          <Tab>Tab 5</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
          <TabPanel>Tab Panel 4</TabPanel>
          <TabPanel>Tab Panel 5</TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
}
