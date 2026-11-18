// AURENIX UNIVERSITY - IMAGINARY COLLEGE COMPREHENSIVE DATASET
// Designed according to SRS specifications for Aurenix University Student Portal

export const collegeInfo = {
  name: "AURENIX University",
  tagline: "Learn • Innovate • Excel",
  portalName: "AURENIX University Student Portal",
  aiAssistantName: "AURA AI",
  aiTagline: "Your Campus. Your Intelligence.",
  campus: "SKASC Celestial Innovation Campus",
  established: 2012,
  address: "Celestial Valley Road, Tech Corridor, Bangalore - 560100",
  contactEmail: "support@aurenix.edu.in",
  contactPhone: "+91 (80) 4590-2000",
  counsellingCell: "Student Welfare & Counseling Center (Room S-102, wellness@aurenix.edu.in, Ext: 404)",
  libraryTimings: "Monday - Saturday: 8:00 AM - 10:00 PM (24/7 during Examination Weeks)",
  attendanceRule: "Minimum 75% mandatory overall and per subject to qualify for Semester End Examinations."
};

export const studentData = {
  id: "25BCA020",
  registerNumber: "2026BCA020",
  name: "Fahima F",
  firstName: "Fahima",
  programme: "BCA (Bachelor of Computer Applications)",
  shortProgramme: "BCA",
  year: "2nd Year",
  semester: 4,
  department: "Department of Computer Applications",
  section: "A",
  academicAdvisor: "Dr. Aris Thorne (Professor, AI & Data Systems)",
  photo: "/assets/fahima_portrait.png",
  avatarBackup: "/assets/fahima_avatar.png",
  email: "fahima.f@aurenix.edu.in",
  phone: "+91 98450 12345",
  address: "42 Celestial Vista, Skylight Enclave, Bangalore - 560001",
  guardian: "Farooq F. & Fathima Begum",
  guardianPhone: "+91 98450 54321",
  admissionDate: "August 12, 2025",
  bloodGroup: "O+",
  dob: "2005-04-18",
  
  // High-level Metrics (Dashboard)
  attendance: {
    overallPercentage: 92,
    changeLastMonth: "+2%",
    totalHeld: 211,
    totalAttended: 193,
    status: "Good Standing",
    minRequired: 75
  },
  
  cgpa: {
    overall: 8.87,
    changeLastSemester: "+0.1",
    totalCreditsEarned: 68,
    status: "Distinction Grade"
  },
  
  nextClass: {
    subject: "Data Structures & Algorithms",
    code: "CS-201",
    time: "11:00 AM - 12:30 PM",
    room: "Hall C-204 (Turing Hall)",
    faculty: "Prof. Vikram Raman",
    status: "Upcoming in 30 mins"
  },
  
  feesDue: {
    amount: 2500,
    title: "Semester 4 Lab & Tech Assessment Fee",
    dueDate: "2026-11-28",
    status: "Pending"
  },

  subjects: [
    {
      code: "CS-201",
      name: "Data Structures & Algorithms",
      faculty: "Prof. Vikram Raman",
      held: 45,
      attended: 42,
      percentage: 93.3,
      credits: 4,
      canMiss: 5, // classes that can be missed while staying >= 75%
      nextClassTime: "Today, 11:00 AM",
      room: "Hall C-204"
    },
    {
      code: "CS-202",
      name: "Web Technologies & Modern Frameworks",
      faculty: "Dr. Sarah Lin",
      held: 40,
      attended: 38,
      percentage: 95.0,
      credits: 4,
      canMiss: 10,
      nextClassTime: "Today, 02:00 PM",
      room: "Lab Nebula-3"
    },
    {
      code: "CS-203",
      name: "Computer Networks & Security",
      faculty: "Dr. Rajesh Nair",
      held: 42,
      attended: 37,
      percentage: 88.1,
      credits: 4,
      canMiss: 7,
      nextClassTime: "Tomorrow, 09:30 AM",
      room: "Hall A-102"
    },
    {
      code: "CS-204",
      name: "Database Systems & Cloud SQL",
      faculty: "Prof. Ananya Roy",
      held: 48,
      attended: 44,
      percentage: 91.6,
      credits: 4,
      canMiss: 10,
      nextClassTime: "Tomorrow, 11:30 AM",
      room: "Lab Orion-1"
    },
    {
      code: "CS-205",
      name: "Cloud Computing & DevOps",
      faculty: "Dr. Marcus Vance",
      held: 36,
      attended: 32,
      percentage: 88.9,
      credits: 3,
      canMiss: 6,
      nextClassTime: "Thursday, 10:00 AM",
      room: "Cloud Innovation Center"
    }
  ]
};

