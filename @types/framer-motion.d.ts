import * as React from "react"

declare module "framer-motion" {
  export interface AnimatePresenceProps {
    children?: React.ReactNode
  }
}
