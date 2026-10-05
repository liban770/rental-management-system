import React, { useState } from 'react';
import { SubUnit } from '../types';

interface AddListingViewProps {
  onNavigate: (tab: string) => void;
}

export const AddListingView: React.FC<AddListingViewProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [typology, setTypology] = useState<string>('villa');
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [furnishing, setFurnishing] = useState<string>('Semi-Furnished');
  const [builtArea, setBuiltArea] = useState<number>(280);
  const [lotSize, setLotSize] = useState<number>(500);
  const [yearBuilt, setYearBuilt] = useState<string>('2024');
  const [structure, setStructure] = useState<string>('Reinforced Concrete & Blockwork');

  // Utilities state
  const [utilities, setUtilities] = useState<{ [key: string]: boolean }>({
    cityWater: true,
    borehole: false,
    tankReservoir: true,
    sompower: true,
    solarSystem: true,
    dieselGen: false,
    guardGatehouse: true,
    cctv: true,
    electricPerimeter: true,
    somcableFiber: true,
    telesom5g: true,
    somtel4g: false
  });

  const toggleUtility = (key: string) => {
    setUtilities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Multi-unit configuration
  const [isMultiUnit, setIsMultiUnit] = useState<boolean>(true);
  const [units, setUnits] = useState<SubUnit[]>([
    { id: 'u-1', name: 'Unit 1A', floor: 'Ground Floor', beds: 2, baths: 2, areaM2: 120, estimatedRentUsd: 450 },
    { id: 'u-2', name: 'Unit 1B', floor: 'Ground Floor', beds: 1, baths: 1, areaM2: 65, estimatedRentUsd: 280 },
    { id: 'u-3', name: 'Unit 2A', floor: 'Penthouse Suite', beds: 3, baths: 3, areaM2: 190, estimatedRentUsd: 750 }
  ]);
  const [addingUnit, setAddingUnit] = useState(false);
  const [newUnitName, setNewUnitName] = useState('');
  const [newUnitRent, setNewUnitRent] = useState(500);

  const handleAddUnit = () => {
    if (!newUnitName.trim()) return;
    const newUnit: SubUnit = {
      id: `u-${Date.now()}`,
      name: newUnitName,
      floor: 'Second Floor',
      beds: 2,
      baths: 2,
      areaM2: 110,
      estimatedRentUsd: Number(newUnitRent)
    };
    setUnits([...units, newUnit]);
    setNewUnitName('');
    setAddingUnit(false);
  };

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Context Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 mb-6">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-1.5 text-[#a23e18] mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Institutional Landlord Onboarding</span>
            </div>
            <h1 className="font-['Manrope'] text-2xl sm:text-3xl text-[#25063e] tracking-tight font-extrabold">
              Add New Rental Listing
            </h1>
            <p className="text-xs sm:text-sm text-[#4b454e] mt-1">
              List your property on Somaliland's premier verified property marketplace and landlord cloud.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => alert("Draft autosaved to your SomRent account.")}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#e8dfee] text-[#1e1a24] hover:bg-[#eee5f4] transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save Progress Draft</span>
            </button>
            <button
              onClick={() => onNavigate('owner-dashboard')}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-[#4b454e] hover:text-[#ba1a1a] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Exit Flow</span>
            </button>
          </div>
        </div>

        {/* Stepper Progress Card */}
        <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-[#e8dfee] mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#a23e18] font-bold">
                Registration Step {currentStep} of 6
              </span>
              <h3 className="font-['Manrope'] text-base font-bold text-[#25063e]">
                Property Details & Units
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#faf0ff] border border-[#e8dfee] rounded-full text-[#4b454e] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#a23e18] animate-pulse" />
              <span>Autosaved just now</span>
            </div>
          </div>

          {/* Stepper Track */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[
              { num: '01', title: 'Basic Info', sub: 'Identity', completed: true },
              { num: '02', title: 'Location', sub: 'Region', completed: true },
              { num: '03', title: 'Specifications', sub: 'Current Step', active: true },
              { num: '04', title: 'Photos & Video', sub: 'Media' },
              { num: '05', title: 'Pricing & Mobile', sub: 'Financials' },
              { num: '06', title: 'Verify & Live', sub: 'Title Deed' }
            ].map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2 rounded-xl border ${
                  step.active
                    ? 'bg-[#eee5f4] border-[#a23e18]'
                    : step.completed
                    ? 'bg-[#faf0ff] border-[#e8dfee]'
                    : 'bg-white border-[#e8dfee] opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    step.active
                      ? 'bg-[#a23e18] text-white shadow-xs'
                      : step.completed
                      ? 'bg-[#25063e] text-white'
                      : 'bg-[#eee5f4] text-[#4b454e]'
                  }`}
                >
                  {step.completed ? '✓' : idx + 1}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[#4b454e] truncate font-medium">{step.sub}</span>
                  <span className="text-xs text-[#1e1a24] font-bold truncate">{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active progress meter line */}
          <div className="w-full bg-[#eee5f4] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-[#25063e] via-[#a23e18] to-[#fe8357] h-full rounded-full w-1/2 transition-all duration-500" />
          </div>
        </div>

        {/* Main Multi-Step Form Wrapper */}
        <div className="w-full bg-white rounded-2xl shadow-xs border border-[#e8dfee] overflow-hidden flex flex-col">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#faf0ff] via-white to-[#eee5f4] px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-[#e8dfee]">
            <div>
              <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">
                Structural Specifications & Unit Configuration
              </h2>
              <p className="text-xs text-[#4b454e]">
                Accurate architectural metrics fast-track tenant vetting and Somali diaspora tenant discovery.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#25063e] bg-white border border-[#e8dfee] px-3 py-1 rounded-full shadow-xs text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#a23e18]">location_city</span>
              <span>Hargeisa, Jigjiga Yar Sector</span>
            </div>
          </div>

          {/* Form Content Body */}
          <div className="p-6 flex flex-col gap-8">
            {/* Section 1: Property Category Selection Cards */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#25063e] uppercase tracking-wider font-bold">
                1. Select Asset Typology
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'villa', title: 'Residential Villa', desc: 'Detached private compound with courtyard & perimeter walls.', icon: 'villa' },
                  { id: 'apartment', title: 'Apartment Complex', desc: 'Multi-story building divided into individual private flats.', icon: 'apartment' },
                  { id: 'office', title: 'Commercial Office', desc: 'Tailored for corporate offices, NGOs, banks, and legal firms.', icon: 'domain' },
                  { id: 'retail', title: 'Retail Plaza', desc: 'Street-facing shops, grocery outlets, and mixed retail lots.', icon: 'storefront' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setTypology(item.id)}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      typology === item.id
                        ? 'bg-[#faf0ff] border-[#a23e18] shadow-sm ring-1 ring-[#a23e18]'
                        : 'bg-[#faf0ff]/50 border-[#e8dfee] hover:bg-[#faf0ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        typology === item.id ? 'bg-[#25063e] text-white' : 'bg-[#eee5f4] text-[#25063e]'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </span>
                      {typology === item.id ? (
                        <span className="material-symbols-outlined text-[#a23e18] text-[22px]">check_circle</span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-[#cdc3cf]" />
                      )}
                    </div>
                    <h4 className="font-['Manrope'] font-bold text-sm text-[#25063e]">{item.title}</h4>
                    <p className="text-[11px] text-[#4b454e] mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Core Measurements and Layout Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bed/Bath Matrix */}
              <div className="flex flex-col gap-4 bg-[#faf0ff] p-5 rounded-2xl border border-[#e8dfee]">
                <h3 className="font-['Manrope'] font-bold text-sm text-[#25063e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#a23e18]">hotel</span>
                  <span>Accommodation Counts</span>
                </h3>

                {/* Total Bedrooms */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4b454e]">Total Bedrooms</label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setBedrooms(num)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          bedrooms === num
                            ? 'bg-[#25063e] text-white shadow-xs'
                            : 'bg-white border border-[#e8dfee] text-[#1e1a24] hover:bg-[#eee5f4]'
                        }`}
                      >
                        {num === 6 ? '6+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Bathrooms */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4b454e]">Total Bathrooms</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setBathrooms(num)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          bathrooms === num
                            ? 'bg-[#25063e] text-white shadow-xs'
                            : 'bg-white border border-[#e8dfee] text-[#1e1a24] hover:bg-[#eee5f4]'
                        }`}
                      >
                        {num === 5 ? '5+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnishing Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4b454e]">Furnishing Status</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFurnishing(status)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          furnishing === status
                            ? 'bg-[#25063e] text-white shadow-xs'
                            : 'bg-white border border-[#e8dfee] text-[#1e1a24] hover:bg-[#eee5f4]'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metric Area Inputs & Year Built */}
              <div className="flex flex-col gap-4 bg-[#faf0ff] p-5 rounded-2xl border border-[#e8dfee]">
                <h3 className="font-['Manrope'] font-bold text-sm text-[#25063e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#a23e18]">square_foot</span>
                  <span>Dimensions & Vintage</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Total Built Area */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#4b454e]">Total Built Area</label>
                    <div className="flex items-center rounded-lg bg-white border border-[#cdc3cf] overflow-hidden focus-within:ring-2 focus-within:ring-[#25063e]">
                      <input
                        type="number"
                        value={builtArea}
                        onChange={(e) => setBuiltArea(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent text-sm font-bold text-[#1e1a24] focus:outline-none"
                      />
                      <span className="px-3 py-2 bg-[#eee5f4] text-[#4b454e] text-xs font-bold">m²</span>
                    </div>
                    <span className="text-[11px] text-[#4b454e]">Net enclosed architectural space.</span>
                  </div>

                  {/* Lot Size */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#4b454e]">Lot Size / Courtyard</label>
                    <div className="flex items-center rounded-lg bg-white border border-[#cdc3cf] overflow-hidden focus-within:ring-2 focus-within:ring-[#25063e]">
                      <input
                        type="number"
                        value={lotSize}
                        onChange={(e) => setLotSize(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent text-sm font-bold text-[#1e1a24] focus:outline-none"
                      />
                      <span className="px-3 py-2 bg-[#eee5f4] text-[#4b454e] text-xs font-bold">m²</span>
                    </div>
                    <span className="text-[11px] text-[#4b454e]">Compound boundary footprint.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#4b454e]">Year Built</label>
                    <div className="flex items-center rounded-lg bg-white border border-[#cdc3cf] px-3 py-2">
                      <input
                        type="text"
                        value={yearBuilt}
                        onChange={(e) => setYearBuilt(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-[#1e1a24] focus:outline-none"
                      />
                      <span className="material-symbols-outlined text-[#4b454e] text-[18px]">calendar_today</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#4b454e]">Primary Structure</label>
                    <select
                      value={structure}
                      onChange={(e) => setStructure(e.target.value)}
                      className="rounded-lg bg-white border border-[#cdc3cf] px-3 py-2 text-xs font-semibold text-[#1e1a24] focus:outline-none cursor-pointer"
                    >
                      <option>Reinforced Concrete & Blockwork</option>
                      <option>Traditional Stone Masonry</option>
                      <option>Engineered Steel Frame</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Somaliland Utility Verification Matrix */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#e8dfee] pb-2">
                <div>
                  <span className="text-xs text-[#a23e18] font-bold uppercase tracking-wider">Critical Infrastructure</span>
                  <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Somaliland Utility Verification Matrix</h3>
                </div>
                <span className="text-xs bg-[#faf0ff] border border-[#e8dfee] text-[#25063e] px-3 py-1 rounded-full font-semibold">
                  Guarantees higher tenant inquiry rates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Water Supply */}
                <div className="flex flex-col gap-2 bg-[#faf0ff] p-4 rounded-xl border border-[#e8dfee]">
                  <div className="flex items-center gap-1.5 text-[#25063e] text-xs font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px] text-[#a23e18]">water_drop</span>
                    <span>Water Supply</span>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.cityWater}
                      onChange={() => toggleUtility('cityWater')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Municipal City Water</span>
                      <span className="text-[11px] text-[#4b454e]">Hargeisa Water Agency connection</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.borehole}
                      onChange={() => toggleUtility('borehole')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Private Borehole</span>
                      <span className="text-[11px] text-[#4b454e]">Dedicated on-site groundwater</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.tankReservoir}
                      onChange={() => toggleUtility('tankReservoir')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Tank Reservoir</span>
                      <span className="text-[11px] text-[#a23e18] font-semibold">15,000L Overhead + Sump</span>
                    </div>
                  </label>
                </div>

                {/* Electricity & Power */}
                <div className="flex flex-col gap-2 bg-[#faf0ff] p-4 rounded-xl border border-[#e8dfee]">
                  <div className="flex items-center gap-1.5 text-[#25063e] text-xs font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px] text-[#a23e18]">bolt</span>
                    <span>Electricity & Power</span>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.sompower}
                      onChange={() => toggleUtility('sompower')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Sompower Grid</span>
                      <span className="text-[11px] text-[#4b454e]">3-Phase 220V Metered Supply</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.solarSystem}
                      onChange={() => toggleUtility('solarSystem')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Hybrid Solar System</span>
                      <span className="text-[11px] text-[#4b454e]">5.5kVA Inverter with Lithium bank</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.dieselGen}
                      onChange={() => toggleUtility('dieselGen')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Auto Diesel Generator</span>
                      <span className="text-[11px] text-[#4b454e]">Perkins automatic changeover unit</span>
                    </div>
                  </label>
                </div>

                {/* Perimeter & Security */}
                <div className="flex flex-col gap-2 bg-[#faf0ff] p-4 rounded-xl border border-[#e8dfee]">
                  <div className="flex items-center gap-1.5 text-[#25063e] text-xs font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px] text-[#a23e18]">security</span>
                    <span>Perimeter & Security</span>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.guardGatehouse}
                      onChange={() => toggleUtility('guardGatehouse')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">24/7 Guard Gatehouse</span>
                      <span className="text-[11px] text-[#4b454e]">Dedicated security outpost</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.cctv}
                      onChange={() => toggleUtility('cctv')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">CCTV Perimeter Dome</span>
                      <span className="text-[11px] text-[#4b454e]">8-Channel cloud connected DVR</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.electricPerimeter}
                      onChange={() => toggleUtility('electricPerimeter')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Electric Perimeter Wire</span>
                      <span className="text-[11px] text-[#4b454e]">High-voltage top masonry wire</span>
                    </div>
                  </label>
                </div>

                {/* Telecom & Fiber */}
                <div className="flex flex-col gap-2 bg-[#faf0ff] p-4 rounded-xl border border-[#e8dfee]">
                  <div className="flex items-center gap-1.5 text-[#25063e] text-xs font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px] text-[#a23e18]">cell_tower</span>
                    <span>Telecom & Fiber</span>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.somcableFiber}
                      onChange={() => toggleUtility('somcableFiber')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Somcable Fiber Optic</span>
                      <span className="text-[11px] text-[#4b454e]">Direct gigabit optic terminal drop</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.telesom5g}
                      onChange={() => toggleUtility('telesom5g')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Telesom 5G Ready</span>
                      <span className="text-[11px] text-[#4b454e]">High-gain localized transceiver</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={utilities.somtel4g}
                      onChange={() => toggleUtility('somtel4g')}
                      className="mt-0.5 rounded text-[#a23e18] accent-[#25063e]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1e1a24]">Somtel 4G LTE Router</span>
                      <span className="text-[11px] text-[#4b454e]">Secondary failover connection</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 4: Multi-Unit Configuration Toggle & Sub-Unit Matrix */}
            <div className="flex flex-col gap-4 bg-[#faf0ff] p-5 rounded-2xl border border-[#e8dfee]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="font-['Manrope'] font-bold text-sm text-[#25063e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#a23e18]">domain_add</span>
                    <span>Multi-Unit Configuration</span>
                  </h3>
                  <p className="text-xs text-[#4b454e]">
                    Does this compound contain distinct rentable units with separate doors or utility meters?
                  </p>
                </div>

                {/* Yes / No Toggle */}
                <div className="inline-flex items-center bg-[#eee5f4] p-1 rounded-full self-start sm:self-auto border border-[#cdc3cf]/40">
                  <button
                    type="button"
                    onClick={() => setIsMultiUnit(false)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      !isMultiUnit ? 'bg-white text-[#25063e] shadow-xs' : 'text-[#4b454e]'
                    }`}
                  >
                    No (Single Lease)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMultiUnit(true)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isMultiUnit ? 'bg-[#25063e] text-white shadow-xs' : 'text-[#4b454e]'
                    }`}
                  >
                    Yes (Multiple Units)
                  </button>
                </div>
              </div>

              {/* Rendered Sub-Units Grid */}
              {isMultiUnit && (
                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4b454e]">
                      Configured Property Units ({units.length} Active)
                    </span>
                    <button
                      type="button"
                      onClick={() => setAddingUnit(!addingUnit)}
                      className="inline-flex items-center gap-1 text-[#a23e18] text-xs font-semibold hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add Another Unit</span>
                    </button>
                  </div>

                  {addingUnit && (
                    <div className="p-3 bg-white rounded-xl border border-[#a23e18] flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        placeholder="Unit Name (e.g. Unit 2B)"
                        value={newUnitName}
                        onChange={(e) => setNewUnitName(e.target.value)}
                        className="px-3 py-1.5 bg-[#faf0ff] rounded-lg text-xs border border-[#cdc3cf] focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Monthly Rent ($)"
                        value={newUnitRent}
                        onChange={(e) => setNewUnitRent(Number(e.target.value))}
                        className="w-32 px-3 py-1.5 bg-[#faf0ff] rounded-lg text-xs border border-[#cdc3cf] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddUnit}
                        className="px-3 py-1.5 rounded-lg bg-[#25063e] text-white text-xs font-semibold cursor-pointer"
                      >
                        Save Unit
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddingUnit(false)}
                        className="px-2 py-1 text-xs text-[#4b454e] hover:text-[#1e1a24]"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {units.map((unit) => (
                      <div
                        key={unit.id}
                        className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-['Manrope'] font-bold text-sm text-[#25063e]">{unit.name}</span>
                              <span className="px-2 py-0.5 rounded-full bg-[#eee5f4] text-[10px] font-semibold text-[#1e1a24]">
                                {unit.floor}
                              </span>
                            </div>
                            <p className="text-xs text-[#4b454e]">
                              {unit.beds} Bed · {unit.baths} Bath · {unit.areaM2} m²
                            </p>
                          </div>
                          <span className="material-symbols-outlined text-[18px] text-[#4b454e]">edit</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#e8dfee] text-xs">
                          <span className="text-[#4b454e]">Estimated Rent</span>
                          <span className="font-bold text-[#25063e]">${unit.estimatedRentUsd} / month</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Navigation Action Footer */}
          <div className="px-6 py-4 bg-[#faf0ff] border-t border-[#e8dfee] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#1e1a24] bg-white border border-[#e8dfee] hover:bg-[#eee5f4] transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Step 2: Location</span>
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => alert("Progress draft saved successfully to SomRent Cloud.")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white border border-[#e8dfee] text-[#1e1a24] hover:bg-[#eee5f4] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Progress Draft</span>
              </button>
              <button
                onClick={() => {
                  alert("Proceeding to Step 4: High-Resolution Media & 3D Tour Upload.");
                  setCurrentStep(4);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#25063e] text-white hover:bg-[#3b1e54] transition-all shadow-md cursor-pointer"
              >
                <span>Continue to Step 4: Upload Photos</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
