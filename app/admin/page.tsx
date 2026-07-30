"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Server, 
  SlidersHorizontal, 
  Globe, 
  Settings as SettingsIcon, 
  HardDrive, 
  HelpCircle, 
  FileText, 
  LogOut, 
  TrendingUp, 
  Activity, 
  Clock, 
  CreditCard, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  ChevronRight,
  Bell,
  ExternalLink,
  Check,
  Zap,
  Download,
  Edit,
  Trash2,
  Ban,
  MessageSquare,
  CheckSquare,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Send,
  Building,
  Phone,
  MapPin,
  Briefcase,
  Percent
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

// Pre-set Manual Hardcoded Admin Credentials
const MANUAL_ADMIN_ID = "admin@justemails.in";
const MANUAL_ADMIN_PASS = "Admin@12345";

// Types for Admin Data
interface CustomerRecord {
  id: string;
  company: string;
  contact: string;
  provider: string;
  status: "Active" | "Suspended" | "Pending";
}

interface OrderRecord {
  id: string;
  orderId: string;
  customer: string;
  provider: string;
  plan: string;
  amount: string;
  status: "Completed" | "Pending" | "Processing" | "Cancelled";
}

interface ProviderRecord {
  id: string;
  name: string;
  logo: string;
  enabled: boolean;
  activeAccounts: number;
}

interface PlanRecord {
  id: string;
  provider: string;
  planName: string;
  price: string;
  storage: string;
}

interface DomainRecord {
  id: string;
  domainName: string;
  provider: string;
  mx: "Verified" | "Pending";
  spf: "Verified" | "Pending";
  dkim: "Verified" | "Pending";
  dmarc: "Verified" | "Pending";
  status: "Active" | "Propagation";
}

interface ManagedServiceRecord {
  id: string;
  customer: string;
  service: string;
  engineer: string;
  status: "Completed" | "In Progress";
  completedDate: string;
}

interface BackupRecord {
  id: string;
  customer: string;
  provider: string;
  enabled: boolean;
  storageUsed: string;
  renewalDate: string;
}

interface TicketRecord {
  id: string;
  ticketNo: string;
  subject: string;
  customer: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "High" | "Medium" | "Low";
}

interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: string;
  status: "Paid" | "Unpaid";
  date: string;
}

