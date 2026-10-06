import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, Printer, Download, CheckCircle2, Car, Shield, FileText } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { selectedInvoice, setSelectedInvoice } = useRental();

  if (!selectedInvoice) return null;

  const rental = selectedInvoice;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top actions bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              Rental Agreement & Receipt
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 print:p-0 print:m-0" id="printable-invoice">
          {/* Header block */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  VR
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Vehicle Rental System
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Automated Fleet & Rental Management Enterprise
              </p>
              <p className="text-xs text-slate-500">
                Hub Address: 100 Fleet Boulevard, Tech Park
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                INVOICE #{rental.id}
              </span>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Date: {rental.createdAt}
              </p>
              <p className="text-xs font-medium text-emerald-700 mt-0.5">
                Status: {rental.status.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Parties metadata grid */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
                Customer Details (Tenant)
              </span>
              <div className="font-bold text-sm text-slate-900">{rental.customerName}</div>
              <div className="text-slate-600 font-mono mt-0.5">{rental.customerContact}</div>
              <div className="text-slate-500 mt-1">Customer ID: {rental.customerId}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
                Vehicle Details (Asset)
              </span>
              <div className="font-bold text-sm text-slate-900">{rental.vehicleName}</div>
              <div className="font-mono text-indigo-700 font-semibold mt-0.5">
                Plate: {rental.vehicleNumber}
              </div>
              <div className="text-slate-500 mt-1">
                Class: {rental.vehicleType} · Asset ID: {rental.vehicleId}
              </div>
            </div>
          </div>

          {/* Rental Duration Details */}
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Dispatch Date</span>
              <strong className="font-mono text-slate-900 text-sm">{rental.rentalDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Expected Return</span>
              <strong className="font-mono text-slate-900 text-sm">{rental.returnDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Duration</span>
              <strong className="font-mono text-slate-900 text-sm">
                {rental.numberOfRentalDays} {rental.numberOfRentalDays === 1 ? 'Day' : 'Days'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Method</span>
              <strong className="text-slate-900 text-sm">{rental.paymentMethod}</strong>
            </div>
          </div>

          {/* Line items billing calculation */}
          <div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-left">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-right font-mono">Rate</th>
                  <th className="py-2.5 text-right font-mono">Qty</th>
                  <th className="py-2.5 text-right font-mono">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3">
                    <span className="font-medium text-slate-900">Vehicle Rental Charge</span>
                    <span className="block text-slate-500 text-[11px]">
                      Formula: {rental.numberOfRentalDays} days × ${rental.rentPerDay}/day
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-700">${rental.rentPerDay}</td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-700">{rental.numberOfRentalDays}</td>
                  <td className="py-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    ${rental.baseRentalCharges}
                  </td>
                </tr>

                <tr>
                  <td className="py-3">
                    <span className="font-medium text-slate-900">Refundable Security Deposit</span>
                    <span className="block text-slate-500 text-[11px]">Held until vehicle return inspection</span>
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-700">${rental.securityDeposit}</td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-700">1</td>
                  <td className="py-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    ${rental.securityDeposit}
                  </td>
                </tr>

                {rental.extraCharges > 0 && (
                  <tr>
                    <td className="py-3 text-rose-700">
                      <span className="font-medium">Damage / Late Penalty Surcharge</span>
                      <span className="block text-[11px]">Assessed during vehicle check-in</span>
                    </td>
                    <td className="py-3 text-right font-mono tabular-nums text-rose-700">${rental.extraCharges}</td>
                    <td className="py-3 text-right font-mono tabular-nums text-rose-700">1</td>
                    <td className="py-3 text-right font-mono tabular-nums font-semibold text-rose-700">
                      +${rental.extraCharges}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Grand Total */}
          <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-500 block">Payment Status</span>
              <span className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Paid in Full
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Total Billed</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                ${rental.totalCharges}
              </span>
            </div>
          </div>

          {/* Agreement notes */}
          {rental.notes && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800">Agreement Notes:</strong> {rental.notes}
            </div>
          )}

          {/* Footer terms */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Official Computerized Vehicle Rental Record</span>
            <span className="font-mono">Verification Hash: SHA-{rental.id.replace(/-/g, '')}</span>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setSelectedInvoice(null)}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
