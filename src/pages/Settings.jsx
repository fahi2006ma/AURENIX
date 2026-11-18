import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Moon, Sun, Bell, Shield, 
  Mic, Volume2, Trash2, Key, Check, AlertCircle, Sparkles 
} from 'lucide-react';
import { divineAudio } from '../utils/audioChimes';

export default function Settings({ isDark, setIsDark, onClearHistory }) {
  const [noticeAlerts, setNoticeAlerts] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [feeAlerts, setFeeAlerts] = useState(true);
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(true);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(true);
  const [language, setLanguage] = useState('English (India)');

  // Password Change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    divineAudio.playTap();
    if (newPassword.length < 8) {
      setPwdMessage("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMessage("Passwords do not match.");
      return;
    }
    divineAudio.playSuccessChord();
    setPwdMessage("Password updated successfully!");
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwdMessage(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-amber-400" />
          <span>System Settings & Preferences</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize portal aesthetics, notification channels, security, and AURA AI behaviors.
        </p>
      </div>

      {/* 1. Appearance & Theme (SRS FR-SET-01) */}
      <div className="p-6 rounded-3xl glass-panel border border-amber-500/25 space-y-4">
        <h3 className="font-serif text-base font-bold text-slate-200 flex items-center gap-2">
          {isDark ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
          <span>Appearance & Cosmic Ambiance</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-slate-200">Portal Theme</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Currently using {isDark ? "Midnight Navy & Divine Gold (Dark)" : "Warm Celestial Ivory (Light)"}
            </p>
          </div>

          <button
            onClick={() => {
              setIsDark(!isDark);
              divineAudio.playTap();
            }}
            className="px-4 py-2 rounded-xl bg-midnight-900 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-2"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
            <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
          </button>
        </div>
      </div>

      {/* 2. AURA AI Assistant Preferences (SRS FR-SET-04, 5.10) */}
      <div className="p-6 rounded-3xl glass-panel-gold border border-amber-500/30 space-y-4 shadow-divine">
        <h3 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
          <span>AURA AI Assistant Settings</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Voice Speech-to-Text (STT)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Enable browser Web Speech API microphone input</p>
            </div>
            <input
              type="checkbox"
              checked={voiceInputEnabled}
              onChange={(e) => {
                setVoiceInputEnabled(e.target.checked);
                divineAudio.playTap();
              }}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0 bg-midnight-900 border-slate-700"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Voice Synthesis (TTS Read-Aloud)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Synthesize spoken responses with warm audio voice</p>
            </div>
            <input
              type="checkbox"
              checked={voiceSpeechEnabled}
              onChange={(e) => {
                setVoiceSpeechEnabled(e.target.checked);
                divineAudio.playTap();
              }}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0 bg-midnight-900 border-slate-700"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Default Speech Recognition Dialect</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Configured per SRS Section 5.10 (CB-VOI-04)</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-amber-300 font-semibold focus:outline-none"
            >
              <option value="English (India)">English (India)</option>
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Clear Conversation History</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Purge saved chat logs in compliance with DPDP Act 2023</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Purge all AURA AI conversation history?")) {
                  if (onClearHistory) onClearHistory();
                  divineAudio.playTap();
                  alert("Conversation history cleared.");
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Notification Preferences (SRS FR-SET-02) */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-700/60 space-y-4">
        <h3 className="font-serif text-base font-bold text-slate-200 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          <span>Notification Dispatch Channels</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Campus Pulse & Circular Alerts</span>
            <input
              type="checkbox"
              checked={noticeAlerts}
              onChange={(e) => setNoticeAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0 bg-midnight-900 border-slate-700"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Assignment Deadline Reminders (48h prior)</span>
            <input
              type="checkbox"
              checked={deadlineAlerts}
              onChange={(e) => setDeadlineAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0 bg-midnight-900 border-slate-700"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-midnight-950/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Tuition & Assessment Fee Due Dates</span>
            <input
              type="checkbox"
              checked={feeAlerts}
              onChange={(e) => setFeeAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0 bg-midnight-900 border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* 4. Security & Password Change (SRS FR-SET-03) */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-700/60 space-y-4">
        <h3 className="font-serif text-base font-bold text-slate-200 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span>Security & Credential Management</span>
        </h3>

        {pwdMessage && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            pwdMessage.includes('success') 
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{pwdMessage}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Current Security Password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Password (minimum 8 characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all"
          >
            Update Security Password
          </button>
        </form>
      </div>

    </div>
  );
}
