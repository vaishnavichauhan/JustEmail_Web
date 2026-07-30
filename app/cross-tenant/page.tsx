"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cartContext";
import {
  Share2,
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Building2,
  Sparkles,
  Check,
  Globe,
  Cpu,
  RefreshCw,
  DollarSign,
  Users,
  Mail,
  SlidersHorizontal,
  Server,
  Lock,
  ShoppingCart
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HybridProviderSelection {
  googleSeats: number;
  microsoftSeats: number;
  zohoSeats: number;
  titanSeats: number;
}

const supportedPlatforms = [
  {
    name: "Google Workspace",
    role: "Gmail & Google Drive",
    logo: "/images/google-workspace.png",
    pricePerSeat: 136,
    color: "border-blue-200 bg-blue-50/50"
  },
  {
    name: "Microsoft 365",
    role: "Exchange & Office Apps",
    logo: "/images/microsoft-365.png",
    pricePerSeat: 145,
    color: "border-indigo-200 bg-indigo-50/50"
  },
  {
    name: "Zoho Mail",
    role: "NVMe Mailbox Storage",
    logo: "/images/zoho-mail.png",
    pricePerSeat: 58,
    color: "border-emerald-200 bg-emerald-50/50"
  },
  {
    name: "Titan Mail",
    role: "Business Mail & Calendar",
    logo: "/images/titan-mail.png",
    pricePerSeat: 79,
    color: "border-amber-200 bg-amber-50/50"
  },
  {
    name: "Rediffmail Pro",
    role: "Encrypted Indian Webmail",
    logo: "/images/rediffmail.png",
    pricePerSeat: 89,
    color: "border-red-200 bg-red-50/50"
  }
];

const crossTenantFaqs = [
  {
    q: "Can I really use Google Workspace and Microsoft 365 under the SAME domain name (e.g. abc.com)?",
    a: "Yes! With Justemail Smart Split-Domain Routing, you can have 2 users on Google Workspace (ceo@abc.com, cto@abc.com) and 3 users on Microsoft 365 (sales@abc.com, finance@abc.com) simultaneously under the exact same @abc.com domain name without any email bounces."
  },
  {
    q: "How does email routing work between Google Workspace and Microsoft 365?",
    a: "We configure primary MX Smart Routing and dual-delivery transport rules. When an email arrives for sales@abc.com, our smart router checks the recipient's assigned provider platform and routes the email directly to Microsoft 365. If sent to ceo@abc.com, it routes directly to Google Workspace."
  },
  {
    q: "Will emails bounce when a Google user emails a Microsoft user inside the same company?",
    a: "No. We set up non-local recipient fallback routing and internal smart host connectors on both Google Admin Console and Microsoft 365 Exchange Admin Center. Internal emails flow seamlessly between platforms."
  },
  {
    q: "How much money can split-domain cross-tenant setup save our company?",
    a: "Companies save 30% to 60% on annual email licensing costs! Instead of paying ₹660/month for every employee, you can assign high-tier Microsoft 365 desktop app licenses only to power users who need Excel/Word, and assign affordable Google Workspace or Zoho Mail seats to deskless workers."
  },
  {
    q: "Will we receive one unified bill for all different email providers?",
    a: "Yes! Justemail consolidates all your multi-provider seats (Google + Microsoft + Zoho + Titan) into a single invoice with unified admin management."
  }
];

export default function CrossTenantPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Hybrid Configurator State
  const [domainName, setDomainName] = useState("abc.com");
  const [seats, setSeats] = useState<HybridProviderSelection>({
    googleSeats: 2,
    microsoftSeats: 3,
    zohoSeats: 0,
    titanSeats: 0
  });

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSeatChange = (key: keyof HybridProviderSelection, delta: number) => {
    setSeats((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const totalSeats = seats.googleSeats + seats.microsoftSeats + seats.zohoSeats + seats.titanSeats;
  const monthlyCost = (seats.googleSeats * 136) + (seats.microsoftSeats * 145) + (seats.zohoSeats * 58) + (seats.titanSeats * 79);
  const annualCost = monthlyCost * 12;

  const handleAddHybridToCart = () => {
    // Add selected items to cart
    if (seats.googleSeats > 0) {
      addToCart({
        id: "google-starter",
        providerId: "google-workspace",
        providerName: "Google Workspace",
        planName: "Business Starter",
        price: "₹136",
        amountNumeric: 136,
        period: "/ user / month",
        logo: "/images/google-workspace.png",
        storage: "30 GB Cloud Storage",
        sla: "99.9% SLA",
        attachment: "25 MB",
        features: ["Gmail @ " + (domainName || "abc.com"), "Google Meet"]
      }, seats.googleSeats);
    }
    if (seats.microsoftSeats > 0) {
      addToCart({
        id: "ms-basic",
        providerId: "microsoft-365",
        providerName: "Microsoft 365",
        planName: "Business Basic",
        price: "₹145",
        amountNumeric: 145,
        period: "/ user / month",
        logo: "/images/microsoft-365.png",
        storage: "50 GB Mailbox",
        sla: "99.9% SLA",
        attachment: "150 MB",
        features: ["Outlook @ " + (domainName || "abc.com"), "Microsoft Teams"]
      }, seats.microsoftSeats);
    }
    if (seats.zohoSeats > 0) {
      addToCart({
        id: "zoho-lite",
        providerId: "zoho-mail",
        providerName: "Zoho Mail",
        planName: "Mail Lite",
        price: "₹58",
        amountNumeric: 58,
        period: "/ user / month",
        logo: "/images/zoho-mail.png",
        storage: "5 GB Storage",
        sla: "99.9% SLA",
        attachment: "25 MB",
        features: ["Zoho Mail @ " + (domainName || "abc.com")]
      }, seats.zohoSeats);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative selection:bg-primary selection:text-white">
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* --- 1. HERO SECTION & LIVE EXAMPLE --- */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white relative overflow-hidden">

        {/* Glow Accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs: Home > Cross-Tenant */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400">Cross-Tenant Coexistence</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content with Staggered Motion */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-Provider Split Domain Technology</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
              >
                One Domain. <br />
                <span className="text-blue-400">Multiple Email Providers.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
              >
                Use your domain across different email providers simultaneously. Mix <strong className="text-white">Google Workspace</strong> and <strong className="text-white">Microsoft 365</strong> mailboxes under the exact same domain name!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-2 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real Example: Single Business Domain (e.g. domain.com)</span>
                </div>
                <div>• <strong>2 Mailboxes on Google Workspace:</strong> ceo@domain, cto@domain</div>
                <div>• <strong>3 Mailboxes on Microsoft 365:</strong> sales@domain, finance@domain, ops@domain</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-2 flex flex-wrap items-center gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#choose-provider-emails"
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <span>Configure Hybrid Domain Mailboxes</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Hero Right 3D Diagram Illustration with Motion & Levitation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex items-center justify-center relative"
            >
              {/* Continuous Levitation Motion Container */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full flex items-center justify-center"
              >
                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

                <Image
                  src="/images/cross-tenant-3d.png"
                  alt="3D Cross-Tenant Split Domain Email Routing Illustration"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto object-contain max-w-lg drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl relative z-10"
                />

                {/* Floating Orbit Badge 1: Google Workspace */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-white"
                >
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span>Google: ceo@domain</span>
                </motion.div>

                {/* Floating Orbit Badge 2: Microsoft 365 */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-white"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
                  <span>Microsoft: sales@domain</span>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* --- 2. CHOOSE PROVIDER EMAILS (INTERACTIVE SPLIT DOMAIN CALCULATOR) --- */}
      <section id="choose-provider-emails" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Interactive Configurator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Choose Provider Emails for Your Domain
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select how many mailboxes you want from Google, Microsoft, Zoho, or Titan under your single business domain.
            </p>
          </div>

          {/* Configurator Box */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md max-w-5xl mx-auto">

            {/* Domain Input Field */}
            <div className="mb-8 p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full">
                <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="w-full">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase">Your Domain Name</label>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="yourcompany.com"
                    className="w-full text-sm font-extrabold text-gray-900 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 shrink-0 border border-blue-100">
                Split-Domain Active
              </span>
            </div>

            {/* Provider Seat Selector Grid (Google & Microsoft Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">

              {/* Google Seat Selector */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
                <Image src="/images/google-workspace.png" alt="Google" width={36} height={36} className="mx-auto max-h-7 w-auto object-contain" />
                <div className="text-xs font-extrabold text-gray-900">Google Workspace</div>
                <div className="text-xs font-bold text-blue-600">₹136 / seat / mo</div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleSeatChange("googleSeats", -1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 font-bold hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-sm font-extrabold text-gray-900 w-6">{seats.googleSeats}</span>
                  <button
                    onClick={() => handleSeatChange("googleSeats", 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 font-bold hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <div className="text-[10px] text-gray-500">Gmail @ {domainName || "domain"}</div>
              </div>

              {/* Microsoft Seat Selector */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
                <Image src="/images/microsoft-365.png" alt="Microsoft" width={36} height={36} className="mx-auto max-h-7 w-auto object-contain" />
                <div className="text-xs font-extrabold text-gray-900">Microsoft 365</div>
                <div className="text-xs font-bold text-blue-600">₹145 / seat / mo</div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleSeatChange("microsoftSeats", -1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 font-bold hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-sm font-extrabold text-gray-900 w-6">{seats.microsoftSeats}</span>
                  <button
                    onClick={() => handleSeatChange("microsoftSeats", 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 font-bold hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <div className="text-[10px] text-gray-500">Outlook @ {domainName || "domain"}</div>
              </div>

            </div>

            {/* Combined Total Summary Bar */}
            <div className="p-6 rounded-2xl bg-[#0B1437] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div>
                <div className="text-xs text-blue-300 font-bold uppercase">Combined Hybrid Setup ({totalSeats} Total Seats)</div>
                <div className="text-2xl font-extrabold mt-1">₹{annualCost.toLocaleString("en-IN")} <span className="text-xs text-slate-300 font-normal">/ year</span></div>
                <div className="text-[11px] text-slate-400">Includes 0-downtime MX Smart Routing setup</div>
              </div>

              <Link
                href="/checkout"
                onClick={handleAddHybridToCart}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Deploy Split Domain Mailboxes</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* --- 3. HOW IT WORKS (STEP-BY-STEP ARCHITECTURE) --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              How Cross-Tenant Coexistence Works
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Four simple technical steps to route emails across multiple providers under one domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Smart MX Routing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your domain's primary MX record points to Justemail Smart Inbound Router which inspects the recipient address.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Dual Delivery Rules</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transport rules forward emails to Google Workspace or Microsoft 365 Exchange endpoints based on assigned seat mapping.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Internal Fallback</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Non-local recipient fallback routing ensures internal emails between Google & Microsoft users never bounce.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Single Admin Portal</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Manage all user seats across all providers from a single administrative dashboard with one consolidated bill.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- 4. SUPPORTED PLATFORMS SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Supported Platforms
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Mix & Match Official Email Platforms
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Combine any of the following 5 official cloud email providers under your domain.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {supportedPlatforms.map((p) => (
              <div
                key={p.name}
                className={`p-6 rounded-2xl border ${p.color} text-center flex flex-col items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0">
                  <Image src={p.logo} alt={p.name} width={36} height={36} className="object-contain max-h-8 w-auto" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-gray-900">{p.name}</div>
                  <div className="text-[11px] font-bold text-blue-600 mt-0.5">₹{p.pricePerSeat} / mo</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 5. WHAT WE OFFER (KEY HYBRID FEATURES) --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Key Value Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              What We Offer in Cross-Tenant Setup
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Unified Single Domain Branding</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All team members use the exact same branded domain name (@yourcompany.com) regardless of which provider backend hosts their inbox.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">30% to 60% Licensing Savings</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Stop overpaying for high-tier Microsoft desktop licenses for deskless workers. Assign budget Zoho or Google seats to basic users.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Zero-Downtime MX Switch</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add or move users between Google Workspace and Microsoft 365 anytime without changing MX records or experiencing email downtime.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- 6. CROSS-TENANT FAQS SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cross-Tenant Technical FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Cross-Tenant Coexistence FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {crossTenantFaqs.map((faq, idx) => {
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
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
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

      {/* BOTTOM CTA BAR */}
      <section className="py-12 bg-[#0B1437] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">Deploy Split-Domain Mailboxes for Your Domain Today</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Mix Google Workspace + Microsoft 365 under your single domain.</p>
          </div>
          <button
            onClick={() => handleOpenAuthModal("signup")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 active:scale-95"
          >
            Get Cross-Tenant Setup
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
