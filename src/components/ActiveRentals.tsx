import React from 'react';
import { useRental } from '../context/RentalContext';
import { KeyRound, Clock, ArrowLeftRight, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ActiveRentals: React.FC = () => {
  const {
    rentals,
    openReturnModalWithRental,
    setSelectedInvoice,
    openRentModalWithVehicle
  } = useRental();

  const activeRentals = rentals.filter((r) => r.status === 'Active');

  const todayStr = new Date().toISOString().split('T')[0];

  const getDaysRemaining = (returnDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(returnDate);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Active Vehicle Rentals
          </h1>
          <p className="text-xs text-slate-500">
            Step 4: Active agreements on the road · Step 6: Process vehicle check-in & return
          </p>
        </div>

        <button
          onClick={() => openRentModalWithVehicle(null)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <KeyRound className="w-4 h-4" />
          <span>New Rental Dispatch</span>
        </button>
      </div>

      {/* Grid of active rentals */}
      {activeRentals.length === 0 ? (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">All vehicles are at the rental station</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            There are currently no active rentals in circulation. You can dispatch an available vehicle at any time.
          </p>
          <button
            onClick={() => openRentModalWithVehicle(null)}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Create New Rental
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeRentals.map((rental) => {
            const daysLeft = getDaysRemaining(rental.returnDate);
            const isOverdue = daysLeft < 0;

            return (
              <div
                key={rental.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      {rental.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
                        isOverdue
                          ? 'bg-rose-50 text-rose-700'
                          : daysLeft === 0
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {isOverdue && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                      <span>
                        {isOverdue
                          ? `${Math.abs(daysLeft)}d Overdue`
                          : daysLeft === 0
                          ? 'Due Today'
                          : `${daysLeft}d Remaining`}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {rental.vehicleName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                    <span>{rental.vehicleNumber}</span>
                    <span>·</span>
                    <span>{rental.vehicleType}</span>
                  </div>

                  {/* Customer Information */}
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer:</span>
                      <strong className="text-slate-900">{rental.customerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-mono text-slate-700">{rental.customerContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dispatch:</span>
                      <span className="font-mono text-slate-700">{rental.rentalDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled Return:</span>
                      <strong className="font-mono text-slate-900">{rental.returnDate}</strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">Total Billed:</span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        ${rental.totalCharges}
                      </span>
                    </div>
                  </div>

                  {rental.notes && (
                    <p className="text-[11px] text-slate-500 italic mt-2 line-clamp-1">
                      "{rental.notes}"
                    </p>
                  )}
                </div>

                {/* Return Action Trigger */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => openReturnModalWithRental(rental)}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Return Vehicle</span>
                  </button>

                  <button
                    onClick={() => setSelectedInvoice(rental)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="View Agreement & Receipt"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
