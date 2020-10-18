import { Variant } from "framer-motion"

export type MotionVariants<T extends string> = Record<T, Variant>

export const EASINGS = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
}