// Semester Mark Sheets
export const markSheets = {
  1: {
    semester: 1,
    sgpa: 8.60,
    totalCredits: 22,
    result: "Passed with Distinction",
    subjects: [
      { code: "CS-101", name: "Problem Solving & C Programming", internal: 28, external: 62, total: 90, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "MA-101", name: "Discrete Mathematical Structures", internal: 26, external: 58, total: 84, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "EC-101", name: "Digital Electronics & Logic Design", internal: 25, external: 56, total: 81, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "EN-101", name: "Professional English Communication", internal: 27, external: 55, total: 82, grade: "A+", gradePoint: 9, credits: 3, result: "Pass" },
      { code: "CS-102P", name: "C Programming Laboratory", internal: 29, external: 65, total: 94, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "VE-101", name: "Value Education & Ethics", internal: 28, external: 58, total: 86, grade: "A+", gradePoint: 9, credits: 3, result: "Pass" }
    ]
  },
  2: {
    semester: 2,
    sgpa: 8.75,
    totalCredits: 23,
    result: "Passed with Distinction",
    subjects: [
      { code: "CS-103", name: "Object Oriented Programming in Java", internal: 28, external: 64, total: 92, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "CS-104", name: "Data Communication", internal: 26, external: 57, total: 83, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "CS-105", name: "Computer Organization & Architecture", internal: 25, external: 60, total: 85, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "MA-102", name: "Probability & Statistics", internal: 27, external: 58, total: 85, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "CS-106P", name: "Java Programming Laboratory", internal: 30, external: 66, total: 96, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "EV-101", name: "Environmental Studies & Ecology", internal: 28, external: 54, total: 82, grade: "A+", gradePoint: 9, credits: 3, result: "Pass" }
    ]
  },
  3: {
    semester: 3,
    sgpa: 8.87,
    totalCredits: 23,
    result: "Passed with Distinction",
    subjects: [
      { code: "CS-201", name: "Data Structures & Algorithms", internal: 29, external: 65, total: 94, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "CS-202", name: "Python for AI & Scientific Computing", internal: 28, external: 66, total: 94, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "CS-203", name: "Operating Systems & Linux Kernel", internal: 27, external: 59, total: 86, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "CS-204", name: "Software Engineering & Agile", internal: 26, external: 58, total: 84, grade: "A+", gradePoint: 9, credits: 4, result: "Pass" },
      { code: "CS-205P", name: "Data Structures Lab (C/C++)", internal: 29, external: 67, total: 96, grade: "O", gradePoint: 10, credits: 4, result: "Pass" },
      { code: "CS-206P", name: "Python AI & Machine Learning Lab", internal: 30, external: 68, total: 98, grade: "O", gradePoint: 10, credits: 3, result: "Pass" }
    ]
  },
  4: {
    semester: 4,
    sgpa: 8.92, // Current provisional internal SGPA
    totalCredits: 22,
    result: "Semester In Progress (Internal Marks Published)",
    subjects: [
      { code: "CS-201", name: "Data Structures & Algorithms II", internal: 29, external: null, total: 29, grade: "In Progress", gradePoint: 10, credits: 4, result: "Ongoing" },
      { code: "CS-202", name: "Web Technologies & Modern Frameworks", internal: 30, external: null, total: 30, grade: "In Progress", gradePoint: 10, credits: 4, result: "Ongoing" },
      { code: "CS-203", name: "Computer Networks & Security", internal: 26, external: null, total: 26, grade: "In Progress", gradePoint: 9, credits: 4, result: "Ongoing" },
      { code: "CS-204", name: "Database Systems & Cloud SQL", internal: 28, external: null, total: 28, grade: "In Progress", gradePoint: 9, credits: 4, result: "Ongoing" },
      { code: "CS-205", name: "Cloud Computing & DevOps", internal: 27, external: null, total: 27, grade: "In Progress", gradePoint: 9, credits: 3, result: "Ongoing" },
      { code: "CS-207P", name: "Web & Cloud Development Lab", internal: 29, external: null, total: 29, grade: "In Progress", gradePoint: 10, credits: 3, result: "Ongoing" }
    ]
  }
};

// Timetable
export const weeklyTimetable = {
  Monday: [
    { time: "09:00 - 10:30 AM", code: "CS-203", subject: "Computer Networks & Security", room: "Hall A-102", faculty: "Dr. Rajesh Nair" },
    { time: "11:00 - 12:30 PM", code: "CS-201", subject: "Data Structures & Algorithms", room: "Hall C-204", faculty: "Prof. Vikram Raman", isCurrentNext: true },
    { time: "01:30 - 03:00 PM", code: "CS-204", subject: "Database Systems & Cloud SQL", room: "Lab Orion-1", faculty: "Prof. Ananya Roy" },
    { time: "03:15 - 04:30 PM", code: "CS-207P", subject: "Web Development Lab", room: "Lab Nebula-3", faculty: "Dr. Sarah Lin" }
  ],
  Tuesday: [
    { time: "09:00 - 10:30 AM", code: "CS-202", subject: "Web Technologies", room: "Hall B-101", faculty: "Dr. Sarah Lin" },
    { time: "11:00 - 12:30 PM", code: "CS-205", subject: "Cloud Computing & DevOps", room: "Cloud Hub", faculty: "Dr. Marcus Vance" },
    { time: "01:30 - 04:00 PM", code: "CS-205P", subject: "Cloud & DevOps Hands-on", room: "Lab Nebula-2", faculty: "Dr. Marcus Vance" }
  ],
  Wednesday: [
    { time: "09:30 - 11:00 AM", code: "CS-201", subject: "Data Structures & Algorithms", room: "Hall C-204", faculty: "Prof. Vikram Raman" },
    { time: "11:30 - 01:00 PM", code: "CS-204", subject: "Database Systems", room: "Hall B-101", faculty: "Prof. Ananya Roy" },
    { time: "02:00 - 03:30 PM", code: "CS-203", subject: "Computer Networks", room: "Hall A-102", faculty: "Dr. Rajesh Nair" }
  ],
  Thursday: [
    { time: "09:00 - 10:30 AM", code: "CS-205", subject: "Cloud Computing", room: "Cloud Innovation Center", faculty: "Dr. Marcus Vance" },
    { time: "11:00 - 12:30 PM", code: "CS-202", subject: "Web Technologies & React", room: "Hall B-101", faculty: "Dr. Sarah Lin" },
    { time: "01:30 - 04:30 PM", code: "PROJ-200", subject: "AI Capstone Project Guidance", room: "Turing Lab", faculty: "Dr. Aris Thorne" }
  ],
  Friday: [
    { time: "09:00 - 10:30 AM", code: "CS-201", subject: "Algorithms Problem Solving", room: "Hall C-204", faculty: "Prof. Vikram Raman" },
    { time: "11:00 - 12:30 PM", code: "CS-204", subject: "Cloud SQL Seminar", room: "Lab Orion-1", faculty: "Prof. Ananya Roy" },
    { time: "02:00 - 03:30 PM", code: "SE-201", subject: "Guest Lecture: Future of Quantum AI", room: "Grand Celestial Auditorium", faculty: "Visiting Fellow" }
  ]
};

// Assignments
export const assignmentsList = [
  {
    id: "asg-01",
    code: "CS-201",
    subject: "Data Structures & Algorithms",
    title: "Graph Algorithms Implementation & Complexity Benchmark",
    description: "Implement Dijkstra's and Prim-Jarnik algorithms in C++ or Python. Provide time-complexity charts comparing adjacency lists vs matrix representations.",
    dueDate: "2026-11-20T23:59:00",
    dueDisplay: "Nov 20, 2026 (2 days left)",
    maxMarks: 25,
    status: "Pending",
    allowedFormats: [".pdf", ".zip", ".py", ".cpp"],
    maxFileSizeMb: 15
  },
  {
    id: "asg-02",
    code: "CS-202",
    subject: "Web Technologies",
    title: "Divine & Futuristic UI Dashboard with Modern React",
    description: "Develop a responsive dashboard integrating state management, clean SVG progress charts, and accessibility best practices.",
    dueDate: "2026-11-25T23:59:00",
    dueDisplay: "Nov 25, 2026 (7 days left)",
    maxMarks: 30,
    status: "Pending",
    allowedFormats: [".zip", ".pdf", ".html"],
    maxFileSizeMb: 25
  },
  {
    id: "asg-03",
    code: "CS-204",
    subject: "Database Systems & Cloud SQL",
    title: "Relational Normalization (3NF & BCNF) Case Study",
    description: "Analyze an unnormalized university health portal database schema and convert it to Boyce-Codd Normal Form with SQL query demonstrations.",
    dueDate: "2026-11-10T23:59:00",
    dueDisplay: "Submitted on Nov 9, 2026",
    maxMarks: 30,
    marksAwarded: 28,
    grade: "A+",
    feedback: "Excellent functional dependency diagrams and SQL validation.",
    status: "Submitted",
    submissionFile: "Fahima_F_DB_Normalization_BCNF.pdf"
  },
  {
    id: "asg-04",
    code: "CS-203",
    subject: "Computer Networks & Security",
    title: "Wireshark Packet Analysis & TLS Handshake Audit",
    description: "Capture and annotate an HTTPS TLS 1.3 handshake, DNS resolution, and TCP flow control window states.",
    dueDate: "2026-11-05T23:59:00",
    dueDisplay: "Submitted on Nov 4, 2026",
    maxMarks: 25,
    marksAwarded: 24,
    grade: "O",
    feedback: "Flawless deciphering of cryptographic handshakes.",
    status: "Submitted",
    submissionFile: "Fahima_Networks_TLS_Capture.pdf"
  }
];

