"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Send,
  Sparkles,
  Clock,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { profile } from "@/data/profile";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Commercial",
    timeline: "Q3 2026",
    budget: "$50k - $150k",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
      {/* Header Section */}
      <div className="flex flex-col gap-4 max-w-3xl border-b border-border-subtle pb-10">
        <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profile.availability}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary leading-tight">
          Initiate a Project Conversation
        </h1>
        <p className="font-sans text-base sm:text-lg text-text-secondary font-light">
          For commercial direct bookings, narrative scripts, treatments, or
          speaking engagements, please send a brief or contact representation
          below.
        </p>
      </div>

      {/* Main Content Grid: Form on Left, Direct Contact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-surface-elevated/80 border border-border p-8 md:p-12 rounded-sm">
          {formSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center text-accent-gold">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-text-primary">
                Brief Received
              </h3>
              <p className="font-sans text-sm md:text-base text-text-secondary max-w-md">
                Thank you for reaching out. Kamsochukwu will
                review your project details and respond within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 font-mono text-xs text-accent-gold underline uppercase tracking-wider"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@studio.com"
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company / Client */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Brand / Agency / Production Co.
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Anonymous Content / Nike"
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Commercial">Commercial / Brand Film</option>
                    <option value="Feature Narrative">
                      Narrative Feature / Short
                    </option>
                    <option value="Fashion">Fashion Film / Editorial</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Documentary">Documentary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Timeline */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Production Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Immediate (Next 30 days)">
                      Immediate (Next 30 days)
                    </option>
                    <option value="Q3 2026">Q3 2026</option>
                    <option value="Q4 2026">Q4 2026</option>
                    <option value="Early 2027">Early 2027</option>
                  </select>
                </div>

                {/* Estimated Budget */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    Production Budget Scope
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Under $50k">Under $50k</option>
                    <option value="$50k - $150k">$50k - $150k</option>
                    <option value="$150k - $500k">$150k - $500k</option>
                    <option value="$500k+">$500k+</option>
                  </select>
                </div>
              </div>

              {/* Message / Brief */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                  Project Overview / Treatment Link *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Provide a synopsis, visual references, shooting locations, or link to your creative deck..."
                  className="bg-surface border border-border-subtle focus:border-accent-gold rounded px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-background font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Direct Details */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Direct Email Card */}
          <div className="p-8 rounded-sm bg-surface-elevated/40 border border-border-subtle flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Direct Contact
            </span>
            <button
              onClick={copyEmail}
              className="group flex items-center justify-between p-4 rounded bg-surface border border-border hover:border-accent-gold transition-colors text-left"
            >
              <div className="flex flex-col">
                <span className="font-mono text-sm text-text-primary">
                  {profile.contactEmail}
                </span>
                <span className="text-[10px] font-mono text-text-muted">
                  Click to copy email address
                </span>
              </div>
              <div className="p-2 rounded bg-surface-elevated text-accent-gold">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </button>

            <div className="flex flex-col gap-1 font-mono text-xs text-text-secondary pt-2">
              <span>Studio: Lagos, Nigeria</span>
              <span>Availability: Worldwide Travel & Direct Commission</span>
            </div>
          </div>

          {/* Representation Info */}
          <div className="p-8 rounded-sm bg-surface-elevated/40 border border-border-subtle flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              Worldwide Representation
            </span>

            <div className="divide-y divide-border-subtle">
              {profile.representation.map((rep, idx) => (
                <div
                  key={idx}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col gap-1"
                >
                  <span className="font-mono text-[10px] text-text-muted uppercase">
                    {rep.region}
                  </span>
                  <div className="font-serif text-lg text-text-primary">
                    {rep.agency}
                  </div>
                  <a
                    href={`mailto:${rep.email}`}
                    className="font-mono text-xs text-accent-gold-light hover:underline flex items-center gap-1"
                  >
                    <span>
                      {rep.contactName} ({rep.email})
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
