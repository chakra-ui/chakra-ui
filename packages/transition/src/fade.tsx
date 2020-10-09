import { MotionVariants } from "./__utils"

export const fadeMotionVariants: MotionVariants<"enter" | "exit"> = {
  enter: {
    opacity: 0,
    transition: { duration: 0.15, ease: [0.175, 0.885, 0.32, 1.175] },
  },
  exit: { opacity: 0 },
}
