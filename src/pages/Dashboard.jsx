import React from 'react';
import { 
  Sparkles, CheckSquare, Award, Clock, Bell, CreditCard, 
  FileText, ArrowRight, Download, Calendar, ExternalLink, 
  TrendingUp, BookOpen, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { studentData, campusPulseNotices, weeklyTimetable } from '../data/collegeData';
import { downloadTimetablePdf } from '../utils/pdfGenerator';
import { divineAudio } from '../utils/audioChimes';

export default function Dashboard({ setActivePage, onOpenPaymentModal, onAskAura }) {
  // Determine time-of-day greeting
  const hour = new Date().getHours();
  let timeGreeting = "Good Morning";
  if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
  else if (hour >= 17) timeGreeting = "Good Evening";

  const nextClass = studentData.nextClass;
  const todayClasses = weeklyTimetable["Monday"] || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* 1. Hero Greeting Banner (Matches Drafts 1 & 2) */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-500/30 p-6 sm:p-8 shadow-divine">
        {/* Background graduation & books image blend */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img 
            src="/assets/graduation_books_banner.png" 
            alt="Graduation" 
            className="w-full h-full object-cover object-right"
            onError={(e) => {
              e.target.src = "/assets/grad_banner.png";
            }}
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              Even Semester 2026 • BCA 2nd Year
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {timeGreeting}, <span className="text-amber-400 divine-glow">{studentData.firstName}!</span> 👋
          </h2>

          <p className="mt-2 text-sm text-slate-300/90 leading-relaxed font-normal">
            Keep going, you're doing great! Today's schedule features 4 core lectures and your algorithm review session.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActivePage('insights');
                divineAudio.playTap();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>View Your Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onAskAura("How many attendance classes can I miss?");
                divineAudio.playTap();
              }}
              className="px-3.5 py-2 rounded-xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AURA: Can I miss any classes?</span>
            </button>
          </div>
        </div>

        {/* Script motivational watermark */}
        <div className="absolute top-4 right-6 text-right hidden sm:block pointer-events-none">
          <span className="font-script text-3xl md:text-4xl text-amber-400/40 divine-glow block">
            Dream Bigger,
          </span>
          <span className="font-script text-3xl md:text-4xl text-amber-400/30 divine-glow block -mt-2">
            Achieve More.
          </span>
        </div>
      </div>

      {/* 2. Summary KPI Cards with Circular SVG Rings (SRS Section 4.3 P5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Attendance Card with Progress Ring */}
        <div 
          onClick={() => setActivePage('attendance')}
          className="rounded-3xl glass-panel p-5 border border-amber-500/25 hover:border-amber-400/50 shadow-md hover:shadow-divine transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Attendance
            </span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-serif font-black text-slate-100 group-hover:text-amber-300 transition-colors">
                {studentData.attendance.overallPercentage}%
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>{studentData.attendance.changeLastMonth} vs last month</span>
              </div>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${studentData.attendance.overallPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-slate-200">
                {studentData.attendance.overallPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* CGPA Card */}
        <div 
          onClick={() => setActivePage('marksheet')}
          className="rounded-3xl glass-panel p-5 border border-sky-500/25 hover:border-sky-400/50 shadow-md hover:shadow-cyan-glow transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall CGPA
            </span>
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-serif font-black text-slate-100 group-hover:text-sky-300 transition-colors">
                {studentData.cgpa.overall}
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>{studentData.cgpa.changeLastSemester} vs Sem 2</span>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Distinction
            </div>
          </div>
        </div>

        {/* Fees Due Card with Pay Now */}
        <div className="rounded-3xl glass-panel p-5 border border-coral-500/25 hover:border-coral-400/50 shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fees Due
            </span>
            <div className="p-2 rounded-xl bg-coral-500/15 text-coral-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-serif font-black text-coral-400">
                ₹{studentData.feesDue.amount.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Due Nov 28, 2026</p>
            </div>

            <button
              onClick={() => onOpenPaymentModal(studentData.feesDue)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-coral-500 to-rose-600 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              Pay Now →
            </button>
          </div>
        </div>

        {/* Assignments Pending Card */}
        <div 
          onClick={() => setActivePage('assignments')}
          className="rounded-3xl glass-panel p-5 border border-amber-500/25 hover:border-amber-400/50 shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assignments
            </span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-serif font-black text-slate-100 group-hover:text-amber-300 transition-colors">
                2 Pending
              </div>
              <p className="text-[11px] text-amber-300/80 mt-0.5">Graph Algorithms due in 2d</p>
            </div>

            <span className="text-xs text-amber-400 font-bold group-hover:underline">
              View →
            </span>
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Next Class Banner & Academic Line Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Class Highlight Tile (Draft 1 & Draft 2) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-amber-500/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Next Upcoming Session
              </span>
              <span className="text-xs font-mono text-slate-400">Today</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-slate-100 mt-2">
              {nextClass.subject}
            </h3>
            <p className="text-xs text-amber-300/90 font-mono mt-0.5">
              Course Code: {nextClass.code}
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Time: <strong>{nextClass.time}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Venue: <strong>{nextClass.room}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instructor: <strong>{nextClass.faculty}</strong></span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Attendance Margin: Safe (+5)
            </span>
            <button
              onClick={() => setActivePage('timetable')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Academic Overview Chart (Line graph of CGPA progression) */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-6 border border-amber-500/25 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">Academic Overview</h3>
              <p className="text-xs text-slate-400">Cumulative GPA progression by semester</p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-midnight-950 border border-amber-500/30 text-xs font-mono font-bold text-amber-300">
              Latest: 8.87 CGPA
            </div>
          </div>

          {/* SVG Line Graph Visualizer */}
          <div className="relative h-44 w-full mt-4 flex items-end justify-between px-4 pb-4 pt-6 bg-midnight-950/60 rounded-2xl border border-slate-800">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-15">
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
            </div>

            {/* Visual SVG line curve */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
              <defs>
                <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill area */}
              <polygon points="10,60 100,45 200,28 290,20 290,100 10,100" fill="url(#gpaGradient)" />
              {/* Glowing Line */}
              <polyline
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10,60 100,45 200,28 290,20"
              />
              {/* Data points */}
              <circle cx="10" cy="60" r="4.5" fill="#0B132B" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="100" cy="45" r="4.5" fill="#0B132B" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="200" cy="28" r="4.5" fill="#0B132B" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="290" cy="20" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* Labels under graph */}
            <div className="relative z-10 w-full flex justify-between text-[11px] text-slate-400 pt-2 font-mono">
              <span>Sem 1 (8.60)</span>
              <span>Sem 2 (8.75)</span>
              <span>Sem 3 (8.87)</span>
              <span className="text-amber-300 font-bold">Sem 4 (8.95 Proj.)</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Minimum passing requirement: 5.0 CGPA</span>
            <button
              onClick={() => setActivePage('insights')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Analyze Trends →
            </button>
          </div>
        </div>

      </div>

      {/* 4. Quick Access Tiles (SRS Section 4.3 P5) */}
      <div>
        <h3 className="font-serif text-lg font-bold text-slate-200 mb-3">Quick Campus Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          <button
            onClick={() => {
              setActivePage('marksheet');
              divineAudio.playTap();
            }}
            className="p-4 rounded-2xl glass-panel hover:bg-amber-500/10 border border-slate-700/60 hover:border-amber-400/50 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
              View Mark Sheet
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Semester 1 - 4 SGPA & grades</p>
          </button>

          <button
            onClick={() => {
              setActivePage('attendance');
              divineAudio.playTap();
            }}
            className="p-4 rounded-2xl glass-panel hover:bg-sky-500/10 border border-slate-700/60 hover:border-sky-400/50 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-300 transition-colors">
              Check Attendance
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Subject breakdown & margin</p>
          </button>

          <button
            onClick={() => {
              downloadTimetablePdf();
              divineAudio.playSuccessChord();
            }}
            className="p-4 rounded-2xl glass-panel hover:bg-emerald-500/10 border border-slate-700/60 hover:border-emerald-400/50 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
              Download Timetable
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant PDF class ledger</p>
          </button>

          <button
            onClick={() => {
              onOpenPaymentModal(studentData.feesDue);
              divineAudio.playTap();
            }}
            className="p-4 rounded-2xl glass-panel hover:bg-coral-500/10 border border-slate-700/60 hover:border-coral-400/50 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-200 group-hover:text-coral-300 transition-colors">
              Pay Fees Online
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Clear ₹2,500 assessment fee</p>
          </button>

        </div>
      </div>

      {/* 5. Bottom Row: Upcoming Classes, Recent Notices, Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upcoming Classes List */}
        <div className="lg:col-span-4 rounded-3xl glass-panel p-5 border border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-sm font-bold text-slate-200">Today's Class Schedule</h3>
            <button
              onClick={() => setActivePage('timetable')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.slice(0, 3).map((cls, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-2xl bg-midnight-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${idx === 1 ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{cls.subject}</h4>
                    <p className="text-[10px] text-slate-400">{cls.room} • {cls.faculty}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-amber-300/90">
                  {cls.time.split('-')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices List */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-5 border border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-sm font-bold text-slate-200">Campus Pulse & Notices</h3>
            <button
              onClick={() => setActivePage('notices')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {campusPulseNotices.slice(0, 3).map((not) => (
              <div
                key={not.id}
                onClick={() => setActivePage('notices')}
                className="p-3 rounded-2xl bg-midnight-950/70 border border-slate-800 hover:border-amber-500/30 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {not.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{not.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 truncate">{not.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Featured Event (Tech Fest 2026) */}
        <div className="lg:col-span-3 rounded-3xl glass-panel-gold p-5 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
              Flagship Event
            </span>
            <h4 className="font-serif text-base font-bold text-slate-100 mt-2.5">
              Tech Fest 2026
            </h4>
            <p className="text-xs text-amber-200/90 font-medium">AURENIX Quantum & AI Summit</p>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              Grand Celestial Auditorium • 20 Nov 2026, 09:00 AM
            </p>
          </div>

          <button
            onClick={() => setActivePage('notices')}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all text-center"
          >
            Register / Add to Planner
          </button>
        </div>

      </div>

    </div>
  );
}
