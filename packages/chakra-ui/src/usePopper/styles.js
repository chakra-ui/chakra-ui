import { css } from "@emotion/core";

const getPopperArrowStyle = ({
  arrowSize = "1rem",
  arrowShadowColor = "rgba(0, 0, 0, 0.1)",
  hasArrow = true,
}) => {
  const popoverMargin = hasArrow ? `calc(${arrowSize} / 2)` : null;
  const arrowPos = `calc(${arrowSize} / 2 * -1)`;

  return css`
    > [data-arrow] {
      width: ${arrowSize};
      height: ${arrowSize};
      position: absolute;
      transform: rotate(45deg);
      background-color: inherit;

      &::before {
        content: "";
        width: ${arrowSize};
        height: ${arrowSize};
        position: absolute;
        z-index: -1;
      }
    }

    &[data-placement^="top"] {
      margin-bottom: ${popoverMargin};
      transform-origin: bottom center;
    }

    &[data-placement^="top"] > [data-arrow] {
      bottom: ${arrowPos};

      &::before {
        box-shadow: 2px 2px 2px 0 ${arrowShadowColor};
      }
    }

    &[data-placement^="bottom"] {
      margin-top: ${popoverMargin};
      transform-origin: top center;
    }

    &[data-placement^="bottom"] > [data-arrow] {
      top: ${arrowPos};

      &::before {
        box-shadow: -1px -1px 1px 0 ${arrowShadowColor};
      }
    }

    &[data-placement^="right"] {
      margin-left: ${popoverMargin};
      transform-origin: left center;
    }

    &[data-placement^="right"] > [data-arrow] {
      left: ${arrowPos};

      &::before {
        box-shadow: -1px 1px 1px 0 ${arrowShadowColor};
      }
    }

    &[data-placement^="left"] {
      margin-right: ${popoverMargin};
      transform-origin: right center;
    }

    &[data-placement^="left"] > [data-arrow] {
      right: ${arrowPos};
      &::before {
        box-shadow: 1px -1px 1px 0 ${arrowShadowColor};
      }
    }
  `;
};

export default getPopperArrowStyle;
