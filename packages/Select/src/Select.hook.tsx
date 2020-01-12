import {
  composeEventHandlers,
  createOnKeyDown,
  createContext,
} from "@chakra-ui/utils";
import * as React from "react";
import {
  useFocusManagement,
  useOpenEffect,
  useScrollIntoView,
} from "./Select.utils";
import {
  useBlurOutside,
  useDisclosure,
  UseDisclosureReturn,
  useId,
  useIds,
  useRapidKeydown,
} from "@chakra-ui/hooks";
import {
  DescendantsActions,
  DescendantsState,
  useDescendant,
  useDescendants,
} from "@chakra-ui/descendant";

////////////////////////////////////////////////////////////////////////////////////

const [StateProvider, useSelectState] = createContext<DescendantsState>();
const [ActionsProvider, useSelectActions] = createContext<DescendantsActions>();
const [DisclosureProvider, useSelectDisclosure] = createContext<
  UseDisclosureReturn
>();
const [OptionsProvider, useSelectOptions] = createContext<{
  controlRef: React.RefObject<any>;
  listBoxRef: React.RefObject<any>;
  shouldScrollRef: React.MutableRefObject<boolean>;
  listBoxId: string;
  buttonId: string;
}>();

/////////////////////////////////////////////////////////////////////////////////

export function useSelectOption(props: any) {
  const { isDisabled, isFocusable, value } = props;

  const actions = useSelectActions();
  const state = useSelectState();
  const { selectedItem, highlightedItem } = state;

  const { onClose } = useSelectDisclosure();
  const { shouldScrollRef } = useSelectOptions();

  const id = useId(`select-option`, props.id);

  const { item, isHighlighted, isSelected } = useDescendant({
    state,
    actions,
    id,
    isDisabled,
    isFocusable,
    value,
  });

  const onClick = React.useCallback(() => {
    if (selectedItem && item.id === selectedItem.id) {
      onClose();
    } else {
      actions.select(item);
      onClose();
    }
    // eslint-disable-next-line
  }, [item, onClose, selectedItem]);

  const onPointerEnter = React.useCallback(() => {
    if (highlightedItem && item.id === highlightedItem.id) {
      return;
    }
    shouldScrollRef.current = false;
    actions.highlight(item);
    // eslint-disable-next-line
  }, [highlightedItem, item]);

  return {
    id: item.id,
    ref: item.ref,
    "data-value": item.value,
    role: "option",
    "aria-selected": isHighlighted ? true : undefined,
    "data-selected": isSelected ? "" : undefined,
    "data-highlighted": isHighlighted ? "" : undefined,
    onClick: composeEventHandlers(props.onClick, onClick),
    onPointerEnter: composeEventHandlers(props.onPointerEnter, onPointerEnter),
  };
}

/////////////////////////////////////////////////////////////////////////////////

export function useSelectButton(props: any) {
  const { selectedItem } = useSelectState();
  const { controlRef, listBoxId } = useSelectOptions();
  const { onToggle, isOpen, onOpen } = useSelectDisclosure();

  const { next, previous, first, last, search } = useSelectActions();
  const [onRapidKeyDown] = useRapidKeydown();

  const onClick = React.useCallback(() => {
    onToggle();
  }, [onToggle]);

  const onKeyDown = createOnKeyDown({
    onKeyDown: onRapidKeyDown(keys => search(keys, "select")),
    keyMap: {
      ArrowUp: onOpen,
      ArrowDown: onOpen,
      ArrowRight: () => next("select"),
      ArrowLeft: () => previous("select"),
      Home: () => first("select"),
      End: () => last("select"),
      " ": event => {
        event && event.preventDefault();
        onToggle();
      },
    },
  });

  const selectedOptionText =
    selectedItem && (selectedItem.ref.current as Node).textContent;

  return {
    ref: controlRef,
    selected: selectedItem,
    "data-selected-text": selectedOptionText || undefined,
    type: "button",
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
    "aria-controls": listBoxId,
    onClick: composeEventHandlers(props.onClick, onClick),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  };
}

////////////////////////////////////////////////////////////////////////////////////

export function useSelectListBox(props: any) {
  const { highlightedItem } = useSelectState();
  const {
    next,
    previous,
    select,
    first,
    last,
    reset,
    search,
  } = useSelectActions();

  const { controlRef, listBoxRef } = useSelectOptions();
  const { isOpen, onClose } = useSelectDisclosure();

  const [onRapidKeyDown, keys] = useRapidKeydown();
  const onBlur = useBlurOutside(controlRef, listBoxRef, {
    action: onClose,
    visible: isOpen,
  });

  // Had to switch to regular switch/case to see if it improve perf
  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          return next("highlight");
        case "ArrowUp":
          event.preventDefault();
          return previous("highlight");
        case "Enter":
          event.preventDefault();
          select(null);
          return onClose();
        case "Home":
          event.preventDefault();
          return first("highlight");
        case "End":
          event.preventDefault();
          return last("highlight");
        case "Escape":
          event.preventDefault();
          reset("highlighted");
          return onClose();
        case "Tab":
          event.preventDefault();
          return onClose();
        default:
          return onRapidKeyDown(keys => search(keys, "highlight"))(event);
      }
    },
    // eslint-disable-next-line
    [keys],
  );

  return {
    ref: listBoxRef,
    role: "listbox",
    hidden: !isOpen,
    tabIndex: -1,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    "aria-activedescendant": highlightedItem ? highlightedItem.id : undefined,
  };
}

////////////////////////////////////////////////////////////////////////////////////

export function SelectProvider(props: any) {
  const [state, actions] = useDescendants();

  const disclosure = useDisclosure(props);
  const controlRef = React.useRef<any>();
  const listBoxRef = React.useRef<any>();
  const shouldScrollRef = React.useRef(true);
  const [buttonId, listBoxId] = useIds(`select-button`, `select-listbox`);

  useScrollIntoView(
    listBoxRef,
    state.highlightedItem,
    disclosure.isOpen,
    shouldScrollRef,
  );

  useFocusManagement(controlRef, listBoxRef, disclosure.isOpen);
  useOpenEffect(state, actions, disclosure.isOpen, disclosure.prevIsOpen);

  const stateCtx = React.useMemo(() => state, [state]);

  const options = {
    controlRef,
    listBoxRef,
    shouldScrollRef,
    buttonId,
    listBoxId,
  };

  return (
    <StateProvider value={stateCtx}>
      <ActionsProvider value={actions}>
        <DisclosureProvider value={disclosure}>
          <OptionsProvider value={options}>{props.children}</OptionsProvider>
        </DisclosureProvider>
      </ActionsProvider>
    </StateProvider>
  );
}
