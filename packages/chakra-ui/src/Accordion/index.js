/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  Children,
  cloneElement,
} from "react";
import Box from "../Box";
import Collapse from "../Collapse";
import PseudoBox from "../PseudoBox";
import Icon from "../Icon";

const Accordion = ({
  allowMultiple,
  allowToggle,
  index,
  defaultIndex,
  onChange,
  children,
  ...rest
}) => {
  const initializeState = () => {
    if (allowMultiple) {
      return defaultIndex || [];
    } else {
      return defaultIndex || 0;
    }
  };

  const getExpandCondition = (index, itemIndex) => {
    if (Array.isArray(index)) {
      return index.includes(itemIndex);
    }
    return index === itemIndex;
  };

  const [expandedIndex, setExpandedIndex] = useState(initializeState);
  const { current: isControlled } = useRef(index != null);

  const _index = isControlled ? index : expandedIndex;

  const clones = Children.map(children, (child, childIndex) => {
    return cloneElement(child, {
      isOpen: getExpandCondition(_index, childIndex),
      onChange: isExpanded => {
        if (allowMultiple) {
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
    <Box data-accordion="" {...rest}>
      {clones}
    </Box>
  );
};

const AccordionItemContext = createContext();
const useAccordionItemContext = () => useContext(AccordionItemContext);

const AccordionItem = forwardRef(
  (
    { isOpen, defaultIsOpen, id, isDisabled, onChange, children, ...rest },
    ref,
  ) => {
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
        <PseudoBox
          borderTopWidth="1px"
          _last={{ borderBottomWidth: "1px" }}
          data-accordion-item=""
          ref={ref}
          {...rest}
        >
          {typeof children === "function"
            ? children({ isExpanded: _isExpanded, isDisabled })
            : children}
        </PseudoBox>
      </AccordionItemContext.Provider>
    );
  },
);

/////////////////////////////////////////////////////////////

const AccordionHeader = forwardRef(({ onClick, ...props }, ref) => {
  const {
    isExpanded,
    panelId,
    headerId,
    isDisabled,
    onToggle,
  } = useAccordionItemContext();
  return (
    <PseudoBox
      ref={ref}
      data-accordion-header=""
      display="flex"
      alignItems="center"
      width="100%"
      transition="all 0.2s"
      _focus={{ boxShadow: "outline" }}
      _hover={{ bg: "blackAlpha.50" }}
      _disabled={{ opacity: "0.4", cursor: "not-allowed" }}
      as="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-expanded={isExpanded}
      onClick={event => {
        onToggle();
        if (onClick) {
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

const AccordionPanel = forwardRef((props, ref) => {
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

const AccordionIcon = props => {
  const { isExpanded, isDisabled } = useAccordionItemContext();
  return (
    <Icon
      aria-hidden
      focusable="false"
      size="1.25em"
      name="chevron-down"
      opacity={isDisabled ? 0.4 : 1}
      transform={isExpanded ? "rotate(-180deg)" : null}
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
