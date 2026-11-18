import React from 'react';
import { 
  LayoutDashboard, User, CheckSquare, Award, Calendar, FileText, 
  CreditCard, BookOpen, Bell, Sparkles, Clock, QrCode, Settings, 
  LogOut, GraduationCap, X, ChevronRight, School
} from 'lucide-react';
import { studentData, collegeInfo } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Sidebar({ 
  activePage, 
  setActivePage, 
  sidebarOpen, 
  setSidebarOpen, 
  onLogout,
  userRole = 'student'
}) {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, badge: `${studentData.attendance.overallPercentage}%` },
    { id: 'marksheet', label: 'Mark Sheet', icon: Award, badge: `${studentData.cgpa.overall}` },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: '2 Due' },
    { id: 'fees', label: 'Fees & Payments', icon: CreditCard, badge: '₹2,500' },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'notices', label: 'Campus Pulse', icon: Bell, badge: '3 New' },
  ];

  const smartTools = [
    { id: 'insights', label: 'Academic Intelligence', icon: Sparkles, highlight: true },
    { id: 'planner', label: 'Smart Day Planner', icon: Clock },
    { id: 'digital-id', label: 'Digital Student ID', icon: QrCode },
  ];

  const handleNav = (id) => {
    setActivePage(id);
    divineAudio.playTap();
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 md:w-72 glass-panel border-r border-amber-500/20 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Top Bar */}
        <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-midnight-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/aurenix_logo_gold.png" 
                  alt="Aurenix" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="font-serif font-black text-amber-300 tracking-wider text-base uppercase">
                Aurenix
              </h2>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">
                Divine Academy
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-midnight-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Profile Card */}
        {userRole === 'student' ? (
          <div className="px-4 py-3 mx-3 my-2 rounded-2xl bg-midnight-900/80 border border-amber-500/25 flex items-center gap-3 shadow-inner">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shrink-0">
              <img 
                src="/assets/fahima_portrait.png" 
                alt={studentData.name} 
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => { e.target.src = "/assets/fahima_avatar.png"; }}
              />
              <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-midnight-950" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-slate-100 truncate">{studentData.name}</h3>
              <p className="text-[10px] text-amber-300 font-mono truncate">{studentData.shortProgramme} • {studentData.year}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Active Enrolled
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3 mx-3 my-2 rounded-2xl bg-midnight-900/80 border border-sky-500/25 flex items-center gap-3 shadow-inner">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 p-0.5 shrink-0 flex items-center justify-center text-midnight-950 font-bold">
              <School className="w-6 h-6 text-midnight-950" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-slate-100 truncate">Dr. Aris Thorne</h3>
              <p className="text-[10px] text-sky-300 font-mono truncate">Faculty • Dept of CA</p>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                Staff ID: SKA-FAC-102
              </span>
            </div>
          </div>
        )}

        {/* Navigation Links Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          
          {userRole === 'faculty' && (
            <div className="mb-3">
              <button
                onClick={() => handleNav('faculty')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePage === 'faculty'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-midnight-950 shadow-md font-bold'
                    : 'text-sky-300 hover:bg-sky-500/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <School className="w-4 h-4" />
                  <span>Faculty Dashboard</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          )}

          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 px-3 py-1.5">
            Student Portal
          </div>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-midnight-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-midnight-950' : 'text-amber-400/80'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-midnight-950 text-amber-300'
                        : item.badge.includes('Due') || item.badge.includes('₹')
                        ? 'bg-coral-500/20 text-coral-400 border border-coral-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Smart Ecosystem Section */}
          <div className="pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Smart Ecosystem</span>
            </div>

            {smartTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activePage === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => handleNav(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-midnight-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-midnight-950' : 'text-sky-400'}`} />
                    <span>{tool.label}</span>
                  </div>
                  {tool.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Settings & Sign Out */}
        <div className="p-3 border-t border-amber-500/20 space-y-1">
          <button
            onClick={() => handleNav('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              activePage === 'settings'
                ? 'bg-amber-500/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-midnight-800'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Preferences</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
