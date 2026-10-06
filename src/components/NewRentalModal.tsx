import React, { useState, useEffect } from 'react';
import { useRental } from '../context/RentalContext';
import { Vehicle, Customer } from '../types/rental';
import { X, Calendar, DollarSign, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const NewRentalModal: React.FC = () => {
  const {
    vehicles,
    customers,
    isRentModalOpen,
    setIsRentModalOpen,
    selectedVehicleForRent,
    rentVehicle,
    setIsAddCustomerModalOpen,
    setSelectedInvoice
  } = useRental();

  const availableVehicles = vehicles.filter((v) => v.status === 'available');

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [rentalDate, setRentalDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Debit Card' | 'Cash' | 'UPI'>('Credit Card');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (selectedVehicleForRent) {
      setSelectedVehicleId(selectedVehicleForRent.id);
    } else if (availableVehicles.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(availableVehicles[0].id);
    }
  }, [selectedVehicleForRent, availableVehicles]);

  useEffect(() => {
    if (customers.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(customers[0].id);
    }
  }, [customers]);

  if (!isRentModalOpen) return null;

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Return date calculation
  const calculateReturnDate = (startDate: string, days: number): string => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const returnDate = calculateReturnDate(rentalDate, rentalDays);

  // Step 5 Formula: Total Rent = Rental Days * Rent Per Day
  const dailyRate = currentVehicle ? currentVehicle.rentPerDay : 0;
  const baseRentalCharges = rentalDays * dailyRate;
  const securityDeposit = currentVehicle?.type === 'Bike' ? 50 : 100;
  const totalAmount = baseRentalCharges + securityDeposit;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedVehicleId) {
      setError('Please select an available vehicle.');
      return;
    }
    if (!selectedCustomerId) {
      setError('Please select or register a customer.');
      return;
    }
    if (rentalDays < 1) {
      setError('Rental duration must be at least 1 day.');
      return;
    }

    try {
      const newRental = rentVehicle({
        vehicleId: selectedVehicleId,
        customerId: selectedCustomerId,
        rentalDate,
        returnDate,
        numberOfRentalDays: rentalDays,
        paymentMethod,
        securityDeposit,
        notes
      });
      setIsRentModalOpen(false);
      // Prompt user with invoice view option
      setSelectedInvoice(newRental);
    } catch (err: any) {
      setError(err.message || 'Failed to complete rental reservation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              New Vehicle Rental Agreement
            </h2>
            <p className="text-xs text-slate-500">
              Step 4 & 5: Vehicle Selection, Availability Verification & Rental Calculation
            </p>
          </div>
          <button
            onClick={() => setIsRentModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleBooking} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 3: Select Vehicle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Vehicle (Availability Verified)
            </label>
            {availableVehicles.length === 0 ? (
              <div className="p-3 text-sm text-amber-800 bg-amber-50 rounded-lg border border-amber-200">
                No vehicles are currently available in the fleet. Please return or add a vehicle.
              </div>
            ) : (
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {availableVehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} ({v.type}) — {v.vehicleNumber} — ${v.rentPerDay}/day
                  </option>
                ))}
              </select>
            )}

            {currentVehicle && (
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span><strong className="text-slate-800">Reg:</strong> {currentVehicle.vehicleNumber}</span>
                <span><strong className="text-slate-800">Fuel:</strong> {currentVehicle.fuelType}</span>
                <span><strong className="text-slate-800">Transmission:</strong> {currentVehicle.transmission}</span>
                <span><strong className="text-slate-800">Capacity:</strong> {currentVehicle.seatingCapacity} seats</span>
                <span className="text-emerald-700 font-medium ml-auto">✓ Verified Available</span>
              </div>
            )}
          </div>

          {/* Step 2: Select Customer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                2. Select Customer Record
              </label>
              <button
                type="button"
                onClick={() => setIsAddCustomerModalOpen(true)}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                + Register New Customer
              </button>
            </div>

            {customers.length === 0 ? (
              <div className="p-3 text-sm text-slate-600 bg-slate-50 rounded-lg">
                No customer records found. Please register a customer.
              </div>
            ) : (
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.contactNumber} ({c.drivingLicenceDetails.split(' ')[0]})
                  </option>
                ))}
              </select>
            )}

            {currentCustomer && (
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div><strong className="text-slate-800">Licence:</strong> {currentCustomer.drivingLicenceDetails}</div>
                <div className="text-slate-500 mt-0.5 truncate"><strong className="text-slate-800">Address:</strong> {currentCustomer.address}</div>
              </div>
            )}
          </div>

          {/* Dates & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Rental Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={rentalDate}
                  onChange={(e) => setRentalDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Number of Rental Days
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  Returns: <strong className="text-slate-800 font-mono">{returnDate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Credit Card', 'Debit Card', 'UPI', 'Cash'] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                    paymentMethod === method
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Rent Calculation Breakdown */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5">
            <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Step 5: Automated Rental Calculation
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Rental Duration</span>
              <span className="font-mono tabular-nums">{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Daily Rate ({currentVehicle?.brand} {currentVehicle?.model})</span>
              <span className="font-mono tabular-nums">${dailyRate} / day</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Base Rent = ({rentalDays} days × ${dailyRate})</span>
              <span className="font-mono tabular-nums font-semibold text-white">${baseRentalCharges}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Refundable Security Deposit</span>
              <span className="font-mono tabular-nums">${securityDeposit}</span>
            </div>

            <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
              <span className="text-sm font-semibold">Total Payable Amount</span>
              <span className="text-lg font-bold font-mono tabular-nums text-emerald-400">
                ${totalAmount}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Rental Agreement Notes / Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Requested GPS unit, child seat, airport gate dispatch"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsRentModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={availableVehicles.length === 0 || customers.length === 0}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Dispatch Vehicle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
