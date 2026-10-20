import React, { useState } from 'react';
import { ArrowUpRight, Dumbbell, Activity, Flame, ShieldCheck, Zap } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const publishedServices = services.filter((s) => s.published);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="training" className="py-24 bg-[#08090C] relative border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#BEF264]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
              Comprehensive Facility & Disciplines
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              TRAIN STRONG. <span className="text-[#BEF264]">MOVE BETTER.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
            Every square foot at Be Fit is engineered for purpose. From heavy Olympic iron to high-traction
            turf sprint tracks, we provide certified coaching across every discipline.
          </p>
        </div>

        {/* Dynamic Bento & Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service, index) => {
            const isMarquee = index === 0; // First service takes span-2 on wide screens or distinct highlight
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-2xl bg-[#0F1115] border border-white/10 hover:border-[#BEF264]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isMarquee ? 'lg:col-span-2' : 'col-span-1'
                } hover:-translate-y-1.5 shadow-xl`}
              >
                {/* Image Container with Ambient Gradient Scrim */}
                <div className={`relative w-full ${isMarquee ? 'h-64 sm:h-72' : 'h-52'} overflow-hidden bg-neutral-900`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-85"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/40 to-transparent" />

                  {/* Clean unboxed category kicker */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BEF264] bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span>{service.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-2 group-hover:text-[#BEF264] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-xs text-neutral-300 bg-white/5 border border-white/10 rounded px-2.5 py-1"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">
                      On-site coaching included
                    </span>
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#BEF264] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Enquire Training</span>
                      <ArrowUpRight className="w-4 h-4 text-[#BEF264]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
