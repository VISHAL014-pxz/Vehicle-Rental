import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { RentalRecord, RentalStatus } from '../types/rental';
import { Search, Download, FileText, CheckCircle2, Clock, Printer } from 'lucide-react';

export const RentalRecords: React.FC = () => {
  const { rentals, setSelectedInvoice } = useRental();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | RentalStatus>('All');

  const filteredRentals = rentals.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
      r.vehicleNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Rental ID,Vehicle Plate,Vehicle Model,Type,Customer,Contact,Rental Date,Return Date,Days,Daily Rate,Base Rent,Deposit,Extra,Total,Status,Payment'];
    const rows = filteredRentals.map((r) =>
      `"${r.id}","${r.vehicleNumber}","${r.vehicleName}","${r.vehicleType}","${r.customerName}","${r.customerContact}","${r.rentalDate}","${r.returnDate}",${r.numberOfRentalDays},${r.rentPerDay},${r.baseRentalCharges},${r.securityDeposit},${r.extraCharges},${r.totalCharges},"${r.status}","${r.paymentMethod}"`
    );
    const blob = new Blob([[headers.join('\n'), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VRMS-Rental-Records-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Rental Records & Financial Ledger
          </h1>
          <p className="text-xs text-slate-500">
            Step 7: Maintain and display rental records, duration, charges, and customer logs
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV Ledger</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search records by ID, customer name, vehicle, or licence plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {(['All', 'Active', 'Returned'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Agreement ID</th>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Rental Duration</th>
                <th className="py-3 px-4 text-right">Daily Rate</th>
                <th className="py-3 px-4 text-right">Base Rent</th>
                <th className="py-3 px-4 text-right">Total Charges</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No rental records found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredRentals.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                      {r.id}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{r.vehicleName}</span>
                      <span className="font-mono text-slate-500 text-[11px]">{r.vehicleNumber} ({r.vehicleType})</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{r.customerName}</span>
                      <span className="font-mono text-slate-500 text-[11px]">{r.customerContact}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono tabular-nums text-slate-900 font-medium block">
                        {r.numberOfRentalDays} {r.numberOfRentalDays === 1 ? 'day' : 'days'}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {r.rentalDate} → {r.returnDate}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums text-right text-slate-700">
                      ${r.rentPerDay}
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums text-right text-slate-700">
                      ${r.baseRentalCharges}
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums text-right font-bold text-slate-900">
                      ${r.totalCharges}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          r.status === 'Active'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
