import {
  INITIAL_GALLERY,
  INITIAL_PLANS,
  INITIAL_SCHEDULE,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_TESTIMONIALS,
} from '../data/gymData';
import {
  AdminUser,
  AuditLogEntry,
  DailySchedule,
  Enquiry,
  GalleryPhoto,
  HolidaySchedule,
  MembershipPlan,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'befit_site_settings',
  PLANS: 'befit_plans',
  SERVICES: 'befit_services',
  SCHEDULE: 'befit_schedule',
  HOLIDAYS: 'befit_holidays',
  TESTIMONIALS: 'befit_testimonials',
  GALLERY: 'befit_gallery',
  ENQUIRIES: 'befit_enquiries',
  AUDIT_LOGS: 'befit_audit_logs',
  CURRENT_USER: 'befit_current_user',
  USERS: 'befit_admin_users',
};

// Default seed admin accounts with secure roles
const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_super',
    name: 'Gym Director',
    email: 'admin@befitfitness.in',
    role: 'super_admin',
    lastLogin: '2026-10-19T18:30:00Z',
  },
  {
    id: 'usr_desk',
    name: 'Front Desk Lead',
    email: 'desk@befitfitness.in',
    role: 'enquiry_manager',
    lastLogin: '2026-10-18T14:15:00Z',
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq_101',
    name: 'Rahul Sharma',
    phone: '9822012345',
    planDuration: 'Quarterly Membership',
    contactMethod: 'whatsapp',
    message: 'Interested in evening strength training workouts after 7 PM.',
    status: 'new',
    createdAt: '2026-10-18T16:20:00Z',
  },
  {
    id: 'enq_102',
    name: 'Pooja Kulkarni',
    phone: '9921098765',
    planDuration: 'Annual Membership',
    contactMethod: 'call',
    message: 'Looking for morning cardio and beginner fitness orientation.',
    status: 'contacted',
    createdAt: '2026-10-17T11:45:00Z',
    internalNotes: 'Called on Oct 17. Scheduled facility walkthrough for Tuesday morning.',
    followUpDate: '2026-10-21',
  },
  {
    id: 'enq_103',
    name: 'Amit Deshmukh',
    phone: '9764054321',
    planDuration: 'Monthly Membership',
    contactMethod: 'either',
    message: 'Wanted to check free weights area availability during 6 AM to 8 AM.',
    status: 'interested',
    createdAt: '2026-10-15T09:10:00Z',
    internalNotes: 'Walked in, liked the Olympic barbell setups.',
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_01',
    timestamp: '2026-10-19T18:30:00Z',
    actor: 'Gym Director (Super Admin)',
    action: 'SYSTEM_INIT',
    details: 'Verified business information and operating schedule configured for Narhe location.',
  },
  {
    id: 'log_02',
    timestamp: '2026-10-18T16:20:00Z',
    actor: 'Website Visitor',
    action: 'NEW_ENQUIRY',
    details: 'Received enquiry from Rahul Sharma for Quarterly Membership.',
  },
];

function getStored<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

export const GymStorage = {
  getSettings(): SiteSettings {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  saveSettings(settings: SiteSettings, actor = 'Super Admin'): void {
    setStored(STORAGE_KEYS.SETTINGS, settings);
    this.addAuditLog(actor, 'UPDATE_SETTINGS', 'Updated gym location, contact, or operational settings');
  },

  getPlans(): MembershipPlan[] {
    return getStored<MembershipPlan[]>(STORAGE_KEYS.PLANS, INITIAL_PLANS);
  },
  savePlans(plans: MembershipPlan[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.PLANS, plans);
    this.addAuditLog(actor, 'UPDATE_PLANS', `Updated membership plans list (${plans.length} items)`);
  },

  getServices(): ServiceItem[] {
    return getStored<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },
  saveServices(services: ServiceItem[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.SERVICES, services);
    this.addAuditLog(actor, 'UPDATE_SERVICES', `Updated services catalog (${services.length} items)`);
  },

  getSchedule(): DailySchedule[] {
    return getStored<DailySchedule[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE);
  },
  saveSchedule(sched: DailySchedule[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.SCHEDULE, sched);
    this.addAuditLog(actor, 'UPDATE_SCHEDULE', 'Updated daily opening and closing hours');
  },

  getHolidays(): HolidaySchedule[] {
    return getStored<HolidaySchedule[]>(STORAGE_KEYS.HOLIDAYS, []);
  },
  saveHolidays(holidays: HolidaySchedule[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.HOLIDAYS, holidays);
    this.addAuditLog(actor, 'UPDATE_HOLIDAYS', `Updated holiday schedules (${holidays.length} entries)`);
  },

  getTestimonials(): TestimonialItem[] {
    return getStored<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  },
  saveTestimonials(items: TestimonialItem[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.TESTIMONIALS, items);
    this.addAuditLog(actor, 'UPDATE_TESTIMONIALS', 'Updated member reviews and testimonials');
  },

  getGallery(): GalleryPhoto[] {
    return getStored<GalleryPhoto[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  },
  saveGallery(items: GalleryPhoto[], actor = 'Admin'): void {
    setStored(STORAGE_KEYS.GALLERY, items);
    this.addAuditLog(actor, 'UPDATE_GALLERY', `Updated photo gallery (${items.length} photos)`);
  },

  getEnquiries(): Enquiry[] {
    return getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },
  submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Enquiry {
    const list = this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const updated = [newEnquiry, ...list];
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
    this.addAuditLog('Website Visitor', 'NEW_ENQUIRY', `Submitted enquiry for ${newEnquiry.planDuration} (${newEnquiry.name})`);
    return newEnquiry;
  },
  updateEnquiry(id: string, updates: Partial<Enquiry>, actor = 'Enquiry Manager'): void {
    const list = this.getEnquiries();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
    this.addAuditLog(actor, 'UPDATE_ENQUIRY', `Updated enquiry ${id} status/notes`);
  },
  deleteEnquiry(id: string, actor = 'Super Admin'): void {
    const list = this.getEnquiries();
    const updated = list.filter((item) => item.id !== id);
    setStored(STORAGE_KEYS.ENQUIRIES, updated);
    this.addAuditLog(actor, 'DELETE_ENQUIRY', `Deleted enquiry record ${id}`);
  },

  getAuditLogs(): AuditLogEntry[] {
    return getStored<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },
  addAuditLog(actor: string, action: string, details: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
    };
    setStored(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs].slice(0, 100));
  },

  // Auth & RBAC
  getCurrentUser(): AdminUser | null {
    return getStored<AdminUser | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  login(user: AdminUser): void {
    const userWithLogin = { ...user, lastLogin: new Date().toISOString() };
    setStored(STORAGE_KEYS.CURRENT_USER, userWithLogin);
    this.addAuditLog(user.name, 'ADMIN_LOGIN', `Logged into Admin Portal as ${user.role}`);
  },
  logout(): void {
    const user = this.getCurrentUser();
    if (user) {
      this.addAuditLog(user.name, 'ADMIN_LOGOUT', 'Logged out of Admin Portal');
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  getAdminUsers(): AdminUser[] {
    return getStored<AdminUser[]>(STORAGE_KEYS.USERS, DEFAULT_ADMIN_USERS);
  },
  saveAdminUsers(users: AdminUser[], actor = 'Super Admin'): void {
    setStored(STORAGE_KEYS.USERS, users);
    this.addAuditLog(actor, 'UPDATE_USERS', `Updated authorized staff list (${users.length} accounts)`);
  },
};
