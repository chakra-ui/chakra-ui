import * as React from "react";
import { ITheme } from "../theme";

declare const ThemeProvider: React.FC<{ theme?: ITheme }>;
export default ThemeProvider;

export function useTheme(): ITheme;
