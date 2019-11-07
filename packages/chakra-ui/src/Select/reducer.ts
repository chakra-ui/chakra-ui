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
  keys?: string;
  lastEvent?: EventType;
  onFocus?: (stopId: string | null, item?: Item) => void;
  onSelect?: (stopId: string | null, item?: Item) => void;
  selectOnFocus?: boolean;
  focusedId?: string;
  selectedId?: string;
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
  focusedId: string | null;
}

export type ComponentProps = Pick<
  ActionsPayload,
  "focusedId" | "selectedId" | "onFocus" | "onSelect" | "selectOnFocus" | "loop"
>;

export type Action =
  | {
      type: "REGISTER";
      payload: Pick<ActionsPayload, "ref" | "id" | "value">;
    }
  | {
      type: "UNREGISTER";
      payload: Pick<ActionsPayload, "id">;
    }
  | {
      type: "FOCUS";
      payload: Pick<ActionsPayload, "id"> & ComponentProps;
    }
  | {
      type: "SELECT";
      payload: Pick<ActionsPayload, "id"> & ComponentProps;
    }
  | {
      type: "RESET_FOCUSED";
      payload: ComponentProps;
    }
  | {
      type: "SELECT_FOCUSED";
      payload: ComponentProps;
    }
  | {
      type: "CHARACTER_FOCUS";
      payload: { keys: string } & ComponentProps;
    }
  | {
      type: "CHARACTER_SELECT";
      payload: { keys: string } & ComponentProps;
    }
  | {
      type: "PREVIOUS";
      payload: ComponentProps;
    }
  | {
      type: "NEXT";
      payload: ComponentProps;
    }
  | {
      type: "SELECT_FOCUSED";
      payload: ComponentProps;
    }
  | {
      type: "MOUSE_SELECT";
      payload: Pick<ActionsPayload, "id"> & ComponentProps;
    }
  | {
      type: "RESET";
      payload: ComponentProps;
    }
  | {
      type: "FIRST";
      payload: ComponentProps;
    }
  | {
      type: "LAST";
      payload: ComponentProps;
    };

////////////////////////////////////////////////////////////////

