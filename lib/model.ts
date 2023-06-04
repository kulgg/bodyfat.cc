export enum Sex {
  MALE,
  FEMALE,
}

interface GeneralMeasurement {
  height: number;
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
  measurement: MaleMeasurement | FemaleMeasurement;
}
