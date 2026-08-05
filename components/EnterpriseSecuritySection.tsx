"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Server,
  Key,
  ShieldAlert,
  FileCheck,
  UserCheck,
  DatabaseBackup,
  Award,
  Zap,
  Check
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "AES-256 Bit Encryption",
    desc: "All emails, attachments, and cloud files are encrypted at rest with FIPS 140-2 AES-256 bit keys and in transit via TLS 1.3.",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    icon: Key,
    title: "Turnkey DKIM, SPF & DMARC",
    desc: "Zero-configuration security authentication automatically protects your domain reputation and prevents spoofing or phishing.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    icon: Server,
    title: "ISO 27001 & SOC-2 Certified",
    desc: "Hosted in Tier-4 multi-region datacenters compliant with global ISO 27001, SOC-2 Type II, and GDPR privacy standards.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    icon: ShieldAlert,
    title: "AI Anti-Spam & Phishing Shield",
    desc: "Real-time threat intelligence filtering stops 99.9% of spam, malicious links, zero-day malware, and phishing attacks.",
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    icon: UserCheck,
    title: "Enforced 2FA & SAML SSO",
    desc: "Require Two-Factor Authentication (OTP, Authenticator Apps) and Single Sign-On across all corporate mailboxes.",
    color: "bg-rose-50 text-rose-600 border-rose-100"
  },
  {
    icon: DatabaseBackup,
    title: "Automated Daily Cloud Backup",
    desc: "Continuous daily backups with point-in-time recovery ensure your company emails and attachments are never lost.",
    color: "bg-amber-50 text-amber-600 border-amber-100"
  }
];

const complianceBadges = [
  "ISO 27001 Certified",
  "SOC-2 Type II Compliant",
  "GDPR & Data Privacy",
  "FIPS 140-2 Encryption",
  "HIPAA Ready",
  "Tier-4 Datacenters"
];

export default function EnterpriseSecuritySection() {
  return (
    <section id="security-compliance" className="py-20 bg-white border-t border-gray-200/80 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bank-Grade Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Enterprise Security & Compliance SLA
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Every business email account is protected with military-grade encryption, automated DKIM/DMARC protocols, and zero-ad privacy shields.
          </p>
        </div>

        {/* Security Features Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200/90 hover:border-blue-400 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${f.color} border flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-200/60 flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Enforced SLA Guarantee</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance Certification Badges Bar */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-white">Global Compliance & Audit Standard Badges</h4>
                <p className="text-xs text-slate-400">Strict adherence to international data security & privacy frameworks.</p>
              </div>
            </div>
            <div className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              100% Data Sovereignty & Zero-Ad Privacy
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {complianceBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
