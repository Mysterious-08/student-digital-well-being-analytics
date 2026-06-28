export interface PredictionInput {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  academicLevel: 'High School' | 'Undergraduate' | 'Postgraduate';
  dailyUsageHours: number;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Reddit' | 'Snapchat' | 'Twitter/X' | 'Other';
  sleepHours: number;
  mentalHealthScore: number; // 1 to 10 scale
  academicPerformance: 'Excellent' | 'Good' | 'Average' | 'Below Average';
  conflictLevel: 'Low' | 'Medium' | 'High';
}

export interface WellBeingReport {
  score: number; // 0 - 100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  behaviorAnalysis: string;
  topFactors: Array<{
    factor: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    description: string;
    percentage: number;
  }>;
  recommendations: string[];
}
