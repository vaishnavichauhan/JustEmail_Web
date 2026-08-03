"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, HardDrive, ArrowRight, Award, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderRow {
  name: string;
  subtitle: string;
  logo: string;
  startingPrice: string;
  storage: string;
  attachment: string;
  officeApps: boolean;
  freeMigration: boolean;
  sla: string;
  bestFor: string;
  slug: string;
}

export default function ProviderComparisonTable() {
  const [providers, setProviders] = useState<ProviderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicComparison() {
      try {
        setLoading(true);
        const res = await fetch("/api/providers");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            const enabledList = data.data.filter((p: any) => p.enabled !== false);
            
            // Group by provider logoType/group and keep ONLY the LOWEST PRICE plan for each provider
            const lowestPriceMap = new Map<string, any>();
            const getNumericPrice = (priceStr: string | number): number => {
              if (typeof priceStr === "number") return priceStr;
              const num = parseInt(String(priceStr || "0").replace(/[^0-9]/g, ""), 10);
              return isNaN(num) ? 999999 : num;
            };

            enabledList.forEach((p: any) => {
              const groupKey = (p.logoType || p.id).toLowerCase().trim();
              const existing = lowestPriceMap.get(groupKey);
              if (!existing) {
                lowestPriceMap.set(groupKey, p);
              } else {
                if (getNumericPrice(p.price) < getNumericPrice(existing.price)) {
                  lowestPriceMap.set(groupKey, p);
                }
              }
            });

            const mappedRows: ProviderRow[] = Array.from(lowestPriceMap.values()).map((p: any) => {
              const groupKey = (p.logoType || p.id).toLowerCase().trim();
              const logoPath =
                groupKey === "google"
                  ? "/images/google-workspace.png"
                  : groupKey === "microsoft"
                  ? "/images/microsoft-365.png"
                  : groupKey === "zoho"
                  ? "/images/zoho-mail.png"
                  : groupKey === "rediff"
                  ? "/images/rediffmail.png"
                  : groupKey === "titan"
                  ? "/images/titan-mail.png"
                  : "/images/logo1.svg";

              const slug =
                groupKey === "google"
                  ? "google-workspace"
                  : groupKey === "microsoft"
                  ? "microsoft-365"
                  : groupKey === "zoho"
                  ? "zoho-mail"
                  : groupKey === "rediff"
                  ? "rediffmail-pro"
                  : groupKey === "titan"
                  ? "titan-mail"
                  : groupKey;

              return {
                name: p.name,
                subtitle: p.subtitle || "Base Plan",
                logo: logoPath,
                startingPrice: p.price,
                storage: p.storage || "Standard Storage",
                attachment: "30 MB",
                officeApps: groupKey === "google" || groupKey === "microsoft",
                freeMigration: true,
                sla: p.uptime || "99.9% SLA",
                bestFor: p.badge || "Official Business Mail",
                slug: slug,
              };
            });

            if (isMounted) {
              setProviders(mappedRows);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load comparison table:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchDynamicComparison();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Head-to-Head Provider Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Compare All Email Providers Side-by-Side
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Detailed breakdown of storage quotas, starting rates, zero-downtime migration, and key features across top platforms.
          </p>
        </div>

        {/* Comparison Table or Empty State */}
        {loading ? (
          <div className="p-12 text-center bg-[#F8FAFC] border border-gray-200 rounded-3xl shadow-sm space-y-3 max-w-xl mx-auto">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <div className="text-sm text-gray-600 font-bold">Loading comparison table...</div>
          </div>
        ) : providers.length === 0 ? (
          <div className="p-12 text-center bg-[#F8FAFC] border border-gray-200 rounded-3xl shadow-sm space-y-3 max-w-xl mx-auto">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <div className="text-xl text-gray-900 font-extrabold">Currently no comparison possible</div>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              No active provider plans are available to compare. Please check back soon or contact admin to add plans.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-lg bg-[#F8FAFC]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#0B1437] text-white text-xs font-extrabold uppercase tracking-wider">
                  <th className="p-6">Provider</th>
                  <th className="p-6">Plan Subtitle</th>
                  <th className="p-6">Starting Price</th>
                  <th className="p-6">Storage Quota</th>
                  <th className="p-6">Best For</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200/80 text-xs font-semibold text-gray-800">
                {providers.map((p, idx) => (
                  <tr key={`${p.name}-${idx}`} className="hover:bg-white transition-colors">
                    
                    {/* Provider Name & Logo */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                          <Image src={p.logo} alt={p.name} width={28} height={28} className="object-contain" />
                        </div>
                        <span className="font-extrabold text-gray-900 text-sm">{p.name}</span>
                      </div>
                    </td>

                    {/* Plan Subtitle */}
                    <td className="p-6 font-semibold text-blue-700">
                      {p.subtitle}
                    </td>

                    {/* Price */}
                    <td className="p-6 font-extrabold text-blue-600 text-sm">
                      {p.startingPrice}
                    </td>

                    {/* Storage */}
                    <td className="p-6 font-bold text-gray-900">
                      {p.storage}
                    </td>

                    {/* Best For */}
                    <td className="p-6 text-gray-600 font-medium">
                      {p.bestFor}
                    </td>

                    {/* Action Link */}
                    <td className="p-6 text-center">
                      <Link
                        href={`/business-emails/${p.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-sm inline-flex items-center gap-1 shrink-0"
                      >
                        <span>View Plans</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
