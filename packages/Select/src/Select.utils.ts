import { useIsomorphicEffect, usePrevious } from "@chakra-ui/hooks";
import {
  UseDescendantsReturn,
  Descendant,
  DescendantsState,
  DescendantsActions,
} from "@chakra-ui/descendant";
import computeScrollIntoView from "compute-scroll-into-view";
import * as React from "react";
import { ensureFocus } from "@chakra-ui/utils";

export function useDefaultValue(
  descendants: UseDescendantsReturn,
  defaultValue: string | number,
) {
  const [state, actions] = descendants;
  useIsomorphicEffect(() => {
    if (defaultValue && state.items.length) {
      const option = state.items.find(option => option.value === defaultValue);
      if (option) {
        actions.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items]);
}

export function useValue(
  descendants: UseDescendantsReturn,
  value: string | number,
) {
  const [state, actions] = descendants;
  useIsomorphicEffect(() => {
    if (value && state.items.length) {
      const option = state.items.find(option => option.value === value);
      if (option) {
        actions.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state.items]);
}

function scrollIntoView(node: HTMLElement, menuNode: HTMLElement) {
  if (node === null) {
    return;
  }

  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed",
  });
  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}

export function useScrollIntoView(
  menuRef: React.RefObject<any>,
  highlightedItem: Descendant | null,
  isOpen: boolean,
  shouldScrollRef: React.MutableRefObject<boolean>,
) {
  React.useEffect(() => {
    if (!highlightedItem || !isOpen) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoView(highlightedItem.ref.current, menuRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedItem, isOpen]);
}

export function useFocusManagement(
  controlRef: React.RefObject<any>,
  listBoxRef: React.RefObject<any>,
  isOpen: boolean,
) {
  const prevIsOpen = usePrevious(isOpen);

  React.useEffect(() => {
    if (isOpen && listBoxRef.current) {
      ensureFocus(listBoxRef.current);
      return;
    }
    if (prevIsOpen && !isOpen && controlRef.current) {
      ensureFocus(controlRef.current);
    }
  }, [isOpen, prevIsOpen, controlRef, listBoxRef]);
}

export function useOpenEffect(
  state: DescendantsState,
  actions: DescendantsActions,
  isOpen: boolean,
  prevIsOpen: boolean,
) {
  const { reset, highlight, first } = actions;

  useIsomorphicEffect(() => {
    if (prevIsOpen && !isOpen) {
      return reset("highlighted");
    }

    if (isOpen) {
      if (state.selectedItem) {
        highlight(state.selectedItem);
      } else {
        if (!state.highlightedItem) {
          first("highlight");
        }
      }
    }
    // eslint-disable-next-line
  }, [isOpen, prevIsOpen]);
}
