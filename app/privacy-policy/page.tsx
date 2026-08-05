"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  Server,
  Database,
  Globe,
  UserCheck,
  Mail,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Building2,
  Phone
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 3, 2026";

  const policyTabs = [
    { name: "Privacy Policy", href: "/privacy-policy", active: true },
    { name: "Terms of Service", href: "/terms-of-service", active: false },
    { name: "Acceptable Use Policy", href: "/acceptable-use-policy", active: false },
  ];

  const sections = [
    { id: "overview", title: "1. Overview & Commitment" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-we-use-data", title: "3. How We Process & Use Data" },
    { id: "security-encryption", title: "4. Security & Encryption Standards" },
    { id: "sharing-processors", title: "5. Data Sharing & Sub-Processors" },
    { id: "retention-archival", title: "6. Data Retention & Archival" },
    { id: "user-rights", title: "7. User Data Rights & GDPR/DPDP Compliance" },
    { id: "cookies-analytics", title: "8. Cookies & Tracking Technologies" },
    { id: "contact-privacy", title: "9. Contact Privacy Officer" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-blue-50/40 to-[#F8FAFC] border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Legal & Compliance Center</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            How Justemail protects, handles, encrypts, and respects your organization's business email data and infrastructure privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Effective Date: <strong className="text-slate-900">{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>AES-256 Encrypted Infrastructure</span>
            </div>
          </div>

          {/* Navigation Policy Switcher Tabs */}
          <div className="mt-10 max-w-3xl mx-auto flex items-center justify-center p-1.5 bg-white border border-slate-200 rounded-2xl gap-1 shadow-sm">
            {policyTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center transition-all ${tab.active
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
                    <span>Privacy Questions?</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Have questions about our data protection practices?
                  </p>

                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Document Content */}
          <main className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-slate-700">

            {/* Section 1 */}
            <section id="overview" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">1. Overview & Commitment</h2>
              </div>
              <p>
                Justemail Technologies ("Justemail", "we", "us", or "our") provides business email hosting, split-domain cross-tenant routing, domain management, and managed infrastructure services to corporate clients worldwide. We are committed to maintaining the confidentiality, integrity, and security of all business email communications and organization data.
              </p>
              <p>
                This Privacy Policy describes how we collect, store, process, transfer, and safeguard personal and organizational data when you visit our website ([justemail.in](https://justemail.in)) or utilize our business email infrastructure services.
              </p>
              <div className="p-4 bg-blue-50/80 border-l-4 border-blue-600 rounded-r-xl text-xs space-y-1 text-slate-700">
                <strong className="text-slate-900 block font-bold">Key Takeaway:</strong>
                <p>We do NOT sell, lease, or monetize your business email content or client data. All customer emails, attachments, and routing metadata remain strictly private to your organization.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-collected" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">2. Information We Collect</h2>
              </div>
              <p>
                To deliver enterprise-grade email services and manage your account, we collect the following categories of information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    Account & Organization Info
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    <li>Company Name, GSTIN, & Business Address</li>
                    <li>Primary Administrator Email & Contact Phone</li>
                    <li>Domain Names registered or configured for MX routing</li>
                    <li>Billing & Subscription payment details</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    Technical & Infrastructure Metadata
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    <li>SMTP/IMAP/POP3 Mail Server Logs & Connection IPs</li>
                    <li>DKIM, SPF, and DMARC verification records</li>
                    <li>Split-domain routing tables and tenant mapping</li>
                    <li>Mailbox usage statistics and quota allocations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use-data" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">3. How We Process & Use Data</h2>
              </div>
              <p>
                We use collected information solely for legitimate operational, security, and administrative purposes, including:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mail Routing & Delivery:</strong> Facilitating seamless business email transmission across primary servers and split-domain coexistence providers (Google Workspace, Microsoft 365).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Threat Protection & Anti-Spam:</strong> Filtering inbound and outbound mail for malware, phishing, ransomware, and spam to protect IP reputation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Billing & Subscription Management:</strong> Processing domain renewals, license updates, invoices, and service upgrades.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>24/7 Managed Technical Support:</strong> Responding to client engineering tickets, system health alerts, and DNS delegation queries.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="security-encryption" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">4. Security & Encryption Standards</h2>
              </div>
              <p>
                Justemail employs multi-layered military-grade security controls to prevent unauthorized access, data loss, or interception:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-blue-600 font-extrabold text-lg">TLS 1.3</div>
                  <div className="text-xs text-slate-500">Encryption in Transit</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-emerald-600 font-extrabold text-lg">AES-256</div>
                  <div className="text-xs text-slate-500">Encryption at Rest</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-amber-600 font-extrabold text-lg">ISO 27001</div>
                  <div className="text-xs text-slate-500">Security Architecture</div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="sharing-processors" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">5. Data Sharing & Sub-Processors</h2>
              </div>
              <p>
                We do not sell user data. We share necessary account or technical information only with trusted infrastructure subprocessors required to operate our service (e.g. tier-4 datacenters, payment gateways like Razorpay/Stripe, and domain registries like ICANN/.IN Registry).
              </p>
              <p>
                All third-party subprocessors are bound by strict Data Processing Agreements (DPAs) requiring adherence to equivalent data privacy and security controls.
              </p>
            </section>

            {/* Section 6 */}
            <section id="retention-archival" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">6. Data Retention & Archival</h2>
              </div>
              <p>
                Customer email box contents are retained for the active duration of your subscription. Upon account termination or cancellation, mailbox contents are retained in a recoverable state for 30 days before permanent zero-overwrite purge, unless active archiving services are contracted.
              </p>
            </section>

            {/* Section 7 */}
            <section id="user-rights" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">7. User Rights & GDPR / DPDP Compliance</h2>
              </div>
              <p>
                Under applicable privacy regulations (including India's Digital Personal Data Protection Act - DPDP, and EU GDPR), clients have the right to:
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-700">
                <li>Access and export organization mailbox data and administrative logs.</li>
                <li>Request rectification of inaccurate account or contact details.</li>
                <li>Request complete account deletion and data erasure ("Right to be Forgotten").</li>
                <li>Withdraw consent for optional marketing communications.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="cookies-analytics" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">8. Cookies & Tracking Technologies</h2>
              </div>
              <p>
                Our portal uses essential session cookies to keep administrators securely authenticated into the webmail and client management dashboard. We do not use third-party cross-site tracking cookies or intrusive ad networks.
              </p>
            </section>

            {/* Section 9 */}
            <section id="contact-privacy" className="scroll-mt-28 bg-gradient-to-br from-white via-blue-50/50 to-white border border-blue-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-600/20">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">9. Contact Privacy Officer</h2>
              </div>
              <p>
                If you have questions, data subject requests, or privacy concerns regarding Justemail services, please reach out to our dedicated Data Protection Officer:
              </p>

            </section>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
