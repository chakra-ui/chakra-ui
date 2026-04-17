const tokens = {
  "aspectRatios.square": {
    "value": "1 / 1",
    "variable": "var(--aspect-ratios-square)"
  },
  "aspectRatios.landscape": {
    "value": "4 / 3",
    "variable": "var(--aspect-ratios-landscape)"
  },
  "aspectRatios.portrait": {
    "value": "3 / 4",
    "variable": "var(--aspect-ratios-portrait)"
  },
  "aspectRatios.wide": {
    "value": "16 / 9",
    "variable": "var(--aspect-ratios-wide)"
  },
  "aspectRatios.ultrawide": {
    "value": "18 / 5",
    "variable": "var(--aspect-ratios-ultrawide)"
  },
  "aspectRatios.golden": {
    "value": "1.618 / 1",
    "variable": "var(--aspect-ratios-golden)"
  },
  "animations.spin": {
    "value": "spin 1s linear infinite",
    "variable": "var(--animations-spin)"
  },
  "animations.ping": {
    "value": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    "variable": "var(--animations-ping)"
  },
  "animations.pulse": {
    "value": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "variable": "var(--animations-pulse)"
  },
  "animations.bounce": {
    "value": "bounce 1s infinite",
    "variable": "var(--animations-bounce)"
  },
  "blurs.none": {
    "value": " ",
    "variable": "var(--blurs-none)"
  },
  "blurs.sm": {
    "value": "4px",
    "variable": "var(--blurs-sm)"
  },
  "blurs.md": {
    "value": "8px",
    "variable": "var(--blurs-md)"
  },
  "blurs.lg": {
    "value": "12px",
    "variable": "var(--blurs-lg)"
  },
  "blurs.xl": {
    "value": "16px",
    "variable": "var(--blurs-xl)"
  },
  "blurs.2xl": {
    "value": "24px",
    "variable": "var(--blurs-2xl)"
  },
  "blurs.3xl": {
    "value": "40px",
    "variable": "var(--blurs-3xl)"
  },
  "blurs.4xl": {
    "value": "64px",
    "variable": "var(--blurs-4xl)"
  },
  "borders.xs": {
    "value": "0.5px solid",
    "variable": "var(--borders-xs)"
  },
  "borders.sm": {
    "value": "1px solid",
    "variable": "var(--borders-sm)"
  },
  "borders.md": {
    "value": "2px solid",
    "variable": "var(--borders-md)"
  },
  "borders.lg": {
    "value": "4px solid",
    "variable": "var(--borders-lg)"
  },
  "borders.xl": {
    "value": "8px solid",
    "variable": "var(--borders-xl)"
  },
  "colors.transparent": {
    "value": "transparent",
    "variable": "var(--colors-transparent)"
  },
  "colors.current": {
    "value": "currentColor",
    "variable": "var(--colors-current)"
  },
  "colors.black": {
    "value": "#09090B",
    "variable": "var(--colors-black)"
  },
  "colors.white": {
    "value": "#FFFFFF",
    "variable": "var(--colors-white)"
  },
  "colors.whiteAlpha.50": {
    "value": "rgba(255, 255, 255, 0.04)",
    "variable": "var(--colors-white-alpha-50)"
  },
  "colors.whiteAlpha.100": {
    "value": "rgba(255, 255, 255, 0.06)",
    "variable": "var(--colors-white-alpha-100)"
  },
  "colors.whiteAlpha.200": {
    "value": "rgba(255, 255, 255, 0.08)",
    "variable": "var(--colors-white-alpha-200)"
  },
  "colors.whiteAlpha.300": {
    "value": "rgba(255, 255, 255, 0.16)",
    "variable": "var(--colors-white-alpha-300)"
  },
  "colors.whiteAlpha.400": {
    "value": "rgba(255, 255, 255, 0.24)",
    "variable": "var(--colors-white-alpha-400)"
  },
  "colors.whiteAlpha.500": {
    "value": "rgba(255, 255, 255, 0.36)",
    "variable": "var(--colors-white-alpha-500)"
  },
  "colors.whiteAlpha.600": {
    "value": "rgba(255, 255, 255, 0.48)",
    "variable": "var(--colors-white-alpha-600)"
  },
  "colors.whiteAlpha.700": {
    "value": "rgba(255, 255, 255, 0.64)",
    "variable": "var(--colors-white-alpha-700)"
  },
  "colors.whiteAlpha.800": {
    "value": "rgba(255, 255, 255, 0.80)",
    "variable": "var(--colors-white-alpha-800)"
  },
  "colors.whiteAlpha.900": {
    "value": "rgba(255, 255, 255, 0.92)",
    "variable": "var(--colors-white-alpha-900)"
  },
  "colors.whiteAlpha.950": {
    "value": "rgba(255, 255, 255, 0.95)",
    "variable": "var(--colors-white-alpha-950)"
  },
  "colors.blackAlpha.50": {
    "value": "rgba(0, 0, 0, 0.04)",
    "variable": "var(--colors-black-alpha-50)"
  },
  "colors.blackAlpha.100": {
    "value": "rgba(0, 0, 0, 0.06)",
    "variable": "var(--colors-black-alpha-100)"
  },
  "colors.blackAlpha.200": {
    "value": "rgba(0, 0, 0, 0.08)",
    "variable": "var(--colors-black-alpha-200)"
  },
  "colors.blackAlpha.300": {
    "value": "rgba(0, 0, 0, 0.16)",
    "variable": "var(--colors-black-alpha-300)"
  },
  "colors.blackAlpha.400": {
    "value": "rgba(0, 0, 0, 0.24)",
    "variable": "var(--colors-black-alpha-400)"
  },
  "colors.blackAlpha.500": {
    "value": "rgba(0, 0, 0, 0.36)",
    "variable": "var(--colors-black-alpha-500)"
  },
  "colors.blackAlpha.600": {
    "value": "rgba(0, 0, 0, 0.48)",
    "variable": "var(--colors-black-alpha-600)"
  },
  "colors.blackAlpha.700": {
    "value": "rgba(0, 0, 0, 0.64)",
    "variable": "var(--colors-black-alpha-700)"
  },
  "colors.blackAlpha.800": {
    "value": "rgba(0, 0, 0, 0.80)",
    "variable": "var(--colors-black-alpha-800)"
  },
  "colors.blackAlpha.900": {
    "value": "rgba(0, 0, 0, 0.92)",
    "variable": "var(--colors-black-alpha-900)"
  },
  "colors.blackAlpha.950": {
    "value": "rgba(0, 0, 0, 0.95)",
    "variable": "var(--colors-black-alpha-950)"
  },
  "colors.gray.50": {
    "value": "#fafafa",
    "variable": "var(--colors-gray-50)"
  },
  "colors.gray.100": {
    "value": "#f4f4f5",
    "variable": "var(--colors-gray-100)"
  },
  "colors.gray.200": {
    "value": "#e4e4e7",
    "variable": "var(--colors-gray-200)"
  },
  "colors.gray.300": {
    "value": "#d4d4d8",
    "variable": "var(--colors-gray-300)"
  },
  "colors.gray.400": {
    "value": "#a1a1aa",
    "variable": "var(--colors-gray-400)"
  },
  "colors.gray.500": {
    "value": "#71717a",
    "variable": "var(--colors-gray-500)"
  },
  "colors.gray.600": {
    "value": "#52525b",
    "variable": "var(--colors-gray-600)"
  },
  "colors.gray.700": {
    "value": "#3f3f46",
    "variable": "var(--colors-gray-700)"
  },
  "colors.gray.800": {
    "value": "#27272a",
    "variable": "var(--colors-gray-800)"
  },
  "colors.gray.900": {
    "value": "#18181b",
    "variable": "var(--colors-gray-900)"
  },
  "colors.gray.950": {
    "value": "#111111",
    "variable": "var(--colors-gray-950)"
  },
  "colors.red.50": {
    "value": "#fef2f2",
    "variable": "var(--colors-red-50)"
  },
  "colors.red.100": {
    "value": "#fee2e2",
    "variable": "var(--colors-red-100)"
  },
  "colors.red.200": {
    "value": "#fecaca",
    "variable": "var(--colors-red-200)"
  },
  "colors.red.300": {
    "value": "#fca5a5",
    "variable": "var(--colors-red-300)"
  },
  "colors.red.400": {
    "value": "#f87171",
    "variable": "var(--colors-red-400)"
  },
  "colors.red.500": {
    "value": "#ef4444",
    "variable": "var(--colors-red-500)"
  },
  "colors.red.600": {
    "value": "#dc2626",
    "variable": "var(--colors-red-600)"
  },
  "colors.red.700": {
    "value": "#991919",
    "variable": "var(--colors-red-700)"
  },
  "colors.red.800": {
    "value": "#511111",
    "variable": "var(--colors-red-800)"
  },
  "colors.red.900": {
    "value": "#300c0c",
    "variable": "var(--colors-red-900)"
  },
  "colors.red.950": {
    "value": "#1f0808",
    "variable": "var(--colors-red-950)"
  },
  "colors.orange.50": {
    "value": "#fff7ed",
    "variable": "var(--colors-orange-50)"
  },
  "colors.orange.100": {
    "value": "#ffedd5",
    "variable": "var(--colors-orange-100)"
  },
  "colors.orange.200": {
    "value": "#fed7aa",
    "variable": "var(--colors-orange-200)"
  },
  "colors.orange.300": {
    "value": "#fdba74",
    "variable": "var(--colors-orange-300)"
  },
  "colors.orange.400": {
    "value": "#fb923c",
    "variable": "var(--colors-orange-400)"
  },
  "colors.orange.500": {
    "value": "#f97316",
    "variable": "var(--colors-orange-500)"
  },
  "colors.orange.600": {
    "value": "#ea580c",
    "variable": "var(--colors-orange-600)"
  },
  "colors.orange.700": {
    "value": "#92310a",
    "variable": "var(--colors-orange-700)"
  },
  "colors.orange.800": {
    "value": "#6c2710",
    "variable": "var(--colors-orange-800)"
  },
  "colors.orange.900": {
    "value": "#3b1106",
    "variable": "var(--colors-orange-900)"
  },
  "colors.orange.950": {
    "value": "#220a04",
    "variable": "var(--colors-orange-950)"
  },
  "colors.yellow.50": {
    "value": "#fefce8",
    "variable": "var(--colors-yellow-50)"
  },
  "colors.yellow.100": {
    "value": "#fef9c3",
    "variable": "var(--colors-yellow-100)"
  },
  "colors.yellow.200": {
    "value": "#fef08a",
    "variable": "var(--colors-yellow-200)"
  },
  "colors.yellow.300": {
    "value": "#fde047",
    "variable": "var(--colors-yellow-300)"
  },
  "colors.yellow.400": {
    "value": "#facc15",
    "variable": "var(--colors-yellow-400)"
  },
  "colors.yellow.500": {
    "value": "#eab308",
    "variable": "var(--colors-yellow-500)"
  },
  "colors.yellow.600": {
    "value": "#ca8a04",
    "variable": "var(--colors-yellow-600)"
  },
  "colors.yellow.700": {
    "value": "#845209",
    "variable": "var(--colors-yellow-700)"
  },
  "colors.yellow.800": {
    "value": "#713f12",
    "variable": "var(--colors-yellow-800)"
  },
  "colors.yellow.900": {
    "value": "#422006",
    "variable": "var(--colors-yellow-900)"
  },
  "colors.yellow.950": {
    "value": "#281304",
    "variable": "var(--colors-yellow-950)"
  },
  "colors.green.50": {
    "value": "#f0fdf4",
    "variable": "var(--colors-green-50)"
  },
  "colors.green.100": {
    "value": "#dcfce7",
    "variable": "var(--colors-green-100)"
  },
  "colors.green.200": {
    "value": "#bbf7d0",
    "variable": "var(--colors-green-200)"
  },
  "colors.green.300": {
    "value": "#86efac",
    "variable": "var(--colors-green-300)"
  },
  "colors.green.400": {
    "value": "#4ade80",
    "variable": "var(--colors-green-400)"
  },
  "colors.green.500": {
    "value": "#22c55e",
    "variable": "var(--colors-green-500)"
  },
  "colors.green.600": {
    "value": "#16a34a",
    "variable": "var(--colors-green-600)"
  },
  "colors.green.700": {
    "value": "#116932",
    "variable": "var(--colors-green-700)"
  },
  "colors.green.800": {
    "value": "#124a28",
    "variable": "var(--colors-green-800)"
  },
  "colors.green.900": {
    "value": "#042713",
    "variable": "var(--colors-green-900)"
  },
  "colors.green.950": {
    "value": "#03190c",
    "variable": "var(--colors-green-950)"
  },
  "colors.teal.50": {
    "value": "#f0fdfa",
    "variable": "var(--colors-teal-50)"
  },
  "colors.teal.100": {
    "value": "#ccfbf1",
    "variable": "var(--colors-teal-100)"
  },
  "colors.teal.200": {
    "value": "#99f6e4",
    "variable": "var(--colors-teal-200)"
  },
  "colors.teal.300": {
    "value": "#5eead4",
    "variable": "var(--colors-teal-300)"
  },
  "colors.teal.400": {
    "value": "#2dd4bf",
    "variable": "var(--colors-teal-400)"
  },
  "colors.teal.500": {
    "value": "#14b8a6",
    "variable": "var(--colors-teal-500)"
  },
  "colors.teal.600": {
    "value": "#0d9488",
    "variable": "var(--colors-teal-600)"
  },
  "colors.teal.700": {
    "value": "#0c5d56",
    "variable": "var(--colors-teal-700)"
  },
  "colors.teal.800": {
    "value": "#114240",
    "variable": "var(--colors-teal-800)"
  },
  "colors.teal.900": {
    "value": "#032726",
    "variable": "var(--colors-teal-900)"
  },
  "colors.teal.950": {
    "value": "#021716",
    "variable": "var(--colors-teal-950)"
  },
  "colors.blue.50": {
    "value": "#eff6ff",
    "variable": "var(--colors-blue-50)"
  },
  "colors.blue.100": {
    "value": "#dbeafe",
    "variable": "var(--colors-blue-100)"
  },
  "colors.blue.200": {
    "value": "#bfdbfe",
    "variable": "var(--colors-blue-200)"
  },
  "colors.blue.300": {
    "value": "#a3cfff",
    "variable": "var(--colors-blue-300)"
  },
  "colors.blue.400": {
    "value": "#60a5fa",
    "variable": "var(--colors-blue-400)"
  },
  "colors.blue.500": {
    "value": "#3b82f6",
    "variable": "var(--colors-blue-500)"
  },
  "colors.blue.600": {
    "value": "#2563eb",
    "variable": "var(--colors-blue-600)"
  },
  "colors.blue.700": {
    "value": "#173da6",
    "variable": "var(--colors-blue-700)"
  },
  "colors.blue.800": {
    "value": "#1a3478",
    "variable": "var(--colors-blue-800)"
  },
  "colors.blue.900": {
    "value": "#14204a",
    "variable": "var(--colors-blue-900)"
  },
  "colors.blue.950": {
    "value": "#0c142e",
    "variable": "var(--colors-blue-950)"
  },
  "colors.cyan.50": {
    "value": "#ecfeff",
    "variable": "var(--colors-cyan-50)"
  },
  "colors.cyan.100": {
    "value": "#cffafe",
    "variable": "var(--colors-cyan-100)"
  },
  "colors.cyan.200": {
    "value": "#a5f3fc",
    "variable": "var(--colors-cyan-200)"
  },
  "colors.cyan.300": {
    "value": "#67e8f9",
    "variable": "var(--colors-cyan-300)"
  },
  "colors.cyan.400": {
    "value": "#22d3ee",
    "variable": "var(--colors-cyan-400)"
  },
  "colors.cyan.500": {
    "value": "#06b6d4",
    "variable": "var(--colors-cyan-500)"
  },
  "colors.cyan.600": {
    "value": "#0891b2",
    "variable": "var(--colors-cyan-600)"
  },
  "colors.cyan.700": {
    "value": "#0c5c72",
    "variable": "var(--colors-cyan-700)"
  },
  "colors.cyan.800": {
    "value": "#134152",
    "variable": "var(--colors-cyan-800)"
  },
  "colors.cyan.900": {
    "value": "#072a38",
    "variable": "var(--colors-cyan-900)"
  },
  "colors.cyan.950": {
    "value": "#051b24",
    "variable": "var(--colors-cyan-950)"
  },
  "colors.purple.50": {
    "value": "#faf5ff",
    "variable": "var(--colors-purple-50)"
  },
  "colors.purple.100": {
    "value": "#f3e8ff",
    "variable": "var(--colors-purple-100)"
  },
  "colors.purple.200": {
    "value": "#e9d5ff",
    "variable": "var(--colors-purple-200)"
  },
  "colors.purple.300": {
    "value": "#d8b4fe",
    "variable": "var(--colors-purple-300)"
  },
  "colors.purple.400": {
    "value": "#c084fc",
    "variable": "var(--colors-purple-400)"
  },
  "colors.purple.500": {
    "value": "#a855f7",
    "variable": "var(--colors-purple-500)"
  },
  "colors.purple.600": {
    "value": "#9333ea",
    "variable": "var(--colors-purple-600)"
  },
  "colors.purple.700": {
    "value": "#641ba3",
    "variable": "var(--colors-purple-700)"
  },
  "colors.purple.800": {
    "value": "#4a1772",
    "variable": "var(--colors-purple-800)"
  },
  "colors.purple.900": {
    "value": "#2f0553",
    "variable": "var(--colors-purple-900)"
  },
  "colors.purple.950": {
    "value": "#1a032e",
    "variable": "var(--colors-purple-950)"
  },
  "colors.pink.50": {
    "value": "#fdf2f8",
    "variable": "var(--colors-pink-50)"
  },
  "colors.pink.100": {
    "value": "#fce7f3",
    "variable": "var(--colors-pink-100)"
  },
  "colors.pink.200": {
    "value": "#fbcfe8",
    "variable": "var(--colors-pink-200)"
  },
  "colors.pink.300": {
    "value": "#f9a8d4",
    "variable": "var(--colors-pink-300)"
  },
  "colors.pink.400": {
    "value": "#f472b6",
    "variable": "var(--colors-pink-400)"
  },
  "colors.pink.500": {
    "value": "#ec4899",
    "variable": "var(--colors-pink-500)"
  },
  "colors.pink.600": {
    "value": "#db2777",
    "variable": "var(--colors-pink-600)"
  },
  "colors.pink.700": {
    "value": "#a41752",
    "variable": "var(--colors-pink-700)"
  },
  "colors.pink.800": {
    "value": "#6d0e34",
    "variable": "var(--colors-pink-800)"
  },
  "colors.pink.900": {
    "value": "#45061f",
    "variable": "var(--colors-pink-900)"
  },
  "colors.pink.950": {
    "value": "#2c0514",
    "variable": "var(--colors-pink-950)"
  },
  "durations.fastest": {
    "value": "50ms",
    "variable": "var(--durations-fastest)"
  },
  "durations.faster": {
    "value": "100ms",
    "variable": "var(--durations-faster)"
  },
  "durations.fast": {
    "value": "150ms",
    "variable": "var(--durations-fast)"
  },
  "durations.moderate": {
    "value": "200ms",
    "variable": "var(--durations-moderate)"
  },
  "durations.slow": {
    "value": "300ms",
    "variable": "var(--durations-slow)"
  },
  "durations.slower": {
    "value": "400ms",
    "variable": "var(--durations-slower)"
  },
  "durations.slowest": {
    "value": "500ms",
    "variable": "var(--durations-slowest)"
  },
  "easings.ease-in": {
    "value": "cubic-bezier(0.42, 0, 1, 1)",
    "variable": "var(--easings-ease-in)"
  },
  "easings.ease-out": {
    "value": "cubic-bezier(0, 0, 0.58, 1)",
    "variable": "var(--easings-ease-out)"
  },
  "easings.ease-in-out": {
    "value": "cubic-bezier(0.42, 0, 0.58, 1)",
    "variable": "var(--easings-ease-in-out)"
  },
  "easings.ease-in-smooth": {
    "value": "cubic-bezier(0.32, 0.72, 0, 1)",
    "variable": "var(--easings-ease-in-smooth)"
  },
  "fonts.heading": {
    "value": "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "variable": "var(--fonts-heading)"
  },
  "fonts.body": {
    "value": "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "variable": "var(--fonts-body)"
  },
  "fonts.mono": {
    "value": "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace",
    "variable": "var(--fonts-mono)"
  },
  "fontSizes.2xs": {
    "value": "0.625rem",
    "variable": "var(--font-sizes-2xs)"
  },
  "fontSizes.xs": {
    "value": "0.75rem",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "0.875rem",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "1rem",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "1.125rem",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "1.25rem",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "1.5rem",
    "variable": "var(--font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "1.875rem",
    "variable": "var(--font-sizes-3xl)"
  },
  "fontSizes.4xl": {
    "value": "2.25rem",
    "variable": "var(--font-sizes-4xl)"
  },
  "fontSizes.5xl": {
    "value": "3rem",
    "variable": "var(--font-sizes-5xl)"
  },
  "fontSizes.6xl": {
    "value": "3.75rem",
    "variable": "var(--font-sizes-6xl)"
  },
  "fontSizes.7xl": {
    "value": "4.5rem",
    "variable": "var(--font-sizes-7xl)"
  },
  "fontSizes.8xl": {
    "value": "6rem",
    "variable": "var(--font-sizes-8xl)"
  },
  "fontSizes.9xl": {
    "value": "8rem",
    "variable": "var(--font-sizes-9xl)"
  },
  "fontWeights.thin": {
    "value": "100",
    "variable": "var(--font-weights-thin)"
  },
  "fontWeights.extralight": {
    "value": "200",
    "variable": "var(--font-weights-extralight)"
  },
  "fontWeights.light": {
    "value": "300",
    "variable": "var(--font-weights-light)"
  },
  "fontWeights.normal": {
    "value": "400",
    "variable": "var(--font-weights-normal)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--font-weights-bold)"
  },
  "fontWeights.extrabold": {
    "value": "800",
    "variable": "var(--font-weights-extrabold)"
  },
  "fontWeights.black": {
    "value": "900",
    "variable": "var(--font-weights-black)"
  },
  "letterSpacings.tighter": {
    "value": "-0.05em",
    "variable": "var(--letter-spacings-tighter)"
  },
  "letterSpacings.tight": {
    "value": "-0.025em",
    "variable": "var(--letter-spacings-tight)"
  },
  "letterSpacings.wide": {
    "value": "0.025em",
    "variable": "var(--letter-spacings-wide)"
  },
  "letterSpacings.wider": {
    "value": "0.05em",
    "variable": "var(--letter-spacings-wider)"
  },
  "letterSpacings.widest": {
    "value": "0.1em",
    "variable": "var(--letter-spacings-widest)"
  },
  "lineHeights.shorter": {
    "value": 1.25,
    "variable": "var(--line-heights-shorter)"
  },
  "lineHeights.short": {
    "value": 1.375,
    "variable": "var(--line-heights-short)"
  },
  "lineHeights.moderate": {
    "value": 1.5,
    "variable": "var(--line-heights-moderate)"
  },
  "lineHeights.tall": {
    "value": 1.625,
    "variable": "var(--line-heights-tall)"
  },
  "lineHeights.taller": {
    "value": 2,
    "variable": "var(--line-heights-taller)"
  },
  "radii.none": {
    "value": "0",
    "variable": "var(--radii-none)"
  },
  "radii.2xs": {
    "value": "0.0625rem",
    "variable": "var(--radii-2xs)"
  },
  "radii.xs": {
    "value": "0.125rem",
    "variable": "var(--radii-xs)"
  },
  "radii.sm": {
    "value": "0.25rem",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "0.375rem",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "0.5rem",
    "variable": "var(--radii-lg)"
  },
  "radii.xl": {
    "value": "0.75rem",
    "variable": "var(--radii-xl)"
  },
  "radii.2xl": {
    "value": "1rem",
    "variable": "var(--radii-2xl)"
  },
  "radii.3xl": {
    "value": "1.5rem",
    "variable": "var(--radii-3xl)"
  },
  "radii.4xl": {
    "value": "2rem",
    "variable": "var(--radii-4xl)"
  },
  "radii.full": {
    "value": "9999px",
    "variable": "var(--radii-full)"
  },
  "spacing.1": {
    "value": "0.25rem",
    "variable": "var(--spacing-1)"
  },
  "spacing.2": {
    "value": "0.5rem",
    "variable": "var(--spacing-2)"
  },
  "spacing.3": {
    "value": "0.75rem",
    "variable": "var(--spacing-3)"
  },
  "spacing.4": {
    "value": "1rem",
    "variable": "var(--spacing-4)"
  },
  "spacing.5": {
    "value": "1.25rem",
    "variable": "var(--spacing-5)"
  },
  "spacing.6": {
    "value": "1.5rem",
    "variable": "var(--spacing-6)"
  },
  "spacing.7": {
    "value": "1.75rem",
    "variable": "var(--spacing-7)"
  },
  "spacing.8": {
    "value": "2rem",
    "variable": "var(--spacing-8)"
  },
  "spacing.9": {
    "value": "2.25rem",
    "variable": "var(--spacing-9)"
  },
  "spacing.10": {
    "value": "2.5rem",
    "variable": "var(--spacing-10)"
  },
  "spacing.11": {
    "value": "2.75rem",
    "variable": "var(--spacing-11)"
  },
  "spacing.12": {
    "value": "3rem",
    "variable": "var(--spacing-12)"
  },
  "spacing.14": {
    "value": "3.5rem",
    "variable": "var(--spacing-14)"
  },
  "spacing.16": {
    "value": "4rem",
    "variable": "var(--spacing-16)"
  },
  "spacing.20": {
    "value": "5rem",
    "variable": "var(--spacing-20)"
  },
  "spacing.24": {
    "value": "6rem",
    "variable": "var(--spacing-24)"
  },
  "spacing.28": {
    "value": "7rem",
    "variable": "var(--spacing-28)"
  },
  "spacing.32": {
    "value": "8rem",
    "variable": "var(--spacing-32)"
  },
  "spacing.36": {
    "value": "9rem",
    "variable": "var(--spacing-36)"
  },
  "spacing.40": {
    "value": "10rem",
    "variable": "var(--spacing-40)"
  },
  "spacing.44": {
    "value": "11rem",
    "variable": "var(--spacing-44)"
  },
  "spacing.48": {
    "value": "12rem",
    "variable": "var(--spacing-48)"
  },
  "spacing.52": {
    "value": "13rem",
    "variable": "var(--spacing-52)"
  },
  "spacing.56": {
    "value": "14rem",
    "variable": "var(--spacing-56)"
  },
  "spacing.60": {
    "value": "15rem",
    "variable": "var(--spacing-60)"
  },
  "spacing.64": {
    "value": "16rem",
    "variable": "var(--spacing-64)"
  },
  "spacing.72": {
    "value": "18rem",
    "variable": "var(--spacing-72)"
  },
  "spacing.80": {
    "value": "20rem",
    "variable": "var(--spacing-80)"
  },
  "spacing.96": {
    "value": "24rem",
    "variable": "var(--spacing-96)"
  },
  "spacing.0.5": {
    "value": "0.125rem",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.1.5": {
    "value": "0.375rem",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.2.5": {
    "value": "0.625rem",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.3.5": {
    "value": "0.875rem",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.4.5": {
    "value": "1.125rem",
    "variable": "var(--spacing-4\\.5)"
  },
  "sizes.1": {
    "value": "0.25rem",
    "variable": "var(--sizes-1)"
  },
  "sizes.2": {
    "value": "0.5rem",
    "variable": "var(--sizes-2)"
  },
  "sizes.3": {
    "value": "0.75rem",
    "variable": "var(--sizes-3)"
  },
  "sizes.4": {
    "value": "1rem",
    "variable": "var(--sizes-4)"
  },
  "sizes.5": {
    "value": "1.25rem",
    "variable": "var(--sizes-5)"
  },
  "sizes.6": {
    "value": "1.5rem",
    "variable": "var(--sizes-6)"
  },
  "sizes.7": {
    "value": "1.75rem",
    "variable": "var(--sizes-7)"
  },
  "sizes.8": {
    "value": "2rem",
    "variable": "var(--sizes-8)"
  },
  "sizes.9": {
    "value": "2.25rem",
    "variable": "var(--sizes-9)"
  },
  "sizes.10": {
    "value": "2.5rem",
    "variable": "var(--sizes-10)"
  },
  "sizes.11": {
    "value": "2.75rem",
    "variable": "var(--sizes-11)"
  },
  "sizes.12": {
    "value": "3rem",
    "variable": "var(--sizes-12)"
  },
  "sizes.14": {
    "value": "3.5rem",
    "variable": "var(--sizes-14)"
  },
  "sizes.16": {
    "value": "4rem",
    "variable": "var(--sizes-16)"
  },
  "sizes.20": {
    "value": "5rem",
    "variable": "var(--sizes-20)"
  },
  "sizes.24": {
    "value": "6rem",
    "variable": "var(--sizes-24)"
  },
  "sizes.28": {
    "value": "7rem",
    "variable": "var(--sizes-28)"
  },
  "sizes.32": {
    "value": "8rem",
    "variable": "var(--sizes-32)"
  },
  "sizes.36": {
    "value": "9rem",
    "variable": "var(--sizes-36)"
  },
  "sizes.40": {
    "value": "10rem",
    "variable": "var(--sizes-40)"
  },
  "sizes.44": {
    "value": "11rem",
    "variable": "var(--sizes-44)"
  },
  "sizes.48": {
    "value": "12rem",
    "variable": "var(--sizes-48)"
  },
  "sizes.52": {
    "value": "13rem",
    "variable": "var(--sizes-52)"
  },
  "sizes.56": {
    "value": "14rem",
    "variable": "var(--sizes-56)"
  },
  "sizes.60": {
    "value": "15rem",
    "variable": "var(--sizes-60)"
  },
  "sizes.64": {
    "value": "16rem",
    "variable": "var(--sizes-64)"
  },
  "sizes.72": {
    "value": "18rem",
    "variable": "var(--sizes-72)"
  },
  "sizes.80": {
    "value": "20rem",
    "variable": "var(--sizes-80)"
  },
  "sizes.96": {
    "value": "24rem",
    "variable": "var(--sizes-96)"
  },
  "sizes.3xs": {
    "value": "14rem",
    "variable": "var(--sizes-3xs)"
  },
  "sizes.2xs": {
    "value": "16rem",
    "variable": "var(--sizes-2xs)"
  },
  "sizes.xs": {
    "value": "20rem",
    "variable": "var(--sizes-xs)"
  },
  "sizes.sm": {
    "value": "24rem",
    "variable": "var(--sizes-sm)"
  },
  "sizes.md": {
    "value": "28rem",
    "variable": "var(--sizes-md)"
  },
  "sizes.lg": {
    "value": "32rem",
    "variable": "var(--sizes-lg)"
  },
  "sizes.xl": {
    "value": "36rem",
    "variable": "var(--sizes-xl)"
  },
  "sizes.2xl": {
    "value": "42rem",
    "variable": "var(--sizes-2xl)"
  },
  "sizes.3xl": {
    "value": "48rem",
    "variable": "var(--sizes-3xl)"
  },
  "sizes.4xl": {
    "value": "56rem",
    "variable": "var(--sizes-4xl)"
  },
  "sizes.5xl": {
    "value": "64rem",
    "variable": "var(--sizes-5xl)"
  },
  "sizes.6xl": {
    "value": "72rem",
    "variable": "var(--sizes-6xl)"
  },
  "sizes.7xl": {
    "value": "80rem",
    "variable": "var(--sizes-7xl)"
  },
  "sizes.8xl": {
    "value": "90rem",
    "variable": "var(--sizes-8xl)"
  },
  "sizes.0.5": {
    "value": "0.125rem",
    "variable": "var(--sizes-0\\.5)"
  },
  "sizes.1.5": {
    "value": "0.375rem",
    "variable": "var(--sizes-1\\.5)"
  },
  "sizes.2.5": {
    "value": "0.625rem",
    "variable": "var(--sizes-2\\.5)"
  },
  "sizes.3.5": {
    "value": "0.875rem",
    "variable": "var(--sizes-3\\.5)"
  },
  "sizes.4.5": {
    "value": "1.125rem",
    "variable": "var(--sizes-4\\.5)"
  },
  "sizes.1/2": {
    "value": "50%",
    "variable": "var(--sizes-1\\/2)"
  },
  "sizes.1/3": {
    "value": "33.333333%",
    "variable": "var(--sizes-1\\/3)"
  },
  "sizes.2/3": {
    "value": "66.666667%",
    "variable": "var(--sizes-2\\/3)"
  },
  "sizes.1/4": {
    "value": "25%",
    "variable": "var(--sizes-1\\/4)"
  },
  "sizes.3/4": {
    "value": "75%",
    "variable": "var(--sizes-3\\/4)"
  },
  "sizes.1/5": {
    "value": "20%",
    "variable": "var(--sizes-1\\/5)"
  },
  "sizes.2/5": {
    "value": "40%",
    "variable": "var(--sizes-2\\/5)"
  },
  "sizes.3/5": {
    "value": "60%",
    "variable": "var(--sizes-3\\/5)"
  },
  "sizes.4/5": {
    "value": "80%",
    "variable": "var(--sizes-4\\/5)"
  },
  "sizes.1/6": {
    "value": "16.666667%",
    "variable": "var(--sizes-1\\/6)"
  },
  "sizes.2/6": {
    "value": "33.333333%",
    "variable": "var(--sizes-2\\/6)"
  },
  "sizes.3/6": {
    "value": "50%",
    "variable": "var(--sizes-3\\/6)"
  },
  "sizes.4/6": {
    "value": "66.666667%",
    "variable": "var(--sizes-4\\/6)"
  },
  "sizes.5/6": {
    "value": "83.333333%",
    "variable": "var(--sizes-5\\/6)"
  },
  "sizes.1/12": {
    "value": "8.333333%",
    "variable": "var(--sizes-1\\/12)"
  },
  "sizes.2/12": {
    "value": "16.666667%",
    "variable": "var(--sizes-2\\/12)"
  },
  "sizes.3/12": {
    "value": "25%",
    "variable": "var(--sizes-3\\/12)"
  },
  "sizes.4/12": {
    "value": "33.333333%",
    "variable": "var(--sizes-4\\/12)"
  },
  "sizes.5/12": {
    "value": "41.666667%",
    "variable": "var(--sizes-5\\/12)"
  },
  "sizes.6/12": {
    "value": "50%",
    "variable": "var(--sizes-6\\/12)"
  },
  "sizes.7/12": {
    "value": "58.333333%",
    "variable": "var(--sizes-7\\/12)"
  },
  "sizes.8/12": {
    "value": "66.666667%",
    "variable": "var(--sizes-8\\/12)"
  },
  "sizes.9/12": {
    "value": "75%",
    "variable": "var(--sizes-9\\/12)"
  },
  "sizes.10/12": {
    "value": "83.333333%",
    "variable": "var(--sizes-10\\/12)"
  },
  "sizes.11/12": {
    "value": "91.666667%",
    "variable": "var(--sizes-11\\/12)"
  },
  "sizes.max": {
    "value": "max-content",
    "variable": "var(--sizes-max)"
  },
  "sizes.min": {
    "value": "min-content",
    "variable": "var(--sizes-min)"
  },
  "sizes.fit": {
    "value": "fit-content",
    "variable": "var(--sizes-fit)"
  },
  "sizes.prose": {
    "value": "60ch",
    "variable": "var(--sizes-prose)"
  },
  "sizes.full": {
    "value": "100%",
    "variable": "var(--sizes-full)"
  },
  "sizes.dvh": {
    "value": "100dvh",
    "variable": "var(--sizes-dvh)"
  },
  "sizes.svh": {
    "value": "100svh",
    "variable": "var(--sizes-svh)"
  },
  "sizes.lvh": {
    "value": "100lvh",
    "variable": "var(--sizes-lvh)"
  },
  "sizes.dvw": {
    "value": "100dvw",
    "variable": "var(--sizes-dvw)"
  },
  "sizes.svw": {
    "value": "100svw",
    "variable": "var(--sizes-svw)"
  },
  "sizes.lvw": {
    "value": "100lvw",
    "variable": "var(--sizes-lvw)"
  },
  "sizes.vw": {
    "value": "100vw",
    "variable": "var(--sizes-vw)"
  },
  "sizes.vh": {
    "value": "100vh",
    "variable": "var(--sizes-vh)"
  },
  "sizes.breakpoint-sm": {
    "value": "480px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "zIndex.hide": {
    "value": -1,
    "variable": "var(--z-index-hide)"
  },
  "zIndex.base": {
    "value": 0,
    "variable": "var(--z-index-base)"
  },
  "zIndex.docked": {
    "value": 10,
    "variable": "var(--z-index-docked)"
  },
  "zIndex.dropdown": {
    "value": 1000,
    "variable": "var(--z-index-dropdown)"
  },
  "zIndex.sticky": {
    "value": 1100,
    "variable": "var(--z-index-sticky)"
  },
  "zIndex.banner": {
    "value": 1200,
    "variable": "var(--z-index-banner)"
  },
  "zIndex.overlay": {
    "value": 1300,
    "variable": "var(--z-index-overlay)"
  },
  "zIndex.modal": {
    "value": 1400,
    "variable": "var(--z-index-modal)"
  },
  "zIndex.popover": {
    "value": 1500,
    "variable": "var(--z-index-popover)"
  },
  "zIndex.skipNav": {
    "value": 1600,
    "variable": "var(--z-index-skip-nav)"
  },
  "zIndex.toast": {
    "value": 1700,
    "variable": "var(--z-index-toast)"
  },
  "zIndex.tooltip": {
    "value": 1800,
    "variable": "var(--z-index-tooltip)"
  },
  "zIndex.max": {
    "value": 2147483647,
    "variable": "var(--z-index-max)"
  },
  "cursor.button": {
    "value": "pointer",
    "variable": "var(--cursor-button)"
  },
  "cursor.checkbox": {
    "value": "default",
    "variable": "var(--cursor-checkbox)"
  },
  "cursor.disabled": {
    "value": "not-allowed",
    "variable": "var(--cursor-disabled)"
  },
  "cursor.menuitem": {
    "value": "default",
    "variable": "var(--cursor-menuitem)"
  },
  "cursor.option": {
    "value": "default",
    "variable": "var(--cursor-option)"
  },
  "cursor.radio": {
    "value": "default",
    "variable": "var(--cursor-radio)"
  },
  "cursor.slider": {
    "value": "default",
    "variable": "var(--cursor-slider)"
  },
  "cursor.swittch": {
    "value": "pointer",
    "variable": "var(--cursor-swittch)"
  },
  "breakpoints.sm": {
    "value": "480px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "radii.l1": {
    "value": "var(--radii-xs)",
    "variable": "var(--radii-l1)"
  },
  "radii.l2": {
    "value": "var(--radii-sm)",
    "variable": "var(--radii-l2)"
  },
  "radii.l3": {
    "value": "var(--radii-md)",
    "variable": "var(--radii-l3)"
  },
  "spacing.-1": {
    "value": "calc(var(--spacing-1) * -1)",
    "variable": "var(--spacing-1)"
  },
  "spacing.-2": {
    "value": "calc(var(--spacing-2) * -1)",
    "variable": "var(--spacing-2)"
  },
  "spacing.-3": {
    "value": "calc(var(--spacing-3) * -1)",
    "variable": "var(--spacing-3)"
  },
  "spacing.-4": {
    "value": "calc(var(--spacing-4) * -1)",
    "variable": "var(--spacing-4)"
  },
  "spacing.-5": {
    "value": "calc(var(--spacing-5) * -1)",
    "variable": "var(--spacing-5)"
  },
  "spacing.-6": {
    "value": "calc(var(--spacing-6) * -1)",
    "variable": "var(--spacing-6)"
  },
  "spacing.-7": {
    "value": "calc(var(--spacing-7) * -1)",
    "variable": "var(--spacing-7)"
  },
  "spacing.-8": {
    "value": "calc(var(--spacing-8) * -1)",
    "variable": "var(--spacing-8)"
  },
  "spacing.-9": {
    "value": "calc(var(--spacing-9) * -1)",
    "variable": "var(--spacing-9)"
  },
  "spacing.-10": {
    "value": "calc(var(--spacing-10) * -1)",
    "variable": "var(--spacing-10)"
  },
  "spacing.-11": {
    "value": "calc(var(--spacing-11) * -1)",
    "variable": "var(--spacing-11)"
  },
  "spacing.-12": {
    "value": "calc(var(--spacing-12) * -1)",
    "variable": "var(--spacing-12)"
  },
  "spacing.-14": {
    "value": "calc(var(--spacing-14) * -1)",
    "variable": "var(--spacing-14)"
  },
  "spacing.-16": {
    "value": "calc(var(--spacing-16) * -1)",
    "variable": "var(--spacing-16)"
  },
  "spacing.-20": {
    "value": "calc(var(--spacing-20) * -1)",
    "variable": "var(--spacing-20)"
  },
  "spacing.-24": {
    "value": "calc(var(--spacing-24) * -1)",
    "variable": "var(--spacing-24)"
  },
  "spacing.-28": {
    "value": "calc(var(--spacing-28) * -1)",
    "variable": "var(--spacing-28)"
  },
  "spacing.-32": {
    "value": "calc(var(--spacing-32) * -1)",
    "variable": "var(--spacing-32)"
  },
  "spacing.-36": {
    "value": "calc(var(--spacing-36) * -1)",
    "variable": "var(--spacing-36)"
  },
  "spacing.-40": {
    "value": "calc(var(--spacing-40) * -1)",
    "variable": "var(--spacing-40)"
  },
  "spacing.-44": {
    "value": "calc(var(--spacing-44) * -1)",
    "variable": "var(--spacing-44)"
  },
  "spacing.-48": {
    "value": "calc(var(--spacing-48) * -1)",
    "variable": "var(--spacing-48)"
  },
  "spacing.-52": {
    "value": "calc(var(--spacing-52) * -1)",
    "variable": "var(--spacing-52)"
  },
  "spacing.-56": {
    "value": "calc(var(--spacing-56) * -1)",
    "variable": "var(--spacing-56)"
  },
  "spacing.-60": {
    "value": "calc(var(--spacing-60) * -1)",
    "variable": "var(--spacing-60)"
  },
  "spacing.-64": {
    "value": "calc(var(--spacing-64) * -1)",
    "variable": "var(--spacing-64)"
  },
  "spacing.-72": {
    "value": "calc(var(--spacing-72) * -1)",
    "variable": "var(--spacing-72)"
  },
  "spacing.-80": {
    "value": "calc(var(--spacing-80) * -1)",
    "variable": "var(--spacing-80)"
  },
  "spacing.-96": {
    "value": "calc(var(--spacing-96) * -1)",
    "variable": "var(--spacing-96)"
  },
  "spacing.-0.5": {
    "value": "calc(var(--spacing-0\\.5) * -1)",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.-1.5": {
    "value": "calc(var(--spacing-1\\.5) * -1)",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.-2.5": {
    "value": "calc(var(--spacing-2\\.5) * -1)",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.-3.5": {
    "value": "calc(var(--spacing-3\\.5) * -1)",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.-4.5": {
    "value": "calc(var(--spacing-4\\.5) * -1)",
    "variable": "var(--spacing-4\\.5)"
  },
  "colors.bg": {
    "value": "var(--colors-bg)",
    "variable": "var(--colors-bg)"
  },
  "colors.bg.subtle": {
    "value": "var(--colors-bg-subtle)",
    "variable": "var(--colors-bg-subtle)"
  },
  "colors.bg.muted": {
    "value": "var(--colors-bg-muted)",
    "variable": "var(--colors-bg-muted)"
  },
  "colors.bg.emphasized": {
    "value": "var(--colors-bg-emphasized)",
    "variable": "var(--colors-bg-emphasized)"
  },
  "colors.bg.inverted": {
    "value": "var(--colors-bg-inverted)",
    "variable": "var(--colors-bg-inverted)"
  },
  "colors.bg.panel": {
    "value": "var(--colors-bg-panel)",
    "variable": "var(--colors-bg-panel)"
  },
  "colors.bg.error": {
    "value": "var(--colors-bg-error)",
    "variable": "var(--colors-bg-error)"
  },
  "colors.bg.warning": {
    "value": "var(--colors-bg-warning)",
    "variable": "var(--colors-bg-warning)"
  },
  "colors.bg.success": {
    "value": "var(--colors-bg-success)",
    "variable": "var(--colors-bg-success)"
  },
  "colors.bg.info": {
    "value": "var(--colors-bg-info)",
    "variable": "var(--colors-bg-info)"
  },
  "colors.fg": {
    "value": "var(--colors-fg)",
    "variable": "var(--colors-fg)"
  },
  "colors.fg.muted": {
    "value": "var(--colors-fg-muted)",
    "variable": "var(--colors-fg-muted)"
  },
  "colors.fg.subtle": {
    "value": "var(--colors-fg-subtle)",
    "variable": "var(--colors-fg-subtle)"
  },
  "colors.fg.inverted": {
    "value": "var(--colors-fg-inverted)",
    "variable": "var(--colors-fg-inverted)"
  },
  "colors.fg.error": {
    "value": "var(--colors-fg-error)",
    "variable": "var(--colors-fg-error)"
  },
  "colors.fg.warning": {
    "value": "var(--colors-fg-warning)",
    "variable": "var(--colors-fg-warning)"
  },
  "colors.fg.success": {
    "value": "var(--colors-fg-success)",
    "variable": "var(--colors-fg-success)"
  },
  "colors.fg.info": {
    "value": "var(--colors-fg-info)",
    "variable": "var(--colors-fg-info)"
  },
  "colors.border": {
    "value": "var(--colors-border)",
    "variable": "var(--colors-border)"
  },
  "colors.border.muted": {
    "value": "var(--colors-border-muted)",
    "variable": "var(--colors-border-muted)"
  },
  "colors.border.subtle": {
    "value": "var(--colors-border-subtle)",
    "variable": "var(--colors-border-subtle)"
  },
  "colors.border.emphasized": {
    "value": "var(--colors-border-emphasized)",
    "variable": "var(--colors-border-emphasized)"
  },
  "colors.border.inverted": {
    "value": "var(--colors-border-inverted)",
    "variable": "var(--colors-border-inverted)"
  },
  "colors.border.error": {
    "value": "var(--colors-border-error)",
    "variable": "var(--colors-border-error)"
  },
  "colors.border.warning": {
    "value": "var(--colors-border-warning)",
    "variable": "var(--colors-border-warning)"
  },
  "colors.border.success": {
    "value": "var(--colors-border-success)",
    "variable": "var(--colors-border-success)"
  },
  "colors.border.info": {
    "value": "var(--colors-border-info)",
    "variable": "var(--colors-border-info)"
  },
  "colors.gray.contrast": {
    "value": "var(--colors-gray-contrast)",
    "variable": "var(--colors-gray-contrast)"
  },
  "colors.gray.fg": {
    "value": "var(--colors-gray-fg)",
    "variable": "var(--colors-gray-fg)"
  },
  "colors.gray.subtle": {
    "value": "var(--colors-gray-subtle)",
    "variable": "var(--colors-gray-subtle)"
  },
  "colors.gray.muted": {
    "value": "var(--colors-gray-muted)",
    "variable": "var(--colors-gray-muted)"
  },
  "colors.gray.emphasized": {
    "value": "var(--colors-gray-emphasized)",
    "variable": "var(--colors-gray-emphasized)"
  },
  "colors.gray.solid": {
    "value": "var(--colors-gray-solid)",
    "variable": "var(--colors-gray-solid)"
  },
  "colors.gray.focusRing": {
    "value": "var(--colors-gray-focus-ring)",
    "variable": "var(--colors-gray-focus-ring)"
  },
  "colors.gray.border": {
    "value": "var(--colors-gray-border)",
    "variable": "var(--colors-gray-border)"
  },
  "colors.red.contrast": {
    "value": "var(--colors-red-contrast)",
    "variable": "var(--colors-red-contrast)"
  },
  "colors.red.fg": {
    "value": "var(--colors-red-fg)",
    "variable": "var(--colors-red-fg)"
  },
  "colors.red.subtle": {
    "value": "var(--colors-red-subtle)",
    "variable": "var(--colors-red-subtle)"
  },
  "colors.red.muted": {
    "value": "var(--colors-red-muted)",
    "variable": "var(--colors-red-muted)"
  },
  "colors.red.emphasized": {
    "value": "var(--colors-red-emphasized)",
    "variable": "var(--colors-red-emphasized)"
  },
  "colors.red.solid": {
    "value": "var(--colors-red-solid)",
    "variable": "var(--colors-red-solid)"
  },
  "colors.red.focusRing": {
    "value": "var(--colors-red-focus-ring)",
    "variable": "var(--colors-red-focus-ring)"
  },
  "colors.red.border": {
    "value": "var(--colors-red-border)",
    "variable": "var(--colors-red-border)"
  },
  "colors.orange.contrast": {
    "value": "var(--colors-orange-contrast)",
    "variable": "var(--colors-orange-contrast)"
  },
  "colors.orange.fg": {
    "value": "var(--colors-orange-fg)",
    "variable": "var(--colors-orange-fg)"
  },
  "colors.orange.subtle": {
    "value": "var(--colors-orange-subtle)",
    "variable": "var(--colors-orange-subtle)"
  },
  "colors.orange.muted": {
    "value": "var(--colors-orange-muted)",
    "variable": "var(--colors-orange-muted)"
  },
  "colors.orange.emphasized": {
    "value": "var(--colors-orange-emphasized)",
    "variable": "var(--colors-orange-emphasized)"
  },
  "colors.orange.solid": {
    "value": "var(--colors-orange-solid)",
    "variable": "var(--colors-orange-solid)"
  },
  "colors.orange.focusRing": {
    "value": "var(--colors-orange-focus-ring)",
    "variable": "var(--colors-orange-focus-ring)"
  },
  "colors.orange.border": {
    "value": "var(--colors-orange-border)",
    "variable": "var(--colors-orange-border)"
  },
  "colors.green.contrast": {
    "value": "var(--colors-green-contrast)",
    "variable": "var(--colors-green-contrast)"
  },
  "colors.green.fg": {
    "value": "var(--colors-green-fg)",
    "variable": "var(--colors-green-fg)"
  },
  "colors.green.subtle": {
    "value": "var(--colors-green-subtle)",
    "variable": "var(--colors-green-subtle)"
  },
  "colors.green.muted": {
    "value": "var(--colors-green-muted)",
    "variable": "var(--colors-green-muted)"
  },
  "colors.green.emphasized": {
    "value": "var(--colors-green-emphasized)",
    "variable": "var(--colors-green-emphasized)"
  },
  "colors.green.solid": {
    "value": "var(--colors-green-solid)",
    "variable": "var(--colors-green-solid)"
  },
  "colors.green.focusRing": {
    "value": "var(--colors-green-focus-ring)",
    "variable": "var(--colors-green-focus-ring)"
  },
  "colors.green.border": {
    "value": "var(--colors-green-border)",
    "variable": "var(--colors-green-border)"
  },
  "colors.blue.contrast": {
    "value": "var(--colors-blue-contrast)",
    "variable": "var(--colors-blue-contrast)"
  },
  "colors.blue.fg": {
    "value": "var(--colors-blue-fg)",
    "variable": "var(--colors-blue-fg)"
  },
  "colors.blue.subtle": {
    "value": "var(--colors-blue-subtle)",
    "variable": "var(--colors-blue-subtle)"
  },
  "colors.blue.muted": {
    "value": "var(--colors-blue-muted)",
    "variable": "var(--colors-blue-muted)"
  },
  "colors.blue.emphasized": {
    "value": "var(--colors-blue-emphasized)",
    "variable": "var(--colors-blue-emphasized)"
  },
  "colors.blue.solid": {
    "value": "var(--colors-blue-solid)",
    "variable": "var(--colors-blue-solid)"
  },
  "colors.blue.focusRing": {
    "value": "var(--colors-blue-focus-ring)",
    "variable": "var(--colors-blue-focus-ring)"
  },
  "colors.blue.border": {
    "value": "var(--colors-blue-border)",
    "variable": "var(--colors-blue-border)"
  },
  "colors.yellow.contrast": {
    "value": "var(--colors-yellow-contrast)",
    "variable": "var(--colors-yellow-contrast)"
  },
  "colors.yellow.fg": {
    "value": "var(--colors-yellow-fg)",
    "variable": "var(--colors-yellow-fg)"
  },
  "colors.yellow.subtle": {
    "value": "var(--colors-yellow-subtle)",
    "variable": "var(--colors-yellow-subtle)"
  },
  "colors.yellow.muted": {
    "value": "var(--colors-yellow-muted)",
    "variable": "var(--colors-yellow-muted)"
  },
  "colors.yellow.emphasized": {
    "value": "var(--colors-yellow-emphasized)",
    "variable": "var(--colors-yellow-emphasized)"
  },
  "colors.yellow.solid": {
    "value": "var(--colors-yellow-solid)",
    "variable": "var(--colors-yellow-solid)"
  },
  "colors.yellow.focusRing": {
    "value": "var(--colors-yellow-focus-ring)",
    "variable": "var(--colors-yellow-focus-ring)"
  },
  "colors.yellow.border": {
    "value": "var(--colors-yellow-border)",
    "variable": "var(--colors-yellow-border)"
  },
  "colors.teal.contrast": {
    "value": "var(--colors-teal-contrast)",
    "variable": "var(--colors-teal-contrast)"
  },
  "colors.teal.fg": {
    "value": "var(--colors-teal-fg)",
    "variable": "var(--colors-teal-fg)"
  },
  "colors.teal.subtle": {
    "value": "var(--colors-teal-subtle)",
    "variable": "var(--colors-teal-subtle)"
  },
  "colors.teal.muted": {
    "value": "var(--colors-teal-muted)",
    "variable": "var(--colors-teal-muted)"
  },
  "colors.teal.emphasized": {
    "value": "var(--colors-teal-emphasized)",
    "variable": "var(--colors-teal-emphasized)"
  },
  "colors.teal.solid": {
    "value": "var(--colors-teal-solid)",
    "variable": "var(--colors-teal-solid)"
  },
  "colors.teal.focusRing": {
    "value": "var(--colors-teal-focus-ring)",
    "variable": "var(--colors-teal-focus-ring)"
  },
  "colors.teal.border": {
    "value": "var(--colors-teal-border)",
    "variable": "var(--colors-teal-border)"
  },
  "colors.purple.contrast": {
    "value": "var(--colors-purple-contrast)",
    "variable": "var(--colors-purple-contrast)"
  },
  "colors.purple.fg": {
    "value": "var(--colors-purple-fg)",
    "variable": "var(--colors-purple-fg)"
  },
  "colors.purple.subtle": {
    "value": "var(--colors-purple-subtle)",
    "variable": "var(--colors-purple-subtle)"
  },
  "colors.purple.muted": {
    "value": "var(--colors-purple-muted)",
    "variable": "var(--colors-purple-muted)"
  },
  "colors.purple.emphasized": {
    "value": "var(--colors-purple-emphasized)",
    "variable": "var(--colors-purple-emphasized)"
  },
  "colors.purple.solid": {
    "value": "var(--colors-purple-solid)",
    "variable": "var(--colors-purple-solid)"
  },
  "colors.purple.focusRing": {
    "value": "var(--colors-purple-focus-ring)",
    "variable": "var(--colors-purple-focus-ring)"
  },
  "colors.purple.border": {
    "value": "var(--colors-purple-border)",
    "variable": "var(--colors-purple-border)"
  },
  "colors.pink.contrast": {
    "value": "var(--colors-pink-contrast)",
    "variable": "var(--colors-pink-contrast)"
  },
  "colors.pink.fg": {
    "value": "var(--colors-pink-fg)",
    "variable": "var(--colors-pink-fg)"
  },
  "colors.pink.subtle": {
    "value": "var(--colors-pink-subtle)",
    "variable": "var(--colors-pink-subtle)"
  },
  "colors.pink.muted": {
    "value": "var(--colors-pink-muted)",
    "variable": "var(--colors-pink-muted)"
  },
  "colors.pink.emphasized": {
    "value": "var(--colors-pink-emphasized)",
    "variable": "var(--colors-pink-emphasized)"
  },
  "colors.pink.solid": {
    "value": "var(--colors-pink-solid)",
    "variable": "var(--colors-pink-solid)"
  },
  "colors.pink.focusRing": {
    "value": "var(--colors-pink-focus-ring)",
    "variable": "var(--colors-pink-focus-ring)"
  },
  "colors.pink.border": {
    "value": "var(--colors-pink-border)",
    "variable": "var(--colors-pink-border)"
  },
  "colors.cyan.contrast": {
    "value": "var(--colors-cyan-contrast)",
    "variable": "var(--colors-cyan-contrast)"
  },
  "colors.cyan.fg": {
    "value": "var(--colors-cyan-fg)",
    "variable": "var(--colors-cyan-fg)"
  },
  "colors.cyan.subtle": {
    "value": "var(--colors-cyan-subtle)",
    "variable": "var(--colors-cyan-subtle)"
  },
  "colors.cyan.muted": {
    "value": "var(--colors-cyan-muted)",
    "variable": "var(--colors-cyan-muted)"
  },
  "colors.cyan.emphasized": {
    "value": "var(--colors-cyan-emphasized)",
    "variable": "var(--colors-cyan-emphasized)"
  },
  "colors.cyan.solid": {
    "value": "var(--colors-cyan-solid)",
    "variable": "var(--colors-cyan-solid)"
  },
  "colors.cyan.focusRing": {
    "value": "var(--colors-cyan-focus-ring)",
    "variable": "var(--colors-cyan-focus-ring)"
  },
  "colors.cyan.border": {
    "value": "var(--colors-cyan-border)",
    "variable": "var(--colors-cyan-border)"
  },
  "shadows.xs": {
    "value": "var(--shadows-xs)",
    "variable": "var(--shadows-xs)"
  },
  "shadows.sm": {
    "value": "var(--shadows-sm)",
    "variable": "var(--shadows-sm)"
  },
  "shadows.md": {
    "value": "var(--shadows-md)",
    "variable": "var(--shadows-md)"
  },
  "shadows.lg": {
    "value": "var(--shadows-lg)",
    "variable": "var(--shadows-lg)"
  },
  "shadows.xl": {
    "value": "var(--shadows-xl)",
    "variable": "var(--shadows-xl)"
  },
  "shadows.2xl": {
    "value": "var(--shadows-2xl)",
    "variable": "var(--shadows-2xl)"
  },
  "shadows.inner": {
    "value": "var(--shadows-inner)",
    "variable": "var(--shadows-inner)"
  },
  "shadows.inset": {
    "value": "var(--shadows-inset)",
    "variable": "var(--shadows-inset)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.50": {
    "value": "var(--colors-color-palette-50)",
    "variable": "var(--colors-color-palette-50)"
  },
  "colors.colorPalette.100": {
    "value": "var(--colors-color-palette-100)",
    "variable": "var(--colors-color-palette-100)"
  },
  "colors.colorPalette.200": {
    "value": "var(--colors-color-palette-200)",
    "variable": "var(--colors-color-palette-200)"
  },
  "colors.colorPalette.300": {
    "value": "var(--colors-color-palette-300)",
    "variable": "var(--colors-color-palette-300)"
  },
  "colors.colorPalette.400": {
    "value": "var(--colors-color-palette-400)",
    "variable": "var(--colors-color-palette-400)"
  },
  "colors.colorPalette.500": {
    "value": "var(--colors-color-palette-500)",
    "variable": "var(--colors-color-palette-500)"
  },
  "colors.colorPalette.600": {
    "value": "var(--colors-color-palette-600)",
    "variable": "var(--colors-color-palette-600)"
  },
  "colors.colorPalette.700": {
    "value": "var(--colors-color-palette-700)",
    "variable": "var(--colors-color-palette-700)"
  },
  "colors.colorPalette.800": {
    "value": "var(--colors-color-palette-800)",
    "variable": "var(--colors-color-palette-800)"
  },
  "colors.colorPalette.900": {
    "value": "var(--colors-color-palette-900)",
    "variable": "var(--colors-color-palette-900)"
  },
  "colors.colorPalette.950": {
    "value": "var(--colors-color-palette-950)",
    "variable": "var(--colors-color-palette-950)"
  },
  "colors.colorPalette.subtle": {
    "value": "var(--colors-color-palette-subtle)",
    "variable": "var(--colors-color-palette-subtle)"
  },
  "colors.colorPalette.muted": {
    "value": "var(--colors-color-palette-muted)",
    "variable": "var(--colors-color-palette-muted)"
  },
  "colors.colorPalette.emphasized": {
    "value": "var(--colors-color-palette-emphasized)",
    "variable": "var(--colors-color-palette-emphasized)"
  },
  "colors.colorPalette.inverted": {
    "value": "var(--colors-color-palette-inverted)",
    "variable": "var(--colors-color-palette-inverted)"
  },
  "colors.colorPalette.panel": {
    "value": "var(--colors-color-palette-panel)",
    "variable": "var(--colors-color-palette-panel)"
  },
  "colors.colorPalette.error": {
    "value": "var(--colors-color-palette-error)",
    "variable": "var(--colors-color-palette-error)"
  },
  "colors.colorPalette.warning": {
    "value": "var(--colors-color-palette-warning)",
    "variable": "var(--colors-color-palette-warning)"
  },
  "colors.colorPalette.success": {
    "value": "var(--colors-color-palette-success)",
    "variable": "var(--colors-color-palette-success)"
  },
  "colors.colorPalette.info": {
    "value": "var(--colors-color-palette-info)",
    "variable": "var(--colors-color-palette-info)"
  },
  "colors.colorPalette.contrast": {
    "value": "var(--colors-color-palette-contrast)",
    "variable": "var(--colors-color-palette-contrast)"
  },
  "colors.colorPalette.fg": {
    "value": "var(--colors-color-palette-fg)",
    "variable": "var(--colors-color-palette-fg)"
  },
  "colors.colorPalette.solid": {
    "value": "var(--colors-color-palette-solid)",
    "variable": "var(--colors-color-palette-solid)"
  },
  "colors.colorPalette.focusRing": {
    "value": "var(--colors-color-palette-focus-ring)",
    "variable": "var(--colors-color-palette-focus-ring)"
  },
  "colors.colorPalette.border": {
    "value": "var(--colors-color-palette-border)",
    "variable": "var(--colors-color-palette-border)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar