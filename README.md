# AURENIX UNIVERSITY STUDENT PORTAL • WITH AURA AI ASSISTANT

> **"Your Campus. Your Intelligence."**  
> *A futuristic & divine next-generation college web ecosystem powered by the Gemini API Core.*

---

## 🌟 Executive Summary

The **AURENIX University Student Portal** is a high-ambition, divine and futuristic web application engineered according to the official **Software Requirements Specification (SRS)** and UI design directives.

### Key Highlights
- **Futuristic & Divine Aesthetic**: Midnight Navy (`#0B132B`), Radiant Divine Gold (`#F59E0B`, `#FFD700`), Coral Amber, and Ice Blue. Features an interactive celestial particle canvas, holographic lighting effects, and sacred geometry typography (Cinzel & Plus Jakarta Sans).
- **AURA AI Chat Assistant**: Floating, 3D animated celestial AI Orb with speech-to-text (Web Speech API), text-to-speech audio synthesis, grounded function calling, scope enforcement, and AI Action Mode smart page navigation.
- **Powered by Gemini API Core**: Configured with the specified 
 and Gemini 3.5/2.5 Flash model with resilient client/server fallback.
- **Imaginary College Dataset**: Comprehensive student record for **Fahima F** (Roll: `25BCA020`, BCA 2nd Year, SKASC Campus) including subject-wise attendance ledgers, 4 semesters of SGPA/CGPA marks, class timetable, assignments, fees due, library loans, campus pulse broadcasts, and daily planner timeline.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Run Automated 20-Point SRS Test Suite
```bash
node tests/suite_20_test_cases.test.js
```
*Validates all 20 end-to-end functional, security, and AI quality test cases (TC-01 through TC-20) including exact-match attendance figures, margin calculations, scope guards, prompt-injection shielding, and navigation triggers.*

---

## 🏛️ Comprehensive Feature Inventory

| Module | Route / Component | Description |
|---|---|---|
| **P1: Login & Auth** | `/login` | Student & Faculty tabs, remember me, forgot password, account activation OTP modal, and **1-Click Demo Login** buttons. |
| **P5: Dashboard** | `/dashboard` | Time-of-day greeting, motivational banner, attendance circular progress ring (92%), CGPA (8.87), next class card, quick action tiles, and upcoming events. |
| **P6: My Profile** | `/profile` | Full student dossier with photo, roll number, academic advisor, read-only registrar info, and editable contact fields. |
| **P7: Attendance** | `/attendance` | Subject-wise attendance ledger, margin calculation (classes that can be missed while staying ≥ 75%), and day-wise calendar matrix. |
| **P8: Mark Sheet** | `/marksheet` | Semester 1–4 grade sheets with internal/external breakdown, SGPA, CGPA, and **instant PDF Mark Sheet download** via jsPDF. |
| **P9: Timetable** | `/timetable` | Weekly schedule grid, highlighted upcoming class, **Timetable PDF download**, and **.ics calendar export**. |
| **P10: Assignments** | `/assignments` | Pending, Submitted, and Overdue tabs, deadline countdowns, file upload simulation with validation, and confetti celebration on submission. |
| **P11: Fees & Payments**| `/fees` | Outstanding fee itemization (₹2,500 due), **interactive simulated payment gateway** (UPI QR, Card, Net Banking), and **Official Payment Receipt PDF generation**. |
| **P12: Library** | `/library` | Currently issued books with due date countdown (₹0 fine) and searchable catalogue with 40+ computer science and AI titles. |
| **P13: Campus Pulse** | `/notices` | Categorized circulars (All, Notices, Events, Placements, Workshops, Exams) with unread counters and **"Add to Day Planner"** action. |
| **P14: Academic Intelligence** | `/insights` | Attendance velocity, multi-semester CGPA progression chart, and AI predictive performance insights. |
| **P15: Smart Day Planner** | `/planner` | Unified chronological daily schedule merging classes, exams, assignment deadlines, campus events, and personal student tasks. |
| **P16: Digital Student ID** | `/digital-id` | Holographic 3D ID card with glowing border, student photo, validity, **cryptographically signed QR code**, and gate verification simulator. |
| **P17: Settings** | `/settings` | Dark/Light theme switch, notification channels, speech recognition language (English - India), TTS toggle, and chat history purge. |
| **F1: Faculty Dashboard** | `/faculty` | Teacher portal for **Dr. Aris Thorne** to mark attendance for classes, record CIA internal marks, and broadcast campus circulars. |
| **Universal Search** | `Ctrl + K` | Global spotlight search across pages, subjects, notices, and books with direct "Ask AURA AI" jump. |

---

## 🤖 AURA AI Assistant Specification

### 1. Grounded Functions (SRS Section 5.8)
- `get_attendance(subject)`: Fetches live attendance figures (Overall: 92%, 193/211 classes).
- `attendance_margin(subject)`: Calculates exact classes that can be missed while staying above 75% ("Good news! You can miss up to 5 more classes in Data Structures").
- `get_marks(semester)`: Semester 1 (8.60), Semester 2 (8.75), Semester 3 (8.87), Semester 4 (provisional 8.92).
- `get_cgpa()`: Cumulative CGPA 8.87 (+0.1 increase).
- `get_timetable(day)`: Returns lecture and lab room timings.
- `get_next_class()`: Data Structures & Algorithms at 11:00 AM in Hall C-204 with Prof. Vikram Raman.
- `get_fee_dues()`: ₹2,500 pending for Semester 4 Lab & Tech Assessment Fee.
- `get_library_status()`: Cormen Algorithms book due in 4 days, Clean Architecture due in 11 days.
- `get_events()` / `get_notices()`: Tech Fest 2026, Google Recruitment Drive, Model Exam schedule.

### 2. Guardrails & Safety (SRS Sections 5.4, 5.5, 5.6)
- **Scope Rule**: Declines non-university queries (sports, cricket, general coding, politics, weather, recipes) with warm polite redirects.
- **Identity Shield**: Keeps LLM implementation details strictly confidential; never confirms or denies underlying models or providers.
- **Empathy & Wellness**: Detects student distress/stress and kindly points to Dr. Aris Thorne and the University Counseling Cell (Room S-102).
- **AI Action Mode**: Renders interactive navigation buttons under responses (`[Open Attendance]`, `[Open Mark Sheet]`, `[Open Fees]`).

---

## 🎨 Asset Integration
All assets provided by the user have been processed and integrated:
- `public/assets/campus_facade_sunset.png`: Architectural glass campus building at sunset.
- `public/assets/aurenix_logo_gold.png`: Official Aurenix golden celestial star emblem.
- `public/assets/fahima_portrait.png`: High-resolution student photo.
- `public/assets/aura_ai_bot.png`: AURA AI mascot robot.
- `public/assets/graduation_books_banner.png`: Dashboard motivation banner.

---
*Created for Sri Krishna Arts and Science College (SKASC) • Aurenix University Portal v1.0*
