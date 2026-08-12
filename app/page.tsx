"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessEmailsSection from "@/components/BusinessEmailsSection";
import BusinessEmailBenefitsSection from "@/components/BusinessEmailBenefitsSection";
import HomeBackupSection from "@/components/HomeBackupSection";
import WhyJustEmailSection from "@/components/WhyJustEmailSection";
import SocialProofSection from "@/components/SocialProofSection";
import HomePageFaqSection from "@/components/HomePageFaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-primary selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* 2. Main Hero Section */}
      <Hero onOpenAuthModal={handleOpenAuthModal} />

      {/* 3. Business Emails Provider Cards Section */}
      <BusinessEmailsSection onOpenAuthModal={handleOpenAuthModal} />

      {/* 4. Business Email Benefits (6 Cards) */}
      <BusinessEmailBenefitsSection />

      {/* 5. Backup Services Section (Never Lose an Important Email - Motion UI Flow) */}
      <HomeBackupSection />

      {/* 7. Why Justemail (Why JE) Section */}
      <WhyJustEmailSection />

      {/* 8. Social Proof & Trust Elements (Marquee Client Logos Bar, Tech Partners, Testimonials) */}
      <SocialProofSection />

      {/* 9. FAQ Section */}
      <HomePageFaqSection />

      {/* 10. Final CTA Section (Ready to Upgrade Your Business Email?) */}
      <FinalCtaSection onOpenAuthModal={handleOpenAuthModal} />

      {/* 11. Footer Section */}
      <Footer />

      {/* Interactive Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </main>
  );
}
