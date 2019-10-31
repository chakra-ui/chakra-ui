import { getValue, getItemIndex, getNextIndex } from "./utils";

export type EventType =
  | "mouse-select"
  | "keyboard-select"
  | "character-select"
  | "reset";

export interface Props {
  item?: Item;
  id?: string;
  loop?: boolean;
  lastEvent?: EventType;
  onFocus?: (stopId: string | null) => void;
  onSelect?: (stopId: string | null) => void;
  selectOnFocus?: boolean;
  focusedId?: string;
  selectedId?: string;
}

export interface Item {
  id: string;
  ref: React.RefObject<HTMLElement>;
}

export interface State {
  items: Item[];
  lastEvent: EventType | "";
  selectedId: string | null;
  focusedId: string | null;
}

function keyboardFocusMove(state: State, props: Props, nextFocusId: string) {
  if (props.onFocus) {
    props.onFocus(nextFocusId);
  }

  if (props.selectOnFocus && props.onSelect) {
    props.onSelect(nextFocusId);
  }

  if (props.focusedId != null && props.focusedId != null) {
    return state;
  }

  const nextState: State = {
    ...state,
    lastEvent: "keyboard-select",
  };

  if (!props.focusedId != null) {
    nextState["focusedId"] = nextFocusId;
  }

  if (!props.focusedId != null && props.selectOnFocus) {
    nextState["selectedId"] = nextFocusId;
  }

  return nextState;
}

export function nextOrPrevious(
  state: State,
  props: Props,
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
    loop: props.loop || true,
    step: type === "next" ? 1 : -1,
  });

  const nextFocusedId = state.items[nextFocusIndex]["id"];

  return keyboardFocusMove(state, props, nextFocusedId);
}

////////////////////////////////////////////////////////////////

export function keyboardSelect(state: State, props: Props): State {
  if (props.onSelect) {
    props.onSelect(state.focusedId);
  }

  if (props.selectedId != null) {
    return state;
  }

  return {
    ...state,
    lastEvent: "keyboard-select",
    selectedId: state.focusedId,
  };
}

////////////////////////////////////////////////////////////////

export function mouseSelect(state: State, props: Props) {
  const focusIsControlled = props.focusedId != null;
  const selectionIsControlled = props.selectedId != null;

  if (props.onSelect && props.id) {
    props.onSelect(props.id);
  }

  if (props.onFocus && props.id) {
    props.onFocus(props.id);
  }

  const nextState: State = { ...state, lastEvent: "mouse-select" };

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

export function selectFirstOrLast(
  state: State,
  props: Props,
  type: "first" | "last",
) {
  const nextFocusedId =
    type === "first"
      ? state.items[0]["id"]
      : state.items[state.items.length - 1]["id"];
  if (!nextFocusedId) return state;

  return keyboardFocusMove(state, props, nextFocusedId);
}

////////////////////////////////////////////////////////////////

export function register(state: State, props: Props) {
  const newItem = props.item;

  if (!newItem) return state;

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

  const indexAfter = state.items.findIndex(
    item =>
      !!(
        item.ref.current &&
        newItem.ref.current &&
        item.ref.current.compareDocumentPosition(newItem.ref.current) &
          Node.DOCUMENT_POSITION_PRECEDING
      ),
  );

  if (indexAfter === -1) {
    return {
      ...state,
      items: [...state.items, newItem],
    };
  }

  return {
    ...state,
    items: [
      ...state.items.slice(0, indexAfter),
      newItem,
      ...state.items.slice(indexAfter),
    ],
  };
}

////////////////////////////////////////////////////////////////

export function unRegister(state: State, props: Props) {
  const filtedItems = state.items.filter(item => item.id !== props.id);
  if (filtedItems.length === state.items.length) {
    return state;
  }
  return {
    ...state,
    selectedId:
      state.selectedId && state.selectedId === props.id
        ? state.items.length === 0
          ? null
          : state.items[0]["id"]
        : state.selectedId,
    items: state.items,
  };
}

////////////////////////////////////////////////////////////////

export function reset(state: State, props: Props) {
  return {
    ...state,
    selectedId: props.selectedId || null,
    focusedId: props.focusedId || null,
  };
}
