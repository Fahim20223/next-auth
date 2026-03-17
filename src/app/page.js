"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const plans = [
  {
    id: "starter",
    name: "Beta",
    price: 9,
    desc: "Perfect for individuals getting started",
    badge: null,
    features: [
      "5 Projects",
      "10GB Storage",
      "Basic Analytics",
      "Email Support",
      "API Access",
    ],
    accent: "from-slate-400 to-slate-600",
    btnClass:
      "bg-white/10 hover:bg-white/20 text-white border border-white/20 active:scale-[0.98]",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    desc: "For professionals who need more power",
    badge: "Most Popular",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "Custom Domains",
      "Team Collaboration",
    ],
    accent: "from-violet-500 to-indigo-600",
    btnClass: "",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 39,
    desc: "Scalable solutions for growing teams",
    badge: null,
    features: [
      "Everything in Pro",
      "1TB Storage",
      "White-label Options",
      "Dedicated Manager",
      "SLA Guarantee",
      "SSO & SAML",
      "Custom Integrations",
      "Audit Logs",
    ],
    accent: "from-amber-400 to-orange-500",
    btnClass: "",
  },
];

function Bg() {
  return (
    <>
      <div className="absolute top-[-8%] left-[-4%] w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] bg-indigo-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

function Logo({ size = "md" }) {
  const s = size === "sm" ? "w-8 h-8 rounded-xl" : "w-12 h-12 rounded-2xl";
  const i = size === "sm" ? "w-4 h-4" : "w-6 h-6";
  return (
    <div
      className={`${s} bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/40`}
    >
      <svg viewBox="0 0 24 24" fill="none" className={`${i} text-white`}>
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();
  const [step, setStep] = useState("plans");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [billing, setBilling] = useState("monthly");

  /* ── LOGIN ── */
  if (!session) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center relative overflow-hidden font-sans">
        <Bg />
        <div className="relative w-full max-w-md mx-4">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-white/40 text-sm">
                Sign in to access your workspace
              </p>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#080c14] px-3 text-white/30 uppercase tracking-widest">
                  Continue with
                </span>
              </div>
            </div>

            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3.5 px-5 rounded-xl font-semibold text-sm hover:bg-gray-100 active:scale-[0.98] transition-all duration-150 shadow-lg mb-4"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

            {/* <button
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 px-5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all duration-150"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button> */}

            <p className="text-center text-white/20 text-xs mt-6">
              By signing in, you agree to our{" "}
              <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">
                Terms
              </span>{" "}
              &{" "}
              <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── DOMAIN INPUT ── */
  if (step === "domain") {
    const handleNext = () => {
      const trimmed = domain.trim();
      if (!trimmed) {
        setDomainError("Please enter your domain.");
        return;
      }
      const valid = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(trimmed);
      if (!valid) {
        setDomainError("Enter a valid domain (e.g. example.com)");
        return;
      }
      setDomainError("");
      setLicenseKey(uuidv4());
      setStep("license");
    };

    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center relative overflow-hidden font-sans">
        <Bg />
        <div className="relative w-full max-w-md mx-4">
          <button
            onClick={() => setStep("plans")}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Plans
          </button>

          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <span className="text-white text-sm font-medium">Domain</span>
              </div>
              <div className="flex-1 h-px bg-white/10 mx-2" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/40 text-xs font-bold">
                  2
                </div>
                <span className="text-white/40 text-sm">License</span>
              </div>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center mb-5 shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              Enter Your Domain
            </h2>
            <p className="text-white/40 text-sm mb-6">
              We'll bind your Beta license to this domain. You can change it
              later from settings.
            </p>

            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
              Domain
            </label>
            <div
              className={`flex items-center bg-black/30 border rounded-xl overflow-hidden mb-1 transition-colors ${domainError ? "border-red-500/60" : "border-white/10 focus-within:border-violet-500/50"}`}
            >
              <span className="px-4 text-white/30 text-sm select-none border-r border-white/10 py-3">
                https://
              </span>
              <input
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setDomainError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                className="flex-1 bg-transparent px-4 py-3 text-white text-sm outline-none placeholder-white/20"
              />
            </div>
            {domainError ? (
              <p className="text-red-400 text-xs mb-4 mt-1">{domainError}</p>
            ) : (
              <div className="mb-4" />
            )}

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
            >
              Continue
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── LICENSE KEY ── */
  if (step === "license") {
    const handleCopy = () => {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center relative overflow-hidden font-sans">
        <Bg />
        <div className="relative w-full max-w-md mx-4">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-3.5 h-3.5"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-white/50 text-sm">Domain</span>
              </div>
              <div className="flex-1 h-px bg-violet-500/50 mx-2" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <span className="text-white text-sm font-medium">License</span>
              </div>
            </div>

            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-8 h-8 text-emerald-400"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                You're all set!
              </h2>
              <p className="text-white/40 text-sm">
                License bound to{" "}
                <span className="text-violet-400 font-medium">{domain}</span>
              </p>
            </div>

            {/* License key box */}
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
              Your License Key
            </label>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center gap-3 mb-1">
              <code className="flex-1 text-violet-300 text-sm font-mono break-all leading-relaxed">
                {licenseKey}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
              >
                {copied ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-emerald-400"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-white/50"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            </div>
            {copied && (
              <p className="text-emerald-400 text-xs mb-3 text-right">
                Copied to clipboard!
              </p>
            )}
            {!copied && <div className="mb-3" />}

            {/* Warning */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 flex gap-3 mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-amber-400/80 text-xs leading-relaxed">
                Save this key somewhere safe. It won't be shown again and is
                required to activate the Beta package.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy Key
              </button>
              <a
                href="/beta-package.zip"
                download
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download ZIP
              </a>
            </div>

            <button
              onClick={() => {
                setStep("plans");
                setDomain("");
                setLicenseKey("");
                setCopied(false);
              }}
              className="w-full mt-3 text-white/30 hover:text-white/60 text-xs py-2 transition-colors"
            >
              ← Back to plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── PRICING PLANS ── */
  return (
    <div className="min-h-screen bg-[#080c14] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-indigo-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-white font-bold text-lg tracking-tight">
              Nexus
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
              <img
                src={session.user.image}
                alt="avatar"
                className="w-8 h-8 rounded-full ring-2 ring-violet-500/50"
              />
              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium leading-none">
                  {session.user.name}
                </p>
                <p className="text-white/40 text-xs mt-0.5 leading-none">
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Pricing Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              perfect plan
            </span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span
              className={`text-sm font-medium transition-colors ${billing === "monthly" ? "text-white" : "text-white/30"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBilling(billing === "monthly" ? "yearly" : "monthly")
              }
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${billing === "yearly" ? "bg-violet-600" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${billing === "yearly" ? "left-7" : "left-1"}`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${billing === "yearly" ? "text-white" : "text-white/30"}`}
            >
              Yearly
              <span className="ml-2 text-xs text-emerald-400 font-semibold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isDisabled = plan.id !== "starter";
            const isPro = plan.id === "pro";
            const price =
              billing === "yearly" ? Math.round(plan.price * 0.8) : plan.price;

            return (
              <div
                key={plan.id}
                className={`
                  relative rounded-3xl p-7 transition-all duration-300
                  ${isDisabled ? "opacity-55 cursor-not-allowed" : "cursor-pointer hover:border-white/25 hover:bg-white/[0.07]"}
                  ${
                    isPro
                      ? "bg-gradient-to-b from-violet-900/50 to-indigo-900/30 border-2 border-violet-500/50 shadow-2xl shadow-violet-500/20 md:scale-[1.02]"
                      : "bg-white/[0.04] border border-white/10"
                  }
                `}
              >
                {/* Badge */}
                {isDisabled ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-white/5 backdrop-blur border border-white/15 text-white/40 text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-3 h-3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Coming Soon
                    </span>
                  </div>
                ) : null}

                {/* Plan icon */}
                <div
                  className={`inline-flex w-10 h-10 rounded-2xl bg-gradient-to-br ${plan.accent} items-center justify-center mb-4 shadow-lg`}
                >
                  {plan.id === "starter" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-white"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  )}
                  {plan.id === "pro" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-white"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                  {plan.id === "enterprise" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-white"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z" />
                    </svg>
                  )}
                </div>

                <h2 className="text-xl font-bold text-white mb-1">
                  {plan.name}
                </h2>
                <p className="text-white/40 text-sm mb-5">{plan.desc}</p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-5">
                  <span className="text-white/50 text-lg font-medium self-start mt-1">
                    $
                  </span>
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {price}
                  </span>
                  <span className="text-white/40 text-sm mb-1">/mo</span>
                </div>

                {/* CTA */}
                <button
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setStep("domain")}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-5 flex items-center justify-center gap-2
                    ${
                      isDisabled
                        ? "bg-white/5 border border-white/10 text-white/25 cursor-not-allowed"
                        : `${plan.btnClass}`
                    }`}
                >
                  {isDisabled ? (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-4 h-4"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Not Available Yet
                    </>
                  ) : (
                    <>
                      Get Started
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-4 h-4"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="border-t border-white/10 mb-4" />

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.accent} flex items-center justify-center flex-shrink-0`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-3 h-3 text-white"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${isDisabled ? "text-white/30" : "text-white/70"}`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/20 text-sm mt-12">
          All plans include a{" "}
          <span className="text-white/40">14-day free trial</span>. No credit
          card required.
        </p>
      </div>
    </div>
  );
}
