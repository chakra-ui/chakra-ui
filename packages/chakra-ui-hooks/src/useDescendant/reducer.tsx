import { getNextIndex, getNextOptionFromKeys } from "./utils";

export interface Descendant {
  id: string;
  ref: React.RefObject<any>;
  value?: string | number;
  rest?: any[];
}

export interface DescendantsState {
  items: Descendant[];
  selectedItem: Descendant | null;
  highlightedItem: Descendant | null;
  orientation?: "horizontal" | "vertical";
  selectFirstItemOnMount?: boolean;
  highlightFirstItemOnMount?: boolean;
}

type KeyAction = "select" | "highlight";

export type DescendantReducerActions =
  | { type: "REGISTER"; item: Descendant }
  | { type: "UNREGISTER"; id: Descendant["id"] }
  | {
      type: "HIGHLIGHT";
      item: Descendant | null;
      selectOnHighlight?: boolean;
    }
  | {
      type: "SELECT";
      item: Descendant | null;
      highlightOnSelect?: boolean;
    }
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

function insertItem<T>(array: T[], item: T, index: number) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

////////////////////////////////////////////////////////////////

function register(
  state: DescendantsState,
  action: { item: Descendant },
): DescendantsState {
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
    items: insertItem(state.items, newItem, indexToInsertAt),
  };
}

////////////////////////////////////////////////////////////////

function unRegister(state: DescendantsState, action: { id: Descendant["id"] }) {
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
  state: DescendantsState,
  action: {
    item: Descendant | null;
    selectOnHighlight?: boolean;
  },
) {
  const { item, selectOnHighlight } = action;
  if (!item) return state;

  const nextState: DescendantsState = {
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
  state: DescendantsState,
  action: {
    item: Descendant | null;
    highlightOnSelect?: boolean;
  },
): DescendantsState {
  const { item, highlightOnSelect } = action;
  const nextItem = item != null ? item : state.highlightedItem;

  if (!nextItem) return state;

  const newState: DescendantsState = {
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
  state: DescendantsState,
  action: {
    action: "select" | "highlight";
    loop?: boolean;
  },
  type: "next" | "previous",
) {
  const { loop, action: keyAction } = action;
  const currentItem =
    keyAction === "select" ? state.selectedItem : state.highlightedItem;

  if (!currentItem) return state;

  const index = state.items.indexOf(currentItem);

  const nextIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: loop || true,
    step: type === "next" ? 1 : -1,
  });

  const nextItem = state.items[nextIndex];

  if (keyAction === "select") {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
  }
}

////////////////////////////////////////////////////////////////

export function firstOrLast(
  state: DescendantsState,
  action: { action: KeyAction },
  type: "first" | "last",
) {
  const { action: keyAction } = action;
  const nextItem =
    type === "first" ? state.items[0] : state.items[state.items.length - 1];

  if (!nextItem) return state;

  if (keyAction === "select") {
    return select(state, { item: nextItem });
  } else {
    return highlight(state, { item: nextItem });
  }
}

////////////////////////////////////////////////////////////////

export function reset(
  state: DescendantsState,
  action: {
    action: "highlighted" | "selected" | "both";
  },
) {
  const { action: keyAction } = action;
  const newState = { ...state };

  if (keyAction === "highlighted" || keyAction === "both") {
    newState["highlightedItem"] = null;
  }

  if (keyAction === "selected" || keyAction === "both") {
    newState["selectedItem"] = null;
  }

  return newState;
}

////////////////////////////////////////////////////////////////

export function search(
  state: DescendantsState,
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

  return nextState;
}

////////////////////////////////////////////////////////////////

export function descendantsReducer(
  state: DescendantsState,
  action: DescendantReducerActions,
) {
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
