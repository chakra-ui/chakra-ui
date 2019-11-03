// Credit goes to Reakit, Zendesk React Containers, Downshift and react-roving-tabindex for inspiring this API
import React, { useLayoutEffect, useReducer, useRef } from "react";
import useId from "../useId";
import {
  register,
  State,
  unRegister,
  nextOrPrevious,
  keyboardSelect,
  mouseSelect,
  selectFirstOrLast,
  reset,
  Props,
  EventType,
  focus,
  Item,
} from "./reducerActions";

type ActionTypes =
  | "REGISTER"
  | "UNREGISTER"
  | "KEYBOARD_SELECT"
  | "MOUSE_SELECT"
  | "NEXT"
  | "FIRST"
  | "LAST"
  | "PREVIOUS"
  | "FOCUS"
  | "RESET"
  | "RESET_FOCUSED";

type Action = { type: ActionTypes; payload: Partial<Props> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER": {
      return register(state, action.payload);
    }
    case "UNREGISTER": {
      return unRegister(state, action.payload);
    }
    case "PREVIOUS": {
      return nextOrPrevious(state, action.payload, "previous");
    }
    case "NEXT": {
      return nextOrPrevious(state, action.payload, "next");
    }
    case "KEYBOARD_SELECT": {
      return keyboardSelect(state, action.payload);
    }
    case "MOUSE_SELECT": {
      return mouseSelect(state, action.payload);
    }
    case "FOCUS": {
      return focus(state, action.payload);
    }
    case "RESET": {
      return reset(state, action.payload);
    }

    case "FIRST": {
      return selectFirstOrLast(state, action.payload, "first");
    }
    case "LAST": {
      return selectFirstOrLast(state, action.payload, "last");
    }

    default:
      throw new Error("Reducer called without proper action type.");
  }
}

export interface Actions {
  register: (id: Item["id"], ref: Item["ref"], rest: any) => void;
  unregister: (id: Item["id"]) => void;
  mouse_select: (id: string) => void;
  focus: (id: string) => void;
  keyboard_select: () => void;
  next: (lastEvent: EventType) => void;
  previous: (lastEvent: EventType) => void;
  reset: () => void;
  first: () => void;
  last: () => void;
}

interface UseSelectionState extends Props {
  defaultFocusedId?: string;
  defaultSelectedId?: string;
}

/**
 * Custom hook to manage selection of items within a list.
 * It provides actions to update the state as well.
 */
export function useSelectionState({
  loop,
  selectOnFocus,
  defaultFocusedId,
  defaultSelectedId,
  selectedId,
  focusedId,
  onSelect,
  onFocus,
}: UseSelectionState) {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: defaultSelectedId || null,
    focusedId: defaultFocusedId || null,
    lastEvent: "",
    items: [],
  });

  const sharedProps = {
    focusedId,
    selectedId,
    onSelect,
    onFocus,
    selectOnFocus,
    loop,
  };

  const actions: Actions = {
    focus: id =>
      dispatch({
        type: "FOCUS",
        payload: { id, ...sharedProps },
      }),
    register: (id, ref, rest) =>
      dispatch({
        type: "REGISTER",
        payload: { item: { id, ref, ...rest }, ...sharedProps },
      }),
    unregister: id =>
      dispatch({
        type: "UNREGISTER",
        payload: { id },
      }),
    mouse_select: (id: string) =>
      dispatch({
        type: "MOUSE_SELECT",
        payload: {
          id,
          onSelect,
          onFocus,
        },
      }),
    keyboard_select: () =>
      dispatch({
        type: "KEYBOARD_SELECT",
        payload: {
          ...sharedProps,
        },
      }),
    next: (lastEvent: EventType) =>
      dispatch({ type: "NEXT", payload: { lastEvent, ...sharedProps } }),
    previous: (lastEvent: EventType) =>
      dispatch({ type: "PREVIOUS", payload: { lastEvent, ...sharedProps } }),
    reset: () => dispatch({ type: "RESET", payload: { ...sharedProps } }),
    first: () => dispatch({ type: "FIRST", payload: { ...sharedProps } }),
    last: () => dispatch({ type: "LAST", payload: { ...sharedProps } }),
  };

  return { state, actions };
}

export interface UseSelectionOptions {
  state: State;
  actions: Actions;
  isDisabled?: boolean;
  isFocusable?: boolean;
  extraData?: any;
  id?: string;
  value?: string | number;
}

export function useSelection(options: UseSelectionOptions) {
  const { isDisabled, isFocusable, extraData, value, actions } = options;
  const uuid = useId();
  const id = options.id || uuid;
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    if (isDisabled && !isFocusable) return;
    const rest = { value, ...extraData };
    actions.register(id, ref, rest);
    return () => {
      actions.unregister(id);
    };
  }, [id, isDisabled, isFocusable, ref]);

  return { ref, id };
}