function register(
  state: State,
  props: Pick<ActionsPayload, "ref" | "id" | "value"> & ComponentProps,
) {
  const newItem = { id: props.id, ref: props.ref, value: props.value };

  if (state.items.length === 0) {
    return {
      ...state,
      items: [newItem],
      selectedId: props.selectedId || state.selectedId || null,
      focusedId: props.focusedId || state.focusedId || newItem.id,
    };
  }
  const index = state.items.findIndex(item => item.id === newItem.id);

  if (index >= 0) return state;

  const indexToInsertAt = state.items.findIndex(
    item =>
      !!(
        item.ref.current &&
        newItem.ref.current &&
        item.ref.current.compareDocumentPosition(newItem.ref.current) &
          Node.DOCUMENT_POSITION_PRECEDING
      ),
  );

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

function unRegister(state: State, props: Pick<ActionsPayload, "id">) {
  const filteredItems = state.items.filter(item => item.id !== props.id);
  if (filteredItems.length === state.items.length) {
    return state;
  }
  return {
    ...state,
    selectedId:
      state.selectedId && state.selectedId === props.id
        ? filteredItems.length === 0
          ? null
          : filteredItems[0]["id"]
        : state.selectedId,
    items: filteredItems,
  };
}

/////////////////////////////////////////////////////////////////////////////

function moveFocus(
  state: State,
  props: Pick<ActionsPayload, "id"> & ComponentProps,
) {
  const nextFocusedItem = state.items.find(item => item.id === props.id);

  if (!nextFocusedItem) return state;

  if (props.onFocus) {
    props.onFocus(props.id, nextFocusedItem);
  }

  if (props.selectOnFocus && props.onSelect) {
    props.onSelect(props.id, nextFocusedItem);
  }

  if (props.focusedId != null) {
    return state;
  }

  const nextState: State = {
    ...state,
    lastEvent: "keyboard",
  };

  if (!props.focusedId != null) {
    nextState["focusedId"] = props.id;
  }

  if (!props.focusedId != null && props.selectOnFocus) {
    nextState["selectedId"] = props.id;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

function selectFocused(state: State, props: ComponentProps): State {
  const nextFocusedItem = state.items.find(item => item.id === state.focusedId);

  if (props.onSelect) {
    props.onSelect(state.focusedId, nextFocusedItem);
  }

  if (props.selectedId != null) {
    return state;
  }

  return {
    ...state,
    lastEvent: "keyboard",
    selectedId: state.focusedId,
  };
}

/////////////////////////////////////////////////////////////////////////////

export function focusNextOrPrevious(
  state: State,
  props: ComponentProps,
  type: "next" | "previous",
) {
  const [focusedId] = getValue(props.focusedId, state.focusedId);
  const [selectedId] = getValue(props.selectedId, state.selectedId);

  const idToUse = focusedId || selectedId;
  const index = state.items.findIndex(item => item.id === idToUse);

  if (index === -1) return state;

  const nextFocusIndex = getNextIndex({
    currentIndex: index,
    itemsLength: state.items.length,
    loop: props.loop != null ? props.loop : true,
    step: type === "next" ? 1 : -1,
  });

  const nextFocusedId = state.items[nextFocusIndex]["id"];

  return moveFocus(state, { ...props, id: nextFocusedId });
}

////////////////////////////////////////////////////////////////

export function mouseSelect(
  state: State,
  props: Pick<ActionsPayload, "id"> & ComponentProps,
) {
  const focusIsControlled = props.focusedId != null;
  const selectionIsControlled = props.selectedId != null;

  const nextFocusedItem = state.items.find(item => item.id === props.id);

  if (props.onSelect && props.id) {
    props.onSelect(props.id, nextFocusedItem);
  }

  if (props.onFocus && props.id) {
    props.onFocus(props.id, nextFocusedItem);
  }

  const nextState: State = { ...state, lastEvent: "mouse" };

  if (focusIsControlled && selectionIsControlled) {
    return state;
  }

  if (!selectionIsControlled && props.id) {
    nextState["selectedId"] = props.id;
  }

  if (!focusIsControlled && props.id) {
    nextState["focusedId"] = props.id;
  }

  return nextState;
}

////////////////////////////////////////////////////////////////

export function focusFirstOrLast(
  state: State,
  props: ComponentProps,
  type: "first" | "last",
) {
  const nextFocusedId =
    type === "first"
      ? state.items[0]["id"]
      : state.items[state.items.length - 1]["id"];
  if (!nextFocusedId) return state;

  return moveFocus(state, { ...props, id: nextFocusedId });
}

////////////////////////////////////////////////////////////////

export function reset(state: State, props: ComponentProps) {
  return {
    ...state,
    selectedId: props.selectedId || null,
    focusedId: props.focusedId || null,
  };
}

////////////////////////////////////////////////////////////////

export function select(state: State, props: Pick<ActionsPayload, "id">) {
  return {
    ...state,
    selectedId: props.id,
  };
}

////////////////////////////////////////////////////////////////

function resetFocused(state: State, props: ComponentProps) {
  return {
    ...state,
    // Reset the focused option to the default passed in props or null
    focusedId: props.focusedId || null,
  };
}

////////////////////////////////////////////////////////////////

export function focusOptionFromKeys(
  state: State,
  props: Pick<ActionsPayload, "keys">,
) {
  const currentFocusedOption = state.items.find(
    item => item.id === state.focusedId,
  );
  const nextOption = getNextOptionFromKeys({
    items: state.items,
    searchString: props.keys || "",
    itemToString: item => {
      if (!item) return "";
      return (item.ref.current as Node).textContent || String(item.value);
    },
    currentValue: currentFocusedOption,
  });

  if (!nextOption) return state;

  return {
    ...state,
    focusedId: nextOption.id,
  };
}

////////////////////////////////////////////////////////////////

export function selectOptionFromKeys(
  state: State,
  props: Pick<ActionsPayload, "keys">,
) {
  const currentSelectedOption = state.items.find(
    item => item.id === state.selectedId,
  );
  const nextOption = getNextOptionFromKeys({
    items: state.items,
    searchString: props.keys || "",
    itemToString: item => {
      if (!item) return "";
      return (item.ref.current as Node).textContent || String(item.value);
    },
    currentValue: currentSelectedOption,
  });

  if (!nextOption) return state;

  return {
    ...state,
    selectedId: nextOption.id,
  };
}

////////////////////////////////////////////////////////////////

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER": {
      return register(state, action.payload);
    }
    case "UNREGISTER": {
      return unRegister(state, action.payload);
    }
    case "PREVIOUS": {
      return focusNextOrPrevious(state, action.payload, "previous");
    }
    case "NEXT": {
      return focusNextOrPrevious(state, action.payload, "next");
    }
    case "MOUSE_SELECT": {
      return mouseSelect(state, action.payload);
    }
    case "FOCUS": {
      return moveFocus(state, action.payload);
    }
    case "SELECT": {
      return select(state, action.payload);
    }
    case "RESET": {
      return reset(state, action.payload);
    }
    case "SELECT_FOCUSED": {
      return selectFocused(state, action.payload);
    }
    case "RESET_FOCUSED": {
      return resetFocused(state, action.payload);
    }
    case "CHARACTER_FOCUS": {
      return focusOptionFromKeys(state, action.payload);
    }
    case "CHARACTER_SELECT": {
      return selectOptionFromKeys(state, action.payload);
    }
    case "FIRST": {
      return focusFirstOrLast(state, action.payload, "first");
    }
    case "LAST": {
      return focusFirstOrLast(state, action.payload, "last");
    }
    default:
      throw new Error("Reducer called without proper action type.");
  }
}
