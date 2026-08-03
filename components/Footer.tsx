"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/justemail-logo.png"
                alt="Justemail Logo"
                width={180}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Unified business email deployment, split-domain cross-tenant coexistence, automated cloud backups, and 24/7 managed administration for fast-growing businesses.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>support@justemails.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Vadodara, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Business Email Platforms */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs">Email Platforms</div>
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
                <Link href="/business-emails/zoho-mail" className="hover:text-white transition-colors">
                  Zoho Mail
                </Link>
              </li>
              <li>
                <Link href="/business-emails/titan-mail" className="hover:text-white transition-colors">
                  Titan Mail
                </Link>
              </li>
              <li>
                <Link href="/business-emails/rediffmail-pro" className="hover:text-white transition-colors">
                  Rediffmail Pro
                </Link>
              </li>
              <li>
                <Link href="/cross-tenant" className="hover:text-blue-400 font-bold transition-colors">
                  Cross-Tenant Coexistence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Services */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs">Services & Solutions</div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/management" className="hover:text-white transition-colors">
                  Email Management Services
                </Link>
              </li>
              <li>
                <Link href="/backup" className="hover:text-white transition-colors">
                  Email Backup & Archiving
                </Link>
              </li>
              <li>
                <Link href="/domains" className="hover:text-white transition-colors">
                  Domain Name Registration
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

          {/* Column 4: Trust & Compliance */}
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs">Trust & Legal</div>
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
                <Link href="/reseller" className="text-indigo-400 hover:text-indigo-300 font-extrabold transition-colors">
                  Reseller Partner Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-extrabold transition-colors">
                  Super Admin Portal
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

        {/* Bottom Copyright & Guarantee Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © 2026 <strong className="text-slate-300 font-bold">justEmails</strong>. All rights reserved. Registered Business Email Infrastructure Partner.
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>FIPS 140-2 AES-256 Encrypted</span>
            </div>
            {/* <span>•</span>
            <div>99.9% Uptime Guarantee</div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
