"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { useCompare } from "@/lib/compareContext";
import { useCart } from "@/lib/cartContext";
import { 
  SlidersHorizontal, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  HardDrive, 
  Zap, 
  ShieldCheck, 
  FileText,
  Lock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ComparePage() {
  const { selectedPlans, toggleComparePlan, clearComparePlans } = useCompare();
  const { addToCart } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [selectedPlanForBuy, setSelectedPlanForBuy] = useState<string | null>(null);

  const handleOpenAuthModal = (mode: "login" | "signup", planName?: string) => {
    setAuthMode(mode);
    if (planName) setSelectedPlanForBuy(planName);
    setAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative">
      {/* Header Navigation */}
      <Navbar onOpenAuthModal={(mode) => handleOpenAuthModal(mode)} />

      {/* --- HERO COMPARISON HEADER --- */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-white via-blue-50/20 to-[#F8FAFC] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link 
                href="/business-emails#provider-plans"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Business Email Plans</span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                <SlidersHorizontal className="w-8 h-8 text-blue-600" />
                <span>Business Email Plan Comparison</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-normal mt-2">
                Side-by-side feature, storage, pricing, and SLA comparison of your selected plans.
              </p>
            </div>

            {selectedPlans.length > 0 && (
              <button
                onClick={clearComparePlans}
                className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>Clear All ({selectedPlans.length})</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* --- COMPARISON MATRIX CONTAINER --- */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {selectedPlans.length === 0 ? (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 border border-gray-200 shadow-sm text-center max-w-2xl mx-auto my-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 border border-blue-100">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">No Plans Selected for Comparison</h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                You haven't selected any plans to compare yet. Visit the Business Emails page, select any plan by clicking the <strong>Compare</strong> button on the card, and return here!
              </p>
              <Link
                href="/business-emails#provider-plans"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B1437] hover:bg-black text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Browse Business Email Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            /* Comparison Table */
            <div className="overflow-x-auto pb-6">
              <table className="w-full border-collapse bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80">
                    <th className="p-6 text-left w-64 min-w-[240px] text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Features / Specifications
                    </th>
                    {selectedPlans.map((plan) => (
                      <th key={plan.id} className="p-6 text-left min-w-[260px] max-w-[320px] align-top relative">
                        <button
                          onClick={() => toggleComparePlan(plan)}
                          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center border border-gray-200 shadow-xs mb-3">
                          <Image
                            src={plan.logo}
                            alt={plan.providerName}
                            width={32}
                            height={32}
                            className="object-contain max-h-7 w-auto"
                          />
                        </div>

                        <div className="text-xs font-semibold text-blue-600 mb-0.5">{plan.providerName}</div>
                        <div className="text-xl font-extrabold text-gray-900 mb-2">{plan.planName}</div>
                        
                        <div className="text-2xl font-extrabold text-gray-900">
                          {plan.price}
                          <span className="text-xs text-gray-500 font-normal"> {plan.period}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                  {/* Storage */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Mailbox Storage</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 font-bold text-gray-900">
                        {plan.storage}
                      </td>
                    ))}
                  </tr>

                  {/* Attachment Limit */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Attachment Limit</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6">
                        {plan.attachment}
                      </td>
                    ))}
                  </tr>

                  {/* SLA Uptime */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Uptime SLA</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 font-bold text-emerald-600">
                        {plan.sla}
                      </td>
                    ))}
                  </tr>

                  {/* Security */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Anti-Spam & Security</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                          <Check className="w-3.5 h-3.5" />
                          Included
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Protocol Access */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>POP3 / IMAP / Webmail</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6">
                        <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                          <Check className="w-3.5 h-3.5" />
                          Supported
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Detailed Features List */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 align-top">
                      Included Key Features
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 align-top">
                        <div className="space-y-2">
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Bottom Buy Action Row */}
                  <tr className="bg-gray-50/80">
                    <td className="p-6 font-bold text-gray-900">
                      Action
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6">
                        <Link
                          href={`/checkout?plan=${plan.id}`}
                          onClick={() => addToCart({ ...plan, amountNumeric: parseInt(plan.price.replace(/[^\d]/g, "")) || 99 }, 1)}
                          className="w-full py-3 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>

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
