/* eslint-disable */
import type { SystemStyleObject } from "../types/index"

type Styles = SystemStyleObject | undefined | null | false

interface CssRawFunction {
  (styles: Styles): SystemStyleObject
  (styles: Styles[]): SystemStyleObject
  (...styles: Array<Styles | Styles[]>): SystemStyleObject
  (styles: Styles): SystemStyleObject
}

interface CssFunction {
  (styles: Styles): string
  (styles: Styles[]): string
  (...styles: Array<Styles | Styles[]>): string
  (styles: Styles): string

  raw: CssRawFunction
}

export declare const css: CssFunction
