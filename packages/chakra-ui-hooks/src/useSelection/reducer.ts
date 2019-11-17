import { getNextIndex, getNextOptionFromKeys } from "./utils";

// The possible event types within any selection widget
export type EventMeta =
  | "mouse-click"
  | "mouse-over"
  | "keyboard-arrows"
  | "keyboard-enter"
  | "keyboard-search"
  | "internal-action"
  | "external-action"
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
  selectFirstItemOnMount?: boolean;
  highlightFirstItemOnMount?: boolean;
}

type KeyAction = "select" | "highlight";

export type Action =
  | { type: "REGISTER"; item: Item }
  | { type: "UNREGISTER"; id: Item["id"] }
  | {
      type: "HIGHLIGHT";
      item: Item | null;
      selectOnHighlight?: boolean;
      lastEvent?: EventMeta;
    }
  | {
      type: "SELECT";
      item: Item | null;
      highlightOnSelect?: boolean;
      lastEvent?: EventMeta;
    }
  | {
      type: "RESET";
      action: "highlighted" | "selected" | "both";
      lastEvent?: EventMeta;
    }
  | {
      type: "SEARCH";
      characters: string;
      action: KeyAction;
      lastEvent?: EventMeta;
    }
  | {
      type: "PREVIOUS";
      action: KeyAction;
      lastEvent?: EventMeta;
    }
  | {
      type: "NEXT";
      action: KeyAction;
      lastEvent?: EventMeta;
    }
  | {
      type: "FIRST";
      action: KeyAction;
      lastEvent?: EventMeta;
    }
  | {
      type: "LAST";
      action: KeyAction;
      lastEvent?: EventMeta;
    };

////////////////////////////////////////////////////////////////

function register(state: State, action: { item: Item }): State {
  const { item: newItem } = action;

  if (state.items.length === 0) {
    return {
      ...state,
      items: [newItem],
      ...(state.highlightFirstItemOnMount && {
        highlightedItem: newItem,
        lastEvent: "internal-action",
      }),
      ...(state.selectFirstItemOnMount && {
        selectedItem: newItem,
        lastEvent: "internal-action",
      }),
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
  action: {
    item: Item | null;
    selectOnHighlight?: boolean;
    lastEvent?: EventMeta;
  },
) {
  const { item, selectOnHighlight, lastEvent } = action;
  if (!item) return state;

  const nextState: State = {
    ...state,
    highlightedItem: item,
  };

  if (selectOnHighlight) {
    nextState["selectedItem"] = item;
  }

  if (lastEvent) {
    nextState["lastEvent"] = lastEvent;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

function select(
  state: State,
  action: {
    item: Item | null;
    highlightOnSelect?: boolean;
    lastEvent?: EventMeta;
  },
): State {
  const { item, highlightOnSelect, lastEvent } = action;
  const nextItem = item != null ? item : state.highlightedItem;

  if (!nextItem) return state;

  const newState: State = {
    ...state,
    selectedItem: nextItem,
  };

  if (highlightOnSelect) {
    newState["highlightedItem"] = item;
  }

  if (lastEvent) {
    newState["lastEvent"] = lastEvent;
  }

  return newState;
}

/////////////////////////////////////////////////////////////////////////////

export function nextOrPrevious(
  state: State,
  action: {
    action: "select" | "highlight";
    loop?: boolean;
    lastEvent?: EventMeta;
  },
  type: "next" | "previous",
) {
  const { loop, action: keyAction, lastEvent } = action;
  const currentItem =
    keyAction === "select" ? state.selectedItem : state.highlightedItem;

  if (!currentItem) return state;

  const index = state.items.findIndex(item => item.id === currentItem.id);

  const nextIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: loop != null ? loop : true,
    step: type === "next" ? 1 : -1,
  });

  const nextItem = state.items[nextIndex];

  if (keyAction === "select") {
    return select(state, { item: nextItem, lastEvent });
  } else {
    return highlight(state, { item: nextItem, lastEvent });
  }
}

////////////////////////////////////////////////////////////////

export function firstOrLast(
  state: State,
  action: { action: KeyAction; lastEvent?: EventMeta },
  type: "first" | "last",
) {
  const { action: keyAction, lastEvent } = action;
  const nextItem =
    type === "first" ? state.items[0] : state.items[state.items.length - 1];

  if (!nextItem) return state;

  if (keyAction === "select") {
    return select(state, { item: nextItem, lastEvent });
  } else {
    return highlight(state, { item: nextItem, lastEvent });
  }
}

////////////////////////////////////////////////////////////////

export function reset(
  state: State,
  action: {
    action: "highlighted" | "selected" | "both";
    lastEvent?: EventMeta;
  },
) {
  const { action: keyAction, lastEvent } = action;
  const newState = { ...state };

  if (keyAction === "highlighted" || keyAction === "both") {
    newState["highlightedItem"] = null;
  }

  if (keyAction === "selected" || keyAction === "both") {
    newState["selectedItem"] = null;
  }

  newState["lastEvent"] = lastEvent || "reset";

  return newState;
}

////////////////////////////////////////////////////////////////

export function search(
  state: State,
  action: {
    characters: string;
    action: "select" | "highlight";
  },
) {
  const { characters, action: keyAction } = action;
  const currentItem =
    keyAction === "select" ? state.selectedItem : state.highlightedItem;

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
  if (keyAction === "select") {
    nextState["selectedItem"] = nextOption;
  } else {
    nextState["highlightedItem"] = nextOption;
  }

  nextState["lastEvent"] = "keyboard-search";

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
