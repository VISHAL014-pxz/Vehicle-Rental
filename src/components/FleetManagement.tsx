import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { Vehicle, VehicleType, VehicleStatus } from '../types/rental';
import { VehicleGraphic } from './VehicleGraphic';
import { 
  Plus, 
  Search, 
  Filter, 
  Car, 
  Trash2, 
  Wrench, 
  CheckCircle, 
  Eye, 
  ArrowUpDown 
} from 'lucide-react';

export const FleetManagement: React.FC = () => {
  const {
    vehicles,
    setIsAddVehicleModalOpen,
    openRentModalWithVehicle,
    updateVehicle,
    deleteVehicle
  } = useRental();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | VehicleType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | VehicleStatus>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDetailVehicle, setSelectedDetailVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'All' || v.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleMaintenance = (v: Vehicle) => {
    if (v.status === 'rented') return;
    const nextStatus: VehicleStatus = v.status === 'maintenance' ? 'available' : 'maintenance';
    updateVehicle({ ...v, status: nextStatus });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Fleet Vehicle Management
          </h1>
          <p className="text-xs text-slate-500">
            Step 1: Store & manage vehicle details · Step 3: Check real-time vehicle availability
          </p>
        </div>

        <button
          onClick={() => setIsAddVehicleModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by brand, model, registration plate (e.g. KA-01-MJ-4050)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* View toggle (Grid vs Table) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Filter Badges / Segmented controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Vehicle Type Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Type:</span>
            {(['All', 'Car', 'Bike', 'Van', 'SUV'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  typeFilter === t
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Status:</span>
            {(['All', 'available', 'rented', 'maintenance'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicles Grid / Table display */}
      {filteredVehicles.length === 0 ? (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <Car className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-800">No vehicles match criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or filters, or add a new vehicle to the fleet.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('All');
              setStatusFilter('All');
            }}
            className="px-3 py-1.5 text-xs text-indigo-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              {/* Graphic container */}
              <VehicleGraphic
                type={vehicle.type}
                brand={vehicle.brand}
                model={vehicle.model}
                className="h-32"
              />

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-slate-500">
                      {vehicle.vehicleNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                        vehicle.status === 'available'
                          ? 'bg-emerald-50 text-emerald-700'
                          : vehicle.status === 'rented'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {vehicle.brand} {vehicle.model}
                  </h3>

                  {/* Metadata unboxed text */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 flex-wrap">
                    <span>{vehicle.type}</span>
                    <span>·</span>
                    <span>{vehicle.fuelType}</span>
                    <span>·</span>
                    <span>{vehicle.transmission}</span>
                    <span>·</span>
                    <span>{vehicle.seatingCapacity} Seats</span>
                  </div>

                  {/* Features preview */}
                  {vehicle.features && vehicle.features.length > 0 && (
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                      {vehicle.features.join(' · ')}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Daily Charge
                    </span>
                    <span className="text-base font-bold font-mono tabular-nums text-slate-900">
                      ${vehicle.rentPerDay}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {vehicle.status === 'available' ? (
                      <button
                        onClick={() => openRentModalWithVehicle(vehicle)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                      >
                        Rent Now
                      </button>
                    ) : vehicle.status === 'rented' ? (
                      <span className="text-xs font-medium text-indigo-700 px-2 py-1 bg-indigo-50 rounded">
                        On Hire
                      </span>
                    ) : (
                      <button
                        onClick={() => toggleMaintenance(vehicle)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
                      >
                        Restore
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedDetailVehicle(vehicle)}
                      title="View Details"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {vehicle.status !== 'rented' && (
                      <button
                        onClick={() => deleteVehicle(vehicle.id)}
                        title="Delete Vehicle"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Asset ID</th>
                  <th className="py-3 px-4">Reg Plate</th>
                  <th className="py-3 px-4">Brand & Model</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Specs</th>
                  <th className="py-3 px-4 text-right">Rent/Day</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {vehicle.id}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {vehicle.vehicleNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {vehicle.brand} {vehicle.model}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {vehicle.type}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {vehicle.fuelType} · {vehicle.transmission} · {vehicle.seatingCapacity} seats
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-right font-bold text-slate-900">
                      ${vehicle.rentPerDay}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                          vehicle.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700'
                            : vehicle.status === 'rented'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      {vehicle.status === 'available' && (
                        <button
                          onClick={() => openRentModalWithVehicle(vehicle)}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
                        >
                          Rent
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedDetailVehicle(vehicle)}
                        className="px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                      >
                        Details
                      </button>
                      {vehicle.status !== 'rented' && (
                        <button
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vehicle Specification Drawer / Modal */}
      {selectedDetailVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase">{selectedDetailVehicle.id}</span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedDetailVehicle.brand} {selectedDetailVehicle.model}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailVehicle(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <VehicleGraphic
              type={selectedDetailVehicle.type}
              brand={selectedDetailVehicle.brand}
              model={selectedDetailVehicle.model}
              className="h-28"
            />

            <div className="space-y-2 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Registration Number</span>
                <span className="font-mono font-bold text-slate-900">{selectedDetailVehicle.vehicleNumber}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Vehicle Type</span>
                <span className="font-medium text-slate-900">{selectedDetailVehicle.type}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Daily Rental Charge</span>
                <span className="font-mono font-bold text-slate-900">${selectedDetailVehicle.rentPerDay} / day</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Current Status</span>
                <span className="font-semibold capitalize text-slate-900">{selectedDetailVehicle.status}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Fuel & Transmission</span>
                <span className="text-slate-900">{selectedDetailVehicle.fuelType} · {selectedDetailVehicle.transmission}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Seating Capacity</span>
                <span className="text-slate-900">{selectedDetailVehicle.seatingCapacity} Persons</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Fuel Mileage Rating</span>
                <span className="text-slate-900">{selectedDetailVehicle.mileage}</span>
              </div>
              {selectedDetailVehicle.gpsLocation && (
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Hub Parking Bay</span>
                  <span className="text-slate-900">{selectedDetailVehicle.gpsLocation.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              {selectedDetailVehicle.status === 'available' && (
                <button
                  onClick={() => {
                    const v = selectedDetailVehicle;
                    setSelectedDetailVehicle(null);
                    openRentModalWithVehicle(v);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Rent This Vehicle
                </button>
              )}
              <button
                onClick={() => setSelectedDetailVehicle(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
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
