const lengthUnits =
  "cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%"
const lengthUnitsPattern = `(?:${lengthUnits.split(",").join("|")})`
const lengthRegExp = new RegExp(
  `^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`,
)

export const isCssUnit = (v: unknown) =>
  typeof v === "string" && lengthRegExp.test(v)
