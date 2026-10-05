import React, { useState } from 'react';
import { Currency } from '../types';
import { formatCurrency, FX_RATE_USD_TO_SLSH } from '../data/mockData';
import { DeedQrScannerOverlay } from '../components/DeedQrScannerOverlay';

interface TenantPortalViewProps {
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const TenantPortalView: React.FC<TenantPortalViewProps> = ({ onNavigate, currency }) => {
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [ussdSimulating, setUssdSimulating] = useState(false);
  const [ussdSuccess, setUssdSuccess] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<'zaad' | 'edahab'>('zaad');
  const [mobileNumber, setMobileNumber] = useState('448 9201');
  const [sompowerKwh, setSompowerKwh] = useState(142.4);
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(25);
  const [reportMaintenanceOpen, setReportMaintenanceOpen] = useState(false);
  const [maintenanceIssue, setMaintenanceIssue] = useState('');

  const triggerUssdSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setUssdSimulating(true);
    setTimeout(() => {
      setUssdSimulating(false);
      setUssdSuccess(true);
      setTimeout(() => setUssdSuccess(false), 6000);
    }, 1400);
  };

  const handleRechargeSompower = () => {
    setSompowerKwh(prev => +(prev + rechargeAmount * 4.5).toFixed(1));
    setRechargeModalOpen(false);
    alert(`Successfully purchased ${rechargeAmount}$ worth of Sompower tokens via Zaad! Added token to meter #SP-99201.`);
  };

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient Depth Accent */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#fe8357]/10 blur-3xl pointer-events-none" />

          {/* 1. Tenant Profile Banner */}
          <div className="relative mt-4 mb-6 p-6 md:p-8 rounded-2xl bg-white shadow-xs border border-[#e8dfee] overflow-hidden">
            <div className="relative flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1VGf5C2eGCRIJnwqVphLWQFBoqMKzmRHLTIVEVNLLaiKlwWe1BNzafTxWhqltZ4Ppkou01QphqVRp2PNDdfSeKjHU7Avq3HSy1esYx--T_jma_22e6krOf7IV0pV6akpZ4azI17aXBLyLWDgsAnQeZP6T_7iGfxXbfxajq8T0uy8ZwXcbQX05cSmv93TEYvuwHT2rhOJwjH5vOI0WM0hWTyLniu_EM-jUf420HaVd4kTZ1YQUa67TO0ZNk"
                    alt="Guled A."
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm ring-4 ring-[#eee5f4]"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-200">
                    <span className="material-symbols-outlined text-xs">verified</span> Verified
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-['Manrope'] font-bold text-2xl text-[#25063e] tracking-tight">Guled A.</h1>
                    <span className="bg-[#faf0ff] border border-[#e8dfee] text-[#25063e] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Lease ID: SL-TEN-88421
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                      Active Resident
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4b454e] mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#a23e18] text-base">apartment</span>
                    Apartment 4B, The Palms Residence, Jigjiga Yar, Hargeisa
                  </p>
                </div>
              </div>

              {/* Primary Action Cluster */}
              <div className="flex items-center flex-wrap gap-2.5 w-full xl:w-auto">
                <button
                  onClick={() => setQrScannerOpen(true)}
                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#49007a] text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#380060] transition-all shadow-xs cursor-pointer ring-2 ring-[#49007a]/30"
                  title="Scan physical notarized title deed QR certificate with camera"
                >
                  <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                  <span>Scan Deed QR</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('express-payment-box');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#a23e18] text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#822801] transition-all shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">payments</span>
                  <span>Quick Pay ($1,400)</span>
                </button>
                <button
                  onClick={() => setReportMaintenanceOpen(true)}
                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#25063e] text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#3b1e54] transition-all shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">construction</span>
                  <span>Report Maintenance</span>
                </button>
                <button
                  onClick={() => onNavigate('agreements')}
                  className="flex items-center justify-center p-2.5 rounded-lg bg-[#eee5f4] hover:bg-[#e8dfee] text-[#25063e] transition-colors cursor-pointer"
                  title="View Lease Agreement"
                >
                  <span className="material-symbols-outlined text-xl">description</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Metric Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Metric 1 */}
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Next Payment Due</span>
                <span className="p-2 rounded-lg bg-[#ffdbcf] text-[#822801]">
                  <span className="material-symbols-outlined text-lg">event_available</span>
                </span>
              </div>
              <div className="mt-2">
                <p className="font-['Manrope'] font-extrabold text-2xl text-[#25063e]">
                  {formatCurrency(1400, currency)}
                </p>
                <div className="flex items-center justify-between mt-1 pt-1">
                  <span className="text-xs text-[#4b454e]">Due: Nov 1, 2026</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">autorenew</span> Auto-pay ON
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Lease Elapsed</span>
                <span className="p-2 rounded-lg bg-[#eee5f4] text-[#25063e]">
                  <span className="material-symbols-outlined text-lg">date_range</span>
                </span>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <p className="font-['Manrope'] font-extrabold text-2xl text-[#25063e]">Month 4</p>
                  <span className="text-xs text-[#4b454e]">of 12 (33%)</span>
                </div>
                <div className="w-full bg-[#eee5f4] rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-[#25063e] h-1.5 rounded-full w-1/3" />
                </div>
                <span className="text-[11px] text-[#4b454e] block mt-1.5">Matures June 30, 2027</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Escrow Deposit</span>
                <span className="p-2 rounded-lg bg-[#eee5f4] text-[#25063e]">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </span>
              </div>
              <div className="mt-2">
                <p className="font-['Manrope'] font-extrabold text-2xl text-[#25063e]">
                  {formatCurrency(1400, currency)}
                </p>
                <button
                  type="button"
                  onClick={() => setQrScannerOpen(true)}
                  className="flex items-center gap-1 mt-1 text-xs text-emerald-700 font-semibold hover:text-emerald-900 transition-colors text-left cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span className="underline decoration-emerald-400 group-hover:decoration-emerald-700">
                    Custodial Trust • Verify Deed
                  </span>
                </button>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Maintenance</span>
                <span className="p-2 rounded-lg bg-[#ffdbcf] text-[#a23e18]">
                  <span className="material-symbols-outlined text-lg">handyman</span>
                </span>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <p className="font-['Manrope'] font-extrabold text-2xl text-[#a23e18]">1 Active</p>
                  <span className="text-xs text-[#4b454e]">repair ticket</span>
                </div>
                <p className="text-[11px] text-[#4b454e] mt-1 truncate">AC Inspection • Today, 3:30 PM</p>
              </div>
            </div>
          </div>

