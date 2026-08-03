"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Check
} from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);
  console.log("loginStore...", loginStore);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const registeredUsers = useAuthStore((state) => state.registeredUsers);
  console.log("registeredUsers...", registeredUsers);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // 1. Send Login Request to MySQL API Route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      console.log("data....", data);


      if (!res.ok) {
        setErrorMsg(data.error || "Login failed. Check your credentials.");
        setLoading(false);
        return;
      }

      // 2. Set Login Session & Token in Client Store
      loginStore(data.user, data.token);
      setLoading(false);

      if (data.user.role === "admin") {
        setSuccessMsg("Super Admin Authenticated! Redirecting to Control Panel...");
        setTimeout(() => router.push("/admin"), 800);
      } else if (data.user.role === "reseller") {
        setSuccessMsg("Reseller Partner Authenticated! Redirecting to Reseller Portal...");
        setTimeout(() => router.push("/reseller"), 800);
      } else {
        setSuccessMsg("Signed in successfully! Redirecting to main page...");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err) {
      // Fallback local check if server offline
      const emailLower = email.trim().toLowerCase();
      const isAdminAccount = emailLower === "admin@justemails.in";
      const isResellerAccount = emailLower.includes("reseller") || emailLower === "reseller@justemails.in";
      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === emailLower);

      if (isAdminAccount && password === "Admin@12345") {
        loginStore({ fullName: "Super Admin", email: emailLower, role: "admin" });
        setSuccessMsg("Super Admin Authenticated! Redirecting to Control Panel...");
        setTimeout(() => router.push("/admin"), 800);
      } else if (isResellerAccount && (password === "Reseller@12345" || password === existingUser?.password)) {
        loginStore({ fullName: "Reseller Partner", email: emailLower, role: "reseller" });
        setSuccessMsg("Reseller Partner Authenticated! Redirecting to Reseller Portal...");
        setTimeout(() => router.push("/reseller"), 800);
      } else if (existingUser && existingUser.password === password) {
        loginStore({ fullName: existingUser.fullName, email: existingUser.email, role: "user" });
        setSuccessMsg("Signed in successfully! Redirecting to main page...");
        setTimeout(() => router.push("/"), 1000);
      } else {
        setErrorMsg("Invalid credentials. Please check your email and password.");
      }
      setLoading(false);
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
                Control Panel Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug">
                Welcome Back to Justemail
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Access your business email control panel, migration status dashboard, and domain DNS security configuration.
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
                <span>Single Dashboard for All Provider Licenses</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>FIPS 140-2 Encrypted Security Shield</span>
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

        {/* --- RIGHT COLUMN: SIGN IN FORM --- */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Sign In to Your Account
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Enter your email address ID and password to access your dashboard.
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

            <form onSubmit={handleSignIn} className="space-y-4">

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
                    placeholder="Enater Your Email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-extrabold text-gray-700 uppercase">
                    Password
                  </label>
                  <span className="text-[11px] font-extrabold text-blue-600 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0B1437] to-blue-900 hover:from-black hover:to-blue-950 text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Footer Switcher */}
          <div className="mt-8 text-center text-xs text-gray-600 border-t border-gray-100 pt-5">
            Don't have an account?{" "}
            <Link href="/signup" className="font-extrabold text-blue-600 hover:underline">
              Create an Account
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