export default function AdminPage() {
  const router = useRouter();
  const authLogout = useAuthStore((state) => state.logout);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [adminId, setAdminId] = useState(MANUAL_ADMIN_ID);
  const [adminPass, setAdminPass] = useState(MANUAL_ADMIN_PASS);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

interface ResellerAdminRecord {
  id: string;
  resellerName: string;
  contactPerson: string;
  email: string;
  activeCustomers: number;
  totalSeatsSold: number;
  wholesaleRate: string;
  totalSales: string;
  earnedProfit: string;
  status: "Active" | "Suspended";
}

// Active Menu Switcher
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "resellers" | "customers" | "orders" | "providers" | "plans" | "domains" | "management" | "backup" | "tickets" | "invoices" | "settings"
  >("dashboard");

  // Interactive Action Notifications
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const triggerAlert = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3000);
  };

  // Create Reseller Modal State & Tabs
  const [isCreateResellerModalOpen, setIsCreateResellerModalOpen] = useState(false);
  const [resellerModalTab, setResellerModalTab] = useState<
    "basic" | "business" | "account" | "pricing" | "providers" | "services"
  >("basic");

  const [newResellerData, setNewResellerData] = useState({
    // 1. Basic Info
    companyName: "",
    contactPerson: "",
    email: "",
    password: "",
    mobileNumber: "",
    country: "India",
    state: "",
    city: "",
    address: "",

    // 2. Business Info (Optional)
    gstNumber: "",
    panNumber: "",
    companyRegNo: "",

    // 3. Account Settings
    resellerId: "RES-" + Math.floor(1000 + Math.random() * 9000),
    status: "Active" as "Active" | "Suspended" | "Pending Verification",
    accountType: "Gold Partner",
    creditLimit: "50000",
    discountPercent: "15",
    notes: "Approved for enterprise reseller tier",

    // 4. Pricing Settings
    pricing: {
      googleStarter: "150",
      microsoftBasic: "120",
      zohoWorkplace: "90",
      titanLite: "65",
    },

    // 5. Provider Permissions
    providerPermissions: {
      googleWorkspace: true,
      microsoft365: true,
      zohoMail: false,
      titanMail: false,
      rediffmail: false,
    },

    // 6. Service Permissions
    servicePermissions: {
      businessEmail: true,
      emailMigration: true,
      emailBackup: true,
      hybridSolutions: true,
      domainRegistration: false,
      managementServices: false,
    },
  });

  const handleCreateReseller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResellerData.companyName || !newResellerData.email) return;

    const newRecord: ResellerAdminRecord = {
      id: Date.now().toString(),
      resellerName: newResellerData.companyName,
      contactPerson: newResellerData.contactPerson || "Account Admin",
      email: newResellerData.email,
      activeCustomers: 0,
      totalSeatsSold: 0,
      wholesaleRate: `₹${newResellerData.pricing.googleStarter} / seat`,
      totalSales: "₹0",
      earnedProfit: "₹0",
      status: newResellerData.status === "Active" ? "Active" : "Suspended",
    };

    setResellers([newRecord, ...resellers]);
    setIsCreateResellerModalOpen(false);
    triggerAlert(`Reseller account "${newResellerData.companyName}" (${newResellerData.resellerId}) created successfully!`);
    setNewResellerData({
      companyName: "",
      contactPerson: "",
      email: "",
      password: "",
      mobileNumber: "",
      country: "India",
      state: "",
      city: "",
      address: "",
      gstNumber: "",
      panNumber: "",
      companyRegNo: "",
      resellerId: "RES-" + Math.floor(1000 + Math.random() * 9000),
      status: "Active",
      accountType: "Gold Partner",
      creditLimit: "50000",
      discountPercent: "15",
      notes: "",
      pricing: { googleStarter: "150", microsoftBasic: "120", zohoWorkplace: "90", titanLite: "65" },
      providerPermissions: { googleWorkspace: true, microsoft365: true, zohoMail: false, titanMail: false, rediffmail: false },
      servicePermissions: { businessEmail: true, emailMigration: true, emailBackup: true, hybridSolutions: true, domainRegistration: false, managementServices: false },
    });
  };

  // Resellers State
  const [resellers, setResellers] = useState<ResellerAdminRecord[]>([
    { id: "1", resellerName: "Apex Cloud Partners", contactPerson: "Vikram Malhotra", email: "reseller@justemails.in", activeCustomers: 24, totalSeatsSold: 180, wholesaleRate: "₹120 / seat", totalSales: "₹1,02,000", earnedProfit: "₹34,500", status: "Active" },
    { id: "2", resellerName: "Matrix Tech Solutions", contactPerson: "Rahul Verma", email: "sales@matrixtech.in", activeCustomers: 12, totalSeatsSold: 95, wholesaleRate: "₹125 / seat", totalSales: "₹54,000", earnedProfit: "₹18,200", status: "Active" },
    { id: "3", resellerName: "Zenith Digital Agency", contactPerson: "Pooja Hegde", email: "admin@zenithdigital.com", activeCustomers: 5, totalSeatsSold: 40, wholesaleRate: "₹130 / seat", totalSales: "₹22,000", earnedProfit: "₹6,500", status: "Suspended" },
  ]);

  // Customer Search & Provider Filter States
  const [customerProviderFilter, setCustomerProviderFilter] = useState("all");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");

  // State Collections
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    { id: "1", company: "ABC Pvt Ltd", contact: "Amit Sharma", provider: "Google Workspace", status: "Active" },
    { id: "2", company: "Tech Corp India", contact: "Priya Patel", provider: "Microsoft 365", status: "Active" },
    { id: "3", company: "Global Logistics", contact: "Rajesh Kumar", provider: "Cross-Tenant Split", status: "Active" },
    { id: "4", company: "Startup Wave", contact: "Sneha Reddy", provider: "Titan Mail", status: "Suspended" },
    { id: "5", company: "Apex Digital", contact: "Vikram Mehta", provider: "Zoho Mail", status: "Active" },
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>([
    { id: "1", orderId: "#JE-9042", customer: "ABC Pvt Ltd", provider: "Google Workspace", plan: "Business Starter", amount: "₹2,040", status: "Completed" },
    { id: "2", orderId: "#JE-9041", customer: "Tech Corp India", provider: "Microsoft 365", plan: "Business Basic", amount: "₹1,160", status: "Pending" },
    { id: "3", orderId: "#JE-9040", customer: "Global Logistics", provider: "Cross-Tenant Split", plan: "Hybrid Coexistence", amount: "₹5,460", status: "Processing" },
    { id: "4", orderId: "#JE-9039", customer: "Startup Wave", provider: "Titan Mail", plan: "Business Lite", amount: "₹395", status: "Cancelled" },
  ]);

  const [providers, setProviders] = useState<ProviderRecord[]>([
    { id: "1", name: "Google Workspace", logo: "/images/google-workspace.png", enabled: true, activeAccounts: 480 },
    { id: "2", name: "Microsoft 365", logo: "/images/microsoft-365.png", enabled: true, activeAccounts: 390 },
    { id: "3", name: "Zoho Mail", logo: "/images/zoho-mail.png", enabled: true, activeAccounts: 210 },
    { id: "4", name: "Titan Mail", logo: "/images/titan-mail.png", enabled: true, activeAccounts: 110 },
    { id: "5", name: "Rediffmail Pro", logo: "/images/rediff-mail.png", enabled: true, activeAccounts: 50 },
  ]);

  const [plans, setPlans] = useState<PlanRecord[]>([
    { id: "1", provider: "Google Workspace", planName: "Business Starter", price: "₹160/mo", storage: "30 GB Cloud Storage" },
    { id: "2", provider: "Microsoft 365", planName: "Business Basic", price: "₹145/mo", storage: "50 GB Mailbox + 1 TB OneDrive" },
    { id: "3", provider: "Zoho Mail", planName: "Mail Lite", price: "₹55/mo", storage: "5 GB Storage per user" },
    { id: "4", provider: "Titan Mail", planName: "Business Lite", price: "₹79/mo", storage: "10 GB Mailbox Storage" },
  ]);

  const [domains, setDomains] = useState<DomainRecord[]>([
    { id: "1", domainName: "abcpvtltd.com", provider: "Google Workspace", mx: "Verified", spf: "Verified", dkim: "Verified", dmarc: "Verified", status: "Active" },
    { id: "2", domainName: "techcorp.in", provider: "Microsoft 365", mx: "Verified", spf: "Verified", dkim: "Verified", dmarc: "Pending", status: "Active" },
    { id: "3", domainName: "globallogistics.co.in", provider: "Cross-Tenant Split", mx: "Verified", spf: "Pending", dkim: "Pending", dmarc: "Pending", status: "Propagation" },
  ]);

  const [managedServices, setManagedServices] = useState<ManagedServiceRecord[]>([
    { id: "1", customer: "ABC Pvt Ltd", service: "Complete Setup Services", engineer: "Rohan V. (Sr. Engineer)", status: "Completed", completedDate: "28 Jul 2026" },
    { id: "2", customer: "Tech Corp India", service: "Email Management 24/7", engineer: "Karan M. (System Admin)", status: "In Progress", completedDate: "Ongoing SLA" },
    { id: "3", customer: "Global Logistics", service: "Admin Panel Setup", engineer: "Ananya S. (Migration Lead)", status: "Completed", completedDate: "25 Jul 2026" },
  ]);

  const [backups, setBackups] = useState<BackupRecord[]>([
    { id: "1", customer: "ABC Pvt Ltd", provider: "Google Workspace", enabled: true, storageUsed: "142 GB", renewalDate: "15 Aug 2026" },
    { id: "2", customer: "Tech Corp India", provider: "Microsoft 365", enabled: true, storageUsed: "310 GB", renewalDate: "28 Sep 2026" },
    { id: "3", customer: "Startup Wave", provider: "Titan Mail", enabled: false, storageUsed: "0 GB", renewalDate: "Disabled" },
  ]);

  const [tickets, setTickets] = useState<TicketRecord[]>([
    { id: "1", ticketNo: "#TK-145", subject: "Unable to receive emails", customer: "ABC Pvt Ltd", status: "Open", priority: "High" },
    { id: "2", ticketNo: "#TK-144", subject: "DKIM Key setup assistance", customer: "Tech Corp India", status: "In Progress", priority: "Medium" },
    { id: "3", ticketNo: "#TK-143", subject: "Add 5 additional Microsoft licenses", customer: "Global Logistics", status: "Resolved", priority: "Low" },
  ]);

  const [invoices, setInvoices] = useState<InvoiceRecord[]>([
    { id: "1", invoiceNo: "INV-2026-088", customer: "ABC Pvt Ltd", amount: "₹2,040", status: "Paid", date: "29 Jul 2026" },
    { id: "2", invoiceNo: "INV-2026-087", customer: "Tech Corp India", amount: "₹1,160", status: "Paid", date: "28 Jul 2026" },
    { id: "3", invoiceNo: "INV-2026-086", customer: "Global Logistics", amount: "₹5,460", status: "Unpaid", date: "25 Jul 2026" },
  ]);

  // Company Settings Form State
  const [settings, setSettings] = useState({
    companyName: "justEmails Web Solutions",
    supportEmail: "support@justemails.in",
    phone: "+91 98765 43210",
    address: "DLF Cyber City, Tower 10, Gurugram, Haryana - 122002",
    smtpServer: "smtp.justemails.in:587",
    paymentGateway: "Razorpay / UPI Live Enabled",
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (adminId.trim() !== MANUAL_ADMIN_ID || adminPass !== MANUAL_ADMIN_PASS) {
      setErrorMsg("Invalid Admin ID or Password. Use preset credentials.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsAdminLoggedIn(true);
    }, 600);
  };

  const handleAdminLogout = () => {
    authLogout();
    setIsAdminLoggedIn(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 selection:bg-blue-600 selection:text-white font-sans flex">
      {!isAdminLoggedIn ? (
        // ==========================================
        // LOGIN SCREEN (LIGHT THEME + NAVY GRADIENT BUTTON)
        // ==========================================
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 relative overflow-hidden">
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
              <h1 className="text-2xl font-extrabold text-gray-900 mt-4">Super Admin Portal</h1>
              <p className="text-xs text-gray-500 mt-1">Authorized Infrastructure Management</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200"
            >
              <div className="mb-6 p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="font-extrabold text-blue-950">Preset Admin Credentials:</div>
                <div>ID: <span className="font-bold text-gray-900">{MANUAL_ADMIN_ID}</span></div>
                <div>Password: <span className="font-bold text-gray-900">{MANUAL_ADMIN_PASS}</span></div>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Admin ID</label>
                  <input
                    type="email"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Admin Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                {/* NAVY BLUE LINEAR GRADIENT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-lg shadow-blue-950/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? "Authenticating..." : "Enter Admin Dashboard"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      ) : (
        // ==========================================
        // MAIN ADMIN DASHBOARD (WHITE BACKGROUND + NAVY GRADIENT BUTTONS)
        // ==========================================
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
          
          {/* --- SIDEBAR NAVIGATION (SLEEK NAVY BLUE) --- */}
          <aside className="w-full lg:w-64 bg-[#0B1437] border-r border-slate-800 text-slate-200 flex flex-col justify-between shrink-0 p-5 shadow-2xl">
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
                <div className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest mt-2">
                  Super Admin Panel
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1 text-xs font-bold">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "resellers", label: "Resellers Partners", icon: ShieldCheck },
                  { id: "customers", label: "Customers", icon: Users },
                  { id: "orders", label: "Orders", icon: ShoppingBag },
                  { id: "providers", label: "Providers", icon: Server },
                  { id: "plans", label: "Plans", icon: SlidersHorizontal },
                  { id: "domains", label: "Domains", icon: Globe },
                  { id: "management", label: "Management Services", icon: Zap },
                  { id: "backup", label: "Email Backup", icon: HardDrive },
                  { id: "tickets", label: "Support Tickets", icon: HelpCircle },
                  { id: "invoices", label: "Invoices", icon: FileText },
                  { id: "settings", label: "Settings", icon: SettingsIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
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

          {/* --- MAIN ADMIN CONTENT VIEW (WHITE BACKGROUND) --- */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
            
            {/* Top White Navigation Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-extrabold text-gray-900">Welcome, Admin 👋</h2>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <Link
                  href="/"
                  className="hidden sm:flex items-center gap-1.5 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Public Website</span>
                </Link>

                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center relative">
                  <Bell className="w-4 h-4" />
                </div>

                {/* NAVY BLUE LINEAR GRADIENT BUTTON FOR LOGOUT */}
                <button
                  onClick={handleAdminLogout}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-blue-950/20"
                  title="Logout Admin Session"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </header>

            {/* Alert Banner */}
            {actionAlert && (
              <div className="bg-[#0B1437] text-white px-6 py-2.5 text-xs font-extrabold flex items-center justify-between animate-fadeIn shadow-md">
                <span>{actionAlert}</span>
                <button onClick={() => setActionAlert(null)}>✕</button>
              </div>
            )}

            {/* Dynamic White Theme Content Panel */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
              
              {/* ==========================================
                  DASHBOARD OVERVIEW TAB (WHITE THEME)
                 ========================================== */}
              {activeMenu === "dashboard" && (
                <div className="space-y-8">
                  
                  {/* 6 EXECUTIVE METRIC CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    {/* Total Customers */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Total Customers</span>
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">152</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+12 new corporate accounts this month</span>
                      </div>
                    </div>

                    {/* Active Email Users */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Active Email Users</span>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                          <Mail className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">1,240</div>
                      <div className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Across Google, Microsoft, Zoho & Titan</span>
                      </div>
                    </div>

                    {/* Pending Orders */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Pending Orders</span>
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                          <Clock className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-amber-600">8</div>
                      <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Awaiting MX/DNS cutover verification</span>
                      </div>
                    </div>

                    {/* Monthly Revenue */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Monthly Revenue</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                          <CreditCard className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-emerald-600">₹1,25,000</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+18.5% YoY recurring MRR</span>
                      </div>
                    </div>

                    {/* Cross-Tenant Split Domains */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Cross-Tenant Hybrid Routes</span>
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                          <Server className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">62</div>
                      <div className="text-[11px] text-indigo-700 font-semibold flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Google + Microsoft hybrid domains</span>
                      </div>
                    </div>

                    {/* Cloud Backup Storage */}
                    <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Backup Cloud Storage</span>
                        <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
                          <HardDrive className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">4.2 TB</div>
                      <div className="text-[11px] text-cyan-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Automated daily snapshot backups</span>
                      </div>
                    </div>

                  </div>

                  {/* PROVIDER DISTRIBUTION & SLA MONITOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Provider License Breakdown Chart Widget */}
                    <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-gray-200 space-y-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-600" />
                            <span>Provider License Distribution</span>
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">Mailbox allocation across official email providers</p>
                        </div>
                        <span className="text-xs font-bold text-gray-500">1,240 Total Mailboxes</span>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                            <span className="text-red-600">Google Workspace</span>
                            <span className="text-gray-700">496 Mailboxes (40%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "40%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                            <span className="text-blue-600">Microsoft 365</span>
                            <span className="text-gray-700">396 Mailboxes (32%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: "32%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                            <span className="text-amber-600">Zoho Mail</span>
                            <span className="text-gray-700">223 Mailboxes (18%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "18%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                            <span className="text-purple-600">Titan Mail & Others</span>
                            <span className="text-gray-700">125 Mailboxes (10%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: "10%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live System Uptime & SLA Monitor */}
                    <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-600" />
                          <span>System & MX SLA Status</span>
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">100% Operational</span>
                      </div>

                      <div className="space-y-3 pt-1 text-xs">
                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-gray-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>MX Cutover Routing Engine</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-700">100% Uptime</span>
                        </div>

                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-gray-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>SPF / DKIM Auth Validator</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-700">Healthy</span>
                        </div>

                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-gray-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Cloud Backup Storage Nodes</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-700">Operational</span>
                        </div>

                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-gray-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Razorpay & UPI Gateway</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-700">Active</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ==========================================
                  RESELLERS PARTNERS MANAGEMENT SECTION
                 ========================================== */}
              {activeMenu === "resellers" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Reseller Partners Management</h2>
                      <p className="text-xs text-gray-500">Create reseller accounts, configure wholesale pricing, track reseller sales & customer growth.</p>
                    </div>

                    <button
                      onClick={() => setIsCreateResellerModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95 self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Reseller Account</span>
                    </button>
                  </div>

                  {/* RESELLER ACCOUNTS TABLE */}
                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Reseller Partner</th>
                          <th className="p-4">Contact & Email</th>
                          <th className="p-4">Active Customers</th>
                          <th className="p-4">Seats Sold</th>
                          <th className="p-4">Wholesale Rate</th>
                          <th className="p-4">Total Sales</th>
                          <th className="p-4">Reseller Profit</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {resellers.map((r) => (
                          <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-indigo-600" />
                              <span>{r.resellerName}</span>
                            </td>
                            <td className="p-4 font-semibold">
                              <div>{r.contactPerson}</div>
                              <div className="text-[11px] font-mono text-gray-500">{r.email}</div>
                            </td>
                            <td className="p-4 font-extrabold text-blue-700">{r.activeCustomers} Clients</td>
                            <td className="p-4 font-extrabold text-gray-900">{r.totalSeatsSold} Mailboxes</td>
                            <td className="p-4 font-bold text-indigo-900">{r.wholesaleRate}</td>
                            <td className="p-4 font-extrabold text-gray-900">{r.totalSales}</td>
                            <td className="p-4 font-black text-emerald-600">{r.earnedProfit}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${r.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => triggerAlert(`Setting wholesale pricing for ${r.resellerName}`)} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-extrabold text-[11px] border border-indigo-200">Set Pricing</button>
                                <button onClick={() => triggerAlert(`Viewing sales reports for ${r.resellerName}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-extrabold text-[11px] border border-gray-200">View Sales</button>
                                <button onClick={() => triggerAlert(`Viewing customers of ${r.resellerName}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-extrabold text-[11px] border border-gray-200">View Customers</button>
                                <button
                                  onClick={() => {
                                    setResellers(resellers.map(item => item.id === r.id ? { ...item, status: item.status === "Active" ? "Suspended" : "Active" } : item));
                                    triggerAlert(`Reseller ${r.resellerName} status updated`);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg font-extrabold text-[11px] ${r.status === "Active" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
                                >
                                  {r.status === "Active" ? "Suspend" : "Activate"}
                                </button>
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
                  1. CUSTOMERS SECTION (WHITE THEME + NAVY GRADIENT BUTTONS)
                 ========================================== */}
              {activeMenu === "customers" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Customers Management</h2>
                      <p className="text-xs text-gray-500">Manage all registered enterprise email customers & filter by provider.</p>
                    </div>

                    {/* NAVY LINEAR GRADIENT BUTTON */}
                    <button
                      onClick={() => triggerAlert("Opening Add New Customer modal...")}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md shadow-blue-950/20 transition-all flex items-center gap-2 active:scale-95 self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Customer</span>
                    </button>
                  </div>

                  {/* FILTER CONTROLS BAR */}
                  <div className="p-4 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      {/* Search Bar */}
                      <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={customerSearchTerm}
                          onChange={(e) => setCustomerSearchTerm(e.target.value)}
                          placeholder="Search company or contact..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>

                      {/* Dropdown Filter */}
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                        <select
                          value={customerProviderFilter}
                          onChange={(e) => setCustomerProviderFilter(e.target.value)}
                          className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-600"
                        >
                          <option value="all">All Providers ({customers.length})</option>
                          <option value="Google Workspace">Google Workspace</option>
                          <option value="Microsoft 365">Microsoft 365</option>
                          <option value="Cross-Tenant Split">Cross-Tenant Split</option>
                          <option value="Zoho Mail">Zoho Mail</option>
                          <option value="Titan Mail">Titan Mail</option>
                        </select>
                      </div>
                    </div>

                    {/* Interactive Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                      {[
                        { id: "all", label: "All Customers" },
                        { id: "Google Workspace", label: "Google Workspace" },
                        { id: "Microsoft 365", label: "Microsoft 365" },
                        { id: "Cross-Tenant Split", label: "Cross-Tenant Split" },
                        { id: "Zoho Mail", label: "Zoho Mail" },
                        { id: "Titan Mail", label: "Titan Mail" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCustomerProviderFilter(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                            customerProviderFilter === item.id
                              ? "bg-[#0B1437] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CUSTOMER DATA TABLE (WHITE THEME) */}
                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Company</th>
                          <th className="p-4">Contact Person</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {customers
                          .filter((c) => {
                            const matchesSearch =
                              c.company.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                              c.contact.toLowerCase().includes(customerSearchTerm.toLowerCase());
                            const matchesProvider =
                              customerProviderFilter === "all" || c.provider === customerProviderFilter;
                            return matchesSearch && matchesProvider;
                          })
                          .map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                                <Building className="w-4 h-4 text-blue-600" />
                                <span>{c.company}</span>
                              </td>
                              <td className="p-4 font-semibold">{c.contact}</td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                  {c.provider}
                                </span>
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                    c.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                                  }`}
                                >
                                  {c.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => triggerAlert(`Viewing customer details for ${c.company}`)} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-[11px] shadow-xs">View</button>
                                  <button onClick={() => triggerAlert(`Editing customer ${c.company}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-extrabold text-[11px] border border-gray-200">Edit</button>
                                  <button onClick={() => triggerAlert(`Customer ${c.company} suspended`)} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-extrabold text-[11px] border border-amber-200">Suspend</button>
                                  <button onClick={() => setCustomers(customers.filter(item => item.id !== c.id))} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-extrabold text-[11px] border border-rose-200">Delete</button>
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
                  2. ORDERS SECTION
                 ========================================== */}
              {activeMenu === "orders" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Orders Management</h2>
                      <p className="text-xs text-gray-500">Every purchase appears here in real-time.</p>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">Plan</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">{o.orderId}</td>
                            <td className="p-4 font-semibold">{o.customer}</td>
                            <td className="p-4">{o.provider}</td>
                            <td className="p-4 font-bold text-blue-700">{o.plan}</td>
                            <td className="p-4 font-extrabold text-emerald-700">{o.amount}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                o.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : o.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => triggerAlert(`Viewing order ${o.orderId}`)} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-[11px]">View</button>
                                <button onClick={() => triggerAlert(`Updated order status for ${o.orderId}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 font-extrabold text-[11px]">Update Status</button>
                                <button onClick={() => setOrders(orders.filter(item => item.id !== o.id))} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-[11px]">Delete</button>
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
                  3. PROVIDERS SECTION
                 ========================================== */}
              {activeMenu === "providers" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Email Providers</h2>
                    <p className="text-xs text-gray-500">Enable, disable, and configure email platform connectors.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers.map((p) => (
                      <div key={p.id} className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="font-extrabold text-gray-900 text-base">{p.name}</div>
                          <button
                            onClick={() => {
                              setProviders(providers.map(item => item.id === p.id ? { ...item, enabled: !item.enabled } : item));
                              triggerAlert(`${p.name} ${!p.enabled ? "Enabled" : "Disabled"}`);
                            }}
                            className="text-2xl"
                          >
                            {p.enabled ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Active Connected Accounts: <strong className="text-gray-900">{p.activeAccounts}</strong></div>
                        <div className="pt-2 flex gap-2">
                          <button onClick={() => triggerAlert(`Editing provider details for ${p.name}`)} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-xs">Edit Information</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================
                  4. PLANS SECTION
                 ========================================== */}
              {activeMenu === "plans" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Manage Subscription Plans</h2>
                      <p className="text-xs text-gray-500">Manage plan pricing & quotas directly from admin without editing code.</p>
                    </div>
                    <button onClick={() => triggerAlert("Opening Add New Plan modal...")} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-xs shadow-md flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((pl) => (
                      <div key={pl.id} className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
                        <div className="text-xs font-extrabold text-blue-700 uppercase">{pl.provider}</div>
                        <div className="text-lg font-black text-gray-900">{pl.planName}</div>
                        <div className="text-2xl font-extrabold text-emerald-700">{pl.price}</div>
                        <div className="text-xs text-gray-500">{pl.storage}</div>
                        <div className="pt-2 flex gap-2">
                          <button onClick={() => triggerAlert(`Editing ${pl.planName}`)} className="w-full py-2 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-xs">Edit Plan</button>
                          <button onClick={() => setPlans(plans.filter(item => item.id !== pl.id))} className="py-2 px-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-xs">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================
                  5. DOMAINS SECTION
                 ========================================== */}
              {activeMenu === "domains" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Domain & DNS Records</h2>
                    <p className="text-xs text-gray-500">Manage customer domain MX, SPF, DKIM, DMARC validation status.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Domain Name</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">MX</th>
                          <th className="p-4">SPF</th>
                          <th className="p-4">DKIM</th>
                          <th className="p-4">DMARC</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {domains.map((d) => (
                          <tr key={d.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">{d.domainName}</td>
                            <td className="p-4">{d.provider}</td>
                            <td className="p-4"><span className="text-emerald-700 font-bold">✓ {d.mx}</span></td>
                            <td className="p-4"><span className="text-emerald-700 font-bold">✓ {d.spf}</span></td>
                            <td className="p-4"><span className="text-emerald-700 font-bold">✓ {d.dkim}</span></td>
                            <td className="p-4"><span className={d.dmarc === "Verified" ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>{d.dmarc}</span></td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => triggerAlert(`Executing DNS verification for ${d.domainName}`)} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-[11px]">Verify</button>
                                <button onClick={() => triggerAlert(`Editing DNS for ${d.domainName}`)} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 font-extrabold text-[11px]">Edit</button>
                                <button onClick={() => setDomains(domains.filter(item => item.id !== d.id))} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-[11px]">Delete</button>
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
                  6. MANAGEMENT SERVICES SECTION
                 ========================================== */}
              {activeMenu === "management" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Management Services Tracking</h2>
                    <p className="text-xs text-gray-500">Track Email Management, Complete Setup, and Admin Panel Setup fulfillment.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Customer</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Assigned Engineer</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Completed Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {managedServices.map((ms) => (
                          <tr key={ms.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">{ms.customer}</td>
                            <td className="p-4 font-bold text-blue-700">{ms.service}</td>
                            <td className="p-4 text-gray-700 font-semibold">{ms.engineer}</td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${ms.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{ms.status}</span></td>
                            <td className="p-4 text-right font-mono text-gray-500">{ms.completedDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==========================================
                  7. EMAIL BACKUP SECTION
                 ========================================== */}
              {activeMenu === "backup" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Email Backup Subscriptions</h2>
                    <p className="text-xs text-gray-500">Track automated daily backups, storage quotas, and renewal dates.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Customer</th>
                          <th className="p-4">Provider</th>
                          <th className="p-4">Backup Enabled</th>
                          <th className="p-4">Storage Used</th>
                          <th className="p-4 text-right">Renewal Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {backups.map((bk) => (
                          <tr key={bk.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">{bk.customer}</td>
                            <td className="p-4">{bk.provider}</td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${bk.enabled ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>{bk.enabled ? "Yes (Active)" : "No"}</span></td>
                            <td className="p-4 font-extrabold text-blue-700">{bk.storageUsed}</td>
                            <td className="p-4 text-right font-mono text-gray-500">{bk.renewalDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ==========================================
                  8. SUPPORT TICKETS SECTION
                 ========================================== */}
              {activeMenu === "tickets" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Support SLA Tickets</h2>
                    <p className="text-xs text-gray-500">Manage customer support tickets, priority SLAs, and engineer replies.</p>
                  </div>

                  <div className="space-y-4">
                    {tickets.map((t) => (
                      <div key={t.id} className="p-6 rounded-3xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-700">{t.ticketNo}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">{t.priority} Priority</span>
                          </div>
                          <div className="text-base font-extrabold text-gray-900">{t.subject}</div>
                          <div className="text-xs text-gray-500">Customer: <strong className="text-gray-800">{t.customer}</strong></div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button onClick={() => triggerAlert(`Replying to ${t.ticketNo}`)} className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 text-white font-extrabold text-xs">Reply</button>
                          <button onClick={() => {
                            setTickets(tickets.map(item => item.id === t.id ? { ...item, status: "Resolved" } : item));
                            triggerAlert(`Ticket ${t.ticketNo} marked Resolved`);
                          }} className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">Mark Resolved</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================
                  9. INVOICES SECTION
                 ========================================== */}
              {activeMenu === "invoices" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Billing Invoices</h2>
                    <p className="text-xs text-gray-500">Download customer PDF tax invoices and track payment statuses.</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                          <th className="p-4">Invoice No</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Download</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900 font-mono">{inv.invoiceNo}</td>
                            <td className="p-4 font-semibold">{inv.customer}</td>
                            <td className="p-4 font-extrabold text-emerald-700">{inv.amount}</td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>{inv.status}</span></td>
                            <td className="p-4 text-right">
                              <button onClick={() => triggerAlert(`Downloading PDF for ${inv.invoiceNo}...`)} className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-[11px] flex items-center gap-1.5 ml-auto">
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
                  10. SETTINGS SECTION (WHITE THEME + NAVY GRADIENT BUTTON)
                 ========================================== */}
              {activeMenu === "settings" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Company & System Settings</h2>
                    <p className="text-xs text-gray-500">Configure business information, support email, SMTP gateway, and payments.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-white border border-gray-200 space-y-5 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={settings.companyName}
                          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Support Email</label>
                        <input
                          type="email"
                          value={settings.supportEmail}
                          onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">SMTP Gateway</label>
                        <input
                          type="text"
                          value={settings.smtpServer}
                          onChange={(e) => setSettings({ ...settings, smtpServer: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Office Address</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Payment Gateway Settings</label>
                      <input
                        type="text"
                        value={settings.paymentGateway}
                        onChange={(e) => setSettings({ ...settings, paymentGateway: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => triggerAlert("Company & System Settings saved successfully!")}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md shadow-blue-950/20 active:scale-95 transition-all"
                      >
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          REDESIGNED PREMIUM CREATE RESELLER WIZARD MODAL
         ========================================== */}
      <AnimatePresence>
        {isCreateResellerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl max-w-5xl lg:max-w-6xl w-full h-[88vh] min-h-[620px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* --- LEFT STEPPER SIDEBAR (NAVY THEME) --- */}
              <div className="w-full md:w-72 bg-[#0B1437] text-white p-7 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
                <div className="space-y-6">
                  
                  {/* Modal Header Badge */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Reseller Provisioning</span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug">New Reseller Partner</h3>
                  </div>

                  {/* Vertical Stepper Steps List */}
                  <div className="space-y-2 text-xs font-bold">
                    {[
                      { id: "basic", step: "01", label: "Basic Contact", icon: Building },
                      { id: "business", step: "02", label: "Business Tax Info", icon: Briefcase },
                      { id: "account", step: "03", label: "Account & Credit", icon: CreditCard },
                      { id: "pricing", step: "04", label: "Wholesale Pricing", icon: Percent },
                      { id: "providers", step: "05", label: "Provider Perms", icon: Server },
                      { id: "services", step: "06", label: "Service Perms", icon: Zap },
                    ].map((st) => {
                      const Icon = st.icon;
                      const isActive = resellerModalTab === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setResellerModalTab(st.id as any)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                              : "text-slate-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isActive ? "bg-white text-indigo-900" : "bg-slate-800 text-slate-300"
                          }`}>
                            {st.step}
                          </div>
                          <span className="truncate">{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Footer Info */}
                <div className="hidden md:block pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-bold text-slate-300">Preset Wholesale Tier</div>
                  <div>Automated account creation and billing entitlement</div>
                </div>
              </div>

              {/* --- RIGHT FORM CONTENT AREA --- */}
              <div className="flex-1 flex flex-col min-w-0 bg-white p-6 sm:p-8 justify-between overflow-y-auto">
                
                <form onSubmit={handleCreateReseller} className="space-y-6 text-xs font-semibold flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Header bar with close button */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                      <div>
                        <h4 className="text-lg font-black text-gray-900">
                          {resellerModalTab === "basic" && "1. Basic Contact & Login Details"}
                          {resellerModalTab === "business" && "2. Business Tax & Legal Information"}
                          {resellerModalTab === "account" && "3. Account Tier & Credit Settings"}
                          {resellerModalTab === "pricing" && "4. Custom Wholesale Pricing Agreement"}
                          {resellerModalTab === "providers" && "5. Authorized Provider Permissions"}
                          {resellerModalTab === "services" && "6. Authorized Service Entitlements"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Fill out the details to provision this partner account
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCreateResellerModalOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center font-bold shrink-0"
                      >
                        ✕
                      </button>
                    </div>

                    {/* --- STEP 1: BASIC CONTACT & ADDRESS --- */}
                    {resellerModalTab === "basic" && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Company Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Cloud Solutions"
                              value={newResellerData.companyName}
                              onChange={(e) => setNewResellerData({ ...newResellerData, companyName: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Contact Person *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Vikram Malhotra"
                              value={newResellerData.contactPerson}
                              onChange={(e) => setNewResellerData({ ...newResellerData, contactPerson: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="reseller@apexcloud.in"
                              value={newResellerData.email}
                              onChange={(e) => setNewResellerData({ ...newResellerData, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Password *</label>
                            <input
                              type="text"
                              required
                              placeholder="Reseller@12345"
                              value={newResellerData.password}
                              onChange={(e) => setNewResellerData({ ...newResellerData, password: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Mobile Number *</label>
                            <input
                              type="text"
                              required
                              placeholder="+91 99887 76655"
                              value={newResellerData.mobileNumber}
                              onChange={(e) => setNewResellerData({ ...newResellerData, mobileNumber: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Country *</label>
                            <input
                              type="text"
                              required
                              value={newResellerData.country}
                              onChange={(e) => setNewResellerData({ ...newResellerData, country: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">State</label>
                            <input
                              type="text"
                              placeholder="e.g. Haryana"
                              value={newResellerData.state}
                              onChange={(e) => setNewResellerData({ ...newResellerData, state: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              placeholder="e.g. Gurugram"
                              value={newResellerData.city}
                              onChange={(e) => setNewResellerData({ ...newResellerData, city: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            placeholder="e.g. DLF Cyber City, Tower 8B"
                            value={newResellerData.address}
                            onChange={(e) => setNewResellerData({ ...newResellerData, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* --- STEP 2: BUSINESS TAX INFORMATION --- */}
                    {resellerModalTab === "business" && (
                      <div className="space-y-4 animate-fadeIn">
                        <p className="text-xs text-gray-500 mb-2">Tax and corporate registration details for billing compliance.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">GST Number</label>
                            <input
                              type="text"
                              placeholder="07AAAAA0000A1Z5"
                              value={newResellerData.gstNumber}
                              onChange={(e) => setNewResellerData({ ...newResellerData, gstNumber: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">PAN Number</label>
                            <input
                              type="text"
                              placeholder="ABCDE1234F"
                              value={newResellerData.panNumber}
                              onChange={(e) => setNewResellerData({ ...newResellerData, panNumber: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Company Reg No.</label>
                            <input
                              type="text"
                              placeholder="U72200HR2022PTC101"
                              value={newResellerData.companyRegNo}
                              onChange={(e) => setNewResellerData({ ...newResellerData, companyRegNo: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 3: ACCOUNT & CREDIT SETTINGS --- */}
                    {resellerModalTab === "account" && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Reseller ID</label>
                            <input
                              type="text"
                              readOnly
                              value={newResellerData.resellerId}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200 text-xs font-bold text-indigo-700 font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Status</label>
                            <select
                              value={newResellerData.status}
                              onChange={(e) => setNewResellerData({ ...newResellerData, status: e.target.value as any })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none"
                            >
                              <option value="Active">Active</option>
                              <option value="Suspended">Suspended</option>
                              <option value="Pending Verification">Pending Verification</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Account Type</label>
                            <select
                              value={newResellerData.accountType}
                              onChange={(e) => setNewResellerData({ ...newResellerData, accountType: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none"
                            >
                              <option value="Gold Partner">Gold Partner Tier</option>
                              <option value="Silver Partner">Silver Partner Tier</option>
                              <option value="Platinum Partner">Platinum Partner Tier</option>
                              <option value="Standard">Standard Tier</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Credit Limit (₹)</label>
                            <input
                              type="number"
                              placeholder="50000"
                              value={newResellerData.creditLimit}
                              onChange={(e) => setNewResellerData({ ...newResellerData, creditLimit: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Global Discount (%)</label>
                            <input
                              type="number"
                              placeholder="15"
                              value={newResellerData.discountPercent}
                              onChange={(e) => setNewResellerData({ ...newResellerData, discountPercent: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">Internal Admin Notes</label>
                          <textarea
                            rows={3}
                            placeholder="Internal notes about agreement terms..."
                            value={newResellerData.notes}
                            onChange={(e) => setNewResellerData({ ...newResellerData, notes: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900"
                          />
                        </div>
                      </div>
                    )}

                    {/* --- STEP 4: CUSTOM WHOLESALE PRICING --- */}
                    {resellerModalTab === "pricing" && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                          <strong>Custom Wholesale Rates:</strong> Set customized wholesale rates for this specific reseller.
                        </div>

                        <div className="space-y-3">
                          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                            <div>
                              <div className="font-extrabold text-gray-900">Google Workspace</div>
                              <div className="text-[11px] text-gray-500 font-semibold">Business Starter Plan</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 font-bold">₹</span>
                              <input
                                type="number"
                                value={newResellerData.pricing.googleStarter}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  pricing: { ...newResellerData.pricing, googleStarter: e.target.value }
                                })}
                                className="w-24 px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:outline-none"
                              />
                              <span className="text-[11px] text-gray-500 font-bold">/ user / mo</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                            <div>
                              <div className="font-extrabold text-gray-900">Microsoft 365</div>
                              <div className="text-[11px] text-gray-500 font-semibold">Business Basic Plan</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 font-bold">₹</span>
                              <input
                                type="number"
                                value={newResellerData.pricing.microsoftBasic}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  pricing: { ...newResellerData.pricing, microsoftBasic: e.target.value }
                                })}
                                className="w-24 px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:outline-none"
                              />
                              <span className="text-[11px] text-gray-500 font-bold">/ user / mo</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                            <div>
                              <div className="font-extrabold text-gray-900">Zoho Mail</div>
                              <div className="text-[11px] text-gray-500 font-semibold">Workplace Standard Plan</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 font-bold">₹</span>
                              <input
                                type="number"
                                value={newResellerData.pricing.zohoWorkplace}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  pricing: { ...newResellerData.pricing, zohoWorkplace: e.target.value }
                                })}
                                className="w-24 px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:outline-none"
                              />
                              <span className="text-[11px] text-gray-500 font-bold">/ user / mo</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                            <div>
                              <div className="font-extrabold text-gray-900">Titan Mail</div>
                              <div className="text-[11px] text-gray-500 font-semibold">Business Lite Plan</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 font-bold">₹</span>
                              <input
                                type="number"
                                value={newResellerData.pricing.titanLite}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  pricing: { ...newResellerData.pricing, titanLite: e.target.value }
                                })}
                                className="w-24 px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:outline-none"
                              />
                              <span className="text-[11px] text-gray-500 font-bold">/ user / mo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 5: PROVIDER PERMISSIONS --- */}
                    {resellerModalTab === "providers" && (
                      <div className="space-y-4 animate-fadeIn">
                        <p className="text-xs text-gray-500">Choose which official email providers this reseller is authorized to sell.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { key: "googleWorkspace", label: "Google Workspace" },
                            { key: "microsoft365", label: "Microsoft 365" },
                            { key: "zohoMail", label: "Zoho Mail" },
                            { key: "titanMail", label: "Titan Mail" },
                            { key: "rediffmail", label: "Rediffmail Pro" },
                          ].map((item) => (
                            <label key={item.key} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                              <span className="font-bold text-gray-900">{item.label}</span>
                              <input
                                type="checkbox"
                                checked={(newResellerData.providerPermissions as any)[item.key]}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  providerPermissions: {
                                    ...newResellerData.providerPermissions,
                                    [item.key]: e.target.checked
                                  }
                                })}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* --- STEP 6: SERVICE PERMISSIONS --- */}
                    {resellerModalTab === "services" && (
                      <div className="space-y-4 animate-fadeIn">
                        <p className="text-xs text-gray-500">Choose which value-added services this reseller can offer to clients.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { key: "businessEmail", label: "Business Email Seats" },
                            { key: "emailMigration", label: "Email Migration Services" },
                            { key: "emailBackup", label: "Email Backup & Archiving" },
                            { key: "hybridSolutions", label: "Hybrid Solutions (Cross-Tenant)" },
                            { key: "domainRegistration", label: "Domain Registration" },
                            { key: "managementServices", label: "Management Services" },
                          ].map((item) => (
                            <label key={item.key} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                              <span className="font-bold text-gray-900">{item.label}</span>
                              <input
                                type="checkbox"
                                checked={(newResellerData.servicePermissions as any)[item.key]}
                                onChange={(e) => setNewResellerData({
                                  ...newResellerData,
                                  servicePermissions: {
                                    ...newResellerData.servicePermissions,
                                    [item.key]: e.target.checked
                                  }
                                })}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Step Navigation Controls Footer */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      {resellerModalTab !== "basic" && (
                        <button
                          type="button"
                          onClick={() => {
                            const steps = ["basic", "business", "account", "pricing", "providers", "services"];
                            const currentIdx = steps.indexOf(resellerModalTab);
                            if (currentIdx > 0) setResellerModalTab(steps[currentIdx - 1] as any);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-extrabold text-xs hover:bg-gray-200 transition-colors"
                        >
                          ← Previous
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {resellerModalTab !== "services" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const steps = ["basic", "business", "account", "pricing", "providers", "services"];
                            const currentIdx = steps.indexOf(resellerModalTab);
                            if (currentIdx < steps.length - 1) setResellerModalTab(steps[currentIdx + 1] as any);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold text-xs hover:bg-slate-900 transition-colors"
                        >
                          Next Step →
                        </button>
                      ) : null}

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all"
                      >
                        Create Reseller Account
                      </button>
                    </div>
                  </div>

                </form>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
