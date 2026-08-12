"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import ProviderPlansSection from "@/components/ProviderPlansSection";
import ProviderComparisonTable from "@/components/ProviderComparisonTable";
import EnterpriseSecuritySection from "@/components/EnterpriseSecuritySection";
import OfficialAppsSection from "@/components/OfficialAppsSection";

import ProviderFaqSection from "@/components/ProviderFaqSection";
import {
  Sparkles,
  ShieldCheck,
  HardDrive,
  Zap,
  Check,
  ArrowRight,
  Search,
  Lock,
  Server,
  Globe,
  Mail,
  User
} from "lucide-react";
import Image from "next/image";


export default function BusinessEmailsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative selection:bg-primary selection:text-white">
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* --- 1. HERO SECTION WITH 3D ILLUSTRATION --- */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT COLUMN: Text Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Unified Enterprise Business Email Deployment</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Official Business Email <br />
                <span className="text-blue-400">For Your Domain</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Deploy Google Workspace, Microsoft 365, Titan, and Rediffmail Pro mailboxes under your domain with 0-downtime migration, automated DKIM/SPF setup, and 24/7 support.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#provider-plans"
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Explore Email Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#comparison-matrix"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  <span>Head-to-Head Comparison</span>
                </a>
              </div>

              {/* Trust Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Max 300</div>
                    <div className="text-[10px] text-slate-400">user Emails</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <HardDrive className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">Storage</div>
                    <div className="text-[10px] text-slate-400">Up to 50 GB Inbox</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Server className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">24/7 Support</div>
                    <div className="text-[10px] text-slate-400">Live Indian Team</div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* RIGHT COLUMN: 3D Illustration Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex items-center justify-center relative"
            >
              <Image
                src="/images/BusinessEmail.png"
                alt="3D Business Email Infrastructure"
                width={800}
                height={600}
                priority
                className="w-full h-auto object-contain max-w-lg drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 2. ALL PROVIDERS PLANS SECTION --- */}
      <ProviderPlansSection onOpenAuthModal={handleOpenAuthModal} />

      {/* --- 3. HEAD-TO-HEAD PROVIDER COMPARISON TABLE SECTION --- */}
      <div id="comparison-matrix">
        <ProviderComparisonTable />
      </div>

      {/* --- 4. APPS INCLUDED (IF APPLICABLE) SECTION --- */}
      <OfficialAppsSection />

      {/* --- 5. ENTERPRISE SECURITY & COMPLIANCE SLA SECTION --- */}
      <EnterpriseSecuritySection />

      {/* --- 5. PROVIDER-SPECIFIC FAQ SECTION (LEFT TABS VS RIGHT Q&A) --- */}
      <ProviderFaqSection />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
