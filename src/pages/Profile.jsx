import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, Calendar, 
  Camera, Check, AlertCircle, Sparkles, GraduationCap 
} from 'lucide-react';
import { studentData, collegeInfo } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Profile() {
  const [phone, setPhone] = useState(studentData.phone);
  const [address, setAddress] = useState(studentData.address);
  const [guardianPhone, setGuardianPhone] = useState(studentData.guardianPhone);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    divineAudio.playSuccessChord();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
          <User className="w-7 h-7 text-amber-400" />
          <span>Student Dossier & Official Profile</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          University registrar student record • Contact updates are logged in the audit ledger.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">Personal contact information updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Photo & Key Identifiers */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-gold p-6 border border-amber-500/30 flex flex-col items-center text-center shadow-divine">
          
          <div className="relative w-36 h-36 rounded-3xl overflow-hidden bg-gradient-to-tr from-amber-400 to-amber-600 p-1 shadow-divine mb-4 group">
            <img 
              src="/assets/fahima_portrait.png" 
              alt={studentData.name} 
              className="w-full h-full object-cover rounded-[22px]"
              onError={(e) => { e.target.src = "/assets/fahima_avatar.png"; }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[22px] cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-100">
            {studentData.name}
          </h3>
          <p className="text-xs text-amber-400 font-mono mt-0.5 font-bold">
            {studentData.registerNumber}
          </p>

          <span className="mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {studentData.programme}
          </span>

          <div className="w-full mt-6 pt-4 border-t border-amber-500/20 space-y-2 text-xs text-left text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Current Semester:</span>
              <span className="font-bold text-slate-100">{studentData.semester}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Class Section:</span>
              <span className="font-bold text-slate-100">Section {studentData.section}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Blood Group:</span>
              <span className="font-bold text-slate-100">{studentData.bloodGroup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Admission Date:</span>
              <span className="font-mono text-slate-100">{studentData.admissionDate}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Editable Contact & Read-only Academic Fields */}
        <div className="lg:col-span-8 rounded-3xl glass-panel p-6 border border-slate-700/60 space-y-6">
          
          {/* Read-Only Academic Section (SRS FR-PRO-02) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-sm font-bold text-slate-200 uppercase tracking-wider">
                Institutional Academic Registration (Read Only)
              </h4>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Verified by Registrar
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-midnight-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">College & Campus</span>
                <span className="text-slate-200 font-semibold">{collegeInfo.campus}</span>
              </div>
              <div className="p-3 rounded-2xl bg-midnight-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Department</span>
                <span className="text-slate-200 font-semibold">{studentData.department}</span>
              </div>
              <div className="p-3 rounded-2xl bg-midnight-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Academic Advisor</span>
                <span className="text-slate-200 font-semibold">{studentData.academicAdvisor}</span>
              </div>
              <div className="p-3 rounded-2xl bg-midnight-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">University Email</span>
                <span className="text-amber-300 font-mono">{studentData.email}</span>
              </div>
            </div>
          </div>

          {/* Editable Contact Fields (SRS FR-PRO-02) */}
          <div>
            <h4 className="font-serif text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Student Editable Information
            </h4>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parent / Guardian Contact
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Residential Address
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
