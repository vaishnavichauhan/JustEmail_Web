"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does justEmails guarantee zero-downtime during Cross-Tenant migration?",
      a: "Our proprietary Dual-Delivery Engine routes mail through active parallel proxy endpoints. While your mailboxes and rules are migrating from Microsoft 365 or Google Workspace, incoming messages are dual-buffered to prevent any lost or bounced emails during DNS MX updates.",
    },
    {
      q: "Can I use my existing domain names with justEmails?",
      a: "Yes! You can connect unlimited custom domains. Our automated DNS governance suite provides step-by-step SPF, DKIM, and DMARC auto-configuration records for Cloudflare, GoDaddy, Namecheap, Route 53, and major providers.",
    },
    {
      q: "What security and compliance certifications are backed?",
      a: "justEmails is SOC 2 Type II certified, GDPR compliant, HIPAA compliant, and enforces AES-256 bit encryption at rest and TLS 1.3 in transit.",
    },
    {
      q: "How does the immutable automated backup vault protect against ransomware?",
      a: "Our Backup vault utilizes Write-Once-Read-Many (WORM) air-gapped storage architecture. Even if an admin credential is compromised, snapshot backups cannot be deleted or encrypted by ransomware.",
    },
    {
      q: "What is included in the 14-day free trial?",
      a: "The free trial gives you full access to all Business Email features, up to 50 test mailboxes, domain health checking, and full access to our Cross-Tenant migration simulation tool without requiring a credit card.",
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-white border-t border-gray-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-extrabold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navyBlue tracking-tight">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.q}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-base text-navyBlue flex justify-between items-center gap-4 hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm font-medium text-gray-600 border-t border-gray-100 leading-relaxed">
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
    </section>
  );
}
