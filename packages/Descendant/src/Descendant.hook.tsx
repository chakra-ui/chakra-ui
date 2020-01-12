import * as React from "react";
import { useId, useIsomorphicEffect } from "@chakra-ui/hooks";
import {
  Descendant,
  DescendantsState,
  descendantsReducer,
} from "./Descendant.reducer";

export interface DescendantsActions {
  /**
   * Registers Id, ref, and value of an element.
   */
  register: (item: Descendant) => void;
  /**
   * Unregisters the element.
   */
  unregister: (id: Descendant["id"]) => void;
  /**
   * Moves focus to a given element ID.
   */
  highlight: (item: Descendant | null, selectOnHighlight?: boolean) => void;
  /**
   * Moves focus to a given element ID.
   */
  select: (item: Descendant | null, highlightOnSelect?: boolean) => void;
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
  /**
   * Moves focus to the element that matches the characters
   */
  search: (characters: string, action: "select" | "highlight") => void;
  /**
   * Resets `highlightedId` or `selectedId` or both.
   */
  reset: (action: "highlighted" | "selected" | "both") => void;
}

const defaultState: DescendantsState = {
  items: [],
  selectedItem: null,
  highlightedItem: null,
};

/**
 * Hook to manage selection and focus in interactive widgets
 * @param initialState The initial state of the selection
 */
export function useDescendants(initialState: Partial<DescendantsState> = {}) {
  const initialDescendantState = { ...defaultState, ...initialState };
  const [state, dispatch] = React.useReducer(
    descendantsReducer,
    initialDescendantState,
  );

  const actions = {
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
      (item, selectOnHighlight) =>
        dispatch({
          type: "HIGHLIGHT",
          item,
          selectOnHighlight,
        }),
      [],
    ),
    // Select option with specified id. If no id is passed, then it'll use the focusedId
    // Highlight follows selection if `highlightOnSelect` is true. useful for mouse clicks
    // you need to move focus and selection together.
    select: React.useCallback(
      (item, highlightOnSelect) =>
        dispatch({
          type: "SELECT",
          item,
          highlightOnSelect,
        }),
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
      (characters, action) =>
        dispatch({
          type: "SEARCH",
          characters,
          action,
        }),
      [],
    ),
    next: React.useCallback(action => dispatch({ type: "NEXT", action }), []),
    previous: React.useCallback(
      action => dispatch({ type: "PREVIOUS", action }),
      [],
    ),
  };

  return [state, actions] as [DescendantsState, DescendantsActions];
}

export type UseDescendantsReturn = [DescendantsState, DescendantsActions];

///////////////////////////////////////////////////////////////////////////////////////////////

interface DescendantProps {
  state: DescendantsState;
  actions: DescendantsActions;
  id?: Descendant["id"];
  value?: Descendant["value"];
  isDisabled?: boolean;
  isFocusable?: boolean;
}

export function useDescendant(props: DescendantProps) {
  // you pass the state and action as props
  const { id: idProp, value, isDisabled, isFocusable, state, actions } = props;

  const { highlightedItem, selectedItem } = state;
  const { register, unregister } = actions;

  // generate a unique id or use the id prop
  const id = useId(`descendant`, idProp);

  // generate a reference to the descendant's dom element
  const ref = React.useRef<any>(null);

  // check if this descendant is highlighted
  const isHighlighted = highlightedItem ? highlightedItem.id === id : false;

  // check if this descendant is selected
  const isSelected = selectedItem ? selectedItem.id === id : false;

  // memoize the descendant to improve performance
  const item = React.useMemo(() => ({ id, ref, value }), [id, ref, value]);

  // ideally, we'll run this effect using `useLayoutEffect` but to
  // support SSR, we'll use `useEffect` on the server. Hence, the use of
  // `useIsomorphicEffect`
  useIsomorphicEffect(() => {
    // Don't register this descendant if it's disabled and not focusable
    if (isDisabled && !isFocusable) return;

    // else, register the descendant
    register(item);

    // when it unmounts, unregister the descendant
    return () => {
      unregister(id);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, isFocusable]);

  return { item, isHighlighted, isSelected };
}
