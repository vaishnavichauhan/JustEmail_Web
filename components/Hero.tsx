"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    name: "Google Workspace",
    image: "/images/google-workspace.png",
  },
  {
    name: "Microsoft 365",
    image: "/images/microsoft-365.png",
  },
  {
    name: "Zoho Mail",
    image: "/images/zoho-mail.png",
  },
  {
    name: "Rediffmail",
    image: "/images/rediffmail.png",
  },
  {
    name: "Titan Mail",
    image: "/images/titan-mail.png",
  },

];

export default function Hero({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  return (
    <section className="relative pt-32 pb-8 md:pt-36 md:pb-12 overflow-hidden bg-radial-gradient">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-navyBlue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-[34px] lg:leading-[1.25] font-extrabold text-customBlack tracking-tight mb-5"
            >
              Reliable, Scalable & Secure Business{" "}
              <span className="text-primary">Email Solutions</span> for Every Enterprise.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-600 font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Complete email infrastructure, seamless cross-tenant migrations, domain registration, and 24/7 managed setup.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                href="/business-emails"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-customBlack text-white font-bold text-sm shadow-lg hover:bg-navyBlue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/business-emails"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-gray-300 text-navyBlue font-bold text-sm shadow-sm hover:border-primary hover:text-primary hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                Explore Email Plans
              </Link>
            </motion.div>

            {/* Customer Rating & Social Proof Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-left"
            >
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                    AM
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                    SK
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-purple-500 text-white font-bold text-xs flex items-center justify-center">
                    JD
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                    RK
                  </div>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-navyBlue">500+ Businesses</div>
                  <div className="text-[11px] text-gray-500 font-medium">trust justEmails</div>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

              {/* Ratings */}
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xs font-bold text-navyBlue ml-1">4.9/5</span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">Customer Rating</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Dark Dashboard Image from public/images/hero-dashboard.png */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 p-2 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/images/hero-dashboard.png"
                    alt="justEmails 3D Mail Console Dashboard"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              {/* Floating Badge Overlay */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white text-navyBlue p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-200 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Enterprise Security</div>
                  <div className="text-sm font-bold text-navyBlue">AES-256 Encrypted</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* --- CERTIFIED PARTNER PROVIDER LOGOS BANNER WITH IMAGES --- */}
        <div className="pt-10 border-t border-gray-200/80 text-center">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-8">
            CERTIFIED PARTNER FOR EVERY MAJOR EMAIL PROVIDER
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-card bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-lg flex flex-col items-center justify-center gap-3 group cursor-pointer"
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
                <span className="font-bold text-sm text-navyBlue tracking-tight group-hover:text-primary transition-colors">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


