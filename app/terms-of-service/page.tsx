"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  ShieldCheck,
  Zap,
  Server,
  CreditCard,
  AlertTriangle,
  Scale,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Lock,
  Mail,
  Building2,
  RefreshCw,
  Award
} from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "August 3, 2026";

  const policyTabs = [
    { name: "Privacy Policy", href: "/privacy-policy", active: false },
    { name: "Terms of Service", href: "/terms-of-service", active: true },
    { name: "Acceptable Use Policy", href: "/acceptable-use-policy", active: false },
  ];

  const sections = [
    { id: "acceptance-scope", title: "1. Acceptance & Service Scope" },
    { id: "account-security", title: "2. Account Registration & Security" },
    { id: "uptime-sla", title: "3. 99.99% Service Level Agreement (SLA)" },
    { id: "billing-refunds", title: "4. Billing, Subscriptions & Refunds" },
    { id: "split-domain-terms", title: "5. Split-Domain & Coexistence Terms" },
    { id: "support-maintenance", title: "6. Engineering Support & Maintenance" },
    { id: "intellectual-property", title: "7. Intellectual Property Rights" },
    { id: "liability-limitations", title: "8. Limitation of Liability & Warranty" },
    { id: "suspension-termination", title: "9. Termination & Data Retrieval" },
    { id: "governing-law", title: "10. Governing Law & Jurisdiction" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-blue-50/40 to-[#F8FAFC] border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Master Service Agreement</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            The legal agreement governing your use of Justemail's enterprise business email hosting, split-domain routing, and managed cloud infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Effective Date: <strong className="text-slate-900">{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>99.99% Uptime Guarantee</span>
            </div>
          </div>

          {/* Navigation Policy Switcher Tabs */}
          <div className="mt-10 max-w-3xl mx-auto flex items-center justify-center p-1.5 bg-white border border-slate-200 rounded-2xl gap-1 shadow-sm">
            {policyTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center transition-all ${
                  tab.active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Table of Contents */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm backdrop-blur-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>On This Page</span>
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] space-y-2">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Legal Enquiries</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Need contract clarification or custom SLA agreements?
                  </p>
                  <a
                    href="mailto:legal@justemail.in"
                    className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    legal@justemail.in
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Document Content */}
          <main className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* Section 1 */}
            <section id="acceptance-scope" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">1. Acceptance & Service Scope</h2>
              </div>
              <p>
                By creating an account, ordering services, or provisioning mailboxes on Justemail Technologies ("Justemail", "we", "us"), you ("Customer", "Client", or "User") agree to be bound by these Terms of Service, along with our <Link href="/privacy-policy" className="text-blue-600 font-semibold underline">Privacy Policy</Link> and <Link href="/acceptable-use-policy" className="text-blue-600 font-semibold underline">Acceptable Use Policy</Link>.
              </p>
              <p>
                Justemail provides business email provisioning, custom MX domain delegation, split-domain routing (Google Workspace, Microsoft 365, Zoho coexistence), cloud mail archiving, and domain registration services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="account-security" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">2. Account Registration & Security</h2>
              </div>
              <p>
                Clients must provide accurate, complete organizational details during registration. You are solely responsible for maintaining administrator credential secrecy and configuring Multi-Factor Authentication (MFA) across your admin dashboard.
              </p>
              <p>
                You must possess legitimate legal ownership or authorized delegation over any domain name configured on Justemail.
              </p>
            </section>

            {/* Section 3 */}
            <section id="uptime-sla" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">3. 99.99% Service Level Agreement (SLA)</h2>
              </div>
              <p>
                Justemail guarantees a <strong>99.99% Network and Mail Infrastructure Uptime</strong> per calendar month.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-center">
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-lg font-bold text-emerald-600">99.9% to 99.99%</div>
                  <div className="text-xs text-slate-500 mt-1">10% Monthly Service Credit</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-lg font-bold text-amber-600">25% Monthly Service Credit</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-lg font-bold text-rose-600">&lt; 99.0%</div>
                  <div className="text-xs text-slate-500 mt-1">50% Monthly Service Credit</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                *SLA excludes scheduled zero-downtime maintenance windows (announced at least 48 hours in advance) or upstream ISP/DNS provider failures beyond Justemail's control.
              </p>
            </section>

            {/* Section 4 */}
            <section id="billing-refunds" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">4. Billing, Subscriptions & Refunds</h2>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Payment Terms:</strong> All email plans are billed on a recurring monthly or annual basis in advance. Applicable GST (18%) is added for Indian organizations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Auto-Renewals:</strong> Services auto-renew on their billing anniversary unless cancelled in the dashboard at least 7 days prior to renewal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Refund Policy:</strong> New email hosting orders are covered by a 30-day money-back guarantee. Domain registrations, SSL certificates, and custom migration fees are non-refundable.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="split-domain-terms" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-600">
                  <Server className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">5. Split-Domain & Coexistence Terms</h2>
              </div>
              <p>
                When utilizing Justemail Split-Domain routing (e.g. running executive mailboxes on Google Workspace and staff mailboxes on Justemail under the same domain name), the client agrees to maintain accurate smart-host routing rules and DKIM selectors supplied by Justemail.
              </p>
            </section>

            {/* Section 6 */}
            <section id="support-maintenance" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">6. Engineering Support & Maintenance</h2>
              </div>
              <p>
                All standard plans include 24/7 engineering support via email and portal tickets. Enterprise accounts include dedicated Slack/WhatsApp channels and custom phone support.
              </p>
            </section>

            {/* Section 7 */}
            <section id="intellectual-property" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">7. Intellectual Property Rights</h2>
              </div>
              <p>
                Justemail retains all rights, title, and interest in its proprietary email routing software, control panels, brand logos, and server infrastructure. Customers retain 100% ownership of all email contents, corporate logos, and custom domain names.
              </p>
            </section>

            {/* Section 8 */}
            <section id="liability-limitations" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">8. Limitation of Liability & Warranty</h2>
              </div>
              <p>
                To the maximum extent permitted by applicable law, Justemail's aggregate liability for any claims arising from or related to the service shall not exceed the total amount paid by the customer to Justemail in the twelve (12) months preceding the incident.
              </p>
            </section>

            {/* Section 9 */}
            <section id="suspension-termination" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">9. Termination & Data Retrieval</h2>
              </div>
              <p>
                Either party may terminate the agreement upon written notice or dashboard cancellation. Upon non-payment or client cancellation, data export access remains open for 30 calendar days before complete data purging.
              </p>
            </section>

            {/* Section 10 */}
            <section id="governing-law" className="scroll-mt-28 bg-gradient-to-br from-white via-blue-50/50 to-white border border-blue-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-600/20">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">10. Governing Law & Jurisdiction</h2>
              </div>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Legal Counsel Contact</div>
                  <a href="mailto:legal@justemail.in" className="text-blue-600 font-bold hover:underline">
                    legal@justemail.in
                  </a>
                </div>
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
            </section>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
