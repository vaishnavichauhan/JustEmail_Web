"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  MailPlus,
  Send,
  Mail,
  Server,
  Zap,
  HardDrive,
  Headphones,
  Lock,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    name: "Google Workspace",
    image: "/images/google-workspace.png",
    slug: "/business-emails/google-workspace",
  },
  {
    name: "Microsoft 365",
    image: "/images/microsoft-365.png",
    slug: "/business-emails/microsoft-365",
  },
  {
    name: "Rediffmail",
    image: "/images/rediffmail.png",
    slug: "/business-emails/rediffmail-pro",
  },
  {
    name: "Titan Mail",
    image: "/images/titan-mail.png",
    slug: "/business-emails/titan-mail",
  },
];

const slides = [
  {
    id: 1,
    badge: "Enterprise Email Solutions",
    title: "Reliable, Scalable & Secure Business Email Solutions for Every Enterprise.",
    description: "Complete email infrastructure, seamless cross-tenant migrations, domain registration, and 24/7 managed setup.",
    primaryCta: { label: "Get Started Now", href: "/business-emails" },
    secondaryCta: { label: "Explore Email Plans", href: "/business-emails" },
    highlightText: "500+ Enterprises Trust justEmail",
    ratingText: "4.9/5 Star Customer Rating",
    visualType: "dashboard",
    bgGradient: "from-[#0A1128] via-[#0B1437] to-[#14214D]",
  },
  {
    id: 2,
    badge: "Certified Provider Suite",
    title: "Deploy Google Workspace, Microsoft 365 & Titan Mail from One Partner.",
    description: "Get wholesale pricing, hybrid tenant coexistence, consolidated billing, and expert 24/7 technical setup for top email platforms.",
    primaryCta: { label: "Compare All Platforms", href: "/compare" },
    secondaryCta: { label: "View Reseller Program", href: "/reseller" },
    highlightText: "Official Certified Partner",
    ratingText: "100% Guaranteed SLA",
    visualType: "providers",
    bgGradient: "from-[#0F172A] via-[#1E1B4B] to-[#0F172A]",
  },
  // {
  //   id: 3,
  //   badge: "Zero Downtime",
  //   title: "Split-Domain Cross Tenant Coexistence & Automatic Cloud Archiving.",
  //   description: "Run hybrid email domains smoothly without downtime. Safeguard enterprise data with instant backup, archiving, and AES-256 encryption.",
  //   primaryCta: { label: "Explore Cloud Backup", href: "/backup" },
  //   secondaryCta: { label: "Management Services", href: "/management" },
  //   highlightText: "FIPS 140-2 Encrypted SLA",
  //   ratingText: "24/7 Managed Standby",
  //   visualType: "backup",
  //   bgGradient: "from-[#090D16] via-[#111827] to-[#0A1128]",
  // },
];

