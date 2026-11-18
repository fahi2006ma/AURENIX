import React, { useState } from 'react';
import { 
  Sparkles, Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, 
  GraduationCap, School, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { collegeInfo, studentData } from '../data/collegeData';
import { divineAudio } from '../utils/audioChimes';

export default function Login({ onLoginSuccess }) {
  const [roleTab, setRoleTab] = useState('student'); // 'student' | 'faculty'
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Activation / Forgot modal states
  const [modalView, setModalView] = useState(null); // 'activate' | 'forgot' | null
  const [modalEmail, setModalEmail] = useState('');
  const [modalRegNo, setModalRegNo] = useState('');
  const [modalOtp, setModalOtp] = useState('');
  const [modalSuccessMsg, setModalSuccessMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    divineAudio.playTap();

    setTimeout(() => {
      setIsLoading(false);
      // Validate
      if (!loginId.trim() || !password.trim()) {
        setErrorMessage("Please enter both your ID and password.");
        return;
      }

      // Check role
      if (roleTab === 'student' && loginId.toLowerCase().includes('fac')) {
        setErrorMessage("This is a faculty ID. Please switch to the Faculty Login tab.");
        return;
      }
      if (roleTab === 'faculty' && !loginId.toLowerCase().includes('fac') && loginId.toLowerCase().includes('bca')) {
        setErrorMessage("This is a student registration number. Please switch to the Student Login tab.");
        return;
      }

      divineAudio.playSuccessChord();
      onLoginSuccess(roleTab);
    }, 600);
  };

  const handleDemoLogin = (role) => {
    divineAudio.playTap();
    setRoleTab(role);
    if (role === 'student') {
      setLoginId(studentData.id);
      setPassword('aurenix2026');
    } else {
      setLoginId('SKA-FAC-102');
      setPassword('faculty@2026');
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      divineAudio.playSuccessChord();
      onLoginSuccess(role);
    }, 500);
  };

  const handleActivateSubmit = (e) => {
    e.preventDefault();
    divineAudio.playTap();
    setModalSuccessMsg("One-Time Password (OTP) sent to your registered email! Your account has been verified.");
    setTimeout(() => {
      setModalView(null);
      setModalSuccessMsg('');
      setLoginId(modalRegNo || studentData.id);
      setPassword('aurenix2026');
    }, 2000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    divineAudio.playTap();
    setModalSuccessMsg("Password reset link has been dispatched to your registered email.");
    setTimeout(() => {
      setModalView(null);
      setModalSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 z-10">
      
      {/* Background Architectural Canvas Glow */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden glass-panel-gold border border-amber-500/30 shadow-divine-lg grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Hero Region (Modern glass campus architecture from drafts) */}
        <div className="relative lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-850">
          
          {/* Background Campus Facade Image */}
          <div className="absolute inset-0 opacity-25 mix-blend-luminosity hover:opacity-35 transition-opacity duration-700">
            <img 
              src="/assets/campus_facade_sunset.png" 
              alt="Aurenix Campus Architecture" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/assets/media_1794977626880_aec3c301.jpg";
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-transparent" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-divine">
                <div className="w-full h-full bg-midnight-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/aurenix_logo_gold.png" 
                    alt="Logo" 
                    className="w-10 h-10 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <GraduationCap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <div>
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-amber-300 tracking-wider uppercase">
                  Aurenix
                </h1>
                <p className="text-xs text-amber-200/80 tracking-widest uppercase font-medium">
                  University • Divine Ecosystem
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                Next-Gen Smart Student Portal
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
                Your Journey Towards a Brighter Future <br />
                <span className="font-script text-amber-400 text-4xl sm:text-5xl font-normal block mt-1 divine-glow">
                  Begins Here
                </span>
              </h2>
              <p className="mt-4 text-sm text-slate-300/90 max-w-lg leading-relaxed">
                Experience an integrated academic ecosystem powered by <strong className="text-amber-300 font-semibold">AURA AI</strong> — personal attendance intelligence, dynamic grades, and unified campus telemetry.
              </p>
            </div>
          </div>

          {/* Bottom Pillar Highlights */}
          <div className="relative z-10 pt-8 mt-8 border-t border-amber-500/20 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 rounded-2xl bg-midnight-900/60 border border-slate-700/50">
              <GraduationCap className="w-5 h-5 mx-auto text-amber-400 mb-1" />
              <p className="text-xs font-bold text-slate-200">World-Class</p>
              <p className="text-[10px] text-slate-400">Education</p>
            </div>
            <div className="p-2 sm:p-3 rounded-2xl bg-midnight-900/60 border border-slate-700/50">
              <Sparkles className="w-5 h-5 mx-auto text-sky-400 mb-1" />
              <p className="text-xs font-bold text-slate-200">Innovation Hub</p>
              <p className="text-[10px] text-slate-400">AURA AI Core</p>
            </div>
            <div className="p-2 sm:p-3 rounded-2xl bg-midnight-900/60 border border-slate-700/50">
              <ShieldCheck className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
              <p className="text-xs font-bold text-slate-200">Supportive</p>
              <p className="text-[10px] text-slate-400">Community</p>
            </div>
          </div>

        </div>

        {/* Right Authentication Card */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center bg-midnight-900/95 border-t lg:border-t-0 lg:border-l border-amber-500/20">
          
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-slate-100">Welcome Back!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to access your student portal and AURA AI companion.
            </p>
          </div>

          {/* Student vs Faculty Tabs (SRS Section 4.3 P1) */}
          <div className="flex p-1 rounded-2xl bg-midnight-950 border border-slate-700/60 mb-6">
            <button
              type="button"
              onClick={() => {
                setRoleTab('student');
                divineAudio.playTap();
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                roleTab === 'student'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRoleTab('faculty');
                divineAudio.playTap();
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                roleTab === 'faculty'
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-midnight-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Faculty Login</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {roleTab === 'student' ? 'Student ID or Register Number' : 'Staff ID / Faculty Number'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={roleTab === 'student' ? "e.g. 25BCA020" : "e.g. SKA-FAC-102"}
                  className="w-full px-4 py-2.5 pl-10 rounded-xl bg-midnight-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-slate-100 placeholder-slate-500 transition-colors"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl bg-midnight-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-slate-100 placeholder-slate-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-midnight-950 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => setModalView('forgot')}
                className="text-amber-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-midnight-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-midnight-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social or Google divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative px-3 bg-midnight-900 text-[11px] text-slate-500 uppercase tracking-widest">
              or quick demo access
            </span>
          </div>

          {/* Quick 1-Click Demo Buttons (FR-AUTH-11) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('student')}
              className="p-2.5 rounded-xl bg-midnight-950 hover:bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 flex flex-col items-center justify-center gap-0.5 transition-all"
            >
              <span className="text-[11px] font-bold">Demo Student</span>
              <span className="text-[9px] text-slate-400">Fahima F (25BCA020)</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('faculty')}
              className="p-2.5 rounded-xl bg-midnight-950 hover:bg-sky-500/10 border border-sky-500/30 text-xs font-semibold text-sky-300 flex flex-col items-center justify-center gap-0.5 transition-all"
            >
              <span className="text-[11px] font-bold">Demo Faculty</span>
              <span className="text-[9px] text-slate-400">Dr. Aris Thorne</span>
            </button>
          </div>

          {/* Footer links */}
          <div className="mt-6 text-center text-xs text-slate-400">
            <span>New Student? </span>
            <button
              onClick={() => setModalView('activate')}
              className="text-amber-400 font-semibold hover:underline"
            >
              Activate Account
            </button>
            <span className="mx-2">•</span>
            <a href="mailto:support@aurenix.edu.in" className="hover:underline">
              Contact Admin
            </a>
          </div>

        </div>

      </div>

      {/* Modal for Account Activation or Forgot Password */}
      {modalView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-panel-gold border border-amber-500/40 p-6 shadow-divine-lg">
            
            <h3 className="font-serif text-xl font-bold text-amber-300 mb-1">
              {modalView === 'activate' ? 'First-Time Account Activation' : 'Reset Your Password'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {modalView === 'activate' 
                ? 'Enter your university register number and registered email to receive an activation OTP.'
                : 'Enter your registered email address to receive password recovery instructions.'}
            </p>

            {modalSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{modalSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={modalView === 'activate' ? handleActivateSubmit : handleForgotSubmit} className="space-y-3">
                {modalView === 'activate' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Register Number / Student ID
                    </label>
                    <input
                      type="text"
                      required
                      value={modalRegNo}
                      onChange={(e) => setModalRegNo(e.target.value)}
                      placeholder="e.g. 25BCA020"
                      className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Registered University Email
                  </label>
                  <input
                    type="email"
                    required
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="student@aurenix.edu.in"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-700 text-xs text-slate-100"
                  />
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalView(null)}
                    className="flex-1 py-2.5 rounded-xl bg-midnight-800 hover:bg-midnight-700 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold"
                  >
                    {modalView === 'activate' ? 'Send OTP & Activate' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
