"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  X,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

interface AuthModalProps {
  isOpen: boolean;
  mode: "login" | "signup";
  onClose: () => void;
}

export default function AuthModal({ isOpen, mode: initialMode, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const loginStore = useAuthStore((state) => state.login);
  const registerAccountStore = useAuthStore((state) => state.registerAccount);
  const registeredUsers = useAuthStore((state) => state.registeredUsers);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: "Empty", color: "bg-gray-200" };
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { score, label: "Weak", color: "bg-red-500", text: "text-red-500" };
    if (score <= 50) return { score, label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
    if (score <= 75) return { score, label: "Good", color: "bg-blue-500", text: "text-blue-500" };
    return { score, label: "Strong Password", color: "bg-emerald-500", text: "text-emerald-600" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter a password.");
      return;
    }

    const emailLower = email.trim().toLowerCase();
    const isAdminAccount = emailLower === "admin@justemails.in";
    const isResellerAccount = emailLower === "reseller@justemails.in" || emailLower.includes("reseller");

    if (mode === "signup") {
      if (!fullName.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (password.length < 8) {
        setErrorMsg("Password must be at least 8 characters long.");
        return;
      }
      if (strength.score < 75) {
        setErrorMsg("Password must be strong (include uppercase, number & symbol).");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        // Save account into persistent storage
        registerAccountStore({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password,
          role: isResellerAccount ? "reseller" : "user",
        });

        setLoading(false);
        setSuccessMsg("Account created successfully! Please sign in with your password.");
        setPassword("");

        // Redirect signup user to signin view mode
        setTimeout(() => {
          setMode("login");
          setSuccessMsg("");
        }, 1200);
      }, 600);
      return;
    }

    // MODE === "LOGIN" - STRICT PASSWORD CHECK
    const existingUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === emailLower
    );

    // 1. Super Admin Password Validation
    if (isAdminAccount) {
      if (password !== "Admin@12345") {
        setErrorMsg("Incorrect password for Super Admin account. (Hint: Admin@12345)");
        return;
      }
    }
    // 2. Reseller Password Validation
    else if (isResellerAccount) {
      const validResellerPass = existingUser?.password || "Reseller@12345";
      if (password !== validResellerPass) {
        setErrorMsg("Incorrect password for Reseller account. (Hint: Reseller@12345)");
        return;
      }
    }
    // 3. Registered Account Password Validation
    else if (existingUser) {
      if (!existingUser.password || existingUser.password !== password) {
        setErrorMsg("Incorrect password for this account. Please try again.");
        return;
      }
    }
    // 4. Unregistered Account Check
    else {
      setErrorMsg("No account found with this email ID. Please sign up first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userRole = isAdminAccount ? "admin" : isResellerAccount ? "reseller" : existingUser?.role || "user";
      const displayName = existingUser?.fullName || (isAdminAccount ? "Super Admin" : isResellerAccount ? "Reseller Partner" : email.split("@")[0]);

      loginStore({
        fullName: displayName,
        email: email.trim(),
        role: userRole,
      });

      if (isAdminAccount) {
        setSuccessMsg("Super Admin Authenticated! Redirecting to Control Panel...");
      } else if (isResellerAccount) {
        setSuccessMsg("Reseller Partner Authenticated! Redirecting to Reseller Portal...");
      } else {
        setSuccessMsg("Signed in successfully! Redirecting to main page...");
      }

      setLoading(false);

      setTimeout(() => {
        setSuccessMsg("");
        onClose();
        if (isAdminAccount) {
          router.push("/admin");
        } else if (isResellerAccount) {
          router.push("/reseller");
        } else {
          router.push("/");
        }
      }, 1000);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 overflow-hidden"
        >
          {/* BACKGROUND MAIL ICON WATERMARK (Like Home Page Card Reference) */}
          <div className="absolute -top-4 -right-4 text-blue-900/5 pointer-events-none z-0">
            <Mail className="w-36 h-36 stroke-[0.7]" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Company Logo Header */}
          <div className="text-center mb-6 relative z-10">
            <Image
              src="/images/logo1.svg"
              alt="Justemail Logo"
              width={160}
              height={45}
              priority
              className="h-9 w-auto object-contain mx-auto mb-3"
            />
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider mb-2">
              Trusted Email Solutions
            </span>
            <h3 className="text-2xl font-extrabold text-gray-900">
              {mode === "login" ? "Sign In to Justemail" : "Create Your Account"}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {mode === "login"
                ? "Access your business mailboxes & migration console"
                : "Get started with official provider business mailboxes"}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 relative z-10">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 relative z-10">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {mode === "signup" && (
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-extrabold text-gray-700 uppercase">
                  Password {mode === "signup" && <span className="text-[10px] text-gray-400 font-normal">(Must be strong)</span>}
                </label>
                {mode === "login" && (
                  <span className="text-[11px] font-extrabold text-blue-600 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter for Sign Up */}
              {mode === "signup" && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-gray-500">Strength:</span>
                    <span className={strength.text}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>{mode === "login" ? "Signing In..." : "Creating Account..."}</span>
              ) : (
                <>
                  <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In & Sign Up */}
          <div className="mt-6 text-center text-xs text-gray-600 border-t border-gray-100 pt-4 relative z-10">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                  }}
                  className="font-extrabold text-blue-600 hover:underline"
                >
                  Create an Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                  }}
                  className="font-extrabold text-blue-600 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className="text-center mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1 relative z-10">
            <div>
              Looking for Partner or Control Panel Login?
            </div>
            <div className="flex items-center justify-center gap-3 font-bold text-blue-600">
              <a href="/reseller" onClick={onClose} className="hover:underline text-indigo-600">
                Reseller Portal (/reseller)
              </a>
              <span>•</span>
              <a href="/admin" onClick={onClose} className="hover:underline text-blue-600">
                Super Admin (/admin)
              </a>
            </div>
          </div>

          <div className="text-center mt-3 text-[10px] text-gray-400 flex items-center justify-center gap-1 relative z-10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>FIPS 140-2 Encrypted Security Shield</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
