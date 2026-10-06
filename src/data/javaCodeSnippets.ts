export interface JavaClassSnippet {
  name: string;
  filename: string;
  description: string;
  oopConcept: string;
  code: string;
}

export const JAVA_OOP_CLASSES: JavaClassSnippet[] = [
  {
    name: 'Vehicle (Abstract Base Class)',
    filename: 'Vehicle.java',
    description: 'Demonstrates Abstraction and Encapsulation. Base class representing common vehicle attributes and abstract operations.',
    oopConcept: 'Abstraction & Encapsulation',
    code: `// Vehicle.java - Base Abstract Class
// Demonstrates Abstraction & Encapsulation
package com.vrms.model;

public abstract class Vehicle {
    // Encapsulation: private attributes hidden from direct external mutation
    private String vehicleId;
    private String vehicleNumber;
    private String brand;
    private String model;
    private double rentPerDay;
    private boolean isAvailable;

    // Constructor
    public Vehicle(String vehicleId, String vehicleNumber, String brand, String model, double rentPerDay) {
        this.vehicleId = vehicleId;
        this.vehicleNumber = vehicleNumber;
        this.brand = brand;
        this.model = model;
        this.rentPerDay = rentPerDay;
        this.isAvailable = true; // By default newly added vehicle is available
    }

    // Getters and Setters (Encapsulation interface)
    public String getVehicleId() { return vehicleId; }
    public String getVehicleNumber() { return vehicleNumber; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public double getRentPerDay() { return rentPerDay; }
    public boolean isAvailable() { return isAvailable; }

    public void setRentPerDay(double rentPerDay) {
        if (rentPerDay > 0) {
            this.rentPerDay = rentPerDay;
        }
    }

    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }

    // Polymorphism: Abstract method to be overridden by Car, Bike, Van
    public abstract double calculateRentalCost(int days);

    // Common abstract description
    public abstract String getVehicleType();

    public void displayDetails() {
        System.out.println("ID: " + vehicleId + " | Reg: " + vehicleNumber + 
                           " | " + brand + " " + model + 
                           " | Daily: $" + rentPerDay + 
                           " | Status: " + (isAvailable ? "Available" : "Rented"));
    }
}`
  },
  {
    name: 'Car (Subclass)',
    filename: 'Car.java',
    description: 'Inherits from Vehicle. Implements specific car attributes (seating, transmission) and polymorphic rental calculations with luxury/AC adjustments.',
    oopConcept: 'Inheritance & Polymorphism',
    code: `// Car.java - Concrete Subclass
// Demonstrates Inheritance & Polymorphism
package com.vrms.model;

public class Car extends Vehicle {
    private int seatingCapacity;
    private String transmission;
    private boolean hasSunroof;

    public Car(String vehicleId, String vehicleNumber, String brand, String model, 
               double rentPerDay, int seatingCapacity, String transmission, boolean hasSunroof) {
        // Calling superclass constructor
        super(vehicleId, vehicleNumber, brand, model, rentPerDay);
        this.seatingCapacity = seatingCapacity;
        this.transmission = transmission;
        this.hasSunroof = hasSunroof;
    }

    @Override
    public String getVehicleType() {
        return "Car";
    }

    // Polymorphism: Car standard calculation = days * rentPerDay
    @Override
    public double calculateRentalCost(int days) {
        double cost = getRentPerDay() * days;
        // Automatic 5% multi-day discount for rentals > 7 days
        if (days >= 7) {
            cost *= 0.95;
        }
        return cost;
    }

    public int getSeatingCapacity() { return seatingCapacity; }
    public String getTransmission() { return transmission; }
    public boolean hasSunroof() { return hasSunroof; }
}`
  },
  {
    name: 'Bike (Subclass)',
    filename: 'Bike.java',
    description: 'Inherits from Vehicle. Specialized for two-wheelers with engine CC and complimentary helmet policy.',
    oopConcept: 'Inheritance & Polymorphism',
    code: `// Bike.java - Concrete Subclass
// Demonstrates Inheritance & Polymorphism
package com.vrms.model;

public class Bike extends Vehicle {
    private int engineCapacityCC;
    private boolean helmetIncluded;

    public Bike(String vehicleId, String vehicleNumber, String brand, String model, 
                double rentPerDay, int engineCapacityCC, boolean helmetIncluded) {
        super(vehicleId, vehicleNumber, brand, model, rentPerDay);
        this.engineCapacityCC = engineCapacityCC;
        this.helmetIncluded = helmetIncluded;
    }

    @Override
    public String getVehicleType() {
        return "Bike";
    }

    // Polymorphism: Bike calculation with nominal safety gear waiver
    @Override
    public double calculateRentalCost(int days) {
        return getRentPerDay() * days;
    }

    public int getEngineCapacityCC() { return engineCapacityCC; }
    public boolean isHelmetIncluded() { return helmetIncluded; }
}`
  },
  {
    name: 'Van (Subclass)',
    filename: 'Van.java',
    description: 'Inherits from Vehicle. Heavy commercial passenger/cargo transport with volume surcharge.',
    oopConcept: 'Inheritance & Polymorphism',
    code: `// Van.java - Concrete Subclass
// Demonstrates Inheritance & Polymorphism
package com.vrms.model;

public class Van extends Vehicle {
    private int cargoCapacityKg;
    private int maxPassengers;

    public Van(String vehicleId, String vehicleNumber, String brand, String model, 
               double rentPerDay, int cargoCapacityKg, int maxPassengers) {
        super(vehicleId, vehicleNumber, brand, model, rentPerDay);
        this.cargoCapacityKg = cargoCapacityKg;
        this.maxPassengers = maxPassengers;
    }

    @Override
    public String getVehicleType() {
        return "Van";
    }

    // Polymorphism: Commercial vehicle commercial wear maintenance cost
    @Override
    public double calculateRentalCost(int days) {
        double cost = getRentPerDay() * days;
        // Standard commercial insurance surcharge $15
        cost += 15.0;
        return cost;
    }

    public int getCargoCapacityKg() { return cargoCapacityKg; }
    public int getMaxPassengers() { return maxPassengers; }
}`
  },
  {
    name: 'Customer Class',
    filename: 'Customer.java',
    description: 'Represents rental patron entity with private contact and driving licence verification attributes.',
    oopConcept: 'Encapsulation',
    code: `// Customer.java
// Encapsulation of Customer Records
package com.vrms.model;

public class Customer {
    private String customerId;
    private String name;
    private String contactNumber;
    private String email;
    private String address;
    private String drivingLicenceNumber;

    public Customer(String customerId, String name, String contactNumber, 
                    String email, String address, String drivingLicenceNumber) {
        this.customerId = customerId;
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.address = address;
        this.drivingLicenceNumber = drivingLicenceNumber;
    }

    // Getters
    public String getCustomerId() { return customerId; }
    public String getName() { return name; }
    public String getContactNumber() { return contactNumber; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public String getDrivingLicenceNumber() { return drivingLicenceNumber; }

    public void displayCustomer() {
        System.out.println("Customer [" + customerId + "] " + name + 
                           " | Phone: " + contactNumber + 
                           " | Licence: " + drivingLicenceNumber);
    }
}`
  },
  {
    name: 'Rental Transaction Class',
    filename: 'Rental.java',
    description: 'Encapsulates the rental agreement binding a Customer and a Vehicle with duration, calculation, and return state.',
    oopConcept: 'Class Association & State Management',
    code: `// Rental.java - Rental Agreement Record
package com.vrms.model;

import java.time.LocalDate;

public class Rental {
    private String rentalId;
    private Vehicle vehicle;
    private Customer customer;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private int rentalDays;
    private double totalCharges;
    private boolean isReturned;

    public Rental(String rentalId, Vehicle vehicle, Customer customer, 
                  LocalDate rentalDate, int rentalDays) {
        this.rentalId = rentalId;
        this.vehicle = vehicle;
        this.customer = customer;
        this.rentalDate = rentalDate;
        this.rentalDays = rentalDays;
        this.returnDate = rentalDate.plusDays(rentalDays);
        this.isReturned = false;

        // Polymorphic cost calculation:
        // Total Rent = Rental Days * Rent Per Day
        this.totalCharges = vehicle.calculateRentalCost(rentalDays);

        // Mark vehicle as rented (encapsulated state transition)
        this.vehicle.setAvailable(false);
    }

    public void returnVehicle() {
        this.isReturned = true;
        this.vehicle.setAvailable(true); // Return to fleet
    }

    public String getRentalId() { return rentalId; }
    public Vehicle getVehicle() { return vehicle; }
    public Customer getCustomer() { return customer; }
    public int getRentalDays() { return rentalDays; }
    public double getTotalCharges() { return totalCharges; }
    public boolean isReturned() { return isReturned; }
}`
  },
  {
    name: 'RentalSystem (Main Controller)',
    filename: 'RentalSystem.java',
    description: 'Coordinates all 7 steps of the assignment methodology: Add Vehicle, Add Customer, Check Availability, Rent Vehicle, Calculate Rent, Return Vehicle, and Display Rental Records.',
    oopConcept: 'High-Level OOP Orchestration',
    code: `// RentalSystem.java - Main Application Driver
package com.vrms;

import com.vrms.model.*;
import java.time.LocalDate;
import java.util.*;

public class RentalSystem {
    private List<Vehicle> fleet = new ArrayList<>();
    private List<Customer> customers = new ArrayList<>();
    private List<Rental> rentals = new ArrayList<>();

    // Step 1: Add Vehicle
    public void addVehicle(Vehicle v) {
        fleet.add(v);
        System.out.println("Vehicle added: " + v.getBrand() + " " + v.getModel());
    }

    // Step 2: Add Customer
    public void addCustomer(Customer c) {
        customers.add(c);
        System.out.println("Customer registered: " + c.getName());
    }

    // Step 3: Check Availability
    public List<Vehicle> getAvailableVehicles() {
        List<Vehicle> available = new ArrayList<>();
        for (Vehicle v : fleet) {
            if (v.isAvailable()) {
                available.add(v);
            }
        }
        return available;
    }

    // Step 4 & 5: Rent Vehicle & Calculate Rent
    public Rental rentVehicle(String vehicleId, String customerId, int days) {
        Vehicle targetVehicle = null;
        for (Vehicle v : fleet) {
            if (v.getVehicleId().equals(vehicleId) && v.isAvailable()) {
                targetVehicle = v;
                break;
            }
        }

        Customer targetCustomer = null;
        for (Customer c : customers) {
            if (c.getCustomerId().equals(customerId)) {
                targetCustomer = c;
                break;
            }
        }

        if (targetVehicle == null) {
            System.out.println("Error: Vehicle unavailable or not found!");
            return null;
        }

        String rentalId = "RNT-" + (rentals.size() + 100);
        Rental rental = new Rental(rentalId, targetVehicle, targetCustomer, LocalDate.now(), days);
        rentals.add(rental);

        System.out.println("Rental Created! Total charges: $" + rental.getTotalCharges());
        return rental;
    }

    // Step 6: Return Vehicle
    public void returnVehicle(String rentalId) {
        for (Rental r : rentals) {
            if (r.getRentalId().equals(rentalId) && !r.isReturned()) {
                r.returnVehicle();
                System.out.println("Vehicle " + r.getVehicle().getModel() + " returned. Status set to Available.");
                return;
            }
        }
    }

    // Step 7: Display Rental Records
    public void displayRentalRecords() {
        System.out.println("===== RENTAL MANAGEMENT SYSTEM RECORDS =====");
        for (Rental r : rentals) {
            System.out.println("Agreement #" + r.getRentalId() + " | Customer: " + r.getCustomer().getName() +
                               " | Vehicle: " + r.getVehicle().getModel() + " (" + r.getVehicle().getVehicleType() + ")" +
                               " | Days: " + r.getRentalDays() + " | Total Rent: $" + r.getTotalCharges() +
                               " | Returned: " + (r.isReturned() ? "YES" : "NO"));
        }
    }
}`
  }
];

