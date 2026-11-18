import React, { useState } from 'react';
import { 
  CheckSquare, AlertTriangle, TrendingUp, Calendar, Filter, 
  HelpCircle, Sparkles, CheckCircle2, XCircle, ArrowRight 
} from 'lucide-react';
import { studentData } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Attendance({ onAskAura }) {
  const [selectedMonth, setSelectedMonth] = useState('November 2026');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock Calendar Ledger for November (Present/Absent days)
  const calendarDays = [
    { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'holiday' },
    { day: 4, status: 'present' }, { day: 5, status: 'present' }, { day: 6, status: 'present' },
    { day: 7, status: 'present' }, { day: 8, status: 'absent' },  { day: 9, status: 'present' },
    { day: 10, status: 'holiday' }, { day: 11, status: 'present' }, { day: 12, status: 'present' },
    { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
    { day: 16, status: 'absent' },  { day: 17, status: 'holiday' }, { day: 18, status: 'present', isToday: true },
    { day: 19, status: 'upcoming' }, { day: 20, status: 'upcoming' }, { day: 21, status: 'upcoming' },
    { day: 22, status: 'upcoming' }, { day: 23, status: 'upcoming' }, { day: 24, status: 'holiday' },
    { day: 25, status: 'upcoming' }, { day: 26, status: 'upcoming' }, { day: 27, status: 'upcoming' },
    { day: 28, status: 'upcoming' }, { day: 29, status: 'upcoming' }, { day: 30, status: 'upcoming' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-amber-400" />
            <span>Attendance Intelligence & Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time automated biometric & faculty attendance tracking (75% statutory requirement).
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("How many attendance classes can I miss?");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AURA Margin Calculation</span>
        </button>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Overall Percentage */}
        <div className="rounded-3xl glass-panel-gold p-6 border border-amber-500/30 flex items-center justify-between shadow-divine">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Overall Academic Attendance
            </span>
            <div className="text-4xl font-serif font-black text-slate-100 mt-1 divine-glow">
              {studentData.attendance.overallPercentage}%
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{studentData.attendance.changeLastMonth} vs previous cycle</span>
            </p>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400"
                strokeDasharray={`${studentData.attendance.overallPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-200">
              92%
            </span>
          </div>
        </div>

        {/* Classes Attended count */}
        <div className="rounded-3xl glass-panel p-6 border border-slate-700/60 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Sessions Completed
          </span>
          <div className="text-3xl font-serif font-black text-slate-100 mt-2">
            {studentData.attendance.totalAttended} <span className="text-sm font-sans text-slate-400">/ {studentData.attendance.totalHeld} held</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            18 authorized leaves & duty certificates verified
          </div>
        </div>

        {/* Safe Margin / Risk Status */}
        <div className="rounded-3xl glass-panel p-6 border border-emerald-500/30 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Exam Eligibility Status
          </span>
          <div className="text-2xl font-serif font-bold text-emerald-300 mt-2">
            Safe Standing (+17%)
          </div>
          <div className="mt-1 text-xs text-slate-300">
            You are comfortably 17% above the 75% examination barrier.
          </div>
        </div>

      </div>

      {/* Subject-Wise Attendance Breakdown Table (SRS FR-ATT-01, FR-ATT-02) */}
      <div className="rounded-3xl glass-panel p-6 border border-amber-500/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Subject-Wise Attendance Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Classes held, attended, and maximum allowable missed lectures before 75% breach.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Statutory Minimum:</span>
            <span className="px-2.5 py-1 rounded-xl bg-midnight-950 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold">
              75.0%
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/80 text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
                <th className="py-3 px-4">Subject & Code</th>
                <th className="py-3 px-4">Faculty</th>
                <th className="py-3 px-4 text-center">Held</th>
                <th className="py-3 px-4 text-center">Attended</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-center">Margin (Can Miss)</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {studentData.subjects.map((subj) => {
                const isWarning = subj.percentage < 75;

                return (
                  <tr 
                    key={subj.code} 
                    className="hover:bg-amber-500/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedSubject(subj)}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-100">
                      <div>{subj.name}</div>
                      <span className="text-[10px] text-amber-400 font-mono">{subj.code} • {subj.room}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{subj.faculty}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{subj.held}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-emerald-400 font-bold">{subj.attended}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span className={`px-2.5 py-1 rounded-xl ${isWarning ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                        {subj.percentage}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="text-amber-300 font-semibold">
                        {subj.canMiss} classes
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isWarning ? (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Warning
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Attendance Calendar Ledger (SRS FR-ATT-03) */}
      <div className="rounded-3xl glass-panel p-6 border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Daily Attendance Ledger: {selectedMonth}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-slate-300">Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-600" />
              <span className="text-slate-300">Holiday/Weekend</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
          {calendarDays.map((d) => {
            let bgClass = "bg-midnight-950 border-slate-800 text-slate-500";
            if (d.status === 'present') bgClass = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold";
            else if (d.status === 'absent') bgClass = "bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold";
            else if (d.status === 'holiday') bgClass = "bg-slate-800/40 border-slate-700/30 text-slate-500";

            return (
              <div
                key={d.day}
                className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${bgClass} ${d.isToday ? 'ring-2 ring-amber-400' : ''}`}
              >
                <span className="text-xs font-mono">{d.day}</span>
                <span className="text-[9px] capitalize mt-0.5 opacity-80">
                  {d.status === 'holiday' ? 'Off' : d.status}
                </span>
                {d.isToday && (
                  <span className="text-[8px] uppercase tracking-wider text-amber-400 font-bold">Today</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
