import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, Phone, Send, AlertCircle } from 'lucide-react';
import { GymStorage } from '../services/storage';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
  cleanPhone: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultPlan = 'Quarterly Membership',
  cleanPhone,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [planDuration, setPlanDuration] = useState(defaultPlan);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call' | 'either'>('whatsapp');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [createdEnquiryId, setCreatedEnquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (defaultPlan) {
      setPlanDuration(defaultPlan);
    }
  }, [defaultPlan]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please provide your full name.';
    }
    const cleanPhoneDigits = phone.replace(/\D/g, '');
    if (cleanPhoneDigits.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!consent) {
      errs.consent = 'You must acknowledge the communication consent.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Anti-spam honeypot
    if (honeypot) {
      return;
    }

    if (!validate()) return;

    const saved = GymStorage.submitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      planDuration,
      contactMethod,
      message: message.trim() || undefined,
    });

    setCreatedEnquiryId(saved.id);
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Be Fit Fitness Club, I have submitted an enquiry on your website.\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${planDuration}\nPreferred Contact: ${contactMethod}\n${
      message ? `Message: ${message}` : ''
    }`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-[#0F1115] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#12151B]">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              {submitted ? 'Enquiry Received' : 'Membership & Training Enquiry'}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Be Fit Fitness Club · Zeal College Chowk, Narhe
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center mx-auto mb-4 border border-[#BEF264]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Thank You, {name}!</h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
                Your enquiry has been securely registered with our front desk team. We will reach out
                via your preferred contact method shortly.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 text-left mb-6 space-y-1">
                <div>
                  <span className="text-neutral-400">Selected Interest:</span>{' '}
                  <strong className="text-white">{planDuration}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">Contact Number:</span>{' '}
                  <strong className="text-white">{phone}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">Enquiry ID:</span>{' '}
                  <span className="font-mono text-[#BEF264]">{createdEnquiryId}</span>
                </div>
              </div>

              {/* Instant WhatsApp Option with explicit notice */}
              <div className="space-y-3">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp for Instant Response</span>
                </a>
                <p className="text-[11px] text-neutral-400">
                  Note: Clicking above opens WhatsApp on your device. You must tap "Send" in WhatsApp to deliver the message.
                </p>

                <button
                  onClick={resetForm}
                  className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors mt-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam trap hidden from humans */}
              <input
                type="text"
                name="website_confirm"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Patil"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#14171E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BEF264] transition-colors"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Mobile Number (WhatsApp Preferred) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-[#12151B] text-neutral-400 text-sm font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={15}
                    className="w-full px-4 py-2.5 rounded-r-lg bg-[#14171E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BEF264] transition-colors"
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Plan Duration / Training Interest */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Interested Program / Duration
                </label>
                <select
                  value={planDuration}
                  onChange={(e) => setPlanDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#14171E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BEF264] transition-colors"
                >
                  <option value="Monthly Membership">Monthly Membership (1 Month)</option>
                  <option value="Quarterly Membership">Quarterly Membership (3 Months - Popular)</option>
                  <option value="Half-Yearly Membership">Half-Yearly Membership (6 Months)</option>
                  <option value="Annual Membership">Annual Membership (12 Months)</option>
                  <option value="Personal Training Coaching">Certified Personal Training</option>
                  <option value="Beginner Fitness Orientation">Beginner Fitness Induction</option>
                  <option value="General Facility Walkthrough">General Facility Visit & Trial</option>
                </select>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      contactMethod === 'whatsapp'
                        ? 'bg-[#BEF264] text-black border-[#BEF264]'
                        : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('call')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      contactMethod === 'call'
                        ? 'bg-[#BEF264] text-black border-[#BEF264]'
                        : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Phone Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('either')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      contactMethod === 'either'
                        ? 'bg-[#BEF264] text-black border-[#BEF264]'
                        : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Either
                  </button>
                </div>
              </div>

              {/* Optional Goals / Questions */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Workout Goals or Queries (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="e.g. Preferred workout time (morning/evening), strength vs weight management..."
                  className="w-full px-4 py-2 rounded-lg bg-[#14171E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BEF264] transition-colors resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded bg-[#14171E] border-white/20 text-[#BEF264] focus:ring-0"
                />
                <label htmlFor="consentCheck" className="text-[11px] text-neutral-400 leading-tight">
                  I agree to be contacted by Be Fit Fitness Club staff regarding my membership enquiry.
                  We respect your privacy and never spam.
                </label>
              </div>
              {errors.consent && <p className="text-xs text-rose-400">{errors.consent}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-lg bg-[#BEF264] hover:bg-[#d4f982] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(190,242,100,0.3)] transition-all mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Membership Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
