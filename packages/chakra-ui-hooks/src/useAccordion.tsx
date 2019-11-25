import { composeEventHandlers } from "@chakra-ui/utils";
import * as React from "react";
import useControllableValue from "./useControllableValue";
import useCreateContext from "./useCreateContext";
import useDisclosure from "./useDisclosure";
import useIds from "./useIds";
import useLogger from "./useLogger";
import useTabbable from "./useTabbable";

type Index = number | number[];

// Error checks
// 1. If allowMultiple, index or defaultIndex must be an array
// 2. Controlled and uncontrolled checks
// 3. cloneElement checks, so when user style their accordion item, it still works

export function useAccordion(props: any) {
  const getInitialState = () => {
    if (props.allowMultiple) {
      return props.defaultIndex || [];
    } else {
      return props.defaultIndex || 0;
    }
  };

  const getExpandCondition = (index: Index, itemIndex: number) => {
    if (Array.isArray(index)) {
      return index.includes(itemIndex);
    }
    return index === itemIndex;
  };

  const [indexState, setIndex] = React.useState<Index | null>(getInitialState);
  const [isControlled, index] = useControllableValue(props.index, indexState);

  useLogger("index", index);

  const updateIndex = (indexes: Index | null) => {
    if (!isControlled) {
      setIndex(indexes);
    }
    if (props.onChange) {
      props.onChange(indexes);
    }
  };

  const children = React.Children.map(props.children, (child, childIndex) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child as React.ReactElement<any>, {
      isOpen:
        index != undefined ? getExpandCondition(index, childIndex) : false,

      onChange: (isExpanded: boolean) => {
        if (props.allowMultiple && Array.isArray(index)) {
          if (isExpanded) {
            const newIndexes = [...index, childIndex];
            updateIndex(newIndexes);
          } else {
            const newIndexes = index.filter(idx => idx !== childIndex);
            updateIndex(newIndexes);
          }
        } else {
          if (isExpanded) updateIndex(childIndex);
          else if (props.allowToggle) updateIndex(null);
        }
      },
    });
  });

  return children;
}

export function useAccordionItem(props: any) {
  const disclosure = useDisclosure(props);
  const [headerId, panelId] = useIds([`accordion-header`, `accordion-panel`]);

  const onToggle = () => {
    if (!disclosure.isControlled) {
      disclosure.onToggle();
    }
    if (props.onChange) {
      props.onChange(!disclosure.isOpen);
    }
  };

  return {
    button: {
      "aria-expanded": disclosure.isOpen,
      "aria-controls": panelId,
      id: headerId,
      onClick: onToggle,
    },
    panel: {
      role: "region",
      id: panelId,
      "aria-labelledby": headerId,
      hidden: !disclosure.isOpen,
    },
    isExpanded: disclosure.isOpen,
    isDisabled: props.isDisabled,
  };
}

const [useAccordionItemCtx, AccordionItemProvider] = useCreateContext<any>();
export { useAccordionItemCtx, AccordionItemProvider };

export function useAccordionButton(props: any) {
  const { button } = useAccordionItemCtx();
  const tabbable = useTabbable({
    ...props,
    onClick: composeEventHandlers(props.onClick, button.onClick),
  });
  return { ...button, ...tabbable };
}

export function useAccordionPanel(props: any) {
  const { panel } = useAccordionItemCtx();
  return panel;
}
