import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { X, UserPlus, Shield } from 'lucide-react';

export const AddCustomerModal: React.FC = () => {
  const { isAddCustomerModalOpen, setIsAddCustomerModalOpen, addCustomer } = useRental();

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [drivingLicenceDetails, setDrivingLicenceDetails] = useState('');
  const [idProofType, setIdProofType] = useState<'Driving Licence' | 'Passport' | 'National ID'>('Driving Licence');
  const [error, setError] = useState('');

  if (!isAddCustomerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !contactNumber.trim() || !drivingLicenceDetails.trim()) {
      setError('Please provide Customer Name, Contact Number, and Driving Licence Details.');
      return;
    }

    addCustomer({
      name: name.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: address.trim() || 'Local City Address',
      drivingLicenceDetails: drivingLicenceDetails.trim(),
      idProofType
    });

    setName('');
    setContactNumber('');
    setEmail('');
    setAddress('');
    setDrivingLicenceDetails('');
    setIsAddCustomerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              <span>Step 2: Register Customer</span>
            </h2>
            <p className="text-xs text-slate-500">
              Customer details required by system specifications
            </p>
          </div>
          <button
            onClick={() => setIsAddCustomerModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Customer Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="e.g. +1 555-019-2834"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Driving Licence Details & Number
            </label>
            <input
              type="text"
              placeholder="e.g. DL-992019-88219 (Expiry: 2032)"
              value={drivingLicenceDetails}
              onChange={(e) => setDrivingLicenceDetails(e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Permanent Address
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 742 Evergreen Terrace, Springfield"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              ID Proof Type
            </label>
            <select
              value={idProofType}
              onChange={(e) => setIdProofType(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Driving Licence">Driving Licence</option>
              <option value="Passport">Passport</option>
              <option value="National ID">National ID</option>
            </select>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddCustomerModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Save Customer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
