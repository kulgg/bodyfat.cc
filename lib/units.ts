export interface UnitConfiguration {
  metric_name: string;
  imperial_name: string;
}

const map = new Map<string, UnitConfiguration>([
  [
    "height",
    {
      metric_name: "cm",
      imperial_name: "foot and inches",
    },
  ],
  [
    "weight",
    {
      metric_name: "kg",
      imperial_name: "lbs",
    },
  ],
  [
    "neck",
    {
      metric_name: "cm",
      imperial_name: "inches",
    },
  ],
  [
    "belly",
    {
      metric_name: "cm",
      imperial_name: "inches",
    },
  ],
  [
    "waist",
    {
      metric_name: "cm",
      imperial_name: "inches",
    },
  ],
  [
    "hip",
    {
      metric_name: "cm",
      imperial_name: "inches",
    },
  ],
]);

export function getUnitName(name: string, unitSystem: "metric" | "imperial") {
  return unitSystem === "metric"
    ? map.get(name)?.metric_name
    : map.get(name)?.imperial_name;
}
