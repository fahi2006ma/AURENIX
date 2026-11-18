import React, { useState } from 'react';
import { 
  School, CheckSquare, Award, Megaphone, Users, 
  Calendar, Check, AlertCircle, Save, Send, Sparkles 
} from 'lucide-react';
import { studentData, campusPulseNotices } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function FacultyDashboard({ onAddNotice }) {
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' | 'marks' | 'notice'
  const [selectedClass, setSelectedClass] = useState('BCA - Year 2 (Section A)');
  const [selectedSubject, setSelectedSubject] = useState('CS-201: Data Structures & Algorithms');
  const [attendanceDate, setAttendanceDate] = useState('2026-11-18');
  
  // Student roster for attendance
  const [roster, setRoster] = useState([
    { id: '25BCA001', name: 'Aaditya Sharma', status: 'present' },
    { id: '25BCA012', name: 'Diya Krishnan', status: 'present' },
    { id: '25BCA020', name: 'Fahima F', status: 'present' },
    { id: '25BCA024', name: 'Gautam Menon', status: 'absent' },
    { id: '25BCA033', name: 'Kavya Raman', status: 'present' },
    { id: '25BCA042', name: 'Mohammed Zaid', status: 'present' }
  ]);

  // Internal Marks State
  const [marksList, setMarksList] = useState([
    { id: '25BCA020', name: 'Fahima F', test1: 29, test2: 28, assignment: 29, totalInternal: 29 }
  ]);

  // Notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Notices');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeAudience, setNoticeAudience] = useState('All BCA Students');
  
  const [statusToast, setStatusToast] = useState('');

  const handleToggleAttendance = (id) => {
    divineAudio.playTap();
    setRoster((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
      )
    );
  };

  const handleSaveAttendance = () => {
    divineAudio.playSuccessChord();
    setStatusToast(`Attendance for ${selectedSubject} on ${attendanceDate} saved & synchronized to student ledgers!`);
    setTimeout(() => setStatusToast(''), 4000);
  };

  const handlePublishNotice = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;

    divineAudio.playSuccessChord();
    const newNot = {
      id: `not-fac-${Date.now()}`,
      category: noticeCategory,
      title: noticeTitle.trim(),
      date: 'Today',
      time: 'Immediate',
      venue: selectedClass,
      summary: noticeBody.trim(),
      isUnread: true,
      important: true,
      addedToPlanner: false
    };

    if (onAddNotice) {
      onAddNotice(newNot);
    }

    setStatusToast(`Notice '${noticeTitle}' published to ${noticeAudience}!`);
    setNoticeTitle('');
    setNoticeBody('');
    setTimeout(() => setStatusToast(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <School className="w-7 h-7 text-sky-400" />
            <span>Faculty Command & Academic Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <strong>Dr. Aris Thorne</strong> (Professor & Academic Advisor) • Staff ID: SKA-FAC-102
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold font-mono">
            Staff Access Level: Faculty Editor
          </span>
        </div>
      </div>

      {statusToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{statusToast}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-midnight-950 border border-slate-700/60 max-w-lg">
        {[
          { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare },
          { id: 'marks', label: 'Continuous Internal Marks', icon: Award },
          { id: 'notice', label: 'Publish Campus Notice', icon: Megaphone }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                divineAudio.playTap();
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-midnight-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Mark Attendance Module (SRS F1, FR-ATT-04) */}
      {activeTab === 'attendance' && (
        <div className="p-6 rounded-3xl glass-panel border border-sky-500/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Cohort</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
              >
                <option value="BCA - Year 2 (Section A)">BCA - Year 2 (Section A)</option>
                <option value="BCA - Year 3 (Section B)">BCA - Year 3 (Section B)</option>
                <option value="MSc AI & Data Science">MSc AI & Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Course / Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
              >
                <option value="CS-201: Data Structures & Algorithms">CS-201: Data Structures & Algorithms</option>
                <option value="CS-204: Database Systems & Cloud SQL">CS-204: Database Systems & Cloud SQL</option>
                <option value="CS-202: Web Technologies & React">CS-202: Web Technologies & React</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Session Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  <th className="py-3 px-4">Roll ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {roster.map((student) => (
                  <tr key={student.id} className="hover:bg-sky-500/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-300">{student.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-100">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        student.status === 'present'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleAttendance(student.id)}
                        className="px-3 py-1 rounded-xl bg-midnight-950 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-colors"
                      >
                        Toggle {student.status === 'present' ? 'Absent' : 'Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              onClick={handleSaveAttendance}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Attendance</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Continuous Internal Marks Module */}
      {activeTab === 'marks' && (
        <div className="p-6 rounded-3xl glass-panel border border-sky-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-slate-100">
                Continuous Internal Assessment (CIA): {selectedSubject}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Component weights: Cycle Tests (20) + Seminars/Labs (10) = Max 30</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4 text-center">Test 1 (30)</th>
                  <th className="py-3 px-4 text-center">Test 2 (30)</th>
                  <th className="py-3 px-4 text-center">Continuous Lab (30)</th>
                  <th className="py-3 px-4 text-center">Weighted CIA (30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {marksList.map((m) => (
                  <tr key={m.id}>
                    <td className="py-3 px-4 font-mono font-bold text-sky-300">{m.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-100">{m.name}</td>
                    <td className="py-3 px-4 text-center font-mono">{m.test1}</td>
                    <td className="py-3 px-4 text-center font-mono">{m.test2}</td>
                    <td className="py-3 px-4 text-center font-mono">{m.assignment}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-300 text-sm">{m.totalInternal} / 30</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                divineAudio.playSuccessChord();
                setStatusToast("Internal grades locked and synced to Dean's academic repository.");
                setTimeout(() => setStatusToast(''), 3000);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Submit & Lock Internal Marks</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Publish Campus Notice Module (SRS F1, FR-NOT-03) */}
      {activeTab === 'notice' && (
        <form onSubmit={handlePublishNotice} className="p-6 rounded-3xl glass-panel border border-sky-500/30 space-y-4 max-w-2xl">
          <h3 className="font-serif text-base font-bold text-slate-100">
            Dispatch Official Class / Department Circular
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
              >
                <option value="Notices">Notices</option>
                <option value="Events">Events</option>
                <option value="Workshops">Workshops</option>
                <option value="Exams">Exams</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Audience</label>
              <select
                value={noticeAudience}
                onChange={(e) => setNoticeAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
              >
                <option value="All BCA Students">All BCA Students</option>
                <option value="Year 2 - Section A Only">Year 2 - Section A Only</option>
                <option value="Entire Campus">Entire Campus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Headline</label>
            <input
              type="text"
              required
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="e.g. Model Practical Exam Date Announced for Turing Lab"
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Body</label>
            <textarea
              rows={4}
              required
              value={noticeBody}
              onChange={(e) => setNoticeBody(e.target.value)}
              placeholder="Detail all instructions, timing, and prerequisites for students..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Notice Instantly</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
