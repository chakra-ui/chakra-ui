import { string } from "prop-types";

/**
 * Extracts the values of a translate property
 * @param str - the translate string `translate3d(23px, 0, 2px)`
 */
function extractTranslateValue(str: string) {
  const parts = str.split(/\w+\(|\);?/); // some regex I had to learn :)
  if (!parts[1] || !parts[1].length) {
    return "";
  }
  return parts[1];
}

/**
 * Gets the translate t
 * @param a - the translate string
 */
function getType(a: string) {
  if (a.startsWith("translateX")) {
    return "x";
  }
  if (a.startsWith("translateY")) {
    return "y";
  }
  if (a.startsWith("translateZ")) {
    return "z";
  }
  return "3d";
}

type TranslateValues =
  | {
      x: string;
      y: string;
      z: string;
    }
  | {
      [key in "x" | "y" | "z"]?: string;
    };

function getTranslateValues(a: string): TranslateValues | null {
  if (a.startsWith("translate")) {
    const res = extractTranslateValue(a).split(",");
    if (res.length === 3) {
      const [x, y, z] = res;
      return { x: x.trim(), y: y.trim(), z: z.trim() };
    } else {
      return { [getType(a)]: res[0].trim() };
    }
  }
  return null;
}

function getUnits(a: string): [number, string] {
  const vv = parseFloat(a);
  if (!isNaN(vv) && vv > 0) {
    const res = a.split(String(vv));
    return [vv, res[1]];
  } else {
    return [vv, "px"];
  }
}

function add(a: number, b: number) {
  return parseFloat((a + b).toFixed(10));
}

function prepare(obj: TranslateValues) {
  const result: TranslateValues = {};
  result.x = "x" in obj ? obj.x : "0px";
  result.y = "y" in obj ? obj.y : "0px";
  result.z = "z" in obj ? obj.z : "0px";
  return `translate3d(${result.x}, ${result.y}, ${result.z})`;
}

function addCSSUnits(a: string, b: string) {
  const [aValue, aUnit] = getUnits(a);
  const [bValue, bUnit] = getUnits(b);
  const isSameUnit = aUnit === bUnit;

  if (isSameUnit) {
    return `${add(aValue, bValue)}${aUnit || bUnit}`;
  } else {
    return `calc(${aValue}${aUnit} + ${bValue}${bUnit})`;
  }
}

/**
 * Merge two translate strings into `translate3d`
 * @param a first translate string
 * @param b second translate string
 */
export function mergeTransform<T extends string>(a: T, b: T) {
  const aa = getTranslateValues(a);
  const bb = getTranslateValues(b);

  let initObj: TranslateValues = {};
  const result: TranslateValues = {};

  if (!aa || !bb) return null;

  const isSameLength = Object.keys(aa).length === Object.keys(bb).length;
  if (isSameLength) {
    initObj = { ...aa, ...bb };
  } else {
    initObj = Object.keys(aa).length > Object.keys(bb).length ? aa : bb;
  }

  let key: "x" | "y" | "z";

  for (key in initObj) {
    if (key in aa && key in bb) {
      const aValue = aa[key] as string;
      const bValue = bb[key] as string;
      result[key] = addCSSUnits(aValue, bValue);
    } else {
      result[key] = initObj[key];
    }
  }

  return prepare(result) as T;
}
