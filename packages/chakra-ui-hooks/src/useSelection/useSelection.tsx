import constate from "constate";
import * as React from "react";
import useId from "../useId";
import { EventMeta, Item, reducer, State } from "./reducer";

export interface SelectionActions {
  /**
   * Registers Id, ref, and value of an element.
   */
  register: (item: Item) => void;
  /**
   * Unregisters the element.
   */
  unregister: (id: Item["id"]) => void;
  /**
   * Moves focus to a given element ID.
   */
  highlight: (
    item: Item | null,
    selectOnHighlight?: boolean,
    eventSource?: EventMeta,
  ) => void;
  /**
   * Moves focus to a given element ID.
   */
  select: (
    item: Item | null,
    highlightOnSelect?: boolean,
    eventSource?: EventMeta,
  ) => void;
  /**
   * Moves focus to the next element.
   */
  next: (action: "select" | "highlight", eventSource?: EventMeta) => void;
  /**
   * Moves focus to the previous element.
   */
  previous: (action: "select" | "highlight", eventSource?: EventMeta) => void;
  /**
   * Moves focus to the first element.
   */
  first: (action: "select" | "highlight", eventSource?: EventMeta) => void;
  /**
   * Moves focus to the last element.
   */
  last: (action: "select" | "highlight", eventSource?: EventMeta) => void;
  search: (
    characters: string,
    action: "select" | "highlight",
    eventSource?: EventMeta,
  ) => void;
  /**
   * Resets `highlightedId` or `selectedId` or both.
   */
  reset: (
    action: "highlighted" | "selected" | "both",
    eventSource?: EventMeta,
  ) => void;
}

const defaultState: State = {
  items: [],
  lastEvent: "",
  selectedItem: null,
  highlightedItem: null,
};

export type Selection = State & SelectionActions;

/**
 * Hook to manage selection and focus in interactive widgets
 * @param initialState The initial state of the selection
 */
export function useSelectionState(
  initialState: Partial<State> = {},
): Selection {
  const _initialState = { ...defaultState, ...initialState };
  const [state, dispatch] = React.useReducer(reducer, _initialState);

  return {
    ...state,
    register: React.useCallback(
      item => dispatch({ type: "REGISTER", item }),
      [],
    ),
    unregister: React.useCallback(
      id => dispatch({ type: "UNREGISTER", id }),
      [],
    ),
    // Moves focus a specific `id`.
    // Focus follows selection if `selectOnHighlight` is true
    highlight: React.useCallback(
      (item, selectOnHighlight, eventSource) =>
        dispatch({
          type: "HIGHLIGHT",
          item,
          selectOnHighlight,
          lastEvent: eventSource,
        }),
      [],
    ),
    // Select option with specified id. If no id is passed, then it'll use the focusedId
    // Highlight follows selection if `highlightOnSelect` is true. useful for mouse clicks
    // you need to move focus and selection together.
    select: React.useCallback(
      (item, highlightOnSelect, eventSource) =>
        dispatch({
          type: "SELECT",
          item,
          highlightOnSelect,
          lastEvent: eventSource,
        }),
      [],
    ),
    first: React.useCallback(
      (action, eventSource) =>
        dispatch({ type: "FIRST", action, lastEvent: eventSource }),
      [],
    ),
    last: React.useCallback(
      (action, eventSource) =>
        dispatch({ type: "LAST", action, lastEvent: eventSource }),
      [],
    ),
    // To reset the state, you need to pass which part you want to reset,
    // by default it'll reset only the highlighted option
    reset: React.useCallback(
      (action: "highlighted" | "selected" | "both", eventSource) =>
        dispatch({ type: "RESET", action, lastEvent: eventSource }),
      [],
    ),
    search: React.useCallback(
      (characters, action) =>
        dispatch({
          type: "SEARCH",
          characters,
          action,
        }),
      [],
    ),
    next: React.useCallback(
      (action, eventSource) =>
        dispatch({ type: "NEXT", action, lastEvent: eventSource }),
      [],
    ),
    previous: React.useCallback(
      (action, eventSource) =>
        dispatch({ type: "PREVIOUS", action, lastEvent: eventSource }),
      [],
    ),
  };
}

export function useSelectionItem(
  props: Selection & {
    id?: Item["id"];
    value?: Item["value"];
    isDisabled?: boolean;
    isFocusable?: boolean;
  },
) {
  const {
    id: idProp,
    value,
    highlightedItem,
    selectedItem,
    register,
    isDisabled,
    unregister,
    isFocusable,
  } = props;
  const uuid = useId();
  const id = idProp || uuid;
  const ref = React.useRef<any>(null);

  const isHighlighted = highlightedItem ? highlightedItem.id === id : false;
  const isSelected = selectedItem ? selectedItem.id === id : false;

  const newItem = React.useMemo(() => ({ id, ref, value }), [id, ref, value]);

  React.useLayoutEffect(() => {
    if (isDisabled && !isFocusable) return;
    register(newItem);
    return () => {
      unregister(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, isFocusable]);

  return { item: newItem, isHighlighted, isSelected };
}

const [SelectionProvider, useSelection] = constate(useSelectionState);
export { useSelection, SelectionProvider };
