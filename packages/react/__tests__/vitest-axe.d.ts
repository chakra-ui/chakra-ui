import "vitest"
import type { AxeResults } from "vitest-axe"

declare module "vitest" {
  export interface Assertion {
    toHaveNoViolations(): void
  }
  export interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void
  }
}