// Fees & Payments
export const feesData = {
  totalDue: 2500,
  feeItems: [
    {
      id: "fee-401",
      title: "Semester 4 Lab & Tech Assessment Fee",
      semester: "Semester 4",
      amount: 2500,
      dueDate: "2026-11-28",
      status: "Pending",
      breakdown: [
        { name: "Cloud GPU Laboratory Access", cost: 1200 },
        { name: "University Model Examination Fee", cost: 800 },
        { name: "Digital Library Consortium License", cost: 500 }
      ]
    },
    {
      id: "fee-301",
      title: "Semester 3 Tuition & Institutional Fee",
      semester: "Semester 3",
      amount: 45000,
      dueDate: "2026-07-15",
      status: "Paid",
      paidAt: "2026-07-14 11:20 AM",
      transactionId: "AUR-TXN-90281-SE3",
      paymentMode: "Net Banking (HDFC Bank)"
    },
    {
      id: "fee-201",
      title: "Semester 2 Tuition & Campus Services",
      semester: "Semester 2",
      amount: 45000,
      dueDate: "2026-01-15",
      status: "Paid",
      paidAt: "2026-01-10 03:45 PM",
      transactionId: "AUR-TXN-48192-SE2",
      paymentMode: "UPI (Google Pay)"
    },
    {
      id: "fee-101",
      title: "Semester 1 Admission & Tech Foundation",
      semester: "Semester 1",
      amount: 52000,
      dueDate: "2025-08-15",
      status: "Paid",
      paidAt: "2025-08-12 10:15 AM",
      transactionId: "AUR-TXN-10924-SE1",
      paymentMode: "Credit Card (Visa Infinite)"
    }
  ]
};

