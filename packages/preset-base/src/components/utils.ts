import { Theme } from "../foundations";

export interface VariantStyleFunction {
  variantColor: string;
  colorMode: "light" | "dark";
  theme: Theme;
  get: (obj: object, path: string, fallbackValue: string) => any;
}
