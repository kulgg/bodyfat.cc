export function footToCm(foot: number, inches: number): number {
  return 30.48 * foot + inchesToCm(inches);
}

export function footToInches(foot: number): number {
  return 12 * foot;
}

export function inchesToCm(inches: number) {
  return 2.54 * inches;
}

export function poundsToKg(pounds: number) {
  return 0.453592 * pounds;
}

export function toFeet(cm: number): number[] {
  var realFeet = (cm * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return [feet, inches];
}

export function toPounds(kg: number) {
  return 2.20462 * kg;
}

export function toInches(cm: number) {
  return 0.393701 * cm;
}
