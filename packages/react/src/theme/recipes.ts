import { badgeRecipe } from "./recipes/badge"
import { buttonRecipe } from "./recipes/button"
import { checkmarkRecipe } from "./recipes/checkmark"
import { codeRecipe } from "./recipes/code"
import { containerRecipe } from "./recipes/container"
import { separatorRecipe } from "./recipes/divider"
import { errorMessageRecipe } from "./recipes/error-message"
import { fieldRecipe } from "./recipes/field"
import { headingRecipe } from "./recipes/heading"
import { helpTextRecipe } from "./recipes/help-text"
import { iconRecipe } from "./recipes/icon"
import { inputRecipe } from "./recipes/input"
import { inputAddonRecipe } from "./recipes/input-addon"
import { kbdRecipe } from "./recipes/kbd"
import { labelRecipe } from "./recipes/label"
import { linkRecipe } from "./recipes/link"
import { markRecipe } from "./recipes/mark"
import { radiomarkRecipe } from "./recipes/radiomark"
import { skeletonRecipe } from "./recipes/skeleton"
import { skipNavLinkRecipe } from "./recipes/skip-nav-link"
import { spinnerRecipe } from "./recipes/spinner"
import { textareaRecipe } from "./recipes/textarea"

export const recipes = {
  badge: badgeRecipe,
  button: buttonRecipe,
  code: codeRecipe,
  container: containerRecipe,
  heading: headingRecipe,
  input: inputRecipe,
  inputAddon: inputAddonRecipe,
  kbd: kbdRecipe,
  link: linkRecipe,
  mark: markRecipe,
  separator: separatorRecipe,
  skeleton: skeletonRecipe,
  skipNavLink: skipNavLinkRecipe,
  spinner: spinnerRecipe,
  textarea: textareaRecipe,
  icon: iconRecipe,
  field: fieldRecipe,
  errorMessage: errorMessageRecipe,
  helpText: helpTextRecipe,
  label: labelRecipe,
  checkmark: checkmarkRecipe,
  radiomark: radiomarkRecipe,
}
