import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import * as React from "react";
import useBlurOutside from "../useBlurOutside";
import createCtx from "../useCreateContext";
import useDisclosure from "../useDisclosure";
import { useForkRef } from "../useForkRef";
import usePopper from "../usePopper";
import useRapidKeydown from "../useRapidKeydown";
import { useSelectionItem, useSelectionState } from "../useSelection";
import { SelectionItem } from "../useSelection/reducer";
import useFocusManagement from "./useFocusManagement";
import useOpenEffect from "./useOpenEffect";
import useScrollIntoView from "./useScrollIntoView";
import { useDefaultValue, useValue } from "./useValue";

////////////////////////////////////////////////////////////////////////////////////

const [useSelectCtx, SelectCtxProvider] = createCtx<any>();

////////////////////////////////////////////////////////////////////////////////////

function useSelect(props: any) {
  const selection = useSelectionState();
  const disclosure = useDisclosure(props);
  const popper = usePopper({
    placement: props.placement || "bottom-start",
    modifiers: {
      computeStyle: { gpuAcceleration: false },
    },
  });

  const controlRef = React.useRef();
  const listBoxRef = React.useRef();

  useScrollIntoView(
    listBoxRef,
    selection.items,
    selection.highlightedItem,
    disclosure.isOpen,
  );
  useFocusManagement(controlRef, listBoxRef, disclosure.isOpen);
  useDefaultValue(selection, props.defaultValue);
  useValue(selection, props.value);
  useOpenEffect(selection, disclosure.isOpen);

  const selectOption = (option: SelectionItem, highlightOnSelect?: boolean) => {
    selection.select(option, highlightOnSelect);
    props.onChange && props.onChange(option.value);
    disclosure.onClose();
  };

  return {
    popper,
    ...disclosure,
    controlRef,
    listBoxRef,
    selectOption,
    ...selection,
  };
}

/////////////////////////////////////////////////////////////////////////////////

export function useSelectOption(props: any) {
  const select = useSelectCtx();
  const selectionItem = useSelectionItem({ ...select, ...props });
  const { item, isHighlighted, isSelected } = selectionItem;

  const {
    selectedItem,
    highlightedItem,
    onClose,
    selectOption,
    reset,
    highlight,
  } = select;

  const onClick = React.useCallback(() => {
    if (selectedItem && item.id === selectedItem.id) {
      onClose();
    } else {
      selectOption(item);
    }
  }, [item, onClose, selectOption, selectedItem]);

  const onPointerLeave = React.useCallback(() => {
    reset("highlighted");
  }, [reset]);

  const onPointerEnter = React.useCallback(() => {
    if (highlightedItem && item.id === highlightedItem.id) {
      return;
    }
    highlight(item);
  }, [highlightedItem, item, highlight]);

  return {
    id: item.id,
    ref: item.ref,
    "data-value": item.value,
    role: "option",
    "aria-selected": isHighlighted ? true : undefined,
    "data-selected": isSelected ? "" : undefined,
    "data-highlighted": isHighlighted ? "" : undefined,
    onClick: composeEventHandlers(props.onClick, onClick),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, onPointerLeave),
    onPointerEnter: composeEventHandlers(props.onPointerEnter, onPointerEnter),
  };
}

/////////////////////////////////////////////////////////////////////////////////

export function useSelectButton(props: any) {
  const select = useSelectCtx();
  const {
    onToggle,
    isOpen,
    setIsMousingDown,
    selectedItem,
    onOpen,
    next,
    previous,
    first,
    last,
    search,
  } = select;

  const ref = useForkRef(select.popper.reference.ref, select.controlRef);

  const onClick = React.useCallback(onToggle, []);

  const onPointerDown = React.useCallback(() => {
    if (isOpen) {
      setIsMousingDown(true);
    }
  }, [isOpen, setIsMousingDown]);

  const onRapidKeyDown = useRapidKeydown();

  const onKeyDown = React.useCallback(
    createOnKeyDown({
      onKeyDown: event => onRapidKeyDown(event, keys => search(keys, "select")),
      keyMap: {
        ArrowUp: onOpen,
        ArrowDown: onOpen,
        ArrowRight: () => next("select"),
        ArrowLeft: () => previous("select"),
        Home: () => first("select"),
        End: () => last("select"),
        " ": event => {
          event && event.preventDefault();
          onToggle();
        },
      },
    }),
    [search, onOpen, next, previous, first, last, onToggle],
  );

  const selectedOptionText =
    selectedItem && (selectedItem.ref.current as Node).textContent;

  return {
    ref,
    selected: select.selectedItem,
    "data-selected-text": selectedOptionText || undefined,
    type: "button",
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
    onClick: composeEventHandlers(props.onClick, onClick),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    onPointerDown: composeEventHandlers(props.onPointerDown, onPointerDown),
  };
}

////////////////////////////////////////////////////////////////////////////////////

export function useSelectListBox(props: any) {
  const select = useSelectCtx();
  const onRapidKeyDown = useRapidKeydown();
  const onBlur = useBlurOutside(select.controlRef, select.listBoxRef, {
    action: select.onClose,
    visible: select.isOpen,
  });
  const ref = useForkRef(select.popper.popper.ref, select.listBoxRef);

  const {
    onClose,
    next,
    previous,
    first,
    last,
    search,
    reset,
    select: _select,
  } = select;

  const onKeyDown = React.useCallback(
    createOnKeyDown({
      onKeyDown: event =>
        onRapidKeyDown(event, keys => search(keys, "highlight")),
      keyMap: {
        ArrowDown: () => {
          next("highlight");
        },
        ArrowUp: () => previous("highlight"),
        Enter: () => {
          _select(null);
          onClose();
        },
        Tab: event => {
          event && event.preventDefault();
          _select(null);
          onClose();
        },
        Escape: event => {
          event && event.preventDefault();
          reset("highlighted");
          onClose();
        },
        Home: () => first("highlight"),
        End: () => last("highlight"),
      },
    }),
    [search, next, _select, reset, onClose, first, last],
  );

  return {
    ref,
    role: "listbox",
    hidden: !select.isOpen,
    tabIndex: -1,
    "data-placement": select.popper.popper.placement,
    style: select.popper.popper.style,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    "aria-activedescendant": select.highlightedItem
      ? select.highlightedItem.id
      : undefined,
  };
}

////////////////////////////////////////////////////////////////////////////////////

export function SelectProvider(props: any) {
  const select = useSelect(props);
  // eslint-disable-next-line
  const ctx = React.useMemo(() => select, Object.values(select));
  return <SelectCtxProvider value={ctx}>{props.children}</SelectCtxProvider>;
}
