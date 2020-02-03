import { parseResponsiveProp } from "@chakra-ui/utils";

const px = (n: string | number) => (typeof n === "number" ? n + "px" : n);

export function widthToColumns(width: any) {
  return parseResponsiveProp(width, val =>
    val == null ? null : `repeat(auto-fit, minmax(${px(val)}, 1fr))`,
  );
}

export function countToColumns(count: any) {
  return parseResponsiveProp(count, val =>
    val == null ? null : `repeat(${val}, 1fr)`,
  );
}
