export function getInitials(name: string) {
  const names = name.trim().split(" ")
  const firstName = names[0] ?? ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}
