"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  SlidersHorizontal, 
  FileText, 
  HelpCircle, 
  User, 
  LogOut, 
  TrendingUp, 
  Activity, 
  CreditCard, 
  Search, 
  Filter, 
  Plus, 
  Bell, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  ArrowRight, 
  Download, 
  Building, 
  Server, 
  Lock, 
  Tag, 
  Layers, 
  Percent, 
  Briefcase,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

// Pre-set Hardcoded Credentials for Demo
const DEMO_RESELLER_ID = "reseller@justemails.in";
const DEMO_RESELLER_PASS = "Reseller@12345";

interface ResellerCustomer {
  id: string;
  company: string;
  contact: string;
  provider: string;
  mailboxes: number;
  retailPrice: string;
  status: "Active" | "Suspended";
}

interface ResellerOrder {
  id: string;
  orderId: string;
  provider: string;
  quantity: number;
  wholesaleCost: string;
  retailVal: string;
  profit: string;
  status: "Completed" | "Pending";
  date: string;
}

interface ResellerPlan {
  id: string;
  provider: string;
  planName: string;
  wholesaleCost: string;
  retailPrice: string;
  profitMargin: string;
}

interface ResellerInvoice {
  id: string;
  invoiceNo: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending Payout";
  date: string;
}

export default function ResellerPage() {
  const router = useRouter();
  const authLogout = useAuthStore((state) => state.logout);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [resellerId, setResellerId] = useState(DEMO_RESELLER_ID);
  const [resellerPass, setResellerPass] = useState(DEMO_RESELLER_PASS);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Reseller Sidebar Menu Options
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "customers" | "orders" | "plans" | "invoices" | "support" | "profile"
  >("dashboard");

  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const triggerAlert = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3000);
  };

  // State for Reseller Scoped Customers
  const [myCustomers, setMyCustomers] = useState<ResellerCustomer[]>([
    { id: "1", company: "Apex IT Solutions", contact: "Rohan Varma", provider: "Google Workspace", mailboxes: 15, retailPrice: "₹180 / user / mo", status: "Active" },
    { id: "2", company: "Bright Media Agency", contact: "Kavita Shah", provider: "Microsoft 365", mailboxes: 25, retailPrice: "₹165 / user / mo", status: "Active" },
    { id: "3", company: "Cloud Matrix Tech", contact: "Siddharth N.", provider: "Cross-Tenant Split", mailboxes: 40, retailPrice: "₹210 / user / mo", status: "Active" },
    { id: "4", company: "Delta Logistics", contact: "Manish Kumar", provider: "Zoho Mail", mailboxes: 10, retailPrice: "₹75 / user / mo", status: "Suspended" },
  ]);

  const [myOrders, setMyOrders] = useState<ResellerOrder[]>([
    { id: "1", orderId: "#RES-401", provider: "Google Workspace", quantity: 15, wholesaleCost: "₹1,800", retailVal: "₹2,700", profit: "₹900/mo", status: "Completed", date: "29 Jul 2026" },
    { id: "2", orderId: "#RES-402", provider: "Microsoft 365", quantity: 25, wholesaleCost: "₹2,875", retailVal: "₹4,125", profit: "₹1,250/mo", status: "Completed", date: "28 Jul 2026" },
    { id: "3", orderId: "#RES-403", provider: "Cross-Tenant Split", quantity: 40, wholesaleCost: "₹6,000", retailVal: "₹8,400", profit: "₹2,400/mo", status: "Pending", date: "26 Jul 2026" },
  ]);

  const [myPlans, setMyPlans] = useState<ResellerPlan[]>([
    { id: "1", provider: "Google Workspace", planName: "Business Starter", wholesaleCost: "₹120 / mo", retailPrice: "₹180 / mo", profitMargin: "₹60 / seat (50% Margin)" },
    { id: "2", provider: "Microsoft 365", planName: "Business Basic", wholesaleCost: "₹115 / mo", retailPrice: "₹165 / mo", profitMargin: "₹50 / seat (43% Margin)" },
    { id: "3", provider: "Zoho Mail", planName: "Mail Lite", wholesaleCost: "₹40 / mo", retailPrice: "₹75 / mo", profitMargin: "₹35 / seat (87% Margin)" },
    { id: "4", provider: "Titan Mail", planName: "Business Premium", wholesaleCost: "₹60 / mo", retailPrice: "₹110 / mo", profitMargin: "₹50 / seat (83% Margin)" },
  ]);

  const [myInvoices, setMyInvoices] = useState<ResellerInvoice[]>([
    { id: "1", invoiceNo: "INV-RES-991", description: "Google & Microsoft Wholesale Licenses", amount: "₹4,675", status: "Paid", date: "29 Jul 2026" },
    { id: "2", invoiceNo: "INV-RES-990", description: "Monthly Reseller Profit Payout Slip", amount: "₹34,500", status: "Pending Payout", date: "25 Jul 2026" },
  ]);

  const [profile, setProfile] = useState({
    resellerName: "Apex Cloud Partners",
    contactPerson: "Vikram Malhotra",
    email: "reseller@justemails.in",
    phone: "+91 99887 76655",
    payoutBank: "HDFC Bank (A/C **** 4892)",
    walletBalance: "₹12,400",
  });

  const loginStore = useAuthStore((state) => state.login);

  const handleResellerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const inputId = resellerId.trim().toLowerCase();

    if (!inputId.includes("@")) {
      setErrorMsg("Please enter a valid Reseller Email ID.");
      return;
    }

    if (resellerPass !== DEMO_RESELLER_PASS && resellerPass !== "Reseller@12345") {
      setErrorMsg("Incorrect password for Reseller account. (Hint: Reseller@12345)");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loginStore({
        fullName: profile.contactPerson || "Reseller Partner",
        email: resellerId.trim(),
        role: "reseller",
      });
      setLoading(false);
      setIsLoggedIn(true);
    }, 400);
  };

  const handleLogout = () => {
    authLogout();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 selection:bg-indigo-600 selection:text-white font-sans flex">
      {!isLoggedIn ? (
        // ==========================================
        // RESELLER LOGIN SCREEN
        // ==========================================
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-100 relative overflow-hidden">
          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block bg-white px-5 py-2.5 rounded-2xl shadow-xl hover:scale-105 transition-transform border border-gray-200">
                <Image
                  src="/images/justemail-logo.png"
                  alt="Justemail Logo"
                  width={160}
                  height={45}
                  priority
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <h1 className="text-2xl font-extrabold text-gray-900 mt-4">Reseller Partner Portal</h1>
              <p className="text-xs text-gray-500 mt-1">Purchase Wholesale Email & Sell to Customers</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200"
            >
              <div className="mb-6 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1">
                <div className="font-extrabold text-indigo-950">Preset Reseller Credentials:</div>
                <div>ID: <span className="font-bold text-gray-900">{DEMO_RESELLER_ID}</span></div>
                <div>Password: <span className="font-bold text-gray-900">{DEMO_RESELLER_PASS}</span></div>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleResellerLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Reseller Partner ID</label>
                  <input
                    type="email"
                    required
                    value={resellerId}
                    onChange={(e) => setResellerId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={resellerPass}
                    onChange={(e) => setResellerPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 hover:from-black hover:to-indigo-950 text-white font-extrabold text-xs shadow-lg shadow-indigo-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? "Authenticating..." : "Enter Reseller Partner Dashboard"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      ) : (
        // ==========================================
        // MAIN RESELLER DASHBOARD
        // ==========================================
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
          
          {/* --- SIDEBAR NAVIGATION (PURPLE / INDIGO RESELLER THEME) --- */}
          <aside className="w-full lg:w-64 bg-[#0F172A] border-r border-slate-800 text-slate-200 flex flex-col justify-between shrink-0 p-5 shadow-2xl">
            <div className="space-y-6">
              
              {/* Logo Wrapper */}
              <div className="px-2 py-1">
                <Link href="/" className="inline-block bg-white px-3.5 py-1.5 rounded-xl shadow-md">
                  <Image
                    src="/images/justemail-logo.png"
                    alt="Justemail Logo"
                    width={130}
                    height={35}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
                <div className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-indigo-400" />
                  <span>Reseller Partner Portal</span>
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1 text-xs font-bold">
                {[
                  { id: "dashboard", label: "Dashboard", icon: ShieldCheck },
                  { id: "customers", label: "My Customers", icon: Users },
                  { id: "orders", label: "My Orders", icon: ShoppingBag },
                  { id: "plans", label: "My Plans & Profit", icon: SlidersHorizontal },
                  { id: "invoices", label: "Invoices & Payouts", icon: FileText },
                  { id: "support", label: "Support", icon: HelpCircle },
                  { id: "profile", label: "Profile & Wallet", icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

            </div>
          </aside>

          {/* --- MAIN RESELLER CONTENT VIEW --- */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
            
            {/* Top White Header Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-extrabold text-gray-900">Welcome, Partner 👋</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-extrabold">Verified Reseller</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <Link
                  href="/"
                  className="hidden sm:flex items-center gap-1.5 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Public Website</span>
                </Link>

                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center relative">
                  <Bell className="w-4 h-4" />
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 hover:from-black hover:to-indigo-950 text-white font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-indigo-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </header>

            {/* Notification Banner */}
            {actionAlert && (
              <div className="bg-indigo-900 text-white px-6 py-2.5 text-xs font-extrabold flex items-center justify-between animate-fadeIn shadow-md">
                <span>{actionAlert}</span>
                <button onClick={() => setActionAlert(null)}>✕</button>
              </div>
            )}

            {/* Dynamic Tab Body */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
              
              {/* ==========================================
                  1. RESELLER DASHBOARD
                 ========================================== */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  
                  {/* 4 RESELLER METRICS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* My Customers */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">My Customers</span>
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">24</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+4 new clients added this month</span>
                      </div>
                    </div>

                    {/* Active Mailboxes */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">My Active Seats</span>
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                          <Server className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">180</div>
                      <div className="text-[11px] text-indigo-600 font-semibold">Google, Microsoft, Zoho Seats</div>
                    </div>

                    {/* Total Reseller Profit */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Earned Profit</span>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                          <DollarSign className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-emerald-600">₹34,500</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Reseller retail margin earned</span>
                      </div>
                    </div>

                    {/* Wholesale Wallet Balance */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Wholesale Wallet</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                          <CreditCard className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-indigo-900">₹12,400</div>
                      <div className="text-[11px] text-gray-500 font-semibold">Available for purchasing seats</div>
                    </div>

                  </div>

                  {/* PROFIT MARGIN & QUICK ACTION WIDGETS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Reseller Profit Margin Overview Widget */}
                    <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-gray-200 space-y-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                            <Percent className="w-4 h-4 text-indigo-600" />
                            <span>Wholesale Cost vs Retail Profit Margin</span>
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">Wholesale price purchased from Admin vs Retail price sold to customers</p>
                        </div>
                        <button
                          onClick={() => setActiveTab("plans")}
                          className="text-xs font-extrabold text-indigo-600 hover:underline"
                        >
                          Manage Selling Prices →
                        </button>
                      </div>

                      <div className="space-y-4 pt-1">
                        {myPlans.map((pl) => (
                          <div key={pl.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold text-gray-500 uppercase">{pl.provider}</div>
                              <div className="text-sm font-extrabold text-gray-900">{pl.planName}</div>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold">
                              <div>
                                <span className="text-gray-500 block text-[10px]">Admin Wholesale:</span>
                                <span className="text-gray-900 font-bold">{pl.wholesaleCost}</span>
                              </div>
                              <div className="text-indigo-600 font-black">→</div>
                              <div>
                                <span className="text-gray-500 block text-[10px]">Your Retail Price:</span>
                                <span className="text-indigo-900 font-extrabold">{pl.retailPrice}</span>
                              </div>
                              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                                Profit: {pl.profitMargin}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                      <h3 className="text-base font-extrabold text-gray-900">Reseller Quick Launch</h3>
                      <p className="text-xs text-gray-500">Perform instant reseller operations</p>

                      <div className="space-y-3 pt-2">
                        <button
                          onClick={() => setActiveTab("customers")}
                          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-xs shadow-md flex items-center justify-between hover:opacity-95 transition-opacity"
                        >
                          <span className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            <span>Create New Customer</span>
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => triggerAlert("Opening Wholesale Plan Purchase modal...")}
                          className="w-full p-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs border border-gray-200 flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-indigo-600" />
                            <span>Buy Wholesale Licenses</span>
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => triggerAlert("Redirecting to Profit Payout Request...")}
                          className="w-full p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200 flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <span>Request Profit Payout</span>
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ==========================================
                  2. MY CUSTOMERS (RESELLER SCOPED DATA ONLY)
                 ========================================== */}
              {activeTab === "customers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">My Customers</h2>
                      <p className="text-xs text-gray-500">You only see customers created under your reseller partner account.</p>
                    </div>

                    <button
                      onClick={() => triggerAlert("Opening Create Customer under Reseller Account...")}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 hover:from-black hover:to-indigo-950 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Customer</span>
                    </button>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Company</th>
                          <th className="p-4">Contact Person</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">Seats Sold</th>
                          <th className="p-4">Reseller Selling Price</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {myCustomers.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                              <Building className="w-4 h-4 text-indigo-600" />
                              <span>{c.company}</span>
                            </td>
                            <td className="p-4 font-semibold">{c.contact}</td>
                            <td className="p-4"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">{c.provider}</span></td>
                            <td className="p-4 font-extrabold text-gray-900">{c.mailboxes} Seats</td>
                            <td className="p-4 font-bold text-emerald-700">{c.retailPrice}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${c.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => triggerAlert(`Viewing customer ${c.company}`)} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-[11px]">View</button>
                                <button onClick={() => triggerAlert(`Selling new plan to ${c.company}`)} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-extrabold text-[11px] border border-indigo-200">Sell Plan</button>
                                <button onClick={() => triggerAlert(`Editing customer ${c.company}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-extrabold text-[11px] border border-gray-200">Edit</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==========================================
                  3. MY ORDERS (PURCHASED FROM ADMIN)
                 ========================================== */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">My Orders</h2>
                    <p className="text-xs text-gray-500">Wholesale mailbox seat licenses purchased from Admin.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">Quantity</th>
                          <th className="p-4">Wholesale Cost</th>
                          <th className="p-4">Retail Value</th>
                          <th className="p-4">Your Profit</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {myOrders.map((o) => (
                          <tr key={o.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900 font-mono">{o.orderId}</td>
                            <td className="p-4 font-semibold text-indigo-900">{o.provider}</td>
                            <td className="p-4 font-extrabold">{o.quantity} Mailboxes</td>
                            <td className="p-4 font-semibold text-gray-700">{o.wholesaleCost}</td>
                            <td className="p-4 font-semibold text-gray-900">{o.retailVal}</td>
                            <td className="p-4 font-black text-emerald-600">{o.profit}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${o.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==========================================
                  4. MY PLANS & PROFIT MARGINS
                 ========================================== */}
              {activeTab === "plans" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">My Plans & Retail Selling Prices</h2>
                    <p className="text-xs text-gray-500">Configure your retail markup selling price to earn maximum profit margins.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {myPlans.map((pl) => (
                      <div key={pl.id} className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                        <div className="text-xs font-extrabold text-indigo-700 uppercase">{pl.provider}</div>
                        <div className="text-lg font-black text-gray-900">{pl.planName}</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between text-gray-500">
                            <span>Admin Wholesale:</span>
                            <span className="font-bold text-gray-900">{pl.wholesaleCost}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Your Retail Price:</span>
                            <span className="font-bold text-indigo-700">{pl.retailPrice}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-extrabold">
                          {pl.profitMargin}
                        </div>
                        <button
                          onClick={() => triggerAlert(`Opening Retail Price Editor for ${pl.planName}...`)}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-xs"
                        >
                          Edit Selling Price
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================
                  5. INVOICES & PROFIT PAYOUTS
                 ========================================== */}
              {activeTab === "invoices" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Invoices & Reseller Profit Payout Slips</h2>
                    <p className="text-xs text-gray-500">View tax invoices for wholesale seat purchases and profit payout receipts.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Invoice No</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Download</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {myInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900 font-mono">{inv.invoiceNo}</td>
                            <td className="p-4 font-semibold">{inv.description}</td>
                            <td className="p-4 font-extrabold text-emerald-700">{inv.amount}</td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-indigo-50 text-indigo-800 border border-indigo-200"}`}>{inv.status}</span></td>
                            <td className="p-4 text-right">
                              <button onClick={() => triggerAlert(`Downloading PDF for ${inv.invoiceNo}...`)} className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-[11px] flex items-center gap-1.5 ml-auto">
                                <Download className="w-3.5 h-3.5" />
                                <span>Download PDF</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==========================================
                  6. SUPPORT TICKET SYSTEM FOR RESELLERS
                 ========================================== */}
              {activeTab === "support" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Reseller Priority SLA Support</h2>
                    <p className="text-xs text-gray-500">Contact Admin for wholesale provisioning, bulk licenses, or DNS assistance.</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Bulk Google Workspace seat allocation"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Message to Admin</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your request..."
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <button
                      onClick={() => triggerAlert("Support ticket submitted to Super Admin!")}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-xs shadow-md"
                    >
                      Submit Priority Ticket
                    </button>
                  </div>
                </div>
              )}

              {/* ==========================================
                  7. RESELLER PROFILE & WALLET
                 ========================================== */}
              {activeTab === "profile" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Reseller Partner Profile</h2>
                    <p className="text-xs text-gray-500">Manage reseller business details, payout bank account, & API credentials.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-white border border-gray-200 space-y-5 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Reseller Partner Name</label>
                        <input
                          type="text"
                          value={profile.resellerName}
                          onChange={(e) => setProfile({ ...profile, resellerName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Contact Person</label>
                        <input
                          type="text"
                          value={profile.contactPerson}
                          onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Profit Payout Bank Account</label>
                      <input
                        type="text"
                        value={profile.payoutBank}
                        onChange={(e) => setProfile({ ...profile, payoutBank: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                      <button
                        onClick={() => triggerAlert("Reseller Profile updated successfully!")}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white font-extrabold text-xs shadow-md"
                      >
                        Save Profile Details
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </main>
  );
}
