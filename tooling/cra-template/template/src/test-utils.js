import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {children}
  </ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
