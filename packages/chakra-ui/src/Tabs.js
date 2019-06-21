/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import propTypes from "prop-types";
import {
  Children,
  cloneElement,
  forwardRef,
  useRef,
  useState,
  useEffect
} from "react";
import { Box, Flex } from "./Layout";
import { orientationStyle, variantStyle } from "./TabStyle";
import { makeId } from "./utils";

const StyledTab = styled(Flex)(props => ({
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  ...themeGet(`sizes.tab.${props.tabSize}`)(props),
  "&[data-fitted]": {
    flex: 1
  },
  "&:not([aria-disabled=true]):focus": {
    zIndex: "1",
    boxShadow: `0 0 0px 2px rgba(66, 153, 225, 0.6)`
  }
}));

const Tab = forwardRef(
  ({ isSelected, isDisabled, isFitted, id, size, ...rest }, ref) => {
    return (
      <StyledTab
        ref={ref}
        role="tab"
        tabSize={size}
        tabIndex={isSelected ? 0 : -1}
        id={`tab:${id}`}
        data-fitted={isFitted ? "" : undefined}
        as="button"
        type="button"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        aria-controls={`panel:${id}`}
        {...rest}
      />
    );
  }
);

const StyledTabList = styled(Flex)`
  ${props => variantStyle(props).tabList}
  ${orientationStyle}
`;

const TabList = forwardRef((props, ref) => {
  const {
    children,
    index: selectedIndex,
    onChange,
    manualIndex,
    setManualIndex,
    orientation,
    onFocusPanel,
    isManual,
    align,
    color,
    size,
    isFitted,
    id,
    ...rest
  } = props;

  const isFocusableChild = child =>
    child.type === Tab && !child.props.isDisabled;

  const getFocusableChildren = children => {
    let focusableChildren = [];
    Children.forEach(
      children,
      child => isFocusableChild(child) && focusableChildren.push(child)
    );
    return focusableChildren;
  };

  let focusableChildren = getFocusableChildren(children);
  let count = focusableChildren.length;
  const focusableNodes = useRef([]);

  const updateIndex = index => {
    onChange && onChange(index);
    focusableNodes.current[index] && focusableNodes.current[index].focus();
  };

  const handleKeyDown = event => {
    if (event.key === "ArrowLeft") {
      let prevFocusableIndex = (selectedIndex - 1 + count) % count;
      updateIndex(prevFocusableIndex);
    }
    if (event.key === "ArrowRight") {
      let nextFocusableIndex = (selectedIndex + 1) % count;
      updateIndex(nextFocusableIndex);
    }
    if (event.key === "Home") {
      updateIndex(0);
    }
    if (event.key === "End") {
      updateIndex(focusableChildren.length - 1);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onFocusPanel && onFocusPanel();
    }
  };

  const clones = Children.map(children, (child, index) => {
    if (!isFocusableChild(child)) return child;
    let focusableChildIndex = focusableChildren.indexOf(child);
    let isSelected = isManual
      ? focusableChildIndex === manualIndex
      : focusableChildIndex === selectedIndex;

    const handleClick = event => {
      isManual && setManualIndex(focusableChildIndex);
      updateIndex(focusableChildIndex);
      child.props.onClick && child.props.onClick(event);
    };

    return cloneElement(child, {
      ref: node => (focusableNodes.current[focusableChildIndex] = node),
      isSelected,
      onClick: handleClick,
      id: makeId(id, index),
      css: variantStyle(props).tab,
      size,
      isFitted
    });
  });

  return (
    <StyledTabList
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      {...rest}
    >
      {clones}
    </StyledTabList>
  );
});

TabList.defaultProps = {
  variant: "line",
  size: "md"
};

TabList.propTypes = {
  /**
   * The alignment of the tabs
   * */
  align: propTypes.oneOf(["left", "right", "center"]),
  /**
   * If `true`, tabs will stretch to width of the tablist
   * */
  isFitted: propTypes.bool,
  /**
   * The orientation of the <TabList/>
   * */
  orientation: propTypes.oneOf(["vertical", "horizontal"]),
  /**
   * The size of the tab (affects the font-size and padding)
   * */
  size: propTypes.oneOf(["sm", "md", "lg"])
};

const TabPanel = ({ children, isSelected, selectedPanelRef, id, ...rest }) => {
  const { onSelectTab, onFocusPanel, ...htmlProps } = rest;
  return (
    <Box
      ref={isSelected ? selectedPanelRef : undefined}
      role="tabpanel"
      tabIndex={-1}
      aria-labelledby={`tab:${id}`}
      hidden={!isSelected}
      id={`panel:${id}`}
      css={{ "&:focus": { outline: "0" } }}
      {...htmlProps}
    >
      {children}
    </Box>
  );
};

const TabPanels = forwardRef(function TabPanels(
  {
    children,
    index: selectedIndex,
    selectedPanelRef,
    id,
    tabPanelStyle,
    ...rest
  },
  ref
) {
  const clones = Children.map(children, (child, index) =>
    cloneElement(child, {
      isSelected: index === selectedIndex,
      selectedPanelRef,
      id: makeId(id, index),
      style: tabPanelStyle
    })
  );

  return (
    <Box role="tabpanel" tabIndex="-1" ref={ref} {...rest}>
      {clones}
    </Box>
  );
});

// ======================== TAB COMPONENT =======================

const Tabs = forwardRef(function Tabs(
  {
    children,
    onChange,
    index: controlledIndex,
    defaultIndex,
    id,
    isManual,
    ...props
  },
  ref
) {
  const isControlled = controlledIndex != null;
  const selectedPanelRef = useRef(null);
  const [focusIndex, setFocusIndex] = useState(defaultIndex || 0);
  const [manualIndex, setManualIndex] = useState(defaultIndex || 0);

  let actualIdx = isControlled ? controlledIndex : focusIndex;
  let manualIdx = isControlled ? controlledIndex : manualIndex;

  const clones = Children.map(children, child => {
    if (child.type === TabList) {
      return cloneElement(child, {
        index: actualIdx,
        manualIndex: manualIdx,
        setManualIndex: setManualIndex,
        isManual,
        id,
        onChange: index => {
          if (!isControlled) setFocusIndex(index);
          onChange && onChange(index);
        },
        onFocusPanel: () => {
          if (selectedPanelRef.current) selectedPanelRef.current.focus();
        }
      });
    }

    if (child.type === TabPanels) {
      return cloneElement(child, {
        index: isManual ? manualIdx : actualIdx,
        selectedPanelRef,
        id
      });
    }
  });
  return (
    <Box ref={ref} {...props}>
      {clones}
    </Box>
  );
});

Tabs.propTypes = {
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  isManual: propTypes.bool,
  /**
   * The children of the tabs should be `TabPanel` and `TabList`
   */
  children: propTypes.node.isRequired,
  /**
   * Callback when the index (controlled or un-controlled) changes
   */
  onChange: propTypes.func
};

export default Tabs;
export { TabList, Tab, TabPanel, TabPanels };
