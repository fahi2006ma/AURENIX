import React, { useState } from 'react';
import { 
  CreditCard, Download, CheckCircle2, Clock, ShieldCheck, 
  Sparkles, ArrowRight, DollarSign, Receipt, AlertCircle 
} from 'lucide-react';
import { feesData, studentData } from '../data/collegeData';
import { downloadFeeReceiptPdf } from '../utils/pdfGenerator';
import { divineAudio } from '../utils/audioChimes';

export default function Fees({ onOpenPaymentModal, onAskAura }) {
  const [items, setItems] = useState(feesData.feeItems);

  const pendingItems = items.filter((i) => i.status === 'Pending');
  const paidItems = items.filter((i) => i.status === 'Paid');
  const totalPendingAmount = pendingItems.reduce((acc, curr) => acc + curr.amount, 0);

  const handleDownloadReceipt = (item) => {
    divineAudio.playSuccessChord();
    downloadFeeReceiptPdf(item);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-amber-400" />
            <span>Fees & Digital Payment Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated student fee dues, PCI-DSS compliant payment gateway, and instant e-receipt generation.
          </p>
        </div>

        <button
          onClick={() => {
            onAskAura("How much fee do I have to pay?");
            divineAudio.playTap();
          }}
          className="px-4 py-2.5 rounded-2xl bg-midnight-900/80 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask AURA Fee Dues</span>
        </button>
      </div>

      {/* Due Banner Card */}
      <div className="rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-500/30 shadow-divine flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-coral-500/20 text-coral-400 border border-coral-500/30 inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Outstanding Campus Dues
          </span>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-4xl sm:text-5xl font-black text-slate-100 divine-glow">
              ₹{totalPendingAmount.toLocaleString()}
            </span>
            <span className="text-xs text-slate-300">INR</span>
          </div>

          <p className="text-xs text-amber-200/90 mt-1 font-medium">
            Semester 4 Continuous Lab & Tech Assessment Fee (Due on Nov 28, 2026)
          </p>
        </div>

        {totalPendingAmount > 0 ? (
          <button
            onClick={() => {
              if (pendingItems[0]) onOpenPaymentModal(pendingItems[0]);
              divineAudio.playTap();
            }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-midnight-950 font-black text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay ₹{totalPendingAmount.toLocaleString()} Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>All Semester Fees Fully Settled</span>
          </div>
        )}
      </div>

      {/* Pending Fee Items Breakdown */}
      {pendingItems.length > 0 && (
        <div className="rounded-3xl glass-panel p-6 border border-amber-500/25">
          <h3 className="font-serif text-lg font-bold text-slate-100 mb-4">
            Pending Fee Itemization
          </h3>

          <div className="space-y-4">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-midnight-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.semester}
                    </span>
                    <span className="text-xs text-rose-400 font-semibold">Due: {item.dueDate}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-100 mt-1">
                    {item.title}
                  </h4>

                  {item.breakdown && (
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {item.breakdown.map((b, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-midnight-900 border border-slate-800 text-xs">
                          <span className="text-slate-400 block text-[10px]">{b.name}</span>
                          <span className="font-bold text-slate-200">₹{b.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-2xl font-serif font-black text-coral-400">
                    ₹{item.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      onOpenPaymentModal(item);
                      divineAudio.playTap();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-coral-500 to-rose-600 text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow"
                  >
                    Pay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History & Electronic Receipts (SRS FR-FEE-04, FR-FEE-05) */}
      <div className="rounded-3xl glass-panel p-6 border border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">
              Payment History & Downloadable Receipts
            </h3>
          </div>
          <span className="text-xs text-slate-400">{paidItems.length} transactions on record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/80 text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Particulars</th>
                <th className="py-3 px-4">Date Paid</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {paidItems.map((item) => (
                <tr key={item.id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">
                    {item.transactionId}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-100">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{item.paidAt}</td>
                  <td className="py-3.5 px-4 text-slate-300">{item.paymentMode}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    ₹{item.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownloadReceipt(item)}
                      className="px-3 py-1.5 rounded-xl bg-midnight-950 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
