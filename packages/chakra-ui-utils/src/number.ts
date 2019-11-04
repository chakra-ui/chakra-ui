import prettyNum, { PRECISION_SETTING } from "pretty-num";

export function isNumberKey(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;
  if (event.key === ".") return true;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

export function preventNonNumberKey(event: KeyboardEvent) {
  if (!isNumberKey(event)) {
    event.preventDefault();
  }
}

export function roundToPrecision(value: number, precision: number) {
  return prettyNum(value, {
    precision,
    precisionSetting: PRECISION_SETTING.FIXED,
  });
}

export function calculatePrecision(value: number) {
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
  if (!groups) {
    return 0;
  }
  if (groups[1]) {
    return -groups[1].length;
  }
  if (groups[2]) {
    return groups[2].length;
  }
  return 0;
}
