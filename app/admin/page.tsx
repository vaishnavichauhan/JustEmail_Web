"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ReceiptText,
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
  Percent,
  Inbox,
  RotateCw,
  X,
  Building2,
  Receipt,
  Settings,
  Home
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

// Provider Badges Highlight Options
const providerBadges = [
  { id: 1, title: "New" },
  { id: 2, title: "Most Popular" },
  { id: 3, title: "Recommended" },
  { id: 4, title: "Fast Setup" },
  { id: 5, title: "Business Ready" },
  { id: 6, title: "Secure" },
  { id: 7, title: "High Performance" },
  { id: 8, title: "Global Choice" },
  { id: 9, title: "Top Rated" },
  { id: 10, title: "Premium" },
  { id: 11, title: "Best Seller" },
  { id: 12, title: "Best Value" },
  { id: 13, title: "Enterprise Grade" },
  { id: 14, title: "Trusted" },
  { id: 15, title: "Scalable" },
];

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

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let isMounted = true;
    async function checkAdminAuth() {
      try {
        setCheckingAuth(true);
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user && (data.user.role === "admin" || data.user.email === "admin@justemails.in")) {
            if (isMounted) {
              setIsAdminLoggedIn(true);
              useAuthStore.getState().login(data.user);
            }
          } else {
            if (isMounted) setIsAdminLoggedIn(false);
          }
        } else {
          if (isMounted) setIsAdminLoggedIn(false);
        }
      } catch (err) {
        if (isMounted) setIsAdminLoggedIn(false);
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    }
    checkAdminAuth();
    return () => {
      isMounted = false;
    };
  }, []);

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
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  // Enquiries State & Fetch Logic
  const [enquiriesList, setEnquiriesList] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState<boolean>(false);
  const [enquirySearchQuery, setEnquirySearchQuery] = useState("");
  const [selectedEnquiryModal, setSelectedEnquiryModal] = useState<any | null>(null);


  const adminDashboardData = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "enquiries", label: "Business Enquiries", icon: Inbox, badge: enquiriesList.length },
    { id: "providers", label: "Providers", icon: Server },
    { id: "settings", label: "Setting", icon: SettingsIcon }
  ]
  const fetchEnquiries = async () => {
    try {
      setLoadingEnquiries(true);
      const res = await fetch("/api/enquiry");
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setEnquiriesList(data.data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleUpdateEnquiryStatus = async (id: any, newStatus: string) => {
    setEnquiriesList((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) || String(item.enquiry_id) === String(id)
          ? { ...item, status: newStatus }
          : item
      )
    );

    try {
      const res = await fetch("/api/enquiry", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        triggerAlert(`Enquiry marked as "${newStatus}"!`);
      } else {
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
      fetchEnquiries();
    }
  };

  // Delete Confirmation Modal State
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const openDeleteModal = (title: string, description: string, onConfirm: () => void) => {
    setDeleteModalState({
      isOpen: true,
      title,
      description,
      onConfirm,
    });
  };

  const handleDeleteEnquiry = (enq: any) => {
    const id = typeof enq === "object" ? enq?.enquiry_id || enq?.id : enq;
    if (!id) return;

    const targetEnq = typeof enq === "object" ? enq : enquiriesList.find((e) => String(e.id) === String(id) || String(e.enquiry_id) === String(id));
    const name = targetEnq?.organization_name
      ? `${targetEnq.organization_name} (${targetEnq.first_name || ""} ${targetEnq.last_name || ""})`.trim()
      : `Enquiry #${id}`;

    openDeleteModal(
      "Delete Business Enquiry",
      `Are you sure you want to permanently delete the enquiry record for "${name}"? This action cannot be undone.`,
      async () => {
        try {
          const res = await fetch(`/api/enquiry?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
          });

          if (res.ok) {
            setEnquiriesList((prev) => prev.filter((e) => String(e.id) !== String(id) && String(e.enquiry_id) !== String(id)));
            if (selectedEnquiryModal && (String(selectedEnquiryModal.id) === String(id) || String(selectedEnquiryModal.enquiry_id) === String(id))) {
              setSelectedEnquiryModal(null);
            }
            triggerAlert("Enquiry deleted successfully!");
          } else {
            const data = await res.json();
            triggerAlert(data.error || "Failed to delete enquiry.");
          }
        } catch (err) {
          console.error("Delete enquiry error:", err);
          triggerAlert("Error occurred while deleting enquiry.");
        }
      }
    );
  };

  // Provider Management State & Functions
  const [adminProvidersList, setAdminProvidersList] = useState<any[]>([]);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);
  const [providerPriceError, setProviderPriceError] = useState<string>("");
  const [teamsOption, setTeamsOption] = useState<string>("With Teams");

  // Provider Filtering State
  const [providerFilterName, setProviderFilterName] = useState<string>("all");
  const [providerFilterHome, setProviderFilterHome] = useState<string>("all");
  const [providerSearchQuery, setProviderSearchQuery] = useState<string>("");

  const filteredProviders = adminProvidersList.filter((p) => {
    if (providerFilterName !== "all") {
      const pName = (p.name || "").toLowerCase();
      const pLogo = (p.logoType || "").toLowerCase();
      if (!pName.includes(providerFilterName) && !pLogo.includes(providerFilterName)) {
        return false;
      }
    }

    if (providerFilterHome === "home_on") {
      if (p.showOnHome === false) return false;
    } else if (providerFilterHome === "home_off") {
      if (p.showOnHome !== false) return false;
    }

    if (providerSearchQuery.trim()) {
      const q = providerSearchQuery.toLowerCase();
      const match =
        p.name?.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.price?.toLowerCase().includes(q) ||
        p.badge?.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const [providerFormData, setProviderFormData] = useState({
    id: "",
    name: "",
    subtitle: "",
    badge: "New",
    price: "₹136",
    period: "/ user / month",
    billingNote: "Billed annually",
    storage: "30 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "1 - 300 Users",
    logoType: "google",
    showOnHome: true,
    featuresText: "",
  });

  const fetchAdminProviders = async () => {
    try {
      setLoadingProviders(true);
      const res = await fetch("/api/providers");
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          const latestFirst = data?.data;
          setAdminProvidersList(latestFirst);
        }
      }
    } catch (err) {
      console.error("Failed to fetch admin providers:", err);
    } finally {
      setLoadingProviders(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    fetchAdminProviders();
  }, []);

  const [newFeatureInput, setNewFeatureInput] = useState("");

  const handleAddFeaturePoint = () => {
    if (!newFeatureInput.trim()) return;
    const currentList = providerFormData.featuresText
      ? providerFormData.featuresText.split("\n").map(s => s.trim()).filter(Boolean)
      : [];
    currentList.push(newFeatureInput.trim());
    setProviderFormData({
      ...providerFormData,
      featuresText: currentList.join("\n")
    });
    setNewFeatureInput("");
  };

  const handleRemoveFeaturePoint = (indexToRemove: number) => {
    const currentList = providerFormData.featuresText
      ? providerFormData.featuresText.split("\n").map(s => s.trim()).filter(Boolean)
      : [];
    const updatedList = currentList.filter((_, idx) => idx !== indexToRemove);
    setProviderFormData({
      ...providerFormData,
      featuresText: updatedList.join("\n")
    });
  };

  const handleOpenAddProviderModal = () => {
    setEditingProviderId(null);
    setNewFeatureInput("");
    setProviderPriceError("");
    setTeamsOption("With Teams");
    setProviderFormData({
      id: "",
      name: "Google Workspace",
      subtitle: "Base Plan",
      badge: "New",
      price: "",
      period: "/ user / month",
      billingNote: "Billed annually",
      storage: "",
      uptime: "99.9% SLA",
      recommendedUsers: "1 - 300 Users",
      logoType: "google",
      showOnHome: true,
      featuresText: "",
    });
    setIsProviderModalOpen(true);
  };

  const handleOpenEditProviderModal = (p: any) => {
    setEditingProviderId(p.id);
    setNewFeatureInput("");
    setProviderPriceError("");
    const numericPriceOnly = p.price ? String(p.price).replace(/[^\d.]/g, "") : "136";
    const numericStorageOnly = p.storage ? String(p.storage).replace(/[^\d]/g, "") : "30";

    const isWithoutTeams = (p.subtitle || "").toLowerCase().includes("without teams") || p.teamsOption === "Without Teams";
    setTeamsOption(isWithoutTeams ? "Without Teams" : "With Teams");

    const cleanSubtitle = (p.subtitle || "")
      .replace(/\s*\((With|Without)\s*Teams\)/gi, "")
      .trim();

    setProviderFormData({
      id: p.id || "",
      name: p.name || "Google Workspace",
      subtitle: cleanSubtitle || p.subtitle || "Base Plan",
      badge: p.badge || "",
      price: numericPriceOnly,
      period: p.period || "/ user / month",
      billingNote: p.billingNote || "Billed annually",
      storage: numericStorageOnly,
      uptime: p.uptime || "99.9% SLA",
      recommendedUsers: p.recommendedUsers || "1 - 300 Users",
      logoType: p.logoType || "google",
      showOnHome: p.showOnHome !== false,
      featuresText: Array.isArray(p.features) ? p.features.join("\n") : typeof p.features === "string" ? p.features : "",
    });
    setIsProviderModalOpen(true);
  };

  const handleSaveProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerFormData.name) {
      triggerAlert("Please select a provider name.");
      return;
    }

    const rawNumericPrice = providerFormData.price ? String(providerFormData.price).trim() : "";
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const numericPriceVal = parseFloat(rawNumericPrice);

    if (!rawNumericPrice || !priceRegex.test(rawNumericPrice) || isNaN(numericPriceVal)) {
      const errMsg = "Please enter a valid numeric price.";
      setProviderPriceError(errMsg);
      return;
    }

    if (numericPriceVal < 1) {
      const errMsg = "Price cannot be less than ₹1.";
      setProviderPriceError(errMsg);
      return;
    }

    setProviderPriceError("");

    const formattedPrice = `₹${rawNumericPrice}`;

    const rawNumericStorage = providerFormData.storage.replace(/[^\d]/g, "") || "10";
    const formattedStorage = `${rawNumericStorage} GB Storage`;

    const featuresArray = providerFormData.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const isMicrosoft = providerFormData.name.includes("Microsoft") || providerFormData.logoType === "microsoft";
    const cleanSub = providerFormData.subtitle
      .replace(/\s*\((With|Without)\s*Teams\)/gi, "")
      .trim();
    const finalSubtitle = isMicrosoft
      ? `${cleanSub || "Business Basic"} (${teamsOption})`
      : providerFormData.subtitle;

    const payload = {
      id: providerFormData.id || "",
      name: providerFormData.name,
      subtitle: finalSubtitle,
      teamsOption: isMicrosoft ? teamsOption : undefined,
      badge: providerFormData.badge,
      price: formattedPrice,
      period: providerFormData.period,
      billingNote: providerFormData.billingNote,
      storage: formattedStorage,
      uptime: providerFormData.uptime,
      recommendedUsers: providerFormData.recommendedUsers || "1 - 300 Users",
      logoType: providerFormData.logoType,
      features: featuresArray,
      enabled: true,
      showOnHome: providerFormData.showOnHome,
    };

    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerAlert(`Provider "${providerFormData.name}" saved successfully!`);
        setIsProviderModalOpen(false);
        fetchAdminProviders();
      } else {
        triggerAlert("Failed to save provider.");
      }
    } catch (err) {
      console.error(err);
      triggerAlert("Error saving provider to database.");
    }
  };

  const handleToggleProviderStatus = async (p: any) => {
    try {
      const updatedStatus = !p.enabled;
      const res = await fetch("/api/providers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, enabled: updatedStatus }),
      });
      if (res.ok) {
        triggerAlert(`${p.name} ${updatedStatus ? "Enabled" : "Disabled"}`);
        fetchAdminProviders();
      }
    } catch (err) {
      triggerAlert("Error updating provider status.");
    }
  };

  const handleToggleHomeStatus = async (p: any) => {
    try {
      const updatedHomeStatus = p.showOnHome === false ? true : false;
      const res = await fetch("/api/providers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, showOnHome: updatedHomeStatus }),
      });
      if (res.ok) {
        triggerAlert(`Plan "${p.name} - ${p.subtitle}" ${updatedHomeStatus ? "will show on Homepage" : "hidden from Homepage"}`);
        fetchAdminProviders();
      }
    } catch (err) {
      triggerAlert("Error updating Homepage visibility.");
    }
  };

  const handleDeleteProviderItem = (id: string, name: string) => {
    openDeleteModal(
      "Delete Provider Plan",
      `Are you sure you want to permanently delete provider "${name}"? This action cannot be undone.`,
      async () => {
        try {
          const res = await fetch(`/api/providers?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            triggerAlert(`Provider ${name} deleted.`);
            fetchAdminProviders();
          }
        } catch (err) {
          triggerAlert("Failed to delete provider.");
        }
      }
    );
  };

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
      titanLite: "65",
    },

    // 5. Provider Permissions
    providerPermissions: {
      googleWorkspace: true,
      microsoft365: true,
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
      pricing: { googleStarter: "150", microsoftBasic: "120", titanLite: "65" },
      providerPermissions: { googleWorkspace: true, microsoft365: true, titanMail: false, rediffmail: false },
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
    { id: "5", company: "Apex Digital", contact: "Vikram Mehta", provider: "Rediffmail Pro", status: "Active" },
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
    { id: "4", name: "Titan Mail", logo: "/images/titan-mail.png", enabled: true, activeAccounts: 110 },
    { id: "5", name: "Rediffmail Pro", logo: "/images/rediff-mail.png", enabled: true, activeAccounts: 50 },
  ]);

  const [plans, setPlans] = useState<PlanRecord[]>([
    { id: "1", provider: "Google Workspace", planName: "Business Starter", price: "₹160/mo", storage: "30 GB Cloud Storage" },
    { id: "2", provider: "Microsoft 365", planName: "Business Basic", price: "₹145/mo", storage: "50 GB Mailbox + 1 TB OneDrive" },
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
    supportEmail: "info@justemail.in",
    phone: "9824466017",
    whatsapp: "9824466017",
    address: "Vadodara, Gujarat, India",
    smtpServer: "smtp.justemail.in:587",
    paymentGateway: "Razorpay / UPI Live Enabled",
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (adminId.trim().toLowerCase() !== MANUAL_ADMIN_ID.toLowerCase() || adminPass !== MANUAL_ADMIN_PASS) {
      setErrorMsg("Invalid Admin ID or Password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminId.trim(), password: adminPass }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          useAuthStore.getState().login(data.user);
        }
        setIsAdminLoggedIn(true);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || err.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setErrorMsg("Failed to authenticate with server.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    authLogout();
    setIsAdminLoggedIn(false);
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 selection:bg-blue-600 selection:text-white font-sans flex">
      {checkingAuth ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0B1437] to-slate-950 text-white space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <Image
              src="/images/logo1.svg"
              alt="Justemail Logo"
              width={28}
              height={28}
              className="absolute w-7 h-7 object-contain opacity-90"
            />
          </div>
          <div className="text-sm font-extrabold text-slate-200 tracking-wide">
            Loading Admin Control Panel...
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Verifying Admin Session
          </div>
        </div>
      ) : !isAdminLoggedIn ? (
        // ==========================================
        // LOGIN SCREEN (LIGHT THEME + NAVY GRADIENT BUTTON)
        // ==========================================
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 relative overflow-hidden">
          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block bg-white px-5 py-2.5 rounded-2xl shadow-xl hover:scale-105 transition-transform border border-gray-200">
                <Image
                  src="/images/logo1.svg"
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
                    src="/images/logo1.svg"
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
                {adminDashboardData.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id as any)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white text-blue-700" : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          }`}>
                          {item.badge}
                        </span>
                      )}
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

                    {/* Business Enquiries Metric Card */}
                    <div
                      onClick={() => setActiveMenu("enquiries")}
                      className="p-6 rounded-3xl bg-white border border-gray-200 space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-extrabold uppercase tracking-wider">Business Enquiries</span>
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                          <Inbox className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-gray-900">{enquiriesList.length}</div>
                      <div className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>View custom corporate requests</span>
                      </div>
                    </div>

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
                        <span>Across Google, Microsoft & Titan</span>
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
                            <span className="text-amber-600">Rediffmail Pro</span>
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
                  BUSINESS ENQUIRIES SECTION
                 ========================================== */}
              {activeMenu === "enquiries" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Inbox className="w-6 h-6 text-indigo-600" />
                        <span>Business Email Enquiries</span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        View and manage custom corporate email requests, domain queries, and bulk licensing enquiries submitted by customers.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={fetchEnquiries}
                        disabled={loadingEnquiries}
                        className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${loadingEnquiries ? "animate-spin text-blue-600" : ""}`} />
                        <span>Refresh List</span>
                      </button>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={enquirySearchQuery}
                          onChange={(e) => setEnquirySearchQuery(e.target.value)}
                          placeholder="Search name, email, phone..."
                          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 24*7 Official Support Details Banner */}
                  <div className="bg-gradient-to-r from-[#0B1437] via-[#14214D] to-blue-900 p-4 rounded-2xl text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm flex items-center gap-2">
                          <span>Official Admin Support Details</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 uppercase">24/7 Support Active</span>
                        </div>
                        <p className="text-[11px] text-gray-300">Official contact info attached for client enquiry follow-ups & customer service</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a href="mailto:info@justemail.in" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-1.5 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-blue-300" />
                        <span>info@justemail.in</span>
                      </a>
                      <a href="tel:9824466017" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-1.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>9824466017</span>
                      </a>
                      <a href="https://wa.me/919824466017" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm transition-colors">
                        <span>💬 WhatsApp: 9824466017</span>
                      </a>
                    </div>
                  </div>

                  {/* ENQUIRIES DATA TABLE */}
                  <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                    {loadingEnquiries ? (
                      <div className="p-12 text-center text-xs font-bold text-gray-500 flex items-center justify-center gap-2">
                        <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Loading Business Enquiries...</span>
                      </div>
                    ) : enquiriesList.length === 0 ? (
                      <div className="p-12 text-center text-xs text-gray-500 font-medium space-y-2">
                        <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
                        <div className="font-extrabold text-gray-900 text-sm">No Enquiries Found</div>
                        <p>When customers submit the Enquiry Form, their submissions will appear here in real time.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                              <th className="p-4">Ref ID</th>
                              <th className="p-4">Organization & Domain</th>
                              <th className="p-4">Contact Person</th>
                              <th className="p-4">Email Addresses</th>
                              <th className="p-4">Phone Number</th>
                              <th className="p-4">Provider / Plan</th>
                              <th className="p-4">Submitted At</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                            {enquiriesList
                              .filter((e) => {
                                if (!enquirySearchQuery) return true;
                                const q = enquirySearchQuery.toLowerCase();
                                return (
                                  e.organization_name?.toLowerCase().includes(q) ||
                                  e.domain?.toLowerCase().includes(q) ||
                                  e.first_name?.toLowerCase().includes(q) ||
                                  e.last_name?.toLowerCase().includes(q) ||
                                  e.email?.toLowerCase().includes(q) ||
                                  e.phone_number?.toLowerCase().includes(q) ||
                                  e.enquiry_id?.toLowerCase().includes(q)
                                );
                              })
                              .map((enq) => (
                                <tr key={enq.id || enq.enquiry_id} className="hover:bg-gray-50 transition-colors">
                                  <td className="p-4 font-extrabold text-blue-700 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 font-mono text-[11px]">
                                      {enq.enquiry_id || `ENQ-${enq.id}`}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <div className="font-extrabold text-gray-900">{enq.organization_name}</div>
                                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1 mt-0.5">
                                      <Globe className="w-3 h-3 text-blue-500" />
                                      <span>{enq.domain}</span>
                                    </div>
                                  </td>
                                  <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                                    {enq.first_name} {enq.last_name}
                                  </td>
                                  <td className="p-4">
                                    <div className="font-semibold text-gray-900">{enq.email}</div>
                                    {enq.alternative_email && (
                                      <div className="text-[10px] text-gray-400 font-medium">Alt: {enq.alternative_email}</div>
                                    )}
                                  </td>
                                  <td className="p-4 font-mono font-bold text-gray-900 whitespace-nowrap">
                                    {enq.phone_number?.startsWith("+91") ? enq.phone_number : `+91 ${enq.phone_number}`}
                                  </td>
                                  <td className="p-4 whitespace-nowrap">
                                    {enq.provider || enq.plan ? (
                                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                                        {enq.provider || enq.plan}
                                      </span>
                                    ) : (
                                      <span className="text-gray-400 text-[11px]">General Enquiry</span>
                                    )}
                                  </td>
                                  <td className="p-4 text-gray-500 text-[11px] whitespace-nowrap">
                                    {enq.created_at ? new Date(enq.created_at).toLocaleString() : "Recently"}
                                  </td>
                                  <td className="p-4 whitespace-nowrap">
                                    {enq.status === "Done" || enq.status === "done" ? (
                                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>Done</span>
                                      </span>
                                    ) : (
                                      <select
                                        value={enq.status || "Pending"}
                                        onChange={(e) => handleUpdateEnquiryStatus(enq.enquiry_id || enq.id, e.target.value)}
                                        className="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold focus:outline-none focus:border-amber-400 cursor-pointer shadow-2xs"
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                      </select>
                                    )}
                                  </td>
                                  <td className="p-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => setSelectedEnquiryModal(enq)}
                                        className="px-3 py-1.5 rounded-lg bg-[#0B1437] hover:bg-black text-white text-[11px] font-extrabold shadow-xs transition-all active:scale-95"
                                      >
                                        View Details
                                      </button>
                                      <button
                                        onClick={() => handleDeleteEnquiry(enq)}
                                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all active:scale-95 flex items-center justify-center shrink-0"
                                        title="Delete Business Enquiry"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* ==========================================
                  3. PROVIDERS SECTION
                 ========================================== */}
              {activeMenu === "providers" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Email Providers</h2>
                      <p className="text-xs text-gray-500">Configure email platform connectors and provider cards displayed on the client website.</p>
                    </div>

                    <button
                      onClick={handleOpenAddProviderModal}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95 self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Provider</span>
                    </button>
                  </div>

                  {/* PROVIDERS FILTER BAR */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={providerSearchQuery}
                        onChange={(e) => setProviderSearchQuery(e.target.value)}
                        placeholder="Search plan name, subtitle..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 shadow-2xs"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      {/* Provider Name Filter */}
                      <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                        <span className="text-[11px] font-extrabold text-gray-500 uppercase whitespace-nowrap">Provider:</span>
                        <select
                          value={providerFilterName}
                          onChange={(e) => setProviderFilterName(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                        >
                          <option value="all">All Providers ({adminProvidersList.length})</option>
                          <option value="google">Google Workspace</option>
                          <option value="microsoft">Microsoft 365</option>
                          <option value="rediff">Rediffmail Pro</option>
                          <option value="titan">Titan Mail</option>
                        </select>
                      </div>

                      {/* Homepage Display Status Filter */}
                      <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                        <span className="text-[11px] font-extrabold text-gray-500 uppercase whitespace-nowrap">Homepage:</span>
                        <select
                          value={providerFilterHome}
                          onChange={(e) => setProviderFilterHome(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                        >
                          <option value="all">All Visibility</option>
                          <option value="home_on">Homepage: ON (Displayed)</option>
                          <option value="home_off">Homepage: OFF (Hidden)</option>
                        </select>
                      </div>

                      {(providerFilterName !== "all" || providerFilterHome !== "all" || providerSearchQuery) && (
                        <button
                          onClick={() => {
                            setProviderFilterName("all");
                            setProviderFilterHome("all");
                            setProviderSearchQuery("");
                          }}
                          className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold border border-rose-200 transition-colors text-xs"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </div>

                  {loadingProviders ? (
                    <div className="p-12 text-center text-xs font-bold text-gray-500 flex items-center justify-center gap-2">
                      <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Loading Email Providers...</span>
                    </div>
                  ) : adminProvidersList.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-gray-200 rounded-3xl shadow-sm space-y-4 max-w-xl mx-auto my-6">
                      <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                      <div className="text-xl text-gray-900 font-extrabold">Please create plan</div>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        No provider plans exist in the system yet. Click the button below to add and configure your first email plan.
                      </p>
                      <button
                        onClick={handleOpenAddProviderModal}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md inline-flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create First Plan</span>
                      </button>
                    </div>
                  ) : filteredProviders.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-gray-200 rounded-3xl shadow-sm space-y-3 max-w-xl mx-auto my-4">
                      <Filter className="w-10 h-10 text-gray-400 mx-auto" />
                      <div className="text-lg text-gray-900 font-extrabold">No Providers Match Your Filter</div>
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        No provider plans matched the selected provider name or homepage visibility filter.
                      </p>
                      <button
                        onClick={() => {
                          setProviderFilterName("all");
                          setProviderFilterHome("all");
                          setProviderSearchQuery("");
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-xs"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProviders.map((p) => (
                        <div key={p.id} className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm relative flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                                  {p.badge || "Official Provider"}
                                </span>
                                <h3 className="font-extrabold text-gray-900 text-lg mt-1">{p.name}</h3>
                                <div className="text-sm font-bold text-blue-600">
                                  {(p.name?.includes("Microsoft") || p.logoType === "microsoft")
                                    ? (p.subtitle?.includes("Teams)")
                                      ? p.subtitle
                                      : `${p.subtitle} (${p.teamsOption || "With Teams"})`)
                                    : p.subtitle}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleToggleHomeStatus(p)}
                                  className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold border flex items-center gap-1 transition-all ${
                                    p.showOnHome !== false
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                  }`}
                                  title={p.showOnHome !== false ? "Visible on Homepage (Click to hide from Home)" : "Hidden from Homepage (Click to show on Home)"}
                                >
                                  <Home className="w-3 h-3" />
                                  <span>{p.showOnHome !== false ? "Home: ON" : "Home: OFF"}</span>
                                </button>

                                <button
                                  onClick={() => handleToggleProviderStatus(p)}
                                  title={p.enabled !== false ? "Disable Provider Plan" : "Enable Provider Plan"}
                                >
                                  {p.enabled !== false ? (
                                    <ToggleRight className="w-8 h-8 text-emerald-600" />
                                  ) : (
                                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100 space-y-1">
                              <div className="text-xl font-extrabold text-gray-900">
                                {p.price} <span className="text-xs font-normal text-gray-500">{p.period}</span>
                              </div>
                              <div className="text-[11px] text-gray-500 font-medium">{p.billingNote}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-gray-700">
                              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                                <span className="text-gray-400 block text-[10px]">STORAGE</span>
                                <span>{p.storage}</span>
                              </div>
                              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                                <span className="text-gray-400 block text-[10px]">USERS QUOTA</span>
                                <span className="truncate block">{p.recommendedUsers || "1 - 100 Users"}</span>
                              </div>
                            </div>

                            {/* Features Preview */}
                            {Array.isArray(p.features) && p.features.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[10px] font-extrabold uppercase text-gray-400">Included Features ({p.features.length})</span>
                                <ul className="text-xs space-y-1 text-gray-700">
                                  {p.features.map((f: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-1.5 text-[11px] font-medium">
                                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditProviderModal(p)}
                              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#0B1437] via-[#14214D] to-blue-900 hover:from-blue-600 hover:via-indigo-600 hover:to-[#0B1437] text-white font-extrabold text-xs shadow-sm hover:shadow-lg hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit Provider</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProviderItem(p.id, p.name)}
                              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs transition-colors"
                              title="Delete Provider"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
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
          ENQUIRY DETAILS POPUP MODAL (REDESIGNED UI)
         ========================================== */}
      {selectedEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 selection:bg-blue-600 selection:text-white">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEnquiryModal(null)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/80 z-10 overflow-hidden space-y-6 max-h-[92vh] overflow-y-auto"
          >
            {/* Modal Top Header Bar */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      Enquiry #{selectedEnquiryModal.enquiry_id || selectedEnquiryModal.id}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {selectedEnquiryModal.created_at ? new Date(selectedEnquiryModal.created_at).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                    {selectedEnquiryModal.organization_name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedEnquiryModal.status === "Done" || selectedEnquiryModal.status === "done" ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5 shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Done</span>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleUpdateEnquiryStatus(selectedEnquiryModal.id || selectedEnquiryModal.enquiry_id, "Done");
                      setSelectedEnquiryModal({ ...selectedEnquiryModal, status: "Done" });
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shrink-0 active:scale-95 shadow-2xs"
                    title="Click to mark as Done"
                  >
                    Pending (Mark Done)
                  </button>
                )}

                <button
                  onClick={() => setSelectedEnquiryModal(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Body */}
            {(() => {
              const isGeneralEnquiry =
                (selectedEnquiryModal.provider || "").toLowerCase().includes("general") ||
                (selectedEnquiryModal.plan || "").toLowerCase().includes("inquiry") ||
                (selectedEnquiryModal.plan || "").toLowerCase().includes("general") ||
                selectedEnquiryModal.organization_name === "Direct Web Enquiry";

              const rawPhoneDigits = (selectedEnquiryModal.phone_number || "").replace(/\D/g, "");
              const whatsappDigits = rawPhoneDigits.length === 10 ? `91${rawPhoneDigits}` : rawPhoneDigits;

              if (isGeneralEnquiry) {
                return (
                  <div className="space-y-6 text-xs">
                    <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-xl border border-slate-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center shrink-0">
                            <User className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="text-base font-extrabold text-white">General Business Enquiry</h4>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Client Contact & Notes Details</span>
                          </div>
                        </div>
                        <span className="px-3.5 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider shadow-xs">
                          General Enquiry
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-10">
                        {/* Name */}
                        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Client Name</span>
                          <div className="text-sm font-black text-white">
                            {selectedEnquiryModal.first_name} {selectedEnquiryModal.last_name !== "Customer" ? selectedEnquiryModal.last_name : ""}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">Contact Person</div>
                        </div>

                        {/* Phone */}
                        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                          <div className="text-sm font-black text-emerald-400">
                            {selectedEnquiryModal.phone_number?.startsWith("+91") ? selectedEnquiryModal.phone_number : `+91 ${selectedEnquiryModal.phone_number}`}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">Mobile (India +91)</div>
                        </div>

                        {/* Email */}
                        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Email Address</span>
                          <div className="text-sm font-black text-blue-300 truncate" title={selectedEnquiryModal.email}>
                            {selectedEnquiryModal.email}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">Primary Email</div>
                        </div>
                      </div>

                      {/* Notes / Message */}
                      <div className="bg-slate-950/90 p-4.5 rounded-2xl border border-slate-800 space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Client Enquiry Message / Notes</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
                          {selectedEnquiryModal.notes || "No message notes provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              const matchedPlan = (() => {
                if (!adminProvidersList || adminProvidersList.length === 0) return null;

                // 1. Match by provider_id
                if (selectedEnquiryModal.provider_id) {
                  const byId = adminProvidersList.find(
                    (p) => p.id === selectedEnquiryModal.provider_id
                  );
                  if (byId) return byId;
                }

                const reqProv = (selectedEnquiryModal.provider || "").toLowerCase().trim();
                const reqPlan = (selectedEnquiryModal.plan || "").toLowerCase().trim();

                // 2. Match by provider AND subtitle
                const byNameAndSubtitle = adminProvidersList.find((p) => {
                  const pName = (p.name || "").toLowerCase().trim();
                  const pSub = (p.subtitle || "").toLowerCase().trim();
                  const pLogo = (p.logoType || "").toLowerCase().trim();
                  const matchesProvider =
                    (pName && (pName.includes(reqProv) || reqProv.includes(pName))) ||
                    (pLogo && (pLogo.includes(reqProv) || reqProv.includes(pLogo)));
                  const matchesPlan =
                    pSub &&
                    (pSub.includes(reqPlan) || reqPlan.includes(pSub));
                  return matchesProvider && matchesPlan;
                });
                if (byNameAndSubtitle) return byNameAndSubtitle;

                // 3. Fallback match by provider group
                return (
                  adminProvidersList.find((p) => {
                    const pName = (p.name || "").toLowerCase();
                    const pLogo = (p.logoType || "").toLowerCase();
                    return reqProv && (pName.includes(reqProv) || pLogo.includes(reqProv));
                  }) || null
                );
              })();

              const providerNameDisplay = matchedPlan?.name || selectedEnquiryModal.provider || "N/A";
              const providerSubtitleDisplay = matchedPlan?.subtitle || (selectedEnquiryModal.plan && selectedEnquiryModal.plan !== selectedEnquiryModal.provider ? selectedEnquiryModal.plan : "N/A");
              const priceDisplay = matchedPlan ? `${matchedPlan.price} ${matchedPlan.period || "/ mo"}` : (selectedEnquiryModal.plan?.includes("₹") ? selectedEnquiryModal.plan : "Custom Quote");
              const planIdDisplay = selectedEnquiryModal.provider_id || matchedPlan?.id || selectedEnquiryModal.providerId || "N/A";

              const planTitle = matchedPlan
                ? `${matchedPlan.name} (${matchedPlan.subtitle || ""})`
                : selectedEnquiryModal.plan || selectedEnquiryModal.provider || "Custom Plan Enquiry";

              const badgeTag = matchedPlan?.badge || "Customer Interest";

              const userSeats = Number(selectedEnquiryModal.user_count) || 1;
              const reqPlanStr = selectedEnquiryModal.plan || selectedEnquiryModal.provider || "";
              const extractedBasePrice = (() => {
                if (matchedPlan?.price) {
                  const d = String(matchedPlan.price).replace(/[^\d.]/g, "");
                  if (d && !isNaN(parseFloat(d))) return parseFloat(d);
                }
                const currencyMatch = reqPlanStr.match(/(?:₹|rs\.?|inr|\$)\s*([\d]+(?:\.[\d]+)?)/i);
                if (currencyMatch && currencyMatch[1]) return parseFloat(currencyMatch[1]);
                const digits = reqPlanStr.replace(/[^\d.]/g, "");
                return (digits && !isNaN(parseFloat(digits))) ? parseFloat(digits) : 136;
              })();

              const monthlyBaseRate = extractedBasePrice * userSeats;
              const annualBaseSubtotal = monthlyBaseRate * 12;
              const gstTax = Math.round(annualBaseSubtotal * 0.18);
              const totalAmount = annualBaseSubtotal + gstTax;

              return (
                <div className="space-y-6 text-xs">

                  {/* --- 1. CUSTOMER INTEREST PROVIDER PLAN SPECIFICATIONS CARD --- */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-[#0B1437] to-slate-900 text-white space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center shrink-0">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-white">{planTitle}</h4>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Customer Interest Plan Details</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider shadow-xs">
                        {badgeTag}
                      </span>
                    </div>

                    {/* 4 Primary Customer Interest Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs relative z-10">
                      {/* Provider Name */}
                      <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Provider Name</span>
                        <div className="text-sm font-black text-white">{providerNameDisplay}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Email Platform</div>
                      </div>

                      {/* Provider Subtitle */}
                      <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Provider Subtitle</span>
                        <div className="text-sm font-black text-blue-300">{providerSubtitleDisplay}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Plan Tier</div>
                      </div>

                      {/* Plan Price */}
                      <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Plan Price</span>
                        <div className="text-sm font-black text-emerald-400">{priceDisplay}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Billed annually</div>
                      </div>

                      {/* Plan ID */}
                      <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Plan ID</span>
                        <div className="text-xs font-mono font-bold text-indigo-300 truncate" title={planIdDisplay}>
                          {planIdDisplay}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">Unique Plan Reference</div>
                      </div>
                    </div>
                  </div>

                  {/* --- 2. FINANCIAL ORDER TOTAL SUMMARY CARD --- */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                          <ReceiptText className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-gray-900">Order Total Summary Details</h4>
                          <span className="text-[10px] text-gray-500 font-medium">Financial Calculation & 18% GST Breakdown</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 uppercase tracking-wider">
                        Annual Quote
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {/* Number of User Seats */}
                      <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-gray-500 uppercase block">User Seats</span>
                        <div className="text-base font-black text-gray-900">{userSeats} Seat{userSeats > 1 ? "s" : ""}</div>
                        <div className="text-[10px] text-gray-400 font-medium">Enquired Mailboxes</div>
                      </div>

                      {/* Monthly Base Rate */}
                      <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-gray-500 uppercase block">Monthly Base Rate</span>
                        <div className="text-base font-black text-indigo-600">₹{monthlyBaseRate.toLocaleString("en-IN")} / mo</div>
                        <div className="text-[10px] text-gray-400 font-medium">₹{extractedBasePrice} per seat/mo</div>
                      </div>

                      {/* Annual Subtotal */}
                      <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-gray-500 uppercase block">Annual Subtotal</span>
                        <div className="text-base font-black text-slate-800">₹{annualBaseSubtotal.toLocaleString("en-IN")}</div>
                        <div className="text-[10px] text-gray-400 font-medium">12 Months Base Fee</div>
                      </div>

                      {/* GST Tax */}
                      <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                        <span className="text-[10px] font-extrabold text-gray-500 uppercase block">GST Tax (18%)</span>
                        <div className="text-base font-black text-amber-600">₹{gstTax.toLocaleString("en-IN")}</div>
                        <div className="text-[10px] text-gray-400 font-medium">Govt Tax Component</div>
                      </div>
                    </div>

                    {/* Total Estimated Amount Banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B1437] to-slate-900 text-white flex items-center justify-between shadow-md border border-slate-800">
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-blue-400">Total Amount (Inc. 18% GST)</div>
                        <div className="text-[11px] text-slate-300 font-medium">Grand Annual Estimated Total</div>
                      </div>
                      <div className="text-2xl font-black text-emerald-400">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* --- 3. CUSTOMER ORGANISATION & CONTACT DETAILS GRID --- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Organization & Domain */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                      <div className="font-extrabold text-gray-900 flex items-center gap-2 text-xs">
                        <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Organization & Domain</span>
                      </div>
                      <div className="space-y-1 text-gray-700 text-xs">
                        <div><strong>Company:</strong> {selectedEnquiryModal.organization_name}</div>
                        <div><strong>Domain:</strong> <span className="text-blue-600 font-bold">{selectedEnquiryModal.domain}</span></div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                      <div className="font-extrabold text-gray-900 flex items-center gap-2 text-xs">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Contact Information</span>
                      </div>
                      <div className="space-y-1 text-gray-700 text-xs">
                        <div><strong>Name:</strong> {selectedEnquiryModal.first_name} {selectedEnquiryModal.last_name}</div>
                        <div><strong>Primary Email:</strong> {selectedEnquiryModal.email}</div>
                        <div><strong>Alt Email:</strong> {selectedEnquiryModal.alternative_email || "N/A"}</div>
                        <div><strong>Phone:</strong> {selectedEnquiryModal.phone_number?.startsWith("+91") ? selectedEnquiryModal.phone_number : `+91 ${selectedEnquiryModal.phone_number}`}</div>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="sm:col-span-2 p-4 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                      <div className="font-extrabold text-gray-900 flex items-center gap-2 text-xs">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Address Details</span>
                      </div>
                      <div className="text-gray-700 text-xs">
                        {selectedEnquiryModal.address ? `${selectedEnquiryModal.address}, ` : ""}
                        {selectedEnquiryModal.city}, {selectedEnquiryModal.state} - {selectedEnquiryModal.zip}
                      </div>
                    </div>

                    {/* Customer Notes */}
                    <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-900 text-white space-y-2 shadow-2xs">
                      <div className="font-extrabold text-slate-200 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>Submitted Customer Notes</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">200 Words Limit</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                        {selectedEnquiryModal.notes || "No additional notes provided."}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Modal Bottom Footer Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 text-xs">
              <div className="text-gray-400 font-medium text-[11px]">
                Enquiry Received: {selectedEnquiryModal.created_at ? new Date(selectedEnquiryModal.created_at).toLocaleString() : "Recently"}
              </div>

              {(() => {
                const rawDigits = (selectedEnquiryModal.phone_number || "").replace(/\D/g, "");
                const waNumber = rawDigits.length === 10 ? `91${rawDigits}` : rawDigits;
                return (
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    <a
                      href={`mailto:${selectedEnquiryModal.email}`}
                      className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold border border-blue-200 transition-colors flex items-center gap-1.5 justify-center active:scale-95"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                    <a
                      href={`tel:${selectedEnquiryModal.phone_number}`}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold border border-emerald-200 transition-colors flex items-center gap-1.5 justify-center active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Contact</span>
                    </a>
                    {waNumber && (
                      <a
                        href={`https://wa.me/${waNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-extrabold border border-green-200 transition-colors flex items-center gap-1.5 justify-center active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteEnquiry(selectedEnquiryModal.enquiry_id || selectedEnquiryModal.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold border border-rose-200 transition-all flex items-center gap-1.5 justify-center shrink-0 active:scale-95"
                      title="Delete Enquiry Record"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
      {/* ==========================================
          CREATE / EDIT PROVIDER MODAL WINDOW
         ========================================== */}
      {isProviderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsProviderModalOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">
                    {editingProviderId ? `Edit Provider (${providerFormData.name})` : "Add New Email Provider"}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Configure provider card details displayed on the client website.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProviderModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProviderSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Provider Name Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Provider Name <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={providerFormData.name}
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      let derivedLogo = "google";
                      if (selectedName.includes("Google")) derivedLogo = "google";
                      else if (selectedName.includes("Microsoft")) derivedLogo = "microsoft";
                      else if (selectedName.includes("Rediff")) derivedLogo = "rediff";
                      else if (selectedName.includes("Titan")) derivedLogo = "titan";

                      setProviderFormData({
                        ...providerFormData,
                        name: selectedName,
                        logoType: derivedLogo,
                      });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="Google Workspace">Google Workspace</option>
                    <option value="Microsoft 365">Microsoft 365</option>
                    <option value="Rediffmail Pro">Rediffmail Pro</option>
                    <option value="Titan Mail">Titan Mail</option>
                  </select>
                </div>

                {/* 2. Subtitle Plan Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Subtitle Plan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={providerFormData.subtitle}
                    onChange={(e) => setProviderFormData({ ...providerFormData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="Base Plan">Base Plan</option>
                    <option value="Starter Plan">Starter Plan</option>
                    <option value="Standard Plan">Standard Plan</option>
                    <option value="Pro">Pro</option>
                    <option value="Business">Business</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                    {providerFormData.subtitle &&
                      ![
                        "Base Plan",
                        "Starter Plan",
                        "Standard Plan",
                        "Pro",
                        "Business",
                        "Advanced",
                        "Premium",
                        "Enterprise"
                      ].includes(providerFormData.subtitle) && (
                        <option value={providerFormData.subtitle}>{providerFormData.subtitle}</option>
                      )}
                  </select>
                </div>

                {/* 2b. NEW Teams Option Dropdown (Standalone for Microsoft 365) */}
                {providerFormData.name.includes("Microsoft") && (
                  <div>
                    <label className="block text-xs font-extrabold text-blue-900 uppercase mb-1">
                      Microsoft Teams Option
                    </label>
                    <select
                      value={teamsOption}
                      onChange={(e) => setTeamsOption(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-300 text-xs font-extrabold text-blue-900 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                    >
                      <option value="With Teams">With Teams Plan</option>
                      <option value="Without Teams">Without Teams Plan</option>
                    </select>
                  </div>
                )}

                {/* 3. Badge Tag Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Badge Highlight Tag
                  </label>
                  <select
                    value={providerFormData.badge}
                    onChange={(e) => setProviderFormData({ ...providerFormData, badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="">-- Select Badge Tag --</option>
                    {providerBadges.map((b) => (
                      <option key={b.id} value={b.title}>
                        {b.title}
                      </option>
                    ))}
                    {providerFormData.badge &&
                      !providerBadges.some((b) => b.title === providerFormData.badge) && (
                        <option value={providerFormData.badge}>{providerFormData.badge}</option>
                      )}
                  </select>
                </div>

                {/* 4. Price (Numeric Only + Static Rupee Symbol Prefix) */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1 flex items-center justify-between">
                    <span>Price <span className="text-rose-500">*</span></span>
                    {providerPriceError && (
                      <span className="text-[11px] font-extrabold text-rose-600 lowercase font-mono">
                        (invalid price)
                      </span>
                    )}
                  </label>
                  <div className="flex items-center">
                    <span className={`px-3.5 py-3 rounded-l-xl border border-r-0 text-xs font-black shrink-0 transition-colors ${providerPriceError
                      ? "bg-rose-100 border-rose-500 text-rose-800"
                      : "bg-gray-200 border-gray-300 text-gray-800"
                      }`}>
                      ₹
                    </span>
                    <input
                      type="text"
                      required
                      inputMode="decimal"
                      value={providerFormData.price}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d.]/g, "").replace(/(\..*?)\..*/g, "$1");
                        setProviderFormData({ ...providerFormData, price: val });
                        const num = parseFloat(val);
                        if (!val) {
                          setProviderPriceError("Price is required.");
                        } else if (isNaN(num) || num < 1) {
                          setProviderPriceError("Price cannot be less than ₹1.");
                        } else {
                          setProviderPriceError("");
                        }
                      }}
                      placeholder="100"
                      className={`w-full px-4 py-3 rounded-r-xl border text-xs font-extrabold transition-colors focus:outline-none ${providerPriceError
                        ? "bg-rose-50/70 border-rose-500 text-rose-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-600"
                        }`}
                    />
                  </div>

                  {providerPriceError && (
                    <p className="text-[11px] text-rose-600 mt-1.5 font-extrabold flex items-center gap-1">
                      <span className="text-xs">⚠️</span>
                      <span>{providerPriceError}</span>
                    </p>
                  )}
                </div>

                {/* 5. Billing Period Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Billing Period <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={providerFormData.period}
                    onChange={(e) => setProviderFormData({ ...providerFormData, period: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="/ user / month">Monthly (/ user / month)</option>
                    <option value="/ user / year">Yearly (/ user / year)</option>
                    <option value="/ user / 3 years">3 Years (/ user / 3 years)</option>
                    <option value="/ user / flexible">Flexible (/ user / flexible)</option>
                  </select>
                </div>

                {/* 6. Billing Note */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Billing Note
                  </label>
                  <input
                    type="text"
                    value={providerFormData.billingNote}
                    onChange={(e) => setProviderFormData({ ...providerFormData, billingNote: e.target.value })}
                    placeholder="e.g. Billed annually (₹160/mo if monthly)"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* 7. Mailbox Storage (Numeric Left + Static GB Suffix Right) */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Mailbox Storage <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={providerFormData.storage}
                      onChange={(e) => {
                        const numericOnly = e.target.value.replace(/[^\d]/g, "");
                        setProviderFormData({ ...providerFormData, storage: numericOnly });
                      }}
                      placeholder="30"
                      className="w-full px-4 py-3 rounded-l-xl bg-gray-50 border border-gray-200 text-xs font-extrabold text-gray-900 focus:outline-none focus:border-blue-600"
                    />
                    <span className="px-3.5 py-3 rounded-r-xl bg-gray-200 border border-l-0 border-gray-300 text-xs font-black text-gray-800 shrink-0">
                      GB
                    </span>
                  </div>
                </div>


                {/* 9. Recommended Users */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Recommended Users Quota
                  </label>
                  <input
                    type="text"
                    value={providerFormData.recommendedUsers}
                    onChange={(e) => setProviderFormData({ ...providerFormData, recommendedUsers: e.target.value })}
                    placeholder="e.g. 1 - 300 Users"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* 10. Logo Type */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Logo Type
                  </label>
                  <select
                    value={providerFormData.logoType}
                    onChange={(e) => setProviderFormData({ ...providerFormData, logoType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="google">Google Workspace</option>
                    <option value="microsoft">Microsoft 365</option>
                    <option value="rediff">Rediffmail Pro</option>
                    <option value="titan">Titan Mail</option>
                  </select>
                </div>

                {/* 10b. Homepage Visibility Toggle */}
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Homepage Visibility
                  </label>
                  <label className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={providerFormData.showOnHome !== false}
                      onChange={(e) => setProviderFormData({ ...providerFormData, showOnHome: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-extrabold text-gray-800 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-blue-600" />
                      <span>Display on Main Homepage</span>
                    </span>
                  </label>
                </div>
              </div>



              {/* 11. Interactive Feature Bullet Points Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-gray-700 uppercase">
                    Provider Features Bullet Points ({providerFormData.featuresText ? providerFormData.featuresText.split("\n").filter(Boolean).length : 0})
                  </label>
                  <span className="text-[10px] text-gray-400 font-normal">Type 1 feature & press Enter or click Add</span>
                </div>

                {/* Single Feature Input + Add Button */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeaturePoint();
                      }
                    }}
                    placeholder="e.g. 30 GB Pooled Storage per User"
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeaturePoint}
                    className="px-4 py-3 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Feature</span>
                  </button>
                </div>

                {/* Display Added Feature Bullet Points */}
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 max-h-48 overflow-y-auto">
                  {providerFormData.featuresText && providerFormData.featuresText.split("\n").filter(Boolean).length > 0 ? (
                    <ul className="space-y-2">
                      {providerFormData.featuresText.split("\n").filter(Boolean).map((feat, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-800 shadow-2xs font-semibold">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                            <span className="break-words">{feat}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeaturePoint(idx)}
                            className="p-1 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors shrink-0"
                            title="Delete feature"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4 text-xs text-gray-400 font-medium">
                      No features added yet. Type a feature point above and click <strong>Add Feature</strong> or press <strong>Enter</strong>.
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProviderModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-extrabold text-xs hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                >
                  {editingProviderId ? "Save Changes" : "Create Provider Card"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ==========================================
          PREMIUM DELETE CONFIRMATION MODAL
         ========================================== */}
      <AnimatePresence>
        {deleteModalState?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Red Trash Warning Badge */}
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-xs">
                  <Trash2 className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-gray-900">{deleteModalState.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                    {deleteModalState.description}
                  </p>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex items-center gap-3 w-full pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setDeleteModalState(null)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs transition-all active:scale-95 border border-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deleteModalState.onConfirm();
                      setDeleteModalState(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 transition-all active:scale-95"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
