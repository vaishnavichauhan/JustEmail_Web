"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { 
  Settings, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight, 
  Headphones, 
  Lock, 
  Sparkles, 
  Check, 
  Clock, 
  Key, 
  Mail, 
  Sliders, 
  ShieldAlert, 
  Smartphone, 
  Monitor,
  Zap,
  Server
} from "lucide-react";
import Link from "next/link";

interface ServiceOffering {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  badgeColor: string;
  iconBg: string;
  highlights: string[];
}

const serviceOfferings: ServiceOffering[] = [
  {
    id: "management",
    badge: "24/7 Ongoing Administration",
    title: "1. Email Management & Optimization",
    subtitle: "Ongoing 24/7 Monitoring, User Lifecycle & Storage Quota Control",
    description: "Our certified engineers provide complete ongoing email administration for your organization. We handle 24/7 uptime monitoring, automated user creation and offboarding, monthly license seat optimization to prevent unnecessary spend, and domain health auditing.",
    icon: Sliders,
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    iconBg: "bg-blue-600 text-white shadow-blue-500/20",
    highlights: [
      "24/7/365 Mailbox Health & Server Uptime Monitoring",
      "Automated User Onboarding & Offboarding Workflows",
      "Monthly License Optimization (Prevent Unused Seat Charges)",
      "Mailbox Storage Quota Enforcement & Archival Rules",
      "Domain Reputation & Blacklist Protection Auditing",
      "Custom Email Routing & Transport Rules Setup"
    ]
  },
  {
    id: "setup",
    badge: "Turnkey Implementation",
    title: "2. Complete Setup & DNS Authentication",
    subtitle: "Initial MX, SPF, DKIM & DMARC Setup + Client Provisioning",
    description: "Ensure 100% email inbox delivery and prevent phishing attacks with turnkey authentication. We set up all DNS records (MX, SPF, DKIM, DMARC) and configure email clients across Outlook (Windows & Mac), Apple Mail, iOS, and Android devices.",
    icon: Zap,
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    iconBg: "bg-indigo-600 text-white shadow-indigo-500/20",
    highlights: [
      "Turnkey MX, SPF, DKIM & DMARC DNS Record Configuration",
      "100% Delivery Security Guarantee & Anti-Phishing Shield",
      "Outlook, Apple Mail, iOS & Android Device Provisioning",
      "Secure IMAP, POP3, & SMTP SSL Port Configuration",
      "Zero-Downtime MX Cutover with Pre-Synced Records",
      "Autodiscover & Exchange ActiveSync Setup"
    ]
  },
  {
    id: "admin",
    badge: "Enterprise Security & Governance",
    title: "3. Admin Panel Setup & Security Governance",
    subtitle: "Custom Portal Configuration, Mandatory 2FA & Compliance",
    description: "Get a fully configured, hardened Google Workspace Admin Console or Microsoft 365 Admin Portal. We enforce strict organizational security policies, mandatory Multi-Factor Authentication (2FA/MFA), role-based permissions, and Mobile Device Management (MDM).",
    icon: Key,
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-600 text-white shadow-emerald-500/20",
    highlights: [
      "Custom Google Workspace & Microsoft 365 Admin Portal Setup",
      "Mandatory 2FA / MFA Multi-Factor Authentication Enforcement",
      "Role-Based Access Control (RBAC) & Delegated Admin Roles",
      "Mobile Device Management (MDM) & App Security Controls",
      "Data Loss Prevention (DLP) & Audit Event Logging",
      "Single Sign-On (SSO) & Password Management Policies"
    ]
  }
];

