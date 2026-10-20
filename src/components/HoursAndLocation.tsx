import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { DailySchedule, SiteSettings } from '../types';
import { getCurrentStatusInPune } from '../utils/hours';

interface HoursAndLocationProps {
  settings: SiteSettings;
  schedule: DailySchedule[];
}

export const HoursAndLocation: React.FC<HoursAndLocationProps> = ({ settings, schedule }) => {
  const [copied, setCopied] = useState(false);
  const status = getCurrentStatusInPune(schedule);

  const fullAddress = `${settings.address}, ${settings.cityStatePincode}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Determine current day of week in IST to highlight
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
  });
  const currentDayName = istFormatter.format(new Date());

  return (
    <section id="location" className="py-24 bg-[#0B0D11] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
            Visit Be Fit Fitness Club
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LOCATION & <span className="text-[#BEF264]">OPERATING HOURS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Location Card & Contact Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Address Card */}
            <div className="p-7 rounded-2xl bg-[#0F1115] border border-white/10 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#BEF264]">
                  <MapPin className="w-4 h-4 text-[#BEF264]" />
                  <span>Physical Address</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-white/5 px-2.5 py-1 rounded transition-colors"
                  title="Copy full address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#BEF264]" />
                      <span className="text-[#BEF264]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xl font-bold text-white mb-2 leading-snug">
                {settings.businessName}
              </div>
              <div className="text-sm text-neutral-300 mb-2 leading-relaxed">
                {settings.address}
              </div>
              <div className="text-sm text-neutral-400 font-mono mb-4">
                {settings.cityStatePincode}
              </div>

              {/* Landmark Highlight */}
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#BEF264]" />
                <span>
                  Key Landmark: <strong className="text-white">{settings.landmark}</strong> (Near Zeal Education Campus)
                </span>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={settings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#BEF264] hover:bg-[#d4f982] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
                <a
                  href={`tel:${settings.phone}`}
                  className="py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#BEF264]" />
                  <span>Call Gym</span>
                </a>
              </div>
            </div>

            {/* Live Status & Opening Hours Card */}
            <div className="p-7 rounded-2xl bg-[#0F1115] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BEF264]">
                  <Clock className="w-4 h-4 text-[#BEF264]" />
                  <span>Club Schedule</span>
                </div>
                {/* Live Open/Closed badge */}
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? 'bg-[#BEF264]' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-white font-bold">{status.statusLabel}</span>
                </div>
              </div>

              {/* Today's Hours Highlight */}
              <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10 text-xs flex justify-between items-center">
                <span className="text-neutral-400">Current Local Time:</span>
                <span className="font-mono text-white font-bold">
                  {status.currentTimeInPune} IST (Pune)
                </span>
              </div>

              {/* Schedule Table */}
              <div className="space-y-2 mb-4">
                {schedule.map((slot) => {
                  const isToday = slot.day.toLowerCase() === currentDayName.toLowerCase();
                  return (
                    <div
                      key={slot.day}
                      className={`flex justify-between items-center py-1.5 px-3 rounded-md text-xs font-mono ${
                        isToday
                          ? 'bg-[#BEF264]/10 text-white border border-[#BEF264]/30'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <span className={`font-sans ${isToday ? 'font-bold text-[#BEF264]' : ''}`}>
                        {slot.day} {isToday && '· Today'}
                      </span>
                      <span>
                        {slot.openTime === '05:15'
                          ? '5:15 AM – 10:15 PM'
                          : `${slot.openTime} – ${slot.closeTime}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-neutral-400 text-center">
                Status calculated in Asia/Kolkata timezone based on listed hours.
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Directions Interactive View (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#12151B]">
              <iframe
                title="Be Fit Fitness Club Map Location"
                src={settings.googleMapsEmbedUrl}
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-125"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating map quick launcher */}
              <div className="absolute top-4 right-4 z-10">
                <a
                  href={settings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/85 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white hover:text-[#BEF264] border border-white/20 shadow-lg transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#BEF264]" />
                </a>
              </div>
            </div>

            {/* Transport & Access Notes */}
            <div className="mt-4 p-4 rounded-xl bg-[#0F1115] border border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
              <span>Located on the main Zeal College Road intersection in Narhe.</span>
              <span className="text-[#BEF264] font-mono">Dedicated parking available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
