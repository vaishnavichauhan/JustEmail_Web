"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FinalCtaSection({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-[#0B1437] to-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg">

          {/* Left Text Info */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ready to Upgrade Your Business Email?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Deploy official Google Workspace, Microsoft 365, Zoho, or Titan mailboxes with zero downtime.
            </p>
          </div>

          {/* Right Compact Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/business-emails#provider-plans"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Sales</span>
            </a> */}
          </div>

        </div>
      </div>
    </section>
  );
}
