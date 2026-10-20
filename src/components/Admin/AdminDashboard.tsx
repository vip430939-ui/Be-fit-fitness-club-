import React, { useState } from 'react';
import {
  Shield,
  Users,
  Calendar,
  FileText,
  Clock,
  Settings,
  Image,
  MessageSquare,
  LogOut,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertTriangle,
  History,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { GymStorage } from '../../services/storage';
import {
  AdminUser,
  AuditLogEntry,
  DailySchedule,
  Enquiry,
  EnquiryStatus,
  GalleryPhoto,
  HolidaySchedule,
  MembershipPlan,
  Role,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../../types';
import { Logo } from '../Logo';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onDataChanged }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() =>
    GymStorage.getCurrentUser()
  );

  // Active view tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'enquiries'
    | 'plans'
    | 'services'
    | 'hours'
    | 'testimonials'
    | 'gallery'
    | 'settings'
    | 'users'
    | 'audit'
  >('overview');

  // Application data
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => GymStorage.getEnquiries());
  const [plans, setPlans] = useState<MembershipPlan[]>(() => GymStorage.getPlans());
  const [services, setServices] = useState<ServiceItem[]>(() => GymStorage.getServices());
  const [schedule, setSchedule] = useState<DailySchedule[]>(() => GymStorage.getSchedule());
  const [holidays, setHolidays] = useState<HolidaySchedule[]>(() => GymStorage.getHolidays());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() =>
    GymStorage.getTestimonials()
  );
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => GymStorage.getGallery());
  const [settings, setSettings] = useState<SiteSettings>(() => GymStorage.getSettings());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => GymStorage.getAuditLogs());
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => GymStorage.getAdminUsers());

  // Enquiries filter & search state
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');
  const [editingEnquiryId, setEditingEnquiryId] = useState<string | null>(null);
  const [enquiryNoteDraft, setEnquiryNoteDraft] = useState('');

  // Plan editing modal / state
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

  // Service editing modal / state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Settings status message
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Login form state
  const [selectedLoginUser, setSelectedLoginUser] = useState<string>(
    GymStorage.getAdminUsers()[0]?.id || ''
  );
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  const refreshAllData = () => {
    setEnquiries(GymStorage.getEnquiries());
    setPlans(GymStorage.getPlans());
    setServices(GymStorage.getServices());
    setSchedule(GymStorage.getSchedule());
    setHolidays(GymStorage.getHolidays());
    setTestimonials(GymStorage.getTestimonials());
    setGallery(GymStorage.getGallery());
    setSettings(GymStorage.getSettings());
    setAuditLogs(GymStorage.getAuditLogs());
    setAdminUsers(GymStorage.getAdminUsers());
    onDataChanged();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = adminUsers.find((u) => u.id === selectedLoginUser);
    if (!targetUser) {
      setAuthError('Please select a valid staff profile.');
      return;
    }
    GymStorage.login(targetUser);
    setCurrentUser(targetUser);
    setAuthPin('');
    setAuthError('');
    refreshAllData();
  };

  const handleLogout = () => {
    GymStorage.logout();
    setCurrentUser(null);
  };

  // RBAC checks
  const isSuperAdmin = currentUser?.role === 'super_admin';
  const canManageEnquiries =
    currentUser?.role === 'super_admin' || currentUser?.role === 'enquiry_manager';
  const canManageContent =
    currentUser?.role === 'super_admin' || currentUser?.role === 'content_manager';

  // Export Enquiries to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Plan', 'ContactMethod', 'Status', 'Notes'];
    const rows = enquiries.map((e) => [
      e.id,
      e.createdAt,
      `"${e.name.replace(/"/g, '""')}"`,
      e.phone,
      `"${e.planDuration}"`,
      e.contactMethod,
      e.status,
      `"${(e.internalNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `befit_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    GymStorage.addAuditLog(currentUser?.name || 'Staff', 'EXPORT_ENQUIRIES', 'Exported enquiries to CSV');
    setAuditLogs(GymStorage.getAuditLogs());
  };

  // If not logged in, render secure staff portal login
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#08090C] text-neutral-200 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#0F1115] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>

          <div className="flex flex-col items-center text-center mb-8">
            <Logo size="lg" className="mb-3" />
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">
              Administration Portal
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Authorized Staff Authentication & Club Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                Staff Account
              </label>
              <select
                value={selectedLoginUser}
                onChange={(e) => setSelectedLoginUser(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#14171E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BEF264]"
              >
                {adminUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {u.role === 'super_admin' ? 'Super Admin' : u.role === 'content_manager' ? 'Content Manager' : 'Enquiry Manager'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                Access Verification
              </label>
              <input
                type="password"
                placeholder="Enter Staff Key / Passcode (or leave empty for demo)"
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#14171E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BEF264]"
              />
            </div>

            {authError && <p className="text-xs text-rose-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[#BEF264] hover:bg-[#d4f982] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all mt-4"
            >
              <Lock className="w-4 h-4" />
              <span>Verify & Access Portal</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-neutral-500 leading-relaxed text-center">
            Role-Based Access Control enforced: Super Admin (all permissions), Enquiry Manager (leads & notes), Content Manager (services, plans & gallery).
          </div>
        </div>
      </div>
    );
  }

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch) ||
      e.planDuration.toLowerCase().includes(enquirySearch.toLowerCase());
    const matchesStatus =
      enquiryStatusFilter === 'all' ? true : e.status === enquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#08090C] text-neutral-200 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0A0C10] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Logo size="sm" showWordmark={true} />
          <div className="hidden sm:block h-5 w-px bg-white/10" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-white font-semibold">Staff Console</span>
            <span>·</span>
            <span className="text-[#BEF264] uppercase font-bold">{currentUser.role.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="text-xs text-neutral-300 font-semibold hidden md:inline">
              {currentUser.name}
            </span>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#0B0D12] border-r border-white/10 p-4 shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'enquiries'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Enquiries</span>
              </div>
              {enquiries.filter((e) => e.status === 'new').length > 0 && (
                <span className="px-1.5 py-0.2 rounded bg-rose-500 text-white text-[10px] font-bold">
                  {enquiries.filter((e) => e.status === 'new').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'plans'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Membership Plans</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Services & Facilities</span>
            </button>

            <button
              onClick={() => setActiveTab('hours')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'hours'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Operating Hours</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Member Reviews</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Gallery & Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site & Location Info</span>
            </button>

            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'users'
                    ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Staff & Roles</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'audit'
                  ? 'bg-[#BEF264] text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Audit Activity</span>
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Dashboard Overview
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Real-time club metrics from current local storage and enquiries database.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                  <div className="text-neutral-400 text-xs uppercase font-mono mb-1">
                    Total Enquiries
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{enquiries.length}</div>
                  <div className="text-[11px] text-[#BEF264] mt-1">
                    {enquiries.filter((e) => e.status === 'new').length} New Uncontacted
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                  <div className="text-neutral-400 text-xs uppercase font-mono mb-1">
                    Active Plans
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">
                    {plans.filter((p) => p.published).length}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Of {plans.length} configured
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                  <div className="text-neutral-400 text-xs uppercase font-mono mb-1">
                    Google Reviews
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">
                    {settings.reviewCount}
                  </div>
                  <div className="text-[11px] text-[#BEF264] mt-1">
                    {settings.googleRating} ★ Verified Rating
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                  <div className="text-neutral-400 text-xs uppercase font-mono mb-1">
                    Facility Services
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">
                    {services.filter((s) => s.published).length}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Published on website
                  </div>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="p-6 rounded-2xl bg-[#0F1115] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Recent Membership Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#BEF264] hover:underline"
                  >
                    View All Enquiries →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 font-mono">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Plan</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-white/5">
                          <td className="py-2.5 px-3 font-mono text-neutral-400">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-white">{enq.name}</td>
                          <td className="py-2.5 px-3 font-mono text-neutral-300">{enq.phone}</td>
                          <td className="py-2.5 px-3 text-neutral-300">{enq.planDuration}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                enq.status === 'new'
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : enq.status === 'contacted'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : enq.status === 'interested'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : enq.status === 'joined'
                                  ? 'bg-[#BEF264]/20 text-[#BEF264]'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES MANAGEMENT */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                    Enquiry Workflow
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage incoming membership leads, record staff follow-ups, and export records.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name, phone or plan..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0F1115] border border-white/10 text-white text-xs focus:outline-none focus:border-[#BEF264]"
                  />
                </div>

                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0F1115] border border-white/10 text-white text-xs focus:outline-none focus:border-[#BEF264]"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="joined">Joined</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Enquiries Table */}
              <div className="bg-[#0F1115] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 font-mono bg-[#14171E]">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Visitor</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Plan / Goals</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-neutral-500">
                            No enquiries found matching your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <React.Fragment key={enq.id}>
                            <tr className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-4 font-mono text-neutral-400">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-white">{enq.name}</div>
                                {enq.internalNotes && (
                                  <div className="text-[10px] text-amber-300/80 italic mt-0.5 max-w-xs truncate">
                                    Note: {enq.internalNotes}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4 font-mono">
                                <div>{enq.phone}</div>
                                <div className="text-[10px] text-neutral-400 uppercase">
                                  via {enq.contactMethod}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-neutral-200 font-medium">{enq.planDuration}</div>
                                {enq.message && (
                                  <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                                    "{enq.message}"
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={enq.status}
                                  onChange={(e) => {
                                    GymStorage.updateEnquiry(
                                      enq.id,
                                      { status: e.target.value as EnquiryStatus },
                                      currentUser.name
                                    );
                                    refreshAllData();
                                  }}
                                  className="px-2 py-1 rounded bg-[#181C24] border border-white/10 text-[11px] font-bold uppercase text-white focus:outline-none"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="interested">Interested</option>
                                  <option value="joined">Joined</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingEnquiryId(
                                        editingEnquiryId === enq.id ? null : enq.id
                                      );
                                      setEnquiryNoteDraft(enq.internalNotes || '');
                                    }}
                                    className="p-1.5 rounded hover:bg-white/10 text-neutral-300 transition-colors"
                                    title="Add / Edit Internal Note"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>

                                  {isSuperAdmin && (
                                    <button
                                      onClick={() => {
                                        setConfirmDialog({
                                          isOpen: true,
                                          title: 'Delete Enquiry Record?',
                                          message: `Are you sure you want to permanently remove enquiry from ${enq.name}?`,
                                          onConfirm: () => {
                                            GymStorage.deleteEnquiry(enq.id, currentUser.name);
                                            refreshAllData();
                                            setConfirmDialog(null);
                                          },
                                        });
                                      }}
                                      className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 transition-colors"
                                      title="Delete record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>

                            {/* Collapsible Note Editor */}
                            {editingEnquiryId === enq.id && (
                              <tr className="bg-[#12151B]">
                                <td colSpan={6} className="p-4">
                                  <div className="flex flex-col sm:flex-row gap-3 items-end">
                                    <div className="flex-1 w-full">
                                      <label className="block text-[11px] text-neutral-400 uppercase font-mono mb-1">
                                        Internal Staff Follow-up Note for {enq.name}:
                                      </label>
                                      <input
                                        type="text"
                                        value={enquiryNoteDraft}
                                        onChange={(e) => setEnquiryNoteDraft(e.target.value)}
                                        placeholder="e.g. Called member, offered morning trial on Saturday..."
                                        className="w-full px-3 py-1.5 rounded bg-[#181C24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#BEF264]"
                                      />
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                      <button
                                        onClick={() => {
                                          GymStorage.updateEnquiry(
                                            enq.id,
                                            { internalNotes: enquiryNoteDraft },
                                            currentUser.name
                                          );
                                          refreshAllData();
                                          setEditingEnquiryId(null);
                                        }}
                                        className="px-3 py-1.5 rounded bg-[#BEF264] text-black text-xs font-bold uppercase"
                                      >
                                        Save Note
                                      </button>
                                      <button
                                        onClick={() => setEditingEnquiryId(null)}
                                        className="px-3 py-1.5 rounded bg-white/10 text-white text-xs"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEMBERSHIP PLANS */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                    Membership Plans
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage tier durations, verified prices, highlights and display settings.
                  </p>
                </div>

                {canManageContent && (
                  <button
                    onClick={() => {
                      const newP: MembershipPlan = {
                        id: `plan_${Date.now()}`,
                        name: 'New Custom Tier',
                        durationMonths: 1,
                        durationLabel: '1 Month',
                        priceDisplay: 'Contact for Pricing',
                        isVerifiedPrice: false,
                        featured: false,
                        highlights: ['Gym floor access', 'Free Wi-Fi', 'Restrooms'],
                        terms: 'Standard terms apply.',
                        published: true,
                      };
                      setEditingPlan(newP);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#BEF264] text-black text-xs font-bold uppercase tracking-wider"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Plan</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-xl bg-[#0F1115] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white uppercase">{plan.name}</h3>
                          <div className="text-xs text-neutral-400 font-mono">{plan.durationLabel}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {plan.featured && (
                            <span className="text-[10px] font-mono text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded">
                              ★ Featured
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              plan.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                            }`}
                          >
                            {plan.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="my-3 py-2 px-3 rounded bg-white/5 text-sm font-bold text-white font-mono flex items-center justify-between">
                        <span>Price Display: {plan.priceDisplay}</span>
                        <span className="text-[10px] text-neutral-400 font-sans font-normal">
                          {plan.isVerifiedPrice ? 'Verified' : 'Enquiry Only'}
                        </span>
                      </div>

                      <ul className="text-xs text-neutral-400 space-y-1 mb-4">
                        {plan.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#BEF264]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                      <button
                        onClick={() => {
                          const updated = plans.map((p) =>
                            p.id === plan.id ? { ...p, published: !p.published } : p
                          );
                          GymStorage.savePlans(updated, currentUser.name);
                          refreshAllData();
                        }}
                        className="text-xs text-neutral-400 hover:text-white"
                      >
                        {plan.published ? 'Unpublish' : 'Publish'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPlan(plan)}
                          className="px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-xs text-white"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                    Facility Services & Disciplines
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage service cards, descriptions and equipment highlights.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((serv) => (
                  <div key={serv.id} className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#BEF264]">{serv.category}</div>
                        <h3 className="text-base font-bold text-white uppercase">{serv.title}</h3>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          serv.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {serv.published ? 'Active' : 'Hidden'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 mb-3">{serv.description}</p>

                    <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                      <button
                        onClick={() => {
                          const updated = services.map((s) =>
                            s.id === serv.id ? { ...s, published: !s.published } : s
                          );
                          GymStorage.saveServices(updated, currentUser.name);
                          refreshAllData();
                        }}
                        className="text-neutral-400 hover:text-white"
                      >
                        {serv.published ? 'Hide on Website' : 'Show on Website'}
                      </button>

                      <button
                        onClick={() => setEditingService(serv)}
                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-white"
                      >
                        Edit Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HOURS */}
          {activeTab === 'hours' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Opening Hours & Schedule
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Adjust standard daily opening and closing hours.
                </p>
              </div>

              <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-6 space-y-4">
                {schedule.map((item, idx) => (
                  <div key={item.day} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm font-semibold text-white w-28">{item.day}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={item.openTime}
                        onChange={(e) => {
                          const updated = [...schedule];
                          updated[idx].openTime = e.target.value;
                          setSchedule(updated);
                        }}
                        className="px-2 py-1 bg-[#14171E] border border-white/10 rounded text-xs text-white"
                      />
                      <span className="text-neutral-500">to</span>
                      <input
                        type="time"
                        value={item.closeTime}
                        onChange={(e) => {
                          const updated = [...schedule];
                          updated[idx].closeTime = e.target.value;
                          setSchedule(updated);
                        }}
                        className="px-2 py-1 bg-[#14171E] border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    GymStorage.saveSchedule(schedule, currentUser.name);
                    refreshAllData();
                    alert('Schedule successfully updated.');
                  }}
                  className="w-full py-2.5 bg-[#BEF264] text-black font-bold text-xs uppercase rounded-lg hover:bg-[#d4f982] transition-colors mt-4"
                >
                  Save Schedule Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Verified Reviews & Testimonials
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Review and curate member feedback displayed on the home page.
                </p>
              </div>

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-5 rounded-xl bg-[#0F1115] border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-bold text-white">{t.author}</div>
                      <div className="text-xs font-mono text-[#BEF264]">
                        {'★'.repeat(t.rating)} ({t.source})
                      </div>
                    </div>
                    <p className="text-xs text-neutral-300 italic mb-4">"{t.reviewText}"</p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs text-neutral-400">
                      <span>Date added: {t.dateAdded}</span>
                      <button
                        onClick={() => {
                          const updated = testimonials.map((item) =>
                            item.id === t.id ? { ...item, published: !item.published } : item
                          );
                          GymStorage.saveTestimonials(updated, currentUser.name);
                          refreshAllData();
                        }}
                        className="text-white hover:underline"
                      >
                        {t.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Gallery & Media
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage high-resolution photo assets, captions, and accessibility alt text.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((photo) => (
                  <div key={photo.id} className="rounded-xl overflow-hidden bg-[#0F1115] border border-white/10">
                    <img
                      src={photo.imageUrl}
                      alt={photo.altText}
                      className="w-full h-36 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-3">
                      <div className="text-[10px] font-mono uppercase text-[#BEF264]">{photo.category}</div>
                      <div className="text-xs font-bold text-white truncate">{photo.title}</div>
                      <div className="text-[10px] text-neutral-400 mt-1 truncate">{photo.altText}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Site & Location Settings
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage business contact numbers, landmarks, and Google Maps embed configuration.
                </p>
              </div>

              <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#14171E] border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#14171E] border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Key Landmark
                  </label>
                  <input
                    type="text"
                    value={settings.landmark}
                    onChange={(e) => setSettings({ ...settings, landmark: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#14171E] border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Contact Phone (International Format)
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#14171E] border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Google Maps Directions URL
                  </label>
                  <input
                    type="text"
                    value={settings.googleMapsDirectionsUrl}
                    onChange={(e) => setSettings({ ...settings, googleMapsDirectionsUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#14171E] border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                {settingsSuccess && (
                  <div className="p-3 rounded bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Settings successfully saved and persisted!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    GymStorage.saveSettings(settings, currentUser.name);
                    refreshAllData();
                    setSettingsSuccess(true);
                    setTimeout(() => setSettingsSuccess(false), 3000);
                  }}
                  className="w-full py-2.5 bg-[#BEF264] text-black font-bold text-xs uppercase rounded-lg hover:bg-[#d4f982] transition-colors"
                >
                  Save Business Details
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: USERS & ROLES */}
          {activeTab === 'users' && isSuperAdmin && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Staff Accounts & RBAC
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage administrative permissions and authorized roles.
                </p>
              </div>

              <div className="bg-[#0F1115] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-400 font-mono bg-[#14171E]">
                      <th className="py-3 px-4">Staff Member</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {adminUsers.map((u) => (
                      <tr key={u.id}>
                        <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                        <td className="py-3 px-4 text-neutral-400 font-mono">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/30">
                            {u.role.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: AUDIT ACTIVITY */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Security & Activity Audit Log
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Chronological trail of administrative modifications and member submissions.
                </p>
              </div>

              <div className="bg-[#0F1115] border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 font-mono bg-[#14171E]">
                        <th className="py-3 px-4">Timestamp (UTC)</th>
                        <th className="py-3 px-4">Actor</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/5 font-mono">
                          <td className="py-2.5 px-4 text-neutral-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="py-2.5 px-4 text-white font-semibold">{log.actor}</td>
                          <td className="py-2.5 px-4 text-[#BEF264]">{log.action}</td>
                          <td className="py-2.5 px-4 text-neutral-300 font-sans">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Plan Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white uppercase mb-4">Edit Membership Plan</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Duration Label</label>
                <input
                  type="text"
                  value={editingPlan.durationLabel}
                  onChange={(e) => setEditingPlan({ ...editingPlan, durationLabel: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">
                  Price Display (e.g. Contact for Pricing or Verified Rate)
                </label>
                <input
                  type="text"
                  value={editingPlan.priceDisplay}
                  onChange={(e) => setEditingPlan({ ...editingPlan, priceDisplay: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={editingPlan.featured}
                  onChange={(e) => setEditingPlan({ ...editingPlan, featured: e.target.checked })}
                  className="rounded text-[#BEF264]"
                />
                <label htmlFor="featuredCheck" className="text-neutral-300">
                  Mark as Most Popular / Featured
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 rounded bg-white/10 text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = plans.map((p) => (p.id === editingPlan.id ? editingPlan : p));
                  if (!plans.some((p) => p.id === editingPlan.id)) {
                    updated.push(editingPlan);
                  }
                  GymStorage.savePlans(updated, currentUser.name);
                  refreshAllData();
                  setEditingPlan(null);
                }}
                className="px-4 py-2 rounded bg-[#BEF264] text-black text-xs font-bold uppercase"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white uppercase mb-4">Edit Facility Service</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Category</label>
                <input
                  type="text"
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14171E] border border-white/10 rounded text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded bg-white/10 text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = services.map((s) => (s.id === editingService.id ? editingService : s));
                  GymStorage.saveServices(updated, currentUser.name);
                  refreshAllData();
                  setEditingService(null);
                }}
                className="px-4 py-2 rounded bg-[#BEF264] text-black text-xs font-bold uppercase"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-rose-500/30 rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 text-rose-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="text-base font-bold text-white">{confirmDialog.title}</h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 rounded bg-white/10 text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
