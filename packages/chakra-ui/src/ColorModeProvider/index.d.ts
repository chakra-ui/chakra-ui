import * as React from "react";

interface IColorModeProvider {
  value?: "light" | "dark";
  children: React.ReactNode;
}

declare const ColorModeProvider: React.FC<IColorModeProvider>;

export default ColorModeProvider;

interface IUseColorMode {
  readonly mode?: "light" | "dark";
  toggle?: () => void;
}
export function useColorMode(): IUseColorMode;

export const DarkMode: React.FC<IColorModeProvider>;
export const LightMode: React.FC<IColorModeProvider>;