          {/* 3. Two-Column Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Leased Residence Showcase Card */}
              <div className="rounded-2xl bg-white shadow-xs border border-[#e8dfee] overflow-hidden">
                <div className="relative h-60 md:h-72 w-full overflow-hidden bg-[#faf0ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2BqpU2eiM7HdeZ9NjKUBw8arJf3n9EIZA_KjSTqnaLoAgSo9B_j75StMi2V1puNwjqxc_VC-lqxnFNlkg6hZKfk-XAxGBFScngxrW35omx0g-QReb3v5d26YIAPZbmD84rvVMckDXa2fbTMcv0WVCni8RpuLJBMM3GcGocKFxdZSgq7r9tyrlf-VWcEPgQlLOXFd1BxI4yPeaDoG3V_0yWkz9ohqrH2lcx5p2g38q28ZjmS4OKO_w"
                    alt="The Palms Residence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#25063e]/80 via-[#25063e]/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#25063e] shadow-xs">
                      Executive Compound
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#a23e18] text-white text-xs font-bold shadow-xs">
                      Unit 4B
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] uppercase tracking-wider text-[#ffdbcf]">
                      Contemporary 3-Bedroom Villa Apartment
                    </p>
                    <h2 className="font-['Manrope'] font-bold text-xl text-white">The Palms Residence</h2>
                    <p className="text-xs text-[#e0d7e5] opacity-90">
                      Plot 18, Diplomats Enclave, Jigjiga Yar, Hargeisa
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {/* Amenities Badges */}
                  <div>
                    <span className="text-xs text-[#4b454e] uppercase tracking-wider block mb-2 font-semibold">
                      Guaranteed Compound Utilities & Infrastructure
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                        <div className="p-2 rounded-lg bg-white text-[#a23e18] shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">solar_power</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#25063e]">10kVA Hybrid Solar</p>
                          <p className="text-[11px] text-[#4b454e]">Zero blackout cutoff</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                        <div className="p-2 rounded-lg bg-white text-[#a23e18] shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">water_damage</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#25063e]">20,000L Reserve</p>
                          <p className="text-[11px] text-[#4b454e]">Pressurized gravity tank</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                        <div className="p-2 rounded-lg bg-white text-[#a23e18] shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">wifi</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#25063e]">Gigabit Fiber</p>
                          <p className="text-[11px] text-[#4b454e]">Telesom dedicated link</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title Deed Authenticity Card with Camera QR Scan Trigger */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#171221] to-[#25063e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#3b2b4d] shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#49007a] border border-[#7c3aed]/40 flex items-center justify-center text-[#d8b4fe] shrink-0 shadow-md">
                        <span className="material-symbols-outlined text-2xl">verified_user</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-['Manrope'] font-bold text-xs sm:text-sm text-white">
                            Notarized Title Deed Authenticated
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#006e2c]/60 text-[#4ade80] border border-[#006e2c]">
                            #CAD-HGA-99120
                          </span>
                        </div>
                        <p className="text-[11px] text-[#cdc3cf] mt-0.5">
                          Cadastral Vol. 882 • Folio 41B • Biometric Title Cleared via Somaliland Lands Ministry
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQrScannerOpen(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                      <span>Scan Physical Deed QR</span>
                    </button>
                  </div>

                  {/* Landlord Contact Subcard */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-[#eee5f4] gap-3 border border-[#e8dfee]">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6g7MlIjpvcg93Mn1gyV2hofFjWBEZvv775cKdhRCrRaIDafDJjQztpqZkhS6Ht1ziDmJ6bVpt8nSAKS_ybhCVtUxjcUAj59S8HTif4CCUBmlbsETjrdUGesf-tNol0rPi11V4anlaEV7Kj94pR06C6d6NMLXG0nfZTZ-xFEOlG_mj2IX2elxyd6CsD7ojtb0oHmj4nnWfzgAQkr4ydzs9MclOgfSk5y4SdzxAncitWpOgvqOw2MSY"
                        alt="Ahmed M."
                        className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#25063e]">Ahmed M. (Landlord & Owner)</p>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.2 rounded">Primary</span>
                        </div>
                        <p className="text-[11px] text-[#4b454e]">Member since 2021 • 100% response rate within 1 hr</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="https://wa.me/252634000000"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#25063e] text-xs font-semibold hover:bg-[#faf0ff] transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Chat
                      </a>
                      <a
                        href="tel:+252634428110"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#25063e] text-xs font-semibold hover:bg-[#faf0ff] transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        Call Desk
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Ticket Tracker */}
              <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e8dfee]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8dfee] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Active Maintenance Service</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#fe8357]/20 text-[#a23e18] text-xs font-semibold">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-[#4b454e]">Ticket #MN-402 • Scheduled for today</p>
                  </div>
                  <button
                    onClick={() => alert("Showing history of 8 previous maintenance records for Unit 4B.")}
                    className="flex items-center gap-1 text-[#a23e18] text-xs font-semibold hover:underline cursor-pointer"
                  >
                    <span>View All History (8)</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* 4-step Timeline */}
                <div className="p-4 rounded-xl bg-[#faf0ff] my-4 border border-[#e8dfee]">
                  <div className="grid grid-cols-4 relative">
                    <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-[#e8dfee] -z-0">
                      <div className="h-full bg-[#a23e18] w-2/3" />
                    </div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-base">check</span>
                      </div>
                      <span className="text-xs font-semibold text-[#1e1a24] mt-2">Submitted</span>
                      <span className="text-[10px] text-[#4b454e]">Oct 24, 09:12 AM</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-base">check</span>
                      </div>
                      <span className="text-xs font-semibold text-[#1e1a24] mt-2">Assigned</span>
                      <span className="text-[10px] text-[#4b454e]">Oct 24, 11:30 AM</span>
                    </div>

                    {/* Step 3 (Active) */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#a23e18] text-white flex items-center justify-center shadow-xs ring-4 ring-[#fe8357]/30 animate-pulse">
                        <span className="material-symbols-outlined text-base">sync</span>
                      </div>
                      <span className="text-xs font-bold text-[#a23e18] mt-2">In Progress</span>
                      <span className="text-[10px] text-[#4b454e]">En route to Unit</span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center relative z-10 opacity-40">
                      <div className="w-8 h-8 rounded-full bg-[#cdc3cf] text-[#4b454e] flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">task_alt</span>
                      </div>
                      <span className="text-xs text-[#4b454e] mt-2">Completed</span>
                      <span className="text-[10px] text-[#4b454e]">Pending sign-off</span>
                    </div>
                  </div>
                </div>

                {/* Dispatch Contractor Info Box */}
                <div className="p-3.5 rounded-xl bg-[#eee5f4] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-[#e8dfee]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#25063e] text-white flex items-center justify-center font-bold text-sm">
                      MK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#25063e]">Eng. Mustafa K. • Horn Technical Services</p>
                      <p className="text-[11px] text-[#4b454e]">Task: Master Bedroom Inverter AC Diagnostic & Gas Refill</p>
                      <p className="text-xs text-[#a23e18] font-bold mt-0.5">ETA: Today, 3:30 PM (in 45 minutes)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+252634428110"
                      className="px-3 py-1.5 rounded-lg bg-white text-[#25063e] hover:bg-[#faf0ff] transition-colors text-xs font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-base">call</span> Call Technician
                    </a>
                    <button
                      onClick={() => alert("Tracking technician location: Approving gate pass at Jigjiga Yar security checkpoint.")}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#a23e18] hover:bg-[#faf0ff] transition-colors text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">directions</span> Track Tech
                    </button>
                  </div>
                </div>

                {/* Recently Resolved Tickets Mini-strip */}
                <div className="mt-4 pt-3 border-t border-[#e8dfee]">
                  <span className="text-[11px] text-[#4b454e] uppercase tracking-wider block mb-2 font-semibold">
                    Recently Resolved in Your Residence
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#faf0ff] border border-[#e8dfee]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
                        <span className="text-[#1e1a24]">#MN-388 Water Pressure Regulator Replacement</span>
                      </div>
                      <span className="text-[#4b454e]">Closed Sep 14, 2026</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#faf0ff] border border-[#e8dfee]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
                        <span className="text-[#1e1a24]">#MN-341 Smart Door Lock Firmware Update</span>
                      </div>
                      <span className="text-[#4b454e]">Closed Aug 02, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History Ledger */}
              <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e8dfee]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8dfee] gap-3">
                  <div>
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Rental Payment Ledger</h3>
                    <p className="text-xs text-[#4b454e]">
                      Verified on-chain receipt verification backed by Dahabshiil / Telesom gateway
                    </p>
                  </div>
                  <button
                    onClick={() => alert("Downloading encrypted statement package (PDF + CSV)...")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eee5f4] text-[#25063e] hover:bg-[#e8dfee] text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    Export Statements
                  </button>
                </div>

                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf0ff] text-[#4b454e] uppercase tracking-wider font-semibold border-b border-[#e8dfee]">
                      <tr>
                        <th className="py-2.5 px-3">Reference #</th>
                        <th className="py-2.5 px-3">Billing Period</th>
                        <th className="py-2.5 px-3">Method</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8dfee] text-[#1e1a24]">
                      {[
                        { ref: '#ZAD-994821', time: 'Oct 01, 2026 • 08:44 AM', period: 'October 2026', method: 'Zaad Telesom', amount: 1400, status: 'Settled' },
                        { ref: '#ZAD-883109', time: 'Sep 01, 2026 • 10:20 AM', period: 'September 2026', method: 'Zaad Telesom', amount: 1400, status: 'Settled' },
                        { ref: '#EDH-441029', time: 'Aug 01, 2026 • 09:05 AM', period: 'August 2026', method: 'e-Dahab Somtel', amount: 1400, status: 'Settled' },
                        { ref: '#SEC-110482', time: 'Jul 12, 2026 • 14:15 PM', period: 'Security Deposit', method: 'Zaad Telesom', amount: 1400, status: 'In Escrow' }
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#faf0ff]/60 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-bold text-[#25063e] block">{item.ref}</span>
                            <span className="text-[11px] text-[#4b454e]">{item.time}</span>
                          </td>
                          <td className="py-3 px-3 font-semibold">{item.period}</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#faf0ff] text-xs font-semibold text-[#25063e] border border-[#e8dfee]">
                              <span className="w-2 h-2 rounded-full bg-[#a23e18]" />
                              {item.method}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-['Manrope'] font-bold text-[#25063e]">
                            {formatCurrency(item.amount, currency)}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                item.status === 'Settled'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-[#faf0ff] text-[#25063e] border border-[#e8dfee]'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => alert(`Downloading signed official receipt for transaction ${item.ref}...`)}
                              className="p-1.5 rounded hover:bg-[#eee5f4] text-[#25063e] cursor-pointer"
                              title="Download PDF Receipt"
                            >
                              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Mobile Money Express Checkout Card */}
              <div
                id="express-payment-box"
                className="p-6 rounded-2xl bg-white shadow-xs border border-[#e8dfee] relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Express Rent Payment</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#ffdbcf] text-[#822801]">
                    Instant USSD
                  </span>
                </div>
                <p className="text-xs text-[#4b454e] mb-4">
                  Pay securely with Zaad Telesom or e-Dahab. Authorization prompt will ring immediately on your registered mobile handset.
                </p>

                <form onSubmit={triggerUssdSimulation} className="flex flex-col gap-3">
                  {/* Provider Tabs */}
                  <div className="grid grid-cols-2 p-1 rounded-xl bg-[#faf0ff] border border-[#e8dfee] gap-1">
                    <button
                      type="button"
                      onClick={() => setPaymentProvider('zaad')}
                      className={`py-2 text-center rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentProvider === 'zaad'
                          ? 'bg-white text-[#25063e] shadow-xs font-bold'
                          : 'text-[#4b454e]'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a23e18]" />
                      <span>Zaad Telesom</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentProvider('edahab')}
                      className={`py-2 text-center rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentProvider === 'edahab'
                          ? 'bg-white text-[#25063e] shadow-xs font-bold'
                          : 'text-[#4b454e]'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fe8357]" />
                      <span>e-Dahab Somtel</span>
                    </button>
                  </div>

                  {/* Merchant Till Info */}
                  <div className="flex items-center justify-between text-xs text-[#4b454e] px-1">
                    <span>Merchant Till Code:</span>
                    <span className="font-mono bg-[#eee5f4] text-[#25063e] px-2 py-0.5 rounded font-bold">
                      849202 (The Palms)
                    </span>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-[11px] text-[#4b454e] uppercase font-semibold mb-1">
                      Due Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-[#4b454e]">$</span>
                      <input
                        type="text"
                        readOnly
                        value="1,400.00"
                        className="w-full h-11 pl-7 pr-16 bg-[#faf0ff] rounded-lg font-['Manrope'] font-extrabold text-base text-[#25063e] border border-[#e8dfee] focus:outline-none"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#4b454e] font-bold">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Mobile Phone Input */}
                  <div>
                    <label className="block text-[11px] text-[#4b454e] uppercase font-semibold mb-1">
                      Subscriber Mobile Number
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg bg-[#eee5f4] text-xs font-semibold text-[#25063e] border border-r-0 border-[#cdc3cf]">
                        +252 63
                      </span>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="4XX XXXX"
                        className="flex-1 h-11 px-3 bg-white rounded-r-lg text-xs font-bold text-[#1e1a24] border border-[#cdc3cf] focus:outline-none focus:ring-2 focus:ring-[#25063e]"
                      />
                    </div>
                  </div>

                  {/* Exchange rate info */}
                  <div className="p-2.5 rounded-xl bg-[#faf0ff] flex items-center justify-between text-xs border border-[#e8dfee]">
                    <span className="text-[#4b454e]">Central Bank Rate:</span>
                    <span className="text-[#25063e] font-bold">1 USD = 8,500 SL Sh</span>
                  </div>

                  {/* Pay CTA */}
                  <button
                    type="submit"
                    disabled={ussdSimulating}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-[#a23e18] text-white py-3 px-4 rounded-xl text-xs font-bold hover:bg-[#822801] shadow-md transition-all cursor-pointer disabled:opacity-70"
                  >
                    <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                    <span>{ussdSimulating ? 'Pinging Zaad Switchboard...' : 'Send USSD Payment Prompt'}</span>
                  </button>

                  <p className="text-[11px] text-center text-[#4b454e] mt-1">
                    Encrypted end-to-end via Central Bank of Somaliland NPS protocol
                  </p>
                </form>

                {/* USSD interactive feedback */}
                {ussdSuccess && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-start gap-2.5 animate-in fade-in">
                    <span className="material-symbols-outlined text-[20px] text-emerald-700 mt-0.5">
                      phonelink_ring
                    </span>
                    <div className="text-xs">
                      <p className="font-bold">Prompt sent to +252 63 {mobileNumber}</p>
                      <p className="text-[11px] mt-0.5 opacity-90">
                        Enter your 4-digit mobile money PIN on your phone screen to authenticate $1,400 payment to SomRent Escrow.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Prepaid Utilities Telemetry */}
              <div className="p-6 rounded-2xl bg-white shadow-xs border border-[#e8dfee]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Prepaid Utilities</h3>
                    <p className="text-xs text-[#4b454e]">Live telemetry for Unit 4B</p>
                  </div>
                  <button
                    onClick={() => alert("Telemetry refreshed from Sompower IoT Smart Gateway.")}
                    className="p-1.5 rounded-lg bg-[#eee5f4] text-[#25063e] hover:bg-[#e8dfee] cursor-pointer"
                    title="Refresh meter telemetry"
                  >
                    <span className="material-symbols-outlined text-base">sync</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Sompower Meter */}
                  <div className="p-4 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#a23e18] text-lg">bolt</span>
                        <span className="text-xs font-bold text-[#25063e]">Sompower Grid Meter</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Good
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-['Manrope'] font-bold text-xl text-[#25063e]">
                        {sompowerKwh} <span className="text-xs font-normal text-[#4b454e]">kWh left</span>
                      </span>
                      <span className="text-xs text-[#4b454e]">~${(sompowerKwh * 0.22).toFixed(2)} Bal</span>
                    </div>
                    {/* Meter progress bar */}
                    <div className="w-full bg-[#eee5f4] rounded-full h-2 mt-2 overflow-hidden">
                      <div className="bg-[#a23e18] h-2 rounded-full w-2/3" />
                    </div>
                    <div className="flex justify-between items-center mt-2.5 text-[11px] text-[#4b454e]">
                      <span>Meter #SP-99201-HRG</span>
                      <button
                        onClick={() => setRechargeModalOpen(true)}
                        className="text-[#a23e18] font-bold hover:underline cursor-pointer"
                      >
                        Recharge Units
                      </button>
                    </div>
                  </div>

                  {/* Water Reservoir */}
                  <div className="p-4 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#25063e] text-lg">water_drop</span>
                        <span className="text-xs font-bold text-[#25063e]">Compound Water Level</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#25063e] bg-[#eee5f4] px-2 py-0.5 rounded">
                        84% Full
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-['Manrope'] font-bold text-xl text-[#25063e]">
                        16,800 <span className="text-xs font-normal text-[#4b454e]">/ 20,000 Liters</span>
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold">Refilled 6h ago</span>
                    </div>
                    {/* Reservoir progress bar */}
                    <div className="w-full bg-[#eee5f4] rounded-full h-2 mt-2 overflow-hidden">
                      <div className="bg-[#25063e] h-2 rounded-full w-[84%]" />
                    </div>
                    <p className="text-[11px] text-[#4b454e] mt-2 leading-relaxed">
                      Automated municipal borehole pump cycle active. Next scheduled test on Saturday.
                    </p>
                  </div>
                </div>
              </div>

              {/* Residence Contacts */}
              <div className="p-6 rounded-2xl bg-white shadow-xs border border-[#e8dfee]">
                <h3 className="font-['Manrope'] font-bold text-base text-[#25063e] mb-3">Residence Contacts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#faf0ff] transition-colors border border-[#e8dfee]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#eee5f4] text-[#25063e]">
                        <span className="material-symbols-outlined text-lg">shield</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#25063e]">Security Gatehouse 24/7</p>
                        <p className="text-[11px] text-[#4b454e]">Visitor passes & barrier gate</p>
                      </div>
                    </div>
                    <a
                      href="tel:+252634001122"
                      className="p-2 rounded-lg bg-[#faf0ff] text-[#25063e] hover:bg-[#eee5f4]"
                      title="Call gatehouse"
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#faf0ff] transition-colors border border-[#e8dfee]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#eee5f4] text-[#25063e]">
                        <span className="material-symbols-outlined text-lg">engineering</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#25063e]">Compound Supervisor</p>
                        <p className="text-[11px] text-[#4b454e]">Hassan O. (On-site manager)</p>
                      </div>
                    </div>
                    <a
                      href="tel:+252634998877"
                      className="p-2 rounded-lg bg-[#faf0ff] text-[#25063e] hover:bg-[#eee5f4]"
                      title="Call supervisor"
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffdad6]/60 border border-[#ffdad6]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#ba1a1a] text-white">
                        <span className="material-symbols-outlined text-lg">emergency</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#ba1a1a]">Emergency Helpline</p>
                        <p className="text-[11px] text-[#ba1a1a]/80">Fire, Water pipe burst, Medical</p>
                      </div>
                    </div>
                    <a
                      href="tel:999"
                      className="p-2 rounded-lg bg-[#ba1a1a] text-white hover:opacity-90"
                      title="Emergency call"
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recharge Sompower Modal */}
      {rechargeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#e8dfee]">
            <h3 className="font-['Manrope'] font-bold text-base text-[#25063e] mb-2">Recharge Sompower Tokens</h3>
            <p className="text-xs text-[#4b454e] mb-4">Meter: SP-99201-HRG (Unit 4B)</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[15, 25, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setRechargeAmount(amt)}
                  className={`py-2 rounded-lg text-xs font-bold cursor-pointer border ${
                    rechargeAmount === amt
                      ? 'bg-[#25063e] text-white border-[#25063e]'
                      : 'bg-[#faf0ff] text-[#1e1a24] border-[#e8dfee]'
                  }`}
                >
                  ${amt} USD
                </button>
              ))}
            </div>
            <button
              onClick={handleRechargeSompower}
              className="w-full py-2.5 rounded-lg bg-[#a23e18] text-white text-xs font-bold hover:bg-[#822801] cursor-pointer"
            >
              Pay ${rechargeAmount} via Zaad
            </button>
            <button
              onClick={() => setRechargeModalOpen(false)}
              className="w-full mt-2 py-2 text-xs text-[#4b454e] hover:text-[#1e1a24] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Report Maintenance Modal */}
      {reportMaintenanceOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e8dfee]">
            <h3 className="font-['Manrope'] font-bold text-base text-[#25063e] mb-1">Report Maintenance Issue</h3>
            <p className="text-xs text-[#4b454e] mb-4">Unit 4B, The Palms Residence</p>
            <textarea
              rows={3}
              value={maintenanceIssue}
              onChange={(e) => setMaintenanceIssue(e.target.value)}
              placeholder="Describe the issue (e.g. leaking sink, solar inverter beep, water pressure)..."
              className="w-full p-3 bg-[#faf0ff] rounded-xl border border-[#cdc3cf] text-xs focus:outline-none focus:ring-2 focus:ring-[#25063e] mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setReportMaintenanceOpen(false)}
                className="flex-1 py-2 rounded-lg bg-[#eee5f4] text-xs font-semibold text-[#25063e] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Ticket submitted! Assigned to Horn Technical Services with 1-hr response guarantee.");
                  setReportMaintenanceOpen(false);
                }}
                className="flex-1 py-2 rounded-lg bg-[#25063e] text-white text-xs font-semibold cursor-pointer"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera QR Code Scanner Overlay for Notarized Deed Authenticity Verification */}
      <DeedQrScannerOverlay
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        onViewAgreement={() => onNavigate('agreements')}
        initialDeedKey="the-palms"
      />
    </div>
  );
};
