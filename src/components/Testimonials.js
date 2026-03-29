"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer, Bangalore",
    avatar: "PS",
    avatarColor: "#0F8278",
    avatarBg: "#E6F4F2",
    stars: 5,
    treatment: "Root Canal Treatment",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    quote:
      "My root canal was completely painless — I was genuinely surprised. Dr. Kumar explained every step calmly and made sure I was comfortable throughout. The clinic feels more like a spa than a dental office.",
    date: "March 2025",
  },
  {
    name: "Rohan Mehta",
    role: "Entrepreneur, Mumbai",
    avatar: "RM",
    avatarColor: "#0EA5E9",
    avatarBg: "#E0F2FE",
    stars: 5,
    treatment: "Dental Implants",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    quote:
      "I had two implants done and the results are indistinguishable from my real teeth. The team was professional, the facility is spotless, and the transparent pricing meant no nasty surprises on the bill.",
    date: "January 2025",
  },
  {
    name: "Ananya Krishnan",
    role: "Teacher, Chennai",
    avatar: "AK",
    avatarColor: "#7C4DFF",
    avatarBg: "#EDE7FF",
    stars: 5,
    treatment: "Braces & Aligners",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    quote:
      "18 months with invisible aligners and I now have the smile I always dreamed of. The team was always available to answer my questions and monthly check-ins were quick and thorough.",
    date: "February 2025",
  },
  {
    name: "Karthik Nair",
    role: "Doctor, Hyderabad",
    avatar: "KN",
    avatarColor: "#E8913A",
    avatarBg: "#FEF4EA",
    stars: 5,
    treatment: "Teeth Whitening",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    quote:
      "As a doctor myself, I appreciate clinical precision. BrightSmile's whitening procedure was methodical and evidence-based — and the results were immediately visible. I recommend this clinic to all my patients.",
    date: "December 2024",
  },
  {
    name: "Meera Pillai",
    role: "Homemaker, Kochi",
    avatar: "MP",
    avatarColor: "#EF4444",
    avatarBg: "#FEF2F2",
    stars: 5,
    treatment: "General Cleaning",
    tagColor: "#EF4444",
    tagBg: "#FEF2F2",
    quote:
      "I had a fear of dentists since childhood. Dr. Kumar's patience and the calming environment here completely changed my experience. My whole family now visits BrightSmile regularly.",
    date: "November 2024",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#F5C518" : "none"}
          stroke="#F5C518"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  // Show 3 cards centered around active on desktop
  const visible = [-1, 0, 1].map((offset) => ({
    data: testimonials[(active + offset + testimonials.length) % testimonials.length],
    offset,
  }));

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Teal wave top */}
      <div className="absolute top-0 left-0 right-0 leading-none overflow-hidden">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: "44px" }}>
          <path d="M0 30C360 60 720 0 1080 36C1260 52 1380 18 1440 30L1440 0H0Z" fill="#F8FAF9" />
        </svg>
      </div>

      {/* BG mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(15,130,120,.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "#E6F4F2", color: "#0F8278" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
            Patient Stories
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-.02em",
              lineHeight: 1.15,
            }}
          >
            What Our Patients Say
          </h2>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-gray-800">4.9</span>
            <span className="text-gray-400 text-sm">from 500+ Google reviews</span>
          </div>
        </div>

        {/* Desktop: 3-card carousel */}
        <div className="hidden md:flex items-center gap-6">
          {/* Prev */}
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200 hover:shadow-lg active:scale-90"
            style={{ borderColor: "#0F8278", color: "#0F8278", background: "#fff", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex flex-1 gap-5 items-stretch">
            {visible.map(({ data: t, offset }) => (
              <div
                key={t.name + offset}
                className="flex flex-col p-7 rounded-3xl border transition-all duration-500"
                style={{
                  flex: offset === 0 ? "1.3" : "1",
                  background: offset === 0 ? "#fff" : "#F8FAF9",
                  borderColor: offset === 0 ? "#0F8278" : "#E5E7EB",
                  boxShadow: offset === 0 ? "0 12px 40px rgba(15,130,120,.15)" : "0 2px 12px rgba(0,0,0,.05)",
                  opacity: offset === 0 ? 1 : 0.7,
                  transform: offset === 0 ? "scale(1.02)" : "scale(0.97)",
                }}
              >
                {/* Quote icon */}
                <div className="mb-4" style={{ color: offset === 0 ? "#0F8278" : "#D1D5DB" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6" style={{ fontSize: offset === 0 ? ".9rem" : ".82rem" }}>
                  "{t.quote}"
                </p>

                {/* Treatment tag */}
                <div className="mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: t.tagBg, color: t.tagColor }}
                  >
                    {t.treatment}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "#F3F4F6" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: t.avatarBg, color: t.avatarColor }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Stars count={t.stars} />
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200 hover:shadow-lg active:scale-90"
            style={{ borderColor: "#0F8278", color: "#0F8278", background: "#fff", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <div
            className="flex flex-col p-7 rounded-3xl border bg-white"
            style={{ borderColor: "#0F8278", boxShadow: "0 12px 40px rgba(15,130,120,.15)" }}
          >
            <div className="mb-4" style={{ color: "#0F8278" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">"{testimonials[active].quote}"</p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start"
              style={{ background: testimonials[active].tagBg, color: testimonials[active].tagColor }}>
              {testimonials[active].treatment}
            </span>
            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "#F3F4F6" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: testimonials[active].avatarBg, color: testimonials[active].avatarColor }}>
                  {testimonials[active].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{testimonials[active].name}</p>
                  <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
                </div>
              </div>
              <Stars count={testimonials[active].stars} />
            </div>
          </div>

          {/* Mobile dots + arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-9 h-9 rounded-full border-2 flex items-center justify-center active:scale-90 transition-transform"
              style={{ borderColor: "#0F8278", color: "#0F8278", background: "#fff", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    background: i === active ? "#0F8278" : "#D1D5DB",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full border-2 flex items-center justify-center active:scale-90 transition-transform"
              style={{ borderColor: "#0F8278", color: "#0F8278", background: "#fff", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop dots */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                background: i === active ? "#0F8278" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}