"use client";
import Navbar from "@/components/Navbar";

import Link from "next/link";
import { useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const FILTER_TAGS = ["All", "Root Canal", "Implants", "Whitening", "Braces", "General"];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer, Bangalore",
    initials: "PS",
    avatarColor: "#0F8278",
    avatarBg: "#E6F4F2",
    stars: 5,
    tag: "Root Canal",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    date: "March 2025",
    review:
      "My root canal treatment was completely painless — I was genuinely surprised. Dr. Kumar explained every step calmly and made sure I was comfortable throughout. The clinic feels more like a luxury spa than a dental office. I'll never go anywhere else.",
    highlight: "Completely painless",
    platform: "Google",
    featured: true,
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Entrepreneur, Mumbai",
    initials: "RM",
    avatarColor: "#0EA5E9",
    avatarBg: "#E0F2FE",
    stars: 5,
    tag: "Implants",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    date: "January 2025",
    review:
      "I had two implants done and the results are indistinguishable from my real teeth. The team was professional, the facility is spotless, and the transparent pricing meant no nasty surprises on the bill. Exceptional care from start to finish.",
    highlight: "Indistinguishable from real teeth",
    platform: "Google",
    featured: false,
  },
  {
    id: 3,
    name: "Ananya Krishnan",
    role: "Teacher, Chennai",
    initials: "AK",
    avatarColor: "#7C4DFF",
    avatarBg: "#EDE7FF",
    stars: 5,
    tag: "Braces",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    date: "February 2025",
    review:
      "18 months with invisible aligners and I now have the smile I always dreamed of. The team was always available to answer my questions and monthly check-ins were quick and thorough. Dr. Kumar's patience is extraordinary.",
    highlight: "The smile I always dreamed of",
    platform: "Google",
    featured: false,
  },
  {
    id: 4,
    name: "Dr. Karthik Nair",
    role: "Physician, Hyderabad",
    initials: "KN",
    avatarColor: "#E8913A",
    avatarBg: "#FEF4EA",
    stars: 5,
    tag: "Whitening",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    date: "December 2024",
    review:
      "As a doctor myself, I appreciate clinical precision. BrightSmile's whitening procedure was methodical and evidence-based. The results were immediately visible — 8 shades brighter in a single session. I now recommend this clinic to all my patients.",
    highlight: "8 shades brighter, one session",
    platform: "Practo",
    featured: false,
  },
  {
    id: 5,
    name: "Meera Pillai",
    role: "Homemaker, Kochi",
    initials: "MP",
    avatarColor: "#EF4444",
    avatarBg: "#FEF2F2",
    stars: 5,
    tag: "General",
    tagColor: "#22C55E",
    tagBg: "#F0FDF4",
    date: "November 2024",
    review:
      "I had a severe fear of dentists since childhood. Dr. Kumar's patience and the calming environment here completely changed my experience. My whole family now visits BrightSmile every six months without hesitation.",
    highlight: "Changed my entire experience",
    platform: "Google",
    featured: false,
  },
  {
    id: 6,
    name: "Vikram Reddy",
    role: "Finance Manager, Pune",
    initials: "VR",
    avatarColor: "#0F8278",
    avatarBg: "#E6F4F2",
    stars: 5,
    tag: "Root Canal",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    date: "October 2024",
    review:
      "I was dreading my root canal but BrightSmile turned it into a non-event. The procedure was over before I knew it and the recovery was smooth. The front desk staff were warm and helpful throughout the entire process.",
    highlight: "Over before I knew it",
    platform: "Practo",
    featured: false,
  },
  {
    id: 7,
    name: "Sunita Agarwal",
    role: "Architect, Delhi",
    initials: "SA",
    avatarColor: "#7C4DFF",
    avatarBg: "#EDE7FF",
    stars: 5,
    tag: "Implants",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    date: "September 2024",
    review:
      "The dental implant procedure was explained in detail with 3D imaging before we began. I appreciated the transparency and the follow-up care was equally impressive. BrightSmile truly sets the standard for premium dental care in India.",
    highlight: "Sets the standard for premium care",
    platform: "Google",
    featured: false,
  },
  {
    id: 8,
    name: "Aditya Bose",
    role: "Marketing Director, Kolkata",
    initials: "AB",
    avatarColor: "#E8913A",
    avatarBg: "#FEF4EA",
    stars: 5,
    tag: "Whitening",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    date: "August 2024",
    review:
      "Walked in with years of coffee stains and walked out with a completely transformed smile in just one hour. The team was cheerful, professional and genuinely cared about the result. Worth every rupee.",
    highlight: "Transformed in just one hour",
    platform: "Google",
    featured: false,
  },
];

const videoTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    tag: "Root Canal Treatment",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    duration: "2:34",
    thumbnail: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    tag: "Dental Implants",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    duration: "1:58",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ananya Krishnan",
    tag: "Braces & Aligners",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    duration: "3:12",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
  },
];

/* ─────────────────────────────────────────────
   STAR COMPONENT
───────────────────────────────────────────── */
function Stars({ count, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < count ? "#F5C518" : "none"} stroke="#F5C518" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PLATFORM BADGE
───────────────────────────────────────────── */
function PlatformBadge({ platform }) {
  const isGoogle = platform === "Google";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {isGoogle ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#0F8278">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )}
      <span style={{ fontSize: ".68rem", color: "#9CA3AF", fontWeight: 500 }}>{platform}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────── */
function TestimonialCard({ t, featured = false }) {
  return (
    <div
      className="group"
      style={{
        display: "flex", flexDirection: "column",
        padding: featured ? "36px" : "26px",
        borderRadius: "28px", background: "#fff",
        border: featured ? `1.5px solid #0F8278` : "1px solid #E5F0EF",
        boxShadow: featured ? "0 12px 48px rgba(15,130,120,.14)" : "0 4px 24px rgba(0,0,0,.06)",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 28px 60px rgba(0,0,0,.11)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = featured
          ? "0 12px 48px rgba(15,130,120,.14)" : "0 4px 24px rgba(0,0,0,.06)";
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: featured ? "72px" : "44px", height: "3px",
        borderRadius: "0 0 4px 4px", background: t.tagColor,
      }} />

      {/* Featured badge */}
      {featured && (
        <div style={{
          position: "absolute", top: "18px", right: "18px",
          display: "flex", alignItems: "center", gap: "5px",
          padding: "4px 12px", borderRadius: "999px",
          background: "#E6F4F2", color: "#0F8278",
          fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Featured Review
        </div>
      )}

      {/* Quote icon */}
      <div style={{ marginBottom: "16px", color: t.tagColor }}>
        <svg width={featured ? 32 : 24} height={featured ? 32 : 24} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
        </svg>
      </div>

      {/* Highlight chip */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "4px 10px", borderRadius: "999px",
        background: t.tagBg, color: t.tagColor,
        fontSize: ".68rem", fontWeight: 600, letterSpacing: ".05em",
        marginBottom: "14px", alignSelf: "flex-start",
      }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: t.tagColor, flexShrink: 0 }} />
        {t.highlight}
      </div>

      {/* Review */}
      <p style={{
        fontSize: featured ? "1rem" : ".875rem", lineHeight: 1.8,
        color: "#4B6060", margin: "0 0 20px", flex: 1, fontStyle: "italic",
      }}>
        "{t.review}"
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F0F7F6", margin: "0 0 16px" }} />

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <div style={{
            width: featured ? "44px" : "38px", height: featured ? "44px" : "38px",
            borderRadius: "50%", background: t.avatarBg, color: t.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: ".8rem", flexShrink: 0,
            border: `2px solid ${t.tagColor}22`,
          }}>
            {t.initials}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: ".875rem", color: "#172625", lineHeight: 1.2 }}>{t.name}</p>
            <p style={{ margin: 0, fontSize: ".7rem", color: "#8A9E9C", marginTop: "2px" }}>{t.role}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
          <Stars count={t.stars} size={12} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: ".65rem", color: "#C4D4D3" }}>{t.date}</span>
            <PlatformBadge platform={t.platform} />
          </div>
        </div>
      </div>

      {/* Treatment tag */}
      <div style={{ marginTop: "12px" }}>
        <span style={{
          padding: "3px 10px", borderRadius: "999px",
          fontSize: ".65rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
          background: t.tagBg, color: t.tagColor,
        }}>
          {t.tag}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIDEO CARD
───────────────────────────────────────────── */
function VideoCard({ v }) {
  return (
    <div
      style={{
        borderRadius: "24px", overflow: "hidden", background: "#fff",
        border: "1px solid #E5F0EF", boxShadow: "0 4px 24px rgba(0,0,0,.07)",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.01)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,.07)";
      }}
    >
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img src={v.thumbnail} alt={v.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .7s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,97,88,.78) 0%, rgba(0,0,0,.1) 55%)" }} />

        {/* Play btn */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "54px", height: "54px", borderRadius: "50%",
          background: "rgba(255,255,255,.95)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(0,0,0,.22)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0F8278">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>

        {/* Coming soon */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          padding: "4px 10px", borderRadius: "999px",
          background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)",
          color: "#fff", fontSize: ".65rem", fontWeight: 600,
          letterSpacing: ".1em", textTransform: "uppercase",
          border: "1px solid rgba(255,255,255,.3)",
        }}>
          Coming Soon
        </div>

        {/* Duration */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          padding: "3px 8px", borderRadius: "6px",
          background: "rgba(0,0,0,.6)", color: "#fff",
          fontSize: ".68rem", fontWeight: 600,
        }}>
          {v.duration}
        </div>

        <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
          <p style={{ margin: 0, color: "#fff", fontWeight: 600, fontSize: ".875rem", lineHeight: 1.2 }}>{v.name}</p>
          <span style={{
            display: "inline-block", marginTop: "4px",
            padding: "2px 8px", borderRadius: "999px",
            background: v.tagBg, color: v.tagColor,
            fontSize: ".65rem", fontWeight: 700,
          }}>{v.tag}</span>
        </div>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: v.tagBg, color: v.tagColor,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: ".8rem", fontWeight: 600, color: "#172625" }}>Patient Story</p>
            <p style={{ margin: 0, fontSize: ".68rem", color: "#8A9E9C" }}>Video Testimonial</p>
          </div>
        </div>
        <Stars count={5} size={11} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? testimonials
    : testimonials.filter((t) => t.tag === activeFilter);

  const featured = activeFilter === "All" ? testimonials.find((t) => t.featured) : null;
  const rest = featured ? filtered.filter((t) => !t.featured) : filtered;

  return (
    <>
      <style>{`
        :root {
          --teal:        #0F8278;
          --teal-mid:    #12A396;
          --teal-light:  #E6F4F2;
          --teal-dark:   #096158;
          --warm-white:  #F8FAF9;
          --ink:         #172625;
          --muted:       #587070;
          --border:      #D8ECEA;
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-9px); }
        }

        .fu1 { animation: fadeUp .7s .05s ease both; }
        .fu2 { animation: fadeUp .7s .18s ease both; }
        .fu3 { animation: fadeUp .7s .30s ease both; }
        .fu4 { animation: fadeUp .7s .42s ease both; }

        .nav-link {
          color: var(--muted); text-decoration: none;
          font-size: .875rem; font-weight: 500;
          position: relative; transition: color .2s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 1.5px; background: var(--teal); transition: width .25s ease;
        }
        .nav-link:hover { color: var(--teal); }
        .nav-link:hover::after { width: 100%; }
        .nav-link--active { color: var(--teal); }
        .nav-link--active::after { width: 100%; }

        .filter-btn {
          padding: 8px 20px; border-radius: 999px;
          font-size: .78rem; font-weight: 600;
          cursor: pointer; border: 1.5px solid var(--border);
          background: #fff; color: var(--muted);
          transition: all .22s ease;
        }
        .filter-btn:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-light); }
        .filter-btn--active {
          background: var(--teal); color: #fff; border-color: var(--teal);
          box-shadow: 0 6px 18px rgba(15,130,120,.28);
        }
        .filter-btn--active:hover { background: var(--teal-dark); border-color: var(--teal-dark); }

        @media (max-width: 768px) { .nav-links-desktop { display: none !important; } }
        @media (max-width: 900px)  { .header-quotes { display: none !important; } }
        @media (max-width: 900px)  { .header-inner  { grid-template-columns: 1fr !important; } }
      `}</style>

      <div
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{ fontFamily: "var(--font-dm-sans, sans-serif)", background: "var(--warm-white)", color: "var(--ink)", minHeight: "100vh" }}
      >
        <Navbar activePage="Testimonials" />
        {/* ══════════════════════════════════════
            SECTION 1 — PAGE HEADER
        ══════════════════════════════════════ */}
        <header style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #E6F4F2 0%, #F8FAF9 50%, #E0F2FE 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(15,130,120,.1) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "40%", height: "140%", background: "radial-gradient(ellipse, rgba(15,130,120,.12) 0%, transparent 65%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(24px,6vw,80px) clamp(48px,6vw,72px)" }}>
            {/* Breadcrumb */}
            <div className="fu1" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <Link href="/" style={{ fontSize: ".78rem", color: "var(--muted)", textDecoration: "none" }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span style={{ fontSize: ".78rem", color: "var(--teal)", fontWeight: 600 }}>Testimonials</span>
            </div>

            <div className="header-inner" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "48px" }}>
              <div>
                {/* Pill */}
                <div className="fu1" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "7px 16px", borderRadius: "999px", marginBottom: "20px",
                  background: "var(--teal-light)", color: "var(--teal)",
                  fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                  Real Patient Voices
                </div>

                <h1 className="fu2" style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600, fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
                  lineHeight: 1.1, letterSpacing: "-.025em",
                  color: "var(--ink)", margin: "0 0 18px",
                }}>
                  Patient{" "}
                  <em style={{ color: "var(--teal)", fontStyle: "italic" }}>Testimonials</em>
                </h1>

                <p className="fu3" style={{
                  fontSize: "clamp(.9rem,1.6vw,1.05rem)", lineHeight: 1.75,
                  color: "var(--muted)", margin: "0 0 32px", maxWidth: "500px",
                }}>
                  Hear what our patients say about their experience at BrightSmile Dental Care — real stories from real smiles transformed by our compassionate team.
                </p>

                {/* Aggregate rating bar */}
                <div className="fu4" style={{
                  display: "inline-flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
                  padding: "18px 24px", borderRadius: "20px",
                  background: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)",
                  border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                }}>
                  {/* Score */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "3rem", lineHeight: 1, color: "var(--teal)" }}>4.9</span>
                    <Stars count={5} size={15} />
                    <span style={{ fontSize: ".65rem", color: "var(--muted)", marginTop: "4px", fontWeight: 500 }}>Overall Rating</span>
                  </div>

                  <div style={{ width: "1px", height: "60px", background: "var(--border)" }} />

                  {/* Rating bars */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[{ star: 5, pct: "94%" }, { star: 4, pct: "4%" }, { star: 3, pct: "2%" }].map(({ star, pct }) => (
                      <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: ".68rem", color: "var(--muted)", width: "8px" }}>{star}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <div style={{ width: "80px", height: "5px", borderRadius: "999px", background: "#E5F0EF", overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: "999px", background: "#F5C518", width: pct }} />
                        </div>
                        <span style={{ fontSize: ".65rem", color: "var(--muted)" }}>{pct}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ width: "1px", height: "60px", background: "var(--border)" }} />

                  {/* Source counts */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { icon: "google", label: "500+ Google Reviews" },
                      { icon: "practo", label: "200+ Practo Reviews" },
                    ].map(({ icon, label }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {icon === "google" ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0F8278"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        )}
                        <span style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--ink)" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating preview cards */}
              <div className="header-quotes" style={{ display: "flex", flexDirection: "column", gap: "14px", flexShrink: 0, maxWidth: "272px" }}>
                {testimonials.slice(0, 3).map((t, i) => (
                  <div key={t.id} style={{
                    padding: "14px 16px", borderRadius: "16px",
                    background: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)", boxShadow: "0 4px 16px rgba(0,0,0,.07)",
                    animation: `floatA ${4.5 + i * 0.8}s ${i * 0.5}s ease-in-out infinite`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: t.avatarBg, color: t.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 700, flexShrink: 0 }}>{t.initials}</div>
                      <div>
                        <p style={{ margin: 0, fontSize: ".75rem", fontWeight: 600, color: "var(--ink)" }}>{t.name}</p>
                        <Stars count={t.stars} size={10} />
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: ".72rem", color: "var(--muted)", lineHeight: 1.6, fontStyle: "italic" }}>
                      "{t.review.slice(0, 75)}…"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", marginTop: "-1px" }} preserveAspectRatio="none">
            <path d="M0 24C360 48 720 0 1080 28C1260 44 1380 14 1440 24L1440 48H0Z" fill="#fff"/>
          </svg>
        </header>

        {/* ══════════════════════════════════════
            SECTION 2 — REVIEWS
        ══════════════════════════════════════ */}
        <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "6px 14px", borderRadius: "999px", marginBottom: "12px",
                  background: "var(--teal-light)", color: "var(--teal)",
                  fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                  Verified Reviews
                </div>
                <h2 style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                  letterSpacing: "-.02em", color: "var(--ink)", margin: 0, lineHeight: 1.15,
                }}>
                  What Our Patients Say
                </h2>
              </div>
              <p style={{ color: "var(--muted)", fontSize: ".875rem", lineHeight: 1.7, maxWidth: "300px", margin: 0 }}>
                {filtered.length} verified review{filtered.length !== 1 ? "s" : ""} · Sourced from Google &amp; Practo
              </p>
            </div>

            {/* Filter bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
              {FILTER_TAGS.map((tag) => (
                <button key={tag} className={`filter-btn${activeFilter === tag ? " filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(tag)}>
                  {tag}
                </button>
              ))}
            </div>

            {/* Featured card — full width */}
            {featured && (
              <div style={{ marginBottom: "24px" }}>
                <TestimonialCard t={featured} featured />
              </div>
            )}

            {/* Cards grid */}
            {rest.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "22px" }}>
                {rest.map((t) => <TestimonialCard key={t.id} t={t} />)}
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px 24px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <p style={{ fontFamily: "var(--font-cormorant, serif)", fontSize: "1.5rem", color: "var(--ink)", fontWeight: 600, margin: "0 0 8px" }}>No reviews yet for this treatment</p>
                <p style={{ color: "var(--muted)", fontSize: ".875rem" }}>More patient stories are being added regularly — check back soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Trust band ──────────────────────── */}
        <div style={{ background: "var(--teal-light)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "28px clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "48px" }}>
            {[
              { n: "4.9★", l: "Google Rating"    },
              { n: "500+", l: "Google Reviews"   },
              { n: "200+", l: "Practo Reviews"   },
              { n: "98%",  l: "Patient Retention" },
              { n: "15K+", l: "Happy Patients"   },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1.7rem", color: "var(--teal)", lineHeight: 1, display: "block" }}>{s.n}</span>
                <span style={{ fontSize: ".72rem", color: "var(--muted)", fontWeight: 500, letterSpacing: ".05em", display: "block", marginTop: "3px" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            SECTION 3 — VIDEO TESTIMONIALS
        ══════════════════════════════════════ */}
        <section style={{ background: "var(--warm-white)", padding: "clamp(64px,9vw,100px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "7px 16px", borderRadius: "999px", marginBottom: "16px",
                background: "var(--teal-light)", color: "var(--teal)",
                fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Video Stories
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                fontWeight: 600, fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.15,
              }}>
                Patient Video Testimonials
              </h2>
              <p style={{ color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 10px" }}>
                Watch our patients share their smile transformation journeys in their own words.
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "999px",
                background: "#FEF4EA", color: "#E8913A",
                fontSize: ".72rem", fontWeight: 600,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Videos coming soon — currently being recorded
              </div>
            </div>

            {/* Video cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
              {videoTestimonials.map((v) => <VideoCard key={v.id} v={v} />)}
            </div>

            {/* Notify box */}
            <div style={{
              padding: "40px", borderRadius: "24px", textAlign: "center",
              background: "#fff", border: "1.5px dashed var(--border)",
              boxShadow: "0 4px 20px rgba(0,0,0,.04)",
            }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 600, fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 8px" }}>
                Get notified when videos go live
              </h3>
              <p style={{ color: "var(--muted)", fontSize: ".875rem", margin: "0 0 24px" }}>
                Leave your email and we'll let you know when patient video stories are published.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", maxWidth: "420px", margin: "0 auto" }}>
                <input type="email" placeholder="your@email.com" style={{
                  flex: "1", minWidth: "200px", padding: "11px 18px", borderRadius: "999px",
                  border: "1.5px solid var(--border)", background: "#F8FAF9",
                  fontSize: ".875rem", color: "var(--ink)", outline: "none",
                  transition: "border-color .2s ease",
                }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--teal)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
                <button style={{
                  padding: "11px 24px", borderRadius: "999px", fontSize: ".875rem",
                  fontWeight: 600, background: "var(--teal)", color: "#fff", border: "none",
                  cursor: "pointer", transition: "transform .25s ease, box-shadow .25s ease", flexShrink: 0,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(15,130,120,.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA band ────────────────────────── */}
        <section style={{
          background: "linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #12A396 100%)",
          padding: "clamp(48px,7vw,80px) clamp(24px,6vw,80px)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "26px 26px", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: "14px" }}>
              Join Thousands of Happy Patients
            </p>
            <h2 style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontWeight: 600, fontSize: "clamp(2rem,4.5vw,3.2rem)",
              lineHeight: 1.15, letterSpacing: "-.02em",
              color: "#fff", margin: "0 0 14px",
            }}>
              Ready to Write Your<br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.75)" }}>Own Success Story?</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "32px" }}>
              Book a free consultation with Dr. Arjun Kumar and take the first step towards a healthier, more confident smile.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "999px", fontSize: ".875rem",
                fontWeight: 600, background: "#fff", color: "var(--teal)",
                textDecoration: "none", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease",
                boxShadow: "0 8px 28px rgba(0,0,0,.18)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,.22)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.18)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book Appointment
              </Link>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "999px", fontSize: ".875rem",
                fontWeight: 500, background: "transparent", color: "#fff",
                textDecoration: "none", border: "1.5px solid rgba(255,255,255,.5)",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1), background .2s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────── */}
        <footer style={{
          borderTop: "1px solid var(--border)", background: "#fff",
          padding: "24px clamp(24px,6vw,80px)",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, var(--teal), var(--teal-mid))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff"/></svg>
            </div>
            <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>BrightSmile Dental Care</span>
          </div>
          <p style={{ fontSize: ".75rem", color: "#9CA3AF", margin: 0 }}>© {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Sitemap", href: "/sitemap" }].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: ".75rem", color: "#9CA3AF", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--teal)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}
              >{label}</Link>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}