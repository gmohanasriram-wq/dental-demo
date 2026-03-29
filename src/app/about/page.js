"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const credentials = [
  { label: "BDS",  detail: "Bachelor of Dental Surgery — Rajiv Gandhi University, 2008" },
  { label: "MDS",  detail: "Master of Dental Surgery (Prosthodontics) — NIMHANS, 2012" },
  { label: "FICD", detail: "Fellow, International College of Dentists" },
  { label: "ADA",  detail: "Member, American Dental Association" },
];

const stats = [
  { value: "12+",  label: "Years Experience", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>), color:"#0F8278", bg:"#E6F4F2" },
  { value: "5K+",  label: "Patients Treated", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>), color:"#E8913A", bg:"#FEF4EA" },
  { value: "98%",  label: "Satisfaction Rate", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>), color:"#EF4444", bg:"#FEF2F2" },
  { value: "15+",  label: "Awards & Honours", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>), color:"#7C4DFF", bg:"#EDE7FF" },
];

const specializations = [
  "Painless Dentistry",
  "Smile Makeovers",
  "Dental Implants",
  "Cosmetic Veneers",
  "Invisible Aligners",
  "Full Mouth Rehab",
];

const philosophy = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Patient-First Care",
    body: "Every decision we make begins with a single question: what is best for this patient? We listen before we treat.",
    color: "#EF4444", bg: "#FEF2F2",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Evidence-Based Practice",
    body: "We stay current with the latest peer-reviewed research and clinical techniques to deliver treatments that truly work.",
    color: "#0EA5E9", bg: "#E0F2FE",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "Radical Transparency",
    body: "Clear treatment plans, honest timelines, and itemised pricing — no surprises, no hidden costs, ever.",
    color: "#7C4DFF", bg: "#EDE7FF",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Comfortable Environment",
    body: "From soothing decor to gentle music — we engineered every detail of our clinic to ease dental anxiety.",
    color: "#0F8278", bg: "#E6F4F2",
  },
];

const timeline = [
  { year: "2008", event: "Graduated BDS with distinction from Rajiv Gandhi University of Health Sciences" },
  { year: "2010", event: "Completed advanced implantology training at the Misch International Institute, USA" },
  { year: "2012", event: "Awarded MDS in Prosthodontics — gold medallist of the batch" },
  { year: "2013", event: "Founded BrightSmile Dental Care with a vision of accessible premium dentistry" },
  { year: "2017", event: "Elected Fellow of the International College of Dentists (FICD)" },
  { year: "2020", event: "Introduced CAD/CAM same-day crown technology at BrightSmile" },
  { year: "2024", event: "Recognised among India's Top 50 Cosmetic Dentists by Dental Tribune" },
];

const clinicPhotos = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&q=80&auto=format&fit=crop",
    alt: "Modern treatment room",
    label: "Treatment Room",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1643660526741-094639fbe53a?w=600&q=80&auto=format&fit=crop",
    alt: "Dental chair",
    label: "Dental Chair",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80&auto=format&fit=crop",
    alt: "Advanced dental equipment",
    label: "Advanced Equipment",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&auto=format&fit=crop",
    alt: "Waiting area",
    label: "Waiting Area",
    span: "col-span-2",
  },
];

