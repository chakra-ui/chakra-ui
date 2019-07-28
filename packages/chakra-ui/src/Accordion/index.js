/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef, useRef, useState } from "react";
import propTypes from "prop-types";
import Box from "../Box";
import Collapse from "../Collapse";
import PseudoBox from "../PseudoBox";
import { genId } from "../utils";

const Accordion = ({
  isOpen,
  defaultIsOpen,
  onChange,
  children,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpen != null);
  let _isExpanded = isControlled ? isOpen : isExpanded;

  const onToggle = () => {
    onChange && onChange(!_isExpanded);
    !isControlled && setIsExpanded(!isExpanded);
  };

  const headerId = genId("header");
  const panelId = genId("panel");

  return (
    <Box {...rest}>
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
};

Accordion.propTypes = {
  /**
   * If `true`, component is in controlled mode and you'll need
   * to pass `onChange` handle collapsing behavior
   */
  isOpen: propTypes.bool,
  /**
   * If `true`, accordion will be open on initial mount
   */
  defaultIsOpen: propTypes.bool,
  /**
   * The callback when the accordion opens and closes
   * @param {Boolean} isOpen - the next state of the accordion
   */
  onChange: propTypes.func,
  /**
   * The content of the accordion, must be `AccordionHeader` and `AccordionPanel`
   */
  children: propTypes.node.isRequired
};

/////////////////////////////////////////////////////////////

/**
 * AccordionHeader component composes `PseudoBox`, this means you can use
 * the `_expanded`, `_disabled`, `_hover`, etc. props to style them
 */
const AccordionHeader = ({
  isExpanded,
  isDisabled,
  size,
  panelId,
  headerId,
  onToggle,
  children,
  ...rest
}) => {
  return (
    <PseudoBox
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
  );
};

/////////////////////////////////////////////////////////////

/**
 * AccordionPanel component composes `Collapse` to provide the height animation
 */
const AccordionPanel = forwardRef(
  ({ isExpanded, onToggle, headerId, panelId, ...rest }, ref) => {
    return (
      <Collapse
        role="region"
        id={panelId}
        aria-labelledby={headerId}
        ref={ref}
        aria-hidden={!isExpanded}
        isOpen={isExpanded}
        {...rest}
      />
    );
  }
);
export default Accordion;
export { AccordionHeader, AccordionPanel };
