import React, { useState } from 'react';
import { Currency, Property } from '../types';
import { PROPERTIES, formatCurrency, FX_RATE_USD_TO_SLSH } from '../data/mockData';

interface PropertyDetailViewProps {
  propertyId: string;
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  propertyId,
  onNavigate,
  currency
}) => {
  const property: Property = PROPERTIES.find(p => p.id === propertyId) || PROPERTIES[0];

  const [leaseMonths, setLeaseMonths] = useState<number>(12);
  const [occupants, setOccupants] = useState<string>('3-4');
  const [moveInDate, setMoveInDate] = useState<string>('2026-11-01');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const [viewingModalOpen, setViewingModalOpen] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);

  // Financial calculations
  const monthlyRent = property.priceUsd;
  const securityDeposit = property.financialTerms.depositUsd;
  const totalMoveIn = monthlyRent + securityDeposit;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSuccess(true);
    setTimeout(() => {
      // Transition directly to the Digital Tenancy Agreement view for execution!
      onNavigate('agreements');
    }, 1200);
  };

  const allPhotos = [
    property.images.hero,
    property.images.master || property.images.hero,
    property.images.kitchen || property.images.hero,
    property.images.courtyard || property.images.hero,
    property.images.aerial || property.images.hero,
    ...(property.images.gallery || [])
  ];

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Breadcrumbs & Utility Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-[#e8dfee]">
          <nav className="flex items-center flex-wrap gap-2 text-xs text-[#4b454e]">
            <button onClick={() => onNavigate('marketplace')} className="hover:text-[#25063e] cursor-pointer">
              Marketplace
            </button>
            <span className="text-[#cdc3cf]">/</span>
            <span>Somaliland</span>
            <span className="text-[#cdc3cf]">/</span>
            <span>{property.city}</span>
            <span className="text-[#cdc3cf]">/</span>
            <span>{property.district}</span>
            <span className="text-[#cdc3cf]">/</span>
            <span className="text-[#1e1a24] font-semibold">{property.title}</span>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Property URL copied to clipboard!");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e8dfee] hover:bg-[#eee5f4] text-xs font-semibold text-[#1e1a24] transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              Share
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e8dfee] hover:bg-[#eee5f4] text-xs font-semibold transition-colors shadow-xs cursor-pointer ${
                isSaved ? 'text-[#a23e18]' : 'text-[#1e1a24]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e8dfee] hover:bg-[#eee5f4] text-xs font-semibold text-[#1e1a24] transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Brochure
            </button>
          </div>
        </div>

        {/* Property Headline & Key Credentials */}
        <div className="flex flex-col gap-3 my-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#a23e18] text-white text-[11px] font-bold uppercase tracking-wider">
              Featured
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eee5f4] text-[#25063e] text-xs font-semibold border border-[#e8dfee]">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Title Deed #{property.deedNumber}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#1e1a24] text-xs font-semibold border border-[#e8dfee]">
              <span className="material-symbols-outlined text-[14px] text-[#a23e18]">person_check</span>
              Direct Owner Listing
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#faf0ff] text-[#1e1a24] text-xs border border-[#e8dfee]">
              <span className="material-symbols-outlined text-[15px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <strong className="font-bold">{property.rating}</strong>
              <span className="text-[#4b454e]">({property.reviewCount} reviews)</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-['Manrope'] text-2xl sm:text-3xl lg:text-4xl text-[#25063e] tracking-tight font-extrabold">
                {property.title} — {property.tagline || `${property.beds}-Bedroom Gated Residence`}
              </h1>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#4b454e] mt-1">
                <span className="material-symbols-outlined text-[18px] text-[#a23e18]">pin_drop</span>
                <span>{property.location}, {property.district}, {property.city}, Somaliland</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs uppercase text-[#4b454e] tracking-wider font-semibold">Guide Rental</div>
              <div className="font-['Manrope'] text-2xl sm:text-3xl text-[#25063e] font-extrabold">
                {formatCurrency(property.priceUsd, currency)}{' '}
                <span className="text-xs sm:text-sm text-[#4b454e] font-normal">/ month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Photo Gallery Bento Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-md border border-[#e8dfee]">
          {/* Big Primary Architectural View */}
          <div
            onClick={() => { setActivePhotoIndex(0); setGalleryModalOpen(true); }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-[#faf0ff] cursor-pointer"
          >
            <img
              src={property.images.hero}
              alt="Exterior Pool Courtyard"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25063e]/60 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#25063e] text-xs font-semibold shadow-xs">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              Exterior Pool Courtyard
            </span>
          </div>

          {/* Master Bedroom */}
          <div
            onClick={() => { setActivePhotoIndex(1); setGalleryModalOpen(true); }}
            className="relative group overflow-hidden bg-[#faf0ff] cursor-pointer"
          >
            <img
              src={property.images.master || property.images.hero}
              alt="Master Suite"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-[#1e1a24] text-[11px] font-semibold">
              Master Suite
            </span>
          </div>

          {/* Modern Kitchen */}
          <div
            onClick={() => { setActivePhotoIndex(2); setGalleryModalOpen(true); }}
            className="relative group overflow-hidden bg-[#faf0ff] cursor-pointer"
          >
            <img
              src={property.images.kitchen || property.images.hero}
              alt="Chef's Kitchen"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-[#1e1a24] text-[11px] font-semibold">
              Chef's Kitchen
            </span>
          </div>

          {/* Landscaped Courtyard & Entry */}
          <div
            onClick={() => { setActivePhotoIndex(3); setGalleryModalOpen(true); }}
            className="relative group overflow-hidden bg-[#faf0ff] cursor-pointer"
          >
            <img
              src={property.images.courtyard || property.images.hero}
              alt="Courtyard & Entry"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-[#1e1a24] text-[11px] font-semibold">
              Courtyard & Entry
            </span>
          </div>

          {/* Aerial Perspective with View All Trigger */}
          <div
            onClick={() => { setActivePhotoIndex(4); setGalleryModalOpen(true); }}
            className="relative group overflow-hidden bg-[#faf0ff] cursor-pointer"
          >
            <img
              src={property.images.aerial || property.images.hero}
              alt="Aerial View"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#25063e]/75 hover:bg-[#25063e]/85 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-all p-3 text-center">
              <span className="material-symbols-outlined text-[28px] mb-1">grid_view</span>
              <span className="font-['Manrope'] font-bold text-sm">View All 24 Photos</span>
              <span className="text-[11px] text-[#ffdbcf] mt-0.5">Including floor plans & 3D tour</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Specs, Deep Details, Amenities, Landlord, Neighborhood (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-white rounded-xl shadow-xs border border-[#e8dfee]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">bed</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Bedrooms</div>
                  <div className="text-sm font-bold text-[#1e1a24]">{property.beds} Beds</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">bathtub</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Bathrooms</div>
                  <div className="text-sm font-bold text-[#1e1a24]">{property.baths} Baths</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">square_foot</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Built Area</div>
                  <div className="text-sm font-bold text-[#1e1a24]">{property.areaM2} m²</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">garage</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Parking</div>
                  <div className="text-sm font-bold text-[#1e1a24]">{property.parking} Covered</div>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">event</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Year Built</div>
                  <div className="text-sm font-bold text-[#1e1a24]">{property.yearBuilt}</div>
                </div>
              </div>
            </div>

            {/* Property Description */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col gap-4">
              <h2 className="font-['Manrope'] font-bold text-lg text-[#25063e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#a23e18]">description</span>
                Property Overview
              </h2>
              <div className="text-sm text-[#4b454e] space-y-3 leading-relaxed">
                {property.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee]">
                  <div className="text-[11px] text-[#4b454e]">Solar Reliability</div>
                  <div className="text-xs font-bold text-[#25063e] mt-0.5">100% Uninterrupted Power</div>
                </div>
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee]">
                  <div className="text-[11px] text-[#4b454e]">Water Storage</div>
                  <div className="text-xs font-bold text-[#25063e] mt-0.5">20,000L Subterranean Cistern</div>
                </div>
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee]">
                  <div className="text-[11px] text-[#4b454e]">High Speed Comms</div>
                  <div className="text-xs font-bold text-[#25063e] mt-0.5">Telesom Gigabit Fiber Ready</div>
                </div>
              </div>
            </section>

            {/* Key Amenities Grid */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-['Manrope'] font-bold text-lg text-[#25063e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#a23e18]">tune</span>
                  Infrastructure & Amenities
                </h2>
                <span className="text-xs text-[#4b454e]">{property.amenities.length} Verified Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { title: 'Backup Solar System', desc: '10kVA hybrid + Li-ion bank', icon: 'solar_power' },
                  { title: 'Borehole Supply', desc: 'Continuous city + ground water', icon: 'water_drop' },
                  { title: 'Electric Perimeter', desc: '3.5m stone wall + pulse wires', icon: 'fence' },
                  { title: 'Guard Quarters', desc: 'Self-contained gatehouse', icon: 'shield_person' },
                  { title: 'Master A/C Climate', desc: 'Dual inverter units installed', icon: 'mode_fan' },
                  { title: 'Italian Porcelain', desc: '120x60 calibrated tiles', icon: 'floor' },
                  { title: 'Fitted Kitchen', desc: 'Bosch hob & oven ready', icon: 'countertops' },
                  { title: 'Laundry Facility', desc: 'Washer hookup & utility sink', icon: 'local_laundry_service' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                    <span className="material-symbols-outlined text-[#a23e18] text-[22px]">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#1e1a24]">{item.title}</div>
                      <div className="text-[11px] text-[#4b454e]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Lease & Financial Terms breakdown */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col gap-5">
              <h2 className="font-['Manrope'] font-bold text-lg text-[#25063e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#a23e18]">receipt_long</span>
                Lease & Financial Terms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                  <span className="text-[11px] uppercase tracking-wider text-[#4b454e]">Monthly Base Rent</span>
                  <div className="font-['Manrope'] font-bold text-xl text-[#25063e] mt-1">
                    {formatCurrency(property.priceUsd, currency)}
                  </div>
                  <p className="text-[11px] text-[#4b454e] mt-1">
                    Due on 1st of each calendar month via escrow or direct bank.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                  <span className="text-[11px] uppercase tracking-wider text-[#4b454e]">Refundable Deposit</span>
                  <div className="font-['Manrope'] font-bold text-xl text-[#25063e] mt-1">
                    {formatCurrency(property.financialTerms.depositUsd, currency)}
                  </div>
                  <p className="text-[11px] text-[#4b454e] mt-1">
                    Held securely in SomRent verified custodial escrow throughout the lease.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf0ff] border border-[#e8dfee]">
                  <span className="text-[11px] uppercase tracking-wider text-[#4b454e]">Minimum Lease Term</span>
                  <div className="font-['Manrope'] font-bold text-xl text-[#25063e] mt-1">
                    {property.financialTerms.minLeaseMonths} Months
                  </div>
                  <p className="text-[11px] text-[#4b454e] mt-1">
                    Renewal option guaranteed with 60 days advance written notice.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#eee5f4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#e8dfee]">
                <div>
                  <div className="text-xs font-semibold text-[#1e1a24] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#a23e18]">payments</span>
                    Accepted Payment Channels & Services
                  </div>
                  <div className="text-[11px] text-[#4b454e] mt-0.5">
                    Zaad Service (Telesom), e-Dahab (Somtel), Dahabshiil Bank Wire, Premier Bank Swift
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-white text-xs font-bold text-[#25063e] shadow-xs">ZAAD</span>
                  <span className="px-2.5 py-1 rounded bg-white text-xs font-bold text-[#25063e] shadow-xs">e-Dahab</span>
                  <span className="px-2.5 py-1 rounded bg-white text-xs font-bold text-[#25063e] shadow-xs">USD Wire</span>
                </div>
              </div>
            </section>

            {/* Neighborhood Map & Distance Matrix */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="font-['Manrope'] font-bold text-lg text-[#25063e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#a23e18]">map</span>
                  Neighborhood & Proximity
                </h2>
                <span className="text-xs text-[#4b454e]">{property.district}, Diplomatic Zone</span>
              </div>

              {/* Static Map Container */}
              <div
                className="w-full h-72 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-4 shadow-inner border border-[#e8dfee]"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxKSOSOcMpMUVs_LOHsgCMmygSafQHWirwCpXDMRauw39KLdC-yRUwgiGxbfUkFyfaepYWbktHnd45UEN0dVqcD5BJ7bH6Qx-G5E0f7NuaJGAW2DM2FhoWhTVGLAZpzB2STSEIGhOgGEEAFPvF11xiccj1rYjRDwaGaUu8VSOlDHOlnDRF-67EtMvg6jxw8_gf6F7YvThUvQXkQllhQVSrVBJpatfus9RNY1Sne3-gxgDknpnGeL9T')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#25063e]/80 via-[#25063e]/20 to-transparent pointer-events-none" />
                <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a23e18] text-[20px]">location_on</span>
                    <span className="text-xs font-bold text-[#1e1a24]">{property.title} Coordinates</span>
                  </div>
                  <span className="text-xs text-[#4b454e] bg-[#faf0ff] px-2.5 py-0.5 rounded font-mono border border-[#e8dfee]">
                    {property.proximity.coordinates}
                  </span>
                </div>
              </div>

              {/* Proximity Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee] flex flex-col">
                  <span className="text-[11px] text-[#4b454e]">Egal Int'l Airport</span>
                  <span className="font-['Manrope'] font-bold text-base text-[#25063e] mt-0.5">
                    {property.proximity.airportMin} min
                  </span>
                  <span className="text-[11px] text-[#4b454e]">8.2 km via Ring Rd</span>
                </div>
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee] flex flex-col">
                  <span className="text-[11px] text-[#4b454e]">City Center (Downtown)</span>
                  <span className="font-['Manrope'] font-bold text-base text-[#25063e] mt-0.5">
                    {property.proximity.cityCenterMin} min
                  </span>
                  <span className="text-[11px] text-[#4b454e]">3.5 km smooth tarmac</span>
                </div>
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee] flex flex-col">
                  <span className="text-[11px] text-[#4b454e]">Turkish Hospital</span>
                  <span className="font-['Manrope'] font-bold text-base text-[#25063e] mt-0.5">
                    {property.proximity.hospitalMin} min
                  </span>
                  <span className="text-[11px] text-[#4b454e]">2.1 km direct access</span>
                </div>
                <div className="p-3 bg-[#faf0ff] rounded-xl border border-[#e8dfee] flex flex-col">
                  <span className="text-[11px] text-[#4b454e]">British Council / UN Hub</span>
                  <span className="font-['Manrope'] font-bold text-base text-[#25063e] mt-0.5">
                    {property.proximity.unHubMin} min
                  </span>
                  <span className="text-[11px] text-[#4b454e]">4.0 km via Ambassador</span>
                </div>
              </div>
            </section>

            {/* Verified Landlord / Property Manager Card */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={property.landlord.avatar}
                  alt={property.landlord.name}
                  className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-[#e8dfee]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">{property.landlord.name}</h3>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[13px]">verified_user</span>
                      KYC Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#4b454e] mt-0.5">{property.landlord.agency} • {property.landlord.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#4b454e]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#a23e18]">schedule</span>
                      Replies &lt; 30 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {property.landlord.rating} Host Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => alert(`Credentials Verified: Somaliland Chamber of Commerce Certified Broker #104, Title Deed SLD-9942 notary authorized.`)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#eee5f4] hover:bg-[#e8dfee] text-[#25063e] text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Credentials
                </button>
                <button
                  onClick={() => alert(`Opening chat with ${property.landlord.name}...`)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#25063e] hover:bg-[#3b1e54] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  Direct Message
                </button>
              </div>
            </section>
          </div>

          {/* Right Sticky Application & Booking Panel (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl flex flex-col gap-5 border border-[#e8dfee]">
              {/* Header & Pricing */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#4b454e] font-semibold">
                    Monthly Lease Rate
                  </div>
                  <div className="font-['Manrope'] font-bold text-2xl text-[#25063e]">
                    {formatCurrency(property.priceUsd, currency)}
                    <span className="text-xs text-[#4b454e] font-normal ml-1">/ mo</span>
                  </div>
                  <div className="text-xs text-[#4b454e]">
                    ≈ {(property.priceUsd * FX_RATE_USD_TO_SLSH).toLocaleString()} SL Sh
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Ready to Occupy
                </span>
              </div>

              {/* Available Date Pill */}
              <div className="p-3 bg-[#faf0ff] rounded-xl flex items-center gap-2.5 border border-[#e8dfee]">
                <span className="material-symbols-outlined text-[#a23e18] text-[20px]">calendar_month</span>
                <div>
                  <div className="text-[11px] text-[#4b454e]">Earliest Possession Date</div>
                  <div className="text-xs font-bold text-[#1e1a24]">Available From Nov 1, 2026</div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleApply} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#4b454e] uppercase font-semibold">
                    Desired Move-in Date
                  </label>
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#cdc3cf] text-[#1e1a24] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#4b454e] uppercase font-semibold">
                    Lease Term Commitment
                  </label>
                  <select
                    value={leaseMonths}
                    onChange={(e) => setLeaseMonths(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-white border border-[#cdc3cf] text-[#1e1a24] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option value={12}>12 Months (Standard Lease)</option>
                    <option value={24}>24 Months (5% Multi-year Discount)</option>
                    <option value={36}>36 Months (Diplomatic Long-Term)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#4b454e] uppercase font-semibold">
                    Number of Occupants
                  </label>
                  <select
                    value={occupants}
                    onChange={(e) => setOccupants(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#cdc3cf] text-[#1e1a24] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option value="1-2">1 - 2 Residents</option>
                    <option value="3-4">3 - 4 Family Members</option>
                    <option value="5+">5+ Residents</option>
                  </select>
                </div>

                {/* Cost Estimation Summary Box */}
                <div className="p-3.5 bg-[#faf0ff] rounded-xl flex flex-col gap-2 mt-1 border border-[#e8dfee]">
                  <div className="flex justify-between text-xs text-[#4b454e]">
                    <span>First Month Rent</span>
                    <span className="font-semibold text-[#1e1a24]">{formatCurrency(monthlyRent, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#4b454e]">
                    <span>Security Deposit (Refundable)</span>
                    <span className="font-semibold text-[#1e1a24]">{formatCurrency(securityDeposit, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#4b454e]">
                    <span>SomRent Service Fee</span>
                    <span className="font-semibold text-emerald-700">$0.00 (FREE)</span>
                  </div>
                  <div className="h-px bg-[#e8dfee] my-1" />
                  <div className="flex justify-between text-xs font-bold text-[#1e1a24]">
                    <span>Total Move-in Capital</span>
                    <span className="text-[#25063e] font-['Manrope'] text-base font-extrabold">
                      {formatCurrency(totalMoveIn, currency)}
                    </span>
                  </div>
                </div>

                {/* Success Banner if applied */}
                {applicationSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Lease Draft Generated! Redirecting to Escrow Deed...
                  </div>
                )}

                {/* CTAs */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#25063e] hover:bg-[#3b1e54] text-white text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Apply for Rental Now
                </button>

                <button
                  type="button"
                  onClick={() => setViewingModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-transparent hover:bg-[#eee5f4] text-[#a23e18] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  Schedule In-Person Viewing
                </button>
              </form>

              {/* Instant Direct Contact */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/${property.landlord.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp
                </a>
                <a
                  href={`tel:${property.landlord.phone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#eee5f4] hover:bg-[#e8dfee] text-[#25063e] text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Agent
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col gap-2 pt-2 text-[#4b454e] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                  <span>Zero agent commission fee for verified tenants</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">lock</span>
                  <span>Direct verified escrow protection on deposits</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">assignment_turned_in</span>
                  <span>Legally binding Somaliland deed registry lease deed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-4">
            <span className="text-sm font-semibold">
              {property.title} — Photo {activePhotoIndex + 1} of {allPhotos.length}
            </span>
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <img
              src={allPhotos[activePhotoIndex]}
              alt="Expanded view"
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {activePhotoIndex > 0 && (
              <button
                onClick={() => setActivePhotoIndex(prev => prev - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            )}
            {activePhotoIndex < allPhotos.length - 1 && (
              <button
                onClick={() => setActivePhotoIndex(prev => prev + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            )}
          </div>

          {/* Thumbnails strip */}
          <div className="flex gap-2 overflow-x-auto py-2 justify-center">
            {allPhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer ${
                  activePhotoIndex === idx ? 'border-[#fe8357]' : 'border-transparent opacity-60'
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Viewing Modal */}
      {viewingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e8dfee]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8dfee]">
              <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">
                Schedule In-Person Viewing
              </h3>
              <button onClick={() => setViewingModalOpen(false)} className="text-[#7c747f] hover:text-[#1e1a24]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-[#4b454e]">
              <p>An authorized SomRent field representative will meet you at the property compound entrance in Jigjiga Yar.</p>
              <div>
                <label className="block text-[11px] font-semibold text-[#1e1a24] mb-1">Select Preferred Time Slot</label>
                <select className="w-full h-10 px-3 bg-[#faf0ff] rounded-lg border border-[#e8dfee] text-xs">
                  <option>Tomorrow, 10:00 AM - 11:00 AM</option>
                  <option>Tomorrow, 02:00 PM - 03:00 PM</option>
                  <option>Saturday, 11:30 AM - 12:30 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1e1a24] mb-1">Your Mobile Number (for Zaad Gate Pass)</label>
                <input
                  type="text"
                  defaultValue="+252 63 448 9201"
                  className="w-full h-10 px-3 bg-[#faf0ff] rounded-lg border border-[#e8dfee] text-xs"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-[#e8dfee] flex items-center gap-2">
              <button
                onClick={() => setViewingModalOpen(false)}
                className="flex-1 py-2 rounded-lg bg-[#eee5f4] text-xs font-semibold text-[#25063e]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Viewing booked! SMS confirmation and gate pass sent to your mobile phone.");
                  setViewingModalOpen(false);
                }}
                className="flex-1 py-2 rounded-lg bg-[#25063e] text-white text-xs font-semibold"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
