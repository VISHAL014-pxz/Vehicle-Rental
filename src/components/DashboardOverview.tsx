import React from 'react';
import { useRental } from '../context/RentalContext';
import { VehicleGraphic } from './VehicleGraphic';
import { 
  Car, 
  Users, 
  KeyRound, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileCode2,
  FileText,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    vehicles,
    rentals,
    customers,
    metrics,
    setCurrentView,
    openRentModalWithVehicle,
    setIsAddVehicleModalOpen,
    setIsAddCustomerModalOpen,
    openReturnModalWithRental,
    setSelectedInvoice
  } = useRental();

  const availableVehicles = vehicles.filter((v) => v.status === 'available');
  const activeRentals = rentals.filter((r) => r.status === 'Active');

  return (
    <div className="space-y-8">
      {/* Hero Welcome & Problem-Solution Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Assignment 1</span>
            <span>·</span>
            <span>Object-Oriented Programming in Java</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Vehicle Rental Management System
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            A computerized rental solution designed to eliminate manual notebook records, 
            prevent double bookings, automate rental charge calculations, and demonstrate 
            Java OOP concepts (Encapsulation, Inheritance, Polymorphism, Abstraction).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openRentModalWithVehicle(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors"
            >
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <span>Rent a Vehicle</span>
            </button>

            <button
              onClick={() => setCurrentView('oop-lab')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600/60 hover:bg-indigo-600/80 border border-indigo-400/30 rounded-lg transition-colors"
            >
              <FileCode2 className="w-4 h-4 text-indigo-300" />
              <span>Explore Java OOP Architecture</span>
            </button>

            <button
              onClick={() => setCurrentView('assignment-doc')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Read Assignment Document</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative geometric overlay */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Fleet</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {metrics.totalVehicles}
            </span>
            <span className="text-[11px] text-slate-400">Assets</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Available</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-600">
              {metrics.availableVehicles}
            </span>
            <span className="text-[11px] text-emerald-600/80 font-medium">Ready</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Active Rentals</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-indigo-600">
              {metrics.activeRentals}
            </span>
            <span className="text-[11px] text-indigo-600/80 font-medium">On Road</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Utilization</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {metrics.utilizationRate}%
            </span>
            <span className="text-[11px] text-slate-400">Occupancy</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Customers</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {metrics.totalCustomers}
            </span>
            <span className="text-[11px] text-slate-400">Registered</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Revenue</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              ${metrics.totalRevenue}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Collected</span>
          </div>
        </div>
      </div>

      {/* 7-Step Working Methodology Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Working Methodology (7 Steps)
            </h2>
            <p className="text-xs text-slate-500">
              Standardized OOP execution pipeline as defined in Section 7 of the assignment
            </p>
          </div>
          <button
            onClick={() => setCurrentView('oop-lab')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
          {[
            { step: 'Step 1', title: 'Add Vehicle', desc: 'Admin enters vehicle specs' },
            { step: 'Step 2', title: 'Add Customer', desc: 'Record identity & licence' },
            { step: 'Step 3', title: 'Check Availability', desc: 'Verify readiness status' },
            { step: 'Step 4', title: 'Rent Vehicle', desc: 'Create active agreement' },
            { step: 'Step 5', title: 'Calculate Rent', desc: 'Days × Rent Per Day' },
            { step: 'Step 6', title: 'Return Vehicle', desc: 'Inspection & fleet restore' },
            { step: 'Step 7', title: 'Display Record', desc: 'Invoice & billing summary' },
          ].map((s, idx) => (
            <div
              key={s.step}
              className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase block mb-1">
                  {s.step}
                </span>
                <span className="font-semibold text-slate-900 block leading-tight">
                  {s.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Available Fleet Showcase + Active Rentals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Fleet Showcase (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Available Vehicles (Step 3: Availability Verification)
              </h2>
              <p className="text-xs text-slate-500">
                Instantly bookable vehicles with verified operational status
              </p>
            </div>
            <button
              onClick={() => setCurrentView('fleet')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View All ({vehicles.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableVehicles.slice(0, 4).map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col"
              >
                {/* Visual Technical Silhouette Graphic */}
                <VehicleGraphic
                  type={vehicle.type}
                  brand={vehicle.brand}
                  model={vehicle.model}
                  className="h-32"
                />

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-mono font-medium text-slate-500">
                        {vehicle.vehicleNumber}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{vehicle.type}</span>
                      <span>·</span>
                      <span>{vehicle.fuelType}</span>
                      <span>·</span>
                      <span>{vehicle.transmission}</span>
                      <span>·</span>
                      <span>{vehicle.seatingCapacity} seats</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Rate per day</span>
                      <span className="text-base font-bold font-mono tabular-nums text-slate-900">
                        ${vehicle.rentPerDay}
                      </span>
                    </div>

                    <button
                      onClick={() => openRentModalWithVehicle(vehicle)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Rentals Panel (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Active Rentals
              </h2>
              <p className="text-xs text-slate-500">
                Vehicles currently on the road
              </p>
            </div>
            <button
              onClick={() => setCurrentView('rentals')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeRentals.length === 0 ? (
              <div className="p-6 bg-white rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                No active rentals at the moment. All vehicles are parked at the hub.
              </div>
            ) : (
              activeRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      {rental.id}
                    </span>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {rental.vehicleName}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Plate: {rental.vehicleNumber}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer:</span>
                      <strong className="text-slate-900">{rental.customerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-mono tabular-nums">{rental.numberOfRentalDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Due Date:</span>
                      <span className="font-mono tabular-nums text-slate-900 font-medium">{rental.returnDate}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">Total Billed:</span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">${rental.totalCharges}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => openReturnModalWithRental(rental)}
                      className="flex-1 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center"
                    >
                      Process Return
                    </button>
                    <button
                      onClick={() => setSelectedInvoice(rental)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
