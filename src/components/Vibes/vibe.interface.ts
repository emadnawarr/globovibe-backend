import { Country } from "../Country/country.interface";

export interface Vibe {
  id: number;
  type: string;
  intensity: number;
  date: Date;
  country_id: number;
  event_id: number;
}

export interface ISentimentAnalysis {
  positiveTotalIntensity: number;
  negativeTotalIntensity: number;
  neutralTotalIntensity: number;
  dominantSentiment: {
    type: string;
    intensityScore: number;
    percentage: number;
  };
  percentageBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface IVibesResponse {
  vibes: Vibe[];
  country: Country;
  sentimentAnalysisForCountry: ISentimentAnalysis;
}
