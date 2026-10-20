import React from 'react';
import { Phone, Navigation, MessageSquare } from 'lucide-react';
import { SiteSettings } from '../types';

interface MobileActionBarProps {
  settings: SiteSettings;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ settings }) => {
  const whatsAppUrl = `https://wa.me/${settings.cleanPhone}?text=${encodeURIComponent(
    settings.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0A0C10]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      {/* Call Now */}
      <a
        href={`tel:${settings.phone}`}
        className="flex-1 py-2 px-2 rounded-lg bg-white/10 active:bg-white/20 text-white flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#BEF264]" />
        <span>Call Now</span>
      </a>

      {/* Get Directions */}
      <a
        href={settings.googleMapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-2 rounded-lg bg-white/10 active:bg-white/20 text-white flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
      >
        <Navigation className="w-3.5 h-3.5 text-[#BEF264]" />
        <span>Directions</span>
      </a>

      {/* WhatsApp Enquiry */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-2 rounded-lg bg-[#25D366] active:bg-[#1fa952] text-black flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-black" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
