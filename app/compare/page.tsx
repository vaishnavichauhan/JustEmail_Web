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
                      Provider Name
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

                        <div className="text-base font-extrabold text-gray-900 pr-6">{plan.providerName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                  {/* Subtitle Row */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40">
                      Plan Subtitle
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 font-semibold text-blue-700">
                        {plan.subtitle || plan.planName}
                      </td>
                    ))}
                  </tr>

                  {/* Mailbox Storage */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                      <span>Mailbox Storage</span>
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 font-extrabold text-gray-900">
                        {plan.storage}
                      </td>
                    ))}
                  </tr>

                  {/* Plan Price Row */}
                  <tr>
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/40">
                      Plan Price
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6 font-extrabold text-blue-600 text-sm">
                        {plan.price} <span className="text-xs text-gray-500 font-normal">{plan.period}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Detailed Key Features List */}
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

                  {/* Select Plan Action Row */}
                  <tr className="bg-gray-50/80">
                    <td className="p-6 font-bold text-gray-900">
                      Select Plan
                    </td>
                    {selectedPlans.map((plan) => (
                      <td key={plan.id} className="p-6">
                        <Link
                          href={`/enquiryForm?provider=${encodeURIComponent(plan.providerName)}&plan=${encodeURIComponent(`${plan.subtitle || plan.planName} (${plan.price})`)}&providerId=${encodeURIComponent(plan.id)}`}
                          className="w-full py-3 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-center"
                        >
                          <span>Enquiry Now</span>
                          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
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
