import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Customer, RentalRecord, VehicleType, VehicleStatus } from '../types/rental';
import { INITIAL_VEHICLES, INITIAL_CUSTOMERS, INITIAL_RENTALS } from '../data/initialData';

export type AppView = 
  | 'dashboard'
  | 'fleet'
  | 'customers'
  | 'rentals'
  | 'records'
  | 'calculator'
  | 'oop-lab'
  | 'assignment-doc'
  | 'future-scope';

interface RentalContextType {
  vehicles: Vehicle[];
  customers: Customer[];
  rentals: RentalRecord[];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  // Step 1: Vehicle operations
  addVehicle: (v: Omit<Vehicle, 'id'>) => Vehicle;
  updateVehicle: (v: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  // Step 2: Customer operations
  addCustomer: (c: Omit<Customer, 'id' | 'registeredDate'>) => Customer;
  updateCustomer: (c: Customer) => void;
  deleteCustomer: (id: string) => void;
  // Step 3: Check availability
  isVehicleAvailable: (vehicleId: string) => boolean;
  // Step 4 & 5: Rent Vehicle and calculate rent
  rentVehicle: (params: {
    vehicleId: string;
    customerId: string;
    rentalDate: string;
    returnDate: string;
    numberOfRentalDays: number;
    paymentMethod: RentalRecord['paymentMethod'];
    securityDeposit?: number;
    notes?: string;
  }) => RentalRecord;
  // Step 6: Return vehicle
  returnVehicle: (
    rentalId: string, 
    condition: 'Good' | 'Minor Scratches' | 'Damaged', 
    penaltyCharge?: number,
    notes?: string
  ) => void;
  // Stats
  metrics: {
    totalVehicles: number;
    availableVehicles: number;
    rentedVehicles: number;
    maintenanceVehicles: number;
    totalCustomers: number;
    activeRentals: number;
    completedRentals: number;
    totalRevenue: number;
    utilizationRate: number;
  };
  // Modals state
  isRentModalOpen: boolean;
  setIsRentModalOpen: (open: boolean) => void;
  selectedVehicleForRent: Vehicle | null;
  openRentModalWithVehicle: (v: Vehicle | null) => void;
  isAddVehicleModalOpen: boolean;
  setIsAddVehicleModalOpen: (open: boolean) => void;
  isAddCustomerModalOpen: boolean;
  setIsAddCustomerModalOpen: (open: boolean) => void;
  isReturnModalOpen: boolean;
  setIsReturnModalOpen: (open: boolean) => void;
  selectedRentalForReturn: RentalRecord | null;
  openReturnModalWithRental: (r: RentalRecord) => void;
  selectedInvoice: RentalRecord | null;
  setSelectedInvoice: (r: RentalRecord | null) => void;
  // Toast notifications
  toastMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  resetToDefaultData: () => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('vrms_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('vrms_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [rentals, setRentals] = useState<RentalRecord[]>(() => {
    const saved = localStorage.getItem('vrms_rentals');
    return saved ? JSON.parse(saved) : INITIAL_RENTALS;
  });

  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [selectedVehicleForRent, setSelectedVehicleForRent] = useState<Vehicle | null>(null);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedRentalForReturn, setSelectedRentalForReturn] = useState<RentalRecord | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<RentalRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('vrms_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('vrms_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('vrms_rentals', JSON.stringify(rentals));
  }, [rentals]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const openRentModalWithVehicle = (v: Vehicle | null) => {
    setSelectedVehicleForRent(v);
    setIsRentModalOpen(true);
  };

  const openReturnModalWithRental = (r: RentalRecord) => {
    setSelectedRentalForReturn(r);
    setIsReturnModalOpen(true);
  };

  // Step 1: Add Vehicle
  const addVehicle = (vData: Omit<Vehicle, 'id'>): Vehicle => {
    const newId = `V-${100 + vehicles.length + 1}`;
    const newVehicle: Vehicle = {
      ...vData,
      id: newId,
      status: vData.status || 'available'
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    showToast(`Vehicle ${newVehicle.brand} ${newVehicle.model} (${newVehicle.vehicleNumber}) added successfully!`, 'success');
    return newVehicle;
  };

  const updateVehicle = (updated: Vehicle) => {
    setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    showToast(`Vehicle ${updated.model} updated successfully.`, 'info');
  };

  const deleteVehicle = (id: string) => {
    const v = vehicles.find((item) => item.id === id);
    if (v && v.status === 'rented') {
      showToast(`Cannot delete vehicle ${v.model} while currently on rental!`, 'error');
      return;
    }
    setVehicles((prev) => prev.filter((item) => item.id !== id));
    showToast(`Vehicle removed from fleet.`, 'info');
  };

  // Step 2: Add Customer
  const addCustomer = (cData: Omit<Customer, 'id' | 'registeredDate'>): Customer => {
    const newId = `CUST-00${customers.length + 1}`;
    const newCustomer: Customer = {
      ...cData,
      id: newId,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    showToast(`Customer ${newCustomer.name} registered successfully!`, 'success');
    return newCustomer;
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Customer records for ${updated.name} updated.`, 'info');
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    showToast(`Customer record deleted.`, 'info');
  };

  // Step 3: Check Availability
  const isVehicleAvailable = (vehicleId: string): boolean => {
    const v = vehicles.find((item) => item.id === vehicleId);
    return v ? v.status === 'available' : false;
  };

  // Step 4 & 5: Rent Vehicle and Calculate Rent
  const rentVehicle = ({
    vehicleId,
    customerId,
    rentalDate,
    returnDate,
    numberOfRentalDays,
    paymentMethod,
    securityDeposit = 100,
    notes = ''
  }: {
    vehicleId: string;
    customerId: string;
    rentalDate: string;
    returnDate: string;
    numberOfRentalDays: number;
    paymentMethod: RentalRecord['paymentMethod'];
    securityDeposit?: number;
    notes?: string;
  }): RentalRecord => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const customer = customers.find((c) => c.id === customerId);

    if (!vehicle) throw new Error('Vehicle not found');
    if (!customer) throw new Error('Customer not found');
    if (vehicle.status !== 'available') throw new Error('Selected vehicle is not available!');

    // Step 5 Formula: Total Rent = Rental Days * Rent Per Day
    const baseRentalCharges = numberOfRentalDays * vehicle.rentPerDay;
    const totalCharges = baseRentalCharges + securityDeposit;
    const rentalId = `RNT-${new Date().getFullYear()}-${String(rentals.length + 1).padStart(3, '0')}`;

    const newRental: RentalRecord = {
      id: rentalId,
      vehicleId: vehicle.id,
      customerId: customer.id,
      vehicleNumber: vehicle.vehicleNumber,
      vehicleName: `${vehicle.brand} ${vehicle.model}`,
      vehicleType: vehicle.type,
      customerName: customer.name,
      customerContact: customer.contactNumber,
      rentalDate,
      returnDate,
      numberOfRentalDays,
      rentPerDay: vehicle.rentPerDay,
      baseRentalCharges,
      securityDeposit,
      extraCharges: 0,
      totalCharges,
      status: 'Active',
      paymentMethod,
      paymentStatus: 'Paid',
      notes,
      createdAt: new Date().toLocaleString()
    };

    // Update vehicle status to rented
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId
          ? { ...v, status: 'rented', currentRentalId: rentalId }
          : v
      )
    );

    // Save rental
    setRentals((prev) => [newRental, ...prev]);

    showToast(`Rental ${rentalId} confirmed! ${vehicle.model} allocated to ${customer.name}.`, 'success');
    return newRental;
  };

  // Step 6: Return Vehicle
  const returnVehicle = (
    rentalId: string,
    condition: 'Good' | 'Minor Scratches' | 'Damaged',
    penaltyCharge = 0,
    notes = ''
  ) => {
    const rental = rentals.find((r) => r.id === rentalId);
    if (!rental) return;

    const actualReturnDate = new Date().toISOString().split('T')[0];
    const updatedTotal = rental.totalCharges + penaltyCharge;

    // Update rental record
    setRentals((prev) =>
      prev.map((r) =>
        r.id === rentalId
          ? {
              ...r,
              status: 'Returned',
              actualReturnDate,
              returnCondition: condition,
              extraCharges: penaltyCharge,
              totalCharges: updatedTotal,
              notes: notes ? `${r.notes || ''} [Return notes: ${notes}]` : r.notes
            }
          : r
      )
    );

    // Step 6: When customer returns vehicle, updates status to Available
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === rental.vehicleId
          ? { ...v, status: 'available', currentRentalId: undefined }
          : v
      )
    );

    showToast(
      `Vehicle returned successfully! ${rental.vehicleName} status restored to Available.`,
      'success'
    );
  };

  const resetToDefaultData = () => {
    setVehicles(INITIAL_VEHICLES);
    setCustomers(INITIAL_CUSTOMERS);
    setRentals(INITIAL_RENTALS);
    localStorage.removeItem('vrms_vehicles');
    localStorage.removeItem('vrms_customers');
    localStorage.removeItem('vrms_rentals');
    showToast('Reset database to clean initial demonstration dataset.', 'info');
  };

  // Metrics computation
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.status === 'available').length;
  const rentedVehicles = vehicles.filter((v) => v.status === 'rented').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'maintenance').length;
  const totalCustomers = customers.length;
  const activeRentals = rentals.filter((r) => r.status === 'Active').length;
  const completedRentals = rentals.filter((r) => r.status === 'Returned').length;
  const totalRevenue = rentals.reduce((sum, r) => sum + r.baseRentalCharges + r.extraCharges, 0);
  const utilizationRate = totalVehicles > 0 ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;

  return (
    <RentalContext.Provider
      value={{
        vehicles,
        customers,
        rentals,
        currentView,
        setCurrentView,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        isVehicleAvailable,
        rentVehicle,
        returnVehicle,
        metrics: {
          totalVehicles,
          availableVehicles,
          rentedVehicles,
          maintenanceVehicles,
          totalCustomers,
          activeRentals,
          completedRentals,
          totalRevenue,
          utilizationRate
        },
        isRentModalOpen,
        setIsRentModalOpen,
        selectedVehicleForRent,
        openRentModalWithVehicle,
        isAddVehicleModalOpen,
        setIsAddVehicleModalOpen,
        isAddCustomerModalOpen,
        setIsAddCustomerModalOpen,
        isReturnModalOpen,
        setIsReturnModalOpen,
        selectedRentalForReturn,
        openReturnModalWithRental,
        selectedInvoice,
        setSelectedInvoice,
        toastMessage,
        showToast,
        resetToDefaultData
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
