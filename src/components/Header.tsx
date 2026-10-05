import React, { useState } from 'react';
import { Currency } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, propertyId?: string) => void;
  currency: Currency;
  onCurrencyToggle: (currency: Currency) => void;
  notificationCount?: number;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currency,
  onCurrencyToggle,
  notificationCount = 2,
  onOpenNotifications
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'properties', label: 'Properties' },
    { id: 'owner-dashboard', label: 'Owner Dashboard' },
    { id: 'tenant-portal', label: 'Tenant Portal' },
    { id: 'agreements', label: 'Agreements' },
    { id: 'financials', label: 'Financials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fef7ff]/85 backdrop-blur-xl border-b border-[#e8dfee]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <img
              alt="SomRent Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XbGECjaJ9lSv4FEL9vDoiJIWZtzi3LmP55Fu80VSoVVlh6SdD7Qx4wiDgsvwWf3rR5u5Vh1WqfBW2Qb9E1VhWFUtv8jMBBV-aaH-X4cHVJILdqzA7RVmQIvASsISQMw6Vm-8Q2g1AlfTFUOGUfmiLww-Qpeq0xS-x1YFdIuTcqeTN7Ixna99m6MJ17UBOkZEcDERuc5hHe32uzUa-Sa3r80HvC1iq3aSp4T9aD5Lx4i5vA3QtEZeCimio"
            />
            <span className="font-['Manrope'] font-bold text-xl text-[#25063e] tracking-tight group-hover:text-[#a23e18] transition-colors">
              SomRent
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#eee5f4] text-[#1e1a24] font-semibold shadow-xs'
                      : 'text-[#4b454e] hover:bg-[#f4ebfa] hover:text-[#1e1a24]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Currency, Notification, Add Listing, Profile */}
        <div className="flex items-center gap-3">
          {/* Dual Currency Switcher */}
          <div className="flex items-center bg-[#eee5f4] p-0.5 rounded-full border border-[#cdc3cf]/40 shadow-xs">
            <button
              onClick={() => onCurrencyToggle('USD')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-[#25063e] shadow-xs'
                  : 'text-[#4b454e] hover:text-[#1e1a24]'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => onCurrencyToggle('SLSH')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currency === 'SLSH'
                  ? 'bg-white text-[#25063e] shadow-xs'
                  : 'text-[#4b454e] hover:text-[#1e1a24]'
              }`}
            >
              SL Sh
            </button>
          </div>

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-[#4b454e] hover:bg-[#eee5f4] hover:text-[#1e1a24] transition-colors cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#a23e18] ring-2 ring-white" />
            )}
          </button>

          {/* Add Listing Button */}
          <button
            onClick={() => onNavigate('add-listing')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-[#a23e18] text-white hover:bg-[#822801] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">add_circle</span>
            Add Listing
          </button>

          {/* Profile Badge */}
          <div
            onClick={() => onNavigate(currentTab === 'tenant-portal' ? 'tenant-portal' : 'owner-dashboard')}
            className="flex items-center gap-2 pl-1 cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#cdc3cf] group-hover:ring-[#a23e18] transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwSGCCnwcpbJXrpzQKI3Oe2jGSYufZmfgC2OdtRkTZxwokqrBgukYt1lOuqbY4ZmUxVSQDzlDuIQdyzE_9itvYRchjag5zAxbWvSovb5lNRQBnM5gl_PHsOXmWbbXpDlP8MujftgaiLZCsq5XUIJmWpgbGGcQFkfgyA3WrweHnpmoRG2yk2HNT3afuXV29lvaJnIeVurMKTpvfbPjbl6140hXi8rW63jHEangYPzL_DAYgR9mEWwRH"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#1e1a24] leading-tight group-hover:text-[#a23e18] transition-colors">
                Ahmed M.
              </span>
              <span className="text-[11px] text-[#4b454e] leading-tight">
                Verified Owner
              </span>
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#1e1a24] hover:bg-[#eee5f4] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#e8dfee] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left rounded-lg text-sm ${
                  currentTab === item.id
                    ? 'bg-[#eee5f4] text-[#25063e] font-bold'
                    : 'text-[#4b454e] hover:bg-[#f4ebfa]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              onNavigate('add-listing');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#a23e18] text-white text-sm font-semibold shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Rental Listing
          </button>
        </div>
      )}
    </header>
  );
};
