const shadows = {
  keyline: "0 0 0 1px #e3e8ee",
  sm: " 0 2px 5px 0 rgba(60,66,87, .12), 0 1px 1px 0 rgba(0,0,0, .12)",
  md: "0 7px 14px 0 rgba(60,66,87, .12), 0 3px 6px 0 rgba(0,0,0, .12)",
  lg: "0 15px 35px 0 rgba(60,66,87, .12), 0 5px 15px 0 rgba(0,0,0, .12)",
  xl:
    "0 50px 100px 0 rgba(60,66,87, .12), 0 15px 35px 0 rgba(60,66,87, .12), 0 5px 15px 0 rgba(0,0,0, .12)",
  focusring:
    " 0 0 0 4px rgba(58,151,212, .28), 0 0 1px 1px rgba(7,89,150, .36)",
}

export type Shadows = typeof shadows

export default shadows
