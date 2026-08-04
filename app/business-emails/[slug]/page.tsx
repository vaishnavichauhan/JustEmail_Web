"use client";

import { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { useCompare, PlanItem } from "@/lib/compareContext";
import { useCart } from "@/lib/cartContext";
import {
  Sparkles,
  ShieldCheck,
  HardDrive,
  Zap,
  Check,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Star,
  Users,
  CheckCircle2,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderData {
  slug: string;
  name: string;
  badge: string;
  heroHeadline: string;
  heroSubtitle: string;
  logo: string;
  sla: string;
  maxStorage: string;
  plans: (PlanItem & { description: string })[];
  whyChoose: {
    title: string;
    description: string;
    icon: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const singleProviderData: Record<string, ProviderData> = {
  "google-workspace": {
    slug: "google-workspace",
    name: "Google Workspace",
    badge: "Official Google Cloud Partner",
    heroHeadline: "Professional Gmail for Your Custom Business Domain",
    heroSubtitle: "Transform team productivity with custom domain Gmail (@yourcompany.com), Google Meet video calls, Docs, Sheets, and 30 GB to 5 TB pooled cloud storage.",
    logo: "/images/google-workspace.png",
    sla: "99.9% SLA",
    maxStorage: "Up to 5 TB",
    plans: [],
    whyChoose: [
      {
        title: "Native Google Ecosystem",
        description: "Seamlessly integrate Gmail with Drive, Docs, Sheets, Slides, and Calendar without third-party plugins.",
        icon: "globe"
      },
      {
        title: "Enterprise AI Security",
        description: "Google's machine learning blocks over 99.9% of spam, phishing attempts, and malware before hitting inboxes.",
        icon: "shield"
      },
      {
        title: "High-Definition Video Meetings",
        description: "Host encrypted video meetings up to 500 participants with background noise cancellation & cloud recording.",
        icon: "zap"
      },
      {
        title: "Zero Downtime Migration",
        description: "Our certified engineers handle 100% of your domain DNS setup, MX records, and inbox data transfer for free.",
        icon: "check"
      }
    ],
    faqs: [
      {
        question: "Can I use my existing domain name with Google Workspace?",
        answer: "Yes! You can connect any domain name you own (e.g. yourcompany.com) to create custom email addresses like name@yourcompany.com."
      },
      {
        question: "How long does migration from my old email provider take?",
        answer: "Migration is typically completed within 2 to 6 hours with 0% email downtime. Our support team assists with full MX record updates and password-less mailbox transfer."
      },
      {
        question: "Is 24/7 technical support included with my plan?",
        answer: "Yes, all Google Workspace plans purchased through justEmails include 24/7 phone, email, and live chat technical support."
      },
      {
        question: "Can I mix different plan tiers (e.g., Starter and Standard) for different users?",
        answer: "Yes, you can assign Business Starter to basic users and Business Standard to power users within the same domain."
      }
    ]
  },
  "microsoft-365": {
    slug: "microsoft-365",
    name: "Microsoft 365",
    badge: "Official Microsoft Solution Partner",
    heroHeadline: "Enterprise Exchange Email & Microsoft Teams Suite",
    heroSubtitle: "Power corporate communications with 50 GB Exchange Mailbox, Outlook Web & Mobile, Microsoft Teams, and full desktop Office apps.",
    logo: "/images/microsoft-365.png",
    sla: "99.9% SLA",
    maxStorage: "50 GB + 1 TB Drive",
    plans: [],
    whyChoose: [
      {
        title: "Native Outlook & Desktop Apps",
        description: "Enjoy full compatibility with Outlook desktop, Word, Excel, PowerPoint, and Access across PC and Mac.",
        icon: "globe"
      },
      {
        title: "150 MB Large Attachment Sending",
        description: "Send and receive email attachments up to 150 MB directly from Outlook without external file links.",
        icon: "zap"
      },
      {
        title: "Exchange Online Spam Defense",
        description: "Protects your corporate inbox against ransomware, zero-day exploits, and spoofing with Defender for Office 365.",
        icon: "shield"
      },
      {
        title: "Microsoft Teams Integration",
        description: "Schedule, join, and host HD video conferences directly from your Outlook email calendar with 1-click.",
        icon: "check"
      }
    ],
    faqs: [
      {
        question: "Can I install Office desktop apps on multiple devices?",
        answer: "Yes! With Microsoft 365 Business Standard and Premium, each user can install desktop Office apps on up to 5 PCs/Macs, 5 tablets, and 5 phones."
      },
      {
        question: "Does Microsoft 365 include Exchange Online email?",
        answer: "Yes! All Microsoft 365 Business plans include 50 GB Exchange Online email hosting per user on your custom domain."
      },
      {
        question: "How does migration from existing IMAP / Gmail to Microsoft 365 work?",
        answer: "Our engineers execute seamless automated mailbox migrations that transfer all historical emails, folders, contacts, and calendar entries to Exchange."
      }
    ]
  },
  "zoho-mail": {
    slug: "zoho-mail",
    name: "Zoho Mail",
    badge: "Official Zoho Premium Partner",
    heroHeadline: "Ultra-Fast, Secure & Ad-Free Business Email Hosting",
    heroSubtitle: "Get high-performance custom domain email hosting with 5 GB to 50 GB NVMe storage, zero-ads interface, and integrated Zoho Suite.",
    logo: "/images/zoho-mail.png",
    sla: "99.9% SLA",
    maxStorage: "Up to 50 GB",
    plans: [],
    whyChoose: [
      {
        title: "100% Privacy & Zero-Ads Guarantee",
        description: "Zoho Mail respects user data privacy and never scans or sells your business emails for advertising.",
        icon: "shield"
      },
      {
        title: "1 GB Huge Attachment Limit",
        description: "Send massive files, design blueprints, and datasets up to 1 GB directly via email on Premium plans.",
        icon: "zap"
      },
      {
        title: "Integrated Zoho CRM & Workplace",
        description: "Connect your inbox directly with Zoho CRM, Projects, Cliq chat, and Zoho Docs without extra setup.",
        icon: "globe"
      },
      {
        title: "Cost-Effective Pricing",
        description: "Enterprise-grade email infrastructure starting at just ₹58/month, providing maximum ROI for businesses.",
        icon: "check"
      }
    ],
    faqs: [
      {
        question: "Is Zoho Mail suitable for small businesses?",
        answer: "Yes! Zoho Mail is one of the most popular and affordable business email solutions in the world, ideal for teams from 1 to 10,000+ users."
      },
      {
        question: "Can I access Zoho Mail on mobile devices?",
        answer: "Yes, Zoho Mail provides dedicated native mobile apps for iOS and Android, as well as IMAP/POP3 access for Outlook and Apple Mail."
      }
    ]
  },
  "rediffmail-pro": {
    slug: "rediffmail-pro",
    name: "Rediffmail Pro",
    badge: "Official Rediff Corporate Partner",
    heroHeadline: "Indian Data Sovereignty & Secure Corporate Email",
    heroSubtitle: "High-security corporate email hosted in tier-4 Indian data centers with custom domain branding, anti-phishing defense, and priority phone support.",
    logo: "/images/rediffmail.png",
    sla: "99.99% SLA",
    maxStorage: "Up to 50 GB",
    plans: [],
    whyChoose: [
      {
        title: "Tier-4 Indian Data Centers",
        description: "100% data sovereignty hosted locally within certified Indian datacenters.",
        icon: "shield"
      },
      {
        title: "Dedicated Phone Support",
        description: "Get direct phone access to Indian technical support engineers 24 hours a day.",
        icon: "zap"
      }
    ],
    faqs: [
      {
        question: "Where are Rediffmail Pro servers located?",
        answer: "All Rediffmail Pro mail servers and backup nodes are located in Tier-4 datacenters within India."
      }
    ]
  },
  "titan-mail": {
    slug: "titan-mail",
    name: "Titan Mail",
    badge: "Official Titan Partner",
    heroHeadline: "Smart Email Built Specifically for Small Businesses",
    heroSubtitle: "Boost team productivity with read receipts, follow-up reminders, email templates, and integrated calendar.",
    logo: "/images/titan-mail.png",
    sla: "99.9% SLA",
    maxStorage: "Up to 30 GB",
    plans: [],
    whyChoose: [
      {
        title: "Read Receipts & Undo Send",
        description: "Know exactly when clients open your emails and instantly recall sent emails with 1-click.",
        icon: "zap"
      },
      {
        title: "Follow-up Reminders",
        description: "Never lose track of important sales leads with automated follow-up reminders.",
        icon: "globe"
      },
      {
        title: "Integrated Calendar & Tasks",
        description: "Manage your daily schedules, meetings, and team task lists directly within your email interface.",
        icon: "check"
      },
      {
        title: "Lightning-Fast Search",
        description: "Locate any email, attachment, or contact in milliseconds with Titan's instant search engine.",
        icon: "shield"
      }
    ],
    faqs: [
      {
        question: "Can I import emails from Gmail or Outlook into Titan?",
        answer: "Yes! Titan features a 1-click import tool that safely transfers all your existing emails and contacts in minutes."
      },
      {
        question: "How do Read Receipts work in Titan Mail?",
        answer: "Titan notifies you in real-time when the recipient opens your email and clicks on any included links."
      }
    ]
  }
};

const slugAliases: Record<string, string> = {
  "google": "google-workspace",
  "google-workspace": "google-workspace",
  "microsoft": "microsoft-365",
  "microsoft-365": "microsoft-365",
  "zoho": "zoho-mail",
  "zoho-mail": "zoho-mail",
  "rediff": "rediffmail-pro",
  "rediffmail": "rediffmail-pro",
  "rediffmail-pro": "rediffmail-pro",
  "titan": "titan-mail",
  "titan-mail": "titan-mail"
};

export default function SingleProviderPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const providerSlug = resolvedParams.slug;
  const normalizedSlug = slugAliases[providerSlug] || providerSlug;
  const defaultProvider = singleProviderData[normalizedSlug] || singleProviderData["google-workspace"];

  const [dynamicProviderData, setDynamicProviderData] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicProvider() {
      try {
        setLoading(true);
        const res = await fetch("/api/providers");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            const matching = data.data.filter((p: any) => {
              if (p.enabled === false) return false;
              const pId = p.id.toLowerCase();
              const logoT = (p.logoType || "").toLowerCase();
              const reqSlug = providerSlug.toLowerCase();
              const normSlug = normalizedSlug.toLowerCase();

              return (
                pId === reqSlug ||
                pId === normSlug ||
                logoT === reqSlug ||
                logoT === normSlug ||
                normSlug.includes(logoT) ||
                reqSlug.includes(pId)
              );
            });

            const baseProvider = singleProviderData[normalizedSlug] || singleProviderData["google-workspace"];
            const customPlans = matching.map((p: any) => ({
              id: p.id,
              providerId: normalizedSlug,
              providerName: p.name,
              planName: p.subtitle || p.name,
              price: p.price,
              period: p.period || "/ user / month",
              logo: baseProvider?.logo || "/images/logo1.svg",
              storage: p.storage,
              sla: p.uptime,
              attachment: "30 MB",
              description: `${p.name} ${p.subtitle || ""} with ${p.storage}`,
              features: Array.isArray(p.features) ? p.features : [],
            }));

            if (isMounted) {
              setDynamicProviderData({
                ...baseProvider,
                plans: customPlans,
              });
            }
          }
        }
      } catch (err) {
        console.error("Error loading dynamic provider slug page data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadDynamicProvider();
    return () => {
      isMounted = false;
    };
  }, [providerSlug, normalizedSlug]);

  const provider = dynamicProviderData || defaultProvider;

  const planCarouselRef = useRef<HTMLDivElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [domainInput, setDomainInput] = useState("");

  const { toggleComparePlan, isPlanSelected } = useCompare();
  const { addToCart } = useCart();

  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (planCarouselRef.current) {
      const container = planCarouselRef.current;
      const index = Math.round(container.scrollLeft / 360);
      setActiveIndex(index);
    }
  };

  const handleScrollLeft = () => {
    if (planCarouselRef.current) {
      planCarouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (planCarouselRef.current) {
      planCarouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Auto-scroll when more than 3 provider plans exist
  useEffect(() => {
    if (!provider.plans || provider.plans.length <= 3 || isCarouselPaused) return;

    const interval = setInterval(() => {
      if (planCarouselRef.current) {
        const container = planCarouselRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [provider.plans, isCarouselPaused]);

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenAuthModal("signup");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative">
      {/* Navigation Header */}
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white overflow-hidden text-center">
        {/* Background Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-left mb-8">
            <Link
              href="/business-emails#provider-plans"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Business Email Plans</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* Centered Provider Logo Box */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-5 flex items-center justify-center shadow-2xl mb-6 relative group">
              <Image
                src={provider.logo}
                alt={provider.name}
                width={80}
                height={80}
                priority
                className="object-contain max-h-16 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Centered Partner Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-400/20 mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{provider.badge}</span>
            </div>

            {/* Centered Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 max-w-4xl">
              {provider.heroHeadline}
            </h1>

            {/* Centered Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-3xl">
              {provider.heroSubtitle}
            </p>

            {/* Centered Metric Chips Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-slate-800/80 w-full max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-bold text-white">{provider.maxStorage}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white">Zero Ads Shield</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-bold text-white">Free Migration</span>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* --- PRICING PLANS GRID SECTION --- */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left max-w-2xl">
              <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
                Official {provider.name} Plans
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-2">
                Choose the Perfect {provider.name} Tier
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                All plans include custom domain setup, full spam protection, 24/7 technical support, and 0-downtime migration.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            {provider.plans.length > 0 && (
              <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
                <button
                  onClick={handleScrollLeft}
                  className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
                  aria-label="Previous plan"
                  title="Previous Plan"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
                  aria-label="Next plan"
                  title="Next Plan"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="p-12 text-center bg-white border border-gray-200 rounded-3xl shadow-sm space-y-3 max-w-xl mx-auto">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <div className="text-sm text-gray-600 font-bold">Loading plans...</div>
            </div>
          ) : provider.plans.length === 0 ? (
            <div className="p-12 text-center bg-white border border-gray-200 rounded-3xl shadow-sm space-y-3 max-w-xl mx-auto">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <div className="text-xl text-gray-900 font-extrabold">Currently no have any plan</div>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                No active plans are currently configured for {provider.name}. Please contact admin or check back soon.
              </p>
            </div>
          ) : (
            <div
              ref={planCarouselRef}
              onScroll={handleScroll}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 px-1"
            >
              {provider.plans.map((plan, idx) => {
                const isChecked = isPlanSelected(plan.id);
                const isFeatured = idx === 1 || provider.plans.length === 1;

                return (
                  <div
                    key={plan.id}
                    className={`snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[370px] rounded-2xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isFeatured
                      ? "bg-[#0B1437] text-white shadow-2xl border border-slate-800 scale-[1.01] z-10"
                      : "bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-200 z-10"
                      }`}
                  >
                    <div>
                      {/* Top Logo & Compare Button */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
                          <Image
                            src={plan.logo}
                            alt={plan.providerName}
                            width={36}
                            height={36}
                            className="object-contain max-h-7 w-auto"
                          />
                        </div>

                        <button
                          onClick={() => toggleComparePlan(plan)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 shadow-xs border active:scale-95 ${isChecked
                            ? "bg-blue-600 text-white border-blue-500 shadow-md"
                            : isFeatured
                              ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                              : "bg-[#0B1437] text-white border-[#0B1437] hover:bg-black"
                            }`}
                          title="Compare this plan"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>{isChecked ? "Selected" : "Compare"}</span>
                        </button>
                      </div>

                      <h3 className={`text-2xl font-extrabold tracking-tight mb-1 ${isFeatured ? "text-white" : "text-gray-900"}`}>
                        {plan.planName}
                      </h3>
                      <p className={`text-xs font-semibold mb-4 ${isFeatured ? "text-blue-300" : "text-blue-600"}`}>
                        {plan.providerName}
                      </p>
                      <p className={`text-xs leading-relaxed mb-6 ${isFeatured ? "text-gray-300" : "text-gray-600"}`}>
                        {plan.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${isFeatured ? "bg-[#1E2A56] text-blue-300" : "bg-[#D8E6FF] text-[#2563EB]"
                              }`}>
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className={`text-xs font-medium leading-relaxed ${isFeatured ? "text-gray-200" : "text-gray-700"}`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Buy Now */}
                    <div className={`pt-5 flex items-center justify-between border-t ${isFeatured ? "border-slate-800" : "border-gray-100"
                      }`}>
                      <div>
                        <div className={`text-2xl font-extrabold tracking-tight ${isFeatured ? "text-white" : "text-gray-900"}`}>
                          {plan.price}
                          <span className={`text-xs font-medium ml-1 ${isFeatured ? "text-gray-400" : "text-gray-500"}`}>
                            {plan.period}
                          </span>
                        </div>
                        <div className={`text-[10px] font-normal mt-0.5 ${isFeatured ? "text-gray-400" : "text-gray-500"}`}>
                          Billed annually
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/enquiryForm?provider=${encodeURIComponent(plan.providerName || provider.name)}&plan=${encodeURIComponent(`${plan.planName} (${plan.price})`)}&providerId=${encodeURIComponent(plan.id)}`}
                          className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-300 border ${isFeatured
                            ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/40 hover:text-white"
                            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-900"
                            }`}
                        >
                          <span>Enquiry now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Fully Rounded Scroll Indicators */}
          {!loading && provider.plans.length > 3 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {provider.plans.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    if (planCarouselRef.current) {
                      planCarouselRef.current.scrollTo({ left: dotIdx * 360, behavior: "smooth" });
                      setActiveIndex(dotIdx);
                    }
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === dotIdx
                    ? "w-8 bg-blue-600 shadow-sm"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to plan ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* --- PROVIDER TIER COMPARISON MATRIX SECTION --- */}
      {provider.plans.length > 0 && (
        <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0B1437] via-[#14214D] to-[#0B1437] text-blue-200 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{provider.name} Tier Comparison</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                Compare All {provider.name} Plans Side-by-Side
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Detailed feature-by-feature breakdown of all {provider.name} plans to help you choose the right tier for your organization.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0B1437] via-[#14214D] to-[#0B1437] text-white border-b border-slate-800">
                    <th className="p-6 text-left w-64 min-w-[220px] text-xs font-extrabold text-white-200 uppercase tracking-wider">
                      Provider Name
                    </th>
                    {provider.plans.map((p) => (
                      <th key={p.id} className="p-6 text-left min-w-[240px]">
                        <div className="text-sm text-white font-medium">{provider.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                  {/* Subtitle Row */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/60">
                      Plan Subtitle
                    </td>
                    {provider.plans.map((p) => (
                      <td key={p.id} className="p-6 font-bold text-blue-800 text-sm">
                        {p.planName}
                      </td>
                    ))}
                  </tr>

                  {/* Storage */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/60">
                      Mailbox Storage
                    </td>
                    {provider.plans.map((p) => (
                      <td key={p.id} className="p-6 font-bold text-gray-900">
                        {p.storage}
                      </td>
                    ))}
                  </tr>

                  {/* Price Row */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/60">
                      Plan Price
                    </td>
                    {provider.plans.map((p) => (
                      <td key={p.id} className="p-6 font-extrabold text-[#0B1437] text-base">
                        {p.price} <span className="text-xs text-gray-500 font-medium">{p.period}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Key Included Features */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 bg-gray-50/60 align-top">
                      Key Included Features
                    </td>
                    {provider.plans.map((p) => (
                      <td key={p.id} className="p-6 align-top">
                        <div className="space-y-2.5">
                          {p.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-relaxed text-gray-700 font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr className="bg-slate-50/80">
                    <td className="p-6 font-bold text-gray-900">
                      Select Plan
                    </td>
                    {provider.plans.map((p) => (
                      <td key={p.id} className="p-6">
                        <Link
                          href={`/enquiryForm?provider=${encodeURIComponent(provider.name)}&plan=${encodeURIComponent(`${p.planName} (${p.price})`)}&providerId=${encodeURIComponent(p.id)}`}
                          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0B1437] via-[#1A2859] to-[#0B1437] hover:from-[#1A2859] hover:to-[#0B1437] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg border border-slate-700/50 transition-all duration-300 active:scale-95"
                        >
                          <span>Enquiry Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>
      )}

      {/* --- WHY CHOOSE THIS PROVIDER SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Why Choose {provider.name}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Built for Security, Scale & Team Performance
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Discover why thousands of businesses trust {provider.name} for their primary enterprise communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {provider.whyChoose.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80 shadow-2xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm">
              Everything you need to know about setting up and migrating to {provider.name}.
            </p>
          </div>

          <div className="space-y-4">
            {provider.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:bg-gray-50/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

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
