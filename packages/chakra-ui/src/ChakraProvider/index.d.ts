import * as React from "react";
import { ITheme } from "../theme";
import { IUseColorMode } from "src/ColorModeProvider";

declare const ChakraProvider: React.FC<{
  theme: ITheme;
  children: React.ReactNode;
}>;

export default ChakraProvider;

interface IUseChakra extends IUseColorMode {
  theme: ITheme;
}

export function useChakra(): IUseChakra;
