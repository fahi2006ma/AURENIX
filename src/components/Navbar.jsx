import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Sun, Moon, Menu, Sparkles, User, LogOut, 
  BookOpen, Calendar, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { studentData, campusPulseNotices, collegeInfo } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Navbar({ 
  isDark, 
  setIsDark, 
  sidebarOpen, 
  setSidebarOpen, 
  onOpenSearch, 
  setActivePage,
  onLogout,
  userRole = 'student',
  setUserRole
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Unread notifications count
  const unreadCount = campusPulseNotices.filter(n => n.isUnread).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST format
      const options = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      setCurrentTime(now.toLocaleDateString('en-IN', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/20 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-midnight-800 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setActivePage('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-midnight-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/aurenix_logo_gold.png" 
                  alt="Aurenix" 
                  className="w-7 h-7 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-black text-amber-300 tracking-wider text-base sm:text-lg uppercase leading-none">
                Aurenix
              </h1>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">
                University Portal
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Box with Ctrl+K shortcut */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={() => {
              onOpenSearch();
              divineAudio.playTap();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-midnight-900/80 border border-slate-700/60 hover:border-amber-400/50 text-xs text-slate-400 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-slate-200 transition-colors">
                Search pages, marks, subjects, timetable...
              </span>
            </div>
            <kbd className="px-2 py-0.5 rounded-lg bg-midnight-800 text-[10px] font-mono text-amber-300/80 border border-slate-700">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Controls: Live Time, Notifications, Theme, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Date/Time Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-900/60 border border-slate-700/50 text-xs text-amber-200/90 font-mono">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentTime || 'Mon, 18 Nov 2026'}</span>
          </div>

          {/* Role Switcher Pill (Demo Student vs Faculty) */}
          <button
            onClick={() => {
              const nextRole = userRole === 'student' ? 'faculty' : 'student';
              setUserRole(nextRole);
              setActivePage(nextRole === 'faculty' ? 'faculty' : 'dashboard');
              divineAudio.playTap();
            }}
            title="Toggle between Student and Faculty portal"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="capitalize">{userRole} View</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              setIsDark(!isDark);
              divineAudio.playTap();
            }}
            title={isDark ? "Switch to Celestial Light mode" : "Switch to Midnight Dark mode"}
            className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-midnight-800/80 border border-transparent hover:border-slate-700 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                divineAudio.playTap();
              }}
              title="Campus Notices & Alerts"
              className="relative p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-midnight-800/80 border border-transparent hover:border-slate-700 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-coral-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel-gold border border-amber-500/30 p-3 shadow-divine-lg animate-in fade-in duration-150 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/20">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-serif font-bold text-amber-300 text-xs tracking-wider uppercase">
                      Campus Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('notices');
                      setShowNotifications(false);
                    }}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {campusPulseNotices.slice(0, 4).map((not) => (
                    <div
                      key={not.id}
                      onClick={() => {
                        setActivePage('notices');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-midnight-900/70 hover:bg-amber-500/10 border border-slate-700/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {not.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{not.date}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{not.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{not.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                divineAudio.playTap();
              }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-2xl bg-midnight-900/70 border border-amber-500/30 hover:border-amber-400/60 transition-all"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5">
                <img 
                  src="/assets/fahima_portrait.png" 
                  alt={studentData.name} 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "/assets/fahima_avatar.png";
                  }}
                />
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-semibold text-slate-200 block leading-tight">
                  {studentData.name}
                </span>
                <span className="text-[10px] text-amber-400/90 font-mono">
                  {studentData.id}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-gold border border-amber-500/30 p-2 shadow-divine-lg animate-in fade-in duration-150 z-50">
                <div className="px-3 py-2 border-b border-amber-500/20 mb-1">
                  <p className="text-xs font-bold text-amber-300">{studentData.name}</p>
                  <p className="text-[10px] text-slate-400">{studentData.email}</p>
                  <p className="text-[10px] text-amber-400/80 mt-0.5">{studentData.programme}</p>
                </div>

                <button
                  onClick={() => {
                    setActivePage('profile');
                    setShowUserMenu(false);
                    divineAudio.playTap();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-amber-300 hover:bg-midnight-800 rounded-xl transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>My Student Profile</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('digital-id');
                    setShowUserMenu(false);
                    divineAudio.playTap();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-amber-300 hover:bg-midnight-800 rounded-xl transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Digital Student ID</span>
                </button>

                <div className="my-1 border-t border-slate-700/50" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
