"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Mail,
  Globe,
  HardDrive,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  badge: string;
  questions: FaqItem[];
}

const homeFaqCategories: FaqCategory[] = [
  {
    id: "provider",
    name: "All Business Email FAQ",
    description: "Questions regarding Google Workspace, Microsoft 365, Zoho Mail, Rediff, and Titan Mail",
    icon: Mail,
    badge: "5 Official Providers",
    questions: [
      {
        q: "What is the main difference between Google Workspace, Microsoft 365, and Zoho Mail?",
        a: "Google Workspace features cloud-native Gmail, Google Meet, and Drive. Microsoft 365 provides desktop Outlook, Teams, and Exchange online. Zoho Mail offers cost-effective NVMe mailbox storage with integrated business suite apps. justEmails allows you to deploy and manage all 5 official providers under one console."
      },
      {
        q: "Can I migrate my existing emails from another provider without missing any messages?",
        a: "Yes! Our certified engineers provide 100% free zero-downtime data migration. We pre-sync all legacy emails, calendars, and contacts before switching your MX records, ensuring zero data loss and zero disruption to your business."
      },
      {
        q: "Do you configure DKIM, SPF, and DMARC security records for our domain?",
        a: "Absolutely. Proper DKIM, SPF, and DMARC authentication is essential to guarantee 100% inbox delivery and prevent domain spoofing. We configure all DNS security records during initial setup."
      },
      {
        q: "Can I upgrade or add more email user licenses as my company grows?",
        a: "Yes, you can instantly add or remove user mailbox licenses or upgrade to higher storage tiers anytime directly from your dashboard."
      }
    ]
  },
  {
    id: "domain",
    name: "Domain FAQ",
    description: "DNS records, MX configuration, domain ownership, and custom branding setup",
    icon: Globe,
    badge: "DNS & Branding",
    questions: [
      {
        q: "Can I use my existing business domain name (e.g. name@yourcompany.com)?",
        a: "Yes! You can connect your existing domain from GoDaddy, Namecheap, Cloudflare, Hostinger, or any DNS registrar. We will configure your MX, CNAME, SPF, and TXT records."
      },
      {
        q: "What if I don't have a domain name yet?",
        a: "Our team can register a new custom domain name for your company and automatically configure it for email deployment in less than 15 minutes."
      },
      {
        q: "How long does domain MX record propagation take?",
        a: "With our automated DNS routing, MX record changes usually propagate within 15 to 30 minutes globally, keeping your email delivery active without interruption."
      },
      {
        q: "Can I host multiple domain names on a single email admin console?",
        a: "Yes! justEmails supports multi-tenant and multi-domain management, allowing you to manage multiple business domains from a unified dashboard."
      }
    ]
  },
  {
    id: "backup",
    name: "Backup FAQ",
    description: "Automated cloud backup schedules, PST/MBOX export, and disaster recovery",
    icon: HardDrive,
    badge: "Disaster Recovery",
    questions: [
      {
        q: "How does automated cloud email backup work with justEmails?",
        a: "We perform automated daily snapshots of your mailboxes, attachments, contacts, and calendar data into encrypted S3 cloud storage with 256-bit AES encryption."
      },
      {
        q: "Can I restore accidentally deleted emails or employee mailboxes?",
        a: "Yes, our 1-click restore system allows you to recover deleted emails, folders, or entire mailboxes back to any point in time within seconds."
      },
      {
        q: "Can I export my backup data into standard PST or MBOX files?",
        a: "Yes! You can export full or granular mailbox backups into standard Outlook PST, MBOX, or EML formats at any time."
      },
      {
        q: "Are the backups compliant with data retention regulations?",
        a: "Yes, our cloud backups comply with enterprise data retention, eDiscovery, and GDPR standards to protect your organization against data loss and ransomware."
      }
    ]
  }
];

export default function HomePageFaqSection() {
  const [activeTab, setActiveTab] = useState<string>("provider");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentCategory = homeFaqCategories.find((c) => c.id === activeTab) || homeFaqCategories[0];

  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Find instant answers regarding provider plans, domain MX setup, data migration, and automated email backups.
          </p>
        </div>

        {/* 2-Column Split: Left Tabs vs Right Accordion Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDE: FAQ CATEGORY SELECTOR TABS (1. All Email Provider FAQ, 2. Domain FAQ, 3. Backup FAQ) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2 px-1">
              Select FAQ Category
            </div>

            {homeFaqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setOpenFaqIndex(0); // Reset first open question
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${isActive
                    ? "bg-[#0B1437] text-white border-[#0B1437] shadow-lg scale-[1.02]"
                    : "bg-white text-gray-900 border-gray-200/80 hover:bg-gray-50 hover:border-gray-300 shadow-xs"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isActive ? "bg-white/10 text-white" : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-extrabold">{cat.name}</h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isActive ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" : "bg-gray-100 text-gray-600"
                        }`}>
                        {cat.badge}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isActive ? "text-slate-300" : "text-gray-500"}`}>
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Need More Assistance Box */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs mt-6 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto" />
              <h5 className="text-sm font-extrabold text-gray-900">Have specific questions?</h5>
              <p className="text-xs text-gray-500">Our email migration engineers are available 24/7 to help you.</p>
              {/* <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all"
              >
                <span>Chat on WhatsApp</span>
              </a> */}
            </div>
          </div>

          {/* RIGHT SIDE: ACCORDION QUESTION & ANSWERS FOR SELECTED CATEGORY */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">

            <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Active Category</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">{currentCategory.name}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <currentCategory.icon className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {currentCategory.questions.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-slate-50/80 border-blue-200 shadow-xs" : "bg-white border-gray-200/80 hover:border-gray-300"
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                        {faq.q}
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
                          <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
