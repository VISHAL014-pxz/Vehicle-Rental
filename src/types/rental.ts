export type VehicleType = 'Car' | 'Bike' | 'Van' | 'SUV';

export type VehicleStatus = 'available' | 'rented' | 'maintenance';

export interface Vehicle {
  id: string;
  vehicleNumber: string; // Registration plate e.g. "DL-01-AB-4321"
  type: VehicleType;
  brand: string;
  model: string;
  rentPerDay: number;
  status: VehicleStatus;
  seatingCapacity: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  mileage: string;
  color: string;
  year: number;
  features: string[];
  currentRentalId?: string;
  gpsLocation?: { lat: number; lng: number; address: string };
}

export interface Customer {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  drivingLicenceDetails: string;
  registeredDate: string;
  idProofType: 'Driving Licence' | 'Passport' | 'National ID';
}

export type RentalStatus = 'Active' | 'Returned' | 'Overdue' | 'Cancelled';

export interface RentalRecord {
  id: string;
  vehicleId: string;
  customerId: string;
  vehicleNumber: string;
  vehicleName: string;
  vehicleType: VehicleType;
  customerName: string;
  customerContact: string;
  rentalDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD expected
  actualReturnDate?: string;
  numberOfRentalDays: number;
  rentPerDay: number;
  baseRentalCharges: number; // Days * Rate
  securityDeposit: number;
  extraCharges: number;
  totalCharges: number;
  status: RentalStatus;
  paymentMethod: 'Cash' | 'Credit Card' | 'Debit Card' | 'UPI' | 'Online Banking';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  notes?: string;
  returnCondition?: 'Good' | 'Minor Scratches' | 'Damaged';
  createdAt: string;
}

export interface AssignmentSection {
  id: string;
  number: string;
  title: string;
  content: string;
}
