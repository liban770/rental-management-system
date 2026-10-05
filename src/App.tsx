/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Currency } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { MarketplaceView } from './views/MarketplaceView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { OwnerDashboardView } from './views/OwnerDashboardView';
import { AddListingView } from './views/AddListingView';
import { TenantPortalView } from './views/TenantPortalView';
import { TenancyAgreementView } from './views/TenancyAgreementView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('palms-villa');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Zaad Rent Collection Confirmed',
      message: 'Hassan Farah deposited $1,250 USD for Unit 4B via Zaad Mobile Escrow.',
      time: '12m ago',
      unread: true,
      tag: 'Payment',
    },
    {
      id: 'notif-2',
      title: 'Cadastral Deed Verification Stamp',
      message: 'Ministry Cadastre approved deed registration for Jigjiga Heights #CAD-8841B.',
      time: '2h ago',
      unread: true,
      tag: 'Legal',
    },
    {
      id: 'notif-3',
      title: 'Solar Inverter Inspection Scheduled',
      message: 'Sompower certified technician assigned for Mansoor Vista.',
      time: '1d ago',
      unread: false,
      tag: 'Maintenance',
    },
  ]);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedPropertyId]);

  const handleNavigate = (tab: string, propertyId?: string) => {
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    // Normalize aliases
    if (tab === 'properties') {
      setCurrentTab('marketplace');
    } else if (tab === 'owner' || tab === 'financials') {
      setCurrentTab('owner-dashboard');
    } else if (tab === 'tenant') {
      setCurrentTab('tenant-portal');
    } else if (tab === 'agreement' || tab === 'contract') {
      setCurrentTab('agreements');
    } else {
      setCurrentTab(tab);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8fc] text-[#1b1b1f] selection:bg-[#49007a] selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyToggle={setCurrency}
        notificationCount={unreadCount}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Quick Screen Selector Toolbar (Floating bottom-left pill for rapid screen switching & previewing all 7 design screens) */}
      <div className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur-md border border-[#e8dfee] shadow-xl rounded-2xl p-1.5 hidden md:flex items-center gap-1">
        <span className="text-[10px] font-bold text-[#7c7389] uppercase tracking-wider px-2 select-none">
          Screens:
        </span>
        <button
          onClick={() => handleNavigate('home')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'home'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavigate('marketplace')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'marketplace'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => handleNavigate('detail', 'palms-villa')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'detail'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Property Detail
        </button>
        <button
          onClick={() => handleNavigate('owner-dashboard')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'owner-dashboard'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Owner Dashboard
        </button>
        <button
          onClick={() => handleNavigate('add-listing')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'add-listing'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          + Add Listing
        </button>
        <button
          onClick={() => handleNavigate('tenant-portal')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'tenant-portal'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Tenant Portal
        </button>
        <button
          onClick={() => handleNavigate('agreements')}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
            currentTab === 'agreements'
              ? 'bg-[#49007a] text-white shadow-xs'
              : 'text-[#5a5462] hover:bg-[#f6eeff]'
          }`}
        >
          Lease Agreement
        </button>
      </div>

      {/* Main View Area */}
      <main className="flex-1 pt-20">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} currency={currency} />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceView onNavigate={handleNavigate} currency={currency} />
        )}

        {currentTab === 'detail' && (
          <PropertyDetailView
            propertyId={selectedPropertyId}
            onNavigate={handleNavigate}
            currency={currency}
          />
        )}

        {currentTab === 'owner-dashboard' && (
          <OwnerDashboardView onNavigate={handleNavigate} currency={currency} />
        )}

        {currentTab === 'add-listing' && (
          <AddListingView onNavigate={handleNavigate} />
        )}

        {currentTab === 'tenant-portal' && (
          <TenantPortalView onNavigate={handleNavigate} currency={currency} />
        )}

        {currentTab === 'agreements' && (
          <TenancyAgreementView onNavigate={handleNavigate} currency={currency} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Notification Slide-Over Drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-6 border-b border-[#e8dfee] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#1b1b1f]">SomRent Notifications</h3>
                <p className="text-xs text-[#7c7389]">
                  {unreadCount} unread cadastral & mobile payment alert{unreadCount === 1 ? '' : 's'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-semibold text-[#49007a] hover:underline"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-8 h-8 rounded-full bg-[#f6eeff] text-[#7c7389] hover:text-[#1b1b1f] flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    n.unread
                      ? 'bg-[#fcf8fc] border-[#d2c2d8]'
                      : 'bg-white border-[#f0e8f4]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#eee5f4] text-[#49007a]">
                      {n.tag}
                    </span>
                    <span className="text-[11px] text-[#7c7389]">{n.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1b1b1f] mb-1">{n.title}</h4>
                  <p className="text-xs text-[#5a5462] leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[#e8dfee] bg-[#faf5fc]">
              <button
                onClick={() => {
                  setShowNotifications(false);
                  handleNavigate('owner-dashboard');
                }}
                className="w-full py-2.5 bg-[#49007a] hover:bg-[#380060] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                View Full Owner Activity Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
