import { Placement } from "popper.js";

interface PopperOffset {
  top?: number | null;
  left?: number | null;
}

export function getNormalizedOffset(offset: PopperOffset) {
  return {
    top: Math.floor(offset.top || 0),
    left: Math.floor(offset.left || 0),
  };
}

type NormalizedOffset = ReturnType<typeof getNormalizedOffset>;

const oppositeDirections = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right",
};

type Direction = keyof typeof oppositeDirections;

export function getOppositePosition(position: Direction) {
  return oppositeDirections[position];
}

function splitPlacement(placement: Placement) {
  return placement.split("-") as Direction[];
}

interface PopperMarginOptions {
  arrowSize?: number;
  margin?: number;
  showArrow?: boolean;
}

export function getPopoverOffset(
  placement: Placement,
  options: PopperMarginOptions,
) {
  const { arrowSize, margin, showArrow } = options;
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(
    position,
  ) as keyof typeof oppositeDirections;

  const value = showArrow && arrowSize ? arrowSize : margin || 0;
  const directionValues = {
    top: value,
    bottom: -value,
    left: value,
    right: -value,
  };
  const direction = isVerticalPosition(oppositePosition) ? "top" : "left";
  return [direction, directionValues[oppositePosition]] as const;
}

function isVerticalPosition(position: string) {
  return position === "top" || position === "bottom";
}

export function getArrowStyles(
  arrowSize: number,
  offsets: NormalizedOffset,
  placement: Placement,
) {
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(position);
  if (!oppositePosition) return null;

  const alignmentProperty = isVerticalPosition(position) ? "left" : "top";

  return {
    [alignmentProperty]: `${offsets[alignmentProperty]}px`,
    [oppositePosition]: `-${arrowSize / 2}px`,
    width: arrowSize,
    height: arrowSize,
    position: "absolute",
    transform: "rotate(45deg)",
  };
}
