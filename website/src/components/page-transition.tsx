import * as React from "react"
import { HTMLMotionProps, motion } from "framer-motion"

const PageTransition = (props: HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ y: 48, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: [0.1, 0.9, 0.2, 1] }}
    {...props}
  />
)

export default PageTransition
