import React, { useState, useEffect } from 'react';
import DivineBackground from './components/DivineBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SpotlightSearch from './components/SpotlightSearch';
import PaymentModal from './components/PaymentModal';
import AuraAiChat from './features/aura-ai/AuraAiChat';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import MarkSheet from './pages/MarkSheet';
import Timetable from './pages/Timetable';
import Assignments from './pages/Assignments';
import Fees from './pages/Fees';
import Library from './pages/Library';
import Notices from './pages/Notices';
import AcademicIntelligence from './pages/AcademicIntelligence';
import DayPlanner from './pages/DayPlanner';
import DigitalId from './pages/DigitalId';
import Settings from './pages/Settings';
import FacultyDashboard from './pages/FacultyDashboard';

import { initialDayPlanner, studentData, campusPulseNotices } from './data/collegeData';
import { divineAudio } from './utils/audioChimes';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Signed in by default for instant review
  const [userRole, setUserRole] = useState('student'); // 'student' | 'faculty'
  const [activePage, setActivePage] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [paymentModalItem, setPaymentModalItem] = useState(null);
  
  // Shared Dynamic State
  const [plannerItems, setPlannerItems] = useState(initialDayPlanner);
  const [notices, setNotices] = useState(campusPulseNotices);

  // Sync theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  // Global search event listener
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    document.addEventListener('open-spotlight-search', handleOpenSearch);
    return () => document.removeEventListener('open-spotlight-search', handleOpenSearch);
  }, []);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setActivePage(role === 'faculty' ? 'faculty' : 'dashboard');
  };

  const handleLogout = () => {
    divineAudio.playTap();
    setIsAuthenticated(false);
    setUserRole('student');
    setActivePage('dashboard');
    setIsChatOpen(false);
  };

  const handleOpenPaymentModal = (feeItem) => {
    divineAudio.playTap();
    setPaymentModalItem(feeItem);
  };

  const handlePaymentSuccess = (paidTxn) => {
    // Update local fee state
    studentData.feesDue.amount = 0;
    studentData.feesDue.status = "Paid";
  };

  const handleAskAura = (promptText) => {
    setIsChatOpen(true);
    divineAudio.playTap();
  };

  const handleAddEventToPlanner = (eventItem) => {
    setPlannerItems((prev) => [eventItem, ...prev]);
  };

  const handleAddNotice = (newNotice) => {
    setNotices((prev) => [newNotice, ...prev]);
  };

  // If not authenticated, render Login Page (P1)
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen relative overflow-x-hidden ${isDark ? 'dark bg-midnight-950' : 'light bg-ivory-100'}`}>
        <DivineBackground isDark={isDark} />
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative flex flex-col overflow-x-hidden ${isDark ? 'dark bg-midnight-950 text-slate-100' : 'light bg-ivory-100 text-slate-900'}`}>
      
      {/* 1. Divine Animated Starlight Particle Canvas */}
      <DivineBackground isDark={isDark} />

      {/* 2. Top Navigation Bar */}
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
        setActivePage={setActivePage}
        onLogout={handleLogout}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      <div className="flex flex-1 relative z-10">
        
        {/* 3. Left Navigation Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          userRole={userRole}
        />

        {/* 4. Main Page Content Region */}
        <main className="flex-1 lg:ml-64 md:lg:ml-72 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          
          {activePage === 'dashboard' && (
            <Dashboard
              setActivePage={setActivePage}
              onOpenPaymentModal={handleOpenPaymentModal}
              onAskAura={handleAskAura}
            />
          )}

          {activePage === 'profile' && <Profile />}

          {activePage === 'attendance' && (
            <Attendance onAskAura={handleAskAura} />
          )}

          {activePage === 'marksheet' && (
            <MarkSheet onAskAura={handleAskAura} />
          )}

          {activePage === 'timetable' && (
            <Timetable onAskAura={handleAskAura} />
          )}

          {activePage === 'assignments' && (
            <Assignments onAskAura={handleAskAura} />
          )}

          {activePage === 'fees' && (
            <Fees
              onOpenPaymentModal={handleOpenPaymentModal}
              onAskAura={handleAskAura}
            />
          )}

          {activePage === 'library' && (
            <Library onAskAura={handleAskAura} />
          )}

          {activePage === 'notices' && (
            <Notices
              onAskAura={handleAskAura}
              onAddEventToPlanner={handleAddEventToPlanner}
            />
          )}

          {activePage === 'insights' && (
            <AcademicIntelligence onAskAura={handleAskAura} />
          )}

          {activePage === 'planner' && (
            <DayPlanner
              plannerItems={plannerItems}
              setPlannerItems={setPlannerItems}
              onAskAura={handleAskAura}
            />
          )}

          {activePage === 'digital-id' && (
            <DigitalId onAskAura={handleAskAura} />
          )}

          {activePage === 'settings' && (
            <Settings
              isDark={isDark}
              setIsDark={setIsDark}
              onClearHistory={() => {}}
            />
          )}

          {activePage === 'faculty' && (
            <FacultyDashboard onAddNotice={handleAddNotice} />
          )}

        </main>
      </div>

      {/* 5. Floating AURA AI Assistant */}
      <AuraAiChat
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* 6. Universal Spotlight Search Modal (Ctrl+K) */}
      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActivePage={setActivePage}
        onAskAura={(promptText) => {
          setIsChatOpen(true);
        }}
      />

      {/* 7. Interactive Fee Payment Gateway Modal */}
      <PaymentModal
        isOpen={!!paymentModalItem}
        onClose={() => setPaymentModalItem(null)}
        feeItem={paymentModalItem}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
}
