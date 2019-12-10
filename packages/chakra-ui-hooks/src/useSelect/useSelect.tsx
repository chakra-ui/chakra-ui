import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import * as React from "react";
import useBlurOutside from "../useBlurOutside";
import createCtx from "../useCreateContext";
import useDisclosure from "../useDisclosure";
import { useForkRef } from "../useForkRef";
import usePopper from "../usePopper";
import useRapidKeydown from "../useRapidKeydown";
import { useSelectionItem, useSelectionState } from "../useSelection";
import {
  SelectionItem,
  reducer,
  SelectionAction,
  SelectionState,
} from "../useSelection/reducer";
import useFocusManagement from "./useFocusManagement";
import useOpenEffect from "./useOpenEffect";
import useScrollIntoView from "./useScrollIntoView";
import { useDefaultValue, useValue } from "./useValue";
import useId from "../useId";
import useIds from "../useIds";
import useDisableHoverOutside from "./useDisableHoverOutside";
import useIsomorphicEffect from "../useIsomorphicEffect";

////////////////////////////////////////////////////////////////////////////////////

const [useSelectState, StateProvider] = createCtx<SelectionState>();
const [useSelectDispatch, DispatchProvider] = createCtx<
  React.Dispatch<SelectionAction>
>();
const [useSelectDisclosure, DisclosureProvider] = createCtx<
  ReturnType<typeof useDisclosure>
>();
const [useSelectOptions, OptionsProvider] = createCtx<{
  controlRef: React.RefObject<any>;
  listBoxRef: React.RefObject<any>;
  shouldScrollRef: React.MutableRefObject<boolean>;
  listBoxId: string;
  buttonId: string;
}>();

/////////////////////////////////////////////////////////////////////////////////

export function useSelectOption(props: any) {
  const { isDisabled, isFocusable, value } = props;

  const dispatch = useSelectDispatch();
  const { selectedItem, highlightedItem } = useSelectState();
  const { onClose } = useSelectDisclosure();
  const { shouldScrollRef } = useSelectOptions();

  const id = useId(`select-option`, props.id);
  const ref = React.useRef<any>(null);
  const item = React.useMemo(() => ({ id, ref, value }), [id, ref, value]);

  // If this option is not disabled, register it
  // as a descendant on context onMount
  useIsomorphicEffect(() => {
    if (isDisabled && !isFocusable) return;
    dispatch({ type: "REGISTER", item });
    return () => {
      dispatch({ type: "UNREGISTER", id });
    };
    // eslint-disable-next-line
  }, [isDisabled, isFocusable, id]);

  const isHighlighted = highlightedItem ? highlightedItem.id === id : false;
  const isSelected = selectedItem ? selectedItem.id === id : false;

  const onClick = React.useCallback(() => {
    if (selectedItem && item.id === selectedItem.id) {
      onClose();
    } else {
      dispatch({ type: "SELECT", item });
      onClose();
    }
    // eslint-disable-next-line
  }, [item, onClose, selectedItem]);

  const onPointerEnter = React.useCallback(() => {
    if (highlightedItem && item.id === highlightedItem.id) {
      return;
    }
    shouldScrollRef.current = false;
    dispatch({ type: "HIGHLIGHT", item });
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

  const dispatch = useSelectDispatch();
  const [onRapidKeyDown] = useRapidKeydown();

  const onClick = React.useCallback(() => {
    onToggle();
  }, [onToggle]);

  const onKeyDown = createOnKeyDown({
    onKeyDown: event =>
      onRapidKeyDown(event, keys =>
        dispatch({ type: "SEARCH", characters: keys, action: "select" }),
      ),
    keyMap: {
      ArrowUp: onOpen,
      ArrowDown: onOpen,
      ArrowRight: () => dispatch({ type: "NEXT", action: "select" }),
      ArrowLeft: () => dispatch({ type: "PREVIOUS", action: "select" }),
      Home: () => dispatch({ type: "FIRST", action: "select" }),
      End: () => dispatch({ type: "LAST", action: "select" }),
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
  const dispatch = useSelectDispatch();
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
          return dispatch({ type: "NEXT", action: "highlight" });
        case "ArrowUp":
          event.preventDefault();
          return dispatch({ type: "PREVIOUS", action: "highlight" });
        case "Enter":
          event.preventDefault();
          dispatch({ type: "SELECT", item: null });
          return onClose();
        case "Home":
          event.preventDefault();
          return dispatch({ type: "FIRST", action: "highlight" });
        case "End":
          event.preventDefault();
          return dispatch({ type: "LAST", action: "highlight" });
        case "Escape":
          event.preventDefault();
          dispatch({ type: "RESET", action: "highlighted" });
          return onClose();
        case "Tab":
          event.preventDefault();
          return onClose();
        default:
          return onRapidKeyDown(event, keys =>
            dispatch({
              type: "SEARCH",
              characters: keys,
              action: "highlight",
            }),
          );
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

/**
 * function focusLandsOnElement(event, nextElement){
 * return (
    event.relatedTarget === nextElement ||
    (event.nativeEvent &&
      (nextElement === event.nativeEvent.explicitOriginalTarget ||
        nextElement.contains(event.nativeEvent.explicitOriginalTarget)))
  )}

  const menuHandleBlur = event => {
    if (!focusLandsOnElement(event, toggleButtonRef.current)) {
      dispatch({
        type: stateChangeTypes.MenuBlur,
      })
    }
  }
 * 
 * 
 */

export function SelectProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, {
    items: [],
    selectedItem: null,
    highlightedItem: null,
  });

  const disclosure = useDisclosure(props);
  const controlRef = React.useRef<any>();
  const listBoxRef = React.useRef<any>();
  const shouldScrollRef = React.useRef(true);
  const [buttonId, listBoxId] = useIds([`select-button`, `select-listbox`]);

  useScrollIntoView(
    listBoxRef,
    state.highlightedItem,
    disclosure.isOpen,
    shouldScrollRef,
  );

  useFocusManagement(controlRef, listBoxRef, disclosure.isOpen);
  useOpenEffect(state, dispatch, disclosure.isOpen, disclosure.prevIsOpen);
  useDisableHoverOutside(listBoxRef, disclosure.isOpen);

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
      <DispatchProvider value={dispatch}>
        <DisclosureProvider value={disclosure}>
          <OptionsProvider value={options}>{props.children}</OptionsProvider>
        </DisclosureProvider>
      </DispatchProvider>
    </StateProvider>
  );
}
