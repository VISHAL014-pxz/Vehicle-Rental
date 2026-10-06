import React from 'react';
import { RentalProvider, useRental } from './context/RentalContext';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { FleetManagement } from './components/FleetManagement';
import { CustomerManagement } from './components/CustomerManagement';
import { ActiveRentals } from './components/ActiveRentals';
import { RentalRecords } from './components/RentalRecords';
import { RentalCalculator } from './components/RentalCalculator';
import { OOPDemonstration } from './components/OOPDemonstration';
import { AssignmentDocument } from './components/AssignmentDocument';
import { FutureScopeDrawer } from './components/FutureScopeDrawer';
import { NewRentalModal } from './components/NewRentalModal';
import { AddVehicleModal } from './components/AddVehicleModal';
import { AddCustomerModal } from './components/AddCustomerModal';
import { ReturnVehicleModal } from './components/ReturnVehicleModal';
import { InvoiceModal } from './components/InvoiceModal';
import { RotateCcw, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, toastMessage, resetToDefaultData } = useRental();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <DashboardOverview />}
        {currentView === 'fleet' && <FleetManagement />}
        {currentView === 'customers' && <CustomerManagement />}
        {currentView === 'rentals' && <ActiveRentals />}
        {currentView === 'records' && <RentalRecords />}
        {currentView === 'calculator' && <RentalCalculator />}
        {currentView === 'oop-lab' && <OOPDemonstration />}
        {currentView === 'assignment-doc' && <AssignmentDocument />}
        {currentView === 'future-scope' && <FutureScopeDrawer />}
      </main>

      {/* Interactive Global Modals */}
      <NewRentalModal />
      <AddVehicleModal />
      <AddCustomerModal />
      <ReturnVehicleModal />
      <InvoiceModal />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-xs font-medium ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950 text-emerald-200 border-emerald-800'
                : toastMessage.type === 'error'
                ? 'bg-rose-950 text-rose-200 border-rose-800'
                : 'bg-slate-900 text-slate-200 border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            {toastMessage.type === 'error' && (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            {toastMessage.type === 'info' && (
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Vehicle Rental Management System</span>
            <span>·</span>
            <span>Assignment 1: Java OOP Implementation</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentView('calculator')}
              className="hover:text-slate-900 transition-colors"
            >
              Step 5 Calculator
            </button>
            <button
              onClick={() => setCurrentView('future-scope')}
              className="hover:text-slate-900 transition-colors"
            >
              Future Extensions
            </button>
            <button
              onClick={() => setCurrentView('assignment-doc')}
              className="hover:text-slate-900 transition-colors"
            >
              Specification PDF
            </button>
            <button
              onClick={resetToDefaultData}
              title="Reset demonstration data"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <RentalProvider>
      <AppContent />
    </RentalProvider>
  );
}
