import React, { useState } from 'react';
import { 
  FileText, Upload, CheckCircle2, Clock, AlertTriangle, 
  Sparkles, Download, FileCheck, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { assignmentsList } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Assignments({ onAskAura }) {
  const [tab, setTab] = useState('Pending'); // 'Pending' | 'Submitted' | 'Overdue'
  const [assignments, setAssignments] = useState(assignmentsList);
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState({});
  const [successToast, setSuccessToast] = useState('');

  const filtered = assignments.filter((a) => a.status.toLowerCase() === tab.toLowerCase());

  const handleFileChange = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile((prev) => ({ ...prev, [id]: e.target.files[0] }));
      divineAudio.playTap();
    }
  };

  const handleSubmit = (id) => {
    const file = selectedFile[id];
    if (!file) {
      alert("Please choose a file to submit first.");
      return;
    }

    setUploadingId(id);
    divineAudio.playTap();

    setTimeout(() => {
      setUploadingId(null);
      // Update status
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status: 'Submitted',
                dueDisplay: `Submitted just now (${file.name})`,
                submissionFile: file.name
              }
            : a
        )
      );

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F59E0B', '#38BDF8', '#10B981']
        });
      } catch {}

      divineAudio.playSuccessChord();
      setSuccessToast(`Assignment submitted successfully: ${file.name}`);
      setTimeout(() => setSuccessToast(''), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-amber-400" />
            <span>Course Assignments & Submissions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Continuous internal assessment portal with cryptographic plagiarism check.
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("Which assignments are pending?");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask AURA for Deadlines</span>
        </button>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-midnight-950 border border-slate-700/60 max-w-md">
        {['Pending', 'Submitted', 'Overdue'].map((t) => {
          const count = assignments.filter((a) => a.status.toLowerCase() === t.toLowerCase()).length;
          return (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                divineAudio.playTap();
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                tab === t
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{t}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${tab === t ? 'bg-midnight-950 text-amber-300' : 'bg-midnight-800 text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List of Assignments */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-slate-700/60">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-200">No {tab} Assignments</h4>
            <p className="text-xs text-slate-400 mt-1">You are up to date on all your curriculum submissions!</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl glass-panel border border-amber-500/20 hover:border-amber-400/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.code}
                  </span>
                  <span className="text-xs text-slate-400">{item.subject}</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">Max Marks: <strong className="text-slate-200">{item.maxMarks}</strong></span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    item.status === 'Submitted'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Submitted Info */}
              {item.status === 'Submitted' && (
                <div className="p-4 rounded-2xl bg-midnight-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <FileCheck className="w-4 h-4" />
                      <span>Submission File: {item.submissionFile}</span>
                    </div>
                    {item.feedback && (
                      <p className="text-slate-400 text-[11px] mt-1">
                        Instructor Feedback: "{item.feedback}"
                      </p>
                    )}
                  </div>

                  {item.marksAwarded && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Score Awarded</span>
                      <div className="text-xl font-serif font-black text-amber-300">
                        {item.marksAwarded} / {item.maxMarks} ({item.grade})
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pending Upload Form */}
              {item.status === 'Pending' && (
                <div className="p-4 rounded-2xl bg-midnight-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Due Date: {item.dueDisplay}
                    </span>
                    <span>Allowed: {item.allowedFormats?.join(', ')} (Max {item.maxFileSizeMb}MB)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="file"
                      id={`file-${item.id}`}
                      className="hidden"
                      onChange={(e) => handleFileChange(item.id, e)}
                    />
                    <label
                      htmlFor={`file-${item.id}`}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-midnight-900 border border-slate-700 hover:border-amber-400 text-xs font-medium text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>{selectedFile[item.id] ? selectedFile[item.id].name : "Choose File to Upload"}</span>
                    </label>

                    <button
                      onClick={() => handleSubmit(item.id)}
                      disabled={!selectedFile[item.id] || uploadingId === item.id}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {uploadingId === item.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-midnight-950 border-t-transparent rounded-full animate-spin" />
                          <span>Uploading & Encrypting...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Submit Assignment</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
