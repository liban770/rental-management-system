import React from 'react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white border-t border-[#e8dfee] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                alt="SomRent Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XbGECjaJ9lSv4FEL9vDoiJIWZtzi3LmP55Fu80VSoVVlh6SdD7Qx4wiDgsvwWf3rR5u5Vh1WqfBW2Qb9E1VhWFUtv8jMBBV-aaH-X4cHVJILdqzA7RVmQIvASsISQMw6Vm-8Q2g1AlfTFUOGUfmiLww-Qpeq0xS-x1YFdIuTcqeTN7Ixna99m6MJ17UBOkZEcDERuc5hHe32uzUa-Sa3r80HvC1iq3aSp4T9aD5Lx4i5vA3QtEZeCimio"
              />
              <span className="font-['Manrope'] font-bold text-lg text-[#25063e]">
                SomRent Property Cloud
              </span>
            </div>
            <p className="text-sm text-[#4b454e] max-w-sm leading-relaxed">
              Enterprise property governance, high-trust leasing ledgers, and digital tenancy management tailored for Somaliland's real estate ecosystem.
            </p>
            <div className="inline-flex items-center gap-2.5 mt-2 p-2.5 rounded-xl bg-[#faf0ff] border border-[#e8dfee] max-w-xs shadow-xs">
              <span className="material-symbols-outlined text-[#a23e18] text-[22px]">verified</span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#1e1a24]">
                  Ministry of Public Works Certified
                </span>
                <span className="text-[11px] text-[#4b454e]">SL-REG #88492</span>
              </div>
            </div>
          </div>

          {/* Regional Hubs */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#25063e]">
              Regional Hubs
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#4b454e]">
              <li>
                <strong className="text-[#1e1a24]">Hargeisa:</strong> Jigjiga Yar, Airport Rd
              </li>
              <li>
                <strong className="text-[#1e1a24]">Berbera:</strong> Port Maritime Plaza
              </li>
              <li>
                <strong className="text-[#1e1a24]">Borama:</strong> Amoud Commercial Area
              </li>
              <li>
                <a href="mailto:support@somrent.so" className="text-[#a23e18] hover:underline">
                  support@somrent.so
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#25063e]">
              Platform
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#4b454e]">
              <button
                onClick={() => onNavigate('marketplace')}
                className="text-left hover:text-[#a23e18] transition-colors cursor-pointer"
              >
                Marketplace
              </button>
              <button
                onClick={() => onNavigate('properties')}
                className="text-left hover:text-[#a23e18] transition-colors cursor-pointer"
              >
                Property Registry
              </button>
              <button
                onClick={() => onNavigate('agreements')}
                className="text-left hover:text-[#a23e18] transition-colors cursor-pointer"
              >
                Digital Contracts
              </button>
              <button
                onClick={() => onNavigate('financials')}
                className="text-left hover:text-[#a23e18] transition-colors cursor-pointer"
              >
                Multi-Currency Escrow
              </button>
              <button
                onClick={() => onNavigate('guarantor')}
                className="text-left hover:text-[#a23e18] transition-colors cursor-pointer"
              >
                Guarantor Witness Portal
              </button>
            </nav>
          </div>

          {/* Compliance & Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#25063e]">
              Compliance & Legal
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#4b454e]">
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Somaliland Civil Tenancy Code (Law No. 28/2014) standard lease terms apply."); }} className="hover:text-[#a23e18] transition-colors">
                Terms of Tenancy
              </a>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Compliant with Somaliland PropTech Data Protection Directive."); }} className="hover:text-[#a23e18] transition-colors">
                Data Protection
              </a>
              <a href="#deed-verification" onClick={(e) => { e.preventDefault(); onNavigate('agreements'); }} className="hover:text-[#a23e18] transition-colors">
                Deed Verification Policy
              </a>
              <a href="#arbitration" onClick={(e) => { e.preventDefault(); alert("Maroodi Jeex Regional Court and Somaliland Chamber of Commerce tribunal arbitration protocol."); }} className="hover:text-[#a23e18] transition-colors">
                Tribunal Arbitration
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#e8dfee] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4b454e]">
          <span>© 2025 SomRent Technologies Ltd. All rights reserved. Somaliland PropTech Division.</span>
          <div className="flex items-center gap-2">
            <span>USD / SLSH Live FX Feed Enabled (1 USD = 8,500 SL Sh)</span>
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};
