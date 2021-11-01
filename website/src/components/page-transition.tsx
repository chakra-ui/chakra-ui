import * as React from "react"
import { domAnimation, HTMLMotionProps, LazyMotion, m } from "framer-motion"

const PageTransition = (props: HTMLMotionProps<"div">) => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      {...props}
    />
  </LazyMotion>
)

export default PageTransition
