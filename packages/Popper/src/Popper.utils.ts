import { Placement } from "@popperjs/core";

const oppositeDirections = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right",
};

type Direction = keyof typeof oppositeDirections;

export const getOppositePosition = (position: Direction) =>
  oppositeDirections[position];

const splitPlacement = (placement: Placement) =>
  placement.split("-") as Direction[];

export function getArrowStyles(
  placement: Placement,
  arrowSize: number,
): React.CSSProperties {
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(position);
  if (!oppositePosition) return {};

  return {
    [oppositePosition]: `-${arrowSize / 2}px`,
    width: arrowSize,
    height: arrowSize,
    position: "absolute",
    transform: "rotate(45deg)",
  };
}
