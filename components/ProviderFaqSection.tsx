"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Mail
} from "lucide-react";
import Image from "next/image";

interface FaqItem {
  q: string;
  a: string;
}

interface ProviderFaqCategory {
  id: string;
  name: string;
  logo: string;
  subtitle: string;
  badge: string;
  color: string;
  questions: FaqItem[];
}

const providerFaqData: ProviderFaqCategory[] = [
  {
    id: "google",
    name: "Google Workspace",
    logo: "/images/google-workspace.png",
    subtitle: "Cloud-native Gmail, Drive & Google Meet questions",
    badge: "Most Popular Cloud Suite",
    color: "border-blue-300 bg-blue-50/50 text-blue-800",
    questions: [
      {
        q: "What is included in Google Workspace Business Starter?",
        a: "Google Workspace Business Starter includes a custom domain email address (name@yourcompany.com), 30 GB pooled cloud storage per user across Gmail and Google Drive, 100-participant Google Meet video calls, and real-time collaboration with Google Docs, Sheets, and Slides."
      },
      {
        q: "How does pooled cloud storage work in Google Workspace?",
        a: "Storage is pooled at the organization level. For example, if you purchase 10 user seats with 30 GB each, your company receives 300 GB of total shared cloud storage that any team member can use for Gmail attachments and Drive files."
      },
      {
        q: "Can I use Google Workspace Gmail with Outlook desktop or Apple Mail?",
        a: "Yes! Google Workspace fully supports IMAP, POP3, and Exchange ActiveSync protocols, allowing you to configure your custom domain Gmail inbox seamlessly on Outlook (Windows & Mac), Apple Mail, iOS, and Android native mail apps."
      },
      {
        q: "How does Justemail assist with Google Workspace setup and DKIM authentication?",
        a: "Our certified Google Workspace Deployment Specialists handle complete MX record configuration, DKIM signature generation, SPF record validation, and DMARC policy enforcement to guarantee 100% inbox delivery and zero data loss."
      }
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    logo: "/images/microsoft-365.png",
    subtitle: "Exchange Online, Outlook & Office Apps questions",
    badge: "Enterprise Standard",
    color: "border-indigo-300 bg-indigo-50/50 text-indigo-800",
    questions: [
      {
        q: "What is the difference between Exchange Online Plan 1 and Microsoft 365 Business Basic?",
        a: "Exchange Online Plan 1 provides a 50 GB dedicated business mailbox per user. Microsoft 365 Business Basic includes the 50 GB mailbox plus 1 TB OneDrive cloud storage, web and mobile Word/Excel/PowerPoint apps, and Microsoft Teams meetings."
      },
      {
        q: "What is the maximum email attachment size limit in Microsoft 365?",
        a: "Microsoft 365 supports industry-leading attachment sizes up to 150 MB per email message, making it ideal for sharing large presentation decks, design files, and financial documents."
      },
      {
        q: "Can we install desktop Outlook, Word, and Excel apps on our computers?",
        a: "Yes! If you select the Microsoft 365 Business Standard plan, each user license allows installing desktop versions of Outlook, Word, Excel, PowerPoint, and Access on up to 5 PCs or Macs per user."
      },
      {
        q: "How does 0-downtime migration work from legacy Exchange or IMAP servers to Microsoft 365?",
        a: "We perform staged cutover migrations. Our engineers copy all historical emails, calendar appointments, and contacts in the background before switching MX records, ensuring your team experiences zero email downtime."
      }
    ]
  },
  {
    id: "zoho",
    name: "Zoho Mail",
    logo: "/images/zoho-mail.png",
    subtitle: "Budget business email & NVMe storage questions",
    badge: "Best Value for Startups",
    color: "border-emerald-300 bg-emerald-50/50 text-emerald-800",
    questions: [
      {
        q: "Why is Zoho Mail recommended for budget-conscious startups?",
        a: "Zoho Mail Lite starts at just ₹58 per user/month while offering dedicated 5 GB NVMe mailbox storage, custom domain address (@yourcompany.com), 100% ad-free webmail, and mobile app access."
      },
      {
        q: "Is Zoho Mail ad-free and secure for corporate emails?",
        a: "Yes! Zoho Mail is 100% ad-free and enforces strict zero-data-mining privacy policies. All stored emails are encrypted with AES-256 bit encryption and protected with AI anti-spam filtering."
      },
      {
        q: "Can we create catch-all email aliases and group mailboxes in Zoho Mail?",
        a: "Yes! You can create unlimited email aliases (e.g. sales@, info@, support@) and departmental distribution groups free of charge within your Zoho admin console."
      }
    ]
  },
  {
    id: "titan",
    name: "Titan Mail",
    logo: "/images/titan-mail.png",
    subtitle: "Read receipts, templates & productivity features",
    badge: "Productivity Suite",
    color: "border-amber-300 bg-amber-50/50 text-amber-800",
    questions: [
      {
        q: "What unique productivity features are included in Titan Mail?",
        a: "Titan Mail includes built-in Read Receipts (know when recipients open your email), Undo Send, Follow-up Reminders, reusable Email Templates, and integrated Calendar scheduling."
      },
      {
        q: "Does Titan Mail support 1-click import from Gmail and Outlook?",
        a: "Yes! Titan includes an automated 1-click import wizard that transfers your existing inbox folders, sent messages, and contacts from Gmail, Yahoo, or Outlook in minutes."
      }
    ]
  },
  {
    id: "rediff",
    name: "Rediffmail Pro",
    logo: "/images/rediffmail.png",
    subtitle: "Indian enterprise hosting & encrypted email questions",
    badge: "Indian Enterprise Security",
    color: "border-rose-300 bg-rose-50/50 text-rose-800",
    questions: [
      {
        q: "Where are Rediffmail Pro data servers hosted?",
        a: "Rediffmail Pro infrastructure is hosted entirely within Tier-4 certified data centers located in India, ensuring total data sovereignty and compliance with Indian regulatory frameworks."
      },
      {
        q: "What advanced security features are included in Rediffmail Pro?",
        a: "Rediffmail Pro features multi-layered phishing protection, anti-spoofing shields, encrypted webmail login, IP restriction controls, and dedicated 24/7 Indian technical support."
      }
    ]
  }
];

export default function ProviderFaqSection() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const currentCategory = providerFaqData[selectedCategory];

  return (
    <section className="py-20 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Provider-Specific Assistance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Business Email Provider FAQs
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Select an official email provider on the left to view specific questions regarding features, storage, setup, and migration.
          </p>
        </div>

        {/* --- LEFT SIDE PROVIDER TABS vs RIGHT SIDE QUESTION ANSWERS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: ALL PROVIDER TABS (5 Providers) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Select Email Provider
            </div>

            {providerFaqData.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(idx);
                    setOpenQuestion(0);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#0B1437] text-white border-[#0B1437] shadow-xl translate-x-1"
                      : "bg-[#F8FAFC] text-gray-800 border-gray-200/90 hover:border-blue-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl p-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-white/10 border border-white/20" : "bg-white border border-gray-200"
                    }`}>
                      <Image
                        src={cat.logo}
                        alt={cat.name}
                        width={28}
                        height={28}
                        className="object-contain max-h-7 w-auto"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">{cat.name}</div>
                      <div className={`text-[11px] font-medium ${isSelected ? "text-slate-300" : "text-gray-500"}`}>
                        {cat.questions.length} FAQ Items
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected ? "bg-blue-500/30 text-blue-300 border border-blue-400/30" : "bg-gray-100 text-gray-700"
                  }`}>
                    {cat.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: QUESTION & ANSWER ACCORDION */}
          <div className="lg:col-span-8 bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            
            {/* Header info bar for current provider */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                  <Image src={currentCategory.logo} alt={currentCategory.name} width={28} height={28} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">{currentCategory.name} FAQ</h3>
                  <p className="text-xs text-gray-500">{currentCategory.subtitle}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${currentCategory.color}`}>
                {currentCategory.badge}
              </span>
            </div>

            {/* Accordion Questions */}
            <div className="space-y-4">
              {currentCategory.questions.map((faq, qIdx) => {
                const isOpen = openQuestion === qIdx;
                return (
                  <div
                    key={qIdx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? "bg-white border-blue-300 shadow-md" : "bg-white border-gray-200/80 hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenQuestion(isOpen ? null : qIdx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-extrabold text-gray-900 leading-snug">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
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
                          <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
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