export default function Hero({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <>
      {/* =========================================================================
          1. FULL SCREEN AUTO-SLIDING HERO SECTION (ZERO MARGIN / ZERO PADDING)
         ========================================================================= */}
      <section
        className={`w-full relative overflow-hidden bg-gradient-to-r ${activeSlide.bgGradient} text-white pt-28 pb-16 md:pt-36 md:pb-20 transition-colors duration-700`}
      >
        {/* Ambient Glowing Background Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* HERO SLIDER CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative min-h-[460px] flex flex-col justify-between">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >

                {/* Left Column: Hero Text Content */}
                <div className="lg:col-span-6 text-center lg:text-left">

                  {/* Top Badge */}
                  <div className="inline-block mb-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{activeSlide.badge}</span>
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] lg:leading-[1.2] font-black text-white tracking-tight mb-6">
                    {activeSlide.id === 1 ? (
                      <>
                        Reliable, Scalable & Secure Business{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                          Email Solutions
                        </span>{" "}
                        for Enterprise.
                      </>
                    ) : activeSlide.id === 2 ? (
                      <>
                        Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Google Workspace</span>, Microsoft 365 & Titan Mail.
                      </>
                    ) : (
                      <>
                        Split-Domain <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Cross Tenant Coexistence</span> & Backup.
                      </>
                    )}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                    {activeSlide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                    <Link
                      href={activeSlide.primaryCta.href}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>{activeSlide.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={activeSlide.secondaryCta.href}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm backdrop-blur-md transition-all duration-300 flex items-center justify-center"
                    >
                      {activeSlide.secondaryCta.label}
                    </Link>
                  </div>

                  {/* Social Proof Footer */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B1437] bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                          AM
                        </div>
                        <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B1437] bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                          SK
                        </div>
                        <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B1437] bg-purple-500 text-white font-bold text-xs flex items-center justify-center">
                          JD
                        </div>
                        <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B1437] bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                          RK
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">{activeSlide.highlightText}</div>
                        <div className="text-[11px] text-gray-400 font-medium">with 24/7 live support</div>
                      </div>
                    </div>

                    <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

                    <div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-xs font-extrabold text-white ml-1">4.9/5</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">{activeSlide.ratingText}</div>
                    </div>
                  </div>

                </div>

                {/* Right Column Visual Graphics */}
                <div className="lg:col-span-6">

                  {activeSlide.visualType === "dashboard" && (
                    <div className="relative">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950 p-2 group">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                          <Image
                            src="/images/heroDashbord.png"
                            alt="justEmails 3D Mail Console Dashboard"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                          />
                        </div>
                      </div>

                      <motion.div
                        animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-blue-600 shadow-xl flex items-center justify-center border border-gray-200 hidden lg:flex z-20"
                      >
                        <Send className="w-5 h-5 text-blue-600" />
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 bg-[#0B1437] text-white p-2.5 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 hidden sm:flex z-20"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md relative shrink-0">
                          <MailPlus className="w-5 h-5" />
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B1437] animate-ping" />
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B1437]" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-indigo-300 font-extrabold">justemail</span>
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Active Console</div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeSlide.visualType === "providers" && (
                    <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl text-white shadow-2xl border border-slate-700/80 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                        <div className="flex items-center gap-2.5">
                          <Server className="w-5 h-5 text-blue-400" />
                          <span className="font-extrabold text-base text-white">Certified Suite Portfolio</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase">
                          All Major Platforms
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {partners.map((p) => (
                          <div key={p.name} className="bg-white/10 border border-white/15 p-4 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-all hover:scale-[1.02]">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-sm">
                              <Image src={p.image} alt={p.name} width={36} height={36} className="object-contain" />
                            </div>
                            <div>
                              <div className="font-extrabold text-xs text-white">{p.name}</div>
                              <div className="text-[10px] text-blue-200 font-medium">Wholesale Pricing</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-400/20 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-gray-200">Zero-Downtime Migration</span>
                        </div>
                        <span className="font-black text-emerald-400">100% SLA Guarantee</span>
                      </div>
                    </div>
                  )}

                  {activeSlide.visualType === "backup" && (
                    <div className="bg-slate-950 p-8 rounded-3xl text-white shadow-2xl border border-slate-800 space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2.5">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          <span className="font-extrabold text-base text-white">Security & Backup SLA</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                          FIPS 140-2 Standard
                        </span>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                            <div>
                              <div className="font-bold text-white">Automatic Archiving Backup</div>
                              <div className="text-[10px] text-gray-400">Daily incremental backup with instant restore</div>
                            </div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                            <div>
                              <div className="font-bold text-white">AES-256 Bit Encryption</div>
                              <div className="text-[10px] text-gray-400">End-to-end security compliance for enterprises</div>
                            </div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Headphones className="w-4 h-4 text-blue-400 shrink-0" />
                            <div>
                              <div className="font-bold text-white">24/7 Managed Support</div>
                              <div className="text-[10px] text-gray-400">Dedicated email engineers on standby</div>
                            </div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </motion.div>
            </AnimatePresence>

            {/* 3 BOTTOM SLIDER DOTS */}
            <div className="pt-6 flex items-center justify-center gap-3">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? "w-8 bg-blue-400" : "w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CERTIFIED PARTNER PROVIDER LOGOS BANNER (SEPARATE SECTION AFTER HERO)
         ========================================================================= */}
      <section className="w-full bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-gray-400 mb-8">
            CERTIFIED PARTNER FOR EVERY MAJOR EMAIL PROVIDER
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <Link key={partner.name} href={partner.slug} className="block">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card bg-slate-50 hover:bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs hover:shadow-xl flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <Image
                      src={partner.image}
                      alt={`${partner.name} Logo`}
                      width={48}
                      height={48}
                      className="object-contain max-h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
