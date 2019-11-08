import { getValue, getNextIndex, getNextOptionFromKeys } from "./utils";

// The possible event types within any selection widget
export type EventType =
  | "mouse"
  | "keyboard"
  | "character"
  | "internal-action"
  | "reset";

export interface ActionsPayload extends Item {
  loop?: boolean;
  characters?: string;
  lastEvent?: EventType;
  selectOnHighlight?: boolean;
  highlightOnSelect?: boolean;
}

export interface Item {
  id: string;
  ref: React.RefObject<any>;
  value?: string | number;
}

export interface State {
  items: Item[];
  lastEvent: EventType | "";
  selectedId: string | null;
  highlightedId: string | null;
  orientation?: "horizontal" | "vertical";
}

type KeyAction = "select" | "highlight";

export type Action =
  | { type: "REGISTER"; id: Item["id"]; ref: Item["ref"]; value: Item["value"] }
  | { type: "UNREGISTER"; id: Item["id"] }
  | { type: "HIGHLIGHT"; id: Item["id"] | null; selectOnHighlight?: boolean }
  | { type: "SELECT"; id: Item["id"] | null; highlightOnSelect?: boolean }
  | {
      type: "RESET";
      action: "highlighted" | "selected" | "both";
    }
  | {
      type: "SEARCH";
      characters: string;
      action: KeyAction;
    }
  | {
      type: "PREVIOUS";
      action: KeyAction;
    }
  | {
      type: "NEXT";
      action: KeyAction;
    }
  | {
      type: "FIRST";
      action: KeyAction;
    }
  | {
      type: "LAST";
      action: KeyAction;
    };

////////////////////////////////////////////////////////////////

function register(
  state: State,
  action: Pick<ActionsPayload, "ref" | "id" | "value">,
) {
  const { id, ref, value } = action;

  if (state.items.length === 0) {
    return {
      ...state,
      items: [{ id, ref, value }],
    };
  }

  const index = state.items.findIndex(item => item.id === id);
  if (index >= 0) return state;

  const indexToInsertAt = state.items.findIndex(item => {
    if (!item.ref.current || !ref.current) return false;

    return Boolean(
      item.ref.current.compareDocumentPosition(ref.current) &
        Node.DOCUMENT_POSITION_PRECEDING,
    );
  });

  if (indexToInsertAt === -1) {
    return {
      ...state,
      items: [...state.items, { id, ref, value }],
    };
  }

  return {
    ...state,
    items: [
      ...state.items.slice(0, indexToInsertAt),
      { id, ref, value },
      ...state.items.slice(indexToInsertAt),
    ],
  };
}

////////////////////////////////////////////////////////////////

function unRegister(state: State, action: { id: Item["id"] }) {
  const { id } = action;
  const newItems = state.items.filter(item => item.id !== id);

  if (newItems.length === state.items.length) {
    return state;
  }

  return {
    ...state,
    selectedId:
      state.selectedId && state.selectedId === id
        ? newItems.length === 0
          ? null
          : newItems[0]["id"]
        : state.selectedId,
    items: newItems,
  };
}

/////////////////////////////////////////////////////////////////////////////

function highlight(
  state: State,
  action: { id: Item["id"] | null; selectOnHighlight?: boolean },
) {
  const { id, selectOnHighlight } = action;
  const nextFocusedItem = state.items.find(item => item.id === id);

  if (!nextFocusedItem) return state;

  const nextState: State = {
    ...state,
    highlightedId: id,
  };

  if (selectOnHighlight) {
    nextState["selectedId"] = id;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

function select(
  state: State,
  action: { id: Item["id"] | null; highlightOnSelect?: boolean },
): State {
  const { id, highlightOnSelect } = action;
  const __id = id != null ? id : state.highlightedId;
  const nextFocusedItem = state.items.find(item => item.id === __id);
  if (!nextFocusedItem) return state;

  const newState: State = {
    ...state,
    lastEvent: "keyboard",
    selectedId: __id,
  };

  if (highlightOnSelect) {
    newState["highlightedId"] = __id;
  }

  return newState;
}

/////////////////////////////////////////////////////////////////////////////

export function nextOrPrevious(
  state: State,
  action: { action: "select" | "highlight"; loop?: boolean },
  type: "next" | "previous",
) {
  const { loop, action: __action } = action;
  const id = __action === "select" ? state.selectedId : state.highlightedId;
  const index = state.items.findIndex(item => item.id === id);

  if (index === -1) return state;

  const nextIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: loop != null ? loop : true,
    step: type === "next" ? 1 : -1,
  });

  const nextItemId = state.items[nextIndex]["id"];

  if (__action === "select") {
    return select(state, { id: nextItemId });
  } else {
    return highlight(state, { id: nextItemId });
  }
}

////////////////////////////////////////////////////////////////

export function firstOrLast(
  state: State,
  action: { action: KeyAction },
  type: "first" | "last",
) {
  const { action: __action } = action;
  const nextItemId =
    type === "first"
      ? state.items[0]["id"]
      : state.items[state.items.length - 1]["id"];

  if (!nextItemId) return state;

  if (__action === "select") {
    return select(state, { id: nextItemId });
  } else {
    return highlight(state, { id: nextItemId });
  }
}

////////////////////////////////////////////////////////////////

export function reset(
  state: State,
  action: { action: "highlighted" | "selected" | "both" },
) {
  const { action: __action } = action;
  const newState = { ...state };

  if (__action === "highlighted" || __action === "both") {
    newState["highlightedId"] = null;
  }

  if (__action === "selected" || __action === "both") {
    newState["selectedId"] = null;
  }

  return newState;
}

////////////////////////////////////////////////////////////////

export function search(
  state: State,
  action: { characters: string; action: "select" | "highlight" },
) {
  const { characters, action: __action } = action;
  const id = __action === "select" ? state.selectedId : state.highlightedId;
  const currentItem = state.items.find(item => item.id === id);

  const nextOption = getNextOptionFromKeys({
    items: state.items,
    searchString: characters || "",
    itemToString: item => {
      if (!item) return "";
      return (item.ref.current as Node).textContent || String(item.value);
    },
    currentValue: currentItem,
  });

  if (!nextOption) return state;

  const nextState = { ...state };
  if (__action === "select") {
    nextState["selectedId"] = nextOption.id;
  } else {
    nextState["highlightedId"] = nextOption.id;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER":
      return register(state, action);
    case "UNREGISTER":
      return unRegister(state, action);
    case "PREVIOUS":
      return nextOrPrevious(state, action, "previous");
    case "NEXT":
      return nextOrPrevious(state, action, "next");
    case "HIGHLIGHT":
      return highlight(state, action);
    case "SELECT":
      return select(state, action);
    case "RESET":
      return reset(state, action);
    case "SEARCH":
      return search(state, action);
    case "FIRST":
      return firstOrLast(state, action, "first");
    case "LAST":
      return firstOrLast(state, action, "last");
    default:
      throw new Error("Reducer called without proper action type.");
  }
}
