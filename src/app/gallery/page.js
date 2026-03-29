"use client";
import Navbar from "@/components/Navbar";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
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

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const FILTERS = ["All", "Clinic Interior", "Equipment", "Treatment Rooms", "Team"];

const clinicImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop",
    alt: "Modern dental reception and waiting area",
    category: "Clinic Interior",
    label: "Reception & Waiting Area",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1643660526741-094639fbe53a?w=600&q=80&auto=format&fit=crop",
    alt: "Advanced dental treatment chair",
    category: "Equipment",
    label: "Treatment Chair",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80&auto=format&fit=crop",
    alt: "Dental treatment in progress",
    category: "Treatment Rooms",
    label: "Treatment in Progress",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80&auto=format&fit=crop",
    alt: "Dental implant equipment",
    category: "Equipment",
    label: "Implant Technology",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop",
    alt: "Dentist consultation room",
    category: "Treatment Rooms",
    label: "Consultation Room",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop",
    alt: "Sterile dental instruments",
    category: "Equipment",
    label: "Sterilised Instruments",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80&auto=format&fit=crop",
    alt: "Dental clinic waiting lounge",
    category: "Clinic Interior",
    label: "Patient Lounge",
    span: "col-span-2 row-span-1",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80&auto=format&fit=crop",
    alt: "Digital X-ray equipment",
    category: "Equipment",
    label: "Digital X-Ray Suite",
    span: "col-span-1 row-span-1",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80&auto=format&fit=crop",
    alt: "Orthodontics treatment room",
    category: "Treatment Rooms",
    label: "Orthodontics Bay",
    span: "col-span-1 row-span-1",
  },
];

const transformations = [
  {
    id: 1,
    title: "Teeth Whitening",
    subtitle: "Professional laser whitening — 1 session",
    duration: "60 min",
    tag: "Cosmetic",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1670250721717-889b17349fc4?w=600&q=80&auto=format&fit=crop",
    result: "8 shades brighter",
    resultColor: "#E8913A",
  },
  {
    id: 2,
    title: "Braces Alignment",
    subtitle: "Ceramic braces — 18 months treatment",
    duration: "18 months",
    tag: "Orthodontics",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    before: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1606811842243-af7e16970c1f?w=600&q=80&auto=format&fit=crop",
    result: "Perfect alignment",
    resultColor: "#7C4DFF",
  },
  {
    id: 3,
    title: "Smile Makeover",
    subtitle: "Veneers + whitening + gum contouring",
    duration: "3 visits",
    tag: "Full Makeover",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    before: "https://images.unsplash.com/photo-1560070201-d3d11effa179?w=600&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80&auto=format&fit=crop",
    result: "Complete transformation",
    resultColor: "#0F8278",
  },
];

