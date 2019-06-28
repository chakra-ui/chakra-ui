/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { forwardRef, useRef, useState } from "react";
import AnimateHeight from "../AnimateHeight";
import Icon from "../Icon";
import { Box, Flex } from "../Layout";
import { genId } from "../utils";

const Accordion = ({
  title,
  defaultOpen,
  isDisabled,
  onOpenChange,
  size,
  isOpen,
  showIcon = true,
  children,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen || false);
  const { current: isControlled } = useRef(isOpen != null);

  let actualExpanded = isControlled ? isOpen : isExpanded;

  const handleToggle = () => {
    onOpenChange && onOpenChange();
    !isControlled && setIsExpanded(!isExpanded);
  };

  const headerId = genId("header");
  const panelId = genId("panel");

  return (
    <Box {...rest} border="1px" borderColor="gray.200">
      {title && (
        <AccordionHeader
          id={headerId}
          showIcon={showIcon}
          panelId={panelId}
          isExpanded={actualExpanded}
          onClick={handleToggle}
          size={size}
          fontWeight="semibold"
        >
          {title}
        </AccordionHeader>
      )}

      <AccordionPanel
        id={panelId}
        headerId={headerId}
        isExpanded={actualExpanded}
        duration={200}
        pl={showIcon ? 7 : 3}
        pr={3}
      >
        {children}
      </AccordionPanel>
    </Box>
  );
};

/////////////////////////////////////////////////////////////

const AccordionHeader = ({
  isExpanded,
  isDisabled,
  size,
  panelId,
  showIcon,
  children,
  isFocused,
  ...rest
}) => {
  return (
    <Flex
      alignItems="center"
      width="100%"
      position="relative"
      borderRadius="sm"
      transition="all 0.2s"
      aria-expanded={isExpanded}
      aria-disabled={isDisabled}
      aria-controls={panelId}
      as="button"
      py={2}
      px={1}
      css={theme => ({
        "&:focus": {
          boxShadow: theme.shadows.focusring
        }
      })}
      {...rest}
    >
      {showIcon && (
        <Icon
          size="24px"
          color="blue.500"
          name="chevron-right"
          css={{
            transform: `rotate(${isExpanded ? "90deg" : "0"})`,
            transformOrigin: "center",
            transition: "transform 0.2s"
          }}
          mr={1}
        />
      )}
      {children}
    </Flex>
  );
};

AccordionHeader.propTypes = {
  size: oneOf(["xs", "sm", "md", "lg", "xl"])
};

/////////////////////////////////////////////////////////////

const AccordionPanel = forwardRef(
  ({ id, isExpanded, children, duration, headerId, height, ...rest }, ref) => {
    return (
      <AnimateHeight isOpen={isExpanded} duration={duration}>
        <Box
          mb={5}
          ref={ref}
          aria-labelledby={headerId}
          role="region"
          {...rest}
        >
          {children}
        </Box>
      </AnimateHeight>
    );
  }
);
export default Accordion;
export { AccordionHeader, AccordionPanel };
