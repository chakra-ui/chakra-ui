import foundations from "./foundations"
import components, {
  accordionStyles,
  buttonStyles,
  headingStyles,
  breadcrumbStyles,
  alertStyles,
  badgeStyles,
  avatarStyles,
  linkStyles,
  codeStyles,
  formLabelStyles,
  spinnerStyles,
  drawerStyles,
  menuStyles,
  tabsStyles,
  checkboxStyles,
  radioStyles,
  inputStyles,
  tooltipStyles,
  closeButtonStyles,
  sliderStyles,
  numberInputStyles,
  switchStyles,
  tagStyles,
  modalStyles,
  kbdStyles,
  selectStyles,
  textareaStyles,
  pinInputStyles,
  popoverStyles,
  formStyles,
  editableStyles,
  progressStyles,
  statStyles,
  skeletonStyles,
  skipLinkStyles,
} from "./components"
import styles from "./styles"
import { ColorModeOptions } from "@chakra-ui/system"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

export const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme

export {
  accordionStyles,
  buttonStyles,
  headingStyles,
  breadcrumbStyles,
  alertStyles,
  badgeStyles,
  avatarStyles,
  linkStyles,
  codeStyles,
  formLabelStyles,
  spinnerStyles,
  drawerStyles,
  menuStyles,
  tabsStyles,
  checkboxStyles,
  radioStyles,
  inputStyles,
  tooltipStyles,
  closeButtonStyles,
  sliderStyles,
  numberInputStyles,
  switchStyles,
  tagStyles,
  modalStyles,
  kbdStyles,
  selectStyles,
  textareaStyles,
  pinInputStyles,
  popoverStyles,
  formStyles,
  editableStyles,
  progressStyles,
  statStyles,
  skeletonStyles,
  skipLinkStyles,
}
