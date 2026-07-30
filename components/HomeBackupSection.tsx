"use client";

import { motion } from "framer-motion";
import { 
  RefreshCw, 
  RotateCcw, 
  ShieldCheck, 
  FileCheck2, 
  ArrowRight, 
  HardDrive,
  Lock,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const backupSteps = [
  {
    step: "01",
    title: "Auto Backup",
    desc: "Continuous background cloud snapshots of mailboxes & drives",
    icon: RefreshCw,
    color: "from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
  },
  {
    step: "02",
    title: "Instant Restore",
    desc: "1-Click in-place recovery directly back into live user inboxes",
    icon: RotateCcw,
    color: "from-indigo-600 to-purple-600 text-white shadow-indigo-500/20"
  },
  {
    step: "03",
    title: "Zero Data Loss",
    desc: "Immutable WORM storage isolating data against ransomware",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-600 text-white shadow-emerald-500/20"
  },
  {
    step: "04",
    title: "Compliance",
    desc: "AES-256 bit encryption & 7-year audit retention readiness",
    icon: FileCheck2,
    color: "from-purple-600 to-pink-600 text-white shadow-purple-500/20"
  }
];

export default function HomeBackupSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1437] via-slate-900 to-[#0B1437] text-white relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Immutable Cloud Protection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Never Lose an Important Email
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Automated backups, secure storage and instant recovery for every business mailbox.
          </p>
        </div>

        {/* --- ANIMATED MOTION UI FLOW ---
            Auto Backup -> Instant Restore -> Zero Data Loss -> Compliance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {backupSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-500 font-mono tracking-widest">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Connecting Arrow for desktop (between items) */}
                {idx < backupSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-blue-600/80 border border-blue-400 flex items-center justify-center text-white shadow-md animate-pulse">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action Button & Link */}
        <div className="text-center">
          <Link
            href="/backup"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <span>Learn More About Backup Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
