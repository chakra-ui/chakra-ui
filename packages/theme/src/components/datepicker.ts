import { HTMLChakraProps } from "@chakra-ui/system"
import { mode } from "@chakra-ui/theme-tools"
import { Dict } from "@chakra-ui/utils"

const parts = [
  "button",
  "closeButton",
  "container",
  "dayBase",
  "dayBaseContainer",
  "dayDisabled",
  "dayDisabledContainer",
  "dayHoverRange",
  "dayHoverRangeContainer",
  "dayNormal",
  "dayNormalContainer",
  "daySelected",
  "daySelectedContainer",
  "daySelectedEnd",
  "daySelectedEndContainer",
  "daySelectedStart",
  "daySelectedStartContainer",
  "daySelectedStartOrEnd",
  "daySelectedStartOrEndContainer",
  "footer",
  "monthContainer",
  "monthLabel",
  "monthsContainer",
  "nextButton",
  "previousButton",
  "resetButton",
  "weekdayLabel",
]

type StyleFn = (props: Dict) => HTMLChakraProps<"div">

const container: StyleFn = (props) => ({
  minWidth: "max-content",
  bg: mode("white", "gray.700")(props),
  borderRadius: "md",
  shadow: "md",
  px: [3, 5],
  py: [3, 5],
})

const header: StyleFn = () => ({
  display: "flex",
  justifyContent: "space-between",
  mb: 4,
})

const footer: StyleFn = () => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: [2, 4],
})

const buttonsContainer: StyleFn = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: [2, 3],
})

const closeButton: StyleFn = () => ({})

const monthsContainer: StyleFn = () => ({
  display: "flex",
  gridGap: 4,
  flexDir: ["column", "row"],
})

const monthContainer: StyleFn = () => ({})

const monthLabel: StyleFn = (props) => ({
  justifyContent: "center",
  textAlign: "center",
  fontWeight: "bold",
  color: mode("gray.900", "white")(props),
  mb: [2, 4],
  fontSize: ["md", "lg"],
  display: "flex",
  flex: 1,
})

const weekdayLabel: StyleFn = (props) => ({
  justifyContent: "center",
  color: mode("gray.500", "gray.500")(props),
  mb: [2, 4],
  fontSize: ["sm", "md"],
})

const dayBase: StyleFn = () => ({
  height: ["32px", "48px"],
  width: ["32px", "48px"],
  outline: "none",
  fontSize: ["sm", "md"],
  fontWeight: "medium",
  border: "2px solid",
  borderColor: "transparent",
  borderRadius: "100%",
  overflow: "hidden",
})

const dayBaseContainer: StyleFn = () => ({
  height: ["32px", "48px"],
  width: ["32px", "48px"],
})

const dayDisabled: StyleFn = (props) => ({
  color: mode("gray.400", "gray.600")(props),
})

const dayDisabledContainer: StyleFn = () => ({})

const dayToday: StyleFn = (props) => ({
  borderRadius: "100%",
  border: "2px solid",
  borderColor: mode("blue.300", "whiteAlpha.600")(props),
})
const dayTodayContainer: StyleFn = () => ({})

const dayNormal: StyleFn = (props) => ({
  border: "2px solid",
  color: mode("gray.900", "white")(props),
  _hover: {
    borderColor: mode("black", "white")(props),
    bg: "transparent",
  },
  _focus: {
    borderRadius: "100%",
    borderColor: mode("black", "white")(props),
  },
})

const dayNormalContainer: StyleFn = () => ({
  _hover: {
    borderRightRadius: "100%",
  },
})

const dayHoverRange: StyleFn = (props) => ({
  bg: mode("gray.100", "gray.800")(props),
  border: "2px solid",
  _hover: {
    borderRadius: "100%",
    borderColor: mode("black", "white")(props),
  },
})

const dayHoverRangeContainer: StyleFn = (props) => ({
  bg: mode("gray.100", "gray.800")(props),
  _hover: {
    borderRightRadius: "100%",
  },
})

const daySelected: StyleFn = (props) => ({
  border: "2px solid",
  _hover: {
    borderRadius: "100%",
    borderColor: mode("black", "white")(props),
  },
})

const daySelectedContainer: StyleFn = (props) => ({
  bg: mode("gray.100", "gray.800")(props),
  _hover: {
    borderRightRadius: "0%",
  },
})

const daySelectedStartOrEnd: StyleFn = (props) => ({
  color: mode("white", "black")(props),
  bg: mode("black", "white")(props),
  borderRadius: "100%",
  _hover: {
    color: mode("white", "black")(props),
    bg: mode("black", "white")(props),
  },
})

const daySelectedStartOrEndContainer: StyleFn = () => ({
  borderRadius: "0",
})

const daySelectedStart: StyleFn = () => ({})

const daySelectedStartContainer: StyleFn = () => ({
  borderRadius: "unset",
  borderLeftRadius: "100%",
})

const daySelectedEnd: StyleFn = () => ({})

const daySelectedEndContainer: StyleFn = () => ({
  borderRadius: "unset",
  borderRightRadius: "100%",
  _hover: {
    borderRightRadius: "100%",
  },
})

const baseStyle = (props: Dict) => ({
  closeButton: closeButton(props),
  container: container(props),
  dayBase: dayBase(props),
  dayBaseContainer: dayBaseContainer(props),
  dayDisabled: dayDisabled(props),
  dayDisabledContainer: dayDisabledContainer(props),
  dayToday: dayToday(props),
  dayTodayContainer: dayTodayContainer(props),
  dayHoverRange: dayHoverRange(props),
  dayHoverRangeContainer: dayHoverRangeContainer(props),
  dayNormal: dayNormal(props),
  dayNormalContainer: dayNormalContainer(props),
  daySelected: daySelected(props),
  daySelectedContainer: daySelectedContainer(props),
  daySelectedEnd: daySelectedEnd(props),
  daySelectedEndContainer: daySelectedEndContainer(props),
  daySelectedStart: daySelectedStart(props),
  daySelectedStartContainer: daySelectedStartContainer(props),
  daySelectedStartOrEnd: daySelectedStartOrEnd(props),
  daySelectedStartOrEndContainer: daySelectedStartOrEndContainer(props),
  header: header(props),
  footer: footer(props),
  monthContainer: monthContainer(props),
  monthLabel: monthLabel(props),
  monthsContainer: monthsContainer(props),
  weekdayLabel: weekdayLabel(props),
  buttonsContainer: buttonsContainer(props),
})

export default {
  parts,
  baseStyle,
}
