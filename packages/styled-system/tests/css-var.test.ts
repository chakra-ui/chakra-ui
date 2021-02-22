import theme from "@chakra-ui/theme"
import { toCSSVariables } from "../src/css-var"

test("should convert to css variables", () => {
  expect(toCSSVariables(theme).__cssMap).toMatchInlineSnapshot(`
    Object {
      "borders.1px": Object {
        "value": "1px solid",
        "var": "--borders-1px",
        "varRef": "var(--borders-1px)",
      },
      "borders.2px": Object {
        "value": "2px solid",
        "var": "--borders-2px",
        "varRef": "var(--borders-2px)",
      },
      "borders.4px": Object {
        "value": "4px solid",
        "var": "--borders-4px",
        "varRef": "var(--borders-4px)",
      },
      "borders.8px": Object {
        "value": "8px solid",
        "var": "--borders-8px",
        "varRef": "var(--borders-8px)",
      },
      "borders.none": Object {
        "value": 0,
        "var": "--borders-none",
        "varRef": "var(--borders-none)",
      },
      "colors.black": Object {
        "value": "#000000",
        "var": "--colors-black",
        "varRef": "var(--colors-black)",
      },
      "colors.blackAlpha.100": Object {
        "value": "rgba(0, 0, 0, 0.06)",
        "var": "--colors-blackAlpha-100",
        "varRef": "var(--colors-blackAlpha-100)",
      },
      "colors.blackAlpha.200": Object {
        "value": "rgba(0, 0, 0, 0.08)",
        "var": "--colors-blackAlpha-200",
        "varRef": "var(--colors-blackAlpha-200)",
      },
      "colors.blackAlpha.300": Object {
        "value": "rgba(0, 0, 0, 0.16)",
        "var": "--colors-blackAlpha-300",
        "varRef": "var(--colors-blackAlpha-300)",
      },
      "colors.blackAlpha.400": Object {
        "value": "rgba(0, 0, 0, 0.24)",
        "var": "--colors-blackAlpha-400",
        "varRef": "var(--colors-blackAlpha-400)",
      },
      "colors.blackAlpha.50": Object {
        "value": "rgba(0, 0, 0, 0.04)",
        "var": "--colors-blackAlpha-50",
        "varRef": "var(--colors-blackAlpha-50)",
      },
      "colors.blackAlpha.500": Object {
        "value": "rgba(0, 0, 0, 0.36)",
        "var": "--colors-blackAlpha-500",
        "varRef": "var(--colors-blackAlpha-500)",
      },
      "colors.blackAlpha.600": Object {
        "value": "rgba(0, 0, 0, 0.48)",
        "var": "--colors-blackAlpha-600",
        "varRef": "var(--colors-blackAlpha-600)",
      },
      "colors.blackAlpha.700": Object {
        "value": "rgba(0, 0, 0, 0.64)",
        "var": "--colors-blackAlpha-700",
        "varRef": "var(--colors-blackAlpha-700)",
      },
      "colors.blackAlpha.800": Object {
        "value": "rgba(0, 0, 0, 0.80)",
        "var": "--colors-blackAlpha-800",
        "varRef": "var(--colors-blackAlpha-800)",
      },
      "colors.blackAlpha.900": Object {
        "value": "rgba(0, 0, 0, 0.92)",
        "var": "--colors-blackAlpha-900",
        "varRef": "var(--colors-blackAlpha-900)",
      },
      "colors.blue.100": Object {
        "value": "#bee3f8",
        "var": "--colors-blue-100",
        "varRef": "var(--colors-blue-100)",
      },
      "colors.blue.200": Object {
        "value": "#90cdf4",
        "var": "--colors-blue-200",
        "varRef": "var(--colors-blue-200)",
      },
      "colors.blue.300": Object {
        "value": "#63b3ed",
        "var": "--colors-blue-300",
        "varRef": "var(--colors-blue-300)",
      },
      "colors.blue.400": Object {
        "value": "#4299e1",
        "var": "--colors-blue-400",
        "varRef": "var(--colors-blue-400)",
      },
      "colors.blue.50": Object {
        "value": "#ebf8ff",
        "var": "--colors-blue-50",
        "varRef": "var(--colors-blue-50)",
      },
      "colors.blue.500": Object {
        "value": "#3182ce",
        "var": "--colors-blue-500",
        "varRef": "var(--colors-blue-500)",
      },
      "colors.blue.600": Object {
        "value": "#2b6cb0",
        "var": "--colors-blue-600",
        "varRef": "var(--colors-blue-600)",
      },
      "colors.blue.700": Object {
        "value": "#2c5282",
        "var": "--colors-blue-700",
        "varRef": "var(--colors-blue-700)",
      },
      "colors.blue.800": Object {
        "value": "#2a4365",
        "var": "--colors-blue-800",
        "varRef": "var(--colors-blue-800)",
      },
      "colors.blue.900": Object {
        "value": "#1A365D",
        "var": "--colors-blue-900",
        "varRef": "var(--colors-blue-900)",
      },
      "colors.current": Object {
        "value": "currentColor",
        "var": "--colors-current",
        "varRef": "var(--colors-current)",
      },
      "colors.cyan.100": Object {
        "value": "#C4F1F9",
        "var": "--colors-cyan-100",
        "varRef": "var(--colors-cyan-100)",
      },
      "colors.cyan.200": Object {
        "value": "#9DECF9",
        "var": "--colors-cyan-200",
        "varRef": "var(--colors-cyan-200)",
      },
      "colors.cyan.300": Object {
        "value": "#76E4F7",
        "var": "--colors-cyan-300",
        "varRef": "var(--colors-cyan-300)",
      },
      "colors.cyan.400": Object {
        "value": "#0BC5EA",
        "var": "--colors-cyan-400",
        "varRef": "var(--colors-cyan-400)",
      },
      "colors.cyan.50": Object {
        "value": "#EDFDFD",
        "var": "--colors-cyan-50",
        "varRef": "var(--colors-cyan-50)",
      },
      "colors.cyan.500": Object {
        "value": "#00B5D8",
        "var": "--colors-cyan-500",
        "varRef": "var(--colors-cyan-500)",
      },
      "colors.cyan.600": Object {
        "value": "#00A3C4",
        "var": "--colors-cyan-600",
        "varRef": "var(--colors-cyan-600)",
      },
      "colors.cyan.700": Object {
        "value": "#0987A0",
        "var": "--colors-cyan-700",
        "varRef": "var(--colors-cyan-700)",
      },
      "colors.cyan.800": Object {
        "value": "#086F83",
        "var": "--colors-cyan-800",
        "varRef": "var(--colors-cyan-800)",
      },
      "colors.cyan.900": Object {
        "value": "#065666",
        "var": "--colors-cyan-900",
        "varRef": "var(--colors-cyan-900)",
      },
      "colors.facebook.100": Object {
        "value": "#D9DEE9",
        "var": "--colors-facebook-100",
        "varRef": "var(--colors-facebook-100)",
      },
      "colors.facebook.200": Object {
        "value": "#B7C2DA",
        "var": "--colors-facebook-200",
        "varRef": "var(--colors-facebook-200)",
      },
      "colors.facebook.300": Object {
        "value": "#6482C0",
        "var": "--colors-facebook-300",
        "varRef": "var(--colors-facebook-300)",
      },
      "colors.facebook.400": Object {
        "value": "#4267B2",
        "var": "--colors-facebook-400",
        "varRef": "var(--colors-facebook-400)",
      },
      "colors.facebook.50": Object {
        "value": "#E8F4F9",
        "var": "--colors-facebook-50",
        "varRef": "var(--colors-facebook-50)",
      },
      "colors.facebook.500": Object {
        "value": "#385898",
        "var": "--colors-facebook-500",
        "varRef": "var(--colors-facebook-500)",
      },
      "colors.facebook.600": Object {
        "value": "#314E89",
        "var": "--colors-facebook-600",
        "varRef": "var(--colors-facebook-600)",
      },
      "colors.facebook.700": Object {
        "value": "#29487D",
        "var": "--colors-facebook-700",
        "varRef": "var(--colors-facebook-700)",
      },
      "colors.facebook.800": Object {
        "value": "#223B67",
        "var": "--colors-facebook-800",
        "varRef": "var(--colors-facebook-800)",
      },
      "colors.facebook.900": Object {
        "value": "#1E355B",
        "var": "--colors-facebook-900",
        "varRef": "var(--colors-facebook-900)",
      },
      "colors.gray.100": Object {
        "value": "#EDF2F7",
        "var": "--colors-gray-100",
        "varRef": "var(--colors-gray-100)",
      },
      "colors.gray.200": Object {
        "value": "#E2E8F0",
        "var": "--colors-gray-200",
        "varRef": "var(--colors-gray-200)",
      },
      "colors.gray.300": Object {
        "value": "#CBD5E0",
        "var": "--colors-gray-300",
        "varRef": "var(--colors-gray-300)",
      },
      "colors.gray.400": Object {
        "value": "#A0AEC0",
        "var": "--colors-gray-400",
        "varRef": "var(--colors-gray-400)",
      },
      "colors.gray.50": Object {
        "value": "#F7FAFC",
        "var": "--colors-gray-50",
        "varRef": "var(--colors-gray-50)",
      },
      "colors.gray.500": Object {
        "value": "#718096",
        "var": "--colors-gray-500",
        "varRef": "var(--colors-gray-500)",
      },
      "colors.gray.600": Object {
        "value": "#4A5568",
        "var": "--colors-gray-600",
        "varRef": "var(--colors-gray-600)",
      },
      "colors.gray.700": Object {
        "value": "#2D3748",
        "var": "--colors-gray-700",
        "varRef": "var(--colors-gray-700)",
      },
      "colors.gray.800": Object {
        "value": "#1A202C",
        "var": "--colors-gray-800",
        "varRef": "var(--colors-gray-800)",
      },
      "colors.gray.900": Object {
        "value": "#171923",
        "var": "--colors-gray-900",
        "varRef": "var(--colors-gray-900)",
      },
      "colors.green.100": Object {
        "value": "#C6F6D5",
        "var": "--colors-green-100",
        "varRef": "var(--colors-green-100)",
      },
      "colors.green.200": Object {
        "value": "#9AE6B4",
        "var": "--colors-green-200",
        "varRef": "var(--colors-green-200)",
      },
      "colors.green.300": Object {
        "value": "#68D391",
        "var": "--colors-green-300",
        "varRef": "var(--colors-green-300)",
      },
      "colors.green.400": Object {
        "value": "#48BB78",
        "var": "--colors-green-400",
        "varRef": "var(--colors-green-400)",
      },
      "colors.green.50": Object {
        "value": "#F0FFF4",
        "var": "--colors-green-50",
        "varRef": "var(--colors-green-50)",
      },
      "colors.green.500": Object {
        "value": "#38A169",
        "var": "--colors-green-500",
        "varRef": "var(--colors-green-500)",
      },
      "colors.green.600": Object {
        "value": "#2F855A",
        "var": "--colors-green-600",
        "varRef": "var(--colors-green-600)",
      },
      "colors.green.700": Object {
        "value": "#276749",
        "var": "--colors-green-700",
        "varRef": "var(--colors-green-700)",
      },
      "colors.green.800": Object {
        "value": "#22543D",
        "var": "--colors-green-800",
        "varRef": "var(--colors-green-800)",
      },
      "colors.green.900": Object {
        "value": "#1C4532",
        "var": "--colors-green-900",
        "varRef": "var(--colors-green-900)",
      },
      "colors.linkedin.100": Object {
        "value": "#CFEDFB",
        "var": "--colors-linkedin-100",
        "varRef": "var(--colors-linkedin-100)",
      },
      "colors.linkedin.200": Object {
        "value": "#9BDAF3",
        "var": "--colors-linkedin-200",
        "varRef": "var(--colors-linkedin-200)",
      },
      "colors.linkedin.300": Object {
        "value": "#68C7EC",
        "var": "--colors-linkedin-300",
        "varRef": "var(--colors-linkedin-300)",
      },
      "colors.linkedin.400": Object {
        "value": "#34B3E4",
        "var": "--colors-linkedin-400",
        "varRef": "var(--colors-linkedin-400)",
      },
      "colors.linkedin.50": Object {
        "value": "#E8F4F9",
        "var": "--colors-linkedin-50",
        "varRef": "var(--colors-linkedin-50)",
      },
      "colors.linkedin.500": Object {
        "value": "#00A0DC",
        "var": "--colors-linkedin-500",
        "varRef": "var(--colors-linkedin-500)",
      },
      "colors.linkedin.600": Object {
        "value": "#008CC9",
        "var": "--colors-linkedin-600",
        "varRef": "var(--colors-linkedin-600)",
      },
      "colors.linkedin.700": Object {
        "value": "#0077B5",
        "var": "--colors-linkedin-700",
        "varRef": "var(--colors-linkedin-700)",
      },
      "colors.linkedin.800": Object {
        "value": "#005E93",
        "var": "--colors-linkedin-800",
        "varRef": "var(--colors-linkedin-800)",
      },
      "colors.linkedin.900": Object {
        "value": "#004471",
        "var": "--colors-linkedin-900",
        "varRef": "var(--colors-linkedin-900)",
      },
      "colors.messenger.100": Object {
        "value": "#B9DAFF",
        "var": "--colors-messenger-100",
        "varRef": "var(--colors-messenger-100)",
      },
      "colors.messenger.200": Object {
        "value": "#A2CDFF",
        "var": "--colors-messenger-200",
        "varRef": "var(--colors-messenger-200)",
      },
      "colors.messenger.300": Object {
        "value": "#7AB8FF",
        "var": "--colors-messenger-300",
        "varRef": "var(--colors-messenger-300)",
      },
      "colors.messenger.400": Object {
        "value": "#2E90FF",
        "var": "--colors-messenger-400",
        "varRef": "var(--colors-messenger-400)",
      },
      "colors.messenger.50": Object {
        "value": "#D0E6FF",
        "var": "--colors-messenger-50",
        "varRef": "var(--colors-messenger-50)",
      },
      "colors.messenger.500": Object {
        "value": "#0078FF",
        "var": "--colors-messenger-500",
        "varRef": "var(--colors-messenger-500)",
      },
      "colors.messenger.600": Object {
        "value": "#0063D1",
        "var": "--colors-messenger-600",
        "varRef": "var(--colors-messenger-600)",
      },
      "colors.messenger.700": Object {
        "value": "#0052AC",
        "var": "--colors-messenger-700",
        "varRef": "var(--colors-messenger-700)",
      },
      "colors.messenger.800": Object {
        "value": "#003C7E",
        "var": "--colors-messenger-800",
        "varRef": "var(--colors-messenger-800)",
      },
      "colors.messenger.900": Object {
        "value": "#002C5C",
        "var": "--colors-messenger-900",
        "varRef": "var(--colors-messenger-900)",
      },
      "colors.orange.100": Object {
        "value": "#FEEBC8",
        "var": "--colors-orange-100",
        "varRef": "var(--colors-orange-100)",
      },
      "colors.orange.200": Object {
        "value": "#FBD38D",
        "var": "--colors-orange-200",
        "varRef": "var(--colors-orange-200)",
      },
      "colors.orange.300": Object {
        "value": "#F6AD55",
        "var": "--colors-orange-300",
        "varRef": "var(--colors-orange-300)",
      },
      "colors.orange.400": Object {
        "value": "#ED8936",
        "var": "--colors-orange-400",
        "varRef": "var(--colors-orange-400)",
      },
      "colors.orange.50": Object {
        "value": "#FFFAF0",
        "var": "--colors-orange-50",
        "varRef": "var(--colors-orange-50)",
      },
      "colors.orange.500": Object {
        "value": "#DD6B20",
        "var": "--colors-orange-500",
        "varRef": "var(--colors-orange-500)",
      },
      "colors.orange.600": Object {
        "value": "#C05621",
        "var": "--colors-orange-600",
        "varRef": "var(--colors-orange-600)",
      },
      "colors.orange.700": Object {
        "value": "#9C4221",
        "var": "--colors-orange-700",
        "varRef": "var(--colors-orange-700)",
      },
      "colors.orange.800": Object {
        "value": "#7B341E",
        "var": "--colors-orange-800",
        "varRef": "var(--colors-orange-800)",
      },
      "colors.orange.900": Object {
        "value": "#652B19",
        "var": "--colors-orange-900",
        "varRef": "var(--colors-orange-900)",
      },
      "colors.pink.100": Object {
        "value": "#FED7E2",
        "var": "--colors-pink-100",
        "varRef": "var(--colors-pink-100)",
      },
      "colors.pink.200": Object {
        "value": "#FBB6CE",
        "var": "--colors-pink-200",
        "varRef": "var(--colors-pink-200)",
      },
      "colors.pink.300": Object {
        "value": "#F687B3",
        "var": "--colors-pink-300",
        "varRef": "var(--colors-pink-300)",
      },
      "colors.pink.400": Object {
        "value": "#ED64A6",
        "var": "--colors-pink-400",
        "varRef": "var(--colors-pink-400)",
      },
      "colors.pink.50": Object {
        "value": "#FFF5F7",
        "var": "--colors-pink-50",
        "varRef": "var(--colors-pink-50)",
      },
      "colors.pink.500": Object {
        "value": "#D53F8C",
        "var": "--colors-pink-500",
        "varRef": "var(--colors-pink-500)",
      },
      "colors.pink.600": Object {
        "value": "#B83280",
        "var": "--colors-pink-600",
        "varRef": "var(--colors-pink-600)",
      },
      "colors.pink.700": Object {
        "value": "#97266D",
        "var": "--colors-pink-700",
        "varRef": "var(--colors-pink-700)",
      },
      "colors.pink.800": Object {
        "value": "#702459",
        "var": "--colors-pink-800",
        "varRef": "var(--colors-pink-800)",
      },
      "colors.pink.900": Object {
        "value": "#521B41",
        "var": "--colors-pink-900",
        "varRef": "var(--colors-pink-900)",
      },
      "colors.purple.100": Object {
        "value": "#E9D8FD",
        "var": "--colors-purple-100",
        "varRef": "var(--colors-purple-100)",
      },
      "colors.purple.200": Object {
        "value": "#D6BCFA",
        "var": "--colors-purple-200",
        "varRef": "var(--colors-purple-200)",
      },
      "colors.purple.300": Object {
        "value": "#B794F4",
        "var": "--colors-purple-300",
        "varRef": "var(--colors-purple-300)",
      },
      "colors.purple.400": Object {
        "value": "#9F7AEA",
        "var": "--colors-purple-400",
        "varRef": "var(--colors-purple-400)",
      },
      "colors.purple.50": Object {
        "value": "#FAF5FF",
        "var": "--colors-purple-50",
        "varRef": "var(--colors-purple-50)",
      },
      "colors.purple.500": Object {
        "value": "#805AD5",
        "var": "--colors-purple-500",
        "varRef": "var(--colors-purple-500)",
      },
      "colors.purple.600": Object {
        "value": "#6B46C1",
        "var": "--colors-purple-600",
        "varRef": "var(--colors-purple-600)",
      },
      "colors.purple.700": Object {
        "value": "#553C9A",
        "var": "--colors-purple-700",
        "varRef": "var(--colors-purple-700)",
      },
      "colors.purple.800": Object {
        "value": "#44337A",
        "var": "--colors-purple-800",
        "varRef": "var(--colors-purple-800)",
      },
      "colors.purple.900": Object {
        "value": "#322659",
        "var": "--colors-purple-900",
        "varRef": "var(--colors-purple-900)",
      },
      "colors.red.100": Object {
        "value": "#FED7D7",
        "var": "--colors-red-100",
        "varRef": "var(--colors-red-100)",
      },
      "colors.red.200": Object {
        "value": "#FEB2B2",
        "var": "--colors-red-200",
        "varRef": "var(--colors-red-200)",
      },
      "colors.red.300": Object {
        "value": "#FC8181",
        "var": "--colors-red-300",
        "varRef": "var(--colors-red-300)",
      },
      "colors.red.400": Object {
        "value": "#F56565",
        "var": "--colors-red-400",
        "varRef": "var(--colors-red-400)",
      },
      "colors.red.50": Object {
        "value": "#FFF5F5",
        "var": "--colors-red-50",
        "varRef": "var(--colors-red-50)",
      },
      "colors.red.500": Object {
        "value": "#E53E3E",
        "var": "--colors-red-500",
        "varRef": "var(--colors-red-500)",
      },
      "colors.red.600": Object {
        "value": "#C53030",
        "var": "--colors-red-600",
        "varRef": "var(--colors-red-600)",
      },
      "colors.red.700": Object {
        "value": "#9B2C2C",
        "var": "--colors-red-700",
        "varRef": "var(--colors-red-700)",
      },
      "colors.red.800": Object {
        "value": "#822727",
        "var": "--colors-red-800",
        "varRef": "var(--colors-red-800)",
      },
      "colors.red.900": Object {
        "value": "#63171B",
        "var": "--colors-red-900",
        "varRef": "var(--colors-red-900)",
      },
      "colors.teal.100": Object {
        "value": "#B2F5EA",
        "var": "--colors-teal-100",
        "varRef": "var(--colors-teal-100)",
      },
      "colors.teal.200": Object {
        "value": "#81E6D9",
        "var": "--colors-teal-200",
        "varRef": "var(--colors-teal-200)",
      },
      "colors.teal.300": Object {
        "value": "#4FD1C5",
        "var": "--colors-teal-300",
        "varRef": "var(--colors-teal-300)",
      },
      "colors.teal.400": Object {
        "value": "#38B2AC",
        "var": "--colors-teal-400",
        "varRef": "var(--colors-teal-400)",
      },
      "colors.teal.50": Object {
        "value": "#E6FFFA",
        "var": "--colors-teal-50",
        "varRef": "var(--colors-teal-50)",
      },
      "colors.teal.500": Object {
        "value": "#319795",
        "var": "--colors-teal-500",
        "varRef": "var(--colors-teal-500)",
      },
      "colors.teal.600": Object {
        "value": "#2C7A7B",
        "var": "--colors-teal-600",
        "varRef": "var(--colors-teal-600)",
      },
      "colors.teal.700": Object {
        "value": "#285E61",
        "var": "--colors-teal-700",
        "varRef": "var(--colors-teal-700)",
      },
      "colors.teal.800": Object {
        "value": "#234E52",
        "var": "--colors-teal-800",
        "varRef": "var(--colors-teal-800)",
      },
      "colors.teal.900": Object {
        "value": "#1D4044",
        "var": "--colors-teal-900",
        "varRef": "var(--colors-teal-900)",
      },
      "colors.telegram.100": Object {
        "value": "#C5E4F3",
        "var": "--colors-telegram-100",
        "varRef": "var(--colors-telegram-100)",
      },
      "colors.telegram.200": Object {
        "value": "#A2D4EC",
        "var": "--colors-telegram-200",
        "varRef": "var(--colors-telegram-200)",
      },
      "colors.telegram.300": Object {
        "value": "#7AC1E4",
        "var": "--colors-telegram-300",
        "varRef": "var(--colors-telegram-300)",
      },
      "colors.telegram.400": Object {
        "value": "#47A9DA",
        "var": "--colors-telegram-400",
        "varRef": "var(--colors-telegram-400)",
      },
      "colors.telegram.50": Object {
        "value": "#E3F2F9",
        "var": "--colors-telegram-50",
        "varRef": "var(--colors-telegram-50)",
      },
      "colors.telegram.500": Object {
        "value": "#0088CC",
        "var": "--colors-telegram-500",
        "varRef": "var(--colors-telegram-500)",
      },
      "colors.telegram.600": Object {
        "value": "#007AB8",
        "var": "--colors-telegram-600",
        "varRef": "var(--colors-telegram-600)",
      },
      "colors.telegram.700": Object {
        "value": "#006BA1",
        "var": "--colors-telegram-700",
        "varRef": "var(--colors-telegram-700)",
      },
      "colors.telegram.800": Object {
        "value": "#005885",
        "var": "--colors-telegram-800",
        "varRef": "var(--colors-telegram-800)",
      },
      "colors.telegram.900": Object {
        "value": "#003F5E",
        "var": "--colors-telegram-900",
        "varRef": "var(--colors-telegram-900)",
      },
      "colors.transparent": Object {
        "value": "transparent",
        "var": "--colors-transparent",
        "varRef": "var(--colors-transparent)",
      },
      "colors.twitter.100": Object {
        "value": "#C8E9FB",
        "var": "--colors-twitter-100",
        "varRef": "var(--colors-twitter-100)",
      },
      "colors.twitter.200": Object {
        "value": "#A8DCFA",
        "var": "--colors-twitter-200",
        "varRef": "var(--colors-twitter-200)",
      },
      "colors.twitter.300": Object {
        "value": "#83CDF7",
        "var": "--colors-twitter-300",
        "varRef": "var(--colors-twitter-300)",
      },
      "colors.twitter.400": Object {
        "value": "#57BBF5",
        "var": "--colors-twitter-400",
        "varRef": "var(--colors-twitter-400)",
      },
      "colors.twitter.50": Object {
        "value": "#E5F4FD",
        "var": "--colors-twitter-50",
        "varRef": "var(--colors-twitter-50)",
      },
      "colors.twitter.500": Object {
        "value": "#1DA1F2",
        "var": "--colors-twitter-500",
        "varRef": "var(--colors-twitter-500)",
      },
      "colors.twitter.600": Object {
        "value": "#1A94DA",
        "var": "--colors-twitter-600",
        "varRef": "var(--colors-twitter-600)",
      },
      "colors.twitter.700": Object {
        "value": "#1681BF",
        "var": "--colors-twitter-700",
        "varRef": "var(--colors-twitter-700)",
      },
      "colors.twitter.800": Object {
        "value": "#136B9E",
        "var": "--colors-twitter-800",
        "varRef": "var(--colors-twitter-800)",
      },
      "colors.twitter.900": Object {
        "value": "#0D4D71",
        "var": "--colors-twitter-900",
        "varRef": "var(--colors-twitter-900)",
      },
      "colors.whatsapp.100": Object {
        "value": "#b9f5d0",
        "var": "--colors-whatsapp-100",
        "varRef": "var(--colors-whatsapp-100)",
      },
      "colors.whatsapp.200": Object {
        "value": "#90edb3",
        "var": "--colors-whatsapp-200",
        "varRef": "var(--colors-whatsapp-200)",
      },
      "colors.whatsapp.300": Object {
        "value": "#65e495",
        "var": "--colors-whatsapp-300",
        "varRef": "var(--colors-whatsapp-300)",
      },
      "colors.whatsapp.400": Object {
        "value": "#3cdd78",
        "var": "--colors-whatsapp-400",
        "varRef": "var(--colors-whatsapp-400)",
      },
      "colors.whatsapp.50": Object {
        "value": "#dffeec",
        "var": "--colors-whatsapp-50",
        "varRef": "var(--colors-whatsapp-50)",
      },
      "colors.whatsapp.500": Object {
        "value": "#22c35e",
        "var": "--colors-whatsapp-500",
        "varRef": "var(--colors-whatsapp-500)",
      },
      "colors.whatsapp.600": Object {
        "value": "#179848",
        "var": "--colors-whatsapp-600",
        "varRef": "var(--colors-whatsapp-600)",
      },
      "colors.whatsapp.700": Object {
        "value": "#0c6c33",
        "var": "--colors-whatsapp-700",
        "varRef": "var(--colors-whatsapp-700)",
      },
      "colors.whatsapp.800": Object {
        "value": "#01421c",
        "var": "--colors-whatsapp-800",
        "varRef": "var(--colors-whatsapp-800)",
      },
      "colors.whatsapp.900": Object {
        "value": "#001803",
        "var": "--colors-whatsapp-900",
        "varRef": "var(--colors-whatsapp-900)",
      },
      "colors.white": Object {
        "value": "#FFFFFF",
        "var": "--colors-white",
        "varRef": "var(--colors-white)",
      },
      "colors.whiteAlpha.100": Object {
        "value": "rgba(255, 255, 255, 0.06)",
        "var": "--colors-whiteAlpha-100",
        "varRef": "var(--colors-whiteAlpha-100)",
      },
      "colors.whiteAlpha.200": Object {
        "value": "rgba(255, 255, 255, 0.08)",
        "var": "--colors-whiteAlpha-200",
        "varRef": "var(--colors-whiteAlpha-200)",
      },
      "colors.whiteAlpha.300": Object {
        "value": "rgba(255, 255, 255, 0.16)",
        "var": "--colors-whiteAlpha-300",
        "varRef": "var(--colors-whiteAlpha-300)",
      },
      "colors.whiteAlpha.400": Object {
        "value": "rgba(255, 255, 255, 0.24)",
        "var": "--colors-whiteAlpha-400",
        "varRef": "var(--colors-whiteAlpha-400)",
      },
      "colors.whiteAlpha.50": Object {
        "value": "rgba(255, 255, 255, 0.04)",
        "var": "--colors-whiteAlpha-50",
        "varRef": "var(--colors-whiteAlpha-50)",
      },
      "colors.whiteAlpha.500": Object {
        "value": "rgba(255, 255, 255, 0.36)",
        "var": "--colors-whiteAlpha-500",
        "varRef": "var(--colors-whiteAlpha-500)",
      },
      "colors.whiteAlpha.600": Object {
        "value": "rgba(255, 255, 255, 0.48)",
        "var": "--colors-whiteAlpha-600",
        "varRef": "var(--colors-whiteAlpha-600)",
      },
      "colors.whiteAlpha.700": Object {
        "value": "rgba(255, 255, 255, 0.64)",
        "var": "--colors-whiteAlpha-700",
        "varRef": "var(--colors-whiteAlpha-700)",
      },
      "colors.whiteAlpha.800": Object {
        "value": "rgba(255, 255, 255, 0.80)",
        "var": "--colors-whiteAlpha-800",
        "varRef": "var(--colors-whiteAlpha-800)",
      },
      "colors.whiteAlpha.900": Object {
        "value": "rgba(255, 255, 255, 0.92)",
        "var": "--colors-whiteAlpha-900",
        "varRef": "var(--colors-whiteAlpha-900)",
      },
      "colors.yellow.100": Object {
        "value": "#FEFCBF",
        "var": "--colors-yellow-100",
        "varRef": "var(--colors-yellow-100)",
      },
      "colors.yellow.200": Object {
        "value": "#FAF089",
        "var": "--colors-yellow-200",
        "varRef": "var(--colors-yellow-200)",
      },
      "colors.yellow.300": Object {
        "value": "#F6E05E",
        "var": "--colors-yellow-300",
        "varRef": "var(--colors-yellow-300)",
      },
      "colors.yellow.400": Object {
        "value": "#ECC94B",
        "var": "--colors-yellow-400",
        "varRef": "var(--colors-yellow-400)",
      },
      "colors.yellow.50": Object {
        "value": "#FFFFF0",
        "var": "--colors-yellow-50",
        "varRef": "var(--colors-yellow-50)",
      },
      "colors.yellow.500": Object {
        "value": "#D69E2E",
        "var": "--colors-yellow-500",
        "varRef": "var(--colors-yellow-500)",
      },
      "colors.yellow.600": Object {
        "value": "#B7791F",
        "var": "--colors-yellow-600",
        "varRef": "var(--colors-yellow-600)",
      },
      "colors.yellow.700": Object {
        "value": "#975A16",
        "var": "--colors-yellow-700",
        "varRef": "var(--colors-yellow-700)",
      },
      "colors.yellow.800": Object {
        "value": "#744210",
        "var": "--colors-yellow-800",
        "varRef": "var(--colors-yellow-800)",
      },
      "colors.yellow.900": Object {
        "value": "#5F370E",
        "var": "--colors-yellow-900",
        "varRef": "var(--colors-yellow-900)",
      },
      "fontSizes.2xl": Object {
        "value": "1.5rem",
        "var": "--fontSizes-2xl",
        "varRef": "var(--fontSizes-2xl)",
      },
      "fontSizes.3xl": Object {
        "value": "1.875rem",
        "var": "--fontSizes-3xl",
        "varRef": "var(--fontSizes-3xl)",
      },
      "fontSizes.4xl": Object {
        "value": "2.25rem",
        "var": "--fontSizes-4xl",
        "varRef": "var(--fontSizes-4xl)",
      },
      "fontSizes.5xl": Object {
        "value": "3rem",
        "var": "--fontSizes-5xl",
        "varRef": "var(--fontSizes-5xl)",
      },
      "fontSizes.6xl": Object {
        "value": "3.75rem",
        "var": "--fontSizes-6xl",
        "varRef": "var(--fontSizes-6xl)",
      },
      "fontSizes.7xl": Object {
        "value": "4.5rem",
        "var": "--fontSizes-7xl",
        "varRef": "var(--fontSizes-7xl)",
      },
      "fontSizes.8xl": Object {
        "value": "6rem",
        "var": "--fontSizes-8xl",
        "varRef": "var(--fontSizes-8xl)",
      },
      "fontSizes.9xl": Object {
        "value": "8rem",
        "var": "--fontSizes-9xl",
        "varRef": "var(--fontSizes-9xl)",
      },
      "fontSizes.lg": Object {
        "value": "1.125rem",
        "var": "--fontSizes-lg",
        "varRef": "var(--fontSizes-lg)",
      },
      "fontSizes.md": Object {
        "value": "1rem",
        "var": "--fontSizes-md",
        "varRef": "var(--fontSizes-md)",
      },
      "fontSizes.sm": Object {
        "value": "0.875rem",
        "var": "--fontSizes-sm",
        "varRef": "var(--fontSizes-sm)",
      },
      "fontSizes.xl": Object {
        "value": "1.25rem",
        "var": "--fontSizes-xl",
        "varRef": "var(--fontSizes-xl)",
      },
      "fontSizes.xs": Object {
        "value": "0.75rem",
        "var": "--fontSizes-xs",
        "varRef": "var(--fontSizes-xs)",
      },
      "fontWeights.black": Object {
        "value": 900,
        "var": "--fontWeights-black",
        "varRef": "var(--fontWeights-black)",
      },
      "fontWeights.bold": Object {
        "value": 700,
        "var": "--fontWeights-bold",
        "varRef": "var(--fontWeights-bold)",
      },
      "fontWeights.extrabold": Object {
        "value": 800,
        "var": "--fontWeights-extrabold",
        "varRef": "var(--fontWeights-extrabold)",
      },
      "fontWeights.hairline": Object {
        "value": 100,
        "var": "--fontWeights-hairline",
        "varRef": "var(--fontWeights-hairline)",
      },
      "fontWeights.light": Object {
        "value": 300,
        "var": "--fontWeights-light",
        "varRef": "var(--fontWeights-light)",
      },
      "fontWeights.medium": Object {
        "value": 500,
        "var": "--fontWeights-medium",
        "varRef": "var(--fontWeights-medium)",
      },
      "fontWeights.normal": Object {
        "value": 400,
        "var": "--fontWeights-normal",
        "varRef": "var(--fontWeights-normal)",
      },
      "fontWeights.semibold": Object {
        "value": 600,
        "var": "--fontWeights-semibold",
        "varRef": "var(--fontWeights-semibold)",
      },
      "fontWeights.thin": Object {
        "value": 200,
        "var": "--fontWeights-thin",
        "varRef": "var(--fontWeights-thin)",
      },
      "fonts.body": Object {
        "value": "-apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
        "var": "--fonts-body",
        "varRef": "var(--fonts-body)",
      },
      "fonts.heading": Object {
        "value": "-apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
        "var": "--fonts-heading",
        "varRef": "var(--fonts-heading)",
      },
      "fonts.mono": Object {
        "value": "SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace",
        "var": "--fonts-mono",
        "varRef": "var(--fonts-mono)",
      },
      "letterSpacings.normal": Object {
        "value": "0",
        "var": "--letterSpacings-normal",
        "varRef": "var(--letterSpacings-normal)",
      },
      "letterSpacings.tight": Object {
        "value": "-0.025em",
        "var": "--letterSpacings-tight",
        "varRef": "var(--letterSpacings-tight)",
      },
      "letterSpacings.tighter": Object {
        "value": "-0.05em",
        "var": "--letterSpacings-tighter",
        "varRef": "var(--letterSpacings-tighter)",
      },
      "letterSpacings.wide": Object {
        "value": "0.025em",
        "var": "--letterSpacings-wide",
        "varRef": "var(--letterSpacings-wide)",
      },
      "letterSpacings.wider": Object {
        "value": "0.05em",
        "var": "--letterSpacings-wider",
        "varRef": "var(--letterSpacings-wider)",
      },
      "letterSpacings.widest": Object {
        "value": "0.1em",
        "var": "--letterSpacings-widest",
        "varRef": "var(--letterSpacings-widest)",
      },
      "lineHeights.10": Object {
        "value": "2.5rem",
        "var": "--lineHeights-10",
        "varRef": "var(--lineHeights-10)",
      },
      "lineHeights.3": Object {
        "value": ".75rem",
        "var": "--lineHeights-3",
        "varRef": "var(--lineHeights-3)",
      },
      "lineHeights.4": Object {
        "value": "1rem",
        "var": "--lineHeights-4",
        "varRef": "var(--lineHeights-4)",
      },
      "lineHeights.5": Object {
        "value": "1.25rem",
        "var": "--lineHeights-5",
        "varRef": "var(--lineHeights-5)",
      },
      "lineHeights.6": Object {
        "value": "1.5rem",
        "var": "--lineHeights-6",
        "varRef": "var(--lineHeights-6)",
      },
      "lineHeights.7": Object {
        "value": "1.75rem",
        "var": "--lineHeights-7",
        "varRef": "var(--lineHeights-7)",
      },
      "lineHeights.8": Object {
        "value": "2rem",
        "var": "--lineHeights-8",
        "varRef": "var(--lineHeights-8)",
      },
      "lineHeights.9": Object {
        "value": "2.25rem",
        "var": "--lineHeights-9",
        "varRef": "var(--lineHeights-9)",
      },
      "lineHeights.base": Object {
        "value": 1.5,
        "var": "--lineHeights-base",
        "varRef": "var(--lineHeights-base)",
      },
      "lineHeights.none": Object {
        "value": 1,
        "var": "--lineHeights-none",
        "varRef": "var(--lineHeights-none)",
      },
      "lineHeights.normal": Object {
        "value": "normal",
        "var": "--lineHeights-normal",
        "varRef": "var(--lineHeights-normal)",
      },
      "lineHeights.short": Object {
        "value": 1.375,
        "var": "--lineHeights-short",
        "varRef": "var(--lineHeights-short)",
      },
      "lineHeights.shorter": Object {
        "value": 1.25,
        "var": "--lineHeights-shorter",
        "varRef": "var(--lineHeights-shorter)",
      },
      "lineHeights.tall": Object {
        "value": 1.625,
        "var": "--lineHeights-tall",
        "varRef": "var(--lineHeights-tall)",
      },
      "lineHeights.taller": Object {
        "value": "2",
        "var": "--lineHeights-taller",
        "varRef": "var(--lineHeights-taller)",
      },
      "radii.2xl": Object {
        "value": "1rem",
        "var": "--radii-2xl",
        "varRef": "var(--radii-2xl)",
      },
      "radii.3xl": Object {
        "value": "1.5rem",
        "var": "--radii-3xl",
        "varRef": "var(--radii-3xl)",
      },
      "radii.base": Object {
        "value": "0.25rem",
        "var": "--radii-base",
        "varRef": "var(--radii-base)",
      },
      "radii.full": Object {
        "value": "9999px",
        "var": "--radii-full",
        "varRef": "var(--radii-full)",
      },
      "radii.lg": Object {
        "value": "0.5rem",
        "var": "--radii-lg",
        "varRef": "var(--radii-lg)",
      },
      "radii.md": Object {
        "value": "0.375rem",
        "var": "--radii-md",
        "varRef": "var(--radii-md)",
      },
      "radii.none": Object {
        "value": "0",
        "var": "--radii-none",
        "varRef": "var(--radii-none)",
      },
      "radii.sm": Object {
        "value": "0.125rem",
        "var": "--radii-sm",
        "varRef": "var(--radii-sm)",
      },
      "radii.xl": Object {
        "value": "0.75rem",
        "var": "--radii-xl",
        "varRef": "var(--radii-xl)",
      },
      "shadows.2xl": Object {
        "value": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "var": "--shadows-2xl",
        "varRef": "var(--shadows-2xl)",
      },
      "shadows.base": Object {
        "value": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "var": "--shadows-base",
        "varRef": "var(--shadows-base)",
      },
      "shadows.dark-lg": Object {
        "value": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
        "var": "--shadows-dark-lg",
        "varRef": "var(--shadows-dark-lg)",
      },
      "shadows.inner": Object {
        "value": "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
        "var": "--shadows-inner",
        "varRef": "var(--shadows-inner)",
      },
      "shadows.lg": Object {
        "value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "var": "--shadows-lg",
        "varRef": "var(--shadows-lg)",
      },
      "shadows.md": Object {
        "value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "var": "--shadows-md",
        "varRef": "var(--shadows-md)",
      },
      "shadows.none": Object {
        "value": "none",
        "var": "--shadows-none",
        "varRef": "var(--shadows-none)",
      },
      "shadows.outline": Object {
        "value": "0 0 0 3px rgba(66, 153, 225, 0.6)",
        "var": "--shadows-outline",
        "varRef": "var(--shadows-outline)",
      },
      "shadows.sm": Object {
        "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "var": "--shadows-sm",
        "varRef": "var(--shadows-sm)",
      },
      "shadows.xl": Object {
        "value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "var": "--shadows-xl",
        "varRef": "var(--shadows-xl)",
      },
      "shadows.xs": Object {
        "value": "0 0 0 1px rgba(0, 0, 0, 0.05)",
        "var": "--shadows-xs",
        "varRef": "var(--shadows-xs)",
      },
      "sizes.0": Object {
        "value": "0",
        "var": "--sizes-0",
        "varRef": "var(--sizes-0)",
      },
      "sizes.1": Object {
        "value": "0.25rem",
        "var": "--sizes-1",
        "varRef": "var(--sizes-1)",
      },
      "sizes.10": Object {
        "value": "2.5rem",
        "var": "--sizes-10",
        "varRef": "var(--sizes-10)",
      },
      "sizes.12": Object {
        "value": "3rem",
        "var": "--sizes-12",
        "varRef": "var(--sizes-12)",
      },
      "sizes.14": Object {
        "value": "3.5rem",
        "var": "--sizes-14",
        "varRef": "var(--sizes-14)",
      },
      "sizes.16": Object {
        "value": "4rem",
        "var": "--sizes-16",
        "varRef": "var(--sizes-16)",
      },
      "sizes.2": Object {
        "value": "0.5rem",
        "var": "--sizes-2",
        "varRef": "var(--sizes-2)",
      },
      "sizes.20": Object {
        "value": "5rem",
        "var": "--sizes-20",
        "varRef": "var(--sizes-20)",
      },
      "sizes.24": Object {
        "value": "6rem",
        "var": "--sizes-24",
        "varRef": "var(--sizes-24)",
      },
      "sizes.28": Object {
        "value": "7rem",
        "var": "--sizes-28",
        "varRef": "var(--sizes-28)",
      },
      "sizes.2xl": Object {
        "value": "42rem",
        "var": "--sizes-2xl",
        "varRef": "var(--sizes-2xl)",
      },
      "sizes.2xs": Object {
        "value": "16rem",
        "var": "--sizes-2xs",
        "varRef": "var(--sizes-2xs)",
      },
      "sizes.3": Object {
        "value": "0.75rem",
        "var": "--sizes-3",
        "varRef": "var(--sizes-3)",
      },
      "sizes.32": Object {
        "value": "8rem",
        "var": "--sizes-32",
        "varRef": "var(--sizes-32)",
      },
      "sizes.36": Object {
        "value": "9rem",
        "var": "--sizes-36",
        "varRef": "var(--sizes-36)",
      },
      "sizes.3xl": Object {
        "value": "48rem",
        "var": "--sizes-3xl",
        "varRef": "var(--sizes-3xl)",
      },
      "sizes.3xs": Object {
        "value": "14rem",
        "var": "--sizes-3xs",
        "varRef": "var(--sizes-3xs)",
      },
      "sizes.4": Object {
        "value": "1rem",
        "var": "--sizes-4",
        "varRef": "var(--sizes-4)",
      },
      "sizes.40": Object {
        "value": "10rem",
        "var": "--sizes-40",
        "varRef": "var(--sizes-40)",
      },
      "sizes.44": Object {
        "value": "11rem",
        "var": "--sizes-44",
        "varRef": "var(--sizes-44)",
      },
      "sizes.48": Object {
        "value": "12rem",
        "var": "--sizes-48",
        "varRef": "var(--sizes-48)",
      },
      "sizes.4xl": Object {
        "value": "56rem",
        "var": "--sizes-4xl",
        "varRef": "var(--sizes-4xl)",
      },
      "sizes.5": Object {
        "value": "1.25rem",
        "var": "--sizes-5",
        "varRef": "var(--sizes-5)",
      },
      "sizes.52": Object {
        "value": "13rem",
        "var": "--sizes-52",
        "varRef": "var(--sizes-52)",
      },
      "sizes.56": Object {
        "value": "14rem",
        "var": "--sizes-56",
        "varRef": "var(--sizes-56)",
      },
      "sizes.5xl": Object {
        "value": "64rem",
        "var": "--sizes-5xl",
        "varRef": "var(--sizes-5xl)",
      },
      "sizes.6": Object {
        "value": "1.5rem",
        "var": "--sizes-6",
        "varRef": "var(--sizes-6)",
      },
      "sizes.60": Object {
        "value": "15rem",
        "var": "--sizes-60",
        "varRef": "var(--sizes-60)",
      },
      "sizes.64": Object {
        "value": "16rem",
        "var": "--sizes-64",
        "varRef": "var(--sizes-64)",
      },
      "sizes.6xl": Object {
        "value": "72rem",
        "var": "--sizes-6xl",
        "varRef": "var(--sizes-6xl)",
      },
      "sizes.7": Object {
        "value": "1.75rem",
        "var": "--sizes-7",
        "varRef": "var(--sizes-7)",
      },
      "sizes.72": Object {
        "value": "18rem",
        "var": "--sizes-72",
        "varRef": "var(--sizes-72)",
      },
      "sizes.7xl": Object {
        "value": "80rem",
        "var": "--sizes-7xl",
        "varRef": "var(--sizes-7xl)",
      },
      "sizes.8": Object {
        "value": "2rem",
        "var": "--sizes-8",
        "varRef": "var(--sizes-8)",
      },
      "sizes.80": Object {
        "value": "20rem",
        "var": "--sizes-80",
        "varRef": "var(--sizes-80)",
      },
      "sizes.8xl": Object {
        "value": "90rem",
        "var": "--sizes-8xl",
        "varRef": "var(--sizes-8xl)",
      },
      "sizes.9": Object {
        "value": "2.25rem",
        "var": "--sizes-9",
        "varRef": "var(--sizes-9)",
      },
      "sizes.96": Object {
        "value": "24rem",
        "var": "--sizes-96",
        "varRef": "var(--sizes-96)",
      },
      "sizes.container.lg": Object {
        "value": "1024px",
        "var": "--sizes-container-lg",
        "varRef": "var(--sizes-container-lg)",
      },
      "sizes.container.md": Object {
        "value": "768px",
        "var": "--sizes-container-md",
        "varRef": "var(--sizes-container-md)",
      },
      "sizes.container.sm": Object {
        "value": "640px",
        "var": "--sizes-container-sm",
        "varRef": "var(--sizes-container-sm)",
      },
      "sizes.container.xl": Object {
        "value": "1280px",
        "var": "--sizes-container-xl",
        "varRef": "var(--sizes-container-xl)",
      },
      "sizes.full": Object {
        "value": "100%",
        "var": "--sizes-full",
        "varRef": "var(--sizes-full)",
      },
      "sizes.lg": Object {
        "value": "32rem",
        "var": "--sizes-lg",
        "varRef": "var(--sizes-lg)",
      },
      "sizes.max": Object {
        "value": "max-content",
        "var": "--sizes-max",
        "varRef": "var(--sizes-max)",
      },
      "sizes.md": Object {
        "value": "28rem",
        "var": "--sizes-md",
        "varRef": "var(--sizes-md)",
      },
      "sizes.min": Object {
        "value": "min-content",
        "var": "--sizes-min",
        "varRef": "var(--sizes-min)",
      },
      "sizes.px": Object {
        "value": "1px",
        "var": "--sizes-px",
        "varRef": "var(--sizes-px)",
      },
      "sizes.sm": Object {
        "value": "24rem",
        "var": "--sizes-sm",
        "varRef": "var(--sizes-sm)",
      },
      "sizes.xl": Object {
        "value": "36rem",
        "var": "--sizes-xl",
        "varRef": "var(--sizes-xl)",
      },
      "sizes.xs": Object {
        "value": "20rem",
        "var": "--sizes-xs",
        "varRef": "var(--sizes-xs)",
      },
      "space.0": Object {
        "value": "0",
        "var": "--space-0",
        "varRef": "var(--space-0)",
      },
      "space.1": Object {
        "value": "0.25rem",
        "var": "--space-1",
        "varRef": "var(--space-1)",
      },
      "space.10": Object {
        "value": "2.5rem",
        "var": "--space-10",
        "varRef": "var(--space-10)",
      },
      "space.12": Object {
        "value": "3rem",
        "var": "--space-12",
        "varRef": "var(--space-12)",
      },
      "space.14": Object {
        "value": "3.5rem",
        "var": "--space-14",
        "varRef": "var(--space-14)",
      },
      "space.16": Object {
        "value": "4rem",
        "var": "--space-16",
        "varRef": "var(--space-16)",
      },
      "space.2": Object {
        "value": "0.5rem",
        "var": "--space-2",
        "varRef": "var(--space-2)",
      },
      "space.20": Object {
        "value": "5rem",
        "var": "--space-20",
        "varRef": "var(--space-20)",
      },
      "space.24": Object {
        "value": "6rem",
        "var": "--space-24",
        "varRef": "var(--space-24)",
      },
      "space.28": Object {
        "value": "7rem",
        "var": "--space-28",
        "varRef": "var(--space-28)",
      },
      "space.3": Object {
        "value": "0.75rem",
        "var": "--space-3",
        "varRef": "var(--space-3)",
      },
      "space.32": Object {
        "value": "8rem",
        "var": "--space-32",
        "varRef": "var(--space-32)",
      },
      "space.36": Object {
        "value": "9rem",
        "var": "--space-36",
        "varRef": "var(--space-36)",
      },
      "space.4": Object {
        "value": "1rem",
        "var": "--space-4",
        "varRef": "var(--space-4)",
      },
      "space.40": Object {
        "value": "10rem",
        "var": "--space-40",
        "varRef": "var(--space-40)",
      },
      "space.44": Object {
        "value": "11rem",
        "var": "--space-44",
        "varRef": "var(--space-44)",
      },
      "space.48": Object {
        "value": "12rem",
        "var": "--space-48",
        "varRef": "var(--space-48)",
      },
      "space.5": Object {
        "value": "1.25rem",
        "var": "--space-5",
        "varRef": "var(--space-5)",
      },
      "space.52": Object {
        "value": "13rem",
        "var": "--space-52",
        "varRef": "var(--space-52)",
      },
      "space.56": Object {
        "value": "14rem",
        "var": "--space-56",
        "varRef": "var(--space-56)",
      },
      "space.6": Object {
        "value": "1.5rem",
        "var": "--space-6",
        "varRef": "var(--space-6)",
      },
      "space.60": Object {
        "value": "15rem",
        "var": "--space-60",
        "varRef": "var(--space-60)",
      },
      "space.64": Object {
        "value": "16rem",
        "var": "--space-64",
        "varRef": "var(--space-64)",
      },
      "space.7": Object {
        "value": "1.75rem",
        "var": "--space-7",
        "varRef": "var(--space-7)",
      },
      "space.72": Object {
        "value": "18rem",
        "var": "--space-72",
        "varRef": "var(--space-72)",
      },
      "space.8": Object {
        "value": "2rem",
        "var": "--space-8",
        "varRef": "var(--space-8)",
      },
      "space.80": Object {
        "value": "20rem",
        "var": "--space-80",
        "varRef": "var(--space-80)",
      },
      "space.9": Object {
        "value": "2.25rem",
        "var": "--space-9",
        "varRef": "var(--space-9)",
      },
      "space.96": Object {
        "value": "24rem",
        "var": "--space-96",
        "varRef": "var(--space-96)",
      },
      "space.px": Object {
        "value": "1px",
        "var": "--space-px",
        "varRef": "var(--space-px)",
      },
      "zIndices.auto": Object {
        "value": "auto",
        "var": "--zIndices-auto",
        "varRef": "var(--zIndices-auto)",
      },
      "zIndices.banner": Object {
        "value": 1200,
        "var": "--zIndices-banner",
        "varRef": "var(--zIndices-banner)",
      },
      "zIndices.base": Object {
        "value": 0,
        "var": "--zIndices-base",
        "varRef": "var(--zIndices-base)",
      },
      "zIndices.docked": Object {
        "value": 10,
        "var": "--zIndices-docked",
        "varRef": "var(--zIndices-docked)",
      },
      "zIndices.dropdown": Object {
        "value": 1000,
        "var": "--zIndices-dropdown",
        "varRef": "var(--zIndices-dropdown)",
      },
      "zIndices.hide": Object {
        "value": -1,
        "var": "--zIndices-hide",
        "varRef": "var(--zIndices-hide)",
      },
      "zIndices.modal": Object {
        "value": 1400,
        "var": "--zIndices-modal",
        "varRef": "var(--zIndices-modal)",
      },
      "zIndices.overlay": Object {
        "value": 1300,
        "var": "--zIndices-overlay",
        "varRef": "var(--zIndices-overlay)",
      },
      "zIndices.popover": Object {
        "value": 1500,
        "var": "--zIndices-popover",
        "varRef": "var(--zIndices-popover)",
      },
      "zIndices.skipLink": Object {
        "value": 1600,
        "var": "--zIndices-skipLink",
        "varRef": "var(--zIndices-skipLink)",
      },
      "zIndices.sticky": Object {
        "value": 1100,
        "var": "--zIndices-sticky",
        "varRef": "var(--zIndices-sticky)",
      },
      "zIndices.toast": Object {
        "value": 1700,
        "var": "--zIndices-toast",
        "varRef": "var(--zIndices-toast)",
      },
      "zIndices.tooltip": Object {
        "value": 1800,
        "var": "--zIndices-tooltip",
        "varRef": "var(--zIndices-tooltip)",
      },
    }
  `)
})
