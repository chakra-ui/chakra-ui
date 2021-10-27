import { scaleFadeConfig, slideFadeConfig } from "@chakra-ui/transition"
import { Variants } from "framer-motion"

export const scale: Variants = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: "easeInOut" },
      scale: { duration: 0.2, easings: "easeInOut" },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: "easeOut", duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] },
    },
  },
}

export const transitions = {
  none: {},
  scale: { ...scaleFadeConfig, variants: scale },
  slideInTop: {
    ...slideFadeConfig,
    custom: { offsetX: 0, offsetY: -20 },
  },
  slideInBottom: {
    ...slideFadeConfig,
    custom: { offsetX: 0, offsetY: 20 },
  },
  slideInLeft: {
    ...slideFadeConfig,
    custom: { offsetX: -20, offsetY: 0 },
  },
  slideInRight: {
    ...slideFadeConfig,
    custom: { offsetX: 20, offsetY: 0 },
  },
}