/* ─────────────────────────────────────────
   SMALL SHARED COMPONENTS
───────────────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center mb-5">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{ background: "#E6F4F2", color: "#0F8278" }}
      >
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
        {text}
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2
      className="font-bold text-gray-900"
      style={{
        fontFamily: "var(--font-cormorant, 'Georgia', serif)",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        lineHeight: 1.15,
        letterSpacing: "-.02em",
      }}
    >
      {children}
    </h2>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function AboutPage() {
  const [lightbox, setLightbox] = useState(null);

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
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(.94); }
          to   { opacity:1; transform:scale(1);   }
        }
        @keyframes floatY {
          0%,100%{ transform:translateY(0);  }
          50%    { transform:translateY(-8px);}
        }
        @keyframes pulse-ring {
          0%  { transform:scale(.9); opacity:.7; }
          70% { transform:scale(1.25); opacity:0; }
          100%{ transform:scale(.9); opacity:0; }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .fu1{ animation: fadeUp .7s .05s ease both; }
        .fu2{ animation: fadeUp .7s .18s ease both; }
        .fu3{ animation: fadeUp .7s .30s ease both; }
        .fu4{ animation: fadeUp .7s .44s ease both; }
        .fu5{ animation: fadeUp .7s .56s ease both; }
        .si { animation: scaleIn .9s .12s ease both; }
        .float{ animation: floatY 5s ease-in-out infinite; }

        .pill-dot{ position:relative; }
        .pill-dot::after{
          content:''; position:absolute; inset:0; border-radius:50%;
          background:var(--teal);
          animation: pulse-ring 2s ease-out infinite;
        }

        .nav-link{
          color: var(--muted); text-decoration:none; font-size:.875rem;
          font-weight:500; position:relative; transition:color .2s;
        }
        .nav-link::after{
          content:''; position:absolute; bottom:-3px; left:0;
          width:0; height:1.5px; background:var(--teal);
          transition: width .25s ease;
        }
        .nav-link:hover{ color:var(--teal); }
        .nav-link:hover::after{ width:100%; }

        .stat-card{
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease;
        }
        .stat-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0,0,0,.1);
        }

        .gallery-card{ overflow:hidden; border-radius:20px; cursor:pointer; }
        .gallery-card img{
          width:100%; height:100%; object-fit:cover; display:block;
          transition: transform .6s ease;
        }
        .gallery-card:hover img{ transform:scale(1.07); }
        .gallery-card .overlay{
          opacity:0; transition: opacity .3s ease;
        }
        .gallery-card:hover .overlay{ opacity:1; }

        .timeline-line{
          position:absolute; left:19px; top:0; bottom:0;
          width:2px; background:var(--border);
        }

        .philosophy-card{
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease;
        }
        .philosophy-card:hover{
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,.09);
        }

        .btn-primary{
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:999px; font-size:.875rem;
          font-weight:500; cursor:pointer; text-decoration:none;
          background:var(--teal); color:#fff; border:none;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                      box-shadow .3s ease, background .2s;
        }
        .btn-primary:hover{
          background:var(--teal-dark); transform:translateY(-3px);
          box-shadow:0 14px 32px rgba(15,130,120,.32);
        }
        .btn-outline{
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:999px; font-size:.875rem;
          font-weight:500; cursor:pointer; text-decoration:none;
          background:transparent; color:var(--teal);
          border:1.5px solid var(--teal);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                      box-shadow .3s ease, background .2s;
        }
        .btn-outline:hover{
          background:var(--teal-light); transform:translateY(-3px);
          box-shadow:0 10px 24px rgba(15,130,120,.14);
        }

        .dot-grid{
          background-image: radial-gradient(circle, rgba(15,130,120,.16) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }

        @media(max-width:768px){
          .nav-links-desktop{ display:none !important; }
          .profile-grid{ grid-template-columns:1fr !important; }
          .gallery-grid{ grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:480px){
          .gallery-grid{ grid-template-columns:1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily:"var(--font-dm-sans,'DM Sans',sans-serif)", background:"var(--warm-white)", color:"var(--ink)", minHeight:"100vh" }}>

        {/* <Navbar activePage="About" /> */}
        <Navbar activePage="About" />

