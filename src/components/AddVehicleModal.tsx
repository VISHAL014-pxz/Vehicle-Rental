import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { VehicleType, VehicleStatus } from '../types/rental';
import { X, Plus, Car } from 'lucide-react';

export const AddVehicleModal: React.FC = () => {
  const { isAddVehicleModalOpen, setIsAddVehicleModalOpen, addVehicle } = useRental();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState<VehicleType>('Car');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [rentPerDay, setRentPerDay] = useState<number>(45);
  const [status, setStatus] = useState<VehicleStatus>('available');
  const [seatingCapacity, setSeatingCapacity] = useState<number>(5);
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'>('Petrol');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [color, setColor] = useState('Pearl White');
  const [year, setYear] = useState<number>(2024);
  const [mileage, setMileage] = useState('18 km/l');
  const [features, setFeatures] = useState('Bluetooth, Backup Camera, Cruise Control');
  const [error, setError] = useState('');

  if (!isAddVehicleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!brand.trim() || !model.trim() || !vehicleNumber.trim()) {
      setError('Please provide Brand, Model, and Vehicle Registration Number.');
      return;
    }

    if (rentPerDay <= 0) {
      setError('Rental price per day must be greater than $0.');
      return;
    }

    const featureList = features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    addVehicle({
      brand: brand.trim(),
      model: model.trim(),
      type,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      rentPerDay,
      status,
      seatingCapacity,
      fuelType,
      transmission,
      color: color.trim(),
      year,
      mileage: mileage.trim(),
      features: featureList
    });

    // Reset and close
    setBrand('');
    setModel('');
    setVehicleNumber('');
    setIsAddVehicleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-indigo-600" />
              <span>Step 1: Add New Vehicle to Fleet</span>
            </h2>
            <p className="text-xs text-slate-500">
              Vehicle details required by system specifications
            </p>
          </div>
          <button
            onClick={() => setIsAddVehicleModalOpen(false)}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Vehicle Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  const t = e.target.value as VehicleType;
                  setType(t);
                  if (t === 'Bike') setSeatingCapacity(2);
                  else if (t === 'Van') setSeatingCapacity(10);
                  else setSeatingCapacity(5);
                }}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Vehicle Number (Reg. Plate)
              </label>
              <input
                type="text"
                placeholder="e.g. KA-05-MB-9021"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono uppercase border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                placeholder="e.g. Toyota, Honda, Yamaha"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Model Name
              </label>
              <input
                type="text"
                placeholder="e.g. Camry, Civic, MT-15"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Rental Price ($/Day)
              </label>
              <input
                type="number"
                min="5"
                max="5000"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={seatingCapacity}
                onChange={(e) => setSeatingCapacity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Transmission
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Year
              </label>
              <input
                type="number"
                min="2000"
                max="2026"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || 2024)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Features (comma separated)
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g. Sunroof, Bluetooth, ABS, Heated Seats"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddVehicleModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Vehicle to Fleet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
