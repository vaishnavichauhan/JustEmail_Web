"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Globe,
  Clock,
  CheckCircle2,
  Send,
  Zap,
  Server,
  Lock,
  Headphones,
  FileText,
  Building2,
  Award,
  Sparkles,
  Instagram,
  ExternalLink,
  Facebook,
  Linkedin
} from "lucide-react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs selection:bg-blue-600 selection:text-white relative overflow-hidden">

      {/* Background Decorative Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />



      {/* FEATURE HIGHLIGHTS BAR */}
      <div className="border-b border-slate-800/60 bg-slate-950/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

            <div className="flex items-center justify-center gap-2.5 text-slate-300 text-[11px] font-medium py-1">
              <Headphones className="w-4 h-4 text-blue-400 shrink-0" />
              <span>24/7 Managed Engineering Support</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 text-slate-300 text-[11px] font-medium py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>FIPS 140-2 AES-256 Encryption</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 text-slate-300 text-[11px] font-medium py-1">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero-Downtime Migration SLA</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 text-slate-300 text-[11px] font-medium py-1">
              <Server className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Hybrid Cross-Tenant Coexistence</span>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN MULTI-COLUMN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Column 1: Brand Info & Contact (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/logo1.svg"
                alt="Justemail Logo"
                width={180}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Justemail is a next-generation business email infrastructure partner delivering unified email deployment, split-domain cross-tenant coexistence, cloud backup archiving, and 24/7 managed administration for modern enterprises.
            </p>

            <div className="space-y-2.5 pt-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:info@justemail.in" className="hover:text-white font-bold transition-colors">
                  info@justemail.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:9824466017" className="hover:text-white font-bold transition-colors">
                  +91 98244 66017
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 text-emerald-500 font-extrabold flex items-center justify-center text-xs shrink-0">💬</span>
                <a href="https://wa.me/919824466017" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
                  <span>WhatsApp: +91 98244 66017</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">24/7 Live</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 text-[11px] font-semibold">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7/365 Dedicated Customer Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61591174138036"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-700 transition-all"
                title="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/just_email__?igsh=MWZvOHMyeWpkcjc4Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-700 transition-all"
                title="Instagram"
              >

                <Instagram size={16} />
              </a>
              <a
                href="https://www.instagram.com/just_email__?igsh=MWZvOHMyeWpkcjc4Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-700 transition-all"
                title="Instagram"
              >

                <Link
  href="https://www.linkedin.com/company/justemail/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600  hover:border-blue-700 transition-all"
  title="LinkedIn"
>
  <Linkedin className="w-4 h-4" />
</Link>
              </a>
            </div>
          </div>

          {/* Column 2: Business Email Platforms */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Email Platforms</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/business-emails/google-workspace" className="hover:text-white transition-colors">
                  Google Workspace
                </Link>
              </li>
              <li>
                <Link href="/business-emails/microsoft-365" className="hover:text-white transition-colors">
                  Microsoft 365
                </Link>
              </li>
              <li>
                <Link href="/business-emails/titan-mail" className="hover:text-white transition-colors">
                  Titan Mail Business
                </Link>
              </li>
              <li>
                <Link href="/business-emails/rediffmail-pro" className="hover:text-white transition-colors">
                  Rediffmail Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Services */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solutions & Services</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/management" className="hover:text-white transition-colors">
                  Managed Email Administration
                </Link>
              </li>
              <li>
                <Link href="/backup" className="hover:text-white transition-colors">
                  Cloud Backup & Archiving
                </Link>
              </li>
              <li>
                <Link href="/management#setup" className="hover:text-white transition-colors">
                  MX & DNS Setup Services
                </Link>
              </li>
              <li>
                <Link href="/business-emails" className="hover:text-white transition-colors">
                  Plan Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Portals & Tools */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Portals & Tools</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-extrabold transition-colors flex items-center gap-1">
                  <span>Reseller Partner Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-extrabold transition-colors flex items-center gap-1">
                  <span>Admin Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Plan Features
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Cart & Instant Checkout
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Client Account Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Create New Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Trust & Legal */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Trust & Legal</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#why-je" className="hover:text-white transition-colors">
                  Why Justemail (Why JE)
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-white transition-colors">
                  Platform FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/acceptable-use-policy" className="hover:text-white transition-colors">
                  Acceptable Use Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & STATUS BAR */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-slate-500 text-xs">

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
            <span>© {new Date().getFullYear()}</span>
            <strong className="text-slate-300 font-bold">justEmails Technologies Pvt. Ltd.</strong>
            <span>All rights reserved. Registered Enterprise Email Infrastructure Provider.</span>
          </div>

          {/* Live System Operational Status & Encryption Badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400 font-medium">

            {/* Live Status Pill */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-semibold">All Infrastructure Operational</span>
            </div>

            {/* Encryption Pill */}
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>AES-256 Encrypted</span>
            </div>

            {/* SLA Pill */}
            <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>ISO 27001 Certified</span>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}

