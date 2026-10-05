import React, { useState, useRef } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../data/mockData';

interface TenancyAgreementViewProps {
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const TenancyAgreementView: React.FC<TenancyAgreementViewProps> = ({
  onNavigate,
  currency,
}) => {
  const [hasSigned, setHasSigned] = useState(false);
  const [signatureName, setSignatureName] = useState('Hassan Farah Warsame');
  const [signDate] = useState('October 5, 2026');
  const [activeTab, setActiveTab] = useState<'contract' | 'guarantor' | 'escrow'>('contract');
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [escrowPaid, setEscrowPaid] = useState(false);
  const [escrowPhone, setEscrowPhone] = useState('+252 63 442 8190');
  const [selectedMobileWallet, setSelectedMobileWallet] = useState<'zaad' | 'edahab'>('zaad');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPrintSuccess, setShowPrintSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1b1b1f';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleApplySignature = () => {
    setHasSigned(true);
  };

  const handleConfirmEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setEscrowPaid(true);
      setShowEscrowModal(false);
    }, 1500);
  };

  const handlePrint = () => {
    setShowPrintSuccess(true);
    setTimeout(() => {
      window.print();
      setShowPrintSuccess(false);
    }, 400);
  };

  const monthlyRent = 1250;
  const depositAmount = 2500;

  return (
    <div className="bg-[#fcf8fc] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2 text-sm text-[#7c7389]">
            <button
              onClick={() => onNavigate('marketplace')}
              className="hover:text-[#49007a] transition-colors"
            >
              Marketplace
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('detail', 'palms-villa')}
              className="hover:text-[#49007a] transition-colors"
            >
              The Palms Luxury Villa
            </button>
            <span>/</span>
            <span className="text-[#1b1b1f] font-semibold">Tenancy Contract #SLD-2026-8841B</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-[#d2c2d8] rounded-xl text-sm font-semibold text-[#49007a] bg-white hover:bg-[#f6eeff] transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
            <button
              onClick={() => onNavigate('tenant')}
              className="flex items-center gap-2 px-4 py-2 bg-[#49007a] text-white rounded-xl text-sm font-semibold hover:bg-[#380060] transition-all shadow-sm"
            >
              Go to Tenant Portal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfee] shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#006e2c]/10 flex items-center justify-center text-[#006e2c] shrink-0 border border-[#006e2c]/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1b1b1f]">Ministry Cadastral Registration: Verified</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f5e9] text-[#006e2c] border border-[#a5d6a7]">
                  Seal No. CAD-HGA-99120
                </span>
              </div>
              <p className="text-xs text-[#7c7389] mt-0.5">
                Authenticated in the Somaliland Land Deeds & Tenancy Ledger under Act No. 41/2018 (Civil & Commercial Leases).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasSigned && escrowPaid ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#e8f5e9] text-[#006e2c] border border-[#a5d6a7]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Agreement Fully Executed & Funded
              </span>
            ) : hasSigned ? (
              <button
                onClick={() => setShowEscrowModal(true)}
                className="px-4 py-2 bg-[#d49600] text-white hover:bg-[#b07d00] rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 animate-pulse"
              >
                <span>Complete Escrow Deposit ($2,500)</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#fff8e1] text-[#9c6500] border border-[#ffe082]">
                <span className="w-2 h-2 rounded-full bg-[#d49600] animate-ping" />
                Pending Tenant Signature
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation for Contract Sections */}
        <div className="flex border-b border-[#e8dfee] mb-6">
          <button
            onClick={() => setActiveTab('contract')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'contract'
                ? 'border-[#49007a] text-[#49007a]'
                : 'border-transparent text-[#7c7389] hover:text-[#1b1b1f]'
            }`}
          >
            Lease Agreement & Legal Clauses
          </button>
          <button
            onClick={() => setActiveTab('guarantor')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'guarantor'
                ? 'border-[#49007a] text-[#49007a]'
                : 'border-transparent text-[#7c7389] hover:text-[#1b1b1f]'
            }`}
          >
            Guarantor (Damaanad) Endorsement
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'escrow'
                ? 'border-[#49007a] text-[#49007a]'
                : 'border-transparent text-[#7c7389] hover:text-[#1b1b1f]'
            }`}
          >
            Mobile Money Escrow Terms
          </button>
        </div>

        {/* Document Paper Container */}
        <div className="bg-white rounded-3xl border border-[#e8dfee] shadow-xl p-8 sm:p-12 text-[#1b1b1f] relative overflow-hidden">
          {/* Official Watermark Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
            <svg className="w-96 h-96" viewBox="0 0 200 200" fill="currentColor">
              <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="4" fill="none" />
              <text x="100" y="95" textAnchor="middle" fontSize="14" fontWeight="bold">REPUBLIC OF SOMALILAND</text>
              <text x="100" y="115" textAnchor="middle" fontSize="11">MINISTRY OF HOUSING & PUBLIC WORKS</text>
            </svg>
          </div>

          {activeTab === 'contract' && (
            <div>
              {/* Document Header */}
              <div className="text-center pb-8 border-b-2 border-[#1b1b1f] mb-8">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#f6eeff] flex items-center justify-center text-[#49007a] border border-[#e2d0ee]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif uppercase">
                  Republic of Somaliland
                </h1>
                <p className="text-sm font-semibold text-[#7c7389] tracking-widest uppercase mt-0.5">
                  Ministry of Public Works, Lands & Housing • Department of Cadastre & Deeds
                </p>
                <div className="inline-block mt-3 px-4 py-1.5 bg-[#f6eeff] text-[#49007a] rounded-full text-xs font-mono font-bold tracking-wide uppercase border border-[#e8dfee]">
                  Standard Notarized Residential Lease • Ref: SLD-HGA-2026-8841B
                </div>
              </div>

              {/* Preamble & Summary Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#faf5fc] border border-[#ebdff0] mb-8 text-sm">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#7c7389] mb-3">
                    Parties to the Agreement
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-[#7c7389] block">1. The Landlord (Lessor)</span>
                      <strong className="text-base text-[#1b1b1f]">Ahmed Liban Mohamed</strong>
                      <div className="text-xs text-[#7c7389]">
                        National ID: <span className="font-mono font-medium text-[#1b1b1f]">SOM-HGA-772910</span> •
                        Title Deed: <span className="font-mono font-medium text-[#1b1b1f]">CAD-VOL-882</span>
                      </div>
                      <div className="text-xs text-[#7c7389]">Contact: +252 63 442 9001 (Jigjiga Yar, Hargeisa)</div>
                    </div>
                    <div className="pt-2 border-t border-[#ebdff0]">
                      <span className="text-xs text-[#7c7389] block">2. The Tenant (Lessee)</span>
                      <strong className="text-base text-[#1b1b1f]">{signatureName}</strong>
                      <div className="text-xs text-[#7c7389]">
                        National ID / Passport: <span className="font-mono font-medium text-[#1b1b1f]">SOM-HGA-991823</span>
                      </div>
                      <div className="text-xs text-[#7c7389]">Contact: {escrowPhone}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#7c7389] mb-3">
                    Premises & Key Lease Terms
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Property:</span>
                      <span className="font-semibold text-right">The Palms Luxury Villa, Plot 42B</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Location:</span>
                      <span className="font-semibold text-right">Jigjiga Yar Diplomatic Quarter, Hargeisa</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Tenancy Period:</span>
                      <span className="font-semibold text-right">12 Months (Oct 1, 2026 - Sep 30, 2027)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Monthly Rent:</span>
                      <span className="font-bold text-[#49007a] text-right">
                        {formatCurrency(monthlyRent, currency)} (due on 1st of month)
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Escrow Security Deposit:</span>
                      <span className="font-bold text-[#1b1b1f] text-right">
                        {formatCurrency(depositAmount, currency)} (2 months rent)
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#7c7389]">Mobile Money Payout:</span>
                      <span className="font-semibold text-[#006e2c] text-right">Zaad / eDahab Direct Payout</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clause Sections */}
              <div className="space-y-6 text-sm leading-relaxed text-[#3b3842] border-t border-[#e8dfee] pt-6 font-serif">
                <div>
                  <h4 className="font-bold text-[#1b1b1f] font-sans text-base mb-2">
                    Clause 1: Scope of Demise and Occupancy Rights
                  </h4>
                  <p>
                    The Landlord hereby demises and lets to the Tenant all that residential property known as{' '}
                    <strong>The Palms Luxury Villa, Plot 42B</strong>, situated in the Jigjiga Yar district of Hargeisa,
                    comprising 5 bedrooms, 6 bathrooms, private swimming pool, landscaped perimeter courtyard,
                    and gated security guard quarters, together with all fixtures, fittings, and appliances described
                    in the Cadastral Inventory Schedule appended hereto.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1b1b1f] font-sans text-base mb-2">
                    Clause 2: Rent Payment and Mobile Escrow Protection
                  </h4>
                  <p>
                    The agreed rental consideration is{' '}
                    <strong>
                      ${monthlyRent.toLocaleString()} USD (equivalent to 10,625,000 Somaliland Shillings at official gazette rate)
                    </strong>{' '}
                    per calendar month, payable in advance on or before the first (1st) day of each month. Payments must be routed
                    through the SomRent automated Zaad Merchant portal (Merchant ID: 409921) or eDahab Mobile Escrow (ID: 849201).
                    A security deposit equal to two (2) months rent (${depositAmount.toLocaleString()} USD) shall remain locked in the
                    neutral SomRent Mobile Escrow vault until termination of the tenancy and cadastral exit walkthrough.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1b1b1f] font-sans text-base mb-2">
                    Clause 3: Utilities, Backup Power & Water Reserves
                  </h4>
                  <p>
                    (a) Electricity: The property is connected to the Sompower 220V 3-phase grid with smart meter #SP-7712.
                    The Tenant shall bear consumption costs. The Landlord guarantees functioning 12kVA rooftop solar backup with
                    lithium inverter maintenance.<br />
                    (b) Water: Supplied by Hargeisa Water Agency with 15,000L underground reserve cistern and pressure pump. The Landlord
                    warrants clean borehole water replenishment in case of municipal pipe outages.<br />
                    (c) High-speed Internet: Dedicated Telesom fiber optic broadband link (100 Mbps) pre-routed.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1b1b1f] font-sans text-base mb-2">
                    Clause 4: Maintenance and Structural Integrity
                  </h4>
                  <p>
                    The Landlord shall remain solely liable for all structural repairs, roofing, perimeter masonry, solar inverter
                    mechanisms, and exterior water pumps. The Tenant covenants to maintain internal decor, keep appliances clean,
                    and report any repair tickets via the SomRent Tenant Portal within forty-eight (48) hours of discovery.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1b1b1f] font-sans text-base mb-2">
                    Clause 5: Dispute Resolution & Jurisdiction
                  </h4>
                  <p>
                    This agreement shall be governed in accordance with the Laws of the Republic of Somaliland. Any dispute
                    arising that cannot be resolved amicably shall first be referred to arbitration before the Somaliland Chamber
                    of Commerce & Real Estate Tribunal, or the Hargeisa Regional District Court (Maxkamadda Gobolka Maroodi-Jeex).
                  </p>
                </div>
              </div>

              {/* Digital Signing Pad Section */}
              <div className="mt-10 pt-8 border-t-2 border-[#1b1b1f]">
                <h3 className="font-bold text-lg text-[#1b1b1f] font-sans mb-1">
                  Execution & Notarized Signatures
                </h3>
                <p className="text-xs text-[#7c7389] mb-6">
                  Both parties endorse this contract electronically with cryptographic timestamp under Somaliland Electronic Commerce & Cadastre Regulations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Landlord Signed Box */}
                  <div className="p-6 rounded-2xl bg-[#faf5fc] border border-[#e8dfee] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7c7389]">
                          Landlord Signature & Seal
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#006e2c] bg-[#e8f5e9] px-2 py-0.5 rounded-full border border-[#a5d6a7]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Executed & Verified
                        </span>
                      </div>

                      {/* Notary stamp and visual signature */}
                      <div className="h-28 bg-white rounded-xl border border-dashed border-[#d2c2d8] flex items-center justify-center p-3 relative overflow-hidden">
                        <div className="text-center">
                          <span className="font-serif italic text-xl font-bold text-[#1b1b1f] tracking-wide block">
                            Ahmed Liban Mohamed
                          </span>
                          <span className="text-[10px] text-[#7c7389] font-mono block mt-1">
                            Digital Cert: SHA256-CAD-7729-HARGEISA
                          </span>
                        </div>
                        {/* Red Notary stamp */}
                        <div className="absolute right-2 top-2 w-16 h-16 rounded-full border-2 border-[#ba1a1a]/40 flex flex-col items-center justify-center rotate-[-12deg] pointer-events-none">
                          <span className="text-[7px] font-bold text-[#ba1a1a] uppercase text-center leading-tight">
                            NOTARIZED<br />HGA CADASTRE<br />REGISTRY
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ebdff0] text-xs text-[#7c7389]">
                      Signed: October 1, 2026 09:14 AM EAT
                    </div>
                  </div>

                  {/* Tenant Signing Box */}
                  <div className="p-6 rounded-2xl bg-[#faf5fc] border border-[#e8dfee] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7c7389]">
                          Tenant Digital Signature
                        </span>
                        {hasSigned ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#006e2c] bg-[#e8f5e9] px-2 py-0.5 rounded-full border border-[#a5d6a7]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Signed on {signDate}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#ba1a1a] animate-pulse">
                            Action Required: Draw or Type
                          </span>
                        )}
                      </div>

                      {hasSigned ? (
                        <div className="h-28 bg-white rounded-xl border border-[#006e2c]/30 bg-[#e8f5e9]/20 flex items-center justify-center p-3 relative">
                          <div className="text-center">
                            <span className="font-serif italic text-2xl font-bold text-[#1b1b1f] tracking-wide block">
                              {signatureName}
                            </span>
                            <span className="text-[10px] text-[#006e2c] font-mono block mt-1">
                              Biometric Mobile Signature Verified
                            </span>
                          </div>
                          <button
                            onClick={clearCanvas}
                            className="absolute top-2 right-2 text-xs text-[#7c7389] hover:text-[#ba1a1a] underline"
                          >
                            Resign
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="relative border-2 border-dashed border-[#b8a5bf] rounded-xl bg-white overflow-hidden">
                            <canvas
                              ref={canvasRef}
                              width={380}
                              height={110}
                              className="w-full h-28 cursor-crosshair touch-none"
                              onMouseDown={handleStartDraw}
                              onMouseMove={handleDraw}
                              onMouseUp={handleStopDraw}
                              onMouseLeave={handleStopDraw}
                              onTouchStart={handleStartDraw}
                              onTouchMove={handleDraw}
                              onTouchEnd={handleStopDraw}
                            />
                            <div className="absolute bottom-2 left-3 pointer-events-none text-[11px] text-[#a49ba9]">
                              Draw your signature above with mouse or touch
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <button
                              type="button"
                              onClick={clearCanvas}
                              className="text-xs text-[#7c7389] hover:text-[#1b1b1f]"
                            >
                              Clear Pad
                            </button>
                            <button
                              type="button"
                              onClick={handleApplySignature}
                              className="px-4 py-1.5 bg-[#49007a] hover:bg-[#380060] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                            >
                              Apply & Verify Signature
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ebdff0] text-xs text-[#7c7389] flex justify-between items-center">
                      <span>Full Name: <strong>{signatureName}</strong></span>
                      <span>Passport: SOM-HGA-991823</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guarantor' && (
            <div className="space-y-6">
              <div className="border-b border-[#e8dfee] pb-4">
                <h2 className="text-xl font-bold text-[#1b1b1f]">Guarantor (Damaanad) Endorsement</h2>
                <p className="text-sm text-[#7c7389] mt-1">
                  Under Somaliland customary law (Xeer) and formal tenancy regulations, residential tenancies require a verified community elder or registered business guarantor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#faf5fc] border border-[#ebdff0]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#f6eeff] flex items-center justify-center text-[#49007a] font-bold text-lg border border-[#e2d0ee]">
                      SM
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1b1b1f]">Sh. Muse Ismail Geedi</h4>
                      <p className="text-xs text-[#7c7389]">Elder & Managing Director, Geedi Imports Ltd</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#3b3842]">
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">National ID:</span>
                      <span className="font-mono font-semibold">SOM-HGA-100293</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Commercial Reg #:</span>
                      <span className="font-mono font-semibold">CR-2015-8842-HGA</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#ebdff0]">
                      <span className="text-[#7c7389]">Endorsement Status:</span>
                      <span className="font-bold text-[#006e2c]">Verified & Approved</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#7c7389]">Contact Phone:</span>
                      <span className="font-medium">+252 63 441 0982</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-xl border border-[#ebdff0] text-xs italic text-[#5a5462]">
                    "I hereby certify that I know the tenant Hassan Farah Warsame personally and stand as personal guarantor for all contractual lease obligations outlined in Lease #SLD-2026-8841B."
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8dfee] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[#1b1b1f] mb-2">Legal Liability of Guarantor</h4>
                    <p className="text-xs text-[#7c7389] leading-relaxed mb-4">
                      In the event of unexcused default of rental payments exceeding sixty (60) days, or unresolved property destruction exceeding the escrow balance, the guarantor undertakes joint civil responsibility before the Somaliland Civil Tribunal.
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-[#e8f5e9] rounded-xl text-xs text-[#006e2c] border border-[#a5d6a7]">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Cadastral verification verified with Hargeisa Chamber of Commerce registry.</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#e8dfee] flex items-center justify-between text-xs text-[#7c7389]">
                    <span>Stamp Ref: COMM-NOT-8819</span>
                    <span className="text-[#006e2c] font-semibold">Active Bond</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-6">
              <div className="border-b border-[#e8dfee] pb-4">
                <h2 className="text-xl font-bold text-[#1b1b1f]">SomRent Mobile Escrow Vault Mechanics</h2>
                <p className="text-sm text-[#7c7389] mt-1">
                  How our bilateral smart escrow guarantees your security deposit and protects both tenant and landlord throughout the tenancy period.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#faf5fc] border border-[#ebdff0]">
                  <div className="w-10 h-10 rounded-xl bg-[#49007a] text-white flex items-center justify-center font-bold mb-3">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-[#1b1b1f] mb-1">Deposit Funding</h4>
                  <p className="text-xs text-[#7c7389] leading-relaxed">
                    Tenant authorizes transfer of $2,500 via Zaad or eDahab. Funds enter an isolated escrow custody account registered with Central Bank of Somaliland guidelines.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#faf5fc] border border-[#ebdff0]">
                  <div className="w-10 h-10 rounded-xl bg-[#49007a] text-white flex items-center justify-center font-bold mb-3">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-[#1b1b1f] mb-1">Lease Term Hold</h4>
                  <p className="text-xs text-[#7c7389] leading-relaxed">
                    Neither landlord nor tenant can unilaterally liquidate the funds. Monthly rental payments proceed separately each month on the 1st.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#faf5fc] border border-[#ebdff0]">
                  <div className="w-10 h-10 rounded-xl bg-[#49007a] text-white flex items-center justify-center font-bold mb-3">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-[#1b1b1f] mb-1">Exit Refund</h4>
                  <p className="text-xs text-[#7c7389] leading-relaxed">
                    Upon mutual checkout inspection, the $2,500 security deposit is released instantly back to the tenant's mobile wallet within 60 seconds.
                  </p>
                </div>
              </div>

              {/* Escrow Status Widget */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#49007a] to-[#6d00a8] text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-purple-200 block mb-1">
                    Escrow Balance for Contract #SLD-2026-8841B
                  </span>
                  <div className="text-3xl font-extrabold">
                    {formatCurrency(depositAmount, currency)}
                  </div>
                  <p className="text-xs text-purple-200 mt-1">
                    {escrowPaid ? 'Fully Funded in Escrow Vault' : 'Awaiting Tenant Deposit Transfer'}
                  </p>
                </div>

                <div>
                  {escrowPaid ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs font-bold text-emerald-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Deposit Held Safely
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowEscrowModal(true)}
                      className="px-5 py-2.5 bg-white text-[#49007a] hover:bg-purple-50 rounded-xl text-sm font-bold transition-all shadow-md"
                    >
                      Fund Escrow Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="mt-10 pt-6 border-t border-[#e8dfee] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#7c7389]">
              Cadastral Registry verification verified by Somaliland Ministry of Public Works, Lands & Housing.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('marketplace')}
                className="px-4 py-2 border border-[#d2c2d8] rounded-xl text-sm font-medium text-[#7c7389] hover:bg-[#faf5fc]"
              >
                Cancel & Return
              </button>
              {!hasSigned ? (
                <button
                  onClick={handleApplySignature}
                  className="px-6 py-2.5 bg-[#49007a] hover:bg-[#380060] text-white rounded-xl text-sm font-bold transition-all shadow-md"
                >
                  Sign & Accept Contract
                </button>
              ) : !escrowPaid ? (
                <button
                  onClick={() => setShowEscrowModal(true)}
                  className="px-6 py-2.5 bg-[#006e2c] hover:bg-[#005220] text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <span>Fund $2,500 Escrow Deposit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('tenant')}
                  className="px-6 py-2.5 bg-[#49007a] hover:bg-[#380060] text-white rounded-xl text-sm font-bold transition-all shadow-md"
                >
                  Enter Tenant Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Escrow Payment Modal */}
      {showEscrowModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ebdff0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <div>
                <span className="text-xs font-bold text-[#49007a] tracking-wider uppercase">
                  Mobile Money Escrow
                </span>
                <h3 className="text-xl font-bold text-[#1b1b1f] mt-0.5">
                  Fund Security Deposit
                </h3>
              </div>
              <button
                onClick={() => setShowEscrowModal(false)}
                className="w-8 h-8 rounded-full bg-[#f6eeff] text-[#7c7389] hover:text-[#1b1b1f] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf5fc] border border-[#ebdff0] mb-5">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-[#7c7389]">Deposit Amount:</span>
                <span className="font-bold text-lg text-[#1b1b1f]">
                  ${depositAmount.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7c7389]">
                <span>In Somaliland Shillings:</span>
                <span className="font-mono font-semibold">21,250,000 SLSH</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#ebdff0] text-[11px] text-[#006e2c] flex items-center gap-1 font-semibold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% Refundable upon lease completion
              </div>
            </div>

            <form onSubmit={handleConfirmEscrow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1b1b1f] mb-1.5">
                  Select Mobile Payment Network
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMobileWallet('zaad')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedMobileWallet === 'zaad'
                        ? 'border-[#006e2c] bg-[#e8f5e9] text-[#006e2c] font-bold'
                        : 'border-[#d2c2d8] text-[#7c7389] hover:bg-white'
                    }`}
                  >
                    <span className="block text-sm">ZAAD Telesom</span>
                    <span className="text-[10px] text-gray-500">*880# USSD Push</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMobileWallet('edahab')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedMobileWallet === 'edahab'
                        ? 'border-[#d49600] bg-[#fff8e1] text-[#9c6500] font-bold'
                        : 'border-[#d2c2d8] text-[#7c7389] hover:bg-white'
                    }`}
                  >
                    <span className="block text-sm">e-Dahab</span>
                    <span className="text-[10px] text-gray-500">*700# USSD Push</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1b1b1f] mb-1.5">
                  Registered Mobile Number
                </label>
                <input
                  type="text"
                  value={escrowPhone}
                  onChange={(e) => setEscrowPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d2c2d8] text-sm focus:border-[#49007a] focus:ring-1 focus:ring-[#49007a] outline-hidden font-mono"
                  placeholder="+252 63 XXX XXXX"
                  required
                />
                <span className="text-[11px] text-[#7c7389] mt-1 block">
                  A USSD payment prompt will appear on this handset to authorize escrow lock.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-[#49007a] hover:bg-[#380060] text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Requesting Handset Authorization...</span>
                    </>
                  ) : (
                    <span>Authorize ${depositAmount.toLocaleString()} Escrow Lock</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print Success Toast */}
      {showPrintSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b1b1f] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-4">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Preparing printable Somaliland cadastral deed...</span>
        </div>
      )}
    </div>
  );
};
