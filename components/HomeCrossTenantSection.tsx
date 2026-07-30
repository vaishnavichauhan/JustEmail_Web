"use client";

import { motion } from "framer-motion";
import { 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  DollarSign, 
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeCrossTenantSection() {
  return (
    <section className="py-20 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Hybrid Coexistence Technology</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Cross-Tenant Coexistence for Your Domain
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Use a single domain name (<strong className="text-gray-900 font-extrabold">e.g. abc.com</strong>) across different email providers simultaneously. Mix <strong className="text-gray-900">Google Workspace</strong> and <strong className="text-gray-900">Microsoft 365</strong> mailboxes under the exact same domain without email bounces!
            </p>

            {/* Split Example Box */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200 space-y-3">
              <div className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Example: Single Domain abc.com</div>
              <div className="space-y-2 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>2 Users on Google Workspace: ceo@abc.com, cto@abc.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>3 Users on Microsoft 365: sales@abc.com, finance@abc.com, ops@abc.com</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/cross-tenant"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-lg transition-all active:scale-95"
              >
                <span>Explore Cross-Tenant Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl bg-[#0B1437] p-8 text-white shadow-2xl border border-slate-800 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="text-xs font-extrabold text-blue-400 uppercase tracking-widest mb-1">Smart MX Router</div>
                <h3 className="text-2xl font-extrabold text-white">Hybrid Split-Domain Setup</h3>
                <p className="text-xs text-slate-300 mt-1">Single Invoice • Unified Management • Up to 60% Licensing Savings</p>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-center">
                  <Image src="/images/google-workspace.png" alt="Google" width={32} height={32} className="mx-auto max-h-7 w-auto object-contain" />
                  <div className="text-xs font-extrabold text-white">Google Workspace</div>
                  <div className="text-[10px] text-blue-300">Executive & Tech Team</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-center">
                  <Image src="/images/microsoft-365.png" alt="Microsoft" width={32} height={32} className="mx-auto max-h-7 w-auto object-contain" />
                  <div className="text-xs font-extrabold text-white">Microsoft 365</div>
                  <div className="text-[10px] text-indigo-300">Sales & Finance Team</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-center text-xs font-extrabold text-emerald-300">
                ⚡ 100% Inbound & Outbound Delivery Guarantee
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
