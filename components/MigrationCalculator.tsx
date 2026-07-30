"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  RefreshCw, 
  Database, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function MigrationCalculator({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [mailboxCount, setMailboxCount] = useState(150);
  const [avgStorage, setAvgStorage] = useState(25); // GB per mailbox
  const [sourceTenant, setSourceTenant] = useState("Microsoft 365");
  const [targetTenant, setTargetTenant] = useState("Google Workspace");

  const totalDataGB = mailboxCount * avgStorage;
  const totalDataTB = (totalDataGB / 1024).toFixed(2);
  
  // Speed estimation formula: ~1.2 GB/s parallel pipeline with delta sync
  const estimatedHours = Math.max(0.5, (totalDataGB / 350)).toFixed(1);
  const recommendedBackupSize = Math.ceil(totalDataGB * 1.25);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navyBlue/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-extrabold uppercase tracking-widest mb-3"
          >
            <Calculator className="w-3.5 h-3.5" />
            Interactive Calculator
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Estimate Your Migration Speed & Backup Vault
          </motion.h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Adjust the sliders below to calculate instant migration time and storage sizing.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Tenant Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Source Infrastructure</label>
                  <select 
                    value={sourceTenant} 
                    onChange={(e) => setSourceTenant(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-primary"
                  >
                    <option>Microsoft 365 / Exchange</option>
                    <option>Google Workspace</option>
                    <option>On-Premises Exchange</option>
                    <option>Generic IMAP Server</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Target Tenant</label>
                  <select 
                    value={targetTenant} 
                    onChange={(e) => setTargetTenant(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-primary"
                  >
                    <option>justEmails Managed Suite</option>
                    <option>Google Workspace</option>
                    <option>Microsoft 365</option>
                    <option>Private Cloud Exchange</option>
                  </select>
                </div>
              </div>

              {/* Slider 1: Mailbox Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-300">Total Active Mailboxes</span>
                  <span className="text-primary text-lg">{mailboxCount} Mailboxes</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="2000" 
                  step="5" 
                  value={mailboxCount}
                  onChange={(e) => setMailboxCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                  <span>5 Users</span>
                  <span>500 Users</span>
                  <span>2,000 Users</span>
                </div>
              </div>

              {/* Slider 2: Average Storage per Mailbox */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-300">Average Storage Per Mailbox</span>
                  <span className="text-primary text-lg">{avgStorage} GB / Mailbox</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5" 
                  value={avgStorage}
                  onChange={(e) => setAvgStorage(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                  <span>5 GB</span>
                  <span>50 GB</span>
                  <span>100 GB</span>
                </div>
              </div>

              {/* Protection Callout */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <p className="text-xs text-gray-300">
                  Includes automatic pre-migration integrity audit & dual-delivery protection for continuous email flow.
                </p>
              </div>

            </div>

            {/* Right Output Results Card */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-700/90 space-y-6 shadow-inner">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Migration Estimate Summary</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">Zero-Downtime Pipeline</span>
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                    <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
                      <Database className="w-3.5 h-3.5 text-primary" />
                      Total Data Payload
                    </div>
                    <div className="text-2xl font-extrabold text-white">{totalDataTB} TB</div>
                    <div className="text-[11px] text-gray-400 mt-1">({totalDataGB.toLocaleString()} GB)</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                    <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Estimated Time
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400">~{estimatedHours} Hours</div>
                    <div className="text-[11px] text-gray-400 mt-1">Parallel Delta Stream</div>
                  </div>
                </div>

                {/* Backup Recommendation */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-200">Automated Backup Vault Needed</div>
                    <div className="text-sm font-extrabold text-white mt-0.5">{recommendedBackupSize.toLocaleString()} GB Immutable Cloud Vault</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>

                {/* Action CTA inside calculator */}
                <button
                  onClick={() => onOpenAuthModal ? onOpenAuthModal("signup") : null}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base shadow-glow hover:bg-primary-hover transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Start Migration with {mailboxCount} Mailboxes</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
