import { SystemProps } from "@chakra-ui/system";
import { ResponsiveValue } from "styled-system";
import { isArray, Dict, isString } from "@chakra-ui/utils";

const px = (n: string | number) => (typeof n === "number" ? n + "px" : n);

export function widthToColumns(
  width: SystemProps["width"],
): SystemProps["gridTemplateColumns"] | null {
  if (Array.isArray(width)) {
    return width.map(widthToColumns as any);
  }

  if (
    width !== null &&
    typeof width === "object" &&
    Object.keys(width).length > 0
  ) {
    const acc: Record<string, string> = {};
    for (const key in width) {
      acc[key] = `repeat(auto-fit, minmax(${px(width[key])}, 1fr))`;
    }
    return acc;
  }

  if (width != null) {
    return `repeat(auto-fit, minmax(${px(width as any)}, 1fr))`;
  }

  return null;
}

export function countToColumns(
  count: ResponsiveValue<number> | undefined,
): SystemProps["gridTemplateColumns"] | null {
  if (Array.isArray(count)) {
    return count.map(countToColumns as any);
  }

  if (
    count !== null &&
    typeof count === "object" &&
    Object.keys(count).length > 0
  ) {
    const acc: Record<string, string> = {};
    for (const key in count) {
      acc[key] = `repeat(${count[key]}, 1fr)`;
    }
    return acc;
  }

  if (count != null) {
    return `repeat(${count}, 1fr)`;
  }

  return null;
}
