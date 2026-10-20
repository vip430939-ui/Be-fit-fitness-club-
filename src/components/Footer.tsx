import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Shield, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin, onOpenEnquiry }) => {
  return (
    <footer className="bg-[#050608] text-neutral-400 border-t border-white/10 pt-16 pb-24 lg:pb-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo size="lg" className="mb-4" />
            <p className="text-xs text-neutral-400 leading-relaxed mb-6 max-w-sm">
              Premier athletic training facility located at Zeal College Chowk, Narhe, Pune. Dedicated to
              strength, progressive resistance conditioning, and building a disciplined community.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${settings.cleanPhone}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#25D366] transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#BEF264] transition-colors"
                title="Call Be Fit"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={settings.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#BEF264] mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-white transition-colors">
                  Training & Facilities
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-white transition-colors">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Member Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#BEF264] mb-4 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Operating Hours</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white">Monday – Saturday</span>
                <span className="text-neutral-300">5:15 AM – 10:15 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white">Sunday</span>
                <span className="text-[#BEF264]">8:00 AM – 12:00 PM</span>
              </div>
              <div className="text-[11px] text-neutral-500 pt-1">
                Indian Standard Time (IST) · Narhe, Pune
              </div>
            </div>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#BEF264] mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Club Address</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              {settings.address},<br />
              {settings.cityStatePincode}
            </p>
            <p className="text-xs text-neutral-400 mb-4">
              Phone:{' '}
              <a href={`tel:${settings.phone}`} className="text-white hover:text-[#BEF264] font-mono">
                {settings.phone}
              </a>
            </p>
            <button
              onClick={onOpenEnquiry}
              className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Enquire Membership
            </button>
          </div>
        </div>

        {/* Bottom bar with quiet legal notice & Staff portal trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-neutral-500">Narhe · Pune · Maharashtra</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors py-1"
            >
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
              <span>Staff & Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
