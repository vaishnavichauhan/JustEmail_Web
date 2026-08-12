"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Phone, Mail, User, FileText, Sparkles, ReceiptText } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [planType, setPlanType] = useState<"new" | "renew">("new");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{ enquiryId: string } | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (phone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your enquiry details.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.trim().split(" ")[0] || name.trim(),
          lastName: name.trim().split(" ").slice(1).join(" ") || "Customer",
          email: email.trim(),
          phoneNumber: phone,
          notes: message.trim(),
          organizationName: "Direct Web Enquiry",
          domain: email.split("@")[1] || "N/A",
          city: "India",
          state: "India",
          zip: "400001",
          alternativeEmail: email.trim(),
          provider: "General Enquiry",
          plan: "Custom Inquiry",
          planType: planType,
          userCount: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      } else {
        setSubmittedData({ enquiryId: data.enquiryId || `ENQ-${Date.now()}` });
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMessage("Network error occurred while submitting enquiry. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setPlanType("new");
    setErrorMessage("");
    setSubmittedData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0B1437] via-[#14214D] to-[#0B1437] p-6 sm:p-8 text-white relative">
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Get Immediate Callback</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Submit Business Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Fill out your contact details below to receive a custom quote & expert consultation.
            </p>
          </div>

          {/* Modal Content / Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {submittedData ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-gray-900">Enquiry Submitted!</h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                    Thank you, <strong className="text-gray-900">{name}</strong>. Our enterprise team will get in touch with you shortly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 max-w-xs mx-auto">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Enquiry Reference ID</div>
                  <div className="text-lg font-black text-blue-700 mt-0.5">{submittedData.enquiryId}</div>
                  <div className="mt-2 text-xs font-bold text-gray-700">
                    Plan Type: <span className="text-blue-600 font-extrabold">{planType === "renew" ? "Renew Plan" : "New Plan"}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleResetAndClose}
                    className="w-full py-3.5 rounded-xl bg-customBlack hover:bg-navyBlue text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Plan Type Selection Checkboxes (New Plan / Renew Plan) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <ReceiptText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Plan Type *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 pt-0.5">
                    {/* New Plan Checkbox Option */}
                    <label
                      onClick={() => setPlanType("new")}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer select-none ${
                        planType === "new"
                          ? "border-blue-600 bg-blue-50/70 text-gray-900 shadow-xs"
                          : "border-gray-200 bg-gray-50/50 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={planType === "new"}
                        onChange={() => setPlanType("new")}
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-gray-900">New Plan</span>
                        <span className="text-[10px] text-gray-500 font-medium">Fresh Setup</span>
                      </div>
                    </label>

                    {/* Renew Plan Checkbox Option */}
                    <label
                      onClick={() => setPlanType("renew")}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer select-none ${
                        planType === "renew"
                          ? "border-indigo-600 bg-indigo-50/70 text-gray-900 shadow-xs"
                          : "border-gray-200 bg-gray-50/50 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={planType === "renew"}
                        onChange={() => setPlanType("renew")}
                        className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-gray-900">Renew Plan</span>
                        <span className="text-[10px] text-gray-500 font-medium">Renewal</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Rahul Sharma)"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* 3. Phone Number with +91 Indian format */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Phone Number (India +91) *</span>
                  </label>
                  <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 overflow-hidden focus-within:border-blue-600 focus-within:bg-white transition-all">
                    <div className="px-3 py-3 bg-gray-100 text-gray-700 text-xs font-extrabold border-r border-gray-200 flex items-center gap-1.5 shrink-0 select-none">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="10-digit mobile number (e.g. 9876543210)"
                      className="w-full px-4 py-3 bg-transparent text-xs font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium pl-1">Enter 10 numeric digits without prefix</div>
                </div>

                {/* 4. Enquiry Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Enquiry Message / Requirements *</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your company, required mailbox count, or specific email features needed..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
