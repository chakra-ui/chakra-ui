import { Box, BoxProps } from '@chakra-ui/core';
import { css } from '@emotion/core';
import React from 'react';

// TODO: Follow the status of https://github.com/WICG/inert and remove polyfill
if (typeof window !== 'undefined') {
  import('wicg-inert');
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselSlideProps extends BoxProps {}

const CarouselSlide = React.forwardRef(
  ({ children, inert, ...restProps }: CarouselSlideProps, ref) => {
    return (
      <Box
        ref={ref}
        role="group"
        aria-roledescription="slide"
        flex="0 0 100%"
        css={css`
          scroll-snap-align: center;
        `}
        {...restProps}
      >
        {/* TODO: Remove extra `div` once `shouldForwardProp` of `Box` supports `inert` */}
        <div
          inert={inert}
          css={css`
            height: 100%;
            > * {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}
        >
          {children}
        </div>
      </Box>
    );
  },
);

export default CarouselSlide;