/* ─────────────────────────────────────────────────────────
   BEFORE/AFTER SLIDER CARD
───────────────────────────────────────────────────────── */
function SliderCard({ item }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      style={{
        borderRadius: "28px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #E5F0EF",
        boxShadow: "0 6px 32px rgba(0,0,0,.07)",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,0,0,.07)";
      }}
    >
      {/* Drag area */}
      <div
        ref={containerRef}
        className="relative select-none cursor-ew-resize"
        style={{ height: "280px" }}
        onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
        onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={(e) => updatePos(e.touches[0].clientX)}
        onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      >
        {/* AFTER (full) */}
        <img
          src={item.after}
          alt={`After ${item.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* BEFORE (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={item.before}
            alt={`Before ${item.title}`}
            className="absolute inset-0 h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth || 400 }}
          />
        </div>

        {/* Drag instruction chip */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none"
          style={{ background: "rgba(0,0,0,.52)", color: "#fff", backdropFilter: "blur(6px)", zIndex: 10 }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Drag
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>

        {/* Before / After labels */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(239,68,68,.88)", color: "#fff", opacity: pos > 12 ? 1 : 0, transition: "opacity .2s", pointerEvents: "none" }}
        >
          Before
        </div>
        <div
          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(15,130,120,.88)", color: "#fff", opacity: pos < 88 ? 1 : 0, transition: "opacity .2s", pointerEvents: "none" }}
        >
          After
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center"
          style={{ left: `${pos}%`, transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none" }}
        >
          <div style={{ width: "2px", height: "100%", background: "rgba(255,255,255,.85)" }} />
          <div
            className="absolute flex items-center justify-center"
            style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,.22)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F8278" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div style={{ padding: "20px 24px" }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: item.tagBg, color: item.tagColor }}
            >
              {item.tag}
            </span>
            <span className="text-xs text-gray-400">{item.duration}</span>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: item.tagBg, color: item.tagColor }}
          >
            {item.result}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-cormorant, 'Georgia', serif)",
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#172625",
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs">{item.subtitle}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GALLERY IMAGE CARD
───────────────────────────────────────────────────────── */
function GalleryCard({ img, onClick }) {
  return (
    <div
      className={`${img.span} relative group rounded-2xl overflow-hidden cursor-zoom-in`}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,.07)",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        minHeight: "200px",
      }}
      onClick={() => onClick(img)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.07)";
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ display: "block" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top, rgba(9,97,88,.82) 0%, transparent 55%)" }}
      >
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-2"
          style={{ background: "rgba(255,255,255,.18)", color: "#fff", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,.25)" }}
        >
          {img.category}
        </span>
        <p className="text-white font-semibold text-sm leading-tight">{img.label}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="text-xs" style={{ color: "rgba(255,255,255,.7)" }}>Click to enlarge</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────── */
function Lightbox({ img, onClose, onPrev, onNext }) {
  if (!img) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(5,20,19,.92)", backdropFilter: "blur(12px)", zIndex: 999 }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Image */}
        <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,.4)" }}>
          <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ maxHeight: "75vh" }} />
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div>
            <p className="text-white font-semibold text-sm">{img.label}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,.5)" }}>{img.category}</p>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(15,130,120,.3)", color: "#7DD4CE", border: "1px solid rgba(15,130,120,.4)" }}
          >
            BrightSmile Dental Care
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeFilter === "All"
    ? clinicImages
    : clinicImages.filter((img) => img.category === activeFilter);

  const openLightbox = (img) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => {
    const idx = filtered.findIndex((i) => i.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const nextImage = () => {
    const idx = filtered.findIndex((i) => i.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

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
          to   { opacity: 1; transform: translateY(0);    }
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
          color: var(--muted); text-decoration: none;
          font-size: .875rem; font-weight: 500;
          position: relative; transition: color .2s ease;
        }
        .nav-link::after {
          content: ''; position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: var(--teal); transition: width .25s ease;
        }
        .nav-link:hover { color: var(--teal); }
        .nav-link:hover::after { width: 100%; }
        .nav-link--active { color: var(--teal); }
        .nav-link--active::after { width: 100%; }

        .filter-btn {
          padding: 8px 20px; border-radius: 999px;
          font-size: .8rem; font-weight: 600;
          cursor: pointer; border: 1.5px solid var(--border);
          background: #fff; color: var(--muted);
          transition: all .25s ease;
        }
        .filter-btn:hover { border-color: var(--teal); color: var(--teal); }
        .filter-btn--active {
          background: var(--teal); color: #fff;
          border-color: var(--teal);
          box-shadow: 0 6px 20px rgba(15,130,120,.28);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 220px;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
          .col-span-2 { grid-column: span 1 !important; }
          .row-span-2 { grid-row: span 1 !important; }
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 220px; }
          .col-span-2 { grid-column: span 1 !important; }
          .row-span-2 { grid-row: span 1 !important; }
        }
        @media (max-width: 768px) { .nav-links-desktop { display: none !important; } }
      `}</style>

      <div
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{ fontFamily: "var(--font-dm-sans, sans-serif)", background: "var(--warm-white)", color: "var(--ink)", minHeight: "100vh" }}
      >
        <Navbar activePage="Gallery" />

        {/* ══════════════════════════════════════════════
            SECTION 1 — PAGE HEADER
        ══════════════════════════════════════════════ */}
        <header style={{ position: "relative", overflow: "hidden" }}>
          {/* BG */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #E6F4F2 0%, #F8FAF9 50%, #E0F2FE 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(15,130,120,.1) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "40%", height: "140%", background: "radial-gradient(ellipse, rgba(15,130,120,.13) 0%, transparent 65%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(24px,6vw,80px) clamp(48px,6vw,72px)" }}>
            {/* Breadcrumb */}
            <div className="fu1 flex items-center gap-2 mb-6">
              <Link href="/" style={{ fontSize: ".78rem", color: "var(--muted)", textDecoration: "none" }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span style={{ fontSize: ".78rem", color: "var(--teal)", fontWeight: 600 }}>Gallery</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "40px" }} className="header-inner">
              <style>{`@media(max-width:768px){.header-inner{grid-template-columns:1fr !important;}}`}</style>

              <div>
                {/* Pill */}
                <div className="fu1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
                  style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                  Inside BrightSmile
                </div>

                <h1 className="fu2" style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600, fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
                  lineHeight: 1.1, letterSpacing: "-.025em",
                  color: "var(--ink)", margin: "0 0 18px",
                }}>
                  Clinic{" "}
                  <em style={{ color: "var(--teal)", fontStyle: "italic" }}>Gallery</em>
                </h1>

                <p className="fu3" style={{
                  fontSize: "clamp(.9rem,1.6vw,1.05rem)", lineHeight: 1.75,
                  color: "var(--muted)", margin: 0, maxWidth: "520px",
                }}>
                  Take a look inside our modern dental clinic and see how we create confident smiles every day — from our state-of-the-art equipment to our calming patient spaces.
                </p>
              </div>

              {/* Stats */}
              <div className="fu4 flex flex-col gap-3">
                {[
                  { n: "3,200+", l: "sq. ft. Clinic"     },
                  { n: "6",      l: "Treatment Rooms"     },
                  { n: "ISO",    l: "Certified Facility"  },
                  { n: "2024",   l: "Last Renovated"      },
                ].map((s) => (
                  <div key={s.l} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 18px", borderRadius: "14px",
                    background: "rgba(255,255,255,.8)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                    whiteSpace: "nowrap",
                  }}>
                    <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1.3rem", color: "var(--teal)", lineHeight: 1 }}>{s.n}</span>
                    <span style={{ fontSize: ".75rem", color: "var(--muted)", fontWeight: 500 }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", marginTop: "-1px" }} preserveAspectRatio="none">
            <path d="M0 24C360 48 720 0 1080 28C1260 44 1380 14 1440 24L1440 48H0Z" fill="#fff"/>
          </svg>
        </header>

        {/* ══════════════════════════════════════════════
            SECTION 2 — CLINIC GALLERY
        ══════════════════════════════════════════════ */}
        <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold tracking-widest uppercase"
                  style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block", animation: "pulse 2s infinite" }} />
                  Clinic Spaces
                </div>
                <h2 style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                  letterSpacing: "-.02em", color: "var(--ink)", margin: 0, lineHeight: 1.15,
                }}>
                  Our Modern Facility
                </h2>
              </div>
              <p style={{ color: "var(--muted)", fontSize: ".875rem", lineHeight: 1.7, maxWidth: "340px", margin: 0 }}>
                Every corner of BrightSmile is designed for your comfort, hygiene and peace of mind.
              </p>
            </div>

            {/* Filter bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-btn${activeFilter === f ? " filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
              <span style={{ marginLeft: "auto", fontSize: ".78rem", color: "var(--muted)", alignSelf: "center" }}>
                {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Masonry grid */}
            <div className="gallery-grid">
              {filtered.map((img) => (
                <GalleryCard key={img.id} img={img} onClick={openLightbox} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            DIVIDER BAND
        ══════════════════════════════════════════════ */}
        <div style={{ background: "var(--teal-light)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "28px clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "40px" }}>
            {[
              { icon: "🦷", text: "Digital X-Ray Technology" },
              { icon: "🧼", text: "Hospital-Grade Sterilisation" },
              { icon: "🛋️", text: "Comfort-First Patient Spaces" },
              { icon: "⚡", text: "Same-Day Procedures Available" },
              { icon: "♿", text: "Fully Accessible Facility" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: ".82rem", fontWeight: 500, color: "var(--ink)" }}>
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 3 — SMILE TRANSFORMATIONS
        ══════════════════════════════════════════════ */}
        <section style={{ background: "var(--warm-white)", padding: "clamp(64px,9vw,100px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
                style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                Real Patient Results
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                fontWeight: 600, fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 16px", lineHeight: 1.15,
              }}>
                Smile Transformations
              </h2>
              <p style={{ color: "var(--muted)", fontSize: ".95rem", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto" }}>
                Drag the slider to see the real before &amp; after results our patients have experienced at BrightSmile.
              </p>

              {/* Disclaimer */}
              <p style={{ color: "#9CA3AF", fontSize: ".72rem", marginTop: "10px" }}>
                * Individual results may vary. All photos are from actual BrightSmile patients with consent.
              </p>
            </div>

            {/* Transformation cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
              {transformations.map((item) => (
                <SliderCard key={item.id} item={item} />
              ))}
            </div>

            {/* CTA under transformations */}
            <div style={{
              marginTop: "56px", padding: "40px 40px",
              borderRadius: "28px", textAlign: "center",
              background: "linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #12A396 100%)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".75rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Start Your Journey
                </p>
                <h3 style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontWeight: 600, fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-.02em",
                }}>
                  Your Transformation Awaits
                </h3>
                <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 28px" }}>
                  Book a free consultation today and our specialists will design a personalised treatment plan just for your smile.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "13px 28px", borderRadius: "999px", fontSize: ".875rem",
                      fontWeight: 600, background: "#fff", color: "var(--teal)",
                      textDecoration: "none", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease",
                      boxShadow: "0 8px 28px rgba(0,0,0,.18)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,.24)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.18)"; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/services"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "13px 28px", borderRadius: "999px", fontSize: ".875rem",
                      fontWeight: 500, background: "transparent", color: "#fff",
                      textDecoration: "none", border: "1.5px solid rgba(255,255,255,.5)",
                      transition: "transform .3s cubic-bezier(.34,1.56,.64,1), background .2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    View All Treatments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer bar ────────────────────────────── */}
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

      {/* ── Lightbox ─────────────────────────────── */}
      <Lightbox img={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
    </>
  );
}