{/* Breadcrumb */}
<div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px clamp(24px,6vw,80px) 0", display: "flex", alignItems: "center", gap: 8, fontSize: ".85rem", color: "var(--muted)" }}>
  <a href="/" style={{ color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
    onMouseEnter={e => e.currentTarget.style.color = "var(--teal)"}
    onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
  >Home</a>
  <span>›</span>
  <span style={{ color: "var(--teal)", fontWeight: 500 }}>About</span>
</div>

        {/* ══════════════════════════════════════════
            SECTION 1 — DOCTOR PROFILE
        ══════════════════════════════════════════ */}
        <section style={{ position:"relative", overflow:"hidden", paddingTop:"clamp(56px,8vw,96px)", paddingBottom:"clamp(56px,8vw,96px)" }}>
          {/* Ambient blobs */}
          <div style={{ position:"absolute", top:"-10%", right:"-8%", width:"50%", height:"110%", background:"radial-gradient(ellipse at 70% 30%,rgba(180,230,225,.4) 0%,transparent 65%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, left:"-6%", width:"28%", height:"50%", background:"radial-gradient(ellipse at 30% 80%,rgba(180,230,225,.2) 0%,transparent 70%)", pointerEvents:"none" }}/>

          <div
            className="profile-grid"
            style={{
              position:"relative", maxWidth:1280, margin:"0 auto",
              padding:"0 clamp(24px,6vw,80px)",
              display:"grid", gridTemplateColumns:"1fr 1.15fr",
              alignItems:"center", gap:"clamp(40px,6vw,80px)",
            }}
          >
            {/* ── LEFT: Photo ── */}
            <div className="si" style={{ position:"relative" }}>
              {/* Dot grid decoration */}
              <div className="dot-grid" style={{ position:"absolute", top:-24, left:-24, width:160, height:160, borderRadius:16, pointerEvents:"none", zIndex:0 }}/>
              {/* Teal blob */}
              <div style={{ position:"absolute", bottom:-28, right:-20, width:130, height:130, borderRadius:"50%", background:"var(--teal-light)", pointerEvents:"none", zIndex:0 }}/>

              <div style={{
                position:"relative", zIndex:1,
                borderRadius:28, overflow:"hidden",
                boxShadow:"0 40px 80px rgba(15,130,120,.18), 0 8px 24px rgba(0,0,0,.09)",
                border:"4px solid #fff",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85&auto=format&fit=crop&crop=face"
                  alt="Dr. Arjun Kumar"
                  style={{ width:"100%", display:"block", objectFit:"cover", height:"clamp(340px,46vw,560px)", transition:"transform .7s ease" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                />
                {/* Gradient overlay */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(15,130,120,.22) 0%,transparent 55%)", pointerEvents:"none" }}/>
                {/* Name badge on photo */}
                <div style={{
                  position:"absolute", bottom:20, left:20, right:20,
                  background:"rgba(255,255,255,.88)", backdropFilter:"blur(10px)",
                  borderRadius:16, padding:"14px 18px",
                  display:"flex", alignItems:"center", gap:12,
                  border:"1px solid rgba(255,255,255,.9)",
                }}>
                  <div style={{
                    width:42, height:42, borderRadius:"50%",
                    background:"linear-gradient(135deg,var(--teal),var(--teal-mid))",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontWeight:700, fontSize:".85rem", flexShrink:0,
                  }}>AK</div>
                  <div>
                    <p style={{ margin:0, fontWeight:700, fontSize:".9rem", color:"var(--ink)" }}>Dr. Arjun Kumar</p>
                    <p style={{ margin:0, fontSize:".72rem", color:"var(--muted)", marginTop:2 }}>BDS, MDS · Chief Dental Surgeon</p>
                  </div>
                  <div style={{ marginLeft:"auto", display:"flex", gap:2 }}>
                    {[1,2,3,4,5].map(i=>(
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — Experience */}
              <div className="float" style={{
                position:"absolute", top:"18%", right:-28, zIndex:2,
                display:"flex", alignItems:"center", gap:10,
                padding:"12px 16px", borderRadius:18,
                background:"rgba(255,255,255,.93)", backdropFilter:"blur(12px)",
                border:"1px solid var(--border)",
                boxShadow:"0 8px 32px rgba(0,0,0,.08)",
              }}>
                <div style={{ width:36, height:36, borderRadius:10, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--teal)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p style={{ margin:0, fontFamily:"var(--font-cormorant,'Georgia',serif)", fontWeight:700, fontSize:"1.3rem", lineHeight:1, color:"var(--ink)" }}>12+ Yrs</p>
                  <p style={{ margin:0, fontSize:".68rem", color:"var(--muted)", marginTop:2 }}>of Excellence</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Content ── */}
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>

              {/* Pill */}
              <div className="fu1" style={{
                display:"inline-flex", alignItems:"center", gap:8, alignSelf:"flex-start",
                padding:"8px 16px", borderRadius:999,
                background:"var(--teal-light)", color:"var(--teal)",
                fontSize:".74rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase",
              }}>
                <span className="pill-dot" style={{ width:8, height:8, borderRadius:"50%", background:"var(--teal)", display:"inline-block" }}/>
                About the Doctor
              </div>

              {/* Name */}
              <div className="fu2">
                <h1 style={{
                  fontFamily:"var(--font-cormorant,'Georgia',serif)",
                  fontWeight:600, fontSize:"clamp(2.2rem,4.5vw,3.6rem)",
                  lineHeight:1.1, letterSpacing:"-.02em", color:"var(--ink)", margin:0,
                }}>
                  Dr. Arjun Kumar
                </h1>
                <p style={{ margin:"8px 0 0", fontSize:"1rem", color:"var(--teal)", fontWeight:500, letterSpacing:".04em" }}>
                  BDS, MDS · FICD · Chief Dental Surgeon
                </p>
              </div>

              {/* Bio */}
              <p className="fu3" style={{ margin:0, fontSize:"clamp(.88rem,1.5vw,1rem)", lineHeight:1.8, color:"var(--muted)", maxWidth:480 }}>
                With over <strong style={{ color:"var(--ink)" }}>12 years of dedicated practice</strong>, Dr. Kumar has transformed thousands of smiles across India. A gold medallist in MDS, he specialises in <em>painless dentistry</em> and comprehensive <em>smile restoration</em> — blending technical precision with genuine compassion.
              </p>

              {/* Credentials */}
              <div className="fu3" style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {credentials.map(c => (
                  <div key={c.label} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                    <div style={{
                      padding:"2px 10px", borderRadius:6, background:"var(--teal-light)",
                      color:"var(--teal)", fontWeight:700, fontSize:".72rem",
                      letterSpacing:".08em", flexShrink:0, marginTop:2,
                    }}>{c.label}</div>
                    <p style={{ margin:0, fontSize:".83rem", color:"var(--muted)", lineHeight:1.5 }}>{c.detail}</p>
                  </div>
                ))}
              </div>

              {/* Specializations */}
              <div className="fu4">
                <p style={{ margin:"0 0 10px", fontSize:".75rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)" }}>Specializations</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {specializations.map(s => (
                    <span key={s} style={{
                      padding:"6px 14px", borderRadius:999,
                      background:"#fff", border:"1px solid var(--border)",
                      fontSize:".78rem", fontWeight:500, color:"var(--ink)",
                      boxShadow:"0 2px 8px rgba(0,0,0,.05)",
                    }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="fu5" style={{ display:"flex", flexWrap:"wrap", gap:14, paddingTop:4 }}>
                <a href="/#book" className="btn-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Book with Dr. Kumar
                </a>
                <a href="tel:+911234567890" className="btn-outline">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <div style={{ background:"var(--teal-light)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
          <div style={{
            maxWidth:1280, margin:"0 auto", padding:"0 clamp(24px,6vw,80px)",
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          }}>
            {stats.map((s,i) => (
              <div
                key={s.label}
                className="stat-card"
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  padding:"clamp(20px,3vw,32px) 16px", textAlign:"center",
                  borderRight: i < stats.length-1 ? "1px solid var(--border)" : "none",
                  cursor:"default",
                  boxShadow:"none",
                }}
              >
                <div style={{ width:48, height:48, borderRadius:14, background:s.bg, color:s.color, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>{s.icon}</div>
                <span style={{ fontFamily:"var(--font-cormorant,'Georgia',serif)", fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", lineHeight:1, color:s.color }}>{s.value}</span>
                <span style={{ fontSize:".72rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", marginTop:4 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 2 — MISSION / PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section style={{
          position:"relative", overflow:"hidden",
          background:"linear-gradient(160deg,#0F8278 0%,#096158 50%,#064F48 100%)",
          padding:"clamp(64px,8vw,96px) clamp(24px,6vw,80px)",
        }}>
          {/* BG decorations */}
          <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"40%", height:"140%", background:"radial-gradient(ellipse,rgba(255,255,255,.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>

          <div style={{ position:"relative", maxWidth:1280, margin:"0 auto" }}>
            {/* Mission statement */}
            <div style={{ textAlign:"center", maxWidth:720, margin:"0 auto 64px" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px",
                borderRadius:999, marginBottom:24, fontSize:".74rem", fontWeight:600,
                letterSpacing:".1em", textTransform:"uppercase",
                background:"rgba(255,255,255,.15)", color:"rgba(255,255,255,.9)", backdropFilter:"blur(8px)",
              }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#fff", display:"inline-block", animation:"pulse-ring 2s ease-out infinite" }}/>
                Our Mission
              </div>
              <blockquote style={{
                fontFamily:"var(--font-cormorant,'Georgia',serif)",
                fontWeight:500, fontStyle:"italic",
                fontSize:"clamp(1.6rem,3.5vw,2.6rem)",
                lineHeight:1.3, color:"#fff", margin:0,
              }}>
                "Our mission is to provide <em style={{ fontStyle:"normal", borderBottom:"2px solid rgba(255,255,255,.4)" }}>comfortable</em>, <em style={{ fontStyle:"normal", borderBottom:"2px solid rgba(255,255,255,.4)" }}>affordable</em>, and <em style={{ fontStyle:"normal", borderBottom:"2px solid rgba(255,255,255,.4)" }}>high-quality</em> dental care for every patient — without compromise."
              </blockquote>
              <p style={{ color:"rgba(255,255,255,.6)", marginTop:16, fontSize:".9rem" }}>— Dr. Arjun Kumar, Founder, BrightSmile Dental Care</p>
            </div>

            {/* Philosophy cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
              {philosophy.map((p) => (
                <div
                  key={p.title}
                  className="philosophy-card"
                  style={{
                    padding:"28px 24px", borderRadius:24, cursor:"default",
                    background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)",
                    border:"1px solid rgba(255,255,255,.18)",
                    boxShadow:"none",
                  }}
                >
                  <div style={{ width:52, height:52, borderRadius:16, background:p.bg, color:p.color, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>{p.icon}</div>
                  <h3 style={{ fontWeight:600, fontSize:"1rem", color:"#fff", margin:"0 0 10px" }}>{p.title}</h3>
                  <p style={{ fontSize:".82rem", color:"rgba(255,255,255,.65)", lineHeight:1.72, margin:0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════════ */}
        <section style={{ background:"#fff", padding:"clamp(64px,8vw,96px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <SectionLabel text="Career Journey" />
              <SectionHeading>
                A Decade of <em style={{ color:"var(--teal)", fontStyle:"italic" }}>Milestones</em>
              </SectionHeading>
            </div>

            <div style={{ position:"relative", paddingLeft:52 }}>
              {/* vertical line */}
              <div className="timeline-line" />

              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  style={{
                    position:"relative", marginBottom: i < timeline.length-1 ? 36 : 0,
                    transition:"transform .3s ease",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}
                >
                  {/* Dot */}
                  <div style={{
                    position:"absolute", left:-44, top:6,
                    width:16, height:16, borderRadius:"50%",
                    background:"var(--teal)", border:"3px solid #fff",
                    boxShadow:"0 0 0 3px var(--teal-light)",
                    zIndex:1,
                  }}/>
                  {/* Content */}
                  <div style={{
                    padding:"16px 20px", borderRadius:16,
                    background:"var(--warm-white)", border:"1px solid var(--border)",
                    display:"flex", gap:16, alignItems:"flex-start",
                    boxShadow:"0 2px 12px rgba(0,0,0,.05)",
                  }}>
                    <span style={{
                      fontFamily:"var(--font-cormorant,'Georgia',serif)",
                      fontWeight:700, fontSize:"1.4rem", lineHeight:1,
                      color:"var(--teal)", flexShrink:0,
                    }}>{item.year}</span>
                    <p style={{ margin:0, fontSize:".87rem", color:"var(--muted)", lineHeight:1.65 }}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — CLINIC PHOTOS
        ══════════════════════════════════════════ */}
        <section style={{ background:"var(--warm-white)", padding:"clamp(64px,8vw,96px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <SectionLabel text="Inside the Clinic" />
              <SectionHeading>
                A Space Designed for <em style={{ color:"var(--teal)", fontStyle:"italic" }}>Your Comfort</em>
              </SectionHeading>
              <p style={{ color:"var(--muted)", maxWidth:480, margin:"16px auto 0", fontSize:".9rem", lineHeight:1.75 }}>
                Every corner of BrightSmile was designed with patient wellbeing in mind — bright, calm, and meticulously clean.
              </p>
            </div>

            {/* Gallery grid */}
            <div
              className="gallery-grid"
              style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gridTemplateRows:"240px 240px", gap:16 }}
            >
              {clinicPhotos.map((photo) => (
                <div
                  key={photo.alt}
                  className={`gallery-card ${photo.span}`}
                  style={{
                    boxShadow:"0 6px 24px rgba(0,0,0,.08)",
                    border:"3px solid #fff",
                    position:"relative",
                  }}
                  onClick={() => setLightbox(photo.src)}
                >
                  <img src={photo.src} alt={photo.alt} />
                  {/* Overlay */}
                  <div
                    className="overlay"
                    style={{
                      position:"absolute", inset:0,
                      background:"rgba(15,130,120,.55)",
                      display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", gap:10,
                      borderRadius:20,
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    <span style={{ color:"#fff", fontWeight:600, fontSize:".85rem", letterSpacing:".06em" }}>{photo.label}</span>
                  </div>
                  {/* Label chip */}
                  <div style={{
                    position:"absolute", bottom:12, left:12,
                    padding:"5px 12px", borderRadius:999,
                    background:"rgba(255,255,255,.9)", backdropFilter:"blur(6px)",
                    fontSize:".72rem", fontWeight:600, color:"var(--ink)",
                  }}>{photo.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mini CTA ── */}
        <section style={{
          background:"linear-gradient(135deg,var(--teal-light) 0%,#fff 50%,#E0F2FE 100%)",
          padding:"clamp(56px,6vw,80px) clamp(24px,6vw,80px)",
          textAlign:"center", position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"35%", height:"160%", background:"radial-gradient(ellipse,rgba(15,130,120,.08) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(15,130,120,.1) 1.5px,transparent 1.5px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>
          <div style={{ position:"relative", maxWidth:600, margin:"0 auto" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px",
              borderRadius:999, marginBottom:20, fontSize:".74rem", fontWeight:600,
              letterSpacing:".1em", textTransform:"uppercase",
              background:"rgba(15,130,120,.12)", color:"var(--teal)",
              border:"1px solid rgba(15,130,120,.2)",
            }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--teal)", display:"inline-block", animation:"pulse-ring 2s ease-out infinite" }}/>
              Free Consultation Available
            </div>
            <h2 style={{
              fontFamily:"var(--font-cormorant,'Georgia',serif)",
              fontWeight:600, fontSize:"clamp(1.8rem,4vw,3rem)",
              lineHeight:1.15, letterSpacing:"-.02em", color:"var(--ink)", margin:"0 0 14px",
            }}>
              Meet Dr. Kumar in Person
            </h2>
            <p style={{ color:"var(--muted)", fontSize:".95rem", lineHeight:1.75, marginBottom:32 }}>
              Schedule a personal consultation and experience the BrightSmile difference firsthand.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}>
              <a href="/#book" className="btn-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book Appointment
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ color:"#128C7E", borderColor:"#128C7E" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="#F0FDF4"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Chat
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer bar ── */}
        <div style={{ borderTop:"1px solid var(--border)", padding:"24px clamp(24px,6vw,80px)", background:"#fff", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,var(--teal),var(--teal-mid))", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff"/></svg>
            </div>
            <span style={{ fontFamily:"var(--font-cormorant,'Georgia',serif)", fontWeight:700, fontSize:"1rem" }}>BrightSmile Dental Care</span>
          </div>
          <p style={{ color:"var(--muted)", fontSize:".75rem", margin:0 }}>© {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.</p>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy Policy","Terms","Sitemap"].map(l=>(
              <a key={l} href="#" style={{ fontSize:".75rem", color:"var(--muted)", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="var(--teal)"}
                onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
              >{l}</a>
            ))}
          </div>
        </div>

        {/* ── Lightbox ── */}
        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            style={{
              position:"fixed", inset:0, zIndex:999,
              background:"rgba(0,0,0,.85)", backdropFilter:"blur(8px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              padding:24, animation:"fadeIn .25s ease",
            }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position:"absolute", top:20, right:20,
                width:40, height:40, borderRadius:"50%",
                background:"rgba(255,255,255,.15)", border:"none",
                color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background .2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.3)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <img
              src={lightbox}
              alt="Clinic photo enlarged"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth:"90vw", maxHeight:"85vh", objectFit:"contain",
                borderRadius:20, boxShadow:"0 32px 80px rgba(0,0,0,.5)",
                animation:"scaleIn .3s ease",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}