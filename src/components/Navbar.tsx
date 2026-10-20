import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Shield, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { getCurrentStatusInPune } from '../utils/hours';
import { GymStorage } from '../services/storage';

interface NavbarProps {
  onOpenEnquiry: (planName?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(() =>
    getCurrentStatusInPune(GymStorage.getSchedule(), GymStorage.getHolidays())
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh open/closed status every minute
    const interval = setInterval(() => {
      setStatus(getCurrentStatusInPune(GymStorage.getSchedule(), GymStorage.getHolidays()));
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Training', href: '#training' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#08090C]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Monogram */}
          <a
            href="#overview"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Be Fit Fitness Club Home"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Text Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#BEF264] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#BEF264] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Status Pill */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Real-time schedule indicator (desktop only) */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-[#BEF264]' : 'bg-amber-400'
                }`}
              />
              <span className="text-white font-medium">{status.statusLabel}</span>
              <span className="text-neutral-500">·</span>
              <span>{status.currentTimeInPune} IST</span>
            </div>

            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2 text-sm font-bold tracking-wide uppercase text-black bg-[#BEF264] hover:bg-[#d4f982] rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(190,242,100,0.3)] hover:shadow-[0_0_28px_rgba(190,242,100,0.5)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 active:translate-y-0"
            >
              Enquire Now
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <Logo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Real-time hours banner inside drawer */}
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#BEF264]" />
              <span className="text-white font-semibold">{status.statusLabel}</span>
              <span className="text-neutral-400">({status.detailLabel})</span>
            </div>
            <span className="font-mono text-neutral-400">{status.currentTimeInPune}</span>
          </div>

          <nav className="flex flex-col gap-4 mt-6 text-lg font-medium text-neutral-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#BEF264] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3.5 text-center font-bold tracking-wide uppercase text-black bg-[#BEF264] hover:bg-[#d4f982] rounded-lg shadow-lg"
            >
              Membership Enquiry
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
              <a
                href="tel:+918975897171"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#BEF264]" />
                Call Gym
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
              >
                <Shield className="w-3.5 h-3.5 text-neutral-400" />
                Staff Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
