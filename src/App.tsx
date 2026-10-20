/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { MembershipSection } from './components/MembershipSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HoursAndLocation } from './components/HoursAndLocation';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { GymStorage } from './services/storage';
import { getCurrentStatusInPune } from './utils/hours';

export default function App() {
  const [currentView, setCurrentView] = useState<'site' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'site';
  });

  // State synced from storage
  const [settings, setSettings] = useState(() => GymStorage.getSettings());
  const [services, setServices] = useState(() => GymStorage.getServices());
  const [plans, setPlans] = useState(() => GymStorage.getPlans());
  const [schedule, setSchedule] = useState(() => GymStorage.getSchedule());
  const [holidays, setHolidays] = useState(() => GymStorage.getHolidays());
  const [testimonials, setTestimonials] = useState(() => GymStorage.getTestimonials());
  const [gallery, setGallery] = useState(() => GymStorage.getGallery());

  // Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState<string>('Quarterly Membership');

  // Real-time status in Pune
  const [status, setStatus] = useState(() =>
    getCurrentStatusInPune(schedule, holidays)
  );

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && window.location.hash !== '#admin') {
        setCurrentView('site');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Periodic status refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getCurrentStatusInPune(schedule, holidays));
    }, 60000);
    return () => clearInterval(interval);
  }, [schedule, holidays]);

  const refreshDataFromStorage = () => {
    setSettings(GymStorage.getSettings());
    setServices(GymStorage.getServices());
    setPlans(GymStorage.getPlans());
    setSchedule(GymStorage.getSchedule());
    setHolidays(GymStorage.getHolidays());
    setTestimonials(GymStorage.getTestimonials());
    setGallery(GymStorage.getGallery());
    setStatus(getCurrentStatusInPune(GymStorage.getSchedule(), GymStorage.getHolidays()));
  };

  const handleOpenEnquiry = (planName?: string) => {
    if (planName) {
      setSelectedPlanForEnquiry(planName);
    }
    setIsEnquiryOpen(true);
  };

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToSite = () => {
    window.location.hash = '';
    setCurrentView('site');
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={navigateToSite}
        onDataChanged={refreshDataFromStorage}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#E6E8EC] selection:bg-[#BEF264] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          settings={settings}
          onOpenEnquiry={() => handleOpenEnquiry()}
          statusText={status.statusLabel}
          isOpen={status.isOpen}
        />

        {/* Why Choose Us & Gym Philosophy */}
        <WhyChooseUs />

        {/* Services & Training Facilities */}
        <ServicesSection
          services={services}
          onSelectService={(serviceTitle) => handleOpenEnquiry(serviceTitle)}
        />

        {/* Membership Plans */}
        <MembershipSection
          plans={plans}
          onSelectPlan={(planName) => handleOpenEnquiry(planName)}
          cleanPhone={settings.cleanPhone}
        />

        {/* Photo Gallery with Lightbox */}
        <GallerySection photos={gallery} />

        {/* Reviews and Testimonials */}
        <TestimonialsSection
          testimonials={testimonials}
          googleRating={settings.googleRating}
          reviewCount={settings.reviewCount}
          directionsUrl={settings.googleMapsDirectionsUrl}
        />

        {/* Operating Hours and Location */}
        <HoursAndLocation
          settings={settings}
          schedule={schedule}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={navigateToAdmin}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar settings={settings} />

      {/* Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultPlan={selectedPlanForEnquiry}
        cleanPhone={settings.cleanPhone}
      />
    </div>
  );
}
