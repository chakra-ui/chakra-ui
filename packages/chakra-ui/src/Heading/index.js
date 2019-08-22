/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import Box from "../Box";
import { forwardRef } from "react";

/* 
.uni-headline--1 {
    font-family: helvetica,arial,sans-serif;
    font-weight: 300;
    letter-spacing: -.025em;
    font-size: 2.5rem;
    color: rgba(19,41,63,.65);
    line-height: 1
}

@media (max-width: 37.4375rem) {
    .uni-headline--1 {
        font-size:1.875rem
    }
}

@media (max-width: 37.4375rem) {
    .uni-headline--1 {
        line-height:1.06667
    }
}

.uni-headline--2 {
    font-family: helvetica,arial,sans-serif;
    font-weight: 300;
    letter-spacing: -.025em;
    font-size: 1.875rem;
    color: rgba(19,41,63,.65);
    line-height: 1.06667
}

@media (max-width: 37.4375rem) {
    .uni-headline--2 {
        font-size:1.375rem
    }
}

@media (max-width: 37.4375rem) {
    .uni-headline--2 {
        line-height:1.09091
    }
}

.uni-headline--3 {
    font-family: helvetica,arial,sans-serif;
    font-weight: 400;
    letter-spacing: -.015em;
    font-size: 1.375rem;
    color: #13293f;
    line-height: 1.18182
}

@media (max-width: 37.4375rem) {
    .uni-headline--3 {
        font-size:1.125rem
    }
}

@media (max-width: 37.4375rem) {
    .uni-headline--3 {
        line-height:1.16667
    }
}
*/

const sizes = {
  "2xl": "5xl",
  xl: "4xl",
  lg: "2xl",
  md: "xl",
  sm: "md",
  xs: "sm",
};

const Heading = forwardRef(({ size = "md", ...props }, ref) => (
  <Box
    ref={ref}
    as="h2"
    fontSize={sizes[size]}
    lineHeight="short"
    fontWeight="bold"
    {...props}
  />
));

Heading.propTypes = {
  size: propTypes.oneOf(["2xl", "xl", "lg", "md", "sm", "xs"]),
};

export default Heading;
