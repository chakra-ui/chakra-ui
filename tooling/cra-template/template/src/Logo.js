import React from 'react';
import { chakra, keyframes } from '@chakra-ui/core';
import logo from './logo.svg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = props => (
  <chakra.img
    css={{
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${spin} infinite 20s linear`,
      },
    }}
    src={logo}
    {...props}
  />
);
