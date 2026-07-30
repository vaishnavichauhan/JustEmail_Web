"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, HardDrive, ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderRow {
  name: string;
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

const providersList: ProviderRow[] = [
  {
    name: "Google Workspace",
    logo: "/images/google-workspace.png",
    startingPrice: "₹136 / mo",
    storage: "30 GB Cloud",
    attachment: "25 MB",
    officeApps: true,
    freeMigration: true,
    sla: "99.9% SLA",
    bestFor: "Cloud Collaboration & Gmail UX",
    slug: "google-workspace"
  },
  {
    name: "Microsoft 365",
    logo: "/images/microsoft-365.png",
    startingPrice: "₹145 / mo",
    storage: "50 GB Inbox + 1 TB Drive",
    attachment: "150 MB",
    officeApps: true,
    freeMigration: true,
    sla: "99.9% SLA",
    bestFor: "Outlook Desktop Apps & Teams",
    slug: "microsoft-365"
  },
  {
    name: "Zoho Mail",
    logo: "/images/zoho-mail.png",
    startingPrice: "₹58 / mo",
    storage: "5 GB NVMe",
    attachment: "25 MB",
    officeApps: false,
    freeMigration: true,
    sla: "99.9% SLA",
    bestFor: "Best Value & Startups",
    slug: "zoho-mail"
  },
  {
    name: "Titan Mail",
    logo: "/images/titan-mail.png",
    startingPrice: "₹79 / mo",
    storage: "10 GB Mailbox",
    attachment: "30 MB",
    officeApps: false,
    freeMigration: true,
    sla: "99.9% SLA",
    bestFor: "Read Receipts & Templates",
    slug: "titan-mail"
  },
  {
    name: "Rediffmail Pro",
    logo: "/images/rediffmail.png",
    startingPrice: "₹89 / mo",
    storage: "10 GB Secure",
    attachment: "30 MB",
    officeApps: false,
    freeMigration: true,
    sla: "99.99% SLA",
    bestFor: "Indian Enterprise Security",
    slug: "rediffmail-pro"
  }
];

export default function ProviderComparisonTable() {
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
            Detailed breakdown of storage quotas, attachment limits, cloud apps, and starting rates across top platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-lg bg-[#F8FAFC]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#0B1437] text-white text-xs font-extrabold uppercase tracking-wider">
                <th className="p-6">Provider</th>
                <th className="p-6">Starting Price</th>
                <th className="p-6">Storage Quota</th>
                <th className="p-6">Attachment Limit</th>
                <th className="p-6">Cloud Office Apps</th>
                <th className="p-6">Free Migration</th>
                <th className="p-6">Best For</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200/80 text-xs font-semibold text-gray-800">
              {providersList.map((p) => (
                <tr key={p.name} className="hover:bg-white transition-colors">
                  
                  {/* Provider Name & Logo */}
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                        <Image src={p.logo} alt={p.name} width={28} height={28} className="object-contain" />
                      </div>
                      <span className="font-extrabold text-gray-900 text-sm">{p.name}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-6 font-extrabold text-blue-600 text-sm">
                    {p.startingPrice}
                  </td>

                  {/* Storage */}
                  <td className="p-6 font-bold text-gray-900">
                    {p.storage}
                  </td>

                  {/* Attachment */}
                  <td className="p-6 text-gray-600">
                    {p.attachment}
                  </td>

                  {/* Office Apps */}
                  <td className="p-6">
                    {p.officeApps ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Included</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200/60 text-gray-600 text-[11px] font-extrabold">
                        <span>Webmail Only</span>
                      </span>
                    )}
                  </td>

                  {/* Free Migration */}
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-extrabold">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>0-Downtime</span>
                    </span>
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

      </div>
    </section>
  );
}
