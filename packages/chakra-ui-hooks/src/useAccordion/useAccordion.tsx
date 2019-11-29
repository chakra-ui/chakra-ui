import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import * as React from "react";
import useFocusEffect from "../useFocusEffect/useFocusEffect";
import useControllableValue from "../useControllableValue";
import createCtx from "../useCreateContext";
import useDisclosure from "../useDisclosure/useDisclosure";
import useIds from "../useIds";
import {
  SelectionProvider,
  useSelection,
  useSelectionItem,
} from "../useSelection";
import useTabbable from "../useTabbable";

type Index = number | number[];

// Error checks
// 1. If allowMultiple, index or defaultIndex must be an array
// 2. Controlled and uncontrolled checks
// 3. cloneElement checks, so when user style their accordion item, it still works
// 4. Passing isFocusable has no effect without isDisabled

export function useAccordion(props: any) {
  const getInitialState = () => {
    if (props.allowMultiple) {
      return props.defaultIndex || [];
    } else {
      return props.defaultIndex || 0;
    }
  };

  // Keep track of all the opened accordion index
  // TODO: Ideally, we should use ids not index
  const [indexState, setIndex] = React.useState<Index | null>(getInitialState);

  // To allow for controlled or uncontrolled mode
  const [isControlled, index] = useControllableValue(props.index, indexState);

  // Only this the only site where state gets updated
  const updateIndex = (indexes: Index | null) => {
    if (!isControlled) {
      setIndex(indexes);
    }
    if (props.onChange) {
      props.onChange(indexes);
    }
  };

  const children = React.Children.map(props.children, (child, childIndex) => {
    // Ignore falsy or invalid elements
    if (!React.isValidElement(child)) return;

    // Condition that controls if an item is opened
    const isOpenCondition = Array.isArray(index)
      ? index.includes(childIndex)
      : index === childIndex;

    // Pass some props to each accordion item
    // TODO: Ideally we should use `context` not `cloneElement`
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
          if (isOpen) updateIndex(childIndex);
          else if (props.allowToggle) updateIndex(null);
        }
      },
    });
  });

  return { FocusManager: SelectionProvider, children };
}

export function useAccordionItem(props: any) {
  // Manages the open and close state of a single accordion item
  const disclosure = useDisclosure(props);

  // Some Magic :) It manages the focus between accordion items
  const focusManager = useSelection();

  // Generate some ids
  const [buttonId, panelId] = useIds([`accordion-header`, `accordion-panel`]);

  // Think of this as a way to register this item in the FocusManager
  const { isHighlighted, item } = useSelectionItem({
    ...focusManager,
    id: buttonId,
    isDisabled: props.isDisabled,
    isFocusable: props.isFocusable,
  });

  // Focus the accordion button if it's highlighted
  useFocusEffect(item.ref, { shouldFocus: isHighlighted });

  // Function to toggle the visibility of the accordion item
  const onToggle = () => {
    if (!disclosure.isControlled) {
      disclosure.onToggle();
    }
    if (props.onChange) {
      props.onChange(!disclosure.isOpen);
    }

    // When we click on a button, let's update the focus manager
    focusManager.highlight(item);
  };

  // ARIA: Allow for keyboard navigation between accordion items
  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowDown: () => focusManager.next("highlight"),
      ArrowUp: () => focusManager.previous("highlight"),
      Home: () => focusManager.first("highlight"),
      End: () => focusManager.last("highlight"),
    },
  });

  // Since each accordion item's button still remains tabbable, let's
  // update the focusManager when it receives focus
  const onFocus = () => focusManager.highlight(item);

  // Let's organize the goods and return it :)
  return {
    button: {
      ref: item.ref,
      "aria-expanded": disclosure.isOpen,
      "aria-controls": panelId,
      id: buttonId,
      onClick: onToggle,
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
const [useAccordionItemCtx, AccordionItemProvider] = createCtx<any>();
export { AccordionItemProvider };

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
    clickOnEnter: true,
    clickOnSpace: true,
  });

  return { ...button, ...tabbable };
}

export function useAccordionPanel(props: any) {
  const { panel } = useAccordionItemCtx();
  return panel;
}
