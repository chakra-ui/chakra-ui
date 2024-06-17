/* eslint-disable no-control-regex */
const rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|^-|[^\x80-\uFFFF\w-]/g
const fcssescape = function (ch: string, asCodePoint: string) {
  if (!asCodePoint) return "\\" + ch
  if (ch === "\0") return "\uFFFD"
  if (ch === "-" && ch.length === 1) return "\\-"
  return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + ""
}
export const esc = (sel: string) => {
  return (sel + "").replace(rcssescape, fcssescape)
}
