interface GeneralMeasurement {
  height: number;
  weight: number;
  neck: number;
}

interface MaleMeasurement extends GeneralMeasurement {
  belly: number;
}

interface FemaleMeasurement extends GeneralMeasurement {
  waist: number;
  hip: number;
}

interface Entry {
  created: Date;
  measurement: MaleMeasurement | FemaleMeasurement;
}
