import React, { useState } from 'react';
import { ASSIGNMENT_DOCUMENT_DATA } from '../data/javaCodeSnippets';
import { Printer, Download, BookOpen, CheckCircle, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { useRental } from '../context/RentalContext';

export const AssignmentDocument: React.FC = () => {
  const { setCurrentView } = useRental();
  const [activeSectionId, setActiveSectionId] = useState<string>('intro-problem');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <span>Official Assignment Report</span>
            <span>·</span>
            <span>Assignment - 1</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Vehicle Rental System Academic Specification
          </h1>
          <p className="text-xs text-slate-500">
            Full digital document covering Problem Statement, Scope, Literature Review, Gaps, OOP Methodology, Tools, and References.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Launch Live App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table of contents sidebar */}
        <div className="lg:col-span-1 space-y-2 bg-white p-4 rounded-xl border border-slate-200 shadow-xs h-fit sticky top-20 hidden lg:block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
            Document Index
          </span>
          {ASSIGNMENT_DOCUMENT_DATA.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSectionId(sec.id);
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium flex items-center justify-between ${
                activeSectionId === sec.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="truncate">{sec.num}. {sec.title}</span>
            </button>
          ))}
        </div>

        {/* Document Body */}
        <div className="lg:col-span-3 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          {/* Header of paper */}
          <div className="text-center pb-8 border-b border-slate-200">
            <span className="text-xs font-bold font-mono tracking-widest text-slate-500 uppercase block mb-1">
              ASSIGNMENT - 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              VEHICLE RENTAL SYSTEM
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Coursework: Object-Oriented Programming (OOP) in Java
            </p>
          </div>

          {/* Section 1: Project Title */}
          <section id="project-title" className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">1.</span> Project Title
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800">
              Vehicle Rental Management System (VRMS)
            </div>
          </section>

          {/* Section 2: Introduction & Problem Statement */}
          <section id="intro-problem" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">2.</span> Introduction & Problem Statement
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The <strong>Vehicle Rental Management System</strong> is a software application designed to manage the process of renting vehicles such as cars, bikes, vans, and other vehicles. The system helps maintain vehicle details, customer information, rental duration, availability, and rental charges.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In a traditional rental system, vehicle details and customer records may be maintained manually in notebooks or spreadsheets. Checking vehicle availability, calculating rental charges, and maintaining previous rental records can take more time and may lead to errors.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This project uses <strong>Object-Oriented Programming (OOP) concepts in Java</strong> to make the rental process simple, organized, and efficient.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Problem Statement:
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                The main problem is the difficulty of managing vehicles and rental information manually. The system should provide a simple method to:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>Store vehicle details</li>
                <li>Store customer details</li>
                <li>Check vehicle availability</li>
                <li>Rent a vehicle</li>
                <li>Return a vehicle</li>
                <li>Calculate rental charges</li>
                <li>Maintain rental records</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Need and Objectives */}
          <section id="need-objectives" className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">3.</span> Need and Objectives
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Need of the Project
                </h4>
                <p className="text-xs text-slate-600 mb-2">
                  A Vehicle Rental System is needed to reduce manual work and make vehicle rental operations easier:
                </p>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li>Reduce paperwork</li>
                  <li>Avoid duplicate records</li>
                  <li>Quickly check vehicle availability</li>
                  <li>Calculate rental charges automatically</li>
                  <li>Maintain customer and vehicle information</li>
                  <li>Improve the overall rental process</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Main Objectives
                </h4>
                <ol className="text-xs text-slate-700 space-y-1 list-decimal list-inside">
                  <li>To maintain vehicle information</li>
                  <li>To maintain customer information</li>
                  <li>To check available vehicles</li>
                  <li>To allow customers to rent vehicles</li>
                  <li>To record vehicle return details</li>
                  <li>To calculate rental charges based on rental duration</li>
                  <li>To demonstrate OOP concepts using Java</li>
                  <li>To provide an easy-to-use rental management system</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 4: Scope of the Project */}
          <section id="scope" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">4.</span> Scope of the Project
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900">Vehicle Management</h4>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>Vehicle ID</li>
                  <li>Vehicle number</li>
                  <li>Vehicle type</li>
                  <li>Brand & Model</li>
                  <li>Rental price per day</li>
                  <li>Availability status</li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900">Customer Management</h4>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>Customer ID</li>
                  <li>Customer name</li>
                  <li>Contact number</li>
                  <li>Address</li>
                  <li>Driving licence details</li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900">Rental Management</h4>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>Vehicle selection</li>
                  <li>Rental date</li>
                  <li>Return date</li>
                  <li>Number of rental days</li>
                  <li>Rental charges</li>
                  <li>Vehicle return status</li>
                </ul>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs">
              <strong className="text-indigo-900 block mb-1">Future Scope:</strong>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-indigo-800">
                <span>• Online vehicle booking</span>
                <span>• Online payment</span>
                <span>• Database connectivity</span>
                <span>• Login system</span>
                <span>• SMS/email notifications</span>
                <span>• GPS-based vehicle tracking</span>
                <span>• Mobile application</span>
              </div>
            </div>
          </section>

          {/* Section 5: Literature Review / Existing System vs Proposed System */}
          <section id="literature-review" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">5.</span> Literature Review / Existing System
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              In many small vehicle rental businesses, vehicle and customer information is maintained manually or using simple spreadsheets.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Existing System (Manual/Spreadsheet)</th>
                    <th className="p-3">Proposed System (OOP Java / VRMS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 text-rose-700">1. Customer visits office; paper registers checked</td>
                    <td className="p-3 text-emerald-700">1. Instant digital inventory lookup with zero wait</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-700">2. Staff manually flips notebook pages to check availability</td>
                    <td className="p-3 text-emerald-700">2. Real-time availability filter (Available / Rented)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-700">3. Customer details written down by hand (risk of loss)</td>
                    <td className="p-3 text-emerald-700">3. Encapsulated Customer entities with licence verification</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-700">4. Rental amount calculated manually with calculator</td>
                    <td className="p-3 text-emerald-700">4. Automated: Total Rent = Rental Days × Rent Per Day</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-700">5. Return details recorded in ledger later; duplicate errors</td>
                    <td className="p-3 text-emerald-700">5. Atomic state update: updates status to Available automatically</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Project Gap */}
          <section id="project-gap" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">6.</span> Project Gap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { gap: 'No automatic rental calculation', fix: 'Automated math engine computing duration and multi-day discounts' },
                { gap: 'Difficult vehicle availability tracking', fix: 'Instant query method returning currently available fleet' },
                { gap: 'Manual customer record management', fix: 'Centralized customer database preserving license and contact records' },
                { gap: 'No proper rental history', fix: 'Full historical transaction ledger with searchable invoices' },
                { gap: 'Higher possibility of human errors', fix: 'Strict input validations and invariant constraints' },
                { gap: 'Difficult management of different vehicle types', fix: 'Polymorphic inheritance cleanly modeling Cars, Bikes, and Vans' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-rose-700 block">Gap: {item.gap}</span>
                  <span className="text-slate-600 mt-1 block">Solution: {item.fix}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Proposed Solution & Methodology */}
          <section id="proposed-solution" className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">7.</span> Proposed Solution & Methodology
            </h3>
            <p className="text-xs text-slate-700">
              The proposed Vehicle Rental Management System is developed using Java and OOP concepts. 
              The system contains different classes for different entities.
            </p>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono text-xs">
              <div className="text-indigo-400 font-bold uppercase tracking-wider">
                OOP Working Methodology (7 Concrete Steps):
              </div>
              <div className="space-y-1 text-slate-300">
                <p><strong>Step 1 – Add Vehicle:</strong> The administrator enters vehicle details.</p>
                <p><strong>Step 2 – Add Customer:</strong> Customer information is entered into the system.</p>
                <p><strong>Step 3 – Check Availability:</strong> The system checks whether the selected vehicle is available.</p>
                <p><strong>Step 4 – Rent Vehicle:</strong> If the vehicle is available, the system records the rental details.</p>
                <p><strong>Step 5 – Calculate Rent:</strong> The rental amount is calculated using: Total Rent = Rental Days × Rent Per Day.</p>
                <p><strong>Step 6 – Return Vehicle:</strong> When customer returns the vehicle, system updates status to Available.</p>
                <p><strong>Step 7 – Display Rental Record:</strong> The system displays customer, vehicle, rental duration, and total rental amount.</p>
              </div>
            </div>
          </section>

          {/* Section 8: Technologies / Tools Required */}
          <section id="technologies-tools" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">8.</span> Technologies / Tools Required
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">Java</span>
                <span className="text-slate-500">Programming language</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">JDK</span>
                <span className="text-slate-500">Java development env</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">VS Code / Eclipse</span>
                <span className="text-slate-500">Code development IDE</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">OOP</span>
                <span className="text-slate-500">Program design paradigm</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">Git / GitHub</span>
                <span className="text-slate-500">Version control</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">MySQL (Optional)</span>
                <span className="text-slate-500">Database storage</span>
              </div>
            </div>
          </section>

          {/* Section 9: Expected Outcome */}
          <section id="expected-outcome" className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">9.</span> Expected Outcome
            </h3>
            <p className="text-xs text-slate-700">
              The expected outcome of this project is a simple and efficient Vehicle Rental Management System that can:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li>Add and manage vehicles</li>
              <li>Add and manage customers</li>
              <li>Display available vehicles</li>
              <li>Rent vehicles</li>
              <li>Return vehicles</li>
              <li>Calculate rental charges</li>
              <li>Maintain rental records</li>
              <li>Reduce manual work and errors</li>
            </ul>
          </section>

          {/* Section 10: References & Conclusion */}
          <section id="references-conclusion" className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-indigo-600">10.</span> References & Conclusion
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <p>1. Oracle Java Documentation</p>
              <p>2. Herbert Schildt, Java: The Complete Reference</p>
              <p>3. E. Balagurusamy, Programming with Java</p>
              <p>4. Object-Oriented Programming concepts and Java study materials</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-3 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Conclusion:</strong>
              The Vehicle Rental Management System is a useful application for managing vehicle rental activities in an organized manner. It reduces manual work and makes it easier to manage vehicle and customer information.
              The project demonstrates important OOP concepts such as classes, objects, encapsulation, inheritance, polymorphism, and abstraction.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
