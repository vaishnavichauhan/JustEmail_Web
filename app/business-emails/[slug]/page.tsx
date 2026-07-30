"use client";

import { useState, use } from "react";
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
  Lock,
  Star,
  Users,
  CheckCircle2,
  HelpCircle
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
    plans: [
      {
        id: "google-starter",
        providerId: "google-workspace",
        providerName: "Google Workspace",
        planName: "Business Starter",
        price: "₹136",
        period: "/ user / month",
        logo: "/images/google-workspace.png",
        storage: "30 GB Pooled",
        sla: "99.9% SLA",
        attachment: "25 MB / Drive",
        description: "Ideal for small teams getting started with professional custom domain Gmail.",
        features: [
          "30 GB Pooled Cloud Storage per User",
          "Professional Gmail (@yourcompany.com)",
          "100 Participant Google Meet Video Calls",
          "Google Docs, Sheets, Slides Suite",
          "Centralized Google Admin Console",
          "2-Step Verification & Google Security"
        ]
      },
      {
        id: "google-standard",
        providerId: "google-workspace",
        providerName: "Google Workspace",
        planName: "Business Standard",
        price: "₹672",
        period: "/ user / month",
        logo: "/images/google-workspace.png",
        storage: "2 TB Pooled",
        sla: "99.9% SLA",
        attachment: "25 MB / Drive",
        description: "Our most popular plan for growing companies needing massive storage & meeting recording.",
        features: [
          "2 TB (2000 GB) Pooled Storage per User",
          "150 User Meet + Noise Cancel & Recording",
          "Shared Team Drives for File Storage",
          "Security Controls & Admin Console",
          "Enhanced Cloud Search Across Workspace",
          "24/7 Priority Google Technical Support"
        ]
      },
      {
        id: "google-plus",
        providerId: "google-workspace",
        providerName: "Google Workspace",
        planName: "Business Plus",
        price: "₹1260",
        period: "/ user / month",
        logo: "/images/google-workspace.png",
        storage: "5 TB Pooled",
        sla: "99.9% SLA",
        attachment: "25 MB / Drive",
        description: "Enterprise security & compliance for companies with advanced device controls.",
        features: [
          "5 TB (5000 GB) Pooled Storage per User",
          "500 User Meet + Recording + Attendance",
          "Vault eDiscovery & Data Retention",
          "Advanced Endpoint & Device Management",
          "Enhanced Security & Threat Protection",
          "24/7 Dedicated Enterprise Support"
        ]
      }
    ],
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
    plans: [
      {
        id: "ms-basic",
        providerId: "microsoft-365",
        providerName: "Microsoft 365",
        planName: "Business Basic",
        price: "₹145",
        period: "/ user / month",
        logo: "/images/microsoft-365.png",
        storage: "50 GB Exchange",
        sla: "99.9% SLA",
        attachment: "150 MB Large",
        description: "Cloud-first email & Teams collaboration for modern mobile workforces.",
        features: [
          "50 GB Dedicated Exchange Mailbox per User",
          "1 TB OneDrive Cloud Storage Included",
          "Web & Premium Mobile Outlook & Office Apps",
          "Microsoft Teams Meetings, Video & Chat",
          "Shared Calendars, Contacts & Groups",
          "Exchange Anti-Spam & Threat Defense"
        ]
      },
      {
        id: "ms-standard",
        providerId: "microsoft-365",
        providerName: "Microsoft 365",
        planName: "Business Standard",
        price: "₹660",
        period: "/ user / month",
        logo: "/images/microsoft-365.png",
        storage: "50 GB + 1 TB Drive",
        sla: "99.9% SLA",
        attachment: "150 MB Large",
        description: "Complete business suite with installable desktop Word, Excel, PowerPoint & Outlook.",
        features: [
          "50 GB Exchange Mailbox + 1 TB OneDrive",
          "Full Desktop Installable Apps (Word, Excel, PPT, Outlook)",
          "Teams Webinars & Attendee Reporting",
          "Microsoft Bookings & Scheduling Tools",
          "Centralized Admin Console & Governance",
          "24/7 Priority Microsoft Support"
        ]
      },
      {
        id: "ms-premium",
        providerId: "microsoft-365",
        providerName: "Microsoft 365",
        planName: "Business Premium",
        price: "₹1620",
        period: "/ user / month",
        logo: "/images/microsoft-365.png",
        storage: "50 GB + 1 TB Drive",
        sla: "99.9% SLA",
        attachment: "150 MB Large",
        description: "Advanced Defender cybersecurity protection and Intune device management.",
        features: [
          "50 GB Mailbox + Desktop Office Apps Suite",
          "Advanced Defender Cyber Threat Defense",
          "Microsoft Intune Device & App Management",
          "Information Protection & Data Loss Prevention",
          "Zero-Trust Access & Conditional Access",
          "24/7 Enterprise Dedicated Support"
        ]
      }
    ],
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
    plans: [
      {
        id: "zoho-lite",
        providerId: "zoho-mail",
        providerName: "Zoho Mail",
        planName: "Mail Lite",
        price: "₹58",
        period: "/ user / month",
        logo: "/images/zoho-mail.png",
        storage: "5 GB NVMe",
        sla: "99.9% SLA",
        attachment: "25 MB",
        description: "Best budget business email for startups and small teams.",
        features: [
          "5 GB NVMe Mailbox Storage per User",
          "Custom Business Domain (@yourcompany.com)",
          "Zero-Ads Interface with AI Anti-Spam",
          "Webmail, iOS & Android Mobile Apps",
          "Email Aliases, Routing & Group Mailboxes",
          "Free 1-Click Migration & 24/7 Support"
        ]
      },
      {
        id: "zoho-standard",
        providerId: "zoho-mail",
        providerName: "Zoho Mail",
        planName: "Workplace Standard",
        price: "₹99",
        period: "/ user / month",
        logo: "/images/zoho-mail.png",
        storage: "30 GB Pooled",
        sla: "99.9% SLA",
        attachment: "50 MB",
        description: "All-in-one productivity with Mail, Cloud Storage, Cliq Chat, and Office tools.",
        features: [
          "30 GB Pooled Mailbox + Drive Storage",
          "Custom Business Email (@company.com)",
          "Zoho Office Suite (Writer, Sheet, Show)",
          "Team Chat (Cliq) & Video Meetings",
          "Admin Control Console & Governance",
          "24/7 Managed Priority Technical Support"
        ]
      },
      {
        id: "zoho-premium",
        providerId: "zoho-mail",
        providerName: "Zoho Mail",
        planName: "Mail Premium",
        price: "₹199",
        period: "/ user / month",
        logo: "/images/zoho-mail.png",
        storage: "50 GB Dedicated",
        sla: "99.9% SLA",
        attachment: "1 GB Huge Limit",
        description: "Enterprise storage with 1 GB attachment limit & S/MIME encryption.",
        features: [
          "50 GB Dedicated NVMe Storage per User",
          "Huge File Attachments up to 1 GB",
          "eDiscovery & Mail Archival Retention",
          "Custom S/MIME Encryption & Digital Signatures",
          "Domain Digital Signatures & Security",
          "24/7 Dedicated Support & SLA Guarantee"
        ]
      }
    ],
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
    plans: [
      {
        id: "rediff-starter",
        providerId: "rediffmail-pro",
        providerName: "Rediffmail Pro",
        planName: "Enterprise Starter",
        price: "₹89",
        period: "/ user / month",
        logo: "/images/rediffmail.png",
        storage: "10 GB Encrypted",
        sla: "99.99% SLA",
        attachment: "25 MB",
        description: "Secure, reliable email hosting hosted in tier-4 Indian datacenters.",
        features: [
          "10 GB Encrypted Cloud Storage per Inbox",
          "Custom Domain Email Branding & Setup",
          "Advanced Anti-Phishing & Spam Shield",
          "POP3, IMAP, SMTP & Webmail Protocols",
          "Shared Address Book & Contacts",
          "24/7 Priority Indian Technical Support"
        ]
      },
      {
        id: "rediff-business",
        providerId: "rediffmail-pro",
        providerName: "Rediffmail Pro",
        planName: "Enterprise Business",
        price: "₹149",
        period: "/ user / month",
        logo: "/images/rediffmail.png",
        storage: "25 GB Storage",
        sla: "99.99% SLA",
        attachment: "35 MB",
        description: "Enhanced storage and multi-device sync for growing Indian enterprises.",
        features: [
          "25 GB High-Speed Mailbox Storage",
          "Multi-Device Mobile App & Webmail Sync",
          "Dual-Layer Anti-Virus & Threat Shield",
          "Centralized Multi-User Admin Portal",
          "Shared Calendars & Event Reminders",
          "24/7 Priority Indian Support Team"
        ]
      },
      {
        id: "rediff-pro",
        providerId: "rediffmail-pro",
        providerName: "Rediffmail Pro",
        planName: "Enterprise Pro Archival",
        price: "₹249",
        period: "/ user / month",
        logo: "/images/rediffmail.png",
        storage: "50 GB Storage",
        sla: "99.99% SLA",
        attachment: "50 MB",
        description: "50 GB storage with automated legal hold archival & compliance search.",
        features: [
          "50 GB Storage + Automated Mail Archival",
          "Legal Hold Search & Compliance Audit",
          "Custom SSL Webmail Branding & Domain",
          "Dedicated Account Manager Assigned",
          "99.99% Financially Backed Uptime SLA",
          "24/7 Priority Phone & Live Support"
        ]
      }
    ],
    whyChoose: [
      {
        title: "100% Indian Data Sovereignty",
        description: "All email data and backups are hosted in tier-4 Indian data centers complying with local data regulation standards.",
        icon: "shield"
      },
      {
        title: "99.99% High Uptime SLA",
        description: "Rediffmail Pro infrastructure provides industry-leading 99.99% server availability for zero-interruption mail delivery.",
        icon: "zap"
      },
      {
        title: "Custom SSL Branding",
        description: "Customize webmail login portals with your company logo and custom domain SSL certificate.",
        icon: "globe"
      },
      {
        title: "Priority Indian Support",
        description: "Direct phone and email assistance from dedicated Indian technical engineers 24/7.",
        icon: "check"
      }
    ],
    faqs: [
      {
        question: "Where is Rediffmail Pro data stored?",
        answer: "Rediffmail Pro data centers are located in India, ensuring total compliance with Indian data sovereignty laws."
      },
      {
        question: "Does Rediffmail Pro support IMAP and POP3?",
        answer: "Yes, Rediffmail Pro fully supports standard IMAP, POP3, and SMTP protocols for Outlook, Thunderbird, and mobile mail clients."
      }
    ]
  },
  "titan-mail": {
    slug: "titan-mail",
    name: "Titan Mail",
    badge: "Official Titan Partner",
    heroHeadline: "Next-Gen Business Mail Built for Modern Teams",
    heroSubtitle: "Boost productivity with read receipts, undo send, follow-up reminders, email templates, and instant global search.",
    logo: "/images/titan-mail.png",
    sla: "99.9% SLA",
    maxStorage: "Up to 30 GB",
    plans: [
      {
        id: "titan-lite",
        providerId: "titan-mail",
        providerName: "Titan Mail",
        planName: "Business Mail Lite",
        price: "₹79",
        period: "/ user / month",
        logo: "/images/titan-mail.png",
        storage: "10 GB Storage",
        sla: "99.9% SLA",
        attachment: "30 MB",
        description: "Smart email features like read receipts & templates for startups.",
        features: [
          "10 GB Mailbox Storage per Inbox",
          "Read Receipts & Undo Send Feature",
          "Follow-up Reminders & Snippet Templates",
          "Built-in Calendar, Contacts & Tasks Sync",
          "Seamless 1-Click Gmail & Outlook Import",
          "Multi-Account Sync on Mobile & Web"
        ]
      },
      {
        id: "titan-premium",
        providerId: "titan-mail",
        providerName: "Titan Mail",
        planName: "Business Mail Premium",
        price: "₹149",
        period: "/ user / month",
        logo: "/images/titan-mail.png",
        storage: "30 GB Storage",
        sla: "99.9% SLA",
        attachment: "40 MB",
        description: "30 GB storage with priority inbox, send later, and priority customer care.",
        features: [
          "30 GB Dedicated Storage per User Inbox",
          "Priority Inbox & Send Later Scheduling",
          "Advanced Email Templates & Snippets",
          "Built-in Task Manager & Collaboration",
          "Priority Customer Support Response",
          "24/7 Technical Managed Assistance"
        ]
      }
    ],
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
  const provider = singleProviderData[normalizedSlug] || singleProviderData["google-workspace"];

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [domainInput, setDomainInput] = useState("");

  const { toggleComparePlan, isPlanSelected } = useCompare();
  const { addToCart } = useCart();

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
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-white">{provider.sla}</span>
              </div>
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
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              Official {provider.name} Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Choose the Perfect {provider.name} Tier
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              All plans include custom domain setup, full spam protection, 24/7 technical support, and 0-downtime migration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {provider.plans.map((plan, idx) => {
              const isChecked = isPlanSelected(plan.id);
              const isFeatured = idx === 1 || provider.plans.length === 1;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isFeatured 
                      ? "bg-[#0B1437] text-white shadow-2xl border border-slate-800 scale-[1.02] z-10" 
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
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 shadow-xs border active:scale-95 ${
                          isChecked 
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
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeatured ? "bg-[#1E2A56] text-blue-300" : "bg-[#D8E6FF] text-[#2563EB]"
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
                  <div className={`pt-5 flex items-center justify-between border-t ${
                    isFeatured ? "border-slate-800" : "border-gray-100"
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

                    <Link
                      href={`/checkout?plan=${plan.id}`}
                      onClick={() => addToCart(plan, 1)}
                      className={`rounded-xl px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all duration-300 active:scale-95 ${
                        isFeatured 
                          ? "bg-white text-[#0B1437] hover:bg-gray-100 shadow-md" 
                          : "bg-[#0B1437] text-white hover:bg-black shadow-md"
                      }`}
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- PROVIDER TIER COMPARISON MATRIX SECTION --- */}
      <section className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
              {provider.name} Tier Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
              Compare All {provider.name} Plans Side-by-Side
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Detailed feature-by-feature breakdown of all {provider.name} plans to help you choose the right tier for your organization.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <table className="w-full border-collapse bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="p-6 text-left w-64 min-w-[220px] text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Plan Specification
                  </th>
                  {provider.plans.map((p) => (
                    <th key={p.id} className="p-6 text-left min-w-[240px]">
                      <div className="text-xs font-semibold text-blue-600 mb-1">{p.providerName}</div>
                      <div className="text-xl font-extrabold text-gray-900 mb-1">{p.planName}</div>
                      <div className="text-2xl font-extrabold text-gray-900">
                        {p.price} <span className="text-xs text-gray-500 font-normal">{p.period}</span>
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
                  {provider.plans.map((p) => (
                    <td key={p.id} className="p-6 font-bold text-gray-900">
                      {p.storage}
                    </td>
                  ))}
                </tr>

                {/* Attachment Limit */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Attachment Limit</span>
                  </td>
                  {provider.plans.map((p) => (
                    <td key={p.id} className="p-6">
                      {p.attachment}
                    </td>
                  ))}
                </tr>

                {/* Uptime SLA */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 bg-gray-50/40 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Uptime Guarantee</span>
                  </td>
                  {provider.plans.map((p) => (
                    <td key={p.id} className="p-6 font-bold text-emerald-600">
                      {p.sla}
                    </td>
                  ))}
                </tr>

                {/* Key Included Features */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 bg-gray-50/40 align-top">
                    Key Included Features
                  </td>
                  {provider.plans.map((p) => (
                    <td key={p.id} className="p-6 align-top">
                      <div className="space-y-2">
                        {p.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr className="bg-gray-50/80">
                  <td className="p-6 font-bold text-gray-900">
                    Select Plan
                  </td>
                  {provider.plans.map((p) => (
                    <td key={p.id} className="p-6">
                      <Link
                        href={`/checkout?plan=${p.id}`}
                        onClick={() => addToCart(p, 1)}
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

        </div>
      </section>

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
