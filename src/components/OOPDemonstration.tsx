import React, { useState } from 'react';
import { JAVA_OOP_CLASSES, JavaClassSnippet } from '../data/javaCodeSnippets';
import { 
  Code2, 
  Layers, 
  ShieldCheck, 
  GitFork, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const OOPDemonstration: React.FC = () => {
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [testOutput, setTestOutput] = useState<string[] | null>(null);
  const [runningTest, setRunningTest] = useState<string | null>(null);

  const currentClass: JavaClassSnippet = JAVA_OOP_CLASSES[selectedClassIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentClass.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = (scenario: 'rentCar' | 'polymorphism' | 'availability' | 'return') => {
    setRunningTest(scenario);
    setTestOutput(null);

    setTimeout(() => {
      if (scenario === 'rentCar') {
        setTestOutput([
          '[JVM] Initializing RentalSystem context...',
          '[VRMS] Step 1: Registered Honda City ZX (KA-01-MJ-4050) -> Fleet size: 8',
          '[VRMS] Step 2: Registered Customer Rahul Sharma (Licence: DL-0420110023491)',
          '[VRMS] Step 3: Checking availability for KA-01-MJ-4050 -> Status: AVAILABLE (true)',
          '[VRMS] Step 4 & 5: Instantiating Rental agreement RNT-2024-001',
          '[VRMS] Calculating rent: 5 days @ $45.00/day = $225.00',
          '[VRMS] State Transition: Vehicle KA-01-MJ-4050 setAvailable(false)',
          '[VRMS] SUCCESS: Rental agreement initialized and stored.',
          'Result: 0 errors, 1 agreement active.'
        ]);
      } else if (scenario === 'polymorphism') {
        setTestOutput([
          '[JVM] Demonstrating Polymorphism via Vehicle.calculateRentalCost(days):',
          '----------------------------------------------------------------------',
          'Vehicle v1 = new Car("V1", "KA-01", "Honda", "City", 45.0, 5, "Auto", true);',
          'Vehicle v2 = new Bike("V2", "KA-04", "RE", "Classic 350", 25.0, 350, true);',
          'Vehicle v3 = new Van("V3", "KA-01", "Toyota", "HiAce", 85.0, 1500, 12);',
          '----------------------------------------------------------------------',
          '[Polymorphic Call for 7 Days Rental]:',
          '• v1.calculateRentalCost(7) => Car 5% Weekly Discount Applied = $299.25',
          '• v2.calculateRentalCost(7) => Bike Base Calculation (7 * $25) = $175.00',
          '• v3.calculateRentalCost(7) => Van (7 * $85) + $15.00 Commercial Surcharge = $610.00',
          'Polymorphic dispatch successfully resolved dynamically at runtime!'
        ]);
      } else if (scenario === 'availability') {
        setTestOutput([
          '[JVM] Querying Fleet availability through Encapsulated getters:',
          'Scanning fleet ArrayList<Vehicle>...',
          '[Available] KA-01-MJ-4050 (Honda City ZX) - Daily: $45.0',
          '[Available] KA-05-PQ-2244 (Hyundai Creta) - Daily: $50.0',
          '[Available] KA-04-BK-9120 (Royal Enfield Classic 350) - Daily: $25.0',
          '[Available] KA-01-VN-7700 (Toyota HiAce) - Daily: $85.0',
          '[Available] KA-51-SU-1199 (Mahindra XUV700) - Daily: $65.0',
          '[Occupied / Rented] KA-03-ER-8812 (Toyota Corolla Altis)',
          '[Occupied / Rented] KA-02-GT-3310 (Yamaha MT-15 V2)',
          'Total Available: 5 / 8 vehicles ready for immediate rental.'
        ]);
      } else if (scenario === 'return') {
        setTestOutput([
          '[JVM] Step 6: Processing vehicle return for Rental agreement RNT-2024-001:',
          '[VRMS] Customer returns: Toyota Corolla Altis (KA-03-ER-8812)',
          '[VRMS] Calling rental.returnVehicle()...',
          '[VRMS] Updating encapsulated state: vehicle.setAvailable(true);',
          '[VRMS] Return inspection status: GOOD / PASSED',
          '[VRMS] Security Deposit of $100.00 released back to customer.',
          '[VRMS] Step 7: Generating completed transaction invoice record.',
          'SUCCESS: Vehicle restored to available fleet pool.'
        ]);
      }
      setRunningTest(null);
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <span>Assignment Section 7</span>
          <span>·</span>
          <span>Object-Oriented Programming Demonstration</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Java OOP Architecture & Interactive Sandbox
        </h1>
        <p className="text-xs text-slate-500 max-w-3xl mt-1">
          Explore the exact Java classes, inheritance trees, encapsulation barriers, 
          and polymorphism mechanisms implemented to fulfill Assignment 1 requirements.
        </p>
      </div>

      {/* Visual OOP Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          {
            title: '1. Class & Object',
            tag: 'Entities',
            desc: 'Vehicle, Customer, Rental, and Payment templates instantiated as distinct operational objects.',
            icon: Layers,
            color: 'text-blue-600'
          },
          {
            title: '2. Encapsulation',
            tag: 'Data Hiding',
            desc: 'Private fields protected from uncontrolled direct access; mutated safely via getter/setter methods.',
            icon: ShieldCheck,
            color: 'text-emerald-600'
          },
          {
            title: '3. Inheritance',
            tag: 'Hierarchy',
            desc: 'Car, Bike, and Van extend abstract Vehicle base class, reusing vehicleId, brand, and rentPerDay.',
            icon: GitFork,
            color: 'text-amber-600'
          },
          {
            title: '4. Polymorphism',
            tag: 'Method Overriding',
            desc: 'calculateRentalCost() overridden across Car (weekly discounts), Bike, and Van (heavy surcharge).',
            icon: Cpu,
            color: 'text-indigo-600'
          },
          {
            title: '5. Abstraction',
            tag: 'Interface Contract',
            desc: 'Vehicle abstract class provides contract without exposing internal fleet management complexities.',
            icon: Code2,
            color: 'text-rose-600'
          }
        ].map((pillar) => (
          <div
            key={pillar.title}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <pillar.icon className={`w-5 h-5 ${pillar.color}`} />
                <span className="text-[10px] font-mono font-medium text-slate-400">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Class Hierarchy Diagram */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Class Inheritance Diagram (Java UML Model)
        </h2>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center">
          {/* Base class box */}
          <div className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-center shadow-xs">
            <span className="text-[10px] font-mono text-indigo-300 block">«abstract»</span>
            <span className="text-xs font-bold font-mono">Vehicle</span>
            <span className="text-[10px] text-slate-400 block">vehicleId, brand, model, rentPerDay, isAvailable</span>
          </div>

          {/* Connector tree lines */}
          <div className="w-0.5 h-6 bg-slate-300" />
          <div className="w-64 sm:w-80 h-0.5 bg-slate-300" />

          {/* Subclasses row */}
          <div className="flex justify-between w-64 sm:w-80 pt-0">
            <div className="w-0.5 h-4 bg-slate-300 -translate-x-0.5" />
            <div className="w-0.5 h-4 bg-slate-300" />
            <div className="w-0.5 h-4 bg-slate-300 translate-x-0.5" />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-1 w-full max-w-lg">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center shadow-xs">
              <span className="text-xs font-bold font-mono text-slate-900 block">Car</span>
              <span className="text-[10px] text-slate-500 block">extends Vehicle</span>
              <span className="text-[10px] text-indigo-600 block mt-1">+ seatingCapacity</span>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center shadow-xs">
              <span className="text-xs font-bold font-mono text-slate-900 block">Bike</span>
              <span className="text-[10px] text-slate-500 block">extends Vehicle</span>
              <span className="text-[10px] text-amber-600 block mt-1">+ engineCapacityCC</span>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center shadow-xs">
              <span className="text-xs font-bold font-mono text-slate-900 block">Van</span>
              <span className="text-[10px] text-slate-500 block">extends Vehicle</span>
              <span className="text-[10px] text-emerald-600 block mt-1">+ cargoCapacityKg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Inspector & Test Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Java Source Code Viewer (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* File tabs bar */}
          <div className="flex items-center overflow-x-auto bg-slate-900/90 px-3 pt-2 gap-1 border-b border-slate-800 no-scrollbar">
            {JAVA_OOP_CLASSES.map((cls, idx) => (
              <button
                key={cls.filename}
                onClick={() => setSelectedClassIndex(idx)}
                className={`px-3 py-2 text-xs font-mono whitespace-nowrap rounded-t-lg transition-colors flex items-center gap-1.5 ${
                  selectedClassIndex === idx
                    ? 'bg-slate-950 text-indigo-400 font-semibold border-t-2 border-indigo-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{cls.filename}</span>
              </button>
            ))}
          </div>

          {/* Subheader with concept metadata and copy button */}
          <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-semibold">{currentClass.name}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{currentClass.oopConcept}</span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Java'}</span>
            </button>
          </div>

          {/* Code block */}
          <div className="p-5 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[500px]">
            <pre>
              <code>{currentClass.code}</code>
            </pre>
          </div>
        </div>

        {/* Live Java JVM Execution Simulator (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Simulated Java Test Runner</span>
            </div>
            <p className="text-xs text-slate-500">
              Execute simulated test routines validating the OOP operations described in the assignment.
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => runSimulation('rentCar')}
                disabled={!!runningTest}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-700">
                    Test 1: Rent Vehicle Workflow
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Validates Step 1 to 5 pipeline
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                onClick={() => runSimulation('polymorphism')}
                disabled={!!runningTest}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-700">
                    Test 2: Polymorphic Rent Calculation
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Compares Car, Bike & Van algorithms
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                onClick={() => runSimulation('availability')}
                disabled={!!runningTest}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-700">
                    Test 3: Check Fleet Availability
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Encapsulated status filtering
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                onClick={() => runSimulation('return')}
                disabled={!!runningTest}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-700">
                    Test 4: Vehicle Return & State Reset
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Validates Step 6 & 7 state transition
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>

          {/* Console standard output pane */}
          <div className="p-3.5 bg-slate-950 text-emerald-400 rounded-xl font-mono text-[11px] min-h-[160px] flex flex-col justify-start overflow-y-auto max-h-[220px]">
            <div className="text-slate-500 text-[10px] pb-1 border-b border-slate-800 mb-2 flex justify-between">
              <span>OUTPUT STREAM (System.out)</span>
              <span>Java 17 OpenJDK</span>
            </div>

            {runningTest ? (
              <span className="text-amber-400 animate-pulse">Running javac & executing test case...</span>
            ) : testOutput ? (
              <div className="space-y-1">
                {testOutput.map((line, i) => (
                  <div key={i} className="leading-tight">{line}</div>
                ))}
              </div>
            ) : (
              <span className="text-slate-600 italic">
                Click any test button above to run JVM execution simulation.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
