/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import propTypes from "prop-types";
import { Box, IconButton, ButtonGroup, useTheme, Tooltip } from "@chakra/ui";
import { useHover, useDisclosure } from "@chakra/ui/lib/hooks";

const ToolItem = ({ title, ...props }) => {
  return <IconButton borderRadius="none" {...props} />;
};

const ToolGroup = ({ onShowSettings, onDelete }) => {
  return (
    <ButtonGroup
      color="blue"
      size="sm"
      isAttached
      position="absolute"
      top="-24px"
      right="-2px"
    >
      <ToolItem icon="settings" title="Settings" onClick={onShowSettings} />
      <ToolItem icon="delete" title="Delete" onClick={onDelete} />
    </ButtonGroup>
  );
};

const HoverToolbar = ({
  children,
  onClick,
  onClickOutside,
  onShowSettings,
  onDelete
}) => {
  const theme = useTheme();
  const [ref, isHovered] = useHover();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBlur = event => {
    if (ref.current && !ref.current.contains(event.relatedTarget)) {
      onClickOutside && onClickOutside();
      onClose();
    }
  };

  const _open = isOpen || isHovered;

  return (
    <Box
      ref={ref}
      tabIndex="0"
      position="relative"
      onClick={onClick}
      onFocus={onOpen}
      onKeyDown={e => console.log(e.key)}
      onBlur={handleBlur}
      role="button"
      boxShadow={
        _open
          ? `0 0 0px 2px ${theme.colors.blue[500]}, 0 1px 5px rgba(0,0,0,0.3)`
          : "none"
      }
      maxWidth="md"
      mx="auto"
      mt="50px"
      p={1}
    >
      {children}
      {_open && (
        <ToolGroup onShowSettings={onShowSettings} onDelete={onDelete} />
      )}
    </Box>
  );
};

export default HoverToolbar;
