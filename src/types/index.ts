export type Role = 'super_admin' | 'content_manager' | 'enquiry_manager';

export type EnquiryStatus = 'new' | 'contacted' | 'interested' | 'joined' | 'closed';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastLogin?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  planDuration: string;
  contactMethod: 'whatsapp' | 'call' | 'either';
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
  assignedTo?: string;
  internalNotes?: string;
  followUpDate?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  published: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  durationMonths: number;
  durationLabel: string;
  priceDisplay: string; // Initially "Contact for Pricing"
  isVerifiedPrice: boolean;
  featured: boolean;
  highlights: string[];
  terms: string;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  author: string;
  source: 'Google Review' | 'Verified Member';
  rating: number;
  reviewText: string;
  published: boolean;
  dateAdded: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'strength' | 'free_weights' | 'cardio' | 'facility';
  imageUrl: string;
  altText: string;
  isVerifiedActual: boolean;
}

export interface DailySchedule {
  day: string; // Monday, Tuesday, etc.
  openTime: string; // "05:15"
  closeTime: string; // "22:15"
  isOpen: boolean;
}

export interface HolidaySchedule {
  id: string;
  date: string; // YYYY-MM-DD
  occasion: string;
  status: 'closed' | 'adjusted_hours';
  adjustedHours?: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  subTagline: string;
  address: string;
  landmark: string;
  cityStatePincode: string;
  phone: string;
  cleanPhone: string;
  googleRating: number;
  reviewCount: number;
  status: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  whatsappMessage: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}
