import { getNextIndex, getNextOptionFromKeys } from "./utils";

// The possible event types within any selection widget
export type EventMeta =
  | "mouse"
  | "keyboard"
  | "character"
  | "internal-action"
  | "reset";

export interface ActionsPayload extends Item {
  loop?: boolean;
  characters?: string;
  lastEvent?: EventMeta;
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
  lastEvent: EventMeta | "";
  selectedItem: Item | null;
  highlightedItem: Item | null;
  orientation?: "horizontal" | "vertical";
}

type KeyAction = "select" | "highlight";

export type Action =
  | { type: "REGISTER"; item: Item }
  | { type: "UNREGISTER"; id: Item["id"] }
  | { type: "HIGHLIGHT"; item: Item | null; selectOnHighlight?: boolean }
  | { type: "SELECT"; item: Item | null; highlightOnSelect?: boolean }
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

function register(state: State, action: { item: Item }) {
  const { item: newItem } = action;

  if (state.items.length === 0) {
    return {
      ...state,
      items: [newItem],
    };
  }

  const index = state.items.indexOf(newItem);
  if (index >= 0) return state;

  const indexToInsertAt = state.items.findIndex(item => {
    if (!item.ref.current || !newItem.ref.current) return false;

    return Boolean(
      item.ref.current.compareDocumentPosition(newItem.ref.current) &
        Node.DOCUMENT_POSITION_PRECEDING,
    );
  });

  if (indexToInsertAt === -1) {
    return {
      ...state,
      items: [...state.items, newItem],
    };
  }

  return {
    ...state,
    items: [
      ...state.items.slice(0, indexToInsertAt),
      newItem,
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
    selectedItem: state.selectedItem
      ? newItems.length === 0
        ? null
        : newItems[0]
      : state.selectedItem,
    items: newItems,
  };
}

/////////////////////////////////////////////////////////////////////////////

function highlight(
  state: State,
  action: { item: Item | null; selectOnHighlight?: boolean },
) {
  const { item, selectOnHighlight } = action;
  if (!item) return state;

  const nextState: State = {
    ...state,
    highlightedItem: item,
  };

  if (selectOnHighlight) {
    nextState["selectedItem"] = item;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

function select(
  state: State,
  action: { item: Item | null; highlightOnSelect?: boolean },
): State {
  const { item, highlightOnSelect } = action;
  const nextItem = item != null ? item : state.highlightedItem;

  if (!nextItem) return state;

  const newState: State = {
    ...state,
    selectedItem: nextItem,
  };

  if (highlightOnSelect) {
    newState["highlightedItem"] = item;
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
  const currentItem =
    __action === "select" ? state.selectedItem : state.highlightedItem;

  if (!currentItem) return state;

  const index = state.items.findIndex(item => item.id === currentItem.id);

  const nextIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: loop != null ? loop : true,
    step: type === "next" ? 1 : -1,
  });

  const nextItem = state.items[nextIndex];

  if (__action === "select") {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
  }
}

////////////////////////////////////////////////////////////////

export function firstOrLast(
  state: State,
  action: { action: KeyAction },
  type: "first" | "last",
) {
  const { action: __action } = action;
  const nextItem =
    type === "first" ? state.items[0] : state.items[state.items.length - 1];

  if (!nextItem) return state;

  if (__action === "select") {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
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
    newState["highlightedItem"] = null;
  }

  if (__action === "selected" || __action === "both") {
    newState["selectedItem"] = null;
  }

  return newState;
}

////////////////////////////////////////////////////////////////

export function search(
  state: State,
  action: { characters: string; action: "select" | "highlight" },
) {
  const { characters, action: __action } = action;
  const currentItem =
    __action === "select" ? state.selectedItem : state.highlightedItem;

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
    nextState["selectedItem"] = nextOption;
  } else {
    nextState["highlightedItem"] = nextOption;
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
