import { chakra } from "../../styled-system"

export const Group = chakra("div", {
  base: {
    display: "inline-flex",
    gap: "0.5rem",
    isolation: "isolate",
    position: "relative",
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
    attached: {
      true: {
        gap: "0!",
      },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      attached: true,
      css: {
        "& > *:first-of-type:not(:last-of-type)": {
          borderEndRadius: "0!",
          marginEnd: "-1px",
        },
        "& > *:not(:first-of-type):not(:last-of-type)": {
          borderRadius: "0!",
          marginEnd: "-1px",
        },
        "& > *:not(:first-of-type):last-of-type": {
          borderStartRadius: "0!",
        },
      },
    },
    {
      orientation: "vertical",
      attached: true,
      css: {
        "& > *:first-of-type:not(:last-of-type)": {
          borderBottomRadius: "0!",
          marginBottom: "-1px",
        },
        "& > *:not(:first-of-type):not(:last-of-type)": {
          borderRadius: "0!",
          marginBottom: "-1px",
        },
        "& > *:not(:first-of-type):last-of-type": {
          borderTopRadius: "0!",
        },
      },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
  },
})
