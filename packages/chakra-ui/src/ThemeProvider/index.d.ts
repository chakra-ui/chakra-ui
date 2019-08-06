import * as Emotion from "emotion-theming";
import * as React from "react";
import { ITheme } from "../theme";

declare const ThemeProvider: React.FC<Emotion.ThemeProviderProps<ITheme>>;
export default ThemeProvider;

export function useTheme(): ITheme;
