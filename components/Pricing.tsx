"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";

export default function Pricing({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Starter Mailbox",
      tagline: "Essential business email for small teams and startups.",
      monthlyPrice: "$4.50",
      yearlyPrice: "$3.60",
      period: "/ mailbox / month",
      featured: false,
      buttonText: "Start 14-Day Free Trial",
      features: [
        "25 GB Storage Per Mailbox",
        "Custom Domain Email Address",
        "Webmail, iOS & Android Apps",
        "Standard Anti-Spam Protection",
        "Domain DNS Setup Wizard",
        "Daily Email Backup (30-day retention)",
        "Email & Chat Support",
      ],
    },
    {
      name: "Business Pro",
      tagline: "Comprehensive platform with Cross-Tenant migration.",
      monthlyPrice: "$8.00",
      yearlyPrice: "$6.40",
      period: "/ mailbox / month",
      featured: true,
      badge: "Most Popular",
      buttonText: "Get Started Now",
      features: [
        "100 GB Storage Per Mailbox",
        "Unlimited Custom Domains",
        "Zero-Downtime Cross-Tenant Migration Tool",
        "AI Phishing & Zero-Day Spam Protection",
        "SPF, DKIM & DMARC Automated Health Checker",
        "Unified Admin Console & RBAC Rules",
        "Hourly Immutable Backup Vault (1-Year Retention)",
        "24/7 Priority Tech Support",
      ],
    },
    {
      name: "Enterprise Migration & Vault",
      tagline: "Full multi-tenant governance, custom SLAs and DLP rules.",
      monthlyPrice: "$14.00",
      yearlyPrice: "$11.20",
      period: "/ mailbox / month",
      featured: false,
      buttonText: "Contact Enterprise Sales",
      features: [
        "Unlimited Storage Mailboxes",
        "Dedicated Cross-Tenant Migration Pipeline",
        "SSO (Azure AD, Okta, Google Workspace)",
        "Advanced Data Loss Prevention (DLP)",
        "7-Year Air-Gapped Compliance Vault (WORM)",
        "Dedicated Account Executive & Onboarding Team",
        "99.999% Financial SLA Guarantee",
        "Custom Security Auditing & SOC2 Reports",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3"
          >
            Transparent Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navyBlue tracking-tight"
          >
            Simple Plans with Zero Hidden Fees
          </motion.h2>
          <p className="mt-4 text-gray-600 font-medium text-lg">
            Scale your business mailboxes and migration bandwidth on your terms.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                !isYearly ? "bg-navyBlue text-white shadow-sm" : "text-gray-600 hover:text-navyBlue"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                isYearly ? "bg-primary text-white shadow-glow" : "text-gray-600 hover:text-navyBlue"
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-900 text-[10px] font-extrabold uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? "bg-navyBlue text-white shadow-2xl border-2 border-primary scale-105 z-10"
                  : "bg-white text-navyBlue border border-gray-200 shadow-card hover:shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-glow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold tracking-tight mb-2">{plan.name}</h3>
                <p className={`text-xs font-medium mb-6 ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-gray-200/40">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-xs font-semibold ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm font-semibold">
                      <div className={`p-1 rounded-full shrink-0 ${
                        plan.featured ? "bg-primary text-white" : "bg-primary-light text-primary"
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={plan.featured ? "text-gray-100" : "text-gray-700"}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenAuthModal ? onOpenAuthModal("signup") : null}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary-hover shadow-glow"
                    : "bg-navyBlue text-white hover:bg-primary hover:text-white"
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
