import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import constate from "constate";
import * as React from "react";
import useControllableValue from "../useControllableValue";
import createCtx from "../useCreateContext";
import useDisclosure from "../useDisclosure/useDisclosure";
import useFocusEffect from "../useFocusEffect/useFocusEffect";
import useIds from "../useIds";
import { useSelectionItem, useSelectionState } from "../useSelection";
import useTabbable from "../useTabbable";

interface AccordionItemOptions {
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

type Index = number | number[];

// Error checks
// 1. If allowMultiple, index or defaultIndex must be an array
// 2. Controlled and uncontrolled checks
// 3. cloneElement checks, so when user style their accordion item, it still works
// 4. Passing isFocusable has no effect without isDisabled

export function useAccordion(props: any) {
  const { onChange, defaultIndex, index: indexProp, allowMultiple } = props;
  const getInitialState = () => {
    if (allowMultiple) return defaultIndex || [];
    else return defaultIndex || null;
  };

  // Keep track of all the opened accordion index
  // TODO: Ideally, we should use ids not index
  const [indexState, setIndex] = React.useState<Index | null>(getInitialState);

  // To allow for controlled or uncontrolled mode
  const [isControlled, index] = useControllableValue(indexProp, indexState);

  // Only this the only site where state gets updated
  const updateIndex = React.useCallback(
    (indexes: Index | null) => {
      if (!isControlled) {
        setIndex(indexes);
      }
      if (onChange) {
        onChange(indexes);
      }
    },
    [isControlled, onChange],
  );

  // Some Magic :) It manages the focus between accordion items
  const selection = useSelectionState();

  const children = React.Children.map(props.children, (child, childIndex) => {
    // Ignore falsy or invalid elements
    if (!React.isValidElement(child)) return;

    // Condition that controls if an item is opened
    const isOpenCondition = Array.isArray(index)
      ? index.includes(childIndex)
      : index === childIndex;

    // Pass some props to each accordion item
    return React.cloneElement(child as React.ReactElement<any>, {
      isOpen: isOpenCondition,
      onChange: (isOpen: boolean) => {
        if (props.allowMultiple && Array.isArray(index)) {
          if (isOpen) {
            const newIndexes = [...index, childIndex];
            updateIndex(newIndexes);
          } else {
            const newIndexes = index.filter(idx => idx !== childIndex);
            updateIndex(newIndexes);
          }
        } else {
          if (isOpen) {
            updateIndex(childIndex);
          } else {
            if (props.allowToggle) {
              updateIndex(null);
            }
          }
        }
      },
    });
  });

  return { selection, children };
}

const [useAccordionCtx, AccordionCtxProvider] = createCtx<
  ReturnType<typeof useAccordion>["selection"]
>();

export function Accordion(props: any) {
  const { selection, children } = useAccordion(props);
  const ctx = React.useMemo(() => selection, [selection]);
  return <AccordionCtxProvider value={ctx}>{children}</AccordionCtxProvider>;
}

export function useAccordionItem(props: AccordionItemOptions) {
  const { isDisabled, isFocusable, onChange } = props;

  // Manages the open and close state of a single accordion item
  const disclosure = useDisclosure(props);
  const { isControlled, onToggle, isOpen } = disclosure;

  // Generate some ids
  const [buttonId, panelId] = useIds([`accordion-header`, `accordion-panel`]);

  const selection = useAccordionCtx();
  const { highlight, next, previous, first, last } = selection;

  // Think of this as a way to register this item in the FocusManager
  const { isHighlighted, item } = useSelectionItem({
    ...selection,
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
    button: {
      ref: item.ref,
      "aria-expanded": disclosure.isOpen,
      "aria-controls": panelId,
      id: buttonId,
      onClick,
      onKeyDown,
      onFocus,
    },
    panel: {
      role: "region",
      id: panelId,
      "aria-labelledby": buttonId,
      hidden: !disclosure.isOpen,
    },
    isExpanded: disclosure.isOpen,
    isDisabled: props.isDisabled,
    isFocusable: props.isFocusable,
  };
}

// To manage communication between the accordion item's children,
// let's create a context and a hook to read from context
const [AccordionItem, useAccordionItemCtx] = constate(useAccordionItem);
export { AccordionItem };

export function useAccordionButton(props: any) {
  // Read from the accordion item's context
  const { button, isDisabled, isFocusable } = useAccordionItemCtx();

  // With useTabbable, we don't have to worry about managing when the button is disabled
  // or trigger a click on Enter or Space bar
  const tabbable = useTabbable({
    ...button,
    isDisabled,
    isFocusable,
    onClick: composeEventHandlers(props.onClick, button.onClick),
    onKeyDown: composeEventHandlers(props.onKeyDown, button.onKeyDown),
    // clickOnEnter: true,
    // clickOnSpace: true,
  });

  return { ...props, ...button, ...tabbable };
}

export function useAccordionPanel(props: any) {
  const { panel } = useAccordionItemCtx();
  return { ...props, ...panel };
}
