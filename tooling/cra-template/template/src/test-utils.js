import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

const AllProviders = ({ children }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
