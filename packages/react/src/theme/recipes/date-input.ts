import { dateInputAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { mapEntries } from "../../utils"
import { inputRecipe } from "./input"

const { variants, defaultVariants } = inputRecipe

export const dateInputSlotRecipe = defineSlotRecipe({
  className: "chakra-date-input",
  slots: dateInputAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
      _disabled: {
        opacity: "0.5",
      },
    },

    label: {
      textStyle: "sm",
      fontWeight: "medium",
    },

    control: {
      ...inputRecipe.base,
      display: "flex",
      alignItems: "center",
      gap: "2",
      cursor: "text",
    },

    segmentGroup: {
      display: "flex",
      alignItems: "center",
    },

    segment: {
      borderRadius: "l1",
      px: "0.5",
      outline: "none",
      _placeholderShown: {
        color: "fg.subtle",
      },
      "&[data-editable]": {
        _hover: {
          bg: "bg.muted",
        },
      },
      _focus: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
      },
      "&[data-type=literal]": {
        px: "0",
        color: "fg.subtle",
      },
    },
  },

  variants: {
    size: mapEntries(variants!.size, (key, value) => [key, { control: value }]),
    variant: mapEntries(variants!.variant, (key, value) => {
      // `control` isn't natively focusable — real DOM focus lands on the
      // child `segment` spans, and zag reflects that back onto `control`
      // only via the `data-focus` attribute (never native `:focus-visible`
      // or `[data-focus-visible]`). Re-key inputRecipe's focus-visible
      // styling, tuned for a real `<input>`, onto plain focus/`data-focus`
      // equivalents: `focusVisibleRing` -> `focusRing`, and the "flushed"
      // variant's `_focusVisible` block -> `_focus`.
      const { focusVisibleRing, _focusVisible, ...rest } = value as Record<
        string,
        any
      >
      return [
        key,
        {
          control: {
            ...rest,
            ...(focusVisibleRing && { focusRing: focusVisibleRing }),
            ...(_focusVisible && { _focus: _focusVisible }),
          },
        },
      ]
    }),
  },

  defaultVariants,
})
