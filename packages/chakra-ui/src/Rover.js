/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, cloneElement, forwardRef, useRef, useState } from "react";

/**
 * Rover is an abstract component that implements the roving
 * tabindex method to manage focus between items.
 */
const Rover = forwardRef(
  (
    {
      loop,
      defaultIndex,
      index: controlledIndex,
      orientation,
      role = "group",
      onKeyDown,
      onIndexChange,
      as: Comp = "div",
      children,
      focusableElements,
      appendProps,
      ...rest
    },
    ref
  ) => {
    const isFocusableChild = child => {
      const {
        type,
        props: { isDisabled, disabled, hidden, isHidden }
      } = child;
      const trulyDisabled = isDisabled || disabled;
      const trulyHidden = isHidden || hidden;

      if (Array.isArray(focusableElements)) {
        return (
          focusableElements.includes(type) && !trulyDisabled && !trulyHidden
        );
      }

      if (typeof focusableElements === "object") {
        return focusableElements === type && !trulyDisabled && !trulyHidden;
      }
    };

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
    const isControlled = controlledIndex != null;

    const [activeIndex, setActiveIndex] = useState(() => {
      if (defaultIndex && defaultIndex + 1 <= count) return defaultIndex;
      return 0;
    });

    const updateIndex = index => {
      setActiveIndex(index);
      onIndexChange && onIndexChange(index);
      focusableNodes.current[index] && focusableNodes.current[index].focus();
    };

    const focusNextItem = () => {
      let actualIndex = isControlled ? controlledIndex : activeIndex;
      let nextFocusableIndex = (actualIndex + 1) % count;
      if (nextFocusableIndex === 0 && !loop) return;
      updateIndex(nextFocusableIndex);
    };

    const focusPrevItem = () => {
      let actualIndex = isControlled ? controlledIndex : activeIndex;
      let prevFocusableIndex = (actualIndex - 1 + count) % count;
      if (prevFocusableIndex + 1 === count && !loop) return;
      updateIndex(prevFocusableIndex);
    };

    const focusLastItem = () => {
      updateIndex(focusableChildren.length - 1);
    };

    const focusFirstItem = () => {
      updateIndex(0);
    };

    const handleKeyDown = event => {
      event.persist();
      const { key } = event;

      /* If the roving happens on the horizontal direction only */
      if (orientation === "horizontal") {
        key === "ArrowLeft" && focusPrevItem();
        key === "ArrowRight" && focusNextItem();
      } else if (orientation === "vertical") {
        key === "ArrowUp" && focusPrevItem();
        key === "ArrowDown" && focusNextItem();
      } else {
        if (key === "ArrowLeft" || key === "ArrowUp") {
          focusPrevItem();
        }
        if (key === "ArrowRight" || key === "ArrowDown") {
          focusNextItem();
        }
      }

      if (key === "Home") focusFirstItem();
      if (key === "End") focusLastItem();

      onKeyDown && onKeyDown(event);
    };

    const clones = Children.map(children, child => {
      if (!isFocusableChild(child)) return child;
      let focusableChildIndex = focusableChildren.indexOf(child);
      let actualIndex = isControlled ? controlledIndex : activeIndex;
      let isSelected = focusableChildIndex === actualIndex;

      const handleClick = event => {
        if (!isSelected) updateIndex(focusableChildIndex);
        child.props.onClick && child.props.onClick(event);
      };

      return cloneElement(child, {
        ref: node => (focusableNodes.current[focusableChildIndex] = node),
        isSelected,
        onClick: handleClick,
        tabIndex: isSelected ? 0 : -1
      });
    });

    return (
      <Comp
        role={role}
        ref={ref}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {clones}
      </Comp>
    );
  }
);

Rover.propTypes = {
  orientation: oneOf(["horizontal", "vertical", "both"])
};

export default Rover;
