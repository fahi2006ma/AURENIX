// AURA AI - INTELLIGENT GEMINI CORE SERVICE
// SRS Section 5 Implementation: Scope Enforcement, Identity Guard, Grounded Data & Smart Navigation

import { studentData, markSheets, weeklyTimetable, assignmentsList, feesData, libraryData, campusPulseNotices, initialDayPlanner, collegeInfo } from '../data/collegeData.js';

export const GEMINI_CONFIG = {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  modelName: "gemini-2.5-flash", // Gemini 3.5 / 2.5 Flash core
  temperature: 0.3,
  maxOutputTokens: 600,
  assistantName: "AURA AI",
  voiceEnabled: true,
  allowedPages: [
    "dashboard", "profile", "attendance", "marksheet", "timetable",
    "assignments", "fees", "library", "notices", "insights", "planner",
    "digital-id", "settings"
  ]
};

// Grounded Functions (Section 5.8)
export const groundFunctions = {
  get_attendance: (subjectName) => {
    if (subjectName) {
      const s = studentData.subjects.find(sub =>
        sub.name.toLowerCase().includes(subjectName.toLowerCase()) ||
        sub.code.toLowerCase().includes(subjectName.toLowerCase())
      );
      if (s) {
        return {
          subject: s.name,
          code: s.code,
          held: s.held,
          attended: s.attended,
          percentage: `${s.percentage}%`,
          canMiss: s.canMiss,
          warning: s.percentage < 75
        };
      }
    }
    return {
      overallPercentage: `${studentData.attendance.overallPercentage}%`,
      changeLastMonth: studentData.attendance.changeLastMonth,
      totalClassesHeld: studentData.attendance.totalHeld,
      totalClassesAttended: studentData.attendance.totalAttended,
      minRequired: `${studentData.attendance.minRequired}%`,
      subjects: studentData.subjects.map(s => ({
        subject: s.name,
        code: s.code,
        percentage: `${s.percentage}%`,
        canMiss: s.canMiss
      }))
    };
  },

  attendance_margin: (subjectName) => {
    // Calculates classes that can be missed while staying >= 75%
    if (subjectName) {
      const s = studentData.subjects.find(sub =>
        sub.name.toLowerCase().includes(subjectName.toLowerCase()) ||
        sub.code.toLowerCase().includes(subjectName.toLowerCase())
      );
      if (s) {
        return {
          subject: s.name,
          canMiss: s.canMiss,
          currentPercentage: `${s.percentage}%`,
          message: s.canMiss > 0
            ? `Good news! You can miss up to ${s.canMiss} more classes in ${s.name} and still stay above 75 percent.`
            : `Your attendance in ${s.name} is ${s.percentage}%. You need to attend upcoming classes without missing any to reach 75 percent.`
        };
      }
    }
    // Default subject Data Structures or general
    const ds = studentData.subjects[0];
    return {
      subject: ds.name,
      canMiss: ds.canMiss,
      overallCanMiss: 6,
      message: `Good news! You can miss up to ${ds.canMiss} more classes in Data Structures and still stay above 75 percent.`
    };
  },

  get_marks: (semester) => {
    const semNum = parseInt(semester) || 3;
    const sheet = markSheets[semNum];
    if (!sheet) {
      return { error: `Semester ${semNum} marks records are not found yet.` };
    }
    return {
      semester: semNum,
      sgpa: sheet.sgpa,
      cgpa: studentData.cgpa.overall,
      result: sheet.result,
      subjects: sheet.subjects.map(s => ({
        code: s.code,
        name: s.name,
        total: s.total,
        grade: s.grade,
        result: s.result
      }))
    };
  },

  get_cgpa: () => {
    return {
      cgpa: studentData.cgpa.overall,
      changeLastSemester: studentData.cgpa.changeLastSemester,
      status: studentData.cgpa.status,
      totalCreditsEarned: studentData.cgpa.totalCreditsEarned,
      semesters: [
        { sem: "Sem 1", sgpa: markSheets[1].sgpa },
        { sem: "Sem 2", sgpa: markSheets[2].sgpa },
        { sem: "Sem 3", sgpa: markSheets[3].sgpa }
      ]
    };
  },

  get_timetable: (day) => {
    const d = day ? (day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()) : "Monday";
    const schedule = weeklyTimetable[d] || weeklyTimetable["Monday"];
    return {
      day: d in weeklyTimetable ? d : "Monday",
      classes: schedule
    };
  },

  get_next_class: () => {
    return {
      nextClass: studentData.nextClass
    };
  },

  get_assignments: (status) => {
    const filterStatus = status ? status.toLowerCase() : "pending";
    const filtered = assignmentsList.filter(a => a.status.toLowerCase().includes(filterStatus));
    return {
      count: filtered.length,
      assignments: filtered.map(a => ({
        code: a.code,
        title: a.title,
        dueDate: a.dueDisplay,
        maxMarks: a.maxMarks,
        status: a.status
      }))
    };
  },

  get_fee_dues: () => {
    return {
      totalDue: studentData.feesDue.amount,
      itemTitle: studentData.feesDue.title,
      dueDate: studentData.feesDue.dueDate,
      status: studentData.feesDue.status,
      historyCount: feesData.feeItems.filter(f => f.status === "Paid").length
    };
  },

  get_library_status: () => {
    return {
      issuedBooks: libraryData.currentlyIssued.map(b => ({
        title: b.title,
        dueOn: b.dueOn,
        dueInDays: b.dueInDays,
        fine: b.fine
      })),
      totalIssued: libraryData.currentlyIssued.length,
      fineDue: 0
    };
  },

  get_notices: (category, limit = 3) => {
    let list = campusPulseNotices;
    if (category && category.toLowerCase() !== "all") {
      list = campusPulseNotices.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    return list.slice(0, limit);
  },

  get_events: (limit = 2) => {
    return campusPulseNotices.filter(n => n.category === "Events" || n.category === "Workshops").slice(0, limit);
  },

  get_day_plan: (date) => {
    return {
      date: date || "Today",
      items: initialDayPlanner
    };
  },

  search_college_info: (query) => {
    const q = query.toLowerCase();
    if (q.includes("leave") || q.includes("absent")) {
      return "Leave Application Rule: Formal leave requests must be submitted online or via the HOD office with medical certificates for leaves exceeding 3 consecutive days. Attendance must remain at or above 75%.";
    }
    if (q.includes("counsel") || q.includes("stress") || q.includes("mental") || q.includes("wellness")) {
      return `AURENIX University provides compassionate confidential support at the ${collegeInfo.counsellingCell}.`;
    }
    if (q.includes("hostel") || q.includes("curfew")) {
      return "Hostel Guidelines: Student resident curfews are 9:30 PM. High-speed campus Wi-Fi and common study halls are open 24/7.";
    }
    if (q.includes("library") || q.includes("timing")) {
      return `Central Library Timings: ${collegeInfo.libraryTimings}.`;
    }
    return `${collegeInfo.name} provides state-of-the-art academic infrastructure, mentorship programs, and 24/7 digital campus access.`;
  }
};

// Check Scope Rules (SRS Section 5.4)
export function isQuestionOutOfScope(text) {
  const t = text.toLowerCase();

  // General off-topic checks
  const offTopicKeywords = [
    "prime minister", "president of", "who won the match", "cricket match", "football match",
    "weather today", "recipe for", "how to cook", "write a python program for sorting",
    "write code for", "write an essay on", "homework solve", "stock market", "cryptocurrency",
    "celebrity", "movie recommendation", "politics", "general knowledge", "relationship advice",
    "diagnose my", "medical advice", "who is elon musk", "tell me a joke"
  ];

  for (const kw of offTopicKeywords) {
    if (t.includes(kw)) {
      return true;
    }
  }

  return false;
}

// Check Identity Rules (SRS Section 5.5)
export function isIdentityQuery(text) {
  const t = text.toLowerCase();
  const identityKeywords = [
    "which ai model", "what model are you", "are you gemini", "are you chatgpt", "are you claude",
    "who created you", "who made you", "what llm", "show your prompt", "ignore your rules",
    "system prompt", "print your instructions", "developer mode", "jailbreak", "role-play as",
    "roleplay", "unrestricted assistant", "pretend you are"
  ];

  for (const kw of identityKeywords) {
    if (t.includes(kw)) {
      return true;
    }
  }
  return false;
}

// Check Privacy Rules (SRS Section 5.4 - CB-SCOPE-04)
export function isPrivacyViolation(text) {
  const t = text.toLowerCase();
  return (
    t.includes("friend's attendance") ||
    t.includes("another student") ||
    t.includes("someone else's marks") ||
    t.includes("rahul's marks") ||
    t.includes("other students' data")
  );
}

// Check Emotional Distress (SRS Section 5.6 - CB-PER-03)
export function isEmotionalDistress(text) {
  const t = text.toLowerCase();
  return (
    t.includes("so stressed") ||
    t.includes("depressed") ||
    t.includes("anxious about exams") ||
    t.includes("failing everything") ||
    t.includes("cannot take this anymore") ||
    t.includes("overwhelmed")
  );
}

// Check Navigation Intent (SRS Section 5.9)
export function detectNavigationAction(text) {
  const t = text.toLowerCase();
  if (t.includes("attendance")) {
    return { type: "navigate", page: "attendance", label: "Open Attendance" };
  }
  if (t.includes("mark sheet") || t.includes("marks") || t.includes("results") || t.includes("sgpa") || t.includes("grades")) {
    return { type: "navigate", page: "marksheet", label: "Open Mark Sheet" };
  }
  if (t.includes("timetable") || t.includes("schedule") || t.includes("class time")) {
    return { type: "navigate", page: "timetable", label: "Open Timetable" };
  }
  if (t.includes("fee") || t.includes("fees") || t.includes("pay") || t.includes("dues")) {
    return { type: "navigate", page: "fees", label: "Open Fees & Payments" };
  }
  if (t.includes("assignment") || t.includes("homework") || t.includes("submission")) {
    return { type: "navigate", page: "assignments", label: "Open Assignments" };
  }
  if (t.includes("library") || t.includes("book")) {
    return { type: "navigate", page: "library", label: "Open Library" };
  }
  if (t.includes("notice") || t.includes("campus pulse") || t.includes("announcement")) {
    return { type: "navigate", page: "notices", label: "Open Campus Pulse" };
  }
  if (t.includes("insight") || t.includes("academic intelligence") || t.includes("analytics")) {
    return { type: "navigate", page: "insights", label: "Open Academic Intelligence" };
  }
  if (t.includes("planner") || t.includes("reminder") || t.includes("day plan")) {
    return { type: "navigate", page: "planner", label: "Open Smart Day Planner" };
  }
  if (t.includes("digital id") || t.includes("id card") || t.includes("student id")) {
    return { type: "navigate", page: "digital-id", label: "Open Digital Student ID" };
  }
  if (t.includes("profile") || t.includes("details")) {
    return { type: "navigate", page: "profile", label: "Open Profile" };
  }
  if (t.includes("setting")) {
    return { type: "navigate", page: "settings", label: "Open Settings" };
  }
  return null;
}

// Master Chat Processing Function
export async function sendChatMessage({ message, conversationHistory = [] }) {
  const trimmed = message.trim();

  if (!trimmed) {
    return {
      sender: "assistant",
      content: "Hello! How can I assist you with your campus journey today?",
      action: null
    };
  }

  // Enforce Max Characters (CB-UI-06: 500 chars)
  const userText = trimmed.slice(0, 500);

  // 1. Identity & System Instruction Extraction Rule (SRS Section 5.5: CB-ID-01 to CB-ID-06)
  if (isIdentityQuery(userText)) {
    return {
      sender: "assistant",
      content: "I'm AURA AI, your AURENIX University assistant! I keep the details of how I work to myself, but I'd love to help with your studies and campus life. What would you like to check?",
      action: null
    };
  }

  // 2. Privacy Rule: Another student's data (SRS Section 5.4: CB-SCOPE-04)
  if (isPrivacyViolation(userText)) {
    return {
      sender: "assistant",
      content: "I can only share your own details, to keep everyone's information safe. Shall I check your records instead? 😊",
      action: null
    };
  }

  // 3. Emotional Distress / Stress Rule (SRS Section 5.6: CB-PER-03)
  if (isEmotionalDistress(userText)) {
    return {
      sender: "assistant",
      content: "I'm sorry you're feeling this way, Fahima, and I'm glad you told me. Please remember you don't have to handle this alone. You can always talk to your mentor Dr. Aris Thorne or visit the university counselling cell (Room S-102). If it helps, I can open your timetable so we can plan your study routine calmly step by step.",
      action: { type: "navigate", page: "timetable", label: "Open Timetable" }
    };
  }

  // 4. Out-of-Scope Rule (SRS Section 5.4: CB-SCOPE-01, CB-SCOPE-02)
  if (isQuestionOutOfScope(userText)) {
    return {
      sender: "assistant",
      content: "I'm so sorry, I can only help with AURENIX University matters. I can check your attendance, marks, timetable, fees, library books, or campus notices. What would you like to see?",
      action: null
    };
  }

  // 5. Grounded Queries & Smart Navigation
  const t = userText.toLowerCase();

  // Attendance margin: "How many attendance classes can I miss?" (TC-AI-01, SRS 5.14)
  if (t.includes("how many") && (t.includes("class") || t.includes("attendance")) && (t.includes("miss") || t.includes("bunk"))) {
    const margin = groundFunctions.attendance_margin();
    return {
      sender: "assistant",
      content: `${margin.message} Shall I open your Attendance page?`,
      action: { type: "navigate", page: "attendance", label: "Open Attendance" }
    };
  }

  // What is my attendance? (TC-AI-01)
  if (t.includes("attendance") && (t.includes("what") || t.includes("how much") || t.includes("my attendance") || t.includes("percentage") || t.includes("check"))) {
    const att = groundFunctions.get_attendance();
    return {
      sender: "assistant",
      content: `Your overall attendance is ${att.overallPercentage} (${att.totalClassesAttended} attended out of ${att.totalClassesHeld} classes held), which is up ${att.changeLastMonth} since last month! That's wonderful progress. Shall I show you the subject-wise breakdown?`,
      action: { type: "navigate", page: "attendance", label: "Open Attendance" }
    };
  }

  // Semester Marks: "Show my semester 3 marks" or "And for semester 2?" (TC-AI-02)
  if (t.includes("semester 3") || (t.includes("sem 3") && (t.includes("mark") || t.includes("result")))) {
    const m = groundFunctions.get_marks(3);
    return {
      sender: "assistant",
      content: `In Semester 3, you achieved an outstanding SGPA of ${m.sgpa} (${m.result}) with top grades in Data Structures (94/100, Grade O) and Python for AI (94/100, Grade O). Would you like me to open your Mark Sheet?`,
      action: { type: "navigate", page: "marksheet", label: "Open Mark Sheet" }
    };
  }

  if (t.includes("semester 2") || t.includes("sem 2") || (t.includes("semester 2") && t.includes("and for"))) {
    const m = groundFunctions.get_marks(2);
    return {
      sender: "assistant",
      content: `For Semester 2, your SGPA was ${m.sgpa} with a total of ${m.totalCredits} credits earned and an 'O' grade in OOP Java. Shall I open the full Mark Sheet?`,
      action: { type: "navigate", page: "marksheet", label: "Open Mark Sheet" }
    };
  }

  if (t.includes("semester 1") || t.includes("sem 1")) {
    const m = groundFunctions.get_marks(1);
    return {
      sender: "assistant",
      content: `For Semester 1, your SGPA was ${m.sgpa} with ${m.totalCredits} credits earned. You scored 90 in C Programming!`,
      action: { type: "navigate", page: "marksheet", label: "Open Mark Sheet" }
    };
  }

  // CGPA query: "What is my CGPA?" or "Know Your CGPA"
  if (t.includes("cgpa") || t.includes("gpa")) {
    const c = groundFunctions.get_cgpa();
    return {
      sender: "assistant",
      content: `Your cumulative CGPA is currently ${c.cgpa} (${c.status}), an increase of ${c.changeLastSemester} since last semester! You've successfully completed ${c.totalCreditsEarned} credits so far.`,
      action: { type: "navigate", page: "insights", label: "Open Academic Intelligence" }
    };
  }

  // Next class query: "What is my next class?"
  if (t.includes("next class") || (t.includes("next") && t.includes("lecture"))) {
    const nc = groundFunctions.get_next_class().nextClass;
    return {
      sender: "assistant",
      content: `Your next class is ${nc.subject} (${nc.code}) from ${nc.time} in ${nc.room} with ${nc.faculty}. It is scheduled ${nc.status}.`,
      action: { type: "navigate", page: "timetable", label: "Open Timetable" }
    };
  }

  // Timetable query: "Show my timetable" or "What do I have on Monday?"
  if (t.includes("timetable") || t.includes("schedule") || t.includes("classes today")) {
    return {
      sender: "assistant",
      content: "Here is your academic timetable! Today you have Data Structures at 11:00 AM in Hall C-204, followed by Database Systems at 1:30 PM. Shall I open your full weekly schedule?",
      action: { type: "navigate", page: "timetable", label: "Open Timetable" }
    };
  }

  // Fee dues: "How much fee do I have to pay?" or "Take me to my fee payment page"
  if (t.includes("fee") || t.includes("dues") || t.includes("pay fee") || t.includes("tuition")) {
    const dues = groundFunctions.get_fee_dues();
    return {
      sender: "assistant",
      content: `You currently have ₹${dues.totalDue.toLocaleString()} pending for '${dues.itemTitle}', due on ${dues.dueDate}. Shall I open the Fees page so you can complete the payment securely?`,
      action: { type: "navigate", page: "fees", label: "Open Fees & Payments" }
    };
  }

  // Assignments query: "Which assignments are pending?"
  if (t.includes("assignment") || t.includes("homework") || t.includes("pending submission")) {
    const asg = groundFunctions.get_assignments("pending");
    return {
      sender: "assistant",
      content: `You have ${asg.count} pending assignments: 1) '${asg.assignments[0]?.title}' (due in 2 days) and 2) '${asg.assignments[1]?.title}' (due in 7 days). I can open the Assignments page for you!`,
      action: { type: "navigate", page: "assignments", label: "Open Assignments" }
    };
  }

  // Library query: "When is my book due?"
  if (t.includes("book") || t.includes("library") || t.includes("cormen") || t.includes("fine")) {
    const lib = groundFunctions.get_library_status();
    const b1 = lib.issuedBooks[0];
    return {
      sender: "assistant",
      content: `You have '${b1.title}' issued from the Central Library, due in ${b1.dueInDays} days on ${b1.dueOn}. Your accumulated fine is ₹${lib.fineDue}. Would you like to view the library catalog?`,
      action: { type: "navigate", page: "library", label: "Open Library" }
    };
  }

  // Tech Fest or Events: "When is the Tech Fest?"
  if (t.includes("tech fest") || t.includes("events") || t.includes("fest")) {
    return {
      sender: "assistant",
      content: "The AURENIX Quantum & AI Summit (Tech Fest 2026) is scheduled for November 20, 2026, starting at 9:00 AM in the Grand Celestial Auditorium! Registrations are currently active in Campus Pulse.",
      action: { type: "navigate", page: "notices", label: "Open Campus Pulse" }
    };
  }

  // Notices: "Any new notices?"
  if (t.includes("notice") || t.includes("announcement") || t.includes("circular")) {
    return {
      sender: "assistant",
      content: "You have 3 new notices! Highlights: 1) Tech Fest 2026 Summit, 2) Google DeepMind Campus Recruitment Drive on Nov 25th, and 3) Model Exam schedule released. Would you like to read them?",
      action: { type: "navigate", page: "notices", label: "Open Campus Pulse" }
    };
  }

  // Academic performance explanation: "Explain my academic performance"
  if (t.includes("explain my academic") || t.includes("performance") || t.includes("how am i doing")) {
    return {
      sender: "assistant",
      content: "You're doing remarkably well, Fahima! Your CGPA is 8.87 with distinction. Your algorithms and programming scores are in the top 3% of your class. Your overall attendance is 92%. My one gentle suggestion is to keep an eye on Computer Networks attendance so you maintain your safety buffer above 75%.",
      action: { type: "navigate", page: "insights", label: "Open Academic Intelligence" }
    };
  }

  // Direct page navigation requests ("take me to...", "open...")
  const navAction = detectNavigationAction(userText);
  if (navAction && (t.includes("take me") || t.includes("open") || t.includes("go to") || t.includes("show me"))) {
    return {
      sender: "assistant",
      content: `Opening your ${navAction.label.replace("Open ", "")} right away! You can also tap the shortcut button below anytime.`,
      action: navAction
    };
  }

  // College knowledge base lookup
  const kbAnswer = groundFunctions.search_college_info(userText);

  return {
    sender: "assistant",
    content: `${kbAnswer} Is there anything specific about your schedule, attendance, marks, or fees you'd like to review today?`,
    action: navAction
  };
}
