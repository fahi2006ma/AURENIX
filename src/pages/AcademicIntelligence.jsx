import React from 'react';
import { 
  Sparkles, TrendingUp, Award, CheckSquare, AlertCircle, 
  ArrowUpRight, BarChart3, LineChart, Brain, Target, ShieldCheck 
} from 'lucide-react';
import { studentData, academicIntelligenceData, markSheets } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function AcademicIntelligence({ onAskAura }) {
  const { attendanceTrend, cgpaProgression, insights } = academicIntelligenceData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Brain className="w-7 h-7 text-amber-400" />
            <span>Academic Intelligence & Predictive Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-semester telemetry, grade projections, and personalized curriculum insights.
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("Explain my academic performance");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AURA Deep Assessment</span>
        </button>
      </div>

      {/* High Level Projection KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-6 rounded-3xl glass-panel-gold border border-amber-500/30 shadow-divine">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Projected CGPA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              99.2% Confidence
            </span>
          </div>
          <div className="text-4xl font-serif font-black text-slate-100 mt-2 divine-glow">
            8.95 <span className="text-sm font-sans text-amber-400">/ 10.0</span>
          </div>
          <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +0.08 above current cumulative
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-sky-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Attendance Velocity
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Upward Trend
            </span>
          </div>
          <div className="text-4xl font-serif font-black text-slate-100 mt-2">
            92.0%
          </div>
          <p className="text-xs text-sky-300 mt-1">
            Current trajectory maintains full exam eligibility buffer
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Class Rank Percentile
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Top 3%
            </span>
          </div>
          <div className="text-4xl font-serif font-black text-slate-100 mt-2">
            Rank #2 <span className="text-sm font-sans text-slate-400">in BCA Cohort</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Eligible for Dean's Academic Honors List
          </p>
        </div>

      </div>

      {/* Visual Analytics Grid: CGPA Progression + Monthly Attendance Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CGPA Trajectory */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-amber-500/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-lg font-bold text-slate-100 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-amber-400" />
                <span>CGPA Progression Curve</span>
              </h3>
              <span className="text-xs font-mono text-amber-300">Target: 9.0+</span>
            </div>
            <p className="text-xs text-slate-400">Historical performance from Semester 1 to present.</p>
          </div>

          <div className="mt-6 space-y-4">
            {cgpaProgression.map((item, idx) => {
              const widthPct = (item.gpa / 10) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{item.semester}</span>
                    <span className="font-mono font-bold text-amber-300">{item.gpa} SGPA</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-midnight-950 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Consistent acceleration (+0.15/sem average)</span>
            <span className="text-amber-400 font-semibold">Distinction Track</span>
          </div>
        </div>

        {/* Monthly Attendance Bar Chart */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-sky-500/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-lg font-bold text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-400" />
                <span>Attendance Stability Ledger</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400">Safe (&gt;75%)</span>
            </div>
            <p className="text-xs text-slate-400">Monthly percentage consistency over the semester.</p>
          </div>

          <div className="mt-6 flex items-end justify-between h-40 gap-3 pt-4 px-2">
            {attendanceTrend.map((m, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-mono font-bold text-slate-200">{m.percentage}%</span>
                <div 
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-sky-600 to-sky-400 transition-all duration-1000"
                  style={{ height: `${(m.percentage / 100) * 110}px` }}
                />
                <span className="text-[11px] text-slate-400 font-mono text-center truncate">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Statutory Minimum: 75%</span>
            <span className="text-emerald-400 font-semibold">Zero Academic Deficits</span>
          </div>
        </div>

      </div>

      {/* AI-Generated Performance Insights (SRS FR-INT-02) */}
      <div className="rounded-3xl glass-panel p-6 border border-amber-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
          <h3 className="font-serif text-lg font-bold text-slate-100">
            AURA AI Continuous Intelligence Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((ins, idx) => {
            let borderColor = "border-amber-500/30";
            let iconColor = "text-amber-400";
            if (ins.type === 'opportunity') {
              borderColor = "border-coral-500/30";
              iconColor = "text-coral-400";
            } else if (ins.type === 'forecast') {
              borderColor = "border-sky-500/30";
              iconColor = "text-sky-400";
            }

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-midnight-950/80 border ${borderColor} flex flex-col justify-between space-y-2.5`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className={`w-4 h-4 ${iconColor}`} />
                    <h4 className="font-serif text-sm font-bold text-slate-200">
                      {ins.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300/90 leading-relaxed">
                    {ins.text}
                  </p>
                </div>

                <div className="pt-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Calculated from Real University Records
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
