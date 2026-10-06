import React from 'react';
import { useRental, AppView } from '../context/RentalContext';
import { Car, Plus, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, openRentModalWithVehicle, setIsAddVehicleModalOpen } = useRental();

  const navItems: { id: AppView; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'customers', label: 'Customers' },
    { id: 'rentals', label: 'Active Rentals' },
    { id: 'records', label: 'Rental Records' },
    { id: 'oop-lab', label: 'Java OOP' },
    { id: 'assignment-doc', label: 'Assignment PDF' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, single text element wordmark */}
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
            <Car className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Vehicle Rental System
          </span>
        </button>

        {/* Zone 2: 4-6 text navigation links, single-line with subtle active state */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 ${
                  isActive
                    ? 'text-indigo-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsAddVehicleModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Vehicle</span>
          </button>

          <button
            onClick={() => openRentModalWithVehicle(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors whitespace-nowrap"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Rent Vehicle</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-100 gap-4 text-xs font-medium no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`whitespace-nowrap py-1 px-2 rounded-md transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
