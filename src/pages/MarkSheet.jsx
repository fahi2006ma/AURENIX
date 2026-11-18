import React, { useState } from 'react';
import { 
  Award, Download, Sparkles, TrendingUp, CheckCircle2, 
  HelpCircle, ChevronDown, FileText, Printer 
} from 'lucide-react';
import { studentData, markSheets } from '../data/collegeData';
import { downloadMarkSheetPdf } from '../utils/pdfGenerator';
import { divineAudio } from '../utils/audioChimes';

export default function MarkSheet({ onAskAura }) {
  const [selectedSem, setSelectedSem] = useState(3);
  const currentSheet = markSheets[selectedSem] || markSheets[3];

  const handleDownload = () => {
    divineAudio.playSuccessChord();
    downloadMarkSheetPdf(selectedSem);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Award className="w-7 h-7 text-amber-400" />
            <span>Official Academic Mark Sheet</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Controller of Examinations verified statement of semester grades and credits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onAskAura(`Explain my semester ${selectedSem} marks`);
              divineAudio.playTap();
            }}
            className="px-3.5 py-2 rounded-2xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ask AURA Analysis</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Mark Sheet</span>
          </button>
        </div>
      </div>

      {/* Semester Tab Switcher & High-level Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Semester Buttons */}
        <div className="lg:col-span-8 flex items-center gap-2 p-1.5 rounded-2xl bg-midnight-950 border border-slate-700/60 overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4].map((sem) => (
            <button
              key={sem}
              onClick={() => {
                setSelectedSem(sem);
                divineAudio.playTap();
              }}
              className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                selectedSem === sem
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-midnight-900'
              }`}
            >
              Semester {sem} {sem === 4 ? '(In Progress)' : ''}
            </button>
          ))}
        </div>

        {/* SGPA & CGPA Pill Card */}
        <div className="lg:col-span-4 p-4 rounded-2xl glass-panel-gold border border-amber-500/30 flex items-center justify-between shadow-divine">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
              Semester {selectedSem} SGPA
            </span>
            <div className="text-3xl font-serif font-black text-slate-100 divine-glow">
              {currentSheet.sgpa}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
              Cumulative CGPA
            </span>
            <div className="text-2xl font-serif font-bold text-sky-400">
              {studentData.cgpa.overall}
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Mark Sheet Table (SRS FR-MRK-01) */}
      <div className="rounded-3xl glass-panel p-6 border border-amber-500/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Course-Wise Evaluation Ledger: Semester {selectedSem}
            </h3>
            <p className="text-xs text-slate-400">
              Internal (Continuous Assessment: 30) + External (End Semester: 70) = Total 100
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentSheet.result}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/80 text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Internal (30)</th>
                <th className="py-3 px-4 text-center">External (70)</th>
                <th className="py-3 px-4 text-center">Total (100)</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {currentSheet.subjects.map((subj) => (
                <tr key={subj.code} className="hover:bg-amber-500/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-300">
                    {subj.code}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-100">
                    {subj.name}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">{subj.credits}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">
                    {subj.internal ?? '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">
                    {subj.external ?? '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-black text-slate-100">
                    {subj.total ?? '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-xl font-bold font-mono ${
                      subj.grade === 'O' 
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                        : subj.grade === 'A+' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-700/40 text-slate-300'
                    }`}>
                      {subj.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-semibold text-emerald-400">
                      {subj.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer calculation note */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
          <span>Grading Scale: O (Outstanding 90-100), A+ (Excellent 80-89), A (Very Good 70-79)</span>
          <span className="font-mono text-amber-300">Total Credits Earned: {currentSheet.totalCredits}</span>
        </div>
      </div>

    </div>
  );
}
