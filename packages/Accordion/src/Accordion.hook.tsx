import { useDescendant, useDescendants } from "@chakra-ui/descendant";
import {
  useControllableProp,
  useDisclosure,
  useFocusEffect,
  useIds,
} from "@chakra-ui/hooks";
import { useTabbable } from "@chakra-ui/tabbable";
import {
  composeEventHandlers,
  createOnKeyDown,
  getNextIndex,
  getPrevIndex,
} from "@chakra-ui/utils";
import * as React from "react";
import * as Warning from "./Accordion.warning";

//////////////////////////////////////////////////////////////////////

//@ts-ignore
const __DEV__ = process.env.NODE_ENV !== "production";

export type ExpandedIndex = number | number[];

//////////////////////////////////////////////////////////////////////

export interface AccordionHookProps {
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
  index?: ExpandedIndex;
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: ExpandedIndex;
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?: (expandedIndex?: ExpandedIndex | null) => void;
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode;
}

export function useAccordion(props: AccordionHookProps) {
  const { onChange, defaultIndex, index: indexProp, allowMultiple } = props;

  /**
   * Keep track of all the opened accordion index
   */
  const [indexState, setIndex] = React.useState<ExpandedIndex | null>(() => {
    if (allowMultiple) {
      return defaultIndex || [];
    } else {
      return defaultIndex || null;
    }
  });

  const descendantsContext = useDescendants();

  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  /**
   * To allow for controlled/uncontrolled, let's check if the component
   * is controlled (i.e. if the index prop was passed)
   */
  const [isControlled, index] = useControllableProp(indexProp, indexState);

  /**
   * Function that updates state and invokes `onChange` callback
   */
  const updateIndex = React.useCallback(
    (indexes: ExpandedIndex | null) => {
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

    type AccordionElement = React.ReactElement<{
      isOpen: boolean;
      onChange: (isOpen: boolean) => void;
    }>;

    /**
     * Pass some props to each accordion item
     */
    return React.cloneElement(child as AccordionElement, {
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

  if (__DEV__) {
    Warning.allowMultiple(props);
    Warning.allowMultipleAndAllowToggle(props);
    Warning.controlledAndNoChange(props);
    Warning.controlledSwitching("Accordion", isControlled, indexProp);
  }

  return { children, focusedIndex, setFocusedIndex, descendantsContext };
}

type AccordionHookReturn = Required<ReturnType<typeof useAccordion>>;

//////////////////////////////////////////////////////////////////////

export interface AccordionItemHookProps {
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

type AccordionItemContext = Omit<AccordionHookReturn, "children">;

export function useAccordionItem(
  props: AccordionItemHookProps & { context: AccordionItemContext },
) {
  const { isDisabled, isFocusable, onChange, context } = props;
  const { descendantsContext, focusedIndex, setFocusedIndex } = context;

  // Manages the open and close state of a single accordion item
  const disclosure = useDisclosure(props);
  const { isControlled, onToggle, isOpen } = disclosure;

  const ref = React.useRef<HTMLButtonElement>(null);

  // Generate some ids
  const [buttonId, panelId] = useIds(`accordion-header`, `accordion-panel`);

  // Add some warnings
  if (__DEV__) {
    Warning.controlledSwitching("AccordionItem", isControlled, props.isOpen);
    Warning.focusableNotDisabled(props);
  }

  // Think of this as a way to register this item in the selection manager
  const { index, descendants } = useDescendant({
    element: ref.current,
    context: descendantsContext,
    disabled: isDisabled,
    focusable: isFocusable,
  });

  const isFocused = index === focusedIndex;

  // Focus the accordion button if it's highlighted
  useFocusEffect(ref, { shouldFocus: isFocused });

  // Function to toggle the visibility of the accordion item
  const onClick = React.useCallback(() => {
    if (!isControlled) onToggle();
    if (onChange) onChange(!isOpen);
    setFocusedIndex(index);
  }, [isControlled, onToggle, onChange, isOpen, setFocusedIndex, index]);

  // ARIA: Allow for keyboard navigation between accordion items
  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowDown: () => {
        const nextIndex = getNextIndex(index, descendants.length);
        const nextAccordion = descendants[nextIndex];
        nextAccordion?.element?.focus();
      },
      ArrowUp: () => {
        const prevIndex = getPrevIndex(index, descendants.length);
        const prevAccordion = descendants[prevIndex];
        prevAccordion?.element?.focus();
      },
      Home: () => {
        const firstAccordion = descendants[0];
        firstAccordion?.element?.focus();
      },
      End: () => {
        const lastAccordion = descendants[descendants.length - 1];
        lastAccordion?.element?.focus();
      },
    },
  });

  // Since each accordion item's button still remains tabbable, let's
  // update the focusManager when it receives focus
  const onFocus = React.useCallback(() => {
    setFocusedIndex(index);
  }, [index, setFocusedIndex]);

  // Let's organize the goods and return it :)
  return {
    ...disclosure,
    buttonRef: ref,
    buttonId,
    panelId,
    onClick,
    onKeyDown,
    onFocus,
    isDisabled,
    isFocusable,
  };
}

type AccordionItemHookReturn = ReturnType<typeof useAccordionItem>;

//////////////////////////////////////////////////////////////////////

export interface AccordionItemButtonHookProps {
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  context: AccordionItemHookReturn;
}

export function useAccordionItemButton(props: AccordionItemButtonHookProps) {
  const { context, ...htmlProps } = props;
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
  } = context;

  // With useTabbable, we don't have to worry about managing when the button is disabled
  // or trigger a click on Enter or Space bar
  const tabbable = useTabbable({
    ...htmlProps,
    isDisabled,
    isFocusable,
    onClick: composeEventHandlers(htmlProps.onClick, onClick),
    onKeyDown: composeEventHandlers(htmlProps.onKeyDown, onKeyDown),
  });

  return {
    ...tabbable,
    ref: buttonRef,
    "aria-expanded": isOpen,
    "aria-controls": panelId,
    id: buttonId,
    onFocus: composeEventHandlers(htmlProps.onFocus, onFocus),
  };
}

//////////////////////////////////////////////////////////////////////

export function useAccordionItemPanel(props: {
  context: AccordionItemHookReturn;
}) {
  const { panelId, buttonId, isOpen } = props.context;
  return {
    ...props,
    role: "region",
    id: panelId,
    "aria-labelledby": buttonId,
    hidden: !isOpen,
  };
}
