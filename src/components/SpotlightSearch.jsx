import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Sparkles, LayoutDashboard, Award, Calendar, FileText, 
  CreditCard, BookOpen, Bell, ArrowRight, CornerDownLeft 
} from 'lucide-react';
import { studentData, campusPulseNotices, libraryData } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function SpotlightSearch({ isOpen, onClose, setActivePage, onAskAura }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search
          document.dispatchEvent(new CustomEvent('open-spotlight-search'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const searchResults = [];

  // Pages match
  const pages = [
    { title: 'Student Dashboard', page: 'dashboard', category: 'Pages', icon: LayoutDashboard },
    { title: 'My Profile & Records', page: 'profile', category: 'Pages', icon: LayoutDashboard },
    { title: 'Attendance Progress & Ledger', page: 'attendance', category: 'Pages', icon: Award },
    { title: 'Official Mark Sheet & SGPA', page: 'marksheet', category: 'Pages', icon: Award },
    { title: 'Academic Weekly Timetable', page: 'timetable', category: 'Pages', icon: Calendar },
    { title: 'Course Assignments & Submissions', page: 'assignments', category: 'Pages', icon: FileText },
    { title: 'Fees, Dues & Online Payment', page: 'fees', category: 'Pages', icon: CreditCard },
    { title: 'Central Library & Issued Books', page: 'library', category: 'Pages', icon: BookOpen },
    { title: 'Campus Pulse & University Notices', page: 'notices', category: 'Pages', icon: Bell },
    { title: 'Academic Intelligence Analytics', page: 'insights', category: 'Smart Tools', icon: Sparkles },
    { title: 'Smart Day Planner & Reminders', page: 'planner', category: 'Smart Tools', icon: Calendar },
    { title: 'Digital Student ID Card (QR Verified)', page: 'digital-id', category: 'Smart Tools', icon: Award },
  ];

  pages.forEach(p => {
    if (!q || p.title.toLowerCase().includes(q) || p.page.includes(q)) {
      searchResults.push({
        type: 'page',
        id: `page-${p.page}`,
        title: p.title,
        subtitle: `Jump to ${p.page} page`,
        category: p.category,
        page: p.page
      });
    }
  });

  // Subjects match
  studentData.subjects.forEach(sub => {
    if (sub.name.toLowerCase().includes(q) || sub.code.toLowerCase().includes(q) || sub.faculty.toLowerCase().includes(q)) {
      searchResults.push({
        type: 'subject',
        id: `sub-${sub.code}`,
        title: `${sub.code}: ${sub.name}`,
        subtitle: `Faculty: ${sub.faculty} • Attendance: ${sub.percentage}%`,
        category: 'Subjects',
        page: 'attendance'
      });
    }
  });

  // Notices match
  campusPulseNotices.forEach(n => {
    if (n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)) {
      searchResults.push({
        type: 'notice',
        id: `not-${n.id}`,
        title: n.title,
        subtitle: `${n.category} • ${n.date} at ${n.venue}`,
        category: 'Notices & Events',
        page: 'notices'
      });
    }
  });

  // Library books
  libraryData.catalogue.forEach(b => {
    if (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) {
      searchResults.push({
        type: 'book',
        id: `book-${b.id}`,
        title: b.title,
        subtitle: `Author: ${b.author} • Category: ${b.category}`,
        category: 'Library Catalog',
        page: 'library'
      });
    }
  });

  const handleSelect = (item) => {
    divineAudio.playTap();
    onClose();
    if (item.page) {
      setActivePage(item.page);
    }
  };

  const handleAskAuraDirect = () => {
    divineAudio.playTap();
    onClose();
    onAskAura(query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-gold border border-amber-500/30 shadow-divine-lg overflow-hidden flex flex-col max-h-[75vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-amber-500/20 flex items-center gap-3 bg-midnight-900/90">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, subjects, notices, timetable, or ask AURA AI..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-midnight-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ask AURA AI quick bar if query has content */}
        {query.trim().length > 2 && (
          <div 
            onClick={handleAskAuraDirect}
            className="px-5 py-3 bg-amber-500/10 hover:bg-amber-500/20 border-b border-amber-500/20 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 text-xs text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow shrink-0" />
              <span>Ask AURA AI: <strong className="text-amber-200 font-semibold">"{query}"</strong></span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
              <span>Send to AURA</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        )}

        {/* Results list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No campus records matching "{query}".</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Attendance", "Tech Fest", "Fees", or "Cormen".</p>
            </div>
          ) : (
            searchResults.slice(0, 15).map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 cursor-pointer transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-midnight-800 text-amber-400 border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-midnight-950/80 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows or mouse</span>
          <div className="flex items-center gap-3">
            <span>Esc to close</span>
            <span>↵ to select</span>
          </div>
        </div>

      </div>
    </div>
  );
}
