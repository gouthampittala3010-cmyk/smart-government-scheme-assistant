import React from 'react';
import { Building2, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-lg">GovScheme AI</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              An intelligent, transparent assistance platform connecting Indian citizens with Central and State government welfare schemes through automated rule-based and AI eligibility matching.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-md inline-block">
              <ShieldCheck className="w-4 h-4 inline mr-1 text-emerald-600" />
              Direct Benefit Transfer (DBT) Aligned
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/" className="hover:text-indigo-600 transition-colors">Home Portal</a></li>
              <li><a href="/schemes" className="hover:text-indigo-600 transition-colors">All Government Schemes</a></li>
              <li><a href="/eligibility" className="hover:text-indigo-600 transition-colors">Eligibility Calculator</a></li>
              <li><a href="/profile" className="hover:text-indigo-600 transition-colors">Citizen Demographics Profile</a></li>
            </ul>
          </div>

          {/* Column 3: Schemes by Category */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3 uppercase tracking-wider">Key Sectors</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><span className="cursor-pointer hover:text-indigo-600">Agriculture & Farmers Welfare</span></li>
              <li><span className="cursor-pointer hover:text-indigo-600">Healthcare & Ayushman Bharat</span></li>
              <li><span className="cursor-pointer hover:text-indigo-600">Education & National Scholarships</span></li>
              <li><span className="cursor-pointer hover:text-indigo-600">Housing & Urban/Gramin Shelter</span></li>
              <li><span className="cursor-pointer hover:text-indigo-600">Micro-Enterprise & Mudra Loans</span></li>
            </ul>
          </div>

          {/* Column 4: Helplines & Portals */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3 uppercase tracking-wider">National Portals</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <span>PM-KISAN Samman Nidhi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmjay.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <span>Ayushman Bharat PM-JAY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© 2026 AI-Based Government Scheme Eligibility & Assistance System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Spring Boot 3, React, and MySQL for Indian Citizens
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
