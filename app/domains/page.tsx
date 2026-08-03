"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import {
  Globe,
  Search,
  ShieldCheck,
  Zap,
  Lock,
  Share2,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Building2,
  Sparkles,
  Check,
  X,
  Layers,
  Tag
} from "lucide-react";
import Link from "next/link";

interface TldPricing {
  tld: string;
  price: string;
  badge?: string;
  popular?: boolean;
}

interface DomainTier {
  level: string;
  title: string;
  subtitle: string;
  tlds: TldPricing[];
  color: string;
}

const domainTiers: DomainTier[] = [
  {
    level: "Level 1 (L1)",
    title: "Top-Level Global TLDs",
    subtitle: "Most recognized and trusted extensions worldwide",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    tlds: [
      { tld: ".com", price: "₹899 / yr", badge: "Best Seller", popular: true },
      { tld: ".in", price: "₹499 / yr", badge: "Popular in India", popular: true },
      { tld: ".org", price: "₹999 / yr", badge: "Global Trust" }
    ]
  },
  {
    level: "Level 2 (L2)",
    title: "Regional & Commercial TLDs",
    subtitle: "Great for regional business identity and commercial brands",
    color: "bg-indigo-50 border-indigo-200 text-indigo-800",
    tlds: [
      { tld: ".co.in", price: "₹399 / yr", badge: "Hot Deal" },
      { tld: ".biz", price: "₹799 / yr" },
      { tld: ".net", price: "₹899 / yr", badge: "Commercial Standard" }
    ]
  },
  {
    level: "Level 3 (L3)",
    title: "Niche & Specialty TLDs",
    subtitle: "Tailored extensions for tech startups, e-commerce, & agencies",
    color: "bg-purple-50 border-purple-200 text-purple-800",
    tlds: [
      { tld: ".tech", price: "₹299 / yr", badge: "Startup Choice" },
      { tld: ".store", price: "₹199 / yr", badge: "E-Commerce" },
      { tld: ".agency", price: "₹1,299 / yr" },
      { tld: ".io", price: "₹2,499 / yr", badge: "SaaS Favorite" }
    ]
  }
];

const domainClients = [
  { name: "Reliance Retail Labs", domain: "relianceretail.tech" },
  { name: "Infosys Cloud Ventures", domain: "infosysventures.in" },
  { name: "Zomato Delivery Ops", domain: "zomatologistics.com" },
  { name: "HDFC Securities Tech", domain: "hdfcsec.co.in" },
  { name: "Tata Motors Innovation", domain: "tatamotors.io" },
  { name: "Tech Mahindra AI", domain: "techmahindra.agency" }
];

const domainFaqs = [
  {
    question: "What is an EPP / Auth Transfer Code and where can I find it?",
    answer: "An EPP (Extensible Provisioning Protocol) key or Auth Code is a security password required to transfer a domain between registrars. You can obtain your EPP code from your current domain registrar's admin portal under domain settings."
  },
  {
    question: "How do automated DNS & MX record configurations work with Justemail?",
    answer: "When you register or point your domain to Justemail, our platform automatically generates and configures all required MX, CNAME, SPF, DKIM, and DMARC security records for your business email accounts within seconds."
  },
  {
    question: "Is WHOIS Privacy Guard included for free with domain registrations?",
    answer: "Yes! All domain registrations with Justemail include 100% free WHOIS Privacy Guard protection. This hides your personal address, phone number, and administrative contact details from public WHOIS databases to prevent spam."
  },
  {
    question: "How long does global DNS propagation take?",
    answer: "With our automated cloud DNS infrastructure, DNS and MX record changes usually propagate globally within 15 to 30 minutes, allowing instant email routing."
  },
  {
    question: "Can I enable Auto-Renewal for my domain portfolio?",
    answer: "Yes! You can toggle Auto-Renewal on or off anytime from your dashboard to prevent domain expiry and protect your brand identity."
  }
];

