import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { INITIAL_FAQS } from '../data/gymData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#08090C] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
            Common Questions
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            FREQUENTLY ASKED <span className="text-[#BEF264]">QUESTIONS.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Everything you need to know about joining and training at Be Fit Fitness Club in Narhe.
          </p>
        </div>

        <div className="space-y-4">
          {INITIAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0F1115] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left text-base sm:text-lg font-bold text-white hover:text-[#BEF264] transition-colors focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#BEF264] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
