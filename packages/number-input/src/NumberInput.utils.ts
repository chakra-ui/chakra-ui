const FLOATING_POINT_NUMBER_CHARACTER_REGEX = /^[Ee0-9\+\-\.]$/

// https://www.w3.org/TR/2012/WD-html-markup-20120329/datatypes.html#common.data.float
export function isFloatingPointNumericCharacter(character: string) {
  return FLOATING_POINT_NUMBER_CHARACTER_REGEX.test(character)
}

export function isValidNumericKeyboardEvent(event: React.KeyboardEvent) {
  if (event.key == null) return true

  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
  if (isModifierKey) return true

  const isSingleCharacterKey = event.key.length === 1
  if (!isSingleCharacterKey) return true

  return isFloatingPointNumericCharacter(event.key)
}
