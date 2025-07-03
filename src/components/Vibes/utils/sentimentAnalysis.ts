import { ISentimentAnalysis, Vibe } from "../vibe.interface";

export const generateSentimentAnalysis = (
  vibes: Vibe[]
): ISentimentAnalysis => {
  const Positives = vibes.filter((vibe) => vibe.type === "Positive");
  const Negatives = vibes.filter((vibe) => vibe.type === "Negative");
  const Neutrals = vibes.filter((vibe) => vibe.type === "Neutral");

  const positiveIntensity = Positives.reduce(
    (sum, positiveVibe) => sum + positiveVibe.intensity,
    0
  );
  const negativeIntensity = Negatives.reduce(
    (sum, negativeVibe) => sum + negativeVibe.intensity,
    0
  );
  const neutralIntensity = Neutrals.reduce(
    (sum, neutralVibe) => sum + neutralVibe.intensity,
    0
  );

  const totalIntensity =
    positiveIntensity + negativeIntensity + neutralIntensity;

  const percentageBreakdown = {
    positive:
      totalIntensity === 0
        ? 0
        : +((positiveIntensity / totalIntensity) * 100).toFixed(2),
    negative:
      totalIntensity === 0
        ? 0
        : +((negativeIntensity / totalIntensity) * 100).toFixed(2),
    neutral:
      totalIntensity === 0
        ? 0
        : +((neutralIntensity / totalIntensity) * 100).toFixed(2),
  };

  let dominantSentiment = {
    type: "Neutral",
    intensityScore: 0,
    percentage: 0,
  };

  if (positiveIntensity >= negativeIntensity) {
    dominantSentiment.type = "Positive";
    dominantSentiment.intensityScore = positiveIntensity;
    dominantSentiment.percentage = percentageBreakdown.positive;
  } else if (negativeIntensity > positiveIntensity) {
    dominantSentiment.type = "Negative";
    dominantSentiment.intensityScore = negativeIntensity;
    dominantSentiment.percentage = percentageBreakdown.negative;
  }
  if (neutralIntensity >= dominantSentiment.intensityScore) {
    dominantSentiment.type = "Neutral";
    dominantSentiment.intensityScore = neutralIntensity;
    dominantSentiment.percentage = percentageBreakdown.neutral;
  }

  return {
    positiveTotalIntensity: positiveIntensity,
    negativeTotalIntensity: negativeIntensity,
    neutralTotalIntensity: neutralIntensity,
    dominantSentiment,
    percentageBreakdown,
  };
};