export default function DomainPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExtension, setSelectedExtension] = useState(".com");
  const [searchResult, setSearchResult] = useState<{ domain: string; available: boolean; price: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const cleanedName = searchQuery.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split(".")[0];
    const fullDomain = `${cleanedName}${selectedExtension}`;

    // Price lookup based on extension
    const priceMap: Record<string, string> = {
      ".com": "₹899 / year",
      ".in": "₹499 / year",
      ".co.in": "₹399 / year",
      ".net": "₹899 / year",
      ".org": "₹999 / year",
      ".tech": "₹299 / year",
      ".store": "₹199 / year",
      ".agency": "₹1,299 / year",
      ".io": "₹2,499 / year"
    };

    setSearchResult({
      domain: fullDomain,
      available: true,
      price: priceMap[selectedExtension] || "₹899 / year"
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative selection:bg-primary selection:text-white">
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* --- 1. PAGE HEADER & BREADCRUMBS --- */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs: Home > Domains (Left Side Only) */}
          <div className="text-left mb-6">
            <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-400">Domains</span>
            </nav>
          </div>

          {/* Centered Hero Section Content */}
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">

            {/* DYNAMIC MOVING DOMAIN ICON ANIMATION */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6 flex items-center justify-center"
            >
              {/* Outer Glowing Pulsing Ring */}
              <div className="absolute w-28 h-28 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-2 border-dashed border-blue-400/40 flex items-center justify-center"
              />

              {/* Center 3D Globe Badge */}
              <div className="absolute w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <Globe className="w-8 h-8" />
              </div>

              {/* Floating Moving TLD Badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-12 px-2.5 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-[10px] font-extrabold text-blue-300 shadow-md"
              >
                .com
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-12 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-[10px] font-extrabold text-emerald-300 shadow-md"
              >
                .in
              </motion.div>

              <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-12 px-2.5 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-[10px] font-extrabold text-purple-300 shadow-md"
              >
                .co.in
              </motion.div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Automated Business Domain Registration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Find & Secure Your Perfect Business Domain Name
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Register global TLDs with automated DNS configuration, WHOIS Privacy Guard included for free, and 1-click email mailbox mapping.
            </p>

            {/* --- 2. INTERACTIVE DOMAIN SEARCH BAR --- */}
            <form onSubmit={handleDomainSearch} className="p-2 bg-white rounded-2xl shadow-2xl max-w-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 w-full">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your company name (e.g. mycompany)"
                  className="w-full text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                />
              </div>

              {/* TLD Dropdown Selector */}
              <select
                value={selectedExtension}
                onChange={(e) => setSelectedExtension(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 text-xs font-extrabold focus:outline-none border border-gray-200 cursor-pointer w-full sm:w-auto"
              >
                <option value=".com">.com (₹899)</option>
                <option value=".in">.in (₹499)</option>
                <option value=".co.in">.co.in (₹399)</option>
                <option value=".net">.net (₹899)</option>
                <option value=".org">.org (₹999)</option>
                <option value=".tech">.tech (₹299)</option>
                <option value=".store">.store (₹199)</option>
                <option value=".agency">.agency (₹1,299)</option>
                <option value=".io">.io (₹2,499)</option>
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition-all shrink-0 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Search Domain</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* SIMULATED DOMAIN SEARCH RESULT BADGE */}
            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 max-w-2xl flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-extrabold text-white text-sm">{searchResult.domain}</span>
                    <span className="text-emerald-400 font-bold ml-2">AVAILABLE!</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-white text-sm">{searchResult.price}</span>
                  <button
                    onClick={() => handleOpenAuthModal("signup")}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-sm"
                  >
                    Register Now
                  </button>
                </div>
              </motion.div>
            )}

            {/* Popular Extension Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-slate-300 font-semibold">
              <span className="text-slate-400">Popular TLDs:</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white font-bold">.com ₹899</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white font-bold">.in ₹499</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white font-bold">.co.in ₹399</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white font-bold">.tech ₹299</span>
            </div>

          </div>

        </div>
      </section>

      {/* --- 3. WHY CHOOSE JUSTEMAIL FOR DOMAINS SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Domain Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Why Choose Justemail for Domains?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Everything you need to manage your business domain and email infrastructure in one unified console.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Advantage 1: Instant Activation & Automated DNS */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                  Instant Activation & Automated DNS
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Instant domain activation with automatic MX, CNAME, SPF, DKIM, and DMARC security record creation for your email mailboxes.
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200/80 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>0-Click MX Record Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated DKIM & SPF Authentication</span>
                </div>
              </div>
            </div>

            {/* Advantage 2: Privacy Protection (WHOIS Guard) included */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                  Free WHOIS Privacy Guard Included
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  100% free WHOIS privacy protection keeps your personal home address, phone number, and admin email hidden from public databases and spammers.
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200/80 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free Forever Privacy Shield</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Spam & Telemarketer Protection</span>
                </div>
              </div>
            </div>

            {/* Advantage 3: Free Domain Forwarding & Email Alias */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-purple-300 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-6">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                  Free Domain Forwarding & Email Aliases
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Set up unlimited domain redirect rules, catch-all email aliases (e.g. sales@, info@), and URL forwarding free of charge.
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200/80 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited Catch-All Aliases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1-Click URL Redirection</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- 4. DOMAIN TLDS, TIERS & PRICING DETAILS SECTION --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Domain TLD Tiers & Pricing Details
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              No hidden renewal surcharges. Full DNS control and WHOIS Privacy Guard included on all extension levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {domainTiers.map((tier) => (
              <div key={tier.level} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${tier.color}`}>
                      {tier.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{tier.title}</h3>
                  <p className="text-xs text-gray-500 mb-6">{tier.subtitle}</p>

                  <div className="space-y-4">
                    {tier.tlds.map((tldItem) => (
                      <div key={tldItem.tld} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold text-gray-900">{tldItem.tld}</span>
                            {tldItem.badge && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-800">
                                {tldItem.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium">Annual registration & renewal</div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-extrabold text-gray-900">{tldItem.price}</div>
                          <button
                            onClick={() => handleOpenAuthModal("signup")}
                            className="mt-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
                          >
                            <span>Buy</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <button
                    // onClick={() => handleOpenAuthModal("signup")}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-sm transition-all"
                  >
                    <span>Register Domain Tier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 5. DOMAIN CLIENTS & PORTFOLIO SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Trusted Brand Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Brands Trusting Justemail for Domain Assets
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Leading enterprises, tech scale-ups, and corporate brands managing their domain portfolios with us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {domainClients.map((client) => (
              <div
                key={client.domain}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex items-center justify-between gap-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 text-blue-600 shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-gray-900">{client.name}</div>
                    <div className="text-xs font-bold text-blue-600 mt-0.5">{client.domain}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                  Managed
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 6. DOMAIN FAQS SECTION --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>EPP & Nameserver FAQs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Domain Management FAQs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Everything you need to know about EPP Transfer Codes, Nameservers, Auto-Renewal, and DNS Propagation.
            </p>
          </div>

          <div className="space-y-4">
            {domainFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-white border-blue-200 shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"
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

      {/* BOTTOM CTA BAR */}
      <section className="py-12 bg-[#0B1437] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Register Your Business Domain Today</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Instant activation, free WHOIS Privacy Guard, and automated email DNS mapping.</p>
          </div>
          <button
            onClick={() => handleOpenAuthModal("signup")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 active:scale-95"
          >
            Search & Register Domain
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
