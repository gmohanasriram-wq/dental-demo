"use client";
import { useState } from "react";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM", open: true },
  { day: "Saturday",        time: "9:00 AM – 6:00 PM", open: true },
  { day: "Sunday",          time: "10:00 AM – 2:00 PM", open: true },
  { day: "Public Holidays", time: "Emergency only",     open: false },
];

export default function ContactMap() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#F8FAF9" }}
    >
      {/* BG mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(15,130,120,.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "#E6F4F2", color: "#0F8278" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
            Find Us
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-.02em",
              lineHeight: 1.15,
            }}
          >
            Location &amp; Contact
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ── Left: info cards ─────────────────────── */}
          <div className="flex flex-col gap-5">
            {/* Address */}
            <div
              className="group flex items-start gap-4 p-6 rounded-3xl bg-white border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
              onClick={() => window.open("https://maps.google.com/?q=BrightSmile+Dental+Care", "_blank")}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "#E6F4F2", color: "#0F8278" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-1">Clinic Address</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  12, MG Road, Near City Hospital,<br />
                  Bangalore – 560 001, Karnataka, India
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium mt-2"
                  style={{ color: "#0F8278" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Get directions
                </span>
              </div>
            </div>

            {/* Phone */}
            <div
              className="group flex items-start gap-4 p-6 rounded-3xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "#E0F2FE", color: "#0EA5E9" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-1">Phone & Email</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+911234567890" className="text-sm font-medium" style={{ color: "#0F8278", textDecoration: "none" }}>
                    +91 12345 67890
                  </a>
                  <span className="text-gray-300">|</span>
                  <a href="mailto:care@brightsmile.in" className="text-sm font-medium" style={{ color: "#0F8278", textDecoration: "none" }}>
                    care@brightsmile.in
                  </a>
                </div>
                <button
                  onClick={() => handleCopy("+911234567890")}
                  className="inline-flex items-center gap-1.5 text-xs mt-2 px-3 py-1 rounded-full border transition-all duration-200 active:scale-95"
                  style={{
                    border: "1px solid #E0F2FE",
                    color: copied ? "#0F8278" : "#0EA5E9",
                    background: copied ? "#E6F4F2" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {copied ? (
                    <>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy number
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hours */}
            <div
              className="p-6 rounded-3xl bg-white border border-gray-100"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FEF4EA", color: "#E8913A" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">Working Hours</p>
              </div>

              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{h.day}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: h.open ? "#22C55E" : "#EF4444" }}
                      />
                      <span className={`text-sm font-medium ${h.open ? "text-gray-800" : "text-gray-400"}`}>
                        {h.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 flex items-center gap-2 p-3 rounded-2xl"
                style={{ background: "#E6F4F2" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                <span className="text-xs font-medium" style={{ color: "#0F8278" }}>
                  We're open now · closes at 8:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Map ────────────────────────────── */}
          <div className="flex flex-col gap-5 h-full">
            <div
              className="rounded-3xl overflow-hidden flex-1"
              style={{
                minHeight: "400px",
                boxShadow: "0 8px 40px rgba(0,0,0,.10)",
                border: "4px solid #fff",
              }}
            >
              <iframe
                title="BrightSmile Dental Care Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.086082561!2d77.59455!3d12.97194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://maps.google.com/?q=BrightSmile+Dental+Care+MG+Road+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0F8278, #096158)",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Get Directions
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                style={{
                  background: "#fff",
                  color: "#0F8278",
                  border: "2px solid #0F8278",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative mt-20 border-t pt-10"
        style={{ borderColor: "#E5E7EB" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F8278, #096158)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff" />
              </svg>
            </div>
            <span
              className="font-bold"
              style={{ fontFamily: "var(--font-cormorant, 'Georgia', serif)", fontSize: "1.1rem" }}
            >
              BrightSmile Dental Care
            </span>
          </div>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-gray-400 hover:text-teal-600 transition-colors"
                style={{ textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}