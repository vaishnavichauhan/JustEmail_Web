"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { useCart, CartItem } from "@/lib/cartContext";
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HardDrive, 
  Zap, 
  Check, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  User,
  Trash2,
  ShoppingCart,
  QrCode
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlanDetails {
  id: string;
  providerId: string;
  providerName: string;
  planName: string;
  price: string;
  amountNumeric: number;
  period: string;
  logo: string;
  storage: string;
  sla: string;
  attachment: string;
  features: string[];
}

const checkoutPlanLookup: Record<string, PlanDetails> = {
  "google-starter": {
    id: "google-starter",
    providerId: "google-workspace",
    providerName: "Google Workspace",
    planName: "Business Starter",
    price: "₹136",
    amountNumeric: 136,
    period: "/ user / month",
    logo: "/images/google-workspace.png",
    storage: "30 GB Cloud Storage",
    sla: "99.9% SLA Guarantee",
    attachment: "25 MB Limit",
    features: [
      "30 GB Cloud Storage per User",
      "Professional Custom Domain Gmail (@company.com)",
      "100 Participant Google Meet Video Calls",
      "Google Docs, Sheets, Slides & Forms Suite",
      "Centralized Google Cloud Admin Console",
      "2-Step Verification & Google Security Shield"
    ]
  },
  "google-standard": {
    id: "google-standard",
    providerId: "google-workspace",
    providerName: "Google Workspace",
    planName: "Business Standard",
    price: "₹672",
    amountNumeric: 672,
    period: "/ user / month",
    logo: "/images/google-workspace.png",
    storage: "2 TB Cloud Storage",
    sla: "99.9% SLA Guarantee",
    attachment: "25 MB Limit",
    features: [
      "2 TB (2000 GB) Storage per User",
      "150 User Meet + Noise Cancellation & Recording",
      "Shared Team Drives for File Storage",
      "Security & Central Admin Controls",
      "24/7 Enterprise Priority Support"
    ]
  },
  "google-plus": {
    id: "google-plus",
    providerId: "google-workspace",
    providerName: "Google Workspace",
    planName: "Business Plus",
    price: "₹1260",
    amountNumeric: 1260,
    period: "/ user / month",
    logo: "/images/google-workspace.png",
    storage: "5 TB Cloud Storage",
    sla: "99.9% SLA Guarantee",
    attachment: "25 MB Limit",
    features: [
      "5 TB Storage per User",
      "500 User Meet + Recording + Attendance",
      "Vault eDiscovery & Data Retention",
      "Advanced Endpoint & Device Management"
    ]
  },
  "ms-basic": {
    id: "ms-basic",
    providerId: "microsoft-365",
    providerName: "Microsoft 365",
    planName: "Business Basic",
    price: "₹145",
    amountNumeric: 145,
    period: "/ user / month",
    logo: "/images/microsoft-365.png",
    storage: "50 GB Exchange Mailbox",
    sla: "99.9% SLA Guarantee",
    attachment: "150 MB Large Limit",
    features: [
      "50 GB Exchange Mailbox per User",
      "1 TB OneDrive Cloud Storage Included",
      "Web & Mobile Outlook & Office Apps",
      "Microsoft Teams Meetings, Video & Chat",
      "Exchange Anti-Spam & Threat Defense"
    ]
  },
  "ms-standard": {
    id: "ms-standard",
    providerId: "microsoft-365",
    providerName: "Microsoft 365",
    planName: "Business Standard",
    price: "₹660",
    amountNumeric: 660,
    period: "/ user / month",
    logo: "/images/microsoft-365.png",
    storage: "50 GB + 1 TB Drive",
    sla: "99.9% SLA Guarantee",
    attachment: "150 MB Large Limit",
    features: [
      "50 GB Exchange Mailbox + 1 TB OneDrive",
      "Full Installable Desktop Apps (Word, Excel, PPT, Outlook)",
      "Teams Webinars & Attendee Reporting",
      "Centralized Admin Console & Permissions"
    ]
  },
  "ms-premium": {
    id: "ms-premium",
    providerId: "microsoft-365",
    providerName: "Microsoft 365",
    planName: "Business Premium",
    price: "₹1620",
    amountNumeric: 1620,
    period: "/ user / month",
    logo: "/images/microsoft-365.png",
    storage: "50 GB + 1 TB Drive",
    sla: "99.9% SLA Guarantee",
    attachment: "150 MB Large Limit",
    features: [
      "50 GB Mailbox + Desktop Office Apps Suite",
      "Advanced Defender Cyber Threat Defense",
      "Microsoft Intune Device & App Management"
    ]
  },
  "rediff-starter": {
    id: "rediff-starter",
    providerId: "rediffmail-pro",
    providerName: "Rediffmail Pro",
    planName: "Enterprise Starter",
    price: "₹89",
    amountNumeric: 89,
    period: "/ user / month",
    logo: "/images/rediffmail.png",
    storage: "10 GB Encrypted Storage",
    sla: "99.99% SLA Guarantee",
    attachment: "25 MB Limit",
    features: [
      "10 GB Encrypted Storage per Inbox",
      "Custom Domain Email Branding & Setup",
      "Advanced Anti-Phishing & Spam Shield",
      "POP3, IMAP, SMTP & Webmail Protocols",
      "24/7 Priority Indian Technical Support"
    ]
  },
  "titan-lite": {
    id: "titan-lite",
    providerId: "titan-mail",
    providerName: "Titan Mail",
    planName: "Business Mail Lite",
    price: "₹79",
    amountNumeric: 79,
    period: "/ user / month",
    logo: "/images/titan-mail.png",
    storage: "10 GB Mailbox Storage",
    sla: "99.9% SLA Guarantee",
    attachment: "30 MB Limit",
    features: [
      "10 GB Mailbox Storage per Inbox",
      "Read Receipts & Undo Send Feature",
      "Follow-up Reminders & Snippet Templates",
      "Built-in Calendar, Contacts & Tasks Sync",
      "Seamless 1-Click Gmail & Outlook Import"
    ]
  }
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    // If cart is empty and user arrived via direct link with plan param, initialize cart item once
    if (cartItems.length === 0 && planParam && checkoutPlanLookup[planParam]) {
      const planToInit = checkoutPlanLookup[planParam];
      addToCart(planToInit, 1);
    }
  }, [cartItems.length, planParam]);

  const activeCartItems = cartItems;

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    adminName: "",
    adminEmail: "",
    domainName: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: ""
  });

  // Safe Price Parser Helper
  const getNumericPrice = (item: any): number => {
    if (typeof item?.amountNumeric === "number" && !isNaN(item.amountNumeric) && item.amountNumeric > 0) {
      return item.amountNumeric;
    }
    if (typeof item?.price === "number" && !isNaN(item.price)) {
      return item.price;
    }
    if (typeof item?.price === "string") {
      const cleaned = item.price.replace(/[^\d]/g, "");
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return 136; // Safe default fallback
  };

  // Calculations across all cart items
  const subtotal = activeCartItems.reduce((sum, item) => {
    const priceNum = getNumericPrice(item);
    const seats = item.userCount && item.userCount > 0 ? item.userCount : 1;
    return sum + (priceNum * seats * 12);
  }, 0);

  const tax = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // Clear cart upon successful payment
    clearCart();
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground relative">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />

      {/* --- CHECKOUT HEADER --- */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-10 bg-gradient-to-b from-slate-900 via-[#0B1437] to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/business-emails#provider-plans"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Business Email Plans</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL Encrypted 256-Bit Checkout</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Checkout & Mailbox Deployment
          </h1>
          <p className="text-sm text-slate-300 font-normal mt-2">
            {activeCartItems.length > 0 
              ? `${activeCartItems.length} Business Email Plan${activeCartItems.length > 1 ? "s" : ""} selected in your cart.` 
              : "Your shopping cart is currently empty."}
          </p>
        </div>
      </section>

      {/* --- MAIN CHECKOUT SECTION --- */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {isSuccess ? (
            /* --- ORDER SUCCESS CONFIRMATION --- */
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-200 shadow-xl max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed & Paid!</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Thank you! Your cart items have been processed and paid for. Your mailboxes are now provisioning.
              </p>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-left mb-8 text-xs space-y-2">
                <div><strong className="text-gray-900">Target Domain:</strong> {formData.domainName || "yourcompany.com"}</div>
                <div><strong className="text-gray-900">Admin Email:</strong> {formData.adminEmail || "admin@company.com"}</div>
                <div><strong className="text-gray-900">Total Paid:</strong> ₹{grandTotal.toLocaleString("en-IN")} / year</div>
                <div><strong className="text-gray-900">Status:</strong> <span className="text-emerald-600 font-bold">Cart Cleared • Provisioning Active</span></div>
              </div>
              <Link
                href="/business-emails"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-lg transition-all"
              >
                <span>Return to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : activeCartItems.length === 0 ? (
            /* --- EMPTY CART STATE --- */
            <div className="bg-white rounded-3xl p-12 md:p-16 border border-gray-200 shadow-sm text-center max-w-xl mx-auto my-10">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-inner">
                <ShoppingCart className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Your Shopping Cart is Empty</h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                You don't have any business email plans in your cart right now. Browse our official provider plans and click <strong>Buy Now</strong> to add them to your cart!
              </p>
              <Link
                href="/business-emails#provider-plans"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-lg transition-all active:scale-95"
              >
                <span>Browse All Business Email Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* --- CHECKOUT FORM & SUMMARY GRID --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Cart Items, Customer Info & Payment Form */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. MULTI-ITEM SHOPPING CART SUMMARY */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <span>Shopping Cart ({activeCartItems.length} Plan{activeCartItems.length > 1 ? "s" : ""})</span>
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1.5 hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Cart</span>
                    </button>
                  </div>

                  {/* List of Cart Items */}
                  <div className="space-y-6">
                    {activeCartItems.map((item) => (
                      <div key={item.id} className="p-5 rounded-2xl bg-slate-50/80 border border-gray-200 relative">
                        {/* Remove item button - ALWAYS WORKS TO REMOVE ANY ITEM */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200"
                          title="Remove plan from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0">
                            <Image
                              src={item.logo}
                              alt={item.providerName}
                              width={36}
                              height={36}
                              className="object-contain max-h-7 w-auto"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-blue-600">{item.providerName}</div>
                            <div className="text-lg font-extrabold text-gray-900">{item.planName}</div>
                            <div className="text-xs font-semibold text-gray-700">{item.price} {item.period}</div>
                          </div>
                        </div>

                        {/* Seat counter per plan */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200/80">
                          <div className="text-xs font-bold text-gray-700">Mailbox Licenses:</div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.userCount - 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-100 text-xs shadow-xs"
                              title="Decrease seats"
                            >
                              -
                            </button>
                            <span className="text-xs font-extrabold text-gray-900 w-6 text-center">{item.userCount}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.userCount + 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-100 text-xs shadow-xs"
                              title="Increase seats"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. CUSTOMER & DOMAIN DETAILS FORM */}
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span>Organization & Domain Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Business Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="businessName"
                            required
                            value={formData.businessName}
                            onChange={handleInputChange}
                            placeholder="Acme Technologies Pvt Ltd"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                          <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Target Business Domain *</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="domainName"
                            required
                            value={formData.domainName}
                            onChange={handleInputChange}
                            placeholder="mycompany.com"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                          <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Admin Full Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="adminName"
                            required
                            value={formData.adminName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                          <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Admin Contact Email *</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="adminEmail"
                            required
                            value={formData.adminEmail}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Mobile Number (For WhatsApp Updates) *</label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. PAYMENT DETAILS FORM */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span>Payment Details Form</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-600">256-Bit SSL</span>
                      </div>
                    </h3>

                    {/* Payment Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === "card"
                            ? "bg-[#0B1437] text-white border-[#0B1437] shadow-sm"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Credit / Debit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === "upi"
                            ? "bg-[#0B1437] text-white border-[#0B1437] shadow-sm"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span>UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === "netbanking"
                            ? "bg-[#0B1437] text-white border-[#0B1437] shadow-sm"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>NetBanking</span>
                      </button>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="4532 •••• •••• 8910"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Expiry Date *</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              required
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM / YY"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">CVV *</label>
                            <input
                              type="password"
                              name="cardCvv"
                              required
                              maxLength={4}
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              placeholder="•••"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-blue-600 bg-gray-50/50"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center space-y-3">
                        <QrCode className="w-12 h-12 text-blue-600 mx-auto" />
                        <div className="text-xs font-bold text-gray-900">Instant UPI Payment (GPay, PhonePe, Paytm)</div>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          placeholder="username@upi"
                          className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 text-xs font-medium text-center focus:outline-none focus:border-blue-600 bg-white mx-auto block"
                        />
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center space-y-2">
                        <Building2 className="w-10 h-10 text-blue-600 mx-auto" />
                        <div className="text-xs font-bold text-gray-900">Select NetBanking Partner Bank</div>
                        <div className="text-[11px] text-gray-500">HDFC, ICICI, SBI, Axis, Kotak supported at next step</div>
                      </div>
                    )}

                    {/* COMPLETE ORDER BUTTON */}
                    <button
                      type="submit"
                      className="w-full mt-6 py-4 px-6 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                    >
                      <span>Pay ₹{grandTotal.toLocaleString("en-IN")} & Complete Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </form>

              </div>

              {/* RIGHT COLUMN: STICKY ORDER SUMMARY */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-md">
                  <h3 className="text-base font-extrabold text-gray-900 mb-4">Order Total Summary</h3>

                  {/* 1. CART PLAN ITEMS DETAILS AT VERY TOP */}
                  <div className="pb-6 border-b border-gray-100">
                    <div className="text-xs font-extrabold text-gray-900 mb-3 flex items-center justify-between">
                      <span>Cart Plan Items ({activeCartItems.length}):</span>
                      <span className="text-[11px] font-bold text-blue-600">Annual Billing</span>
                    </div>
                    <div className="space-y-3">
                      {activeCartItems.map((item) => {
                        const priceNum = getNumericPrice(item);
                        const seats = item.userCount && item.userCount > 0 ? item.userCount : 1;
                        const itemAnnualTotal = priceNum * seats * 12;

                        return (
                          <div key={item.id} className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="font-extrabold text-gray-900">{item.providerName}</div>
                              <div className="font-extrabold text-gray-900">₹{itemAnnualTotal.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-gray-500">
                              <span>{item.planName}</span>
                              <span>{seats} Seat{seats > 1 ? "s" : ""} × {item.price}/mo × 12 mo</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. SUBTOTAL & GST BREAKDOWN AFTER ITEM DETAILS */}
                  <div className="space-y-3 text-xs py-4 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Cart Subtotal</span>
                      <span className="font-extrabold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST Tax (18%)</span>
                      <span className="font-extrabold text-gray-900">₹{tax.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>100% Managed Setup Fee</span>
                      <span className="font-extrabold text-emerald-600">FREE (₹0)</span>
                    </div>
                  </div>

                  {/* 3. GRAND TOTAL */}
                  <div className="pt-4 pb-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="text-sm font-extrabold text-gray-900">Grand Total (Annual)</div>
                    <div className="text-2xl font-extrabold text-blue-600">₹{grandTotal.toLocaleString("en-IN")}</div>
                  </div>

                  {/* Guarantee Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">100% SLA Guarantee</div>
                      <div className="text-[10px] text-gray-600">Zero downtime migration handled by our certified engineers</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        mode="signup"
        onClose={() => setAuthModalOpen(false)}
      />

      <Footer />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-40 text-center">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
