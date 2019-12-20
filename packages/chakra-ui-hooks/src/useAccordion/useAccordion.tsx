/**
 * Welcome to Chakra's useAccordion hook
 *
 * References + Credits:
 * - https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
 * - https://inclusive-components.design/collapsible-sections/
 * - https://github.com/stereobooster/react-accessible-accordion
 * - https://jqueryui.com/accordion/
 *
 * Core Requirements:
 * - Should have the appropriate aria-* state and relationship attributes
 * - Support keydown navigation between accordion items
 * - Allow toggling items and allow multiple items
 *
 * Component Parts:
 * - Accordion: manages the global state of all opened accordion items via context
 * - AccordionItem: manages the state for a single accordion item
 * - AccordionButton: the trigger to open/close an accordion item
 * - AccordionPanel: the main content area for the accordion item
 */

import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import constate from "constate";
import * as React from "react";
import useControllableValue from "../useControllableValue";
import createCtx from "../useCreateContext";
import {
  useDescendant,
  useDescendants,
  UseDescendantsReturn,
} from "../useDescendant";
import useDisclosure from "../useDisclosure/useDisclosure";
import useFocusEffect from "../useFocusEffect/useFocusEffect";
import { useForkRef } from "../useForkRef";
import useIds from "../useIds";
import useTabbable from "../useTabbable";
import {
  warnForAllowMultipleAndAllowToggle,
  warnForAllowMultipleArray,
  warnForControlledNoOnChange,
  warnForControlledSwitching,
  warnForFocusableNotDisabled,
} from "./warning";

const __DEV__ = process.env.NODE_ENV !== "production";

/**
|-------------------------------------------------------------------------------
| Accordion component
|-------------------------------------------------------------------------------
*/

// We'll start with some Type Definitions

type Index = number | number[];

export interface AccordionOptions {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: boolean;
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: boolean;
  /**
   * The index(es) of the expanded accordion item
   */
  index?: Index;
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: Index;
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?: (expandedIndex?: Index | null) => void;
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode;
}

export function useAccordion(props: AccordionOptions) {
  const { onChange, defaultIndex, index: indexProp, allowMultiple } = props;

  /**
   * Keep track of all the opened accordion index
   */
  const [indexState, setIndex] = React.useState<Index | null>(() => {
    if (allowMultiple) return defaultIndex || [];
    else return defaultIndex || null;
  });

  /**
   * To allow for controlled/uncontrolled, let's check if the component
   * is controlled (i.e. if the index prop was passed)
   */
  const [isControlled, index] = useControllableValue(indexProp, indexState);

  /**
   * Function that updates state and invokes `onChange` callback
   */
  const updateIndex = React.useCallback(
    (indexes: Index | null) => {
      if (!isControlled) setIndex(indexes);
      if (onChange) onChange(indexes);
    },
    [isControlled, onChange],
  );

  /**
   * The selection manager is use to support keyboard navigation
   * We'll add `useSelectionState` which helps us register the
   * focusable items so when you press `up` and `down`, we can
   * move focus between the items.
   */
  const descendants = useDescendants();

  /**
   * We'll map through the children and inject the `isOpen` and `onChange` attributes
   * via cloneElement
   */
  const children = React.Children.map(props.children, (child, childIndex) => {
    /**
     * Ignore falsy, nullish or invalid elements
     */
    if (!React.isValidElement(child)) return;

    /**
     * Condition that controls if an item is opened
     */
    const isOpenCondition = Array.isArray(index)
      ? index.includes(childIndex)
      : index === childIndex;

    /**
     * Pass some props to each accordion item
     */
    return React.cloneElement(
      child as React.ReactElement<{
        isOpen: boolean;
        onChange: (isOpen: boolean) => void;
      }>,
      {
        isOpen: isOpenCondition,
        onChange: (isOpen: boolean) => {
          /**
           * If we support multiple accordions being visible, then we'll
           * use array methods to update state
           */
          if (props.allowMultiple && Array.isArray(index)) {
            if (isOpen) {
              const nextState = [...index, childIndex];
              updateIndex(nextState);
            } else {
              const nextState = index.filter(idx => idx !== childIndex);
              updateIndex(nextState);
            }
          } else {
            /**
             * If we support only one accordion to be visible, then we
             * update state directly
             */
            if (isOpen) updateIndex(childIndex);
            else {
              if (props.allowToggle) updateIndex(null);
            }
          }
        },
      },
    );
  });

  /** Add warning for allow multiple */
  if (__DEV__) {
    warnForAllowMultipleArray(props);
    warnForAllowMultipleAndAllowToggle(props);
    warnForControlledNoOnChange(props);
    warnForControlledSwitching("Accordion", isControlled, indexProp);
  }

  /**
   * We're returning the enhanced children and the selection (for focus management)
   */
  return { descendants, children };
}

