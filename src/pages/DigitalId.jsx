import React, { useState } from 'react';
import { 
  QrCode, ShieldCheck, Download, Sparkles, CheckCircle2, 
  RotateCw, Share2, GraduationCap, Lock, Award 
} from 'lucide-react';
import { studentData, collegeInfo } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function DigitalId({ onAskAura }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQrVerification, setShowQrVerification] = useState(false);

  const signedToken = `AUR-DID:2026BCA020:SIG:${Math.random().toString(36).substring(2, 10).toUpperCase()}:EXP:2028-06-30`;

  const handleFlip = () => {
    divineAudio.playTap();
    setIsFlipped(!isFlipped);
  };

  const handleDownload = () => {
    divineAudio.playSuccessChord();
    alert("Digital Student Holographic ID card image exported to your downloads!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <QrCode className="w-7 h-7 text-amber-400" />
            <span>Digital Student ID & Cryptographic Credential</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            NFC & QR-enabled official digital student identification for campus smart gates and exams.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleFlip}
            className="px-3.5 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/60 flex items-center gap-1.5 transition-all"
          >
            <RotateCw className="w-4 h-4 text-sky-400" />
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Digital ID</span>
          </button>
        </div>
      </div>

      {/* Main Holographic Card Display */}
      <div className="flex flex-col items-center justify-center py-6">
        <div 
          onClick={handleFlip}
          className="relative w-full max-w-md h-[540px] rounded-[32px] overflow-hidden glass-panel-gold border-2 border-amber-400/50 shadow-divine-lg cursor-pointer transform transition-transform duration-500 hover:scale-[1.02] flex flex-col justify-between p-6 select-none"
        >
          {/* Holographic light scan bar */}
          <div className="holo-scan" />

          {/* Top Header of ID Card */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow">
                <div className="w-full h-full bg-midnight-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/aurenix_logo_gold.png" 
                    alt="Logo" 
                    className="w-7 h-7 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-serif font-black text-amber-300 text-sm tracking-wider uppercase">
                  {collegeInfo.name}
                </h3>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest block uppercase">
                  Official Smart Student ID
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
              Verified
            </span>
          </div>

          {!isFlipped ? (
            /* Front Face */
            <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
              
              {/* Photo Frame */}
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-tr from-amber-400 via-amber-300 to-sky-400 p-1 shadow-divine mb-4">
                <img 
                  src="/assets/fahima_portrait.png" 
                  alt={studentData.name} 
                  className="w-full h-full object-cover rounded-[22px]"
                  onError={(e) => { e.target.src = "/assets/fahima_avatar.png"; }}
                />
              </div>

              <h2 className="font-serif text-2xl font-black text-slate-100 divine-glow">
                {studentData.name}
              </h2>
              <p className="text-xs text-amber-400 font-semibold tracking-wide mt-0.5">
                {studentData.programme}
              </p>

              {/* Data Grid */}
              <div className="w-full mt-4 grid grid-cols-2 gap-2 text-left bg-midnight-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Register Number</span>
                  <span className="font-mono font-bold text-amber-300">{studentData.registerNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Roll Number</span>
                  <span className="font-mono font-bold text-slate-200">{studentData.id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Department</span>
                  <span className="text-slate-200 truncate block">Comp. Applications</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Validity</span>
                  <span className="font-mono text-emerald-400 font-bold">2025 - 2028</span>
                </div>
              </div>

            </div>
          ) : (
            /* Back Face: Cryptographic QR Code & Barcode */
            <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
              <span className="text-xs font-semibold text-amber-300 mb-2">
                Cryptographic Campus Access Token
              </span>

              {/* Interactive QR Code Card */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQrVerification(true);
                  divineAudio.playTap();
                }}
                className="p-3 bg-white rounded-2xl shadow-lg border-2 border-amber-400 group cursor-pointer hover:scale-105 transition-transform"
                title="Click to simulate admin barcode scanner verification"
              >
                <div className="w-36 h-36 bg-midnight-950 rounded-xl flex flex-col items-center justify-center p-2 text-amber-400">
                  <QrCode className="w-28 h-28 text-white group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[9px] font-mono text-midnight-950 font-bold block mt-1">
                  TAP TO VERIFY TOKEN
                </span>
              </div>

              <div className="mt-4 text-xs text-slate-300 max-w-xs space-y-1">
                <p className="font-mono text-[10px] text-amber-400/90 break-all bg-midnight-950/80 p-2 rounded-xl border border-slate-800">
                  {signedToken}
                </p>
                <p className="text-[10px] text-slate-400">
                  Hold near campus turnstile NFC sensors or library barcode readers for instant clearance.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Card Footer */}
          <div className="relative z-10 pt-3 border-t border-amber-500/25 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-amber-300">
              <Lock className="w-3 h-3 text-amber-400" /> SHA-256 Digitally Signed
            </span>
            <span className="text-slate-400">Blood Group: {studentData.bloodGroup}</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-400 text-center">
          Tap card to flip • Click QR code to simulate security desk scanning
        </p>
      </div>

      {/* Simulator Modal for QR Token Verification (SRS FR-DID-02) */}
      {showQrVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-panel-gold border border-amber-500/40 p-6 shadow-divine-lg">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-base font-bold text-amber-300">
                  Security Guard Gate Scanner
                </h3>
              </div>
              <button
                onClick={() => setShowQrVerification(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold">AUTHENTICATION SUCCESS: Valid Student Credential</span>
              </div>

              <div className="space-y-1.5 p-3 rounded-2xl bg-midnight-950 border border-slate-800 text-slate-300 font-mono text-[11px]">
                <p>Student Name: <strong>{studentData.name}</strong></p>
                <p>Register No: <strong>{studentData.registerNumber}</strong></p>
                <p>Programme: <strong>{studentData.programme}</strong></p>
                <p>Gate Status: <strong>CLEARED FOR ADMISSION</strong></p>
                <p>Timestamp: <strong>{new Date().toISOString()}</strong></p>
              </div>
            </div>

            <button
              onClick={() => setShowQrVerification(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
