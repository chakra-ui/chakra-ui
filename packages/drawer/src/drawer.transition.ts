import { createSlideConfig } from "@chakra-ui/transition"

export const transitionConfig = (props: any) => ({
  overlay: {
    timeout: 400,
    transition: {
      easing: "ease-in-out",
      duration: "400ms",
      property: "opacity",
    },
    enter: {
      from: { opacity: 0.01 },
      to: { opacity: 1 },
    },
    exit: {
      from: { opacity: 1 },
      to: { opacity: 0.01 },
    },
  },
  content: {
    timeout: 400,
    addAppearStyles: true,
    transition: {
      easing: "ease-in-out",
      property: "transform",
      duration: "400ms",
    },
    ...createSlideConfig(props.placement),
  },
})
