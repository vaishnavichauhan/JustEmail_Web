"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Business Emails", href: "/business-emails" },
  { name: "Cross-Tenant", href: "/cross-tenant" },
  { name: "Domains", href: "/domains" },
  { name: "Management", href: "/management" },
  { name: "Backup", href: "/backup" },
];

import { useCompare } from "@/lib/compareContext";
import { useCart } from "@/lib/cartContext";
import { useAuthStore } from "@/lib/authStore";
import { SlidersHorizontal, ShoppingCart, LogOut, UserCheck, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Navbar({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const { selectedPlans } = useCompare();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      // Ignore offline errors
    }
    logout();
    setShowLogoutModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`rounded-full transition-all duration-300 px-6 sm:px-8 py-3 flex items-center justify-between shadow-floating ${isScrolled ? "shadow-lg bg-white/95 backdrop-blur-md border border-gray-200" : "bg-white/90 backdrop-blur-md border border-gray-200/80"
              }`}
          >
            {/* Left Side: Official Justemail Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src="/images/logo1.svg"
                alt="Justemail Logo"
                width={240}
                height={80}
                priority
                className="h-12 sm:h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>

            {/* Middle Navbar Items */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && item.href !== "/#cross-tenant" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm transition-colors ${isActive
                      ? "text-blue-700 font-extrabold"
                      : "text-gray-700 font-medium hover:text-gray-900"
                      }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Sign In, Get Started, COMPARE BUTTON & CART BUTTON */}
            <div className="hidden sm:flex items-center gap-3.5">
              {/* CART ICON BUTTON WITH BADGE - SHOWN ONLY WHEN CART HAS ITEMS */}
              {cartItems.length > 0 && (
                <Link
                  href="/checkout"
                  className="relative p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 transition-all shadow-xs flex items-center justify-center group"
                  title="View Cart & Checkout"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                    {cartItems.length}
                  </span>
                </Link>
              )}

              {/* DYNAMIC HEADER COMPARE BUTTON - APPEARS WHEN AT LEAST 1 PLAN IS CHECKED */}
              {selectedPlans.length >= 1 && (
                <Link
                  href="/compare"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center gap-2 animate-bounce-short"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Compare Plans ({selectedPlans.length})</span>
                </Link>
              )}

              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  {user.role === "admin" || user.email === "admin@justemails.in" ? (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-blue-500/40 text-xs font-extrabold text-blue-400 hover:bg-slate-800 transition-colors shadow-md"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Admin Dashboard</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-800">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>{user.fullName || user.email.split("@")[0]}</span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="group rounded-xl bg-[#0B1437] hover:bg-black text-white font-semibold text-sm px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Sign Up</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 space-y-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-3 px-4 rounded-full border border-rose-200 bg-rose-50 text-rose-700 font-bold flex items-center justify-center gap-2 hover:bg-rose-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out ({user.fullName || user.email.split("@")[0]})</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenAuthModal) onOpenAuthModal("login");
                      }}
                      className="w-full py-3 px-4 rounded-full border border-gray-300 text-gray-900 font-semibold flex items-center justify-center hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenAuthModal) onOpenAuthModal("signup");
                      }}
                      className="w-full py-3 px-4 rounded-full bg-[#0B1437] text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-black"
                    >
                      <span>Sign Up</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LOGOUT SUCCESS POPUP MODAL --- */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 text-center space-y-4"
            >
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Logged Out Successfully
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-1.5 leading-relaxed">
                  You have been safely signed out of your Justemail session.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


