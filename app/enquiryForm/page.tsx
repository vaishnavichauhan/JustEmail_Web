"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
    Building2,
    Globe,
    MapPin,
    Mail,
    User,
    Phone,
    FileText,
    CheckCircle2,
    ArrowLeft,
    Send,
    ShieldCheck,
    Sparkles,
    AlertCircle,
    Server,
    ReceiptText,
    Lock,
    Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function EnquiryFormContent() {
    const searchParams = useSearchParams();

    const rawProviderParam = searchParams.get("provider") || "Business Email Provider";
    const rawPlanParam = searchParams.get("plan") || "Custom Business Plan";
    const providerIdParam = searchParams.get("providerId") || searchParams.get("id") || "";

    // Smart price extractor helper
    const extractPrice = (str: string): number | null => {
        if (!str) return null;
        const cleanStr = str.trim();

        // 1. Explicit currency symbol e.g. ₹130, ₹ 130.45, Rs 130, $130
        const currencyMatch = cleanStr.match(/(?:₹|rs\.?|inr|\$)\s*([\d]+(?:\.[\d]+)?)/i);
        if (currencyMatch && currencyMatch[1]) {
            const val = parseFloat(currencyMatch[1]);
            if (!isNaN(val) && val > 0) return val;
        }

        // 2. Price inside parentheses e.g. (130) or (130/mo)
        const parenMatch = cleanStr.match(/\(\s*(?:₹|rs\.?|inr|\$)?\s*([\d]+(?:\.[\d]+)?)[^)]*\)/i);
        if (parenMatch && parenMatch[1]) {
            const val = parseFloat(parenMatch[1]);
            if (!isNaN(val) && val > 0) return val;
        }

        // 3. Price with rate unit e.g. 130/mo, 130 per user
        const rateMatch = cleanStr.match(/([\d]+(?:\.[\d]+)?)\s*(?:\/|\s)*(?:user|mo|month|yr|year)/i);
        if (rateMatch && rateMatch[1]) {
            const val = parseFloat(rateMatch[1]);
            if (!isNaN(val) && val > 0) return val;
        }

        // 4. Pure numeric string e.g. "130" or "130.45"
        if (/^\s*[\d]+(?:\.[\d]+)?\s*$/.test(cleanStr)) {
            const val = parseFloat(cleanStr);
            if (!isNaN(val) && val > 0) return val;
        }

        return null;
    };

    const [providerParam, setProviderParam] = useState(rawProviderParam);
    const [planParam, setPlanParam] = useState(rawPlanParam);
    const [basePricePerMonth, setBasePricePerMonth] = useState<number>(() => {
        const p1 = extractPrice(rawPlanParam);
        if (p1 !== null) return p1;
        const p2 = extractPrice(rawProviderParam);
        if (p2 !== null) return p2;
        return 136;
    });

    useEffect(() => {
        let isMounted = true;
        async function resolvePlanDetails() {
            try {
                const res = await fetch("/api/providers");
                if (!res.ok) return;
                const data = await res.json();
                if (!data.data || !Array.isArray(data.data)) return;

                const providers: any[] = data.data;

                // Match by exact ID or slug
                const matchedById = providers.find(
                    (p: any) =>
                        p.id === rawPlanParam ||
                        p.id === providerIdParam ||
                        p.id === rawProviderParam
                );

                // Or match by subtitle / provider name
                const matchedByName = matchedById || providers.find(
                    (p: any) =>
                        (p.subtitle && rawPlanParam.toLowerCase().includes(p.subtitle.toLowerCase())) ||
                        (p.name && rawProviderParam.toLowerCase().includes(p.name.toLowerCase()))
                );

                const target = matchedById || matchedByName;

                if (target && isMounted) {
                    if (target.name) {
                        setProviderParam(target.name);
                    }
                    const rawPrice = target.price ? String(target.price) : "";
                    const dbPrice = extractPrice(rawPrice);
                    if (dbPrice !== null) {
                        setBasePricePerMonth(dbPrice);
                    }
                    const planTitle = target.subtitle || target.name || rawPlanParam;
                    setPlanParam(rawPrice ? `${planTitle} (${rawPrice})` : planTitle);
                }
            } catch (e) {
                console.error("Error resolving provider plan in enquiry form:", e);
            }
        }
        resolvePlanDetails();
        return () => {
            isMounted = false;
        };
    }, [rawPlanParam, rawProviderParam, providerIdParam]);

    const domainParam = searchParams.get("domain") || "";

    // Form State
    const rawPlanType = (searchParams.get("type") || searchParams.get("planType") || "new").toLowerCase();
    const [planType, setPlanType] = useState<"new" | "renew">(rawPlanType === "renew" ? "renew" : "new");
    const [organizationName, setOrganizationName] = useState("");
    const [domain, setDomain] = useState(domainParam);

    useEffect(() => {
        if (domainParam) {
            setDomain(domainParam);
        }
    }, [domainParam]);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [alternativeEmail, setAlternativeEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userCount, setUserCount] = useState<number>(1);
    const [notes, setNotes] = useState("");

    // UI state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedId, setSubmittedId] = useState("");

    // Financial Calculations (Annual + 18% GST)
    const monthlySubtotal = basePricePerMonth * (userCount > 0 ? userCount : 1);
    const annualSubtotal = monthlySubtotal * 12;
    const gstTax = Math.round(annualSubtotal * 0.18);
    const grandTotal = annualSubtotal + gstTax;

    // Word count helper for 200 words max limit
    const countWords = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    };

    const wordCount = countWords(notes);
    const WORD_LIMIT = 200;

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        const count = countWords(newText);

        if (count > WORD_LIMIT) {
            const words = newText.trim().split(/\s+/);
            const truncated = words.slice(0, WORD_LIMIT).join(" ");
            setNotes(truncated);
            setErrorMessage("Notes cannot exceed 200 words limit.");
        } else {
            setNotes(newText);
            setErrorMessage("");
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericOnly = e.target.value.replace(/\D/g, "");
        if (numericOnly.length <= 10) {
            setPhoneNumber(numericOnly);
            if (numericOnly.length === 10) {
                setErrorMessage("");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        // Validate Word Count
        if (wordCount > WORD_LIMIT) {
            setErrorMessage("Notes must not exceed 200 words limit.");
            return;
        }

        // Basic Mandatory Fields Validation
        if (
            !organizationName ||
            !domain ||
            !city ||
            !state ||
            !zip ||
            !firstName ||
            !lastName ||
            !email ||
            !alternativeEmail ||
            !phoneNumber
        ) {
            setErrorMessage("Please fill in all mandatory fields marked with (*).");
            return;
        }

        // Validate 10-Digit Numeric Phone Number
        if (phoneNumber.length !== 10) {
            setErrorMessage("Phone number must be exactly 10 numeric digits.");
            return;
        }

        // Validate Email & Alternative Email are not identical
        if (email.trim().toLowerCase() === alternativeEmail.trim().toLowerCase()) {
            setErrorMessage("Primary Email and Alternative Email cannot be the same.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    organizationName: organizationName.trim(),
                    domain: domain.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    zip: zip.trim(),
                    address: address.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    alternativeEmail: alternativeEmail.trim(),
                    phoneNumber: phoneNumber,
                    notes: notes.trim(),
                    provider: providerParam,
                    plan: planParam,
                    planType: planType,
                    providerId: providerIdParam,
                    userCount: userCount || 1,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmittedId(data.enquiryId || `ENQ-${Date.now()}`);
                setIsSubmitted(true);
            } else {
                setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setErrorMessage("Network error occurred while submitting enquiry. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans">
                <Navbar />
                <main className="flex-1 pt-25 pb-16 md:pt-40 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl text-center space-y-6 w-full animate-fadeIn">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                        </div>

                        <div>
                            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                                Submission Confirmed
                            </span>
                            <h2 className="text-2xl font-extrabold text-gray-900 mt-3">
                                Successfully Submitted Your Enquiry!
                            </h2>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                                Reference ID: <span className="font-mono font-bold text-blue-600">{submittedId}</span>
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-left space-y-2 text-gray-700">
                            <div className="flex justify-between border-b border-gray-200 pb-2 font-bold text-gray-900">
                                <span>Organization:</span>
                                <span>{organizationName}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Domain:</span>
                                <span>{domain}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Requested Plan:</span>
                                <span className="font-bold text-indigo-700">{providerParam} ({planParam})</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Plan Type:</span>
                                <span className="font-extrabold uppercase px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800">
                                    {planType === "renew" ? "Renew Plan (Renewal)" : "New Plan (Fresh Setup)"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Annual Total (inc. 18% GST):</span>
                                <span className="font-extrabold text-emerald-600">₹{grandTotal.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed">
                            Our enterprise domain solutions specialist will review your request and contact you at <strong>{email}</strong> or <strong>+91 {phoneNumber}</strong> within 15 minutes.
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/business-emails"
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1437] hover:bg-black text-white font-extrabold text-xs shadow-md transition-all active:scale-95 text-center"
                            >
                                Browse Email Plans
                            </Link>
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs transition-colors text-center"
                            >
                                Return to Home Page
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* Hero Header Banner */}
            <section className="bg-[#0B1437] text-white pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 pointer-events-none" />
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span>Enterprise Business Enquiry</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Official Business Email Enquiry Form
                        </h1>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl font-medium">
                            Complete your business details below to get official corporate domain email setup, bulk seat licensing, and custom migration support.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 transition-all self-start md:self-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Plans</span>
                    </Link>
                </div>
            </section>

            {/* Main 2-Column Section */}
            <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {errorMessage && (
                    <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-3 animate-shake">
                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ==========================================
              LEFT COLUMN: ENQUIRY FORM INPUT CARDS
             ========================================== */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* PLAN TYPE SELECTION CARD (NEW VS RENEW CHECKBOXES) */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                                        <ReceiptText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-gray-900">
                                            Plan Purchase Type
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            Select whether you need a new plan setup or plan renewal.
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                                    Required *
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                {/* NEW PLAN CHECKBOX OPTION */}
                                <label
                                    onClick={() => setPlanType("new")}
                                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                                        planType === "new"
                                            ? "border-blue-600 bg-blue-50/60 text-gray-900 shadow-xs"
                                            : "border-gray-200 bg-gray-50/50 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={planType === "new"}
                                        onChange={() => setPlanType("new")}
                                        className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                                    />
                                    <div>
                                        <div className="text-xs font-black flex items-center gap-1.5 text-gray-900">
                                            <span>New Plan</span>
                                            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-blue-600 text-white rounded-md uppercase">
                                                Fresh Setup
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
                                            Order new corporate email mailboxes & fresh domain configuration.
                                        </p>
                                    </div>
                                </label>

                                {/* RENEW PLAN CHECKBOX OPTION */}
                                <label
                                    onClick={() => setPlanType("renew")}
                                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                                        planType === "renew"
                                            ? "border-indigo-600 bg-indigo-50/60 text-gray-900 shadow-xs"
                                            : "border-gray-200 bg-gray-50/50 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={planType === "renew"}
                                        onChange={() => setPlanType("renew")}
                                        className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                                    />
                                    <div>
                                        <div className="text-xs font-black flex items-center gap-1.5 text-gray-900">
                                            <span>Renew Plan</span>
                                            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-indigo-600 text-white rounded-md uppercase">
                                                Renewal
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
                                            Renew existing active email licenses or domain service.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* 1. ORGANIZATION & DOMAIN DETAILS CARD */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-gray-900">
                                            1. Organization & Domain Details
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            Enter your company name and target business domain.
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                                    Required *
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Organization Name */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Organization Name <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={organizationName}
                                            onChange={(e) => setOrganizationName(e.target.value)}
                                            placeholder="e.g. Acme Corporation Pvt Ltd"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        />
                                        <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        City <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="e.g. Mumbai / Bangalore"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        />
                                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        State <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder="e.g. Maharashtra"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* ZIP / PIN Code */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        ZIP / PIN Code <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        placeholder="e.g. 400001"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Full Address (Optional) */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Address Line
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Office address, Suite, Floor"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. CONTACT & DOMAIN INFORMATION CARD */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-gray-900">
                                            2. Contact Information & Target Domain
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            Primary contact person details & target business domain.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Target Business Domain */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Domain Name <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                            placeholder="e.g. mycompany.com or mycompany.in"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        />
                                        <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* First Name */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        First Name <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="e.g. Rajesh"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        />
                                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Last Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="e.g. Sharma"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Primary Email */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Primary Email <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="rajesh@gmail.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        />
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* Alternative Email */}
                                <div>
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Alternative Email <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={alternativeEmail}
                                            onChange={(e) => setAlternativeEmail(e.target.value)}
                                            placeholder="rajesh.alt@gmail.com"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border text-xs font-semibold text-gray-900 focus:outline-none focus:bg-white transition-all ${email && alternativeEmail && email.trim().toLowerCase() === alternativeEmail.trim().toLowerCase()
                                                ? "border-rose-400 bg-rose-50/40 focus:border-rose-600"
                                                : "border-gray-200 focus:border-blue-600"
                                                }`}
                                        />
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                                    </div>
                                    {email && alternativeEmail && email.trim().toLowerCase() === alternativeEmail.trim().toLowerCase() && (
                                        <span className="text-[10px] font-bold text-rose-500 mt-1 block">
                                            Primary and alternative email cannot be identical.
                                        </span>
                                    )}
                                </div>

                                {/* Phone Number with Static +91 Prefix */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                                        Phone Number<span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex items-center">
                                        <span className="px-3.5 py-3 rounded-l-xl bg-gray-200 border border-r-0 border-gray-300 text-xs font-black text-gray-800 shrink-0 flex items-center gap-1">
                                            <Phone className="w-3.5 h-3.5 text-gray-600" />
                                            <span>+91</span>
                                        </span>
                                        <input
                                            type="tel"
                                            required
                                            inputMode="numeric"
                                            maxLength={10}
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            placeholder="9876543210"
                                            className="w-full px-4 py-3 rounded-r-xl bg-gray-50 border border-gray-200 text-xs font-extrabold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white tracking-wider"
                                        />
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium mt-1 block">
                                        Exact 10 digits required ({phoneNumber.length}/10 digits typed)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. NOTES / CUSTOM REQUIREMENTS CARD */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-gray-900">
                                            3. Additional Notes & Requirements
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            Specify seat counts, current provider migration, or custom requests.
                                        </p>
                                    </div>
                                </div>
                                <div className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${wordCount > WORD_LIMIT ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-gray-100 text-gray-600 border-gray-200"
                                    }`}>
                                    {wordCount}/{WORD_LIMIT} Words
                                </div>
                            </div>

                            <textarea
                                rows={4}
                                value={notes}
                                onChange={handleNotesChange}
                                placeholder="Mention any specific requirements, current email provider to migrate from, or preferred onboarding date..."
                                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                            />
                        </div>

                    </div>

                    {/* ==========================================
              RIGHT COLUMN: STICKY ORDER TOTAL SUMMARY
             ========================================== */}
                    <div className="lg:col-span-5 sticky top-28 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">

                            {/* Order Total Summary Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                                    <ReceiptText className="w-5 h-5 text-blue-600" />
                                    <span>Order Total Summary</span>
                                </h3>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                                    Annual Billing
                                </span>
                            </div>

                            {/* Enquired Provider Plan Banner */}
                            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-2 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">
                                        Selected Email Provider
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                        planType === "renew" ? "bg-indigo-600 text-white" : "bg-blue-600 text-white"
                                    }`}>
                                        {planType === "renew" ? "Renew Plan" : "New Plan"}
                                    </span>
                                </div>
                                <div className="text-sm font-extrabold text-white">
                                    {providerParam}
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-300">
                                    <span>{planParam}</span>
                                    <span className="font-bold text-emerald-400">₹{basePricePerMonth} / user / mo</span>
                                </div>
                            </div>

                            {/* Seat Count Input Selector (Limit: 1 - 300 Seats) */}
                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-extrabold text-gray-700 uppercase">
                                        Number of User Seats / Mailboxes
                                    </label>
                                    <span className="text-[10px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-md">
                                        Limit: 1 - 300
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min={1}
                                        max={300}
                                        value={userCount}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (isNaN(val) || val < 1) {
                                                setUserCount(1);
                                            } else if (val > 300) {
                                                setUserCount(300);
                                                setErrorMessage("User seats count is capped at 300 seats maximum.");
                                            } else {
                                                setUserCount(val);
                                                setErrorMessage("");
                                            }
                                        }}
                                        className="w-24 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs font-black text-gray-900 text-center focus:outline-none focus:border-blue-600 shadow-2xs"
                                    />
                                    <span className="text-xs text-gray-500 font-medium">
                                        User Seat{userCount > 1 ? "s" : ""} × 12 Months
                                    </span>
                                </div>
                            </div>

                            {/* Financial Calculation Breakdown with 18% GST */}
                            <div className="space-y-3 text-xs py-2 border-t border-b border-gray-100 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Monthly Base Rate ({userCount} seat{userCount > 1 ? "s" : ""})</span>
                                    <span className="font-bold text-gray-900">₹{monthlySubtotal.toLocaleString("en-IN")} / mo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Annual Base Subtotal (12 months)</span>
                                    <span className="font-extrabold text-gray-900">₹{annualSubtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-indigo-700">
                                    <span className="font-bold">GST Tax (18%)</span>
                                    <span className="font-black">₹{gstTax.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-emerald-600">
                                    <span>Managed Setup & Migration</span>
                                    <span className="font-bold">FREE (₹0)</span>
                                </div>
                            </div>

                            {/* Total Estimated Amount */}
                            <div className="pt-1 flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-black text-gray-900">Total Estimated Amount</div>
                                    <div className="text-[10px] text-gray-400 font-normal">Inclusive of 18% GST (Annual)</div>
                                </div>
                                <div className="text-2xl font-black text-blue-600">
                                    ₹{grandTotal.toLocaleString("en-IN")}
                                </div>
                            </div>

                            {/* Primary Submit Enquiry Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 rounded-xl bg-[#0B1437] hover:bg-black text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span>Submitting Enquiry...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 text-blue-400" />
                                        <span>Submit Enquiry (₹{grandTotal.toLocaleString("en-IN")})</span>
                                    </>
                                )}
                            </button>

                            {/* Guarantees Badge Box */}
                            {/* <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-3 text-xs text-gray-700">
                                <ShieldCheck className="w-7 h-7 text-blue-600 shrink-0" />
                                <div>
                                    <div className="font-bold text-gray-900 text-[11px]">100% SLA Guarantee & Free Migration</div>
                                    <div className="text-[10px] text-gray-500">Certified engineers handle zero-downtime setup</div>
                                </div>
                            </div> */}

                        </div>
                    </div>

                </form>
            </main>

            <Footer />
        </div>
    );
}

export default function EnquiryFormPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs font-bold text-gray-500">
                    Loading Official Enquiry Form...
                </div>
            }
        >
            <EnquiryFormContent />
        </Suspense>
    );
}
