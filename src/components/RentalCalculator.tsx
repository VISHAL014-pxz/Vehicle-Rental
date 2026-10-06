import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { Calculator, DollarSign, Calendar, Car, Shield, Sparkles, Check } from 'lucide-react';
import { VehicleType } from '../types/rental';

export const RentalCalculator: React.FC = () => {
  const { vehicles, openRentModalWithVehicle } = useRental();

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [days, setDays] = useState<number>(4);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [includeGps, setIncludeGps] = useState<boolean>(false);
  const [includeChildSeat, setIncludeChildSeat] = useState<boolean>(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const ratePerDay = selectedVehicle ? selectedVehicle.rentPerDay : 45;
  const baseRent = days * ratePerDay;
  const insurancePerDay = 12;
  const totalInsurance = includeInsurance ? days * insurancePerDay : 0;
  const gpsCharge = includeGps ? 5 * days : 0;
  const seatCharge = includeChildSeat ? 8 * days : 0;
  const securityDeposit = selectedVehicle?.type === 'Bike' ? 50 : 100;

  // Multi-day discount for >= 7 days
  const multiDayDiscount = days >= 7 ? Math.round(baseRent * 0.05) : 0;

  const totalPayable = baseRent - multiDayDiscount + totalInsurance + gpsCharge + seatCharge + securityDeposit;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <span>Assignment Section 5 & Methodology</span>
          <span>·</span>
          <span>Rental Charge Calculator</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Interactive Rental Calculator (Step 5 Engine)
        </h1>
        <p className="text-xs text-slate-500">
          Formula: Total Rent = Rental Days × Rent Per Day. Test calculations across vehicle classes with optional add-ons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls form (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          {/* Select vehicle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Select Fleet Vehicle
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} ({v.type}) — ${v.rentPerDay}/day [{v.vehicleNumber}]
                </option>
              ))}
            </select>
          </div>

          {/* Days slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase">
                Rental Duration (Days)
              </label>
              <span className="font-mono font-bold text-sm text-indigo-600">
                {days} {days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>1 Day</span>
              <span>7 Days (5% Discount)</span>
              <span>14 Days</span>
              <span>30 Days</span>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Optional Add-Ons & Protections
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                  includeInsurance
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="mt-0.5 accent-indigo-600 rounded"
                />
                <div>
                  <span className="font-semibold block text-slate-900">Collision Damage</span>
                  <span className="text-[11px] text-slate-500">$12 / day zero-excess</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                  includeGps
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeGps}
                  onChange={(e) => setIncludeGps(e.target.checked)}
                  className="mt-0.5 accent-indigo-600 rounded"
                />
                <div>
                  <span className="font-semibold block text-slate-900">Nav GPS Tracker</span>
                  <span className="text-[11px] text-slate-500">$5 / day turn-by-turn</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                  includeChildSeat
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={includeChildSeat}
                  onChange={(e) => setIncludeChildSeat(e.target.checked)}
                  className="mt-0.5 accent-indigo-600 rounded"
                />
                <div>
                  <span className="font-semibold block text-slate-900">Child Booster Seat</span>
                  <span className="text-[11px] text-slate-500">$8 / day ISOFIX certified</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Breakdown output card (1 col) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Calculation Breakdown</span>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex justify-between text-slate-300">
                <span>Selected Vehicle</span>
                <span className="font-semibold text-white truncate max-w-[150px]">
                  {selectedVehicle?.brand} {selectedVehicle?.model}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Daily Rent Rate</span>
                <span className="font-mono tabular-nums">${ratePerDay} / day</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Base Rent ({days} × ${ratePerDay})</span>
                <span className="font-mono tabular-nums text-white font-medium">${baseRent}</span>
              </div>

              {multiDayDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Multi-Day Discount (5%)</span>
                  <span className="font-mono tabular-nums">-${multiDayDiscount}</span>
                </div>
              )}

              {totalInsurance > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Insurance Protection</span>
                  <span className="font-mono tabular-nums">${totalInsurance}</span>
                </div>
              )}

              {gpsCharge > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>GPS Navigation</span>
                  <span className="font-mono tabular-nums">${gpsCharge}</span>
                </div>
              )}

              {seatCharge > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Child Booster Seat</span>
                  <span className="font-mono tabular-nums">${seatCharge}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Refundable Deposit</span>
                <span className="font-mono tabular-nums">${securityDeposit}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Estimated</span>
                <span className="text-[11px] text-slate-500">Includes refundable deposit</span>
              </div>
              <span className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
                ${totalPayable}
              </span>
            </div>

            <button
              onClick={() => openRentModalWithVehicle(selectedVehicle)}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors text-center"
            >
              Proceed to Dispatch Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
