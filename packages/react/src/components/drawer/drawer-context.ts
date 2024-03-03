import { createContext } from "@chakra-ui/utils"
import { SlideOptions } from "../.."

export type LogicalPlacement = "start" | "end"

export type DrawerPlacement = SlideOptions["direction"] | LogicalPlacement

export type LogicalPlacementMap = Record<
  LogicalPlacement,
  Record<"rtl" | "ltr", SlideOptions["direction"]>
>

export interface DrawerOptions {
  /**
   * The placement of the drawer
   * @default "right"
   */
  placement?: DrawerPlacement
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean
}

export const [DrawerContextProvider, useDrawerContext] =
  createContext<DrawerOptions>()
