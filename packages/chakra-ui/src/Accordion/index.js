/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import propTypes from "prop-types";
import { createContext, forwardRef, useContext, useRef, useState } from "react";
import Box from "../Box";
import Collapse from "../Collapse";
import PseudoBox from "../PseudoBox";

const AccordionContext = createContext();

const Accordion = forwardRef(
  (
    { isOpen, defaultIsOpen, isDisabled, onOpenChange, children, ...rest },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
    const { current: isControlled } = useRef(isOpen != null);
    let _isExpanded = isControlled ? isOpen : isExpanded;

    const onToggle = () => {
      onOpenChange && onOpenChange(!_isExpanded);
      !isControlled && setIsExpanded(!isExpanded);
    };

    const headerId = `accordion-header:${useId()}`;
    const panelId = `accordion-panel:${useId()}`;

    return (
      <AccordionContext.Provider
        value={{ isExpanded: _isExpanded, headerId, panelId, onToggle }}
      >
        <Box ref={ref} {...rest}>
          {typeof children === "function"
            ? children({ isExpanded, isDisabled })
            : children}
        </Box>
      </AccordionContext.Provider>
    );
  },
);

Accordion.propTypes = {
  isOpen: propTypes.bool,
  defaultIsOpen: propTypes.bool,
  onOpenChange: propTypes.func,
  children: propTypes.node.isRequired,
};

/////////////////////////////////////////////////////////////

const AccordionHeader = forwardRef((props, ref) => {
  const { isExpanded, panelId, headerId, isDisabled, onToggle } = useContext(
    AccordionContext,
  );
  return (
    <PseudoBox
      ref={ref}
      display="flex"
      alignItems="center"
      width="100%"
      position="relative"
      borderRadius="sm"
      transition="all 0.2s"
      as="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-expanded={isExpanded}
      onClick={onToggle}
      id={headerId}
      aria-controls={panelId}
      px={4}
      py={2}
      {...props}
    ></PseudoBox>
  );
});

/////////////////////////////////////////////////////////////

const AccordionPanel = forwardRef((props, ref) => {
  const { isExpanded, panelId, headerId } = useContext(AccordionContext);
  return (
    <Collapse
      role="region"
      id={panelId}
      aria-labelledby={headerId}
      ref={ref}
      aria-hidden={!isExpanded}
      isOpen={isExpanded}
      px={4}
      py={2}
      {...props}
    />
  );
});
export default Accordion;
export { AccordionHeader, AccordionPanel };
