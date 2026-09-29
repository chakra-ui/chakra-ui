import { badgeRecipe } from "./recipes/badge.ts"
import { buttonRecipe } from "./recipes/button.ts"
import { checkmarkRecipe } from "./recipes/checkmark.ts"
import { codeRecipe } from "./recipes/code.ts"
import { colorSwatchRecipe } from "./recipes/color-swatch.ts"
import { containerRecipe } from "./recipes/container.ts"
import { headingRecipe } from "./recipes/heading.ts"
import { iconRecipe } from "./recipes/icon.ts"
import { inputAddonRecipe } from "./recipes/input-addon.ts"
import { inputRecipe } from "./recipes/input.ts"
import { kbdRecipe } from "./recipes/kbd.ts"
import { linkRecipe } from "./recipes/link.ts"
import { markRecipe } from "./recipes/mark.ts"
import { radiomarkRecipe } from "./recipes/radiomark.ts"
import { separatorRecipe } from "./recipes/separator.ts"
import { skeletonRecipe } from "./recipes/skeleton.ts"
import { skipNavLinkRecipe } from "./recipes/skip-nav-link.ts"
import { spinnerRecipe } from "./recipes/spinner.ts"
import { textareaRecipe } from "./recipes/textarea.ts"

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
  checkmark: checkmarkRecipe,
  radiomark: radiomarkRecipe,
  colorSwatch: colorSwatchRecipe,
}
