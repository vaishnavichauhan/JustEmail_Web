"use client";

import OfficialAppsSection from "./OfficialAppsSection";
import IncludedToolsSection from "./IncludedToolsSection";

interface GoogleAppsProps {
  providerSlug?: string;
}

export default function GoogleAppsIncludedSection({ providerSlug = "google-workspace" }: GoogleAppsProps) {
  return (
    <>
      {/* SECTION 1: OFFICIAL CORE APPLICATIONS */}
      <OfficialAppsSection providerSlug={providerSlug} />

      {/* SECTION 2: BUILT-IN PRODUCTIVITY & SECURITY TOOLS */}
      <IncludedToolsSection providerSlug={providerSlug} />
    </>
  );
}
