import React, { useState } from 'react';
import { Currency, Property } from '../types';
import { PROPERTIES, formatCurrency } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, currency }) => {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial' | 'diaspora'>('residential');
  const [selectedCity, setSelectedCity] = useState('Jigjiga Yar, Hargeisa');
  const [selectedType, setSelectedType] = useState('Luxury Villa');
  const [selectedBudget, setSelectedBudget] = useState('$500 - $1,200 /mo');
  const [selectedBeds, setSelectedBeds] = useState('3 - 4 Bedrooms');

  // Featured 3 residences
  const featuredProperties = PROPERTIES.filter(p => p.isFeatured).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('marketplace');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Immersive Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#25063e] text-white pt-28 pb-16 md:pb-24">
        {/* Hero Background Image & Atmospheric Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5ly6zxwjIwW-Jj8QLukD69jR1f7nFt_9ziQOh0bR1ztu53d4zq0VaJmNauNS5Gg87X_m2_IrVBe_LP99qshw6od1_m8EXy351R6KY6-rg9lGsKfm2EHVX0Umi7xLBpWl-bJNfxZKzaF66psETTqK0C3O-Aw5Btt8VRkLK2BOrrnKWMifJG9MxfxV7jpA0hFu6h1zjWkg9jQss8ypzOjA68GD-T1ECBYcaz-IPLAS7X0tNdgY_aVBX')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#25063e] via-[#25063e]/80 to-[#25063e]/50" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-[#fe8357]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Verified Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#f3daff] shadow-sm mb-4 border border-white/10">
            <span className="material-symbols-outlined text-[16px] text-[#fe8357]">verified</span>
            <span className="text-xs uppercase tracking-wider font-semibold">
              Institutional Grade PropTech · Somaliland
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-['Manrope'] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold max-w-4xl tracking-tight text-white mb-4 leading-tight drop-shadow-sm">
            Find a Place You’ll Love to Call Home.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#e0d7e5] max-w-2xl mb-8 opacity-90 leading-relaxed">
            Discover verified rental properties and manage your entire rental experience in one simple platform across Hargeisa, Berbera, Burco, and Borama.
          </p>

          {/* Glassmorphic Search Terminal */}
          <div className="w-full max-w-5xl rounded-2xl bg-white/90 backdrop-blur-xl text-[#1e1a24] shadow-2xl p-4 sm:p-6 border border-white/80">
            {/* Quick Switch Tabs */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('residential')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'residential'
                    ? 'bg-[#25063e] text-white shadow-sm'
                    : 'text-[#4b454e] hover:bg-[#eee5f4]'
                }`}
              >
                Residential Leases
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('commercial')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'commercial'
                    ? 'bg-[#25063e] text-white shadow-sm'
                    : 'text-[#4b454e] hover:bg-[#eee5f4]'
                }`}
              >
                Commercial Offices
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('diaspora')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'diaspora'
                    ? 'bg-[#25063e] text-white shadow-sm'
                    : 'text-[#4b454e] hover:bg-[#eee5f4]'
                }`}
              >
                Diaspora Short-Stay
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              {/* Location Input */}
              <div className="flex flex-col text-left">
                <label className="text-xs text-[#4b454e] mb-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a23e18]">location_on</span>
                  City or District
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-11 pl-3 pr-8 bg-white border border-[#cdc3cf]/60 rounded-lg text-sm text-[#1e1a24] appearance-none focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option>Jigjiga Yar, Hargeisa</option>
                    <option>Shacabka Hill, Hargeisa</option>
                    <option>Berbera Marina Waterfront</option>
                    <option>Amoud Valley, Borama</option>
                    <option>Aden Suleiman, Burco</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#4b454e] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex flex-col text-left">
                <label className="text-xs text-[#4b454e] mb-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a23e18]">apartment</span>
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full h-11 pl-3 pr-8 bg-white border border-[#cdc3cf]/60 rounded-lg text-sm text-[#1e1a24] appearance-none focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option>Luxury Villa</option>
                    <option>Modern Serviced Flat</option>
                    <option>Executive Penthouse</option>
                    <option>Gated Compound</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#4b454e] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Price Range */}
              <div className="flex flex-col text-left">
                <label className="text-xs text-[#4b454e] mb-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a23e18]">payments</span>
                  Monthly Budget
                </label>
                <div className="relative">
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full h-11 pl-3 pr-8 bg-white border border-[#cdc3cf]/60 rounded-lg text-sm text-[#1e1a24] appearance-none focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option>$500 - $1,200 /mo</option>
                    <option>$1,200 - $2,500 /mo</option>
                    <option>$2,500 - $5,000+ /mo</option>
                    <option>All Price Tiers</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#4b454e] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col text-left">
                <label className="text-xs text-[#4b454e] mb-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a23e18]">bed</span>
                  Bedrooms
                </label>
                <div className="relative">
                  <select
                    value={selectedBeds}
                    onChange={(e) => setSelectedBeds(e.target.value)}
                    className="w-full h-11 pl-3 pr-8 bg-white border border-[#cdc3cf]/60 rounded-lg text-sm text-[#1e1a24] appearance-none focus:outline-none focus:ring-2 focus:ring-[#25063e] shadow-xs cursor-pointer"
                  >
                    <option>Any Configuration</option>
                    <option>2+ Bedrooms</option>
                    <option>3 - 4 Bedrooms</option>
                    <option>5+ Bedrooms Master</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#4b454e] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="h-11 w-full bg-[#a23e18] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md hover:bg-[#822801] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Search Estates</span>
              </button>
            </form>

            {/* Fast Filter Meta Bar */}
            <div className="mt-4 pt-3 border-t border-[#e8dfee] flex flex-wrap items-center justify-between gap-3 text-xs text-[#4b454e]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  100% Notary Deed Verified
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#a23e18]">electric_bolt</span>
                  Instant Zaad · e-Dahab Checkout
                </span>
              </div>
              <span className="font-semibold text-[#25063e]">Showing 184 active leases this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Institutional Metrics Section */}
      <section className="w-full py-12 bg-[#faf0ff] border-b border-[#e8dfee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">
                  Settled Volume
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
              </div>
              <div>
                <div className="font-['Manrope'] text-2xl lg:text-3xl text-[#25063e] font-extrabold tracking-tight">
                  $42.8M+
                </div>
                <div className="text-xs text-[#4b454e] mt-1">
                  Managed lease cashflow across USD & SL Sh
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#faf0ff] flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                +31% YoY Institutional Inflow
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">
                  Collection Rate
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#a23e18]">
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                </div>
              </div>
              <div>
                <div className="font-['Manrope'] text-2xl lg:text-3xl text-[#25063e] font-extrabold tracking-tight">
                  99.4%
                </div>
                <div className="text-xs text-[#4b454e] mt-1">
                  Automated telecom escrow on-time rate
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#faf0ff] flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Guaranteed by SomRent Vault
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">
                  Active Verified Tenants
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
              </div>
              <div>
                <div className="font-['Manrope'] text-2xl lg:text-3xl text-[#25063e] font-extrabold tracking-tight">
                  12,650+
                </div>
                <div className="text-xs text-[#4b454e] mt-1">
                  Families, diaspora returnees & embassies
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#faf0ff] flex items-center gap-1 text-xs text-[#4b454e] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#a23e18]">hub</span>
                Spanning 4 major cities
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">
                  Lease Processing
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#a23e18]">
                  <span className="material-symbols-outlined text-[20px]">speed</span>
                </div>
              </div>
              <div>
                <div className="font-['Manrope'] text-2xl lg:text-3xl text-[#25063e] font-extrabold tracking-tight">
                  &lt; 14 Mins
                </div>
                <div className="text-xs text-[#4b454e] mt-1">
                  From viewing agreement to e-signature
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#faf0ff] flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Instant Notary Registry Sync
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Real Estate Section */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#a23e18]">
                Curated High-Value Registry
              </span>
              <h2 className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#25063e] tracking-tight mt-1">
                Featured Prime Residences
              </h2>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#eee5f4] text-[#1e1a24] hover:bg-[#e8dfee] transition-colors cursor-pointer self-start md:self-auto"
            >
              View All 184 Units
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => onNavigate('property-detail', prop.id)}
                className="rounded-xl overflow-hidden bg-white border border-[#e8dfee] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#faf0ff]">
                  <img
                    src={prop.images.hero}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#25063e] font-semibold flex items-center gap-1 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Verified Title Deed
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#25063e]/95 text-white font-['Manrope'] font-bold text-base shadow-md">
                    {formatCurrency(prop.priceUsd, currency)}
                    <span className="text-xs font-normal text-[#e0d7e5] ml-1">/ mo</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#4b454e] mb-1">
                      <span className="material-symbols-outlined text-[16px] text-[#a23e18]">place</span>
                      <span>{prop.location}, {prop.city}</span>
                    </div>
                    <h3 className="font-['Manrope'] font-bold text-lg text-[#25063e] group-hover:text-[#a23e18] transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-[#4b454e] mt-2 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#e8dfee] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#4b454e]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bed</span>
                        {prop.beds} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bathtub</span>
                        {prop.baths} Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">square_foot</span>
                        {prop.areaM2} m²
                      </span>
                    </div>
                    <span className="p-1.5 rounded-lg bg-[#eee5f4] text-[#25063e] group-hover:bg-[#a23e18] group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Trust Infrastructure Value Propositions */}
      <section className="w-full py-16 bg-[#faf0ff] border-t border-b border-[#e8dfee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a23e18]">
              Enterprise Security Layer
            </span>
            <h2 className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#25063e] tracking-tight mt-1">
              Built to Eliminate Tenancy Friction Across Somaliland
            </h2>
            <p className="text-sm text-[#4b454e] mt-2 leading-relaxed">
              Traditional handshakes replaced with enforceable digital ledgers, transparent escrow contracts, and government deed verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#25063e] text-white flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">gavel</span>
                </div>
                <h3 className="font-['Manrope'] font-bold text-lg text-[#25063e] mb-2">
                  Deed & Title Verification
                </h3>
                <p className="text-sm text-[#4b454e] leading-relaxed">
                  Every property is audited against municipal land deed registers and local court cadastral records before listing. Zero ownership disputes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e8dfee] flex items-center justify-between text-xs font-semibold text-[#25063e]">
                <span>Ministry Verified API</span>
                <span className="material-symbols-outlined text-[18px] text-emerald-700">check_circle</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#a23e18] text-white flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">contactless</span>
                </div>
                <h3 className="font-['Manrope'] font-bold text-lg text-[#25063e] mb-2">
                  Direct Zaad & e-Dahab Escrow
                </h3>
                <p className="text-sm text-[#4b454e] leading-relaxed">
                  Automated mobile money rent deductions with instantaneous SMS receipts, dual-currency accounting, and zero cash handling risks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e8dfee] flex items-center justify-between text-xs font-semibold text-[#a23e18]">
                <span>Instant Telesom & Dahabshiil Hook</span>
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-white shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#25063e] text-white flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">description</span>
                </div>
                <h3 className="font-['Manrope'] font-bold text-lg text-[#25063e] mb-2">
                  Enforceable Smart Contracts
                </h3>
                <p className="text-sm text-[#4b454e] leading-relaxed">
                  Bi-lingual legal agreements (Somali & English) binding under Somaliland civil tenancy statutes with tamper-proof audit trails.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e8dfee] flex items-center justify-between text-xs font-semibold text-[#25063e]">
                <span>Legally Binding E-Signatures</span>
                <span className="material-symbols-outlined text-[18px]">draw</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diaspora Remote Landlord & Tenant Spotlight */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive Preview Mockup Box */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-2xl bg-[#3b1e54] text-white p-6 sm:p-8 shadow-2xl overflow-hidden border border-white/10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a23e18] flex items-center justify-center text-white font-bold text-sm">
                      SR
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">London Diaspora Portal</h4>
                      <p className="text-xs text-[#cdc3cf]">Managed Portfolio: 4 Properties in Jigjiga Yar</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    Live Rent Deposit
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/80">Monthly Net Remittance</div>
                      <div className="text-[11px] text-[#cdc3cf]">Direct to UK Barclays IBAN via SomRent Escrow</div>
                    </div>
                    <div className="font-['Manrope'] font-bold text-xl text-[#ffb59c]">$7,450.00</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/80">Maintenance & Utilities</div>
                      <div className="text-[11px] text-[#cdc3cf]">Automated water pump & solar ledger sync</div>
                    </div>
                    <div className="text-xs text-emerald-400 font-semibold">All Clear (Zero Arrears)</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/80">Current Portfolio Tenancy</div>
                      <div className="text-[11px] text-[#cdc3cf]">4/4 Occupied on 24-month fixed leases</div>
                    </div>
                    <div className="text-xs text-white font-bold">100% Rate</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#cdc3cf] border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#ffb59c]">lock</span>
                    Encrypted Vault Settlement
                  </span>
                  <span>Next Payout: 1st of Month</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-[#a23e18]/20 blur-2xl pointer-events-none" />
            </div>

            {/* Descriptive Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822801] text-xs font-semibold mb-3">
                <span className="material-symbols-outlined text-[16px]">public</span>
                Global Somaliland Diaspora Network
              </div>
              <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#25063e] tracking-tight mb-3">
                Own from Abroad. Manage with Total Peace of Mind.
              </h2>
              <p className="text-sm sm:text-base text-[#4b454e] mb-6 leading-relaxed">
                Whether you reside in London, Minneapolis, Dubai, or Stockholm, SomRent eliminates the stress of managing family real estate from across the globe. Never rely on informal agents again.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#a23e18] text-[24px]">verified</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#25063e]">Direct Foreign Payouts</h4>
                    <p className="text-xs text-[#4b454e] mt-0.5">Liquidate collected rental earnings directly into your foreign bank account or keep in domestic USD escrow.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#a23e18] text-[24px]">photo_camera</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#25063e]">Video Inspection Logs</h4>
                    <p className="text-xs text-[#4b454e] mt-0.5">Time-stamped photographic check-in and check-out logs authenticated by third-party field auditors.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('owner-dashboard')}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#25063e] text-white hover:bg-[#3b1e54] transition-all shadow-sm cursor-pointer"
                >
                  Register as Diaspora Landlord
                </button>
                <button
                  onClick={() => onNavigate('guarantor')}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-[#25063e] hover:bg-[#eee5f4] transition-all cursor-pointer"
                >
                  Guarantor Portal →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#25063e] via-[#3b1e54] to-[#25063e] text-white p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="relative z-10 max-w-2xl text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ffdbcf]">
                Start Today Without Paperwork Delay
              </span>
              <h2 className="font-['Manrope'] text-2xl md:text-3xl font-bold text-white tracking-tight mt-1 mb-2">
                Ready to Discover Your Next High-Security Residence?
              </h2>
              <p className="text-sm text-[#e0d7e5] leading-relaxed">
                Join thousands of satisfied tenants, verified owners, and institutional organizations experiencing transparent real estate across Somaliland.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold bg-[#a23e18] text-white hover:bg-[#822801] transition-all text-center shadow-md cursor-pointer"
              >
                Explore Registry Listings
              </button>
              <button
                onClick={() => onNavigate('add-listing')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all text-center cursor-pointer border border-white/20"
              >
                List Your Property
              </button>
            </div>
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#a23e18]/15 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
