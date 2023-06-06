export enum Sex {
  MALE,
  FEMALE,
}

interface GeneralMeasurement {
  height: number;
  height_inches?: number;
  weight: number;
  neck: number;
}

interface MaleMeasurement extends GeneralMeasurement {
  sex: Sex.MALE;
  belly: number;
  waist?: never;
  hip?: never;
}

interface FemaleMeasurement extends GeneralMeasurement {
  sex: Sex.FEMALE;
  belly?: never;
  waist: number;
  hip: number;
}

export interface Entry {
  created: string;
  metric_measurement: MaleMeasurement | FemaleMeasurement;
  imperial_measurement: MaleMeasurement | FemaleMeasurement;
}
