import React from 'react';
import { Check, MessageSquare, ArrowUpRight, HelpCircle } from 'lucide-react';
import { MembershipPlan } from '../types';

interface MembershipSectionProps {
  plans: MembershipPlan[];
  onSelectPlan: (planName: string) => void;
  cleanPhone: string;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  plans,
  onSelectPlan,
  cleanPhone,
}) => {
  const publishedPlans = plans.filter((p) => p.published);

  const getWhatsAppLink = (planName: string) => {
    const text = encodeURIComponent(
      `Hello Be Fit Fitness Club, I would like to know the current verified pricing and details for the ${planName}.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <section id="memberships" className="py-24 bg-[#08090C] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
            Flexible Commitment Options
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            MEMBERSHIP <span className="text-[#BEF264]">PLANS.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Choose the duration that matches your fitness commitment. Membership is required for
            facility access to maintain safety and equipment standards.
          </p>

          {/* Pricing Policy Disclaimer */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-neutral-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-[#BEF264]" />
            <span>Official rates provided on-site or via WhatsApp. Submitting an enquiry is not a charge.</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {publishedPlans.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-[#0F1115] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                  isFeatured
                    ? 'border-2 border-[#BEF264] shadow-[0_0_30px_rgba(190,242,100,0.15)] bg-gradient-to-b from-[#13171F] to-[#0F1115]'
                    : 'border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Featured callout indicator */}
                {isFeatured && (
                  <div className="text-right mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#BEF264] font-bold">
                      ★ Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Duration */}
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {plan.name}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400 mb-6">
                    {plan.durationLabel}
                  </div>

                  {/* Price Banner */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="text-2xl font-bold text-white tracking-tight">
                      {plan.priceDisplay}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      {plan.isVerifiedPrice ? 'Verified Gym Rate' : 'Direct desk enquiry for latest discount'}
                    </div>
                  </div>

                  {/* Included Highlights */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Included with Plan:
                    </div>
                    {plan.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <span className="w-4 h-4 rounded-full bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions & Terms */}
                <div>
                  <div className="flex flex-col gap-2.5 mb-4">
                    <button
                      onClick={() => onSelectPlan(plan.name)}
                      className={`w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center ${
                        isFeatured
                          ? 'bg-[#BEF264] hover:bg-[#d4f982] text-black shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      Enquire for Rates
                    </button>

                    <a
                      href={getWhatsAppLink(plan.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Rates</span>
                    </a>
                  </div>

                  <div className="text-[10px] text-neutral-400 leading-tight">
                    {plan.terms}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Trainer Profiles */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0F1115] border border-white/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase text-[#BEF264] mb-1">
              Personal Coaching & Trainer Roster
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              Looking for 1-on-1 Certified Personal Training?
            </div>
            <div className="text-xs text-neutral-400 leading-relaxed">
              Trainer profiles and custom goal-based programs are scheduled directly through gym administration to ensure certified coach availability.
            </div>
          </div>
          <button
            onClick={() => onSelectPlan('Personal Training Coaching')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-black bg-[#BEF264] hover:bg-[#d4f982] rounded-lg shrink-0"
          >
            Ask Front Desk
          </button>
        </div>
      </div>
    </section>
  );
};
