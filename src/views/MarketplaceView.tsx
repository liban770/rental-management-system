import React, { useState, useMemo } from 'react';
import { Currency, Property } from '../types';
import { PROPERTIES, formatCurrency } from '../data/mockData';

interface MarketplaceViewProps {
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onNavigate, currency }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [budgetMax, setBudgetMax] = useState<number>(3500);
  const [selectedBeds, setSelectedBeds] = useState<string>('any');
  const [selectedBaths, setSelectedBaths] = useState<string>('any');
  const [furnishing, setFurnishing] = useState<{ [key: string]: boolean }>({
    'Fully Furnished': true,
    'Semi-Furnished': false,
    'Unfurnished': false
  });
  const [amenitiesFilter, setAmenitiesFilter] = useState<{ [key: string]: boolean }>({
    'Solar Power Backup': true,
    'Dedicated Borehole Water': true,
    'High-Speed Fiber Internet': false,
    '24/7 Gated Guard Security': true,
    'Covered Parking': false,
    'Air Conditioning': false,
    'Servant Quarters': false
  });
  const [paymentTerm, setPaymentTerm] = useState('Monthly');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSortBy('recommended');
    setSelectedCategory('all');
    setVerifiedOnly(false);
    setBudgetMax(3500);
    setSelectedBeds('any');
    setSelectedBaths('any');
    setFurnishing({
      'Fully Furnished': false,
      'Semi-Furnished': false,
      'Unfurnished': false
    });
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      if (verifiedOnly && !p.isVerified) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (p.priceUsd > budgetMax) return false;

      if (selectedCity !== 'all') {
        if (selectedCity === 'jigjiga' && !p.district.toLowerCase().includes('jigjiga')) return false;
        if (selectedCity === 'shacabka' && !p.district.toLowerCase().includes('shacabka')) return false;
        if (selectedCity === 'berbera' && p.city.toLowerCase() !== 'berbera') return false;
        if (selectedCity === 'borama' && p.city.toLowerCase() !== 'borama') return false;
      }

      if (selectedBeds !== 'any') {
        if (selectedBeds === '5+' && p.beds < 5) return false;
        if (selectedBeds !== '5+' && p.beds !== parseInt(selectedBeds, 10)) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchCity = p.city.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchCity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
      if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      return 0; // recommended
    });
  }, [verifiedOnly, selectedCategory, budgetMax, selectedCity, selectedBeds, searchQuery, sortBy]);

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      {/* Subtle Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#3b1e54]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-[#a23e18]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Editorial Header & Location Breadcrumb Strip */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#4b454e] mb-1.5">
              <span className="text-xs uppercase tracking-wider text-[#a23e18] font-bold">
                SOMALILAND PROPTECH REGISTRY
              </span>
              <span className="text-[#cdc3cf] text-xs">/</span>
              <span className="text-xs">Residential & Commercial Discovery</span>
            </div>
            <h1 className="font-['Manrope'] text-2xl sm:text-3xl lg:text-4xl text-[#25063e] font-extrabold tracking-tight">
              Verified Property Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-[#4b454e] mt-1 max-w-2xl">
              Explore notarized, deed-verified residential rentals backed by digital lease protection across Somaliland hubs.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eee5f4] text-[#1e1a24] border border-[#e8dfee]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-semibold">Live Registry: 459 Properties Active</span>
            </div>
          </div>
        </div>

        {/* Floating Search & Categorization Canvas */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border border-[#e8dfee]">
            {/* Top Search Bar Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              {/* Text Input */}
              <div className="lg:col-span-6 relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#4b454e] text-[22px] pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by neighborhood, street, or landmark (e.g. Masalaha, Jigjiga Yar, Airport Road)..."
                  className="w-full h-11 pl-11 pr-4 bg-[#faf0ff] rounded-lg text-sm text-[#1e1a24] placeholder:text-[#7c747f] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#25063e] transition-all border border-[#e8dfee]"
                />
              </div>

              {/* City Selector */}
              <div className="lg:col-span-3 relative">
                <div className="relative flex items-center bg-[#faf0ff] rounded-lg border border-[#e8dfee]">
                  <span className="material-symbols-outlined absolute left-3 text-[#a23e18] text-[20px] pointer-events-none">
                    location_city
                  </span>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-11 pl-10 pr-8 bg-transparent text-sm text-[#1e1a24] focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="all">Hargeisa (All Districts)</option>
                    <option value="jigjiga">Hargeisa — Jigjiga Yar</option>
                    <option value="shacabka">Hargeisa — Shacabka</option>
                    <option value="berbera">Berbera (Maritime & Port)</option>
                    <option value="borama">Borama (Amoud Valley)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 text-[#4b454e] text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="lg:col-span-3 relative">
                <div className="relative flex items-center bg-[#faf0ff] rounded-lg border border-[#e8dfee]">
                  <span className="material-symbols-outlined absolute left-3 text-[#4b454e] text-[20px] pointer-events-none">
                    swap_vert
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-11 pl-10 pr-8 bg-transparent text-sm text-[#1e1a24] focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 text-[#4b454e] text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Pill Category Row */}
            <div className="mt-4 pt-3 border-t border-[#e8dfee] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Properties', count: '' },
                  { id: 'villa', label: 'Villas', count: '142' },
                  { id: 'apartment', label: 'Apartments', count: '218' },
                  { id: 'duplex', label: 'Duplexes', count: '64' },
                  { id: 'office', label: 'Offices', count: '35' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#25063e] text-white shadow-xs'
                        : 'bg-[#eee5f4] text-[#4b454e] hover:text-[#1e1a24] hover:bg-[#e8dfee]'
                    }`}
                  >
                    {cat.label} {cat.count && <span className="opacity-75 font-normal">({cat.count})</span>}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[#4b454e] text-xs">
                <span className="material-symbols-outlined text-[16px] text-[#a23e18]">verified_user</span>
                <span>All deeds validated with Somaliland Cadastral Notary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Marketplace Content: 2-Column Responsive Split */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Filter Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#e8dfee]">
              <div className="flex items-center justify-between pb-2 border-b border-[#e8dfee]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#25063e] text-[20px]">tune</span>
                  <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">Filter Catalog</h2>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#a23e18] hover:underline cursor-pointer font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Verified Only Pill Toggle */}
              <div className="p-3.5 rounded-xl bg-[#faf0ff] flex items-center justify-between shadow-xs border border-[#e8dfee]">
                <div className="flex flex-col pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#25063e]">Verified Only</span>
                    <span className="material-symbols-outlined text-[#a23e18] text-[16px]">verified</span>
                  </div>
                  <span className="text-[11px] text-[#4b454e] mt-0.5">Title deed checked</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#cdc3cf] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25063e]" />
                </label>
              </div>

              {/* Monthly Budget Range Filter */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-[#1e1a24]">Monthly Budget</label>
                  <span className="text-[#a23e18] font-bold">
                    $200 - {formatCurrency(budgetMax, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3500"
                  step="50"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full accent-[#25063e] h-2 bg-[#eee5f4] rounded-lg cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-[#faf0ff] px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs border border-[#e8dfee]">
                    <span className="text-[#7c747f]">Min</span>
                    <span className="font-bold text-[#1e1a24]">$200</span>
                  </div>
                  <div className="bg-[#faf0ff] px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs border border-[#e8dfee]">
                    <span className="text-[#7c747f]">Max</span>
                    <span className="font-bold text-[#1e1a24]">${budgetMax.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms Segmented */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-semibold text-[#1e1a24]">Bedrooms</label>
                <div className="grid grid-cols-6 gap-1 bg-[#faf0ff] p-1 rounded-lg border border-[#e8dfee]">
                  {['any', '1', '2', '3', '4', '5+'].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setSelectedBeds(bed)}
                      className={`py-1 text-center text-xs rounded transition-all cursor-pointer ${
                        selectedBeds === bed
                          ? 'bg-white text-[#25063e] shadow-xs font-bold'
                          : 'text-[#4b454e] hover:text-[#1e1a24]'
                      }`}
                    >
                      {bed === 'any' ? 'Any' : bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms Segmented */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1e1a24]">Bathrooms</label>
                <div className="grid grid-cols-4 gap-1 bg-[#faf0ff] p-1 rounded-lg border border-[#e8dfee]">
                  {['any', '1+', '2+', '3+'].map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() => setSelectedBaths(bath)}
                      className={`py-1 text-center text-xs rounded transition-all cursor-pointer ${
                        selectedBaths === bath
                          ? 'bg-white text-[#25063e] shadow-xs font-bold'
                          : 'text-[#4b454e] hover:text-[#1e1a24]'
                      }`}
                    >
                      {bath === 'any' ? 'Any' : bath}
                    </button>
                  ))}
                </div>
              </div>

              {/* Furnishing Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1e1a24]">Furnishing State</label>
                <div className="flex flex-col gap-1.5 text-xs text-[#1e1a24]">
                  {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!furnishing[f]}
                        onChange={(e) => setFurnishing(prev => ({ ...prev, [f]: e.target.checked }))}
                        className="rounded accent-[#25063e] w-4 h-4"
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Key Infrastructure & Amenities */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1e1a24]">Infrastructure & Amenities</label>
                <div className="flex flex-col gap-2 text-xs text-[#1e1a24]">
                  {[
                    { label: 'Solar Power Backup', icon: 'solar_power' },
                    { label: 'Dedicated Borehole Water', icon: 'water_drop' },
                    { label: 'High-Speed Fiber Internet', icon: 'wifi' },
                    { label: '24/7 Gated Guard Security', icon: 'security' },
                    { label: 'Covered Parking', icon: 'garage_home' },
                    { label: 'Air Conditioning', icon: 'mode_fan' },
                    { label: 'Servant Quarters', icon: 'person_add' }
                  ].map((amenity) => (
                    <label key={amenity.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!amenitiesFilter[amenity.label]}
                        onChange={(e) => setAmenitiesFilter(prev => ({ ...prev, [amenity.label]: e.target.checked }))}
                        className="rounded accent-[#25063e] w-4 h-4"
                      />
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#a23e18]">
                          {amenity.icon}
                        </span>
                        {amenity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Terms */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1e1a24]">Payment Terms</label>
                <div className="grid grid-cols-3 gap-1 bg-[#faf0ff] p-1 rounded-lg border border-[#e8dfee]">
                  {['Monthly', 'Quarter', 'Bi-Annual'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setPaymentTerm(term)}
                      className={`py-1 text-center text-xs rounded transition-all cursor-pointer ${
                        paymentTerm === term
                          ? 'bg-white text-[#25063e] shadow-xs font-semibold'
                          : 'text-[#4b454e] hover:text-[#1e1a24]'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filter CTA */}
              <button
                type="button"
                className="w-full mt-2 py-2.5 rounded-lg bg-[#25063e] text-white font-semibold text-xs hover:bg-[#3b1e54] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                Apply Discovery Filters
              </button>
            </aside>

            {/* Right Property Grid Area */}
            <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
              {/* Discovery Meta Header */}
              <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a23e18]" />
                  <span className="font-['Manrope'] font-bold text-base text-[#25063e]">
                    Showing {filteredProperties.length} Verified Rentals
                  </span>
                  <span className="text-xs text-[#4b454e] hidden md:inline">
                    • Hargeisa & Berbera Region
                  </span>
                </div>

                {/* View Modes */}
                <div className="flex items-center gap-1 bg-[#eee5f4] p-1 rounded-lg self-end sm:self-auto border border-[#cdc3cf]/40">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#25063e] shadow-xs'
                        : 'text-[#4b454e] hover:text-[#1e1a24]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">grid_view</span>
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'map'
                        ? 'bg-white text-[#25063e] shadow-xs'
                        : 'text-[#4b454e] hover:text-[#1e1a24]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    Map View
                  </button>
                </div>
              </div>

              {/* Interactive Map View Mode */}
              {viewMode === 'map' ? (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8dfee] flex flex-col gap-4">
                  <div
                    className="relative w-full h-96 rounded-xl bg-cover bg-center overflow-hidden flex flex-col justify-between p-4 shadow-inner"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxKSOSOcMpMUVs_LOHsgCMmygSafQHWirwCpXDMRauw39KLdC-yRUwgiGxbfUkFyfaepYWbktHnd45UEN0dVqcD5BJ7bH6Qx-G5E0f7NuaJGAW2DM2FhoWhTVGLAZpzB2STSEIGhOgGEEAFPvF11xiccj1rYjRDwaGaUu8VSOlDHOlnDRF-67EtMvg6jxw8_gf6F7YvThUvQXkQllhQVSrVBJpatfus9RNY1Sne3-gxgDknpnGeL9T')`
                    }}
                  >
                    <div className="absolute inset-0 bg-[#25063e]/40 pointer-events-none" />

                    {/* Map pins representation */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#25063e] shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#a23e18]">location_on</span>
                        Hargeisa (34 Pins)
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#25063e] shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#a23e18]">location_on</span>
                        Berbera (10 Pins)
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#25063e] shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#a23e18]">location_on</span>
                        Borama (4 Pins)
                      </span>
                    </div>

                    <div className="relative z-10 bg-white/90 backdrop-blur-md p-3 rounded-lg max-w-sm">
                      <p className="text-xs font-bold text-[#25063e]">Interactive Cadastral GIS Sync</p>
                      <p className="text-[11px] text-[#4b454e] mt-0.5">
                        Pin coordinates synchronized with Somaliland Land Registry plot parcels.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Property Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProperties.map((prop) => {
                  const isFav = !!favorites[prop.id];
                  return (
                    <article
                      key={prop.id}
                      onClick={() => onNavigate('property-detail', prop.id)}
                      className="group bg-white rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-[#e8dfee] cursor-pointer"
                    >
                      {/* Hero Image Section */}
                      <div className="relative w-full h-52 overflow-hidden bg-[#faf0ff]">
                        <img
                          src={prop.images.hero}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#25063e]/80 via-transparent to-black/20" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#25063e] shadow-xs">
                            <span className="material-symbols-outlined text-[14px] text-[#a23e18]">verified</span>
                            Deed Verified
                          </span>
                          {prop.isAvailableNow && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#a23e18] text-white shadow-xs">
                              Available Now
                            </span>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(prop.id, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer ${
                            isFav ? 'text-[#a23e18]' : 'text-[#4b454e] hover:text-[#a23e18]'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[18px]"
                            style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                        </button>

                        {/* Price Badge */}
                        <div className="absolute bottom-3 left-3 flex items-baseline gap-1 text-white">
                          <span className="font-['Manrope'] text-xl font-extrabold text-white leading-none">
                            {formatCurrency(prop.priceUsd, currency)}
                          </span>
                          <span className="text-xs text-[#e0d7e5] font-medium">/ month</span>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white text-[11px]">
                          USD or SLSh
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1 text-[#4b454e] text-xs">
                            <span className="material-symbols-outlined text-[16px] text-[#a23e18]">location_on</span>
                            <span>{prop.location}</span>
                          </div>
                          <h3 className="font-['Manrope'] font-bold text-base text-[#25063e] mt-1 line-clamp-1 group-hover:text-[#a23e18] transition-colors">
                            {prop.title}
                          </h3>
                        </div>

                        {/* Specs Matrix */}
                        <div className="grid grid-cols-3 gap-1 py-1.5 bg-[#faf0ff] rounded-lg px-2 text-center border border-[#e8dfee]">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-[#25063e]">{prop.beds}</span>
                            <span className="text-[11px] text-[#4b454e]">Beds</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-[#25063e]">{prop.baths}</span>
                            <span className="text-[11px] text-[#4b454e]">Baths</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-[#25063e]">{prop.areaM2}</span>
                            <span className="text-[11px] text-[#4b454e]">m²</span>
                          </div>
                        </div>

                        {/* Perks Tags */}
                        <div className="flex flex-wrap gap-1 text-[11px] text-[#4b454e]">
                          {prop.amenities.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-[#eee5f4]">
                              {item.split('(')[0].trim()}
                            </span>
                          ))}
                        </div>

                        {/* Action Button */}
                        <button
                          type="button"
                          onClick={() => onNavigate('property-detail', prop.id)}
                          className="w-full mt-1 py-2 rounded-lg bg-[#eee5f4] text-[#25063e] group-hover:bg-[#25063e] group-hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          View Property Details
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Bottom Pagination Controls */}
              <div className="mt-4 bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#4b454e]">
                  Showing <strong className="text-[#1e1a24]">1 - {filteredProperties.length}</strong> of 48 properties registered
                </span>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1 rounded-lg text-xs text-[#4b454e] hover:bg-[#eee5f4] disabled:opacity-40 cursor-pointer" disabled>
                    Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#25063e] text-white flex items-center justify-center shadow-xs">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg text-xs text-[#4b454e] hover:bg-[#eee5f4] flex items-center justify-center cursor-pointer">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg text-xs text-[#4b454e] hover:bg-[#eee5f4] flex items-center justify-center cursor-pointer">
                    3
                  </button>
                  <span className="px-1 text-[#4b454e] text-xs">...</span>
                  <button className="w-8 h-8 rounded-lg text-xs text-[#4b454e] hover:bg-[#eee5f4] flex items-center justify-center cursor-pointer">
                    8
                  </button>
                  <button className="px-3 py-1 rounded-lg text-xs text-[#4b454e] hover:bg-[#eee5f4] hover:text-[#1e1a24] cursor-pointer">
                    Next
                  </button>
                </div>
              </div>

              {/* Trust & Cadastral Verification Notice Banner */}
              <div className="p-5 rounded-2xl bg-[#eee5f4] border border-[#e8dfee] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25063e] flex items-center justify-center text-white shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[26px]">gavel</span>
                  </div>
                  <div>
                    <h4 className="font-['Manrope'] font-bold text-sm text-[#25063e]">
                      Somaliland Real Estate Verification Standards
                    </h4>
                    <p className="text-xs text-[#4b454e] mt-0.5 max-w-xl">
                      Every property featured in SomRent undergoes digital title validation with district cadastral offices, preventing double-leases and rental fraud.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('agreements')}
                  className="px-4 py-2 rounded-lg bg-white text-[#25063e] text-xs font-semibold hover:bg-[#25063e] hover:text-white transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  Read Verification Protocols
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
