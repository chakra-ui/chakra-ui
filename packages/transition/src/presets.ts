import { Variant } from "framer-motion"

export type MotionVariants<T extends string> = { [K in T]?: Variant }

export const fade: MotionVariants<"enter" | "exit"> = {
  enter: {
    opacity: 0,
    transition: { duration: 0.15, ease: [0.175, 0.885, 0.32, 1.175] },
  },
  exit: { opacity: 0 },
}

export const collapse: MotionVariants<"open" | "collapsed"> = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.15 },
  },
}
