"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import LoginPage from "@/components/LoginPage";
import PricingPage from "@/components/PricingPage";
import DomainPage from "@/components/DomainPage";
import LicensePage from "@/components/LicensePage";

export default function Home() {
  const { data: session } = useSession();

  const [step, setStep] = useState("plans"); // "plans" | "domain" | "license"
  const [domain, setDomain] = useState("");
  const [licenseKey, setLicenseKey] = useState("");

  // Not logged in → show login
  if (!session) return <LoginPage />;

  // Step: domain input
  if (step === "domain") {
    return (
      <DomainPage
        onBack={() => setStep("plans")}
        onNext={(validDomain) => {
          setDomain(validDomain);
          setLicenseKey(uuidv4());
          setStep("license");
        }}
      />
    );
  }

  // Step: license key + download
  if (step === "license") {
    return (
      <LicensePage
        licenseKey={licenseKey}
        domain={domain}
        onBack={() => {
          setStep("plans");
          setDomain("");
          setLicenseKey("");
        }}
      />
    );
  }

  // Default: pricing plans
  return <PricingPage session={session} onSelect={() => setStep("domain")} />;
}