/**
 * Let's create context for the Accordion
 */
const [useAccordionCtx, AccordionCtxProvider] = createCtx<
  UseDescendantsReturn
>();

/**
 * This will be the provider for the accordion state
 */
export function Accordion(props: AccordionOptions) {
  const { children, descendants } = useAccordion(props);
  const ctx = React.useMemo(() => descendants, [descendants]);
  return <AccordionCtxProvider value={ctx}>{children}</AccordionCtxProvider>;
}

/**
|-------------------------------------------------------------------------------
| AccordionItem component
|-------------------------------------------------------------------------------
*/

// We'll start with some Type Definitions

export interface AccordionItemOptions {
  /**
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, expands the accordion by on initial mount.
   */
  defaultIsOpen?: boolean;
  /**
   * If `true`, the accordion item will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the accordion item will be focusable.
   */
  isFocusable?: boolean;
  /**
   * A unique id for the accordion item.
   */
  id?: string;
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: (isOpen: boolean) => void;
}

export function useAccordionItem(props: AccordionItemOptions) {
  const { isDisabled, isFocusable, onChange } = props;

  // Manages the open and close state of a single accordion item
  const disclosure = useDisclosure(props);
  const { isControlled, onToggle, isOpen } = disclosure;

  // Generate some ids
  const [buttonId, panelId] = useIds([`accordion-header`, `accordion-panel`]);

  // Add some warnings
  if (__DEV__) {
    warnForControlledSwitching("AccordionItem", isControlled, props.isOpen);
    warnForFocusableNotDisabled(props);
  }

  // The keyboard navigation manager
  const [state, actions] = useAccordionCtx();
  const { highlight, next, previous, first, last } = actions;

  // Think of this as a way to register this item in the selection manager
  const { isHighlighted, item } = useDescendant({
    actions,
    state,
    id: buttonId,
    isDisabled,
    isFocusable,
  });

  // Focus the accordion button if it's highlighted
  useFocusEffect(item.ref, { shouldFocus: isHighlighted });

  // Function to toggle the visibility of the accordion item
  const onClick = React.useCallback(() => {
    if (!isControlled) onToggle();
    if (onChange) onChange(!isOpen);
    highlight(item);
  }, [highlight, onChange, isOpen, isControlled, onToggle, item]);

  // ARIA: Allow for keyboard navigation between accordion items
  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowDown: () => next("highlight"),
      ArrowUp: () => previous("highlight"),
      Home: () => first("highlight"),
      End: () => last("highlight"),
    },
  });

  // Since each accordion item's button still remains tabbable, let's
  // update the focusManager when it receives focus
  const onFocus = React.useCallback(() => highlight(item), [highlight, item]);

  // Let's organize the goods and return it :)
  return {
    ...disclosure,
    buttonRef: item.ref,
    buttonId: item.id,
    panelId,
    onClick,
    onKeyDown,
    onFocus,
    isDisabled: props.isDisabled,
    isFocusable: props.isFocusable,
  };
}

// To manage communication between the accordion item's children,
// let's create a context and a hook to read from context
const [
  AccordionItem,
  useAccordionItemContext,
  useAccordionItemState,
] = constate(
  useAccordionItem,
  context => context,
  context => ({
    isOpen: context.isOpen,
    onClose: context.onClose,
    isDisabled: context.isDisabled,
  }),
);
export { AccordionItem, useAccordionItemState };

/**
|-------------------------------------------------------------------------------
| AccordionTrigger component
|-------------------------------------------------------------------------------
*/

export interface AccordionButtonOptions {
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.RefObject<HTMLElement>;
}

export function useAccordionButton(props: AccordionButtonOptions) {
  // Read from the accordion item's context
  const {
    buttonRef,
    onClick,
    onKeyDown,
    onFocus,
    panelId,
    buttonId,
    isDisabled,
    isFocusable,
    isOpen,
  } = useAccordionItemContext();

  // With useTabbable, we don't have to worry about managing when the button is disabled
  // or trigger a click on Enter or Space bar
  const tabbable = useTabbable({
    ...props,
    isDisabled,
    isFocusable,
    onClick: composeEventHandlers(props.onClick, onClick),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  });

  const ref = useForkRef(buttonRef, props.ref);

  return {
    ...tabbable,
    ref,
    "aria-expanded": isOpen,
    "aria-controls": panelId,
    id: buttonId,
    onClick,
    onKeyDown,
    onFocus,
  };
}

/**
|-------------------------------------------------------------------------------
| AccordionPanel component
|-------------------------------------------------------------------------------
*/

export function useAccordionPanel(props = {}) {
  const { panelId, buttonId, isOpen } = useAccordionItemContext();
  return {
    ...props,
    role: "region",
    id: panelId,
    "aria-labelledby": buttonId,
    hidden: !isOpen,
  };
}
