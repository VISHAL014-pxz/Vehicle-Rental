import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { 
  Compass, 
  CreditCard, 
  Smartphone, 
  Database, 
  Bell, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Radio,
  Car
} from 'lucide-react';

export const FutureScopeDrawer: React.FC = () => {
  const { vehicles, rentals, showToast } = useRental();

  const [activeTab, setActiveTab] = useState<'gps' | 'payment' | 'notifications' | 'database'>('gps');
  const [selectedVehicleForGps, setSelectedVehicleForGps] = useState<string>(vehicles[0]?.id || '');
  const [notificationPhone, setNotificationPhone] = useState('+91 98450 12345');
  const [notificationMsg, setNotificationMsg] = useState('Your rental agreement #RNT-2024-001 has been confirmed. Vehicle ready for pickup at MG Road Hub.');
  const [sentAlerts, setSentAlerts] = useState<Array<{ id: string; time: string; recipient: string; text: string; channel: 'SMS' | 'Email' }>>([
    {
      id: 'MSG-01',
      time: '10:15 AM',
      recipient: '+91 98450 12345',
      text: 'Dispatch Confirmation: Honda City ZX (KA-01-MJ-4050) keys handed over.',
      channel: 'SMS'
    }
  ]);

  const targetVehicle = vehicles.find((v) => v.id === selectedVehicleForGps) || vehicles[0];

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert = {
      id: `MSG-${String(sentAlerts.length + 1).padStart(2, '0')}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipient: notificationPhone,
      text: notificationMsg,
      channel: 'SMS' as const
    };
    setSentAlerts([newAlert, ...sentAlerts]);
    showToast(`Simulated SMS sent to ${notificationPhone}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <span>Assignment Section 4 & Conclusion</span>
          <span>·</span>
          <span>Future Roadmap Demonstrator</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Future Scope Extensions Lab
        </h1>
        <p className="text-xs text-slate-500">
          Interactive prototypes of the 7 future extensions outlined in the PDF: Online Payment, GPS Fleet Tracking, Automated SMS/Email Alerts, and Relational Database synchronization.
        </p>

        {/* Tab selector */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'gps', label: 'GPS Fleet Tracking', icon: Compass },
            { id: 'payment', label: 'Online Payment Gateway', icon: CreditCard },
            { id: 'notifications', label: 'SMS & Email Alerts', icon: Bell },
            { id: 'database', label: 'Database Sync (MySQL/Cloud)', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* GPS Tracking Simulator */}
      {activeTab === 'gps' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Simulated Real-Time Fleet Radar</span>
              </h2>
              <p className="text-xs text-slate-500">
                Simulates GPS IoT transponders reporting latitude, longitude, and telemetry status
              </p>
            </div>

            <select
              value={selectedVehicleForGps}
              onChange={(e) => setSelectedVehicleForGps(e.target.value)}
              className="px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} ({v.vehicleNumber}) - {v.status}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Radar Box */}
          <div className="relative w-full h-80 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Grid concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-emerald-500/10" />
              <div className="w-44 h-44 rounded-full border border-emerald-500/20" />
              <div className="w-24 h-24 rounded-full border border-emerald-500/30" />
              <div className="w-full h-px bg-emerald-500/10" />
              <div className="h-full w-px bg-emerald-500/10" />
            </div>

            {/* Rotating radar scan line */}
            <div className="absolute w-80 h-80 rounded-full border border-emerald-500/5 origin-center animate-[spin_8s_linear_infinite] pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-tl-full" />
            </div>

            {/* Simulated Vehicle pins */}
            {vehicles.map((v, idx) => {
              const isSelected = v.id === targetVehicle?.id;
              // deterministic offset for visual layout
              const leftPercent = 35 + ((idx * 17) % 50);
              const topPercent = 25 + ((idx * 23) % 55);

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleForGps(v.id)}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg ${
                      v.status === 'rented'
                        ? 'bg-indigo-500 shadow-indigo-500/50'
                        : v.status === 'available'
                        ? 'bg-emerald-400 shadow-emerald-400/50'
                        : 'bg-amber-400 shadow-amber-400/50'
                    }`}
                  />
                  {isSelected && (
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white rounded text-[10px] font-mono whitespace-nowrap shadow-xl">
                      {v.vehicleNumber} ({v.model})
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Telemetry info card */}
          {targetVehicle && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Telemetry ID</span>
                <span className="font-mono font-bold text-slate-900">GPS-IOT-{targetVehicle.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current Coords</span>
                <span className="font-mono text-slate-800">
                  {targetVehicle.gpsLocation?.lat.toFixed(4) || '12.9716'}° N, {targetVehicle.gpsLocation?.lng.toFixed(4) || '77.5946'}° E
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Current Depot/Bay</span>
                <span className="font-medium text-slate-800 truncate block">
                  {targetVehicle.gpsLocation?.address || 'Central Terminal'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Vehicle Status</span>
                <span className="font-bold capitalize text-indigo-700">{targetVehicle.status}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Online Payment Simulator */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Online Payment & Digital Checkout Integration
            </h2>
            <p className="text-xs text-slate-500">
              Simulates secure payment authorization, auto-generating instant digital invoices upon booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Credit / Debit Card</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                PCI-DSS simulated vault with automatic pre-authorization of refundable damage deposits.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-700">✓ Tokenization Supported</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <Smartphone className="w-6 h-6 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Instant UPI & QR</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero-touch QR code generation at counter dispatch desk with instantaneous transaction sync.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-700">✓ Real-time Settlement</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <Database className="w-6 h-6 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Corporate Invoicing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Net-30 B2B enterprise credit terms with automated GST / VAT invoice generation.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-700">✓ Automated Ledger Post</div>
            </div>
          </div>
        </div>
      )}

      {/* SMS & Email Alerts */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Automated SMS & Email Notifications
            </h2>
            <p className="text-xs text-slate-500">
              Sends automated booking confirmations, return reminders, and overdue alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Recipient Contact Number
                </label>
                <input
                  type="text"
                  value={notificationPhone}
                  onChange={(e) => setNotificationPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Notification Payload Message
                </label>
                <textarea
                  rows={3}
                  value={notificationMsg}
                  onChange={(e) => setNotificationMsg(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Dispatch Alert</span>
              </button>
            </form>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Notification Outbox Feed
              </span>
              <div className="space-y-2 text-xs">
                {sentAlerts.map((a) => (
                  <div key={a.id} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>{a.channel} · {a.recipient}</span>
                      <span>{a.time}</span>
                    </div>
                    <p className="text-slate-800">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Database sync simulation */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Database Persistence & Architecture
            </h2>
            <p className="text-xs text-slate-500">
              How the system transitions from in-memory OOP Java collections to ACID-compliant relational schemas.
            </p>
          </div>

          <div className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto space-y-2">
            <span className="text-emerald-400 font-bold block">-- MySQL Production Schema DDL</span>
            <pre>
{`CREATE TABLE vehicles (
  vehicle_id VARCHAR(20) PRIMARY KEY,
  vehicle_number VARCHAR(30) UNIQUE NOT NULL,
  type ENUM('Car', 'Bike', 'Van', 'SUV') NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  rent_per_day DECIMAL(10,2) NOT NULL,
  status ENUM('available', 'rented', 'maintenance') DEFAULT 'available'
);

CREATE TABLE customers (
  customer_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(25) NOT NULL,
  driving_licence VARCHAR(50) NOT NULL,
  address TEXT
);

CREATE TABLE rentals (
  rental_id VARCHAR(20) PRIMARY KEY,
  vehicle_id VARCHAR(20) REFERENCES vehicles(vehicle_id),
  customer_id VARCHAR(20) REFERENCES customers(customer_id),
  rental_date DATE NOT NULL,
  return_date DATE NOT NULL,
  days INT NOT NULL,
  total_charges DECIMAL(10,2) NOT NULL,
  status ENUM('Active', 'Returned') DEFAULT 'Active'
);`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
