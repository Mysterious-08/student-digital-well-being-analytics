import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { PageTransition } from '../components/PageTransition';
import { SectionTitle } from '../components/SectionTitle';
import { DashboardCard } from '../components/DashboardCard';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';
import { 
  Filter, 
  Smartphone, 
  Moon, 
  Activity, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  LayoutGrid, 
  Calendar,
  Grid
} from 'lucide-react';

interface StudentRecord {
  id?: number;
  Age: number;
  Gender: string;
  Academic_Level: string;
  Country: string;
  Governorate: string;
  Avg_Daily_Usage_Hours: number;
  Most_Used_Platform: string;
  Affects_Academic_Performance: string;
  Sleep_Hours_Per_Night: number;
  Mental_Health_Score: number;
  Relationship_Status: string;
  Conflicts_Over_Social_Media: number;
  Addicted_Score: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  dailyUsage: number;
  sleepHours: number;
  mentalHealth: number;
  conflicts: number;
}

export const Dashboard: React.FC = () => {
  // State for parsed dataset
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters State
  const [filters, setFilters] = useState({
    platform: 'All',
    academicLevel: 'All',
    riskSegment: 'All',
  });

  // Load and Parse dataset using PapaParse
  useEffect(() => {
    fetch('./Egypt_Social_Media_Addiction_12038_train.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data.map((row: any, index: number) => {
              const addictedScore = Number(row.Addicted_Score) || 5;
              let riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe' = 'Low';
              if (addictedScore >= 8) riskLevel = 'Severe';
              else if (addictedScore >= 6) riskLevel = 'High';
              else if (addictedScore >= 4) riskLevel = 'Moderate';

              return {
                ...row,
                id: index,
                riskLevel,
                dailyUsage: Number(row.Avg_Daily_Usage_Hours) || 0,
                sleepHours: Number(row.Sleep_Hours_Per_Night) || 0,
                mentalHealth: Number(row.Mental_Health_Score) || 5,
                conflicts: Number(row.Conflicts_Over_Social_Media) || 1,
              };
            });
            setRecords(parsed);
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        console.error('Error fetching or parsing CSV dataset:', err);
        setLoading(false);
      });
  }, []);

  const handleResetFilters = () => {
    setFilters({
      platform: 'All',
      academicLevel: 'All',
      riskSegment: 'All',
    });
  };

  // Filter records dynamically
  const filteredRecords = records.filter((row) => {
    if (filters.platform !== 'All' && row.Most_Used_Platform !== filters.platform) {
      return false;
    }
    if (filters.academicLevel !== 'All' && row.Academic_Level !== filters.academicLevel) {
      return false;
    }
    if (filters.riskSegment !== 'All' && row.riskLevel !== filters.riskSegment) {
      return false;
    }
    return true;
  });

  // KPI Calculations
  const averageDailyUsage = filteredRecords.reduce((acc, curr) => acc + curr.dailyUsage, 0) / (filteredRecords.length || 1);
  const averageSleep = filteredRecords.reduce((acc, curr) => acc + curr.sleepHours, 0) / (filteredRecords.length || 1);
  const severeCount = filteredRecords.filter(r => r.riskLevel === 'Severe').length;
  const severeRiskRatio = (severeCount / (filteredRecords.length || 1)) * 100;
  const averageMentalHealth = filteredRecords.reduce((acc, curr) => acc + curr.mentalHealth, 0) / (filteredRecords.length || 1);

  // Correlation Calculation helper
  function getCorrelation(x: number[], y: number[]) {
    const n = x.length;
    if (n === 0) return 0;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, val, idx) => sum + val * y[idx], 0);
    const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
    const sumY2 = y.reduce((sum, val) => sum + val * val, 0);

    const num = n * sumXY - sumX * sumY;
    const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    if (den === 0) return 0;
    return Number((num / den).toFixed(2));
  }

  // Calculate dynamic correlation values
  const corrUsageSleep = getCorrelation(filteredRecords.map(r => r.dailyUsage), filteredRecords.map(r => r.sleepHours));
  const corrUsageMental = getCorrelation(filteredRecords.map(r => r.dailyUsage), filteredRecords.map(r => r.mentalHealth));
  const corrUsageConflict = getCorrelation(filteredRecords.map(r => r.dailyUsage), filteredRecords.map(r => r.conflicts));
  const corrSleepMental = getCorrelation(filteredRecords.map(r => r.sleepHours), filteredRecords.map(r => r.mentalHealth));
  const corrSleepConflict = getCorrelation(filteredRecords.map(r => r.sleepHours), filteredRecords.map(r => r.conflicts));
  const corrMentalConflict = getCorrelation(filteredRecords.map(r => r.mentalHealth), filteredRecords.map(r => r.conflicts));

  // Feature Importance map weights (calculated by correlation to Addicted_Score)
  const usageCorr = Math.abs(getCorrelation(filteredRecords.map(r => r.dailyUsage), filteredRecords.map(r => Number(r.Addicted_Score) || 5)));
  const sleepCorr = Math.abs(getCorrelation(filteredRecords.map(r => r.sleepHours), filteredRecords.map(r => Number(r.Addicted_Score) || 5)));
  const mentalCorr = Math.abs(getCorrelation(filteredRecords.map(r => r.mentalHealth), filteredRecords.map(r => Number(r.Addicted_Score) || 5)));
  const conflictCorr = Math.abs(getCorrelation(filteredRecords.map(r => r.conflicts), filteredRecords.map(r => Number(r.Addicted_Score) || 5)));

  const totalCorr = (usageCorr + sleepCorr + mentalCorr + conflictCorr) || 1;
  const usageWeight = Number(((usageCorr / totalCorr) * 100).toFixed(1));
  const sleepWeight = Number(((sleepCorr / totalCorr) * 100).toFixed(1));
  const mentalWeight = Number(((mentalCorr / totalCorr) * 100).toFixed(1));
  const conflictWeight = Number((100 - usageWeight - sleepWeight - mentalWeight).toFixed(1));

  // Scatter Chart data grouping
  const scatterData = filteredRecords.map(r => ({
    x: r.dailyUsage,
    y: r.sleepHours,
    risk: r.riskLevel,
    platform: r.Most_Used_Platform,
    age: r.Age,
  }));

  const severeGroup = scatterData.filter(d => d.risk === 'Severe');
  const highGroup = scatterData.filter(d => d.risk === 'High');
  const moderateGroup = scatterData.filter(d => d.risk === 'Moderate');
  const lowGroup = scatterData.filter(d => d.risk === 'Low');

  // Heatmap helper
  const getCorrBg = (val: number) => {
    if (val === 1) return 'bg-purple-600/90 text-white';
    if (val < -0.4) return 'bg-rose-950/50 text-rose-400 border border-rose-500/25';
    if (val < 0) return 'bg-rose-950/20 text-rose-300/80 border border-rose-500/10';
    if (val > 0.4) return 'bg-teal-950/50 text-teal-400 border border-teal-500/25';
    return 'bg-slate-900 text-slate-400 border border-slate-800';
  };

  // Custom scatter chart tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl text-xs font-mono space-y-1 text-slate-200">
          <p className="font-bold text-teal-400">{d.platform} User</p>
          <p>Age: <span className="text-white">{d.age}</span></p>
          <p>Daily Usage: <span className="text-white">{d.x.toFixed(1)} hrs</span></p>
          <p>Sleep Duration: <span className="text-white">{d.y.toFixed(1)} hrs</span></p>
          <p>Risk: <span className={`font-bold ${
            d.risk === 'Severe' ? 'text-rose-400' :
            d.risk === 'High' ? 'text-orange-400' :
            d.risk === 'Moderate' ? 'text-yellow-400' :
            'text-teal-400'
          }`}>{d.risk}</span></p>
        </div>
      );
    }
    return null;
  };

  // Student list logs (last 3 filtered records)
  const latestRecords = filteredRecords.slice(-3).reverse();

  if (loading) {
    return (
      <PageTransition>
        <div id="loading-container" className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 font-mono space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold animate-pulse">Parsing Cohort Training Datasets...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div id="analytics-dashboard" className="py-8 space-y-10">
        
        {/* Title and Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-8">
          <SectionTitle
            title="Interactive Well-being Analytics"
            subtitle="Explore aggregate digital habits, health risk ratios, and behavioral insights."
            align="left"
            badge="Dashboard"
          />
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-white/5 shrink-0 self-start md:self-center">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Dataset Cohort: Egypt Social Media Addiction</span>
          </div>
        </div>

        {/* Filters Panel */}
        <GlassCard className="p-5" hoverEffect={false}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left: Filter label */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-100">Analytical Segments</h3>
                <p className="text-[11px] text-slate-400">Filter datasets dynamically</p>
              </div>
            </div>

            {/* Middle: Select controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              
              {/* Select 1 */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Social Platform
                </label>
                <select
                  id="filter-platform"
                  value={filters.platform}
                  onChange={(e) => setFilters((prev) => ({ ...prev, platform: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:border-purple-500 focus:outline-none text-slate-200"
                >
                  <option value="All">All Platforms</option>
                  <option value="Instagram">Instagram Only</option>
                  <option value="TikTok">TikTok Only</option>
                  <option value="YouTube">YouTube Only</option>
                  <option value="Reddit">Reddit Only</option>
                  <option value="Snapchat">Snapchat Only</option>
                </select>
              </div>

              {/* Select 2 */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Academic Standing
                </label>
                <select
                  id="filter-academic-level"
                  value={filters.academicLevel}
                  onChange={(e) => setFilters((prev) => ({ ...prev, academicLevel: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:border-purple-500 focus:outline-none text-slate-200"
                >
                  <option value="All">All Levels</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              {/* Select 3 */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Risk Assessment
                </label>
                <select
                  id="filter-risk"
                  value={filters.riskSegment}
                  onChange={(e) => setFilters((prev) => ({ ...prev, riskSegment: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:border-purple-500 focus:outline-none text-slate-200"
                >
                  <option value="All">All Risks</option>
                  <option value="Severe">Severe Only</option>
                  <option value="High">High Only</option>
                  <option value="Moderate">Moderate Only</option>
                  <option value="Low">Low Only</option>
                </select>
              </div>

            </div>

            {/* Right: Reset Action */}
            <div className="shrink-0 w-full lg:w-auto flex justify-end">
              <Button
                id="reset-filters-btn"
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="w-full lg:w-auto py-2 px-4"
              >
                Reset Filters
              </Button>
            </div>

          </div>
        </GlassCard>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <DashboardCard
            title="Average Screen Usage"
            subtitle="Social media active screentime"
            iconName="Smartphone"
            badge="Global Cohort"
            badgeColor="purple"
          >
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">
                {averageDailyUsage.toFixed(1)} Hours
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                <span>Based on {filteredRecords.length} student records</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Mean Sleep Duration"
            subtitle="Total overnight rest index"
            iconName="Moon"
            badge="Target: 7-8h"
            badgeColor="teal"
          >
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">
                {averageSleep.toFixed(1)} Hours
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-mono">
                <TrendingUp className="w-3.5 h-3.5 rotate-180 text-teal-400" />
                <span>Active sleep quotient</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Severe Risk Ratio"
            subtitle="Classified digital dependence"
            iconName="AlertTriangle"
            badge="High Alert"
            badgeColor="rose"
          >
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">
                {severeRiskRatio.toFixed(1)}%
              </span>
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-mono">
                <span>{severeCount} flagged severe cases</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Mental Well-being"
            subtitle="Subjective clinical index scale"
            iconName="Brain"
            badge="Average"
            badgeColor="amber"
          >
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">
                {averageMentalHealth.toFixed(1)} / 10
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono font-semibold">
                <span>
                  {averageMentalHealth <= 4 ? "High Distress Index" : averageMentalHealth <= 7 ? "Medium Distress Index" : "Excellent Health Index"}
                </span>
              </div>
            </div>
          </DashboardCard>

        </div>

        {/* Charts and Core Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart (Scatter plot) */}
          <div className="lg:col-span-2">
            <DashboardCard
              title="Social Usage vs. Sleep Deprivation Scatter Analysis"
              subtitle="Highlighting individual student cohorts mapping daily usage hours against average sleep duration"
              iconName="Activity"
            >
              {filteredRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-80 border border-dashed border-slate-800 rounded-xl bg-slate-900/10 text-slate-500 font-mono text-xs">
                  No cohort records match the filters selected.
                </div>
              ) : (
                <div className="h-80 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Daily Usage" 
                        unit="h" 
                        stroke="#64748b" 
                        fontSize={10}
                        fontFamily="monospace"
                        domain={[0, 12]}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Sleep" 
                        unit="h" 
                        stroke="#64748b" 
                        fontSize={10}
                        fontFamily="monospace"
                        domain={[3, 10]}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <Scatter name="Severe Risk" data={severeGroup} fill="#f43f5e" shape="circle" />
                      <Scatter name="High Risk" data={highGroup} fill="#f97316" shape="circle" />
                      <Scatter name="Moderate Risk" data={moderateGroup} fill="#eab308" shape="circle" />
                      <Scatter name="Low Risk" data={lowGroup} fill="#14b8a6" shape="circle" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              )}
            </DashboardCard>
          </div>

          {/* Feature Importance (Dynamic weights computed by statistical correlation) */}
          <div>
            <DashboardCard
              title="Global Feature Significance Map"
              subtitle="Explainable AI contribution weights calculated by data correlation"
              iconName="Brain"
            >
              <div className="mt-4 space-y-4">
                
                {/* Item 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Daily Usage Hours</span>
                    <span className="text-purple-300 font-bold">{usageWeight.toFixed(1)}% Weight</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${usageWeight}%` }} />
                  </div>
                </div>

                {/* Item 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Overnight Sleep Hours</span>
                    <span className="text-teal-300 font-bold">{sleepWeight.toFixed(1)}% Weight</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${sleepWeight}%` }} />
                  </div>
                </div>

                {/* Item 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Mental Well-being</span>
                    <span className="text-fuchsia-300 font-bold">{mentalWeight.toFixed(1)}% Weight</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-fuchsia-500 h-full rounded-full transition-all duration-500" style={{ width: `${mentalWeight}%` }} />
                  </div>
                </div>

                {/* Item 4 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Conflicts Over Screen</span>
                    <span className="text-amber-300 font-bold">{conflictWeight.toFixed(1)}% Weight</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${conflictWeight}%` }} />
                  </div>
                </div>

              </div>
            </DashboardCard>
          </div>

        </div>

        {/* Heatmap & Prediction Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Correlation Heatmap */}
          <DashboardCard
            title="Correlation Matrix Heatmap"
            subtitle="Friction coefficients: Social screen factors vs psychological indices"
            iconName="Grid"
          >
            {/* Elegant tabular grid simulating correlation tiles */}
            <div className="mt-4">
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono font-bold text-slate-500 mb-2">
                <div></div>
                <div className="truncate">Usage</div>
                <div className="truncate">Sleep</div>
                <div className="truncate">Mental</div>
                <div className="truncate">Conflicts</div>
              </div>
              
              <div className="space-y-1.5">
                {/* Row 1 */}
                <div className="grid grid-cols-5 gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 font-bold text-left font-mono truncate">Usage</span>
                  <div className="bg-purple-600/90 text-white rounded p-1.5 font-bold text-xs text-center border border-purple-500/30">1.0</div>
                  <div className={`${getCorrBg(corrUsageSleep)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageSleep > 0 ? `+${corrUsageSleep}` : corrUsageSleep}</div>
                  <div className={`${getCorrBg(corrUsageMental)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageMental > 0 ? `+${corrUsageMental}` : corrUsageMental}</div>
                  <div className={`${getCorrBg(corrUsageConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageConflict > 0 ? `+${corrUsageConflict}` : corrUsageConflict}</div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-5 gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 font-bold text-left font-mono truncate">Sleep</span>
                  <div className={`${getCorrBg(corrUsageSleep)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageSleep > 0 ? `+${corrUsageSleep}` : corrUsageSleep}</div>
                  <div className="bg-purple-600/90 text-white rounded p-1.5 font-bold text-xs text-center border border-purple-500/30">1.0</div>
                  <div className={`${getCorrBg(corrSleepMental)} rounded p-1.5 font-bold text-xs text-center`}>{corrSleepMental > 0 ? `+${corrSleepMental}` : corrSleepMental}</div>
                  <div className={`${getCorrBg(corrSleepConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrSleepConflict > 0 ? `+${corrSleepConflict}` : corrSleepConflict}</div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-5 gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 font-bold text-left font-mono truncate">Mental</span>
                  <div className={`${getCorrBg(corrUsageMental)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageMental > 0 ? `+${corrUsageMental}` : corrUsageMental}</div>
                  <div className={`${getCorrBg(corrSleepMental)} rounded p-1.5 font-bold text-xs text-center`}>{corrSleepMental > 0 ? `+${corrSleepMental}` : corrSleepMental}</div>
                  <div className="bg-purple-600/90 text-white rounded p-1.5 font-bold text-xs text-center border border-purple-500/30">1.0</div>
                  <div className={`${getCorrBg(corrMentalConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrMentalConflict > 0 ? `+${corrMentalConflict}` : corrMentalConflict}</div>
                </div>
                {/* Row 4 */}
                <div className="grid grid-cols-5 gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 font-bold text-left font-mono truncate">Conflicts</span>
                  <div className={`${getCorrBg(corrUsageConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrUsageConflict > 0 ? `+${corrUsageConflict}` : corrUsageConflict}</div>
                  <div className={`${getCorrBg(corrSleepConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrSleepConflict > 0 ? `+${corrSleepConflict}` : corrSleepConflict}</div>
                  <div className={`${getCorrBg(corrMentalConflict)} rounded p-1.5 font-bold text-xs text-center`}>{corrMentalConflict > 0 ? `+${corrMentalConflict}` : corrMentalConflict}</div>
                  <div className="bg-purple-600/90 text-white rounded p-1.5 font-bold text-xs text-center border border-purple-500/30">1.0</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] text-slate-500 mt-4 px-1 font-mono">
                <span className="flex items-center gap-1">🟣 Positive Connection</span>
                <span className="flex items-center gap-1">🟢 Inverse Connection</span>
              </div>
            </div>
          </DashboardCard>

          {/* Active Cohort Log Summary */}
          <DashboardCard
            title="Cohort Log Registry Insights"
            subtitle="Active student evaluations matching filter guidelines"
            iconName="LayoutGrid"
          >
            <div className="space-y-3 mt-4 text-xs">
              {latestRecords.length === 0 ? (
                <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 text-slate-500 font-mono text-center">
                  No cohort records match current filters.
                </div>
              ) : (
                latestRecords.map((row, idx) => {
                  const studentId = `SM-${12038 - (row.id ?? idx)}`;
                  return (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">Student #{studentId}</span>
                        <span className="text-[10px] text-slate-400">
                          {row.Academic_Level} / {row.Most_Used_Platform} / Usage {row.dailyUsage.toFixed(1)}h
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        row.riskLevel === 'Severe' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                        row.riskLevel === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                        row.riskLevel === 'Moderate' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                        'bg-teal-500/10 border-teal-500/20 text-teal-400'
                      }`}>
                        {row.riskLevel}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </DashboardCard>

        </div>

      </div>
    </PageTransition>
  );
};
