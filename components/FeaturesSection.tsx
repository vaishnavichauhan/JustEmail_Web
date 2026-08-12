"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  RefreshCw,
  Globe,
  Sliders,
  Database,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Lock,
  FileCheck,
  HardDrive,
  Cpu,
  Check
} from "lucide-react";

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("business-emails");

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-extrabold tracking-widest text-primary mb-3"
          >
            Core Platform Capability
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-customBlack tracking-tight"
          >
            Engineered for High-Performance Email Infrastructure
          </motion.p>
          <p className="mt-4 text-gray-600 text-lg font-medium">
            Explore the five pillars powering modern enterprise communications.
          </p>
        </div>

        {/* --- 1. BUSINESS EMAILS SECTION --- */}
        <div id="business-emails" className="scroll-mt-32 mb-28">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-gray-200/90 shadow-card bg-gradient-to-br from-white via-blue-50/20 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold tracking-wider text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
                  01. Business Emails
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
                  Ultra-Fast, Secure & Branded Mailboxes
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Equip your workforce with custom domain email addresses (`name@company.com`). Built on ultra-low latency NVMe infrastructure with AI-driven spam defense and built-in encryption.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navyBlue text-sm">99.999% SLA Uptime</h4>
                      <p className="text-xs text-gray-500 mt-1">Multi-region redundant mail nodes with auto-failover.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navyBlue text-sm">AI Anti-Spam Shield</h4>
                      <p className="text-xs text-gray-500 mt-1">Blocks 99.9% of phishing & zero-day malware before delivery.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navyBlue text-sm">Shared Inbox & Aliases</h4>
                      <p className="text-xs text-gray-500 mt-1">Unlimited email aliases and collaborative group mailboxes.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navyBlue text-sm">Cross-Device Sync</h4>
                      <p className="text-xs text-gray-500 mt-1">Full support for Outlook, Apple Mail, iOS, Android & Web.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card Mock */}
              <div className="lg:col-span-6">
                <div className="relative bg-navyBlue rounded-2xl p-6 text-white shadow-2xl border border-navyBlue/40">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span className="text-xs text-gray-300 ml-2 font-mono">webmail.justemails.io</span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-primary text-white font-bold">Encrypted TLS 1.3</span>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                          ES
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Executive Board Update</div>
                          <div className="text-[11px] text-gray-300">To: team@enterprise.com</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">Verified SPF</span>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                          HQ
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Q3 Financial Audit & Compliance</div>
                          <div className="text-[11px] text-gray-400">To: finance@enterprise.com</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">10:42 AM</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-primary/20 rounded-xl border border-primary/40 flex items-center justify-between text-xs">
                    <span className="text-blue-200">Storage Used: 4.2 GB / 50 GB per mailbox</span>
                    <span className="font-bold text-white">Auto-Expanding Vault</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* --- 2. CROSS-TENANT MIGRATION SECTION --- */}
        <div id="cross-tenant" className="scroll-mt-32 mb-28">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-gray-200/90 shadow-card bg-gradient-to-br from-white via-slate-50 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h4 className="font-bold text-navyBlue text-sm flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '6s' }} />
                      Tenant-to-Tenant Migration Engine
                    </h4>
                    <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full">
                      Zero Downtime
                    </span>
                  </div>

                  {/* Flow Animation Graphic */}
                  <div className="grid grid-cols-3 gap-2 items-center text-center py-4">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="text-xs font-bold text-navyBlue">Source Tenant</div>
                      <div className="text-[11px] text-primary font-semibold mt-1">Microsoft 365</div>
                      <div className="text-[10px] text-gray-400 mt-1">500 Mailboxes</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-full h-1 bg-primary relative overflow-hidden rounded-full mb-1">
                        <motion.div
                          className="h-full bg-navyBlue w-1/2"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-primary">1.2 GB/s Live Sync</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-xs font-bold text-navyBlue">Target Tenant</div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">Google Workspace</div>
                      <div className="text-[10px] text-gray-400 mt-1">Mapped & Ready</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-navyBlue">Migration Progress</span>
                      <span className="text-primary">94.8% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-[94.8%]"></div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium pt-1">
                      ✓ Emails, Folders, Contacts, Calendars, and Rule Permissions are automatically preserved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold tracking-wider text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
                  02. Cross-Tenant Migration
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
                  Seamless Tenant-to-Tenant Email Migration
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Effortlessly move thousands of mailboxes between Microsoft 365, Google Workspace, Hosted Exchange, and IMAP servers with zero business disruption.
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Dual-Delivery Engine ensures zero dropped emails during DNS switchovers.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Automated user mapping, alias sync, and calendar invite re-routing.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Pre-migration audit tool checks for oversized mailboxes & policy conflicts.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>


        {/* --- 3. DOMAINS SECTION --- */}
        <div id="domains" className="scroll-mt-32 mb-28">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-gray-200/90 shadow-card bg-gradient-to-br from-white via-blue-50/20 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold tracking-wider text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
                  03. Domain Management
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
                  Automated Domain & DNS Health Governance
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Never suffer from email land in spam folders. Our domain management wizard continuously monitors SPF, DKIM, DMARC, and MX records for 100% email deliverability.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <div>
                        <div className="text-sm font-bold text-navyBlue">SPF Record Verification</div>
                        <div className="text-xs text-gray-500 font-mono">v=spf1 include:spf.justemails.io ~all</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Valid</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <div>
                        <div className="text-sm font-bold text-navyBlue">DKIM 2048-Bit Key Signature</div>
                        <div className="text-xs text-gray-500 font-mono">selector1._domainkey.company.com</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Signed</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <div>
                        <div className="text-sm font-bold text-navyBlue">DMARC Enforcement (p=reject)</div>
                        <div className="text-xs text-gray-500 font-mono">v=DMARC1; p=reject; rua=mailto:dmarc@company.com</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Protected</span>
                  </div>
                </div>
              </div>

              {/* Visual Graphic */}
              <div className="lg:col-span-6">
                <div className="bg-navyBlue text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">Central Domain Hub</div>
                  <h4 className="text-2xl font-bold mb-4">Multi-Domain Portfolio</h4>

                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">company.com</span>
                      <span className="text-emerald-400 font-bold">120 Mailboxes • Active</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">brand-europe.eu</span>
                      <span className="text-emerald-400 font-bold">45 Mailboxes • Active</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">support-desk.io</span>
                      <span className="text-emerald-400 font-bold">12 Shared Mailboxes</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-between">
                    <span>Automated DNS Health Monitoring Active</span>
                    <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* --- 4. MANAGEMENT SECTION --- */}
        <div id="management" className="scroll-mt-32 mb-28">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-gray-200/90 shadow-card bg-gradient-to-br from-white via-slate-50 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-primary" />
                      <span className="font-bold text-navyBlue text-sm">Unified Admin Console</span>
                    </div>
                    <span className="text-xs bg-primary-light text-primary font-bold px-2.5 py-0.5 rounded">
                      RBAC Controls
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="text-gray-500 font-medium">User Provisioning</div>
                      <div className="font-bold text-navyBlue mt-1">1-Click Offboarding</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="text-gray-500 font-medium">Data Loss Prevention</div>
                      <div className="font-bold text-emerald-600 mt-1">Strict Rules Active</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-[11px]">
                    <div className="text-gray-400 mb-1">// System Audit Trail</div>
                    <div>[10:34:12] Admin created mailbox alex@company.com</div>
                    <div>[10:35:00] Applied Policy #402: Force MFA & Block Forwarding</div>
                    <div className="text-emerald-400">[OK] Permissions Synced Across Workspace</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold tracking-wider text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
                  04. Centralized Management
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
                  Granular Admin Controls & Compliance Policies
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Take complete control over multi-tenant email organizations. Set role-based permissions, automate employee provisioning, enforce DLP rules, and review immutable audit logs.
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Single-Sign-On (SSO) integration with Azure AD, Okta, and Google Workspace.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Automated account deactivation & instant mailbox forwarding routing.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-navyBlue">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Comprehensive real-time activity logs and security compliance reports.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>


        {/* --- 5. BACKUP SECTION --- */}
        <div id="backup" className="scroll-mt-32">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-gray-200/90 shadow-card bg-gradient-to-br from-white via-blue-50/20 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Database className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold tracking-wider text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
                  05. Backup & Recovery
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
                  Automated Air-Gapped Email Backup Vault
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Protect business memory from ransomware, accidental deletion, or malicious wipes. Instant point-in-time recovery for mailboxes, attachments, contacts, and calendar items.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-bold text-navyBlue text-sm">Immutable Vault</h4>
                    <p className="text-xs text-gray-500 mt-1">Write-Once-Read-Many (WORM) storage prevents ransomware encryption.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <Zap className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-bold text-navyBlue text-sm">1-Click Granular Restore</h4>
                    <p className="text-xs text-gray-500 mt-1">Restore a single deleted email or an entire mailbox in seconds.</p>
                  </div>
                </div>
              </div>

              {/* Visual Graphic */}
              <div className="lg:col-span-6">
                <div className="bg-navyBlue text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      <span className="font-bold text-sm">Snapshot Recovery Manager</span>
                    </div>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded">
                      Protected
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Daily Automatic Snapshot</div>
                        <div className="text-[10px] text-gray-300">July 29, 2026 • 04:00 AM</div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white font-bold rounded-lg text-[11px] hover:bg-primary-hover transition-colors">
                        Restore Now
                      </button>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Retention Policy</div>
                        <div className="text-[10px] text-gray-400">7-Year Unlimited Compliance Vault</div>
                      </div>
                      <span className="text-gray-400 text-[11px]">Active</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl text-[11px] text-gray-300 flex items-center justify-between border border-white/10">
                    <span>Export Formats: PST, EML, MBOX, PDF</span>
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
