import React, { useState } from 'react';
import { 
  Clock, Plus, CheckCircle2, Circle, Trash2, Calendar, 
  Sparkles, Check, Tag, AlertCircle 
} from 'lucide-react';
import { initialDayPlanner, studentData } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function DayPlanner({ plannerItems = initialDayPlanner, setPlannerItems, onAskAura }) {
  const [items, setItems] = useState(plannerItems);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('04:00 PM');
  const [newCategory, setNewCategory] = useState('Personal');
  const [isAdding, setIsAdding] = useState(false);

  const toggleComplete = (id) => {
    divineAudio.playTap();
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      if (setPlannerItems) setPlannerItems(updated);
      return updated;
    });
  };

  const deleteItem = (id) => {
    divineAudio.playTap();
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (setPlannerItems) setPlannerItems(updated);
      return updated;
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    divineAudio.playSuccessChord();
    const newItem = {
      id: `pln-${Date.now()}`,
      time: newTime,
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      source: 'personal'
    };

    setItems((prev) => {
      const updated = [...prev, newItem];
      if (setPlannerItems) setPlannerItems(updated);
      return updated;
    });

    setNewTitle('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Clock className="w-7 h-7 text-amber-400" />
            <span>Smart Day Planner</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Chronological academic day orchestrator merging timetables, deadlines, events, and personal goals.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Reminder</span>
        </button>
      </div>

      {/* Add New Reminder Form (Collapsible) */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="p-6 rounded-3xl glass-panel-gold border border-amber-500/40 shadow-divine space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-amber-300">
              Create New Personal Schedule Item
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Reminder / Task Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Study for Web Tech Quiz or Group Project Call"
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Time
              </label>
              <input
                type="text"
                required
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="e.g. 05:00 PM"
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Category:</span>
              {['Personal', 'Study', 'Library', 'Fitness'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setNewCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    newCategory === cat
                      ? 'bg-amber-400 text-midnight-950 font-bold'
                      : 'bg-midnight-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all"
            >
              Save to Timeline
            </button>
          </div>
        </form>
      )}

      {/* Timeline Schedule List */}
      <div className="rounded-3xl glass-panel p-6 border border-amber-500/25">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Today's Unified Timeline: Monday, Nov 18
            </h3>
          </div>
          <span className="text-xs text-amber-300 font-mono">
            {items.filter((i) => i.completed).length} / {items.length} Completed
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all ${
                item.completed
                  ? 'bg-midnight-950/40 border-slate-800/60 opacity-60'
                  : 'bg-midnight-950/90 border-slate-700/80 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform shrink-0"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {item.time}
                    </span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-midnight-900 text-slate-400 border border-slate-800">
                      {item.category}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-semibold mt-0.5 ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.title}
                  </h4>
                </div>
              </div>

              {item.source === 'personal' && (
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
