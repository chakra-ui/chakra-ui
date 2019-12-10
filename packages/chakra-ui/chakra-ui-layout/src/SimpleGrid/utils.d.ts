import { SystemProps } from "../Box";
import { ResponsiveValue } from "styled-system";
export declare function widthToColumns(width: SystemProps["width"]): SystemProps["gridTemplateColumns"] | null;
export declare function countToColumns(count: ResponsiveValue<number> | undefined): SystemProps["gridTemplateColumns"] | null;
