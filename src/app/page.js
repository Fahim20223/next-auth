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
    glow: "shadow-slate-500/20",
    border: "border-white/10",
    btnClass: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
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
    glow: "shadow-violet-500/30",
    border: "border-violet-400/40",
    btnClass:
      "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/30",
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
    glow: "shadow-amber-500/20",
    border: "border-amber-400/30",
    btnClass:
      "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold shadow-lg shadow-amber-500/20",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const [step, setStep] = useState("plans"); // "plans" | "domain" | "license"
  const [domain, setDomain] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [billing, setBilling] = useState("monthly");
  const [selected, setSelected] = useState("pro");

  // Login screen
  if (!session) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center font-sans">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl text-center w-[360px]">
          <h1 className="text-white text-2xl font-bold mb-4">Welcome Back</h1>
          <p className="text-white/40 mb-6">Sign in to continue</p>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Domain input screen for Beta
  if (step === "domain") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080c14]">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-[400px]">
          <h2 className="text-white text-xl font-bold mb-4">
            Enter Your Domain
          </h2>
          <input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white mb-4"
          />
          <button
            onClick={() => {
              const key = uuidv4();
              setLicenseKey(key);
              setStep("license");
            }}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // License key & download screen
  if (step === "license") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080c14]">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-[420px] text-center">
          <h2 className="text-white text-xl font-bold mb-4">
            Your License Key
          </h2>
          <div className="bg-black/40 border border-white/10 p-3 rounded-lg text-white mb-4">
            {licenseKey}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(licenseKey)}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-lg mr-3"
          >
            Copy Key
          </button>
          <a
            href="/beta-package.zip"
            download
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg"
          >
            Download ZIP
          </a>
        </div>
      </div>
    );
  }

  // Pricing plans screen
  return (
    <div className="min-h-screen bg-[#080c14] relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            Nexus
          </div>
          <div className="flex items-center gap-3">
            <img
              src={session.user.image}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={() => signOut()}
              className="text-red-500 hover:text-red-400"
            >
              Sign Out
            </button>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose your perfect plan
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isDisabled = plan.id !== "starter";
            return (
              <div
                key={plan.id}
                onClick={() => plan.id === "starter" && setStep("domain")}
                className={`relative rounded-3xl p-7 cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10`}
              >
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <p className="text-white/40 mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold mb-4">${plan.price}/mo</p>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm ${
                    isDisabled
                      ? "bg-white/5 text-white/30 cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-500 text-white"
                  }`}
                >
                  {plan.name === "Beta" ? "Get Started" : "Not Available Yet"}
                </button>
                <ul className="mt-4 space-y-2 text-white/70 text-sm">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
