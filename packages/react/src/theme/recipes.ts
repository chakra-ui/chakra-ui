import { badgeRecipe } from "./recipes/badge"
import { buttonRecipe } from "./recipes/button"
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
import { pinInputRecipe } from "./recipes/pin-input"
import { skeletonRecipe } from "./recipes/skeleton"
import { skipLinkRecipe } from "./recipes/skip-link"
import { spinnerRecipe } from "./recipes/spinner"
import { textareaRecipe } from "./recipes/textarea"

export const recipes = {
  Badge: badgeRecipe,
  Button: buttonRecipe,
  Code: codeRecipe,
  Container: containerRecipe,
  Heading: headingRecipe,
  Input: inputRecipe,
  InputAddon: inputAddonRecipe,
  Kbd: kbdRecipe,
  Link: linkRecipe,
  Mark: markRecipe,
  PinInput: pinInputRecipe,
  Separator: separatorRecipe,
  Skeleton: skeletonRecipe,
  SkipLink: skipLinkRecipe,
  Spinner: spinnerRecipe,
  Textarea: textareaRecipe,
  Icon: iconRecipe,
  Field: fieldRecipe,
  ErrorMessage: errorMessageRecipe,
  HelpText: helpTextRecipe,
  Label: labelRecipe,
}
