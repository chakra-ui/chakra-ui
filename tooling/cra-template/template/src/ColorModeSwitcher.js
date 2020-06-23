import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/core';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const [, toggleMode] = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