// Library Records
export const libraryData = {
  currentlyIssued: [
    {
      id: "lib-01",
      title: "Introduction to Algorithms (4th Edition)",
      author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
      isbn: "978-0262046305",
      accessionNumber: "AUR-LIB-CS-4091",
      issuedOn: "2026-11-04",
      dueOn: "2026-11-22",
      dueInDays: 4,
      fine: 0,
      coverColor: "from-blue-600 to-indigo-900"
    },
    {
      id: "lib-02",
      title: "Clean Architecture: A Craftsman's Guide",
      author: "Robert C. Martin (Uncle Bob)",
      isbn: "978-0134494166",
      accessionNumber: "AUR-LIB-SE-1029",
      issuedOn: "2026-11-08",
      dueOn: "2026-11-29",
      dueInDays: 11,
      fine: 0,
      coverColor: "from-amber-600 to-emerald-900"
    }
  ],
  catalogue: [
    { id: "cat-1", title: "Artificial Intelligence: A Modern Approach (4th Ed)", author: "Stuart Russell & Peter Norvig", category: "AI & ML", available: 5, total: 8 },
    { id: "cat-2", title: "Database System Concepts (7th Ed)", author: "Silberschatz, Korth, Sudarshan", category: "Database", available: 3, total: 6 },
    { id: "cat-3", title: "Computer Networking: A Top-Down Approach (8th Ed)", author: "Kurose & Ross", category: "Networking", available: 7, total: 10 },
    { id: "cat-4", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Architecture", available: 4, total: 4 },
    { id: "cat-5", title: "Operating System Concepts", author: "Silberschatz & Galvin", category: "OS", available: 2, total: 6 },
    { id: "cat-6", title: "Quantum Computing: An Applied Approach", author: "Jack D. Hidary", category: "Quantum", available: 4, total: 5 },
    { id: "cat-7", title: "Deep Learning with Python", author: "François Chollet", category: "AI & ML", available: 6, total: 8 },
    { id: "cat-8", title: "The Pragmatic Programmer: 20th Anniversary", author: "David Thomas & Andrew Hunt", category: "Software", available: 3, total: 4 }
  ]
};

// Campus Pulse & Notices
export const campusPulseNotices = [
  {
    id: "not-01",
    category: "Events",
    title: "Tech Fest 2026: AURENIX Quantum & AI Summit",
    date: "20 Nov 2026",
    time: "09:00 AM - 06:00 PM",
    venue: "Grand Celestial Auditorium & Innovation Pavilion",
    summary: "Annual university flagship tech convergence featuring hackathons, autonomous agent showcases, and keynote lectures by leading AI researchers.",
    isUnread: true,
    important: true,
    addedToPlanner: false
  },
  {
    id: "not-02",
    category: "Placements",
    title: "Google DeepMind & Cloud Campus Recruitment Drive 2026",
    date: "25 Nov 2026",
    time: "10:00 AM",
    venue: "Placement Hall 1 & Online Assessment Labs",
    summary: "Pre-placement talk and coding round for Software Engineering and Research Internships. Eligible: BCA, BSc CS, BTech with CGPA >= 8.0.",
    isUnread: true,
    important: true,
    addedToPlanner: false
  },
  {
    id: "not-03",
    category: "Exams",
    title: "Semester 4 Internal Model Examination Schedule Released",
    date: "17 Nov 2026",
    time: "Official Release",
    venue: "Examination Cell Portal",
    summary: "Model exams for CS-201 through CS-205 commence from December 1st. Timetable and hall seating arrangements have been dispatched.",
    isUnread: true,
    important: false,
    addedToPlanner: false
  },
  {
    id: "not-04",
    category: "Notices",
    title: "Library Timings Extended to 24/7 for Exam Season",
    date: "16 Nov 2026",
    time: "24 Hours Open",
    venue: "Dr. APJ Abdul Kalam Central Library",
    summary: "Night study halls, high-speed fiber internet, and coffee lounges will remain open 24/7 throughout November and December.",
    isUnread: false,
    important: false,
    addedToPlanner: false
  },
  {
    id: "not-05",
    category: "Workshops",
    title: "Hands-on Workshop: Building Agentic LLMs with Gemini 2.5",
    date: "19 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Turing Lab C-101",
    summary: "Interactive technical masterclass on multi-agent swarms, function calling, and structured outputs for next-generation assistants.",
    isUnread: false,
    important: false,
    addedToPlanner: true
  }
];

// Smart Day Planner items
export const initialDayPlanner = [
  { id: "pln-1", time: "09:00 AM", title: "Review Graph Algorithms for Assignment 1", category: "Study", completed: true, source: "personal" },
  { id: "pln-2", time: "11:00 AM", title: "Data Structures & Algorithms Class (Hall C-204)", category: "Class", completed: false, source: "academic" },
  { id: "pln-3", time: "01:30 PM", title: "Database Systems & Cloud SQL (Lab Orion-1)", category: "Class", completed: false, source: "academic" },
  { id: "pln-4", time: "03:15 PM", title: "Web Development Hands-on Laboratory", category: "Lab", completed: false, source: "academic" },
  { id: "pln-5", time: "05:00 PM", title: "Team Meeting: AURENIX Hackathon Project Pitch", category: "Event", completed: false, source: "personal" },
  { id: "pln-6", time: "07:30 PM", title: "Return Cormen Algorithm Book or Renew Online", category: "Library", completed: false, source: "reminder" }
];

// Academic Intelligence Insights
export const academicIntelligenceData = {
  attendanceTrend: [
    { month: "Aug", percentage: 89 },
    { month: "Sep", percentage: 90 },
    { month: "Oct", percentage: 90 },
    { month: "Nov (Current)", percentage: 92 }
  ],
  cgpaProgression: [
    { semester: "Sem 1", gpa: 8.60 },
    { semester: "Sem 2", gpa: 8.75 },
    { semester: "Sem 3", gpa: 8.87 },
    { semester: "Sem 4 (Proj.)", gpa: 8.95 }
  ],
  insights: [
    {
      type: "praise",
      title: "Strong Analytical Mastery",
      text: "You scored 94% in Data Structures and 94% in Python AI in Sem 3. Your algorithms score is in the top 3% of the BCA cohort."
    },
    {
      type: "opportunity",
      title: "Computer Networks Attendance Alert",
      text: "Your attendance in CS-203 stands at 88.1%. While safely above the 75% threshold, missing more than 7 sessions will jeopardize your exam eligibility."
    },
    {
      type: "forecast",
      title: "CGPA 9.0 Milestone on Track",
      text: "Maintaining current internal marks in Web Tech (30/30) and Data Structures (29/30) places your projected cumulative CGPA at 8.95 by the end of this academic year."
    }
  ]
};
