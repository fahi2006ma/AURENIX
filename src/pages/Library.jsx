import React, { useState } from 'react';
import { 
  BookOpen, Search, Clock, CheckCircle2, Bookmark, 
  Sparkles, AlertCircle, Filter, ArrowRight 
} from 'lucide-react';
import { libraryData, studentData } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Library({ onAskAura }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [reservedBooks, setReservedBooks] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', 'AI & ML', 'Database', 'Networking', 'Architecture', 'OS', 'Quantum', 'Software'];

  const filteredCatalogue = libraryData.catalogue.filter((b) => {
    const matchesCat = activeCategory === 'All' || b.category === activeCategory;
    const matchesQ = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQ;
  });

  const handleReserve = (book) => {
    divineAudio.playSuccessChord();
    setReservedBooks((prev) => ({ ...prev, [book.id]: true }));
    setToastMessage(`Reserved '${book.title}' for pickup at Central Library circulation desk!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-amber-400" />
            <span>Central Digital & Physical Library</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dr. APJ Abdul Kalam Knowledge Hub • 250,000+ volumes, ACM & IEEE digital access.
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("When is my library book due?");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask AURA Due Dates</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Currently Issued Books (SRS FR-LIB-01) */}
      <div className="rounded-3xl glass-panel p-6 border border-amber-500/25">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-slate-100">
            Currently Issued Books ({libraryData.currentlyIssued.length})
          </h3>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> No Overdue Fines (₹0)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {libraryData.currentlyIssued.map((book) => (
            <div
              key={book.id}
              className="p-5 rounded-2xl bg-midnight-950/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
                    {book.accessionNumber}
                  </span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due in {book.dueInDays} days ({book.dueOn})
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-slate-100 leading-snug">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Author: {book.author}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">ISBN: {book.isbn}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Issued: {book.issuedOn}</span>
                <button
                  onClick={() => {
                    divineAudio.playTap();
                    alert(`Renewal request submitted for '${book.title}'. Extended for 14 days.`);
                  }}
                  className="px-3 py-1 rounded-xl bg-midnight-900 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold transition-colors"
                >
                  Renew Online
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Library Catalogue Search (SRS FR-LIB-02) */}
      <div className="rounded-3xl glass-panel p-6 border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Library Catalog Search
            </h3>
            <p className="text-xs text-slate-400">Search 40+ computer science, AI, and engineering titles</p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or keyword..."
              className="w-full px-3.5 py-2 pl-9 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                divineAudio.playTap();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-midnight-950 font-bold shadow'
                  : 'bg-midnight-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCatalogue.map((book) => {
            const isReserved = reservedBooks[book.id];

            return (
              <div
                key={book.id}
                className="p-4 rounded-2xl bg-midnight-950/70 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-midnight-900 text-amber-300 border border-slate-800">
                    {book.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-200 mt-2 line-clamp-2">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{book.author}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {book.available} / {book.total} Available
                  </span>

                  <button
                    onClick={() => handleReserve(book)}
                    disabled={isReserved}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      isReserved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-midnight-900 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isReserved ? 'Reserved ✓' : 'Reserve'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
