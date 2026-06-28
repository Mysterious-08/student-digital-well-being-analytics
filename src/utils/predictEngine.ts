import { PredictionInput, WellBeingReport } from '../types';

export function calculateWellBeingReport(input: PredictionInput): WellBeingReport {
  // 1. Calculate Score (starts at 100, drops based on bad indicators)
  let score = 95;

  // Social Usage Penalty (0 to 18 hours scale)
  if (input.dailyUsageHours > 8) {
    score -= 35;
  } else if (input.dailyUsageHours > 5) {
    score -= 20;
  } else if (input.dailyUsageHours > 3) {
    score -= 8;
  }

  // Sleep Penalty
  if (input.sleepHours < 5) {
    score -= 25;
  } else if (input.sleepHours < 7) {
    score -= 12;
  } else if (input.sleepHours > 9.5) {
    score -= 5; // Oversleeping friction
  }

  // Mental Health (1 to 10 score)
  const mentalPenalty = (10 - input.mentalHealthScore) * 4;
  score -= mentalPenalty;

  // Academic Performance Adjustment
  if (input.academicPerformance === 'Below Average') {
    score -= 15;
  } else if (input.academicPerformance === 'Average') {
    score -= 8;
  } else if (input.academicPerformance === 'Excellent') {
    score += 5; // Bonus
  }

  // Screen-time Conflict
  if (input.conflictLevel === 'High') {
    score -= 15;
  } else if (input.conflictLevel === 'Medium') {
    score -= 7;
  }

  // Bound the score between 5 and 100
  score = Math.max(5, Math.min(100, score));
  score = Math.round(score);

  // 2. Risk Level Classifications
  let riskLevel: WellBeingReport['riskLevel'] = 'Low';
  if (score < 40) {
    riskLevel = 'Severe';
  } else if (score < 60) {
    riskLevel = 'High';
  } else if (score < 80) {
    riskLevel = 'Moderate';
  }

  // 3. Behavioral Cohort Narrative
  let behaviorAnalysis = '';
  if (riskLevel === 'Severe' || riskLevel === 'High') {
    behaviorAnalysis = `Your indicators flag a significant hyper-dependence on ${input.platform}. With ${input.dailyUsageHours} hours of social media usage daily paired with only ${input.sleepHours} hours of rest, you are accumulating substantial sleep debt. This severe displacement ratio leads directly to attention residue and triggers a subjective mental standing score of ${input.mentalHealthScore}/10. The heightened conflict level (${input.conflictLevel}) indicates digital habits are causing visible relational strain.`;
  } else if (riskLevel === 'Moderate') {
    behaviorAnalysis = `Your routine demonstrates moderate digital friction. While your sleep of ${input.sleepHours} hours is borderline healthy, your screen engagement on ${input.platform} is displacing optimal recovery. There is notable friction in academic/relational fields, which creates mild anxiety. Restructuring notification patterns will facilitate a path back to low-risk baseline statuses easily.`;
  } else {
    behaviorAnalysis = `Your digital lifestyle is highly balanced and optimized! A daily screen interaction of ${input.dailyUsageHours} hours leaves plenty of biological bandwidth for healthy sleep (${input.sleepHours} hours) and excellent academic focusing. Relational conflicts are low, ensuring your overall cognitive load is maintained at clean, restorative baselines.`;
  }

  // 4. Feature Significances
  const topFactors: WellBeingReport['topFactors'] = [
    {
      factor: 'Screen-to-Sleep Ratio',
      impact: input.dailyUsageHours > 6 || input.sleepHours < 6 ? 'Negative' : 'Positive',
      description: `Daily screen engagement of ${input.dailyUsageHours} hrs compared against a sleep duration of ${input.sleepHours} hrs.`,
      percentage: Math.round(35 + (input.dailyUsageHours / 2)),
    },
    {
      factor: 'Neuro-Psychological Stress',
      impact: input.mentalHealthScore < 6 ? 'Negative' : 'Positive',
      description: `Subjective stress index evaluated at ${input.mentalHealthScore}/10 relative to cognitive restoration.`,
      percentage: Math.round(25 + (10 - input.mentalHealthScore) * 3),
    },
    {
      factor: 'Academic Cognitive Overhead',
      impact: input.academicPerformance === 'Below Average' || input.academicPerformance === 'Average' ? 'Negative' : 'Positive',
      description: `Interference of screen-induced attention residue with standard ${input.academicPerformance} academic capacities.`,
      percentage: 20,
    },
    {
      factor: 'Social Relational Friction',
      impact: input.conflictLevel !== 'Low' ? 'Negative' : 'Neutral',
      description: `Active screen-time related debates causing ${input.conflictLevel.toLowerCase()} levels of household arguments.`,
      percentage: 15,
    },
  ];

  // 5. Recommendations
  const recommendations: string[] = [];
  if (input.dailyUsageHours > 5) {
    recommendations.push(`Establish a hard cap of ${Math.round(input.dailyUsageHours * 0.7)} hours daily for social media apps. Set system screen-time timers on ${input.platform}.`);
  } else {
    recommendations.push(`Keep maintaining your clean, structured limits on ${input.platform}.`);
  }

  if (input.sleepHours < 7) {
    recommendations.push(`Initiate a "Digital Sunset" rule: All screens must be powered off exactly 60 minutes before bed. Swap ${input.platform} scrolling with lightweight physical reading.`);
  }

  if (input.conflictLevel === 'High' || input.conflictLevel === 'Medium') {
    recommendations.push('Create physical screen-free family zones, especially during breakfast/dinner hours, to alleviate friction and restore mutual communication.');
  }

  if (input.academicPerformance === 'Below Average' || input.academicPerformance === 'Average') {
    recommendations.push('Employ the Pomodoro technique (25m focus / 5m off) with your phone placed in a separate physical room to rebuild deep intellectual focus capacities.');
  }

  recommendations.push('Track subjective cognitive recovery scores weekly. If focus continues to decrease, consult your educational guidance counselor.');

  return {
    score,
    riskLevel,
    behaviorAnalysis,
    topFactors,
    recommendations,
  };
}
