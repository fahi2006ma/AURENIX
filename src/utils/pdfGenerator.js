// PDF Generator utility for Aurenix University Student Portal
// Supports: Mark Sheet PDF, Fee Receipt PDF, Timetable PDF

import { jsPDF } from 'jspdf';
import { collegeInfo, studentData, markSheets, weeklyTimetable, feesData } from '../data/collegeData';

export function downloadMarkSheetPdf(semester = 3) {
  const doc = new jsPDF();
  const sheet = markSheets[semester] || markSheets[3];

  // Header Background
  doc.setFillColor(11, 19, 43); // Midnight Navy
  doc.rect(0, 0, 210, 42, 'F');

  // Gold accent line
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1.5);
  doc.line(0, 42, 210, 42);

  // University Title
  doc.setTextColor(255, 215, 0); // Gold
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(collegeInfo.name.toUpperCase(), 14, 18);

  doc.setTextColor(200, 220, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${collegeInfo.campus} • Official Statement of Grades`, 14, 26);
  doc.text(`Academic Year 2025 - 2026 • Autonomy Affiliated`, 14, 34);

  // Student Details Box
  doc.setFillColor(245, 247, 250);
  doc.rect(14, 48, 182, 32, 'F');
  doc.setDrawColor(210, 215, 225);
  doc.rect(14, 48, 182, 32, 'S');

  doc.setTextColor(20, 30, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student Name: ${studentData.name}`, 20, 56);
  doc.text(`Register No: ${studentData.registerNumber}`, 120, 56);
  doc.text(`Roll Number: ${studentData.id}`, 20, 64);
  doc.text(`Programme: ${studentData.programme}`, 120, 64);
  doc.text(`Semester: ${semester}`, 20, 72);
  doc.text(`Department: ${studentData.department}`, 120, 72);

  // Table Headers
  let startY = 88;
  doc.setFillColor(11, 19, 43);
  doc.rect(14, startY, 182, 10, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('CODE', 18, startY + 6.5);
  doc.text('COURSE TITLE', 42, startY + 6.5);
  doc.text('INTERNAL', 115, startY + 6.5);
  doc.text('EXTERNAL', 135, startY + 6.5);
  doc.text('TOTAL', 158, startY + 6.5);
  doc.text('GRADE', 178, startY + 6.5);

  // Table Rows
  startY += 10;
  sheet.subjects.forEach((subj, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(14, startY, 182, 9, 'F');
    doc.setDrawColor(230, 235, 240);
    doc.line(14, startY + 9, 196, startY + 9);

    doc.setTextColor(40, 50, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(subj.code, 18, startY + 6);
    doc.text(subj.name.length > 36 ? subj.name.substring(0, 34) + '...' : subj.name, 42, startY + 6);
    doc.text(String(subj.internal ?? '-'), 122, startY + 6);
    doc.text(String(subj.external ?? '-'), 142, startY + 6);
    doc.text(String(subj.total ?? '-'), 162, startY + 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(subj.grade === 'O' ? 16 : 40, subj.grade === 'O' ? 120 : 50, subj.grade === 'O' ? 80 : 70);
    doc.text(subj.grade, 182, startY + 6);

    startY += 9;
  });

  // Summary footer box
  startY += 6;
  doc.setFillColor(235, 245, 255);
  doc.rect(14, startY, 182, 18, 'F');
  doc.setDrawColor(56, 189, 248);
  doc.rect(14, startY, 182, 18, 'S');

  doc.setTextColor(11, 19, 43);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Semester ${semester} SGPA: ${sheet.sgpa}`, 22, startY + 11);
  doc.text(`Cumulative CGPA: ${studentData.cgpa.overall}`, 90, startY + 11);
  doc.text(`Status: ${sheet.result}`, 145, startY + 11);

  // Signatures & Stamp
  startY += 45;
  doc.setDrawColor(180, 180, 180);
  doc.line(25, startY, 75, startY);
  doc.line(135, startY, 185, startY);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Controller of Examinations', 30, startY + 6);
  doc.text('Registrar / Dean Academics', 142, startY + 6);

  doc.setFontSize(7.5);
  doc.text('This is a cryptographically verified electronic grade document issued by Aurenix University.', 35, 285);

  doc.save(`Aurenix_MarkSheet_Sem${semester}_${studentData.id}.pdf`);
}

export function downloadFeeReceiptPdf(feeItem) {
  const doc = new jsPDF();
  const item = feeItem || feesData.feeItems[0];

  // Header Background
  doc.setFillColor(11, 19, 43);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.line(0, 40, 210, 40);

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(collegeInfo.name.toUpperCase(), 14, 18);

  doc.setTextColor(200, 220, 255);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL ELECTRONIC PAYMENT RECEIPT', 14, 26);
  doc.text(`Date of Issue: ${new Date().toLocaleDateString('en-IN')}`, 14, 33);

  // Receipt meta
  const txnId = item.transactionId || `AUR-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.setTextColor(30, 40, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt Reference: ${txnId}`, 14, 52);
  doc.text(`Payment Status: SUCCESSFUL (PAID)`, 120, 52);

  // Student Info
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 58, 182, 28, 'F');
  doc.setFont('helvetica', 'normal');
  doc.text(`Student: ${studentData.name} (${studentData.id})`, 20, 66);
  doc.text(`Course: ${studentData.programme}`, 20, 74);
  doc.text(`Department: ${studentData.department}`, 120, 66);
  doc.text(`Campus: ${collegeInfo.campus}`, 120, 74);

  // Fee Particulars
  let y = 98;
  doc.setFillColor(11, 19, 43);
  doc.rect(14, y, 182, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DESCRIPTION / PARTICULARS', 20, y + 6);
  doc.text('AMOUNT (INR)', 155, y + 6);

  y += 9;
  doc.setFillColor(255, 255, 255);
  doc.rect(14, y, 182, 14, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.rect(14, y, 182, 14, 'S');
  doc.setTextColor(40, 50, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(item.title, 20, y + 9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${item.amount.toLocaleString()}.00`, 155, y + 9);

  // Total
  y += 18;
  doc.setFillColor(240, 253, 244);
  doc.rect(14, y, 182, 12, 'F');
  doc.setDrawColor(34, 197, 94);
  doc.rect(14, y, 182, 12, 'S');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(11);
  doc.text('TOTAL AMOUNT PAID:', 20, y + 8);
  doc.text(`Rs. ${item.amount.toLocaleString()}.00`, 155, y + 8);

  // Payment note
  y += 24;
  doc.setTextColor(100, 110, 130);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Gateway: Razorpay / Aurenix Direct Secure Treasury', 14, y);
  doc.text('Authorization Token: SHA256-AUTHENTICATED-TRANSACTION-VERIFIED', 14, y + 6);
  doc.text('For queries regarding accounts or tax declarations, email finance@aurenix.edu.in', 14, y + 12);

  doc.save(`Aurenix_Fee_Receipt_${txnId}.pdf`);
}

export function downloadTimetablePdf() {
  const doc = new jsPDF();

  doc.setFillColor(11, 19, 43);
  doc.rect(0, 0, 210, 38, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.line(0, 38, 210, 38);

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(collegeInfo.name.toUpperCase(), 14, 17);

  doc.setTextColor(200, 220, 255);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`CLASS TIMETABLE • ${studentData.programme} - ${studentData.year}`, 14, 25);
  doc.text(`Effective Term: Even Semester 2026 • Student: ${studentData.name} (${studentData.id})`, 14, 32);

  let curY = 48;
  const days = Object.keys(weeklyTimetable);

  days.forEach((day) => {
    const classes = weeklyTimetable[day];
    doc.setFillColor(243, 167, 18);
    doc.rect(14, curY, 182, 7, 'F');
    doc.setTextColor(11, 19, 43);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(day.toUpperCase(), 18, curY + 5);

    curY += 7;

    classes.forEach((cls) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(14, curY, 182, 7.5, 'F');
      doc.setDrawColor(230, 235, 240);
      doc.line(14, curY + 7.5, 196, curY + 7.5);

      doc.setFontSize(8.5);
      doc.setTextColor(30, 40, 60);
      doc.setFont('helvetica', 'bold');
      doc.text(cls.time, 18, curY + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(`${cls.code}: ${cls.subject}`, 60, curY + 5);
      doc.text(`${cls.room} • ${cls.faculty}`, 145, curY + 5);

      curY += 7.5;
    });

    curY += 4;
  });

  doc.save(`Aurenix_Timetable_${studentData.shortProgramme}_Sem4.pdf`);
}
