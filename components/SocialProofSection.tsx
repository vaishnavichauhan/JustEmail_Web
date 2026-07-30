"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Award, Building2 } from "lucide-react";
import Image from "next/image";

const clientLogos = [
  { name: "Reliance Industries", logo: "/images/reliance.png" },
  { name: "Infosys", logo: "/images/infosys.png" },
  { name: "Zomato", logo: "/images/zomato.png" },
  { name: "HDFC Bank", logo: "/images/hdfc.png" },
  { name: "Tata Motors", logo: "/images/tata.png" },
  { name: "Tech Mahindra", logo: "/images/techm.png" }
];

const techPartners = [
  { name: "Google Workspace", role: "Official Cloud Partner", logo: "/images/google-workspace.png" },
  { name: "Microsoft 365", role: "CSP Tier-1 Direct Partner", logo: "/images/microsoft-365.png" },
  { name: "Zoho Mail", role: "Authorized Enterprise Partner", logo: "/images/zoho-mail.png" },
  { name: "Titan Mail", role: "Authorized Global Distributor", logo: "/images/titan-mail.png" },
  { name: "Rediffmail Pro", role: "Strategic Infrastructure Partner", logo: "/images/rediffmail.png" }
];

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Chief Technology Officer",
    company: "Nexus Logistics Pvt Ltd",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    caseStudy: "Migrated 850 Mailboxes with 0 Downtime",
    quote: "justEmails executed our 850-user Google Workspace to Microsoft 365 cross-tenant migration with complete precision. Not a single email was missed during the MX record switch, and their 24/7 support is outstanding.",
    metrics: "100% Data Preserved • 0 Min Downtime"
  },
  {
    id: 2,
    name: "Priya Venkatesh",
    role: "VP of IT & Operations",
    company: "Apex Healthcare Solutions",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    caseStudy: "Saved 40% Annual Email Licensing Cost",
    quote: "We switched 400 team members to Zoho Mail Workplace through justEmails. Their expert admin setup included full DKIM, SPF, and DMARC anti-phishing policies. We saved ₹12 Lakhs annually while getting superior uptime.",
    metrics: "₹12L Annual Savings • 100% Compliance"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "Head of Infrastructure",
    company: "Zenith Retail Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    caseStudy: "2,400 Titan & Workspace Mailboxes Provisioned",
    quote: "Managing business mailboxes across 15 retail sub-brands used to be a nightmare. justEmails consolidated our domain portfolio into a single administrative console with automated cloud backups. Highly recommended!",
    metrics: "15 Sub-domains Unified • 99.99% SLA"
  }
];

export default function SocialProofSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white border-y border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 1. TECHNOLOGY PARTNERS BAR */}
        <div>
          <div className="text-center mb-8">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Strategic Alliances
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
              Authorized Technology Partners
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Direct cloud deployment partnerships with global email infrastructure leaders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {techPartners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200/80 hover:border-blue-400 hover:bg-white transition-all duration-300 text-center flex flex-col items-center justify-center gap-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={40}
                    height={40}
                    className="object-contain max-h-8 w-auto group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-gray-900">{partner.name}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{partner.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MARQUEE CLIENT LOGOS TRUST BAR */}
        <div className="pt-10 border-t border-gray-100 overflow-hidden">
          <div className="text-center mb-8">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-1">
              TRUSTED BY 10,000+ FAST-GROWING ORGANIZATIONS ACROSS INDIA
            </div>
          </div>

          {/* Continuous Marquee Track */}
          <div className="relative w-full overflow-hidden py-2">
            <motion.div
              className="flex items-center gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-50 border border-gray-200/80 text-xs font-extrabold text-gray-800 shrink-0 shadow-xs hover:bg-white hover:border-blue-300 transition-all"
                >
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{client.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 3. CUSTOMER TESTIMONIALS SLIDER */}
        <div className="pt-10 border-t border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-emerald-100">
              <Award className="w-3.5 h-3.5" />
              <span>Client Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Customer Testimonials & Case Studies
            </h2>
          </div>

          {/* Testimonial Card Slider */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {testimonials.map((t, index) => {
                if (index !== activeTestimonial) return null;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#0B1437] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <Quote className="w-20 h-20 text-white/5 absolute -bottom-4 -right-4 pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400 shadow-md"
                        />
                        <div>
                          <h4 className="text-lg sm:text-xl font-extrabold">{t.name}</h4>
                          <div className="text-xs text-blue-300 font-semibold">{t.role} • {t.company}</div>
                        </div>
                      </div>

                      {/* Case Study Badge */}
                      <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        🏆 {t.caseStudy}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-6 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-300 ml-2">5.0 / 5.0 Verified Review</span>
                    </div>

                    {/* Quote */}
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic mb-8">
                      "{t.quote}"
                    </p>

                    {/* Case Study Metrics */}
                    <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span>Impact Metric: <strong className="text-emerald-400 font-extrabold">{t.metrics}</strong></span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? "w-8 bg-blue-600" : "w-2.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                title="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
