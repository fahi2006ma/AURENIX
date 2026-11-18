import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Download, Clock, MapPin, User, 
  Sparkles, CheckCircle2, Share2, ArrowRight 
} from 'lucide-react';
import { weeklyTimetable, studentData } from '../data/collegeData';
import { downloadTimetablePdf } from '../utils/pdfGenerator';
import { divineAudio } from '../utils/audioChimes';

export default function Timetable({ onAskAura }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [activeDay, setActiveDay] = useState('Monday');

  const handleDownload = () => {
    divineAudio.playSuccessChord();
    downloadTimetablePdf();
  };

  const handleExportIcs = () => {
    divineAudio.playTap();
    // Generate simple iCal .ics
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aurenix University//Class Timetable//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:CS-201: Data Structures & Algorithms
DESCRIPTION:Prof. Vikram Raman - Turing Hall C-204
LOCATION:Hall C-204, Aurenix University
DTSTART:20261118T110000
DTEND:20261118T123000
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Aurenix_Schedule_${studentData.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-amber-400" />
            <span>Academic Schedule & Timetable</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Even Semester 2026 • BCA Section A • Lecture & Lab Halls
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportIcs}
            className="px-3.5 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/60 flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>Sync (.ics)</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Timetable PDF</span>
          </button>
        </div>
      </div>

      {/* Next Session Highlight Card */}
      <div className="rounded-3xl glass-panel-gold p-6 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-divine">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center p-0.5 shadow-md shadow-amber-500/30 shrink-0">
            <div className="w-full h-full bg-midnight-950 rounded-[14px] flex items-center justify-center text-amber-400 font-serif font-black text-xl">
              NOW
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Next Upcoming Class
              </span>
              <span className="text-xs text-slate-400">11:00 AM - 12:30 PM</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mt-1">
              Data Structures & Algorithms (CS-201)
            </h3>
            <p className="text-xs text-amber-300 mt-0.5 flex items-center gap-3">
              <span>Hall C-204 (Turing Hall)</span>
              <span>•</span>
              <span>Prof. Vikram Raman</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onAskAura("Show my timetable for today");
            divineAudio.playTap();
          }}
          className="px-4 py-2 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-amber-300 border border-amber-500/40 text-xs font-semibold self-start md:self-auto flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ask AURA for Route</span>
        </button>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-midnight-950 border border-slate-700/60 overflow-x-auto no-scrollbar">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => {
              setActiveDay(day);
              divineAudio.playTap();
            }}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeDay === day
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-midnight-900'
            }`}
          >
            {day} {day === 'Monday' ? '(Today)' : ''}
          </button>
        ))}
      </div>

      {/* Daily Schedule Cards List */}
      <div className="space-y-3">
        {(weeklyTimetable[activeDay] || []).map((slot, index) => (
          <div
            key={index}
            className={`p-5 rounded-3xl glass-panel border transition-all ${
              slot.isCurrentNext && activeDay === 'Monday'
                ? 'border-amber-400 shadow-divine bg-midnight-900/90'
                : 'border-slate-700/60 hover:border-slate-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="px-3 py-2 rounded-2xl bg-midnight-950 border border-slate-800 text-center shrink-0">
                  <Clock className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                  <span className="text-[11px] font-mono font-bold text-slate-300 whitespace-nowrap block">
                    {slot.time}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {slot.code}
                    </span>
                    {slot.isCurrentNext && activeDay === 'Monday' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Upcoming Now
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-100 mt-1">
                    {slot.subject}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" /> {slot.room}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" /> {slot.faculty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <span className="text-xs font-semibold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  90 Mins Session
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
