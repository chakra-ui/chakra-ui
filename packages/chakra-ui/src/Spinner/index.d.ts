import * as React from "react";
import { BoxProps } from "../Box";

export interface ISpinnerProps {
  /**
   * The size of the spinner
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The color of the empty area in the spinner
   */
  emptyColor?: string;
  /**
   * The color of the spinner
   */
  color?: string;
  /**
   * The thickness of the spinner
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string;
  /**
   * The speed of the spinner.
   * @example
   * ```jsx
   * <Spinner speed="0.2s"/>
   * ```
   */
  speed?: string;
  /**
   * For accessibility, it's important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string;
}

export type SpinnerProps = BoxProps & ISpinnerProps;

/**
 * Spinner is used for indicating a loading state of a component or page.
 *
 * RECOMMENDED: Add `aria-busy="true"` to the component that triggered the loading state while the spinner is shown.
 */
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps>;

export default Spinner;
