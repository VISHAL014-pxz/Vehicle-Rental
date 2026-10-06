import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { Customer } from '../types/rental';
import { UserPlus, Search, Shield, Phone, Mail, MapPin, Trash2, Eye, FileText } from 'lucide-react';

export const CustomerManagement: React.FC = () => {
  const {
    customers,
    rentals,
    setIsAddCustomerModalOpen,
    deleteCustomer,
    setSelectedInvoice
  } = useRental();

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contactNumber.includes(search) ||
      c.drivingLicenceDetails.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getCustomerRentals = (customerId: string) => {
    return rentals.filter((r) => r.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Customer Records & Verification
          </h1>
          <p className="text-xs text-slate-500">
            Step 2: Maintain verified customer profiles, contact info & driving licences
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Customer</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, or licence number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Customers List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => {
          const customerRentals = getCustomerRentals(customer.id);
          const activeRental = customerRentals.find((r) => r.status === 'Active');

          return (
            <div
              key={customer.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-400 block mb-0.5">
                      {customer.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {customer.name}
                    </h3>
                  </div>

                  {activeRental ? (
                    <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-indigo-50 text-indigo-700">
                      Renting
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 text-slate-600">
                      Idle
                    </span>
                  )}
                </div>

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{customer.contactNumber}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="font-mono text-slate-800 font-medium">
                      {customer.drivingLicenceDetails}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-500 text-[11px] line-clamp-2">
                      {customer.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Rentals: </span>
                  <strong className="text-slate-900 font-mono">{customerRentals.length}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                  >
                    History
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Rental History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-slate-500">{selectedCustomer.id}</span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedCustomer.name} · Rental History
                </h3>
                <p className="text-xs text-slate-500">
                  Licence: {selectedCustomer.drivingLicenceDetails}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {getCustomerRentals(selectedCustomer.id).length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No rental transactions recorded for this customer yet.
                </div>
              ) : (
                getCustomerRentals(selectedCustomer.id).map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-indigo-700">{r.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          r.status === 'Active'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-900">{r.vehicleName} ({r.vehicleNumber})</span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">${r.totalCharges}</span>
                    </div>

                    <div className="text-slate-500 flex justify-between text-[11px]">
                      <span>{r.rentalDate} to {r.returnDate} ({r.numberOfRentalDays} days)</span>
                      <span>Paid via {r.paymentMethod}</span>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedCustomer(null);
                          setSelectedInvoice(r);
                        }}
                        className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View Official Invoice</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
