declare module "css-get-unit" {
  /**
   * Gets unit from the CSS value without verifying. If there is no unit it will return `null`
   */
  export default function unit(val: string): string | null
}
