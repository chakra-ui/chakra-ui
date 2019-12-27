import {
  composeEventHandlers,
  createContext,
  createOnKeyDown,
} from "@chakra-ui/utils";
import constate from "constate";
import * as React from "react";
import useControllableProp from "../useControllableProp";
import {
  useDescendant,
  useDescendants,
  UseDescendantsReturn,
} from "../useDescendant";
import useDisclosure from "../useDisclosure/useDisclosure";
import useFocusEffect from "../useFocusEffect/useFocusEffect";
import useMergeRefs from "../useMergeRefs";
import useIds from "../useIds";
import useTabbable from "../useTabbable";
import {
  AccordionButtonOptions,
  AccordionItemElement,
  AccordionItemOptions,
  AccordionOptions,
  Index,
} from "./types";
import {
  warnForAllowMultipleAndAllowToggle,
  warnForAllowMultipleArray,
  warnForControlledNoOnChange,
  warnForControlledSwitching,
  warnForFocusableNotDisabled,
} from "./warning";

//////////////////////////////////////////////////////////////////////

const __DEV__ = process.env.NODE_ENV !== "production";

//////////////////////////////////////////////////////////////////////

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
  const [isControlled, index] = useControllableProp(indexProp, indexState);

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
    return React.cloneElement(child as AccordionItemElement, {
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
          if (isOpen) {
            updateIndex(childIndex);
          } else if (props.allowToggle) {
            updateIndex(null);
          }
        }
      },
    });
  });

  /** Add all warnings */
  if (__DEV__) {
    warnForAllowMultipleArray(props);
    warnForAllowMultipleAndAllowToggle(props);
    warnForControlledNoOnChange(props);
    warnForControlledSwitching("Accordion", isControlled, indexProp);
  }

  /**
   * We're returning the enhanced children and the selection (for focus management)
   */
  return { children };
}

//////////////////////////////////////////////////////////////////////

/**
 * Let's create context for the Accordion
 */
const [AccordionCtxProvider, useAccordionCtx] = createContext<
  UseDescendantsReturn
>();

/**
 * This will be the provider for the accordion state
 */
export function Accordion(props: AccordionOptions) {
  /**
   * The selection manager is use to support keyboard navigation
   * We'll add `useDescendants` which helps us register the
   * focusable items so when you press `up` and `down`, we can
   * move focus between the items.
   */
  const descendants = useDescendants();
  const { children } = useAccordion(props);
  const ctx = React.useMemo(() => descendants, [descendants]);
  return <AccordionCtxProvider value={ctx}>{children}</AccordionCtxProvider>;
}

//////////////////////////////////////////////////////////////////////

export function useAccordionItem(props: AccordionItemOptions) {
  const { isDisabled, isFocusable, onChange } = props;

  // Manages the open and close state of a single accordion item
  const disclosure = useDisclosure(props);
  const { isControlled, onToggle, isOpen } = disclosure;

  // Generate some ids
  const [buttonId, panelId] = useIds(`accordion-header`, `accordion-panel`);

  // Add some warnings
  if (__DEV__) {
    warnForControlledSwitching("AccordionItem", isControlled, props.isOpen);
    warnForFocusableNotDisabled(props);
  }

  // The keyboard navigation manager
  const [descendantState, descendantActions] = useAccordionCtx();
  const { highlight, next, previous, first, last } = descendantActions;

  // Think of this as a way to register this item in the selection manager
  const { isHighlighted, item } = useDescendant({
    actions: descendantActions,
    state: descendantState,
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
  const onKeyDown = React.useMemo(
    () =>
      createOnKeyDown({
        keyMap: {
          ArrowDown: () => next("highlight"),
          ArrowUp: () => previous("highlight"),
          Home: () => first("highlight"),
          End: () => last("highlight"),
        },
      }),
    [next, previous, first, last],
  );

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

//////////////////////////////////////////////////////////////////////

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

  const ref = useMergeRefs(buttonRef, props.ref);

  return {
    ...tabbable,
    ref,
    "aria-expanded": isOpen,
    "aria-controls": panelId,
    id: buttonId,
    onFocus: composeEventHandlers(props.onFocus, onFocus),
  };
}

//////////////////////////////////////////////////////////////////////

export function useAccordionPanel(props: object) {
  const { panelId, buttonId, isOpen } = useAccordionItemContext();
  return {
    ...props,
    role: "region",
    id: panelId,
    "aria-labelledby": buttonId,
    hidden: !isOpen,
  };
}
