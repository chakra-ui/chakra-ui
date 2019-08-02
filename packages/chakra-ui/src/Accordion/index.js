/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef, useRef, useState } from "react";
import propTypes from "prop-types";
import Box from "../Box";
import Collapse from "../Collapse";
import PseudoBox from "../PseudoBox";
import { genId } from "../utils";

const Accordion = forwardRef(
  ({ isOpen, defaultIsOpen, onOpenChange, children, ...rest }, ref) => {
    const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
    const { current: isControlled } = useRef(isOpen != null);
    let _isExpanded = isControlled ? isOpen : isExpanded;

    const onToggle = () => {
      onOpenChange && onOpenChange(!_isExpanded);
      !isControlled && setIsExpanded(!isExpanded);
    };

    const headerId = genId("header");
    const panelId = genId("panel");

    return (
      <Box ref={ref} {...rest}>
        {Children.map(children, child => {
          return cloneElement(child, {
            headerId,
            panelId,
            onToggle,
            isExpanded: _isExpanded
          });
        })}
      </Box>
    );
  }
);

Accordion.propTypes = {
  isOpen: propTypes.bool,
  defaultIsOpen: propTypes.bool,
  onOpenChange: propTypes.func,
  children: propTypes.node.isRequired
};

/////////////////////////////////////////////////////////////

const AccordionHeader = forwardRef(
  (
    {
      isExpanded,
      isDisabled,
      size,
      panelId,
      headerId,
      onToggle,
      children,
      ...rest
    },
    ref
  ) => (
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
      {...rest}
    >
      {typeof children === "function"
        ? children({ isExpanded, isDisabled })
        : children}
    </PseudoBox>
  )
);

/////////////////////////////////////////////////////////////

const AccordionPanel = forwardRef(
  ({ isExpanded, onToggle, headerId, panelId, ...rest }, ref) => (
    <Collapse
      role="region"
      id={panelId}
      aria-labelledby={headerId}
      ref={ref}
      aria-hidden={!isExpanded}
      isOpen={isExpanded}
      {...rest}
    />
  )
);
export default Accordion;
export { AccordionHeader, AccordionPanel };
