"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldAlert,
  AlertTriangle,
  Mail,
  Ban,
  Server,
  Lock,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Zap,
  FileText,
  XCircle,
  Bug,
  Globe
} from "lucide-react";

export default function AcceptableUsePolicyPage() {
  const lastUpdated = "August 3, 2026";

  const policyTabs = [
    { name: "Privacy Policy", href: "/privacy-policy", active: false },
    { name: "Terms of Service", href: "/terms-of-service", active: false },
    { name: "Acceptable Use Policy", href: "/acceptable-use-policy", active: true },
  ];

  const sections = [
    { id: "purpose-scope", title: "1. Purpose & Scope" },
    { id: "anti-spam-policy", title: "2. Zero-Tolerance Anti-Spam Policy" },
    { id: "prohibited-activities", title: "3. Prohibited Content & Malicious Activities" },
    { id: "smtp-resource-limits", title: "4. SMTP Connection & Rate Throttling" },
    { id: "domain-reputation", title: "5. Domain & IP Reputation Directives" },
    { id: "security-violations", title: "6. Security & Vulnerability Exploitation" },
    { id: "enforcement-suspension", title: "7. Enforcement, Suspension & Penalties" },
    { id: "report-abuse", title: "8. Reporting Abuse & Violations" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-rose-50/30 to-[#F8FAFC] border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-400/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Anti-Spam & Network Integrity</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
            Acceptable Use Policy (AUP)
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            Guidelines governing permitted email transmissions, system security limits, zero-tolerance anti-spam rules, and IP network integrity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Effective Date: <strong className="text-slate-900">{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <Ban className="w-3.5 h-3.5 text-rose-600" />
              <span>Zero-Tolerance Spam Enforcement</span>
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
                <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-xl text-[11px] space-y-2">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Report Spam & Abuse</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Spotted abuse or spam originating from our IP space?
                  </p>
                  <a
                    href="mailto:abuse@justemail.in"
                    className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    abuse@justemail.in
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Document Content */}
          <main className="lg:col-span-3 space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* Section 1 */}
            <section id="purpose-scope" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">1. Purpose & Scope</h2>
              </div>
              <p>
                Justemail Technologies ("Justemail", "we", "us") maintains strict operational guidelines to safeguard our global IP sender reputation, mail server availability, and client deliverability rates. This Acceptable Use Policy (AUP) defines permitted and prohibited uses of Justemail email infrastructure.
              </p>
              <p>
                All clients, domain administrators, and mailbox users must comply strictly with this policy. Violations will result in immediate service suspension or account termination without refund.
              </p>
            </section>

            {/* Section 2 */}
            <section id="anti-spam-policy" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                  <Ban className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">2. Zero-Tolerance Anti-Spam Policy</h2>
              </div>
              <p>
                Justemail enforces a strict <strong>Zero-Tolerance Anti-Spam Policy</strong>. Our infrastructure is optimized exclusively for 1-to-1 transactional business communications, corporate correspondence, and legitimate double opt-in transactional notifications.
              </p>

              <div className="p-5 bg-rose-50/80 border border-rose-100 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Strictly Prohibited Email Practices
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Purchased, Rented, or Scraped Lists:</strong> Sending email to third-party, purchased, or web-scraped email addresses is strictly forbidden.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Unsolicited Cold Bulk Mailing (UCE/UBE):</strong> High-volume unsolicited commercial emails or bulk promotional blasts are prohibited on business email hosting nodes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Fake Headers & Spoofing:</strong> Forging, altering, or obfuscating email headers, envelope senders, or DKIM signatures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Open Relays & Misconfigured Mailers:</strong> Operating open SMTP relays or unauthorized third-party mail scripts.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="prohibited-activities" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">3. Prohibited Content & Malicious Activities</h2>
              </div>
              <p>
                Clients may not use Justemail servers to transmit, store, or distribute any content or materials that involve:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5 text-rose-600" />
                    Malware & Ransomware
                  </h5>
                  <p className="text-slate-600">Distributing viruses, trojans, keyloggers, phishing kits, or malicious attachments.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Phishing & Identity Theft
                  </h5>
                  <p className="text-slate-600">Impersonating financial institutions, government agencies, or external corporate entities.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="smtp-resource-limits" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-600">
                  <Server className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">4. SMTP Connection & Rate Throttling</h2>
              </div>
              <p>
                To maintain server stability and prevent IP blacklisting, the following default rate limits apply per mailbox unless custom enterprise volume limits are provisioned:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-lg font-bold text-blue-600">500 / Hour</div>
                  <div className="text-xs text-slate-500 mt-1">Recipient Outbound Cap</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-lg font-bold text-emerald-600">100 Connections</div>
                  <div className="text-xs text-slate-500 mt-1">Concurrent IMAP/SMTP</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-lg font-bold text-purple-600">50 MB</div>
                  <div className="text-xs text-slate-500 mt-1">Max Message Attachment</div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="domain-reputation" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">5. Domain & IP Reputation Directives</h2>
              </div>
              <p>
                All client domains hosted on Justemail must implement valid DNS authentication records including <strong>SPF (`v=spf1 ...`)</strong>, <strong>DKIM (`v=DKIM1; ...`)</strong>, and <strong>DMARC (`v=DMARC1; p=reject ...`)</strong> as configured by our managed onboarding team.
              </p>
              <p>
                If a domain causes Justemail shared IP addresses to be listed on major RBLs (Spamhaus, Barracuda, SpamCop), the domain's outbound mail will be isolated to a quarantined pool until remediation.
              </p>
            </section>

            {/* Section 6 */}
            <section id="security-violations" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">6. Security & Vulnerability Exploitation</h2>
              </div>
              <p>
                Customers are strictly prohibited from attempting unauthorized penetration testing, port scanning, denial-of-service (DoS) attacks, or brute-force authentication against Justemail control panels or mail servers.
              </p>
            </section>

            {/* Section 7 */}
            <section id="enforcement-suspension" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">7. Enforcement, Suspension & Penalties</h2>
              </div>
              <p>
                Justemail reserves the right to immediately suspend or terminate accounts that breach this policy. Accounts terminated due to spam violations or illegal activities forfeit all right to refunds.
              </p>
            </section>

            {/* Section 8 */}
            <section id="report-abuse" className="scroll-mt-28 bg-gradient-to-br from-white via-rose-50/50 to-white border border-rose-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-md shadow-rose-600/20">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">8. Reporting Abuse & Violations</h2>
              </div>
              <p>
                If you receive unsolicited commercial email (spam), phishing attempts, or security threats originating from a domain hosted on Justemail, please forward the complete email headers to our abuse team:
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">24/7 Security & Abuse Response</div>
                  <a href="mailto:abuse@justemail.in" className="text-rose-600 font-bold hover:underline text-sm">
                    abuse@justemail.in
                  </a>
                </div>
                <Mail className="w-5 h-5 text-rose-600" />
              </div>
            </section>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
