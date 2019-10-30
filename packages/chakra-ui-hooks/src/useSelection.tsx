// Credit goes to Reakit and react-roving-tabindex for inspiring this API
import { findIndex } from "@chakra-ui/utils";
import React, { useLayoutEffect, useReducer, useRef } from "react";
import useId from "./useId";

interface Stop {
  id: string;
  ref: React.RefObject<HTMLElement>;
}

type Action =
  | {
      type: "register";
      payload: { id: Stop["id"]; ref: Stop["ref"]; rest: any };
    }
  | { type: "unregister"; payload: { id: Stop["id"] } }
  | {
      type: "move";
      payload: {
        id: Stop["id"] | null;
        lastEventSource?: State["lastEventSource"];
      };
    }
  | { type: "next" }
  | { type: "previous" }
  | { type: "first" }
  | { type: "last" }
  | { type: "reset" };

interface State {
  stops: Stop[];
  lastEventSource: "keyboard" | "mouse" | null;
  selectedId: Stop["id"] | null;
  loop: boolean;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "register": {
      const newStop = action.payload;
      if (state.stops.length === 0) {
        return {
          ...state,
          stops: [newStop],
          selectedId: state.selectedId || newStop.id,
        };
      }
      const index = findIndex(state.stops, stop => stop.id === newStop.id);

      if (index >= 0) {
        return state;
      }

      const indexAfter = findIndex(
        state.stops,
        stop =>
          !!(
            stop.ref.current &&
            newStop.ref.current &&
            stop.ref.current.compareDocumentPosition(newStop.ref.current) &
              Node.DOCUMENT_POSITION_PRECEDING
          ),
      );

      if (indexAfter === -1) {
        return {
          ...state,
          stops: [...state.stops, newStop],
        };
      }

      return {
        ...state,
        stops: [
          ...state.stops.slice(0, indexAfter),
          newStop,
          ...state.stops.slice(indexAfter),
        ],
      };
    }

    case "unregister": {
      const { id } = action.payload;
      const stops = state.stops.filter(stop => stop.id !== id);
      if (stops.length === state.stops.length) {
        return state;
      }
      return {
        ...state,
        selectedId:
          state.selectedId === id
            ? stops.length === 0
              ? null
              : stops[0].id
            : state.selectedId,
        stops,
      };
    }

    case "previous": {
      const index = findIndex(
        state.stops,
        stop => stop.id === state.selectedId,
      );
      if (index === -1) {
        return state;
      }

      let newIndex = index - 1;

      if (state.loop && newIndex < 0) {
        newIndex = state.stops.length - 1;
      }

      return {
        ...state,
        lastEventSource: "keyboard",
        selectedId: state.stops[newIndex].id,
      };
    }

    case "next": {
      const index = findIndex(
        state.stops,
        stop => stop.id === state.selectedId,
      );
      if (index === -1) {
        return state;
      }
      let newIndex = index + 1;
      if (state.loop && newIndex >= state.stops.length) {
        newIndex = 0;
      }
      return {
        ...state,
        lastEventSource: "keyboard",
        selectedId: state.stops[newIndex].id,
      };
    }

    case "move": {
      const { id, lastEventSource } = action.payload;
      const index = findIndex(state.stops, stop => stop.id === id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        lastEventSource: lastEventSource || "keyboard",
        selectedId: id,
      };
    }

    case "reset": {
      return {
        ...state,
        selectedId: null,
      };
    }

    case "first": {
      const stop = state.stops[0];
      if (!stop) return state;

      return {
        ...state,
        selectedId: stop["id"],
      };
    }

    case "last": {
      const stop = state.stops[state.stops.length - 1];
      if (!stop) return state;

      return {
        ...state,
        selectedId: stop["id"],
      };
    }

    default:
      return state;
  }
}

interface Actions {
  register: (id: Stop["id"], ref: Stop["ref"], rest: any) => void;
  unregister: (id: Stop["id"]) => void;
  move: (id: Stop["id"], lastEventSource?: State["lastEventSource"]) => void;
  next: () => void;
  previous: () => void;
  reset: () => void;
  first: () => void;
  last: () => void;
}

interface UseSelectionStateOptions {
  loop?: boolean;
  defaultSelectedId?: string;
}

/**
 * Custom hook to manage selection of items within a list.
 * It provides actions to update the state as well.
 *
 * Can use used in `Tabs`, `Select`, `Menu` components
 *
 * @param {Boolean} loop whether the selection should loop
 * @param {String} defaultSelectedId the id to be selected initially
 */
export function useSelectionState({
  loop,
  defaultSelectedId,
}: UseSelectionStateOptions) {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: defaultSelectedId || null,
    lastEventSource: null,
    stops: [],
    loop: loop || false,
  });

  const actions: Actions = {
    register: (id, ref, rest) =>
      dispatch({
        type: "register",
        payload: { id, ref, ...rest },
      }),
    unregister: id =>
      dispatch({
        type: "unregister",
        payload: { id },
      }),
    move: (id, lastEventSource) =>
      dispatch({
        type: "move",
        payload: { id, lastEventSource },
      }),
    next: () => dispatch({ type: "next" }),
    previous: () => dispatch({ type: "previous" }),
    reset: () => dispatch({ type: "reset" }),
    first: () => dispatch({ type: "first" }),
    last: () => dispatch({ type: "last" }),
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
}

export function useSelection(options: UseSelectionOptions) {
  const { isDisabled, isFocusable, extraData, actions } = options;
  const uuid = useId();
  const id = options.id || uuid;
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    if (isDisabled && !isFocusable) return;
    const rest = extraData || {};
    actions.register(id, ref, rest);
    return () => {
      actions.unregister(id);
    };
  }, [id, isDisabled, isFocusable, ref]);

  return { ref, id };
}
