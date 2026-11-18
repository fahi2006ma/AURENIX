import React, { useState } from 'react';
import { 
  Bell, Calendar, MapPin, Clock, Plus, Check, 
  Sparkles, Filter, CheckCircle2, Megaphone, Briefcase, GraduationCap 
} from 'lucide-react';
import { campusPulseNotices } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Notices({ onAskAura, onAddEventToPlanner }) {
  const [activeTab, setActiveTab] = useState('All');
  const [notices, setNotices] = useState(campusPulseNotices);
  const [toast, setToast] = useState('');

  const tabs = ['All', 'Notices', 'Events', 'Placements', 'Workshops', 'Exams'];

  const filtered = notices.filter(
    (n) => activeTab === 'All' || n.category.toLowerCase() === activeTab.toLowerCase()
  );

  const markAsRead = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const handleAddToPlanner = (notice) => {
    divineAudio.playSuccessChord();
    markAsRead(notice.id);
    setNotices((prev) =>
      prev.map((n) => (n.id === notice.id ? { ...n, addedToPlanner: true } : n))
    );
    if (onAddEventToPlanner) {
      onAddEventToPlanner({
        id: `pln-ev-${notice.id}`,
        time: notice.time || '10:00 AM',
        title: `${notice.title} (${notice.venue})`,
        category: 'Event',
        completed: false,
        source: 'event'
      });
    }
    setToast(`Added '${notice.title}' to your Smart Day Planner!`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-amber-400" />
            <span>Campus Pulse & Broadcast Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time administrative circulars, placement opportunities, and university events.
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("When is the Tech Fest?");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask AURA for Event Info</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              divineAudio.playTap();
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 shadow-md font-extrabold'
                : 'bg-midnight-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            className={`p-6 rounded-3xl glass-panel border transition-all ${
              item.isUnread
                ? 'border-amber-500/40 shadow-divine bg-midnight-900/90'
                : 'border-slate-700/60 hover:border-slate-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.category}
                </span>

                {item.isUnread && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-500/20 text-coral-400 border border-coral-500/30">
                    New Notice
                  </span>
                )}

                {item.important && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Priority Alert
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.date}</span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-slate-100 mt-1">
              {item.title}
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {item.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                {item.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" /> {item.time}
                  </span>
                )}
                {item.venue && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-coral-400" /> {item.venue}
                  </span>
                )}
              </div>

              {(item.category === 'Events' || item.category === 'Workshops' || item.category === 'Placements') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToPlanner(item);
                  }}
                  disabled={item.addedToPlanner}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                    item.addedToPlanner
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 hover:brightness-110 active:scale-95 shadow'
                  }`}
                >
                  {item.addedToPlanner ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Day Planner</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Day Planner</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
