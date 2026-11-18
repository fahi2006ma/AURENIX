import React, { useState } from 'react';
import { 
  X, CreditCard, ShieldCheck, CheckCircle2, 
  Download, Sparkles, ArrowRight, Lock, QrCode, Smartphone 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadFeeReceiptPdf } from '../utils/pdfGenerator';
import { divineAudio } from '../utils/audioChimes';
import { studentData } from '../data/collegeData';

export default function PaymentModal({ isOpen, onClose, feeItem, onPaymentSuccess }) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('fahima@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9081');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [paidTxn, setPaidTxn] = useState(null);

  if (!isOpen) return null;

  const amount = feeItem?.amount || 2500;
  const title = feeItem?.title || "Semester 4 Lab & Tech Assessment Fee";

  const handlePay = () => {
    setIsProcessing(true);
    divineAudio.playTap();

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);
      
      const completedTxn = {
        ...feeItem,
        status: 'Paid',
        paidAt: new Date().toLocaleString('en-IN'),
        transactionId: `AUR-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentMode: method === 'upi' ? 'UPI (PhonePe / GPay)' : 'Credit Card (Visa)'
      };
      setPaidTxn(completedTxn);

      if (onPaymentSuccess) {
        onPaymentSuccess(completedTxn);
      }

      // Confetti & divine chime
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#38BDF8', '#FFD700']
        });
      } catch {}

      divineAudio.playSuccessChord();
    }, 1500);
  };

  const handleDownloadPdf = () => {
    if (paidTxn) {
      downloadFeeReceiptPdf(paidTxn);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-gold border border-amber-500/40 p-6 sm:p-8 shadow-divine-lg overflow-hidden flex flex-col">
        
        {/* Hologram sweep */}
        <div className="holo-scan" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow">
              <div className="w-full h-full bg-midnight-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-amber-300 text-base">
                Aurenix Treasury Payment Gateway
              </h3>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted & RBI Verified
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-midnight-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isPaidSuccess ? (
          <div className="space-y-5 mt-4">
            {/* Amount details card */}
            <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Particulars</span>
                <h4 className="text-xs font-bold text-slate-100">{title}</h4>
                <p className="text-[10px] text-slate-400">Student: {studentData.name} ({studentData.id})</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Due</span>
                <span className="text-2xl font-serif font-black text-amber-300">
                  ₹{amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'card', label: 'Credit / Debit', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Smartphone }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMethod(m.id);
                      divineAudio.playTap();
                    }}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                      method === m.id
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 border-amber-400 shadow-md font-extrabold'
                        : 'bg-midnight-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form inputs per method */}
            {method === 'upi' && (
              <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi or username@okaxis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>Supported: Google Pay, PhonePe, Paytm, BHIM, Apple Pay</span>
                </div>
              </div>
            )}

            {method === 'card' && (
              <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-3.5 py-2 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="782"
                      className="w-full px-3.5 py-2 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Select Bank</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-900 border border-slate-700 text-xs text-slate-100">
                  <option>HDFC Bank Corporate / Retail</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-midnight-950 font-black text-sm uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-midnight-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing with Payment Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay ₹{amount.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success Confirmation */
          <div className="my-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif text-2xl font-black text-slate-100 divine-glow">
              Payment Successful!
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your transaction of <strong className="text-amber-300 font-bold">₹{amount.toLocaleString()}</strong> has been verified by the university treasury.
            </p>

            <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 text-left font-mono text-xs space-y-1.5 max-w-sm mx-auto">
              <p className="text-slate-400">Reference: <strong className="text-amber-300">{paidTxn?.transactionId}</strong></p>
              <p className="text-slate-400">Status: <strong className="text-emerald-400">PAID & CLEARED</strong></p>
              <p className="text-slate-400">Timestamp: <strong className="text-slate-200">{paidTxn?.paidAt}</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
              <button
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow flex items-center justify-center gap-2 hover:brightness-110"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Receipt PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-midnight-900 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-midnight-800"
              >
                Close Gateway
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
