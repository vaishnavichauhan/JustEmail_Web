"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import {
  HardDrive,
  ShieldCheck,
  RefreshCw,
  Download,
  Lock,
  RotateCcw,
  History,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Server,
  Zap,
  Layers,
  FolderArchive,
  CloudCheck
} from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

const backupFaqs: FaqItem[] = [
  {
    question: "What retention policies are supported for enterprise backups?",
    answer: "justEmails supports flexible, customizable data retention policies ranging from 30 days, 1 year, 7 years for compliance, up to Unlimited Immutable Archival. Administrators can set custom automated purge rules or enforce legal hold policies per department."
  },
  {
    question: "What encryption standards protect our backup data?",
    answer: "All email and cloud drive data is encrypted using military-grade FIPS 140-2 validated AES-256 bit encryption at rest. In-transit data is secured via TLS 1.3 SSL channels. Encryption keys are managed securely with dedicated HSM (Hardware Security Module) protection."
  },
  {
    question: "Are there storage limits or per-GB overage surcharges?",
    answer: "No! All justEmails enterprise backup plans include Unlimited Cloud Storage per user mailbox license. You never have to worry about running out of backup space or paying extra per-gigabyte overage fees."
  },
  {
    question: "Which email and cloud platforms are supported for automated backups?",
    answer: "We support automated cloud-to-cloud backups for Google Workspace (Gmail, Google Drive, Shared Drives), Microsoft 365 (Exchange Mail, OneDrive, Teams, SharePoint), Zoho Mail, Titan Mail, and Rediffmail Pro."
  },
  {
    question: "How quickly can I restore an entire mailbox after accidental deletion or ransomware?",
    answer: "Restores occur in real-time with 1 click. You can perform granular single-email restores in seconds or initiate a full point-in-time mailbox recovery that provisions back into the user's live inbox without overwriting existing data."
  }
];

export default function BackupServicesPage() {
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

        {/* Background Glow Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs: Home > Backup Services */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400">Backup Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Immutable Cloud Backup & Compliance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Enterprise Email Backup & Archiving Solutions
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
              Automated continuous cloud-to-cloud backups, instant PST & MBOX exports, point-in-time recovery, and ransomware isolation for Google Workspace, Microsoft 365, Zoho, & Titan.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button

                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Start Free Backup Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="#backup-capabilities"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* --- 2. BACKUP CAPABILITIES SECTION --- */}
      <section id="backup-capabilities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Backup Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Dual-Engine Enterprise Backup Infrastructure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Combine continuous background cloud-to-cloud protection with instant local PST & MBOX exports for offboarding and audits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Capability 1: Manual / On-Demand Backups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <Download className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">
                    PST / MBOX Export
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  Manual / On-Demand Backups
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Instant local or cloud export options (PST, MBOX formats) for audits, legal discovery, employee offboarding, or offline archival storage.
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-200/80">
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Instant Outlook PST & Thunderbird MBOX file download</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>One-click offboarding archive creation for departing employees</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Selective date-range and folder-based export filters</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleOpenAuthModal("signup")}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Export Manual Backup Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Capability 2: Across-Company Automated Backups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                    <RefreshCw className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                    Continuous Cloud Auto-Sync
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  Across-Company Automated Backups
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Continuous background cloud-to-cloud backups across all company mailboxes, shared drives, OneDrive, and SharePoint data without installing local client agents.
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-200/80">
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Auto-discovery of newly provisioned team member mailboxes</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Complete coverage: Gmail, Exchange, Google Drive, OneDrive & SharePoint</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Background multi-datacenter replication with zero PC performance drag</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleOpenAuthModal("signup")}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Enable Automated Cloud Protection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* --- 3. KEY BACKUP FEATURES SECTION --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Core Security Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Key Backup & Recovery Features
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Built for rapid recovery, ransomware resilience, and zero data loss SLA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1: Single-click restore option */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Single-Click Restore Option
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Instantly restore deleted emails, attachments, calendar events, or full mailbox folders back into original user inboxes with a single click.
                </p>
              </div>
              <div className="text-xs font-extrabold text-blue-600 flex items-center gap-1">
                <span>Instant In-Place Recovery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 2: Point-in-time recovery */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-6">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Point-in-Time Recovery
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Roll back entire mailbox states to any historical snapshot date, hour, or minute before accidental deletion or corruption occurred.
                </p>
              </div>
              <div className="text-xs font-extrabold text-indigo-600 flex items-center gap-1">
                <span>Granular Time Travel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 3: Ransomware & accidental deletion protection */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Ransomware & Deletion Shield
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Immutable S3 storage with WORM (Write Once Read Many) isolation prevents ransomware, malicious wipes, or rogue admin deletions.
                </p>
              </div>
              <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                <span>Immutable WORM Storage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- 4. BACKUP SERVICES FAQS SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Retention & Security Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Backup Services FAQs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Comprehensive details on retention policies, AES-256 encryption standards, and storage limits.
            </p>
          </div>

          <div className="space-y-4">
            {backupFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-slate-50/80 border-blue-200 shadow-xs" : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "bg-blue-600 text-white rotate-180" : "bg-gray-100 text-gray-600"
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

      {/* --- BOTTOM CTA BAR --- */}
      <section className="py-12 bg-[#0B1437] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Protect Your Organization's Email Data Today</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Unlimited cloud storage, 1-click PST export, and AES-256 encryption.</p>
          </div>
          <button
            onClick={() => handleOpenAuthModal("signup")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 active:scale-95"
          >
            Deploy Email Backup Solution
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
