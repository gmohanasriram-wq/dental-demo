"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
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
const services = [
  {
    id: "root-canal",
    index: "01",
    title: "Root Canal Treatment",
    tag: "Restorative",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    accentColor: "#0F8278",
    accentBg: "#E6F4F2",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=640&q=80&auto=format&fit=crop",
    summary:
      "Root canal treatment precisely removes infection from deep within the tooth pulp, eliminating pain and halting bacterial spread — all while keeping your natural tooth intact for life.",
    benefits: [
      { icon: "✦", text: "Complete pain relief within 24 hours" },
      { icon: "✦", text: "Saves your natural tooth structure" },
      { icon: "✦", text: "Permanently prevents reinfection" },
    ],
    duration: "60–90 min",
    sessions: "1–2 visits",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 1.2.5 2.2.5 3 0 1.5-1 3.2-1 5.5 0 3 1.3 6.5 3 6.5 1.2 0 1.5-2.5 2-2.5s.8 2.5 2 2.5c1.7 0 3-3.5 3-6.5 0-2.3-1-4-1-5.5 0-.8.5-1.8.5-3C16.5 4.8 14.5 3 12 3z" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <line x1="9.5" y1="12" x2="14.5" y2="12" />
      </svg>
    ),
  },
  {
    id: "implants",
    index: "02",
    title: "Dental Implants",
    tag: "Permanent Solution",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    accentColor: "#0EA5E9",
    accentBg: "#E0F2FE",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=640&q=80&auto=format&fit=crop",
    summary:
      "Titanium implants fuse with your jawbone to provide a permanent, bone-preserving foundation for natural-looking crowns. The gold standard for replacing missing teeth — built to last a lifetime.",
    benefits: [
      { icon: "✦", text: "30+ year lifespan with proper care" },
      { icon: "✦", text: "Restores full chewing and speech" },
      { icon: "✦", text: "Indistinguishable from natural teeth" },
    ],
    duration: "45–60 min",
    sessions: "3–4 visits",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8M8 6l4-4 4 4" />
        <rect x="7" y="10" width="10" height="5" rx="2" />
        <path d="M9 15v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5" />
      </svg>
    ),
  },
  {
    id: "whitening",
    index: "03",
    title: "Teeth Whitening",
    tag: "Cosmetic",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    accentColor: "#E8913A",
    accentBg: "#FEF4EA",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80&auto=format&fit=crop",
    summary:
      "Professional laser-activated whitening gel lifts deep intrinsic stains from enamel safely — delivering up to 8 shades of transformation in a single 60-minute session, with results that last years.",
    benefits: [
      { icon: "✦", text: "Up to 8 shades brighter in one session" },
      { icon: "✦", text: "Removes coffee, tea & tobacco stains" },
      { icon: "✦", text: "Enamel-safe, clinically proven formula" },
    ],
    duration: "60 min",
    sessions: "1 visit",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    id: "braces",
    index: "04",
    title: "Braces & Aligners",
    tag: "Orthodontics",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    accentColor: "#7C4DFF",
    accentBg: "#EDE7FF",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=640&q=80&auto=format&fit=crop",
    summary:
      "From invisible clear aligners to low-profile ceramic braces, we craft a personalised correction plan using 3D scanning technology — for a straighter, healthier bite you'll be proud to show off.",
    benefits: [
      { icon: "✦", text: "Virtually invisible aligner options" },
      { icon: "✦", text: "Corrects overbite, underbite & crowding" },
      { icon: "✦", text: "Boosts long-term oral health & confidence" },
    ],
    duration: "12–24 months",
    sessions: "Monthly reviews",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6a4 4 0 0 1 8 0v2H8V6z" />
        <rect x="4" y="8" width="16" height="10" rx="3" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="10" y1="11" x2="10" y2="15" />
        <line x1="14" y1="11" x2="14" y2="15" />
      </svg>
    ),
  },
  {
    id: "checkup",
    index: "05",
    title: "General Checkups",
    tag: "Preventive",
    tagColor: "#22C55E",
    tagBg: "#F0FDF4",
    accentColor: "#22C55E",
    accentBg: "#F0FDF4",
    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=600&q=80&auto=format&fit=crop",
    summary:
      "Comprehensive bi-annual examinations with digital X-rays, periodontal charting and professional ultrasonic scaling — catching problems at the earliest, least costly stage before they escalate.",
    benefits: [
      { icon: "✦", text: "Detects cavities & gum disease early" },
      { icon: "✦", text: "Professional deep cleaning & polishing" },
      { icon: "✦", text: "Personalised oral health risk report" },
    ],
    duration: "45–60 min",
    sessions: "Every 6 months",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   SERVICE CARD COMPONENT
───────────────────────────────────────────── */
function ServiceCard({ service, reverse }) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 5vw, 72px)",
        alignItems: "center",
        padding: "clamp(40px, 5vw, 72px) 0",
        borderBottom: "1px solid #E5F0EF",
      }}
      className={`service-card${reverse ? " service-card--reverse" : ""}`}
    >
      <style>{`
        @media (max-width: 900px) {
          .service-card { grid-template-columns: 1fr !important; }
          .service-card--reverse .service-img-col { order: 0 !important; }
        }
      `}</style>

      {/* ── Image column ── */}
      <div
        className="service-img-col"
        style={{ order: reverse ? 2 : 1, position: "relative" }}
      >
        {/* Index watermark */}
        <div
          style={{
            position: "absolute",
            top: "-24px",
            left: reverse ? "auto" : "-16px",
            right: reverse ? "-16px" : "auto",
            fontFamily: "var(--font-cormorant, 'Georgia', serif)",
            fontWeight: 700,
            fontSize: "clamp(4rem, 10vw, 8rem)",
            lineHeight: 1,
            color: service.accentColor,
            opacity: 0.07,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          {service.index}
        </div>

        {/* Image wrapper */}
        <div
          className="service-img-wrap"
          style={{
            borderRadius: "28px",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            boxShadow: `0 24px 64px rgba(0,0,0,.12), 0 4px 16px rgba(0,0,0,.06)`,
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: "100%",
              height: "clamp(260px, 30vw, 400px)",
              objectFit: "cover",
              display: "block",
              transition: "transform .7s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${service.accentColor}22 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Floating stat pill */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: reverse ? "auto" : "-20px",
            right: reverse ? "-20px" : "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px",
            borderRadius: "999px",
            background: "rgba(255,255,255,.96)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,.12)",
            border: "1px solid rgba(255,255,255,.6)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: service.accentBg,
              color: service.accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: ".7rem", color: "#8A9E9C", lineHeight: 1, marginBottom: "2px" }}>Duration</p>
            <p style={{ margin: 0, fontSize: ".8rem", fontWeight: 600, color: "#172625", lineHeight: 1 }}>{service.duration}</p>
          </div>
          <div style={{ width: "1px", height: "28px", background: "#E5E7EB" }} />
          <div>
            <p style={{ margin: 0, fontSize: ".7rem", color: "#8A9E9C", lineHeight: 1, marginBottom: "2px" }}>Visits</p>
            <p style={{ margin: 0, fontSize: ".8rem", fontWeight: 600, color: "#172625", lineHeight: 1 }}>{service.sessions}</p>
          </div>
        </div>
      </div>

      {/* ── Content column ── */}
      <div style={{ order: reverse ? 1 : 2, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Tag + index row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              padding: "5px 14px",
              borderRadius: "999px",
              fontSize: ".72rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              background: service.tagBg,
              color: service.tagColor,
            }}
          >
            {service.tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontSize: ".95rem",
              color: "#C4D4D3",
              fontWeight: 600,
            }}
          >
            / {service.index}
          </span>
        </div>

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: service.accentBg,
              color: service.accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "transform .3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(-6deg) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0) scale(1)"; }}
          >
            {service.icon}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-.02em",
              color: "#172625",
              margin: 0,
            }}
          >
            {service.title}
          </h2>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(.875rem, 1.4vw, 1rem)",
            lineHeight: 1.78,
            color: "#587070",
            margin: 0,
            maxWidth: "460px",
          }}
        >
          {service.summary}
        </p>

        {/* Benefits */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {service.benefits.map((b) => (
            <li
              key={b.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: ".875rem",
                color: "#3D5554",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: service.accentBg,
                  color: service.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: ".55rem",
                }}
              >
                {b.icon}
              </span>
              {b.text}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ marginTop: "8px" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "999px",
              background: service.accentColor,
              color: "#fff",
              fontSize: ".875rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease",
              boxShadow: `0 6px 20px ${service.accentColor}44`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 16px 36px ${service.accentColor}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 6px 20px ${service.accentColor}44`;
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(.97)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   MINI OVERVIEW CARD (top grid)
───────────────────────────────────────────── */
function OverviewCard({ service }) {
  return (
    <Link
      href={`#${service.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "24px",
        borderRadius: "24px",
        background: "#fff",
        border: "1px solid #E5F0EF",
        textDecoration: "none",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        boxShadow: "0 2px 16px rgba(0,0,0,.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,.05)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: service.accentBg,
          color: service.accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {service.icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--font-cormorant, 'Georgia', serif)",
            fontWeight: 600,
            fontSize: "1.1rem",
            color: "#172625",
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </p>
        <span
          style={{
            fontSize: ".7rem",
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: service.accentColor,
          }}
        >
          {service.tag}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: ".78rem",
          color: service.accentColor,
          fontWeight: 600,
          marginTop: "auto",
        }}
      >
        View details
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{`
        :root {
          --teal:       #0F8278;
          --teal-mid:   #12A396;
          --teal-light: #E6F4F2;
          --teal-dark:  #096158;
          --warm-white: #F8FAF9;
          --ink:        #172625;
          --muted:      #587070;
          --border:     #D8ECEA;
          --font-cormorant: 'Cormorant Garamond';
          --font-dm-sans:   'DM Sans';
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .fu1 { animation: fadeUp .7s .05s ease both; }
        .fu2 { animation: fadeUp .7s .18s ease both; }
        .fu3 { animation: fadeUp .7s .30s ease both; }
        .fu4 { animation: fadeUp .7s .42s ease both; }

        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-size: .875rem;
          font-weight: 500;
          position: relative;
          transition: color .2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: var(--teal);
          transition: width .25s ease;
        }
        .nav-link:hover { color: var(--teal); }
        .nav-link:hover::after { width: 100%; }
        .nav-link--active { color: var(--teal); }
        .nav-link--active::after { width: 100%; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
        }
      `}</style>

      <div
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{
          fontFamily: "var(--font-dm-sans, sans-serif)",
          background: "var(--warm-white)",
          color: "var(--ink)",
          minHeight: "100vh",
        }}
      >
        {/* ══════════════════════════════════════
            NAVBAR
        ══════════════════════════════════════ */}
        <Navbar activePage="Services" />

        {/* ══════════════════════════════════════
            HERO HEADER
        ══════════════════════════════════════ */}
        <header style={{ position: "relative", overflow: "hidden" }}>
          {/* Background mesh */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(135deg, #E6F4F2 0%, #F8FAF9 55%, #E0F2FE 100%)",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "radial-gradient(circle, rgba(15,130,120,.1) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Blobs */}
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "45%", height: "140%", background: "radial-gradient(ellipse, rgba(15,130,120,.12) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: "5%", width: "25%", height: "80%", background: "radial-gradient(ellipse, rgba(14,165,233,.08) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div
            style={{
              position: "relative",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "clamp(60px, 10vw, 100px) clamp(24px, 6vw, 80px) clamp(48px, 7vw, 80px)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "40px",
            }}
            className="header-grid"
          >
            <style>{`.header-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>

            {/* Left text */}
            <div style={{ maxWidth: "640px" }}>
              {/* Breadcrumb */}
              <div className="fu1" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Link href="/" style={{ fontSize: ".78rem", color: "var(--muted)", textDecoration: "none" }}>Home</Link>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span style={{ fontSize: ".78rem", color: "var(--teal)", fontWeight: 600 }}>Services</span>
              </div>

              {/* Pill */}
              <div
                className="fu1"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "7px 16px", borderRadius: "999px", marginBottom: "20px",
                  background: "var(--teal-light)", color: "var(--teal)",
                  fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                5 Specialist Treatments Available
              </div>

              <h1
                className="fu2"
                style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600,
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-.025em",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                }}
              >
                Dental Treatments<br />
                <em style={{ color: "var(--teal)", fontStyle: "italic" }}>&amp; Services</em>
              </h1>

              <p
                className="fu3"
                style={{
                  fontSize: "clamp(.9rem, 1.6vw, 1.05rem)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  margin: "0 0 28px",
                  maxWidth: "520px",
                }}
              >
                From routine preventive care to complex restorative procedures, every treatment at BrightSmile is delivered with precision, compassion and the latest clinical technology — completely painlessly.
              </p>

              {/* CTA row */}
              <div className="fu4" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "999px", fontSize: ".875rem",
                    fontWeight: 600, background: "var(--teal)", color: "#fff",
                    textDecoration: "none", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease",
                    boxShadow: "0 8px 24px rgba(15,130,120,.32)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,130,120,.38)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,130,120,.32)"; }}
                >
                  Book a Free Consultation
                </Link>
                <a
                  href="tel:+911234567890"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "999px", fontSize: ".875rem",
                    fontWeight: 500, background: "transparent", color: "var(--teal)",
                    textDecoration: "none", border: "1.5px solid var(--teal)",
                    transition: "transform .3s cubic-bezier(.34,1.56,.64,1), background .2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "var(--teal-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* Right — quick trust pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
              {[
                { icon: "🏆", label: "ISO Certified Clinic" },
                { icon: "😌", label: "100% Pain-Free Promise" },
                { icon: "💳", label: "Flexible EMI Plans" },
                { icon: "📅", label: "Same-Day Appointments" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 18px", borderRadius: "14px",
                    background: "rgba(255,255,255,.8)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                    fontSize: ".82rem", fontWeight: 500, color: "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Wave */}
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", marginTop: "-1px" }} preserveAspectRatio="none">
            <path d="M0 24C360 48 720 0 1080 28C1260 44 1380 14 1440 24L1440 48H0Z" fill="#fff" />
          </svg>
        </header>

        {/* ══════════════════════════════════════
            OVERVIEW GRID
        ══════════════════════════════════════ */}
        <section style={{ background: "#fff", paddingBottom: "0" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "48px clamp(24px, 6vw, 80px) 0",
            }}
          >
            <p
              style={{
                fontSize: ".78rem",
                fontWeight: 600,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "20px",
                margin: "0 0 20px",
              }}
            >
              Quick Navigation
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {services.map((s) => (
                <OverviewCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES DETAIL LIST
        ══════════════════════════════════════ */}
        <main
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)",
          }}
        >
          {/* Section heading */}
          <div style={{ textAlign: "center", padding: "64px 0 16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                fontWeight: 600,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-.02em",
                color: "var(--ink)",
                margin: "0 0 12px",
              }}
            >
              Explore All Treatments
            </h2>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
              Each service is tailored to your unique needs — scroll to learn more about what's right for you.
            </p>
          </div>

          {/* Alternating service cards */}
          {services.map((service, i) => (
            <div id={service.id} key={service.id} style={{ scrollMarginTop: "80px" }}>
              <ServiceCard service={service} reverse={i % 2 !== 0} />
            </div>
          ))}
        </main>

        {/* ══════════════════════════════════════
            BOTTOM CTA BAND
        ══════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #12A396 100%)",
            padding: "clamp(48px, 7vw, 80px) clamp(24px, 6vw, 80px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Texture */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em",
                textTransform: "uppercase", color: "rgba(255,255,255,.65)",
                marginBottom: "16px",
              }}
            >
              Ready to Get Started?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                color: "#fff",
                margin: "0 0 16px",
              }}
            >
              Book Your Consultation<br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.75)" }}>Today — It's Free</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "36px" }}>
              Our team will assess your dental health, discuss treatment options and provide a transparent cost estimate — with zero obligations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 32px", borderRadius: "999px", fontSize: ".875rem",
                  fontWeight: 600, background: "#fff", color: "var(--teal)",
                  textDecoration: "none", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease",
                  boxShadow: "0 8px 28px rgba(0,0,0,.18)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,.24)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.18)"; }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "scale(.96)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </Link>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 32px", borderRadius: "999px", fontSize: ".875rem",
                  fontWeight: 500, background: "transparent", color: "#fff",
                  textDecoration: "none", border: "1.5px solid rgba(255,255,255,.5)",
                  transition: "transform .3s cubic-bezier(.34,1.56,.64,1), background .2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER BAR
        ══════════════════════════════════════ */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            background: "#fff",
            padding: "24px clamp(24px, 6vw, 80px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, var(--teal), var(--teal-mid))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>BrightSmile Dental Care</span>
          </div>
          <p style={{ fontSize: ".75rem", color: "#9CA3AF", margin: 0 }}>
            © {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms"   },
              { label: "Sitemap",        href: "/sitemap" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: ".75rem", color: "#9CA3AF", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}