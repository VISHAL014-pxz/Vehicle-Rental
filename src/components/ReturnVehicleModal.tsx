import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { X, CheckCircle2, AlertTriangle, ShieldAlert, ArrowLeftRight } from 'lucide-react';

export const ReturnVehicleModal: React.FC = () => {
  const {
    isReturnModalOpen,
    setIsReturnModalOpen,
    selectedRentalForReturn,
    returnVehicle
  } = useRental();

  const [condition, setCondition] = useState<'Good' | 'Minor Scratches' | 'Damaged'>('Good');
  const [penaltyCharge, setPenaltyCharge] = useState<number>(0);
  const [returnNotes, setReturnNotes] = useState<string>('Vehicle returned in good order, fuel tank matched dispatch level.');

  if (!isReturnModalOpen || !selectedRentalForReturn) return null;

  const rental = selectedRentalForReturn;

  const handleConditionChange = (cond: 'Good' | 'Minor Scratches' | 'Damaged') => {
    setCondition(cond);
    if (cond === 'Good') {
      setPenaltyCharge(0);
      setReturnNotes('Vehicle returned in good order, fuel tank matched dispatch level.');
    } else if (cond === 'Minor Scratches') {
      setPenaltyCharge(30);
      setReturnNotes('Minor cosmetic paint scratches inspected on bumper.');
    } else if (cond === 'Damaged') {
      setPenaltyCharge(150);
      setReturnNotes('Damage reported, maintenance body shop assessment required.');
    }
  };

  const netRefund = Math.max(0, rental.securityDeposit - penaltyCharge);
  const additionalPayable = penaltyCharge > rental.securityDeposit ? penaltyCharge - rental.securityDeposit : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    returnVehicle(rental.id, condition, penaltyCharge, returnNotes);
    setIsReturnModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-indigo-600" />
              <span>Step 6: Return Vehicle & Release Agreement</span>
            </h2>
            <p className="text-xs text-slate-500">
              Restore vehicle status to Available and reconcile deposit
            </p>
          </div>
          <button
            onClick={() => setIsReturnModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Agreement summary */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Rental Agreement</span>
              <span className="font-mono font-semibold text-slate-900">{rental.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle</span>
              <span className="font-semibold text-slate-900">{rental.vehicleName} ({rental.vehicleNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Customer</span>
              <span className="font-semibold text-slate-900">{rental.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rental Duration</span>
              <span className="font-mono tabular-nums text-slate-900">{rental.numberOfRentalDays} days ({rental.rentalDate} to {rental.returnDate})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Security Deposit Held</span>
              <span className="font-mono tabular-nums font-semibold text-emerald-700">${rental.securityDeposit}</span>
            </div>
          </div>

          {/* Condition Inspection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Return Inspection Condition
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Good', label: 'Good / Clean', icon: CheckCircle2, color: 'text-emerald-600' },
                { id: 'Minor Scratches', label: 'Minor Wear', icon: AlertTriangle, color: 'text-amber-600' },
                { id: 'Damaged', label: 'Damaged', icon: ShieldAlert, color: 'text-rose-600' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleConditionChange(item.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    condition === item.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-xs font-semibold leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Penalty charges */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Damage / Late Fee Penalty Adjustment ($)
            </label>
            <input
              type="number"
              min="0"
              max="2000"
              value={penaltyCharge}
              onChange={(e) => setPenaltyCharge(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Return Reconciliation */}
          <div className="p-3.5 bg-slate-900 rounded-xl text-white text-xs space-y-1.5">
            <div className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Final Deposit Settlement
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Security Deposit Retained</span>
              <span className="font-mono tabular-nums">${rental.securityDeposit}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Deductions / Damage Fees</span>
              <span className="font-mono tabular-nums text-rose-400">-${penaltyCharge}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-700 flex justify-between font-semibold">
              <span>Refund to Customer</span>
              <span className="font-mono tabular-nums text-emerald-400 text-sm">
                ${netRefund}
              </span>
            </div>
            {additionalPayable > 0 && (
              <div className="text-amber-300 text-[11px] pt-1">
                Notice: Damage exceeds deposit by ${additionalPayable}. Customer billed extra.
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Return Inspection Notes
            </label>
            <textarea
              rows={2}
              value={returnNotes}
              onChange={(e) => setReturnNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Confirmation note */}
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <span>
              Upon submission, <strong>{rental.vehicleName}</strong> will immediately transition to <strong>Available</strong> status in the fleet, ready for new bookings.
            </span>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsReturnModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Return & Restore Fleet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