export const ASSIGNMENT_DOCUMENT_DATA = {
  title: "Vehicle Rental Management System",
  assignmentNumber: "ASSIGNMENT - 1",
  subject: "Object-Oriented Programming (OOP) in Java",
  sections: [
    {
      id: "project-title",
      num: "1",
      title: "Project Title",
      content: "Vehicle Rental Management System (VRMS)"
    },
    {
      id: "intro-problem",
      num: "2",
      title: "Introduction & Problem Statement",
      content: `The Vehicle Rental Management System is a software application designed to manage the process of renting vehicles such as cars, bikes, vans, and other vehicles. The system helps maintain vehicle details, customer information, rental duration, availability, and rental charges.\n\nIn a traditional rental system, vehicle details and customer records may be maintained manually in notebooks or spreadsheets. Checking vehicle availability, calculating rental charges, and maintaining previous rental records can take more time and may lead to errors.\n\nThis project uses Object-Oriented Programming (OOP) concepts in Java to make the rental process simple, organized, and efficient.\n\nProblem Statement:\nThe main problem is the difficulty of managing vehicles and rental information manually. The system should provide a simple method to:\n• Store vehicle details\n• Store customer details\n• Check vehicle availability\n• Rent a vehicle\n• Return a vehicle\n• Calculate rental charges\n• Maintain rental records.`
    },
    {
      id: "need-objectives",
      num: "3",
      title: "Need and Objectives",
      content: `Need of the Project:\nA Vehicle Rental System is needed to reduce manual work and make vehicle rental operations easier. The system helps:\n• Reduce paperwork\n• Avoid duplicate records\n• Quickly check vehicle availability\n• Calculate rental charges automatically\n• Maintain customer and vehicle information\n• Improve the overall rental process\n\nObjectives:\n1. To maintain vehicle information\n2. To maintain customer information\n3. To check available vehicles\n4. To allow customers to rent vehicles\n5. To record vehicle return details\n6. To calculate rental charges based on rental duration\n7. To demonstrate OOP concepts using Java\n8. To provide an easy-to-use rental management system.`
    },
    {
      id: "scope",
      num: "4",
      title: "Scope of the Project",
      content: `The scope of the Vehicle Rental Management System includes:\n\nVehicle Management:\nThe system can store:\n• Vehicle ID\n• Vehicle number (registration plate)\n• Vehicle type (Car, Bike, Van, SUV)\n• Brand\n• Model\n• Rental price per day\n• Availability status\n\nCustomer Management:\nThe system can store:\n• Customer ID\n• Customer name\n• Contact number\n• Address\n• Driving licence details\n\nRental Management:\nThe system can manage:\n• Vehicle selection\n• Rental date\n• Return date\n• Number of rental days\n• Rental charges\n• Vehicle return status\n\nFuture Scope:\nThe system can later be extended with:\n• Online vehicle booking\n• Online payment\n• Database connectivity\n• Login system\n• SMS/email notifications\n• GPS-based vehicle tracking\n• Mobile application.`
    },
    {
      id: "literature-review",
      num: "5",
      title: "Literature Review / Existing System",
      content: `Existing System:\nIn many small vehicle rental businesses, vehicle and customer information is maintained manually or using simple spreadsheets.\n\nThe existing system generally involves:\n1. Customer visits the rental office.\n2. Staff checks available vehicles.\n3. Customer selects a vehicle.\n4. Staff records customer details.\n5. Rental amount is calculated manually.\n6. Vehicle is given to the customer.\n7. Return information is recorded later.\n\nProblems in Existing System:\n• More paperwork\n• Time-consuming\n• Manual calculation errors\n• Difficult to search old records\n• Difficult to track vehicle availability\n• Duplicate records may occur\n• Updating information is difficult.`
    },
    {
      id: "project-gap",
      num: "6",
      title: "Project Gap",
      content: `The existing manual system does not provide an efficient and automated method for managing vehicle rentals.\n\nThe major gaps are:\n• No automatic rental calculation\n• Difficult vehicle availability tracking\n• Manual customer record management\n• No proper rental history\n• Higher possibility of human errors\n• Difficult management of different vehicle types\n\nThe proposed system addresses these gaps by providing a simple computerized system based on Object-Oriented Programming.`
    },
    {
      id: "proposed-solution",
      num: "7",
      title: "Proposed Solution & Methodology",
      content: `Proposed Solution:\nThe proposed Vehicle Rental Management System is developed using Java and OOP concepts. The system contains different classes for different entities.\n\nMain Classes:\nVehicle (Base Class)\n  ├── Car (Subclass)\n  ├── Bike (Subclass)\n  └── Van (Subclass)\nCustomer\nRental\nPayment\n\nOOP Concepts Used:\n1. Class and Object: Classes are created for vehicles, customers, and rentals.\n2. Encapsulation: Vehicle and customer data protected using private variables and accessed through methods.\n3. Inheritance: Different vehicle types inherit common properties from the Vehicle class.\n4. Polymorphism: Different vehicle types have specialized rental calculations.\n5. Abstraction: Common vehicle operations defined using abstract classes and interfaces.\n\nWorking Methodology:\n• Step 1 – Add Vehicle: The administrator enters vehicle details.\n• Step 2 – Add Customer: Customer information is entered into the system.\n• Step 3 – Check Availability: The system checks whether the selected vehicle is available.\n• Step 4 – Rent Vehicle: If the vehicle is available, the system records rental details.\n• Step 5 – Calculate Rent: The rental amount is calculated using: Total Rent = Rental Days × Rent Per Day.\n• Step 6 – Return Vehicle: When the customer returns the vehicle, system updates status to Available.\n• Step 7 – Display Rental Record: The system displays customer, vehicle, rental duration, and total rental amount.`
    },
    {
      id: "technologies-tools",
      num: "8",
      title: "Technologies / Tools Required",
      content: `Technologies & Tools:\n• Java: Programming language\n• JDK: Java development environment\n• VS Code / Eclipse: Code development\n• OOP: Program design paradigm\n• Git / GitHub: Version control\n• MySQL (optional): Database storage\n\nHardware Requirements:\n• Computer / Laptop\n• Minimum 4 GB RAM\n• Keyboard and mouse\n• Storage space for project files`
    },
    {
      id: "expected-outcome",
      num: "9",
      title: "Expected Outcome",
      content: `The expected outcome of this project is a simple and efficient Vehicle Rental Management System.\n\nThe system is able to:\n• Add and manage vehicles\n• Add and manage customers\n• Display available vehicles\n• Rent vehicles\n• Return vehicles\n• Calculate rental charges\n• Maintain rental records\n• Reduce manual work and errors\n\nThe project demonstrates the practical use of important Java OOP concepts.`
    },
    {
      id: "references-conclusion",
      num: "10",
      title: "References & Conclusion",
      content: `References:\n1. Oracle Java Documentation\n2. Java Tutorials – The expected and efficient Vehicle Rental Management System\n3. Herbert Schildt, Java: The Complete Reference\n4. E. Balagurusamy, Programming with Java\n5. Object-Oriented Programming concepts and Java study materials\n\nConclusion:\nThe Vehicle Rental Management System is a useful application for managing vehicle rental activities in an organized manner. It reduces manual work and makes it easier to manage vehicle and customer information.\nThe project demonstrates important OOP concepts such as classes, objects, encapsulation, inheritance, polymorphism, and abstraction. The system can also be extended in the future with database connectivity, online booking, online payment, and mobile application support.`
    }
  ]
};
