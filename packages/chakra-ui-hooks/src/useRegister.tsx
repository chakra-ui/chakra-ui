// Credit goes to Reakit and react-roving-tabindex for inspiring this API
import React, {
  createContext,
  useMemo,
  useReducer,
  useLayoutEffect,
  useRef,
} from "react";
import { findIndex, createOnKeyDown } from "@chakra-ui/utils";
import useCreateContext from "./useCreateContext";
import { useUID } from "react-uid";
import { useContext } from "react";
import { useEffect } from "react";
import useFocusEffect from "./useFocusEffect";

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
          selectedId: newStop.id,
          stops: [newStop],
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

interface ContextValue {
  state: State;
  actions: Actions;
}

const [useRegisterContext, RegisterProvider] = useCreateContext<ContextValue>();

export function Register({
  children,
  loop,
}: {
  children: React.ReactNode;
  loop?: boolean;
}) {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: null,
    lastEventSource: null,
    stops: [],
    loop: loop || true,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

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

  const context = useMemo(() => ({ state, actions }), [state]);

  return <RegisterProvider value={context}>{children}</RegisterProvider>;
}

export function useRegister(
  options: {
    isDisabled?: boolean;
    isFocusable?: boolean;
    extraData?: any;
  } = {},
) {
  const { isDisabled, isFocusable, extraData } = options;
  const id = useUID();
  const ref = useRef(null);
  const { state, actions } = useRegisterContext();

  useLayoutEffect(() => {
    if (isDisabled && !isFocusable) return;
    const rest = extraData || {};
    actions.register(id, ref, rest);
    return () => {
      actions.unregister(id);
    };
  }, [id, isDisabled, isFocusable, ref]);

  return { ref, id, state, actions };
}