const managementFaqs = [
  {
    question: "What are your guaranteed response times for management support requests?",
    answer: "Our certified engineers provide a guaranteed < 15 minute response SLA for critical system incidents and emergency tickets. Standard user onboarding, license changes, and admin configuration tasks are resolved within 1 to 2 hours."
  },
  {
    question: "What is included in the scope of Managed Email Administration?",
    answer: "Our managed services cover complete end-to-end administration: initial MX/SPF/DKIM/DMARC setup, user account creation, password resets, security policy enforcement, license seat adjustments, email client configuration (Outlook, Apple Mail, mobile devices), spam filter tuning, and domain health monitoring."
  },
  {
    question: "How do we access technical support when we need help?",
    answer: "You get 24/7/365 direct access to our team via WhatsApp, dedicated phone support hotline, priority email ticketing portal, and a designated Senior Technical Account Manager for enterprise deployments."
  },
  {
    question: "Do you support custom admin security policies like Enforced 2FA and IP Whitelisting?",
    answer: "Yes! We configure custom security policies according to your organization's compliance requirements, including mandatory 2-Step Verification (2FA), device management, IP whitelisting, and Data Loss Prevention (DLP) rules."
  },
  {
    question: "Can Justemail manage existing Google Workspace or Microsoft 365 tenants without migrating?",
    answer: "Yes! We can take over ongoing admin management and license optimization for your existing Google Workspace or Microsoft 365 admin portal without requiring any data migration or downtime."
  }
];

export default function ManagementServicesPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative selection:bg-primary selection:text-white">
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* --- 1. PAGE HEADER & BREADCRUMBS --- */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs: Home > Management Services */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400">Management Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4">
              <Settings className="w-4 h-4 text-blue-400" />
              <span>Certified Email Administration & Support</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Fully Managed Email Infrastructure & Administration
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
              End-to-end email administration, automated MX/SPF/DKIM setup, Google & Microsoft Admin Portal configuration, security policy enforcement, and 24/7 technical support.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenAuthModal("signup")}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Get Managed Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="#core-offerings-section"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
              >
                <span>Explore Service Offerings</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* --- 2. CORE SERVICE OFFERINGS (SECTION-WISE DISPLAY - NO CARDS) --- */}
      <section id="core-offerings-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Core Service Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Comprehensive Email Administration Sections
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Dedicated full-service operational modules delivered by our team of certified email infrastructure engineers.
            </p>
          </div>

          {/* SECTION-WISE STACKED OFFERINGS */}
          <div className="space-y-16">
            {serviceOfferings.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-gray-200/90 shadow-sm relative overflow-hidden transition-all hover:border-gray-300"
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
                    
                    {/* Left Details Block */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${service.badgeColor}`}>
                            {service.badge}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                        {service.subtitle}
                      </div>

                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
                        {service.description}
                      </p>

                      <div className="pt-4">
                        <button
                          onClick={() => handleOpenAuthModal("signup")}
                          className="px-6 py-3.5 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
                        >
                          <span>Request {service.title.split(". ")[1]}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Right 2-Column Checklist Grid */}
                    <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-4 pb-3 border-b border-gray-100">
                        What's Included in This Service:
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {service.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-gray-700 leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- CLIENT PROVISIONING SUPPORT BADGES --- */}
      <section className="py-12 bg-gray-50 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
              Supported Client Provisioning Devices & Platforms
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-extrabold text-gray-800 shadow-xs">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Microsoft Outlook (Windows & Mac)</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-extrabold text-gray-800 shadow-xs">
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span>Apple Mail (macOS)</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-extrabold text-gray-800 shadow-xs">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>iOS & Android Native Mail</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-extrabold text-gray-800 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Webmail & SSO Portals</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. MANAGEMENT SERVICES FAQS SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Response SLA & Service Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Management Services FAQs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Details on response times, service scope, and 24/7 technical support access.
            </p>
          </div>

          <div className="space-y-4">
            {managementFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "bg-slate-50/80 border-blue-200 shadow-xs" : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-blue-600 text-white rotate-180" : "bg-gray-100 text-gray-600"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BAR */}
      <section className="py-12 bg-[#0B1437] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Outsource Your Email Administration to Certified Experts</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Guaranteed &lt;15 minute response SLA, 24/7 WhatsApp & phone support.</p>
          </div>
          <button
            onClick={() => handleOpenAuthModal("signup")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 active:scale-95"
          >
            Get Started with Managed Services
          </button>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
