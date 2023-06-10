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

export interface LocaleDictionary {
  title: string;
  description: string;
  general: {
    history: string;
    date: string;
    bodyfat: string;
    sex: string;
    male: string;
    female: string;
    height: string;
    weight: string;
    neck: string;
    belly: string;
    waist: string;
    hip: string;
    metric: string;
    imperial: string;
  };
  forms: {
    cta: string;
    neck_description: string;
    waist_description: string;
    hip_description: string;
    belly_description: string;
    error_messages: {
      required: string;
      number: string;
    };
    result_message: string;
  };
  about: {
    formula: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    accuracy: {
      title: string;
      description: string;
    };
    free: {
      title: string;
      description: string;
    };
    opensource: {
      title: string;
      description: string;
    };
  };
}
