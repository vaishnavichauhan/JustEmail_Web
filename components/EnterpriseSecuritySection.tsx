"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle2, Server, Key, ShieldAlert } from "lucide-react";

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
    title: "AI Anti-Spam & Malware Shield",
    desc: "Real-time threat intelligence filtering stops 99.9% of spam, malicious links, zero-day malware, and phishing attacks.",
    color: "bg-purple-50 text-purple-600 border-purple-100"
  }
];

export default function EnterpriseSecuritySection() {
  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bank-Grade Email Security</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Enterprise Security & Compliance SLA
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Every business email account is protected with military-grade encryption, anti-phishing shields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${f.color} border flex items-center justify-center mb-6 shadow-xs`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enforced SLA Protection</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
