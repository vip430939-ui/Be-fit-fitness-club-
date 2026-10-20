import React from 'react';
import { MapPin, Clock, Star, ArrowUpRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';
import { ThreeDPlate } from './ThreeDPlate';

interface HeroProps {
  settings: SiteSettings;
  onOpenEnquiry: () => void;
  statusText: string;
  isOpen: boolean;
}

export const Hero: React.FC<HeroProps> = ({ settings, onOpenEnquiry, statusText, isOpen }) => {
  return (
    <section
      id="overview"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#08090C]"
    >
      {/* Background Cinematic Photography with Rich Dark Scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_gym_cinematic_1792466125912.jpg"
          alt="Be Fit Fitness Club Interior in Narhe Pune"
          className="w-full h-full object-cover object-center scale-105 filter brightness-60 contrast-110 motion-safe:animate-[pulse_14s_ease-in-out_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark radial & vertical scrim gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090C] via-[#08090C]/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(190,242,100,0.12),transparent_70%)]" />

        {/* Ambient subtle light streak */}
        <div className="absolute top-1/4 left-0 w-96 h-1 bg-gradient-to-r from-transparent via-[#BEF264]/40 to-transparent blur-sm rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy - 7 Cols on desktop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Location & Status Kicker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-300 mb-6 bg-black/50 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="flex items-center gap-1.5 text-[#BEF264] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                {settings.landmark}, Narhe
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5 font-mono">
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#BEF264]' : 'bg-amber-400'}`} />
                {statusText}
              </span>
            </div>

            {/* Marquee Bold Headline */}
            <h1
              className="font-athletic font-black uppercase text-white tracking-tight leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#BEF264] to-[#A3E635] drop-shadow-[0_0_35px_rgba(190,242,100,0.3)]">
                STRONGER SELF.
              </span>
            </h1>

            {/* Supporting Headline & Value Proposition */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-neutral-200 mb-3">
              {settings.subTagline}
            </p>

            <p className="text-sm sm:text-base text-neutral-300/90 max-w-xl leading-relaxed mb-8">
              Narhe’s premier training facility at Zeal College Chowk. Equipped with calibrated Olympic
              barbells, heavy free weights, selectorized resistance machines, dedicated cardio zones, and
              certified personal coaching for beginners to elite lifters.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#memberships"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider text-black bg-[#BEF264] hover:bg-[#d4f982] rounded-lg transition-all duration-200 shadow-[0_0_25px_rgba(190,242,100,0.35)] hover:shadow-[0_0_35px_rgba(190,242,100,0.55)] hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                Explore Memberships
              </a>

              <a
                href={settings.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold tracking-wide text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-4 h-4 text-[#BEF264]" />
              </a>
            </div>

            {/* Proof Metric Strip (Owner Supplied Verification) */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-white font-mono font-bold text-2xl tracking-tight">
                  <Star className="w-5 h-5 fill-[#BEF264] text-[#BEF264]" />
                  <span>{settings.googleRating}</span>
                  <span className="text-xs text-neutral-500 font-normal">/ 5.0</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {settings.reviewCount}+ Google Reviews
                </div>
              </div>

              <div>
                <div className="text-white font-mono font-bold text-2xl tracking-tight">
                  5:15 AM
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Early Morning Open (Mon–Sat)
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-[#BEF264] font-mono font-bold text-2xl tracking-tight flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-[#BEF264]" />
                  <span>Operational</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Zeal College Chowk, Narhe
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Asset & Club Highlights Card - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Interactive 3D Plate Component */}
            <div className="mb-6">
              <ThreeDPlate />
            </div>

            {/* Floating Club Key Highlights Panel */}
            <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#BEF264]/10 rounded-full filter blur-xl pointer-events-none" />
              <div className="text-xs font-mono uppercase tracking-widest text-[#BEF264] mb-2">
                Facility Standards
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                  <span>Certified personal trainers on-site for daily guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                  <span>High-poundage free weights, dumbbells & cable machines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                  <span>Dedicated gender-neutral and standard clean restrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                  <span>Google Pay, NFC tap payments & credit cards accepted</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth scroll down indicator */}
      <a
        href="#training"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors"
        aria-label="Scroll down to training section"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#BEF264]" />
      </a>
    </section>
  );
};
