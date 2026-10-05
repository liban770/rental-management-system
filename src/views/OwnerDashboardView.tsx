import React, { useState } from 'react';
import { Currency } from '../types';
import { RECENT_COLLECTIONS, formatCurrency } from '../data/mockData';

interface OwnerDashboardViewProps {
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
}

export const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({ onNavigate, currency }) => {
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [filterMethod, setFilterMethod] = useState<'all' | 'zaad' | 'edahab' | 'wire'>('all');

  const filteredTransactions = RECENT_COLLECTIONS.filter(tx => {
    if (filterMethod === 'zaad') return tx.paymentMethod.toLowerCase().includes('zaad');
    if (filterMethod === 'edahab') return tx.paymentMethod.toLowerCase().includes('dahab');
    if (filterMethod === 'wire') return tx.paymentMethod.toLowerCase().includes('wire');
    return true;
  });

  const handleBroadcastSms = () => {
    setSmsSending(true);
    setTimeout(() => {
      setSmsSending(false);
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 4000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Welcome & Master Control Banner */}
        <section className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0 hidden sm:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLR8EXSNluWJN0Evk93gY-7toQyFVoA-wwwCCecCyTdJgorWHX5VQQr1ezMTUHOylH_ZMrh-jwvVZM0oLQWItzK_DHMoWsNziIWWcXfp8TgUxoLfQ06t8svPcYKIcg0eyo0L0-aZepk2J52FPKcqrI9Zkd3Sbqb_RnDw7vZ9t-JaZ0fG4LTL3LHBBtoxAasTyyeQLUXBPS7gnRln9UnZIsQ01Vv6BD8Mzeu3a03h2e2OP0aDwYAIXK"
                alt="Ahmed M."
                className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-[#cdc3cf]"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#a23e18] rounded-full p-1 text-white shadow-xs flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">verified</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#a23e18] uppercase tracking-widest font-bold">
                  Landlord Workspace
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a23e18]" />
                <span className="text-xs text-[#4b454e] font-medium">Hargeisa Regional Hub</span>
              </div>
              <h1 className="font-['Manrope'] text-2xl sm:text-3xl text-[#25063e] tracking-tight mt-0.5 font-bold">
                Good afternoon, Ahmed M.
              </h1>
              <p className="text-xs sm:text-sm text-[#4b454e] mt-0.5">
                Portfolio Summary: <strong className="text-[#1e1a24] font-semibold">8 Properties</strong> across Hargeisa & Berbera •{' '}
                <span className="text-[#25063e] font-bold">94.1% Occupancy</span>
              </p>
            </div>
          </div>

          {/* Quick Actions Group */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-xs border border-[#e8dfee] text-xs font-semibold text-[#1e1a24]">
              <span className="material-symbols-outlined text-[16px] text-[#4b454e] mr-1.5">calendar_today</span>
              <span>This Month (Oct 2026)</span>
            </div>
            <button
              onClick={() => alert("Downloading automated monthly tax and escrow reconciliation statement...")}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#eee5f4] text-[#1e1a24] hover:bg-[#e8dfee] transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1">file_download</span>
              Tax & Rent Report
            </button>
            <button
              onClick={() => onNavigate('add-listing')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-[#a23e18] text-white hover:bg-[#822801] transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1">add_business</span>
              + Add New Property
            </button>
          </div>
        </section>

        {/* KPI Metrics 5-Card Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-6">
          {/* Card 1: Monthly Rent */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Total Monthly Rent</span>
              <div className="w-8 h-8 rounded-lg bg-[#faf0ff] flex items-center justify-center text-[#25063e]">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Manrope'] text-2xl text-[#25063e] tracking-tight font-extrabold">
                {formatCurrency(28450, currency)}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-[#a23e18] font-bold">
                <span className="material-symbols-outlined text-[15px]">trending_up</span>
                <span>+12.4% vs Sep</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#faf0ff] text-[#4b454e] text-[11px]">
              Contracted billables (34 units)
            </div>
          </div>

          {/* Card 2: Collected */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Collected Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-[#faf0ff] flex items-center justify-center text-[#a23e18]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Manrope'] text-2xl text-[#1e1a24] tracking-tight font-extrabold">
                {formatCurrency(26200, currency)}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#25063e] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#a23e18] animate-pulse" />
                <span>92.0% Zaad / e-Dahab</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#faf0ff] text-[#4b454e] text-[11px]">
              30 of 32 billable units settled
            </div>
          </div>

          {/* Card 3: Pending / Overdue */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Pending / Overdue</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Manrope'] text-2xl text-[#ba1a1a] tracking-tight font-extrabold">
                {formatCurrency(2250, currency)}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-[#ba1a1a] font-bold">
                <span>2 Tenants Pending</span>
                <span className="px-1 py-0.2 bg-[#ffdad6] text-[#ba1a1a] rounded text-[10px]">Action req</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#faf0ff] text-[#4b454e] text-[11px]">
              Grace period expires in 48 hrs
            </div>
          </div>

          {/* Card 4: Occupancy Rate */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Occupancy Rate</span>
              <div className="w-8 h-8 rounded-lg bg-[#faf0ff] flex items-center justify-center text-[#25063e]">
                <span className="material-symbols-outlined text-[18px]">roofing</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Manrope'] text-2xl text-[#25063e] tracking-tight font-extrabold">94.1%</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-[#1e1a24] font-semibold">
                <span className="material-symbols-outlined text-[15px] text-[#a23e18]">domain</span>
                <span>32 of 34 Units Filled</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#faf0ff] text-[#4b454e] text-[11px]">
              2 Units ready for staging
            </div>
          </div>

          {/* Card 5: Maintenance */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e8dfee] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#4b454e] uppercase tracking-wider font-semibold">Maintenance</span>
              <div className="w-8 h-8 rounded-lg bg-[#faf0ff] flex items-center justify-center text-[#a23e18]">
                <span className="material-symbols-outlined text-[18px]">build_circle</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Manrope'] text-2xl text-[#1e1a24] tracking-tight font-extrabold">3 Active</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-[#a23e18] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#a23e18]" />
                <span>1 High Priority Inverter</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#faf0ff] text-[#4b454e] text-[11px]">
              Vendor on site today: 14:00
            </div>
          </div>
        </section>

        {/* Visual Analytics & Charts (60/40 Split) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Revenue & Collection Trends Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">
                    Rental Revenue & Collection Trends
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#faf0ff] text-[#1e1a24] border border-[#e8dfee]">
                    2026 YTD
                  </span>
                </div>
                <p className="text-xs text-[#4b454e] mt-0.5">Gross billed vs actual automated mobile cashflow</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#3b1e54]" />
                  <span className="text-[#4b454e]">Billed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#a23e18]" />
                  <span className="text-[#4b454e]">Collected</span>
                </div>
              </div>
            </div>

            {/* SVG Bar Chart */}
            <div className="w-full h-64 relative flex items-end pt-4 pb-2">
              <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 680 200">
                <line stroke="#e8dfee" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="680" y1="20" y2="20" />
                <line stroke="#e8dfee" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="680" y1="70" y2="70" />
                <line stroke="#e8dfee" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="680" y1="120" y2="120" />
                <line stroke="#cdc3cf" strokeWidth="1.5" x1="0" x2="680" y1="170" y2="170" />

                {/* May */}
                <rect fill="#3b1e54" height="110" rx="3" width="22" x="35" y="60" />
                <rect fill="#a23e18" height="104" rx="3" width="22" x="61" y="66" />
                {/* Jun */}
                <rect fill="#3b1e54" height="122" rx="3" width="22" x="145" y="48" />
                <rect fill="#a23e18" height="118" rx="3" width="22" x="171" y="52" />
                {/* Jul */}
                <rect fill="#3b1e54" height="132" rx="3" width="22" x="255" y="38" />
                <rect fill="#a23e18" height="126" rx="3" width="22" x="281" y="44" />
                {/* Aug */}
                <rect fill="#3b1e54" height="142" rx="3" width="22" x="365" y="28" />
                <rect fill="#a23e18" height="136" rx="3" width="22" x="391" y="34" />
                {/* Sep */}
                <rect fill="#3b1e54" height="146" rx="3" width="22" x="475" y="24" />
                <rect fill="#a23e18" height="140" rx="3" width="22" x="501" y="30" />
                {/* Oct (Current) */}
                <rect fill="#3b1e54" opacity="0.9" height="155" rx="3" width="22" x="585" y="15" />
                <rect fill="#a23e18" height="138" rx="3" width="22" x="611" y="32" />
                <circle fill="#fe8357" cx="622" cy="32" r="5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-[#4b454e] pt-1 px-2 font-mono">
              <span className="w-16 text-center">May</span>
              <span className="w-16 text-center">Jun</span>
              <span className="w-16 text-center">Jul</span>
              <span className="w-16 text-center">Aug</span>
              <span className="w-16 text-center">Sep</span>
              <span className="w-16 text-center font-bold text-[#25063e]">Oct '26</span>
            </div>

            <div className="mt-3 p-3 bg-[#faf0ff] rounded-xl flex items-center justify-between text-xs border border-[#e8dfee]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a23e18] text-[20px]">bolt</span>
                <span>Digital receipts recorded: <strong>$148,800 YTD</strong> via SomRent Automated Ledger</span>
              </div>
              <span className="text-[#25063e] font-bold">100% Tax Compliant</span>
            </div>
          </div>

          {/* Portfolio Occupancy Breakdown by City (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">Occupancy by Market</h2>
                <p className="text-xs text-[#4b454e]">Active asset allocation in Somaliland</p>
              </div>
              <span className="p-1 text-[#7c747f]">
                <span className="material-symbols-outlined text-[20px]">donut_small</span>
              </span>
            </div>

            {/* Donut Chart & Distribution */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
              <div className="relative w-36 h-36 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#eee5f4" strokeWidth="12" />
                  {/* Hargeisa 68% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#3b1e54" strokeWidth="12" strokeDasharray="162.35 238.76" strokeDashoffset="0" strokeLinecap="round" />
                  {/* Berbera 22% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#a23e18" strokeWidth="12" strokeDasharray="52.52 238.76" strokeDashoffset="-164.5" strokeLinecap="round" />
                  {/* Borama 10% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#fe8357" strokeWidth="12" strokeDasharray="23.87 238.76" strokeDashoffset="-219" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-['Manrope'] text-2xl font-extrabold text-[#25063e] leading-none">34</span>
                  <span className="text-[10px] text-[#4b454e] uppercase tracking-wider mt-0.5">Total Units</span>
                </div>
              </div>

              {/* Legend Stack */}
              <div className="flex flex-col gap-2 w-full text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#faf0ff] border border-[#e8dfee]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3b1e54]" />
                    <div>
                      <div className="font-semibold text-[#1e1a24]">Hargeisa Hub</div>
                      <div className="text-[11px] text-[#4b454e]">5 Properties • 23 Units</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#25063e]">68%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#faf0ff] border border-[#e8dfee]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#a23e18]" />
                    <div>
                      <div className="font-semibold text-[#1e1a24]">Berbera Commercial</div>
                      <div className="text-[11px] text-[#4b454e]">2 Properties • 8 Units</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#a23e18]">22%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#faf0ff] border border-[#e8dfee]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#fe8357]" />
                    <div>
                      <div className="font-semibold text-[#1e1a24]">Borama Residential</div>
                      <div className="text-[11px] text-[#4b454e]">1 Property • 3 Units</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#1e1a24]">10%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#4b454e] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#25063e]">location_city</span>
                Berbera Port Corridor expansion ready
              </span>
              <button onClick={() => onNavigate('marketplace')} className="text-[#a23e18] font-semibold hover:underline cursor-pointer">
                View Map →
              </button>
            </div>
          </div>
        </section>

        {/* Dual Workstream: Financial Ledger & Operations Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* Left Column: Recent Rent Payments Table (7 Cols) */}
          <div className="xl:col-span-7 bg-white rounded-2xl shadow-xs border border-[#e8dfee] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf0ff]/60 border-b border-[#e8dfee]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">Recent Rent Collections</h2>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eee5f4] text-[#1e1a24]">
                      Live Feed
                    </span>
                  </div>
                  <p className="text-xs text-[#4b454e]">Real-time settlement through Zaad & e-Dahab gateways</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-[#cdc3cf] text-xs font-semibold text-[#1e1a24] cursor-pointer"
                  >
                    <option value="all">All Methods</option>
                    <option value="zaad">Zaad Only</option>
                    <option value="edahab">e-Dahab Only</option>
                    <option value="wire">Bank Wire</option>
                  </select>
                  <button
                    onClick={() => alert("Exporting collections ledger as CSV format...")}
                    className="px-3 py-1.5 rounded-lg bg-[#25063e] text-white text-xs font-semibold hover:bg-[#3b1e54] transition-colors cursor-pointer"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {/* High-density Ledger Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf0ff] text-[#4b454e] uppercase tracking-wider font-semibold border-b border-[#e8dfee]">
                    <tr>
                      <th className="py-2.5 px-4">Tenant</th>
                      <th className="py-2.5 px-4">Unit / Property</th>
                      <th className="py-2.5 px-4">Amount</th>
                      <th className="py-2.5 px-4">Payment Method</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8dfee] text-[#1e1a24]">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#faf0ff]/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#3b1e54] text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {tx.tenantInitials}
                            </div>
                            <div>
                              <div className="font-bold text-[#1e1a24]">{tx.tenantName}</div>
                              <div className="text-[11px] text-[#4b454e]">{tx.tenantPhone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#25063e]">{tx.propertyName}</div>
                          <div className="text-[11px] text-[#4b454e]">{tx.unit}</div>
                        </td>
                        <td className="py-3 px-4 font-['Manrope'] font-bold text-sm text-[#25063e]">
                          {formatCurrency(tx.amountUsd, currency)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#1e1a24]">{tx.paymentMethod}</span>
                        </td>
                        <td className="py-3 px-4 text-[#4b454e]">{tx.dateStr}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              tx.status === 'Paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#fe8357]/20 text-[#a23e18]'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-[#faf0ff] flex items-center justify-between text-xs text-[#4b454e] border-t border-[#e8dfee]">
              <span>Showing latest {filteredTransactions.length} transactions of 32 this billing cycle</span>
              <button
                onClick={() => onNavigate('financials')}
                className="font-bold text-[#25063e] hover:text-[#a23e18] flex items-center gap-1 transition-colors cursor-pointer"
              >
                View Detailed Rent Ledger <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Operational Command, Tickets & Alerts (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            {/* Urgent Maintenance Alert Card */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e8dfee] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a23e18] animate-ping" />
                  <span className="text-xs uppercase tracking-wider text-[#a23e18] font-bold">
                    Priority Maintenance
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#fe8357]/20 text-[#a23e18] font-bold">
                  Ticket #MN-304
                </span>
              </div>
              <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Water Pump Inverter Fault</h3>
              <p className="text-xs text-[#4b454e] mt-1">
                Jigjiga Heights — Unit 4B & Rooftop Reservoir supply line pressure dropping.
              </p>

              <div className="my-3 p-3 bg-[#faf0ff] rounded-xl flex items-center justify-between border border-[#e8dfee]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#eee5f4] flex items-center justify-center text-[#25063e]">
                    <span className="material-symbols-outlined text-[20px]">engineering</span>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#4b454e]">Assigned Contractor</div>
                    <div className="text-xs font-bold text-[#1e1a24]">Horn Electric & Plumbing Ltd</div>
                  </div>
                </div>
                <span className="text-xs text-[#a23e18] font-bold">ETA: 14:30 Today</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+252634428110"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#25063e] text-white text-xs font-semibold hover:bg-[#3b1e54] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  Call Dispatcher
                </a>
                <button
                  onClick={() => alert("Ticket #MN-304: Diagnostic technician En Route. Replacement capacitor and inverter fuse dispatched.")}
                  className="py-2 px-3 rounded-lg bg-[#eee5f4] text-[#1e1a24] text-xs font-semibold hover:bg-[#e8dfee] transition-colors cursor-pointer"
                >
                  Ticket Details
                </button>
              </div>
            </div>

            {/* Upcoming Lease Expirations */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e8dfee] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#25063e] text-[20px]">history_edu</span>
                  <h3 className="font-['Manrope'] font-bold text-sm text-[#25063e]">Expiring Leases (30 Days)</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#eee5f4] text-[#1e1a24] font-bold">
                  2 Units
                </span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="p-3 rounded-xl bg-[#faf0ff] flex items-center justify-between border border-[#e8dfee]">
                  <div>
                    <div className="text-xs font-bold text-[#1e1a24]">Mohamed A. Barkhad</div>
                    <div className="text-[11px] text-[#4b454e]">Shacab Villa #3 • Ends Nov 14</div>
                  </div>
                  <button
                    onClick={() => {
                      alert("Automated lease renewal notice transmitted to Mohamed A. Barkhad via Zaad link.");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#a23e18] text-white text-xs font-semibold hover:bg-[#822801] transition-all cursor-pointer"
                  >
                    Send Renewal
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-[#faf0ff] flex items-center justify-between border border-[#e8dfee]">
                  <div>
                    <div className="text-xs font-bold text-[#1e1a24]">Khadar Nour Dualeh</div>
                    <div className="text-[11px] text-[#4b454e]">Mansoor Vista #104 • Ends Nov 22</div>
                  </div>
                  <button
                    onClick={() => onNavigate('agreements')}
                    className="px-3 py-1.5 rounded-lg bg-[#eee5f4] text-[#25063e] text-xs font-semibold hover:bg-[#e8dfee] transition-colors cursor-pointer"
                  >
                    Draft Agreement
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tenant Automated SMS Broadcast */}
            <div className="bg-[#25063e] text-white p-5 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#ffdbcf] uppercase tracking-wider font-bold">
                    Automated SMS Broadcast
                  </span>
                  <span className="material-symbols-outlined text-[#fe8357] text-[20px]">sms</span>
                </div>
                <h4 className="font-['Manrope'] font-bold text-base text-white">Rent Overdue Alerts</h4>
                <p className="text-xs text-[#cdc3cf] mt-1 leading-relaxed">
                  2 tenants have overdue invoices totaling <strong className="text-white font-semibold">$2,250</strong>. Dispatch pre-configured Zaad payment link.
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <button
                  onClick={handleBroadcastSms}
                  disabled={smsSending}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#a23e18] text-white text-xs font-bold hover:bg-[#822801] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {smsSending ? 'autorenew' : 'send'}
                  </span>
                  <span>{smsSending ? 'Dispatching SMS...' : 'Broadcast SMS Reminder (Zaad / e-Dahab)'}</span>
                </button>
                {smsSent && (
                  <p className="text-[11px] text-emerald-300 font-semibold text-center mt-2 animate-in fade-in">
                    ✓ Dispatched 2 SMS payment prompts via Telesom & Somtel gateways!
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Managed Properties Snapshot Mosaic */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-['Manrope'] font-bold text-base text-[#25063e]">Portfolio Assets Overview</h2>
              <p className="text-xs text-[#4b454e]">Active residential and logistics spaces under your management</p>
            </div>
            <button
              onClick={() => onNavigate('properties')}
              className="text-xs text-[#a23e18] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Manage All 8 Properties <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Property 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e8dfee] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden bg-[#faf0ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnKs7cYBAs7UFpEgth5MV4hc8VKHYSzUY05H-cl_ThAc2FwC7ktTEBFw46Oj156zc6AKdnJm87gnKUP5GiS_BAVbwpZ8RVaAGPMdpg9WJBJa6D7dNEKPkIOw9-OARmjQ39l8Sf2Jabzuby0-dmcuRBtibB7QkOBCy9ignLe838iTFy_BNcqi8Ylzucfxujo8BD0hWAIGL9q4uCw2joydqg652C1gvXb5b1e4p1KbSCT7VpvrcPoJ33"
                    alt="Jigjiga Heights"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#25063e]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-semibold">
                    Hargeisa • Jigjiga Yar
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[#25063e] text-[11px] font-bold shadow-xs">
                    100% Occupied
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Jigjiga Heights</h3>
                    <span className="font-['Manrope'] font-extrabold text-base text-[#25063e]">
                      {formatCurrency(12400, currency)}
                      <span className="text-[11px] font-normal text-[#4b454e]">/mo</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#4b454e] mt-1">12 Executive Apartments • Water Inverter Installed</p>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2 flex items-center justify-between text-[#4b454e] text-xs border-t border-[#e8dfee]">
                <span>12 of 12 Units Active</span>
                <span className="text-[#a23e18] font-bold">0 Arrears</span>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e8dfee] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden bg-[#faf0ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBC6913uPxX9SupPQXREyZ3GRt4o6B_1DQo-h_fQMIbDwxDiRwT7bek_PNGG3fBPhLyjs4bwixGmHXuZBo6q6nhU4x19v2JVdV_ckWQvPZWJjNQDNAaG0Cot0BLmqvSey9i2nvpWGe2VtV6owvPs4dWykqDlAggpvePlK5BobuR8hErcBCXvhJCmBJ_ix3q-Sk_ipHr135-7qbGdEvmmZYBM802nmdK2zOaG4ERZj8T22Ooevr8ENW"
                    alt="Mansoor Vista Suites"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#25063e]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-semibold">
                    Hargeisa • Mansoor
                  </div>
                  <div className="absolute top-3 right-3 bg-[#fe8357]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-xs">
                    1 Vacancy (Staging)
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Mansoor Vista Suites</h3>
                    <span className="font-['Manrope'] font-extrabold text-base text-[#25063e]">
                      {formatCurrency(9200, currency)}
                      <span className="text-[11px] font-normal text-[#4b454e]">/mo</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#4b454e] mt-1">10 Modern Flats • Fiber Internet • Solar Backup</p>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2 flex items-center justify-between text-[#4b454e] text-xs border-t border-[#e8dfee]">
                <span>9 of 10 Units Active</span>
                <span className="text-[#25063e] font-semibold">1 Open Viewing</span>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e8dfee] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden bg-[#faf0ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzpttG5XwnHHmHXjeuqPbCcixQDSJk1eCfTWjbuR-dhIxTGUsBloRYAQeCwhgm8BRzgIdUBpeXZRG8RO6R892NsufT7dO1d9vrBOkTcoFW5eQkKb0LyE1SQEmpiyZ6KZC6Mpk9RLoBZqdVJ15KwEkGQ1Z_uq7opjeMIEMD1IG1sJcBCxj5k91BCStt4WCld1GFJdPkJ6_ns8gZ_IA64sr_LJE7I4M9lpmVZCNe1sq6WYhVTF4Xinde"
                    alt="Red Sea Logistics Yard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#25063e]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-semibold">
                    Berbera • Port Corridor
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[#25063e] text-[11px] font-bold shadow-xs">
                    100% Leased
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Manrope'] font-bold text-base text-[#25063e]">Red Sea Logistics Yard</h3>
                    <span className="font-['Manrope'] font-extrabold text-base text-[#25063e]">
                      {formatCurrency(6850, currency)}
                      <span className="text-[11px] font-normal text-[#4b454e]">/mo</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#4b454e] mt-1">4 Commercial Warehouses • 8 Office Suites</p>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2 flex items-center justify-between text-[#4b454e] text-xs border-t border-[#e8dfee]">
                <span>8 of 8 Units Active</span>
                <span className="text-[#a23e18] font-bold">Long-term Leases</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
