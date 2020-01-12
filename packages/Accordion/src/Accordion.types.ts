import * as React from "react";

//////////////////////////////////////////////////////////////////////

export type OpenedIndex = number | number[];

//////////////////////////////////////////////////////////////////////

export interface AccordionsProviderProps {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: boolean;
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: boolean;
  /**
   * The index(es) of the expanded accordion item
   */
  index?: OpenedIndex;
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: OpenedIndex;
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?: (expandedIndex?: OpenedIndex | null) => void;
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode;
}

//////////////////////////////////////////////////////////////////////

export type AccordionElement = React.ReactElement<{
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}>;

//////////////////////////////////////////////////////////////////////

export interface AccordionProviderProps {
  /**
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, expands the accordion by on initial mount.
   */
  defaultIsOpen?: boolean;
  /**
   * If `true`, the accordion item will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the accordion item will be focusable.
   */
  isFocusable?: boolean;
  /**
   * A unique id for the accordion item.
   */
  id?: string;
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: (isOpen: boolean) => void;
}

//////////////////////////////////////////////////////////////////////

export interface AccordionButtonProps {
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.RefObject<HTMLElement>;
}

//////////////////////////////////////////////////////////////////////
