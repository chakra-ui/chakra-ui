/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useId, useRoverState, useRover } from "@chakra-ui/hooks";
import { composeEventHandlers } from "@chakra-ui/utils";
import { cloneElement } from "react";
import { Children } from "react";

interface UseTabOptions {
  isSelected: boolean;
  isDisabled: boolean;
  id: string;
  panelId: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedId: string;
  isManual: boolean;
  onClick: React.MouseEventHandler<any>;
  onFocus: React.FocusEventHandler<any>;
}

function Tab(props: any) {
  const uuid = useId();
  const id = `chakra-tab-${uuid}`;
  const panelId = `chakra-tabpanel-${uuid}`;

  const rover = useRover({
    state: props.state,
    actions: props.actions,
    id,
    orientation: props.orientation,
    extraData: { panelId },
  });

  const isSelected = props.selectedId === props.id;

  const onClick = () => {
    if (!props.isDisabled && !isSelected) {
      props.setSelectedTab(props.id);
    }
  };

  const onFocus = () => {
    if (!props.isDisabled && !props.isManual && !isSelected) {
      props.setSelectedTab(props.id);
    }
  };

  const keyProps = {
    ...props,
    ...rover,
    role: "tab",
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": props.panelId,
    onClick: composeEventHandlers(onClick, props.onClick),
    onFocus: composeEventHandlers(onFocus, props.onFocus),
  };

  return <button {...keyProps} />;
}

function useTabState(initialState: any): any {
  const {
    defaultActiveIndex,
    activeIndex,
    onChange,
    isManual,
    orientation,
  } = initialState;

  const defaultId = useId("tab-");
  const [selectedId, setSelectedId] = React.useState(initialState.selectedId);
  const rover = useRoverState({
    loop: true,
    defaultSelectedId: selectedId,
  });

  return {
    ...rover,
    baseId: defaultId,
    selectedId,
    setSelectedId,
    orientation: "horizontal",
  };
}

////////////////////////////////////////////////////////////////////////

function TabList(props: any) {
  return <div role="tablist" aria-orientation={props.orientation} {...props} />;
}

////////////////////////////////////////////////////////////////////////

function TabPanels(props: any) {
  const clones = Children.map(props.children, (panel, index) => {
    if (props.state.stops.length > 0) {
      return cloneElement(panel, {
        tabId: props.state.stops[index]["id"],
        id: props.state.stops[index]["panelId"],
      });
    }
    return panel;
  });
  return <React.Fragment>{clones}</React.Fragment>;
}

function TabPanel(props: any) {
  const isSelected = props.state.selectedId === props.tabId;

  return (
    <div
      id={props.id}
      role="tabpanel"
      tabIndex={-1}
      hidden={!isSelected}
      aria-labelledby={props.tabId}
    >
      {props.children}
    </div>
  );
}

export function Example() {
  const tabs = useTabState({});
  return (
    <div>
      <TabList orientation="horizontal">
        <Tab {...tabs}>Tab 1</Tab>
        <Tab {...tabs}>Tab 2</Tab>
      </TabList>
      <TabPanels {...tabs}>
        <TabPanel {...tabs}>Panel for Tab 1</TabPanel>
        <TabPanel {...tabs}>Panel for Tab 2</TabPanel>
      </TabPanels>
    </div>
  );
}

export { Tab, TabList, TabPanel, useTabState };
