import React from 'react';
import { Star, Quote, ArrowUpRight, CheckCircle } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  googleRating: number;
  reviewCount: number;
  directionsUrl: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  googleRating,
  reviewCount,
  directionsUrl,
}) => {
  const publishedTestimonials = testimonials.filter((t) => t.published);

  return (
    <section id="reviews" className="py-24 bg-[#08090C] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
              Member Experiences
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              REAL ATHLETES. <span className="text-[#BEF264]">GENUINE RESULTS.</span>
            </h2>
          </div>

          {/* Google Review Scorecard Card */}
          <div className="lg:col-span-4 bg-[#0F1115] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/30 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#BEF264] leading-none">
                  {googleRating}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">/ 5.0</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#BEF264] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#BEF264]" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-white">
                  Based on {reviewCount}+ Reviews
                </div>
                <div className="text-[10px] text-neutral-400">
                  Google Business Profile (Narhe)
                </div>
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="View on Google Maps"
            >
              <ArrowUpRight className="w-4 h-4 text-[#BEF264]" />
            </a>
          </div>
        </div>

        {/* Testimonials Grid (Preserving exact supplied reviews verbatim) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#0F1115] border border-white/10 flex flex-col justify-between relative group hover:border-[#BEF264]/40 transition-all duration-300 shadow-xl"
            >
              <Quote className="w-8 h-8 text-[#BEF264]/20 mb-4" />

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic mb-6">
                "{item.reviewText}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#BEF264]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {item.author}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>{item.source}</span>
                  <span>·</span>
                  <div className="flex items-center text-[#BEF264]">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-[#BEF264]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action strip */}
        <div className="mt-12 text-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#BEF264] transition-colors"
          >
            <span>View Verified Google Business Profile on Maps</span>
            <ArrowUpRight className="w-4 h-4 text-[#BEF264]" />
          </a>
        </div>
      </div>
    </section>
  );
};
