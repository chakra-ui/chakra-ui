import { useId } from "@chakra-ui/hooks";
import * as React from "react";
import { Item, reducer, State } from "./reducer";

export type Actions = {
  /**
   * Registers Id, ref, and value of an element.
   */
  register: (id: Item["id"], ref: Item["ref"], value?: Item["value"]) => void;
  /**
   * Unregisters the element.
   */
  unregister: (id: Item["id"]) => void;
  /**
   * Moves focus to a given element ID.
   */
  highlight: (id: Item["id"] | null, selectOnHighlight?: boolean) => void;
  /**
   * Moves focus to a given element ID.
   */
  select: (id: Item["id"] | null, highlightOnSelect?: boolean) => void;
  /**
   * Moves focus to the next element.
   */
  next: (action: "select" | "highlight") => void;
  /**
   * Moves focus to the previous element.
   */
  previous: (action: "select" | "highlight") => void;
  /**
   * Moves focus to the first element.
   */
  first: (action: "select" | "highlight") => void;
  /**
   * Moves focus to the last element.
   */
  last: (action: "select" | "highlight") => void;
  search: (characters: string, action: "select" | "highlight") => void;
  /**
   * Resets `highlightedId` or `selectedId` or both.
   */
  reset: (action: "highlighted" | "selected" | "both") => void;
};

const _initialState: State = {
  items: [],
  lastEvent: "",
  selectedId: "",
  highlightedId: "",
};

export type Selection = State & Actions;

/**
 * Hook to manage selection and focus in interactive widgets
 * @param initialState The initial state of the selection
 */
export function useSelectionState(
  initialState: State = _initialState,
): Selection {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return {
    ...state,
    register: React.useCallback(
      (id, ref, value) => dispatch({ type: "REGISTER", id, ref, value }),
      [],
    ),
    unregister: React.useCallback(
      id => dispatch({ type: "UNREGISTER", id }),
      [],
    ),
    // Moves focus a specific `id`.
    // Focus follows selection if `selectOnHighlight` is true
    highlight: React.useCallback(
      (id, selectOnHighlight) =>
        dispatch({ type: "HIGHLIGHT", id, selectOnHighlight }),
      [],
    ),
    // Select option with specified id. If no id is passed, then it'll use the focusedId
    // Highlight follows selection if `highlightOnSelect` is true. useful for mouse clicks
    // you need to move focus and selection together.
    select: React.useCallback(
      (id, highlightOnSelect) =>
        dispatch({ type: "SELECT", id, highlightOnSelect }),
      [],
    ),
    first: React.useCallback(action => dispatch({ type: "FIRST", action }), []),
    last: React.useCallback(action => dispatch({ type: "LAST", action }), []),
    // To reset the state, you need to pass which part you want to reset,
    // by default it'll reset only the highlighted option
    reset: React.useCallback(
      (action: "highlighted" | "selected" | "both") =>
        dispatch({ type: "RESET", action }),
      [],
    ),
    search: React.useCallback(
      (characters, action) => dispatch({ type: "SEARCH", characters, action }),
      [],
    ),
    next: React.useCallback(action => dispatch({ type: "NEXT", action }), []),
    previous: React.useCallback(
      action => dispatch({ type: "PREVIOUS", action }),
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
    highlightedId,
    selectedId,
    register,
    isDisabled,
    unregister,
    isFocusable,
  } = props;
  const uuid = useId();
  const id = idProp || uuid;
  const ref = React.useRef<any>(null);

  const isHighlighted = highlightedId === id;
  const isSelected = selectedId === id;

  React.useLayoutEffect(() => {
    if (isDisabled && !isFocusable) return;
    register(id, ref, value);
    return () => {
      unregister(id);
    };
  }, [id, isDisabled, isFocusable, register, unregister, value]);

  return { id, ref, isHighlighted, isSelected };
}
