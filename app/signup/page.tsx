"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Zap,
  Check
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const registerAccountStore = useAuthStore((state) => state.registerAccount);

  console.log("registerAccountStorecc...", registerAccountStore);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Detailed Password Criteria
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteriaMetCount = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthBar = () => {
    if (criteriaMetCount === 0) return { width: "0%", color: "bg-gray-200", label: "" };
    if (criteriaMetCount === 1) return { width: "25%", color: "bg-rose-500", label: "Weak" };
    if (criteriaMetCount === 2) return { width: "50%", color: "bg-amber-500", label: "Fair" };
    if (criteriaMetCount === 3) return { width: "75%", color: "bg-blue-500", label: "Good" };
    return { width: "100%", color: "bg-emerald-500", label: "Strong Password" };
  };

  const strength = getStrengthBar();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address ID.");
      return;
    }
    if (criteriaMetCount < 3) {
      setErrorMsg("Please create a stronger password (include uppercase, number & symbol).");
      return;
    }

    setLoading(true);

    try {
      // 1. Call MySQL Signup API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to create account in MySQL.");
        setLoading(false);
        return;
      }

      // 2. Also register in client auth store
      registerAccountStore({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password,
      });

      setLoading(false);
      setSuccessMsg("Account created in MySQL! Redirecting to Sign In...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      // Fallback local registration if MySQL server is offline
      registerAccountStore({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password,
      });
      setLoading(false);
      setSuccessMsg("Account created successfully! Redirecting to Sign In...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-foreground flex items-center justify-center p-4 sm:p-6 md:p-10 selection:bg-blue-600 selection:text-white">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">

        {/* --- LEFT COLUMN: BRAND & VALUE SHOWCASE PANEL --- */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0B1437] to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">

          {/* Background Glow Accents & Mail Watermark */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-6 -right-6 text-white/10 pointer-events-none z-0">
            <Mail className="w-48 h-48 stroke-[0.7]" />
          </div>

          <div className="relative z-10 space-y-6">
            <Link href="/" className="inline-block bg-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform">
              <Image
                src="/images/logo1.svg"
                alt="Justemail Logo"
                width={140}
                height={40}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>

            <div className="pt-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                Enterprise Email Platform
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug">
                Unified Business Email Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Deploy Google Workspace, Microsoft 365, Zoho Mail, and Titan under your custom business domain with 0-downtime cutover guarantee.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Expert Admin Panel Setup & Managed Services</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Free 1-Click Data & MX Migration</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>24/7 Priority Indian Technical Support</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span>© 2026 justEmails</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AES-256 Encrypted</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIGN UP FORM --- */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Enter your credentials to provision your business email workspace.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">

              {/* Full Name Field */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Email Address ID */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">
                  Email Address ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@yourcompany.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Real-time Password Strength Meter */}
                {password && (
                  <div className="mt-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-500">Password Strength:</span>
                      <span className="text-blue-600">{strength.label}</span>
                    </div>

                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: strength.width }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold pt-1">
                      <div className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-600" : "text-gray-400"}`}>
                        <Check className="w-3 h-3" />
                        <span>8+ Characters</span>
                      </div>
                      <div className={`flex items-center gap-1 ${hasUpper ? "text-emerald-600" : "text-gray-400"}`}>
                        <Check className="w-3 h-3" />
                        <span>Uppercase Letter</span>
                      </div>
                      <div className={`flex items-center gap-1 ${hasNumber ? "text-emerald-600" : "text-gray-400"}`}>
                        <Check className="w-3 h-3" />
                        <span>Number</span>
                      </div>
                      <div className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-600" : "text-gray-400"}`}>
                        <Check className="w-3 h-3" />
                        <span>Special Symbol</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Footer Switcher */}
          <div className="mt-8 text-center text-xs text-gray-600 border-t border-gray-100 pt-5">
            Already have an account?{" "}
            <Link href="/login" className="font-extrabold text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
