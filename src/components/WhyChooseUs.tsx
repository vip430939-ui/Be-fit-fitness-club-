import React from 'react';
import {
  ShieldCheck,
  Users,
  Sparkles,
  Wifi,
  CreditCard,
  DoorOpen,
  Check,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Certified On-Site Trainers',
      description:
        'Professional coaches on the gym floor at all times to correct lifting form, structure workout routines, and ensure beginner and veteran members train safely.',
    },
    {
      title: 'Beginner-Friendly Environment',
      description:
        'We actively eliminate gym intimidation with warm staff assistance, comprehensive equipment induction, and a respectful, non-judgmental atmosphere.',
    },
    {
      title: 'Rigorous Hygiene & Maintenance',
      description:
        'Cleanliness is non-negotiable. Equipment, barbells, dumbbells, and benches are regularly sanitized and maintained for high reliability.',
    },
    {
      title: 'Supportive Fitness Community',
      description:
        'Workout alongside motivated college students, working professionals, and seasoned athletes in Narhe who push each other toward consistent discipline.',
    },
    {
      title: 'Convenient Modern Amenities',
      description:
        'High-speed free Wi-Fi for your workout playlists, gender-neutral and standard clean restrooms, and secure on-site personal lockers.',
    },
    {
      title: 'Flexible & Modern Payments',
      description:
        'Seamless front-desk payments supporting Google Pay, UPI, NFC contactless mobile payments, credit cards, and debit cards.',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0D11] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story & Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/src/assets/images/gym_interior_atmosphere_1792466127490.jpg"
                alt="Be Fit Fitness Club Training Floor Atmosphere"
                className="w-full h-full object-cover filter brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-transparent" />
              
              {/* Floating trust badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="text-[#BEF264] text-xs font-mono uppercase tracking-widest mb-1">
                  Narhe Fitness Community
                </div>
                <div className="text-white text-sm font-semibold">
                  Viraj Complex · Right at Zeal College Chowk
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars Grid */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
              The Be Fit Standard
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WHERE DISCIPLINE MEETS <span className="text-[#BEF264]">COMMUNITY.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-10">
              Be Fit Fitness Club was built to give the Narhe and Zeal College neighborhood a true,
              professional training home. We prioritize genuine lifting equipment, real coaching guidance,
              and a motivating space where anyone can build their strongest self.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#12151B] border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-7">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
