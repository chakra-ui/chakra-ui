/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useUID as useId } from "react-uid";
import {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { Box, BoxProps } from "../Box";
import { Collapse, CollapseProps } from "../Collapse";
import Icon, { IconProps } from "../Icon/Icon";
import { Merge } from "../utils";

interface AccordionChildProps {
  isOpen?: boolean;
  onChange(e: boolean): void;
}

export interface AccordionOptions {
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
  index?: number | number[];
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: number | number[];
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?: (expandedIndex?: number | number[] | null) => void;
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode;
}

export type AccordionProps<P, T> = Merge<BoxProps<P, T>, AccordionOptions>;

const Accordion = forwardRef(function Accordion<P, T>(
  {
    allowMultiple,
    allowToggle,
    index,
    defaultIndex,
    onChange,
    children,
    ...rest
  }: AccordionProps<P, T>,
  ref: React.Ref<T>,
) {
  const initializeState = () => {
    if (allowMultiple) {
      return defaultIndex || [];
    } else {
      return defaultIndex || 0;
    }
  };

  const getExpandCondition = (index: number | number[], itemIndex: number) => {
    if (Array.isArray(index)) {
      return index.includes(itemIndex);
    }
    return index === itemIndex;
  };

  const [expandedIndex, setExpandedIndex] = useState<number | number[] | null>(
    initializeState,
  );
  const { current: isControlled } = useRef(index != null);

  const _index = isControlled ? index : expandedIndex;

  const clones = Children.map(children, (child, childIndex) => {
    if (!isValidElement(child)) return;

    return cloneElement(child, {
      isOpen: _index ? getExpandCondition(_index, childIndex) : false,
      onChange: (isExpanded: boolean) => {
        if (allowMultiple && Array.isArray(_index)) {
          if (isExpanded) {
            let newIndexes = [..._index, childIndex];
            !isControlled && setExpandedIndex(newIndexes);
            onChange && onChange(newIndexes);
          } else {
            let newIndexes = _index.filter(
              itemIndex => itemIndex !== childIndex,
            );
            !isControlled && setExpandedIndex(newIndexes);
            onChange && onChange(newIndexes);
          }
        } else {
          if (isExpanded) {
            !isControlled && setExpandedIndex(childIndex);
            onChange && onChange(childIndex);
          } else {
            if (allowToggle) {
              !isControlled && setExpandedIndex(null);
              onChange && onChange(null);
            }
          }
        }
      },
    });
  });

  return (
    <Box ref={ref} data-accordion="" {...rest}>
      {clones}
    </Box>
  );
});

interface AccordionItemContextValue {
  isExpanded?: boolean;
  isDisabled?: boolean;
  headerId?: string;
  panelId?: string;
  onToggle?(): void;
}

interface AccordionItemRenderProps {
  isExpanded?: boolean;
  isDisabled?: boolean;
}

type AccordionItemChildren =
  | { children(props: AccordionItemRenderProps): React.ReactNode }
  | { children: React.ReactNode };

interface AccordionItemOptions {
  /**
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, expands the accordion by on initial mount.
   */
  defaultIsOpen?: boolean;
  /**
   * If `true`, the accordion header will be disabled.
   */
  isDisabled?: boolean;
  /**
   * A unique id for the accordion item.
   */
  id?: string;
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: (isOpen: boolean) => void;
}

export type AccordionItemProps<P, T> = AccordionItemOptions &
  AccordionItemChildren &
  BoxProps<P, T>;

const AccordionItemContext = createContext<AccordionItemContextValue>({});
const useAccordionItemContext = () => useContext(AccordionItemContext);

const AccordionItem = forwardRef(function AccordionItem<P, T>(
  {
    isOpen,
    defaultIsOpen,
    id,
    isDisabled,
    onChange,
    children,
    ...rest
  }: AccordionItemProps<P, T>,
  ref: React.Ref<T>,
) {
  const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpen != null);
  let _isExpanded = isControlled ? isOpen : isExpanded;

  const onToggle = () => {
    onChange && onChange(!_isExpanded);
    !isControlled && setIsExpanded(!isExpanded);
  };

  const uuid = useId();
  const uniqueId = id || uuid;

  const headerId = `accordion-header-${uniqueId}`;
  const panelId = `accordion-panel-${uniqueId}`;

  return (
    <AccordionItemContext.Provider
      value={{
        isExpanded: _isExpanded,
        isDisabled,
        headerId,
        panelId,
        onToggle,
      }}
    >
      <Box
        _last={{ borderBottomWidth: "1px" }}
        borderTopWidth="1px"
        data-accordion-item=""
        ref={ref}
        {...rest}
      >
        {typeof children === "function"
          ? children({ isExpanded: _isExpanded, isDisabled })
          : children}
      </Box>
    </AccordionItemContext.Provider>
  );
});

/////////////////////////////////////////////////////////////

export type AccordionHeaderProps<P, T> = BoxProps<P, T>;

/**
 * AccordionHeader component composes `Box`, this means you can use
 * the `_expanded`, `_disabled`, `_hover`, etc. props to style them
 */
const AccordionHeader = forwardRef(function AccordionHeader<
  P,
  T = HTMLButtonElement
>({ onClick, ...props }: BoxProps<P, T>, ref: React.Ref<any>) {
  const {
    isExpanded,
    panelId,
    headerId,
    isDisabled,
    onToggle,
  } = useAccordionItemContext();
  return (
    //@ts-ignore
    <Box<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      ref={ref}
      display="flex"
      alignItems="center"
      width="100%"
      transition="all 0.2s"
      _focus={{ boxShadow: "outline" }}
      _hover={{ bg: "blackAlpha.50" }}
      _disabled={{ opacity: "0.4", cursor: "not-allowed" }}
      as="button"
      type="button"
      outline="0"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-expanded={isExpanded}
      onClick={event => {
        if (onToggle) {
          onToggle();
        }
        if (onClick) {
          //@ts-ignore
          onClick(event);
        }
      }}
      id={headerId}
      aria-controls={panelId}
      px={4}
      py={2}
      {...props}
    />
  );
});

/////////////////////////////////////////////////////////////

const AccordionPanel = forwardRef(function AccordionPanel<P>(
  props: CollapseProps<P, HTMLElement>,
  ref: React.Ref<HTMLElement>,
) {
  const { isExpanded, panelId, headerId } = useAccordionItemContext();
  return (
    <Collapse
      ref={ref}
      data-accordion-panel=""
      role="region"
      id={panelId}
      aria-labelledby={headerId}
      aria-hidden={!isExpanded}
      isOpen={isExpanded}
      pt={2}
      px={4}
      pb={5}
      {...props}
    />
  );
});

/////////////////////////////////////////////////////////////

const AccordionIcon = (props: IconProps) => {
  const { isExpanded, isDisabled } = useAccordionItemContext();
  return (
    <Icon
      aria-hidden
      focusable="false"
      size="1.25em"
      name="chevron-down"
      opacity={isDisabled ? 0.4 : 1}
      transform={isExpanded ? "rotate(-180deg)" : undefined}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHeader,
  AccordionPanel,
};
