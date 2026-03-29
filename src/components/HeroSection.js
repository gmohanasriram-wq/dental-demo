"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
//import TrustIndicators from "@/components/TrustIndicators";
//import Treatments     from "@/components/Treatments";
//import WhyChoose      from "@/components/WhyChoose";
//import BeforeAfter    from "@/components/BeforeAfter";
// import Testimonials   from "@/components/Testimonials";
// import CTA            from "@/components/CTA";
// import ContactMap     from "@/components/ContactMap";

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

export default function Home() {
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
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-9px); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(7px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: .7; }
          70%  { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }

        .fu1 { animation: fadeUp .75s .05s ease both; }
        .fu2 { animation: fadeUp .75s .18s ease both; }
        .fu3 { animation: fadeUp .75s .30s ease both; }
        .fu4 { animation: fadeUp .75s .44s ease both; }
        .fu5 { animation: fadeUp .75s .58s ease both; }
        .si  { animation: scaleIn 1s .15s ease both; }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 4.5s 1.2s ease-in-out infinite; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 999px;
          font-size: .875rem; font-weight: 500; cursor: pointer;
          text-decoration: none; background: var(--teal); color: #fff; border: none;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background .2s ease;
        }
        .btn-primary:hover { background: var(--teal-dark); transform: translateY(-3px); box-shadow: 0 14px 32px rgba(15,130,120,.32); }
        .btn-primary:active { transform: translateY(0); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          font-size: .875rem; font-weight: 500; cursor: pointer;
          text-decoration: none; background: transparent; color: var(--teal);
          border: 1.5px solid var(--teal);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background .2s ease;
        }
        .btn-outline:hover { background: var(--teal-light); transform: translateY(-3px); box-shadow: 0 10px 24px rgba(15,130,120,.14); }
        .btn-outline:active { transform: translateY(0); }

        .stat-badge {
          position: absolute; display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 18px;
          background: rgba(255,255,255,.93); backdrop-filter: blur(12px);
          border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,.08);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .stat-badge:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.12); }

        .img-wrap { border-radius: 28px; overflow: hidden; box-shadow: 0 40px 80px rgba(15,130,120,.18), 0 8px 24px rgba(0,0,0,.09); }
        .img-wrap img { width: 100%; display: block; object-fit: cover; transition: transform .7s ease; height: clamp(300px,44vw,520px); }
        .img-wrap:hover img { transform: scale(1.04); }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(15,130,120,.18) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }

        .pill-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 999px;
          background: var(--teal-light); color: var(--teal);
          font-size: .75rem; font-weight: 600; letter-spacing: .09em; text-transform: uppercase;
        }
        .pill-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); position: relative; }
        .pill-dot::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: var(--teal); animation: pulse-ring 2s ease-out infinite;
        }

        .chip {
          display: flex; align-items: center; gap: 10px; padding: 10px 18px;
          border-radius: 14px; background: #fff; border: 1px solid var(--border);
          font-size: .8rem; font-weight: 500; color: var(--ink); cursor: pointer;
          transition: transform .25s ease, box-shadow .25s ease; white-space: nowrap;
        }
        .chip:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(15,130,120,.12); }

        .nav-link {
          color: var(--muted); text-decoration: none; font-size: .875rem; font-weight: 500;
          transition: color .2s ease; position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 1.5px; background: var(--teal); transition: width .25s ease;
        }
        .nav-link:hover { color: var(--teal); }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <main
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{ fontFamily: "var(--font-dm-sans, sans-serif)", background: "var(--warm-white)", color: "var(--ink)", minHeight: "100vh", overflowX: "hidden" }}
      >
        <Navbar />

        {/* ── Hero ────────────────────────────────────── */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55%", height: "120%", background: "radial-gradient(ellipse at 70% 30%, rgba(180,230,225,.45) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: "-8%", width: "30%", height: "50%", background: "radial-gradient(ellipse at 30% 80%, rgba(180,230,225,.25) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,8vw,96px) clamp(24px,6vw,80px)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center", gap: "clamp(32px,5vw,72px)" }} className="hero-grid">
            <style>{`@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-img-col { order: -1; } }`}</style>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="pill-badge fu1" style={{ alignSelf: "flex-start" }}>
                <span className="pill-dot" />
                Accepting New Patients · Est. 2005
              </div>

              <h1 className="fu2" style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 600, fontSize: "clamp(2.4rem,4.8vw,4rem)", lineHeight: 1.12, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>
                Gentle, Affordable<br />
                <em style={{ color: "var(--teal)", fontStyle: "italic" }}>&amp; Advanced</em><br />
                Dental Care
              </h1>

              <div className="fu3" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "14px", background: "var(--teal-light)", border: "1px solid var(--border)", alignSelf: "flex-start" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--teal-mid))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: ".85rem", flexShrink: 0 }}>AK</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: ".875rem", color: "var(--ink)" }}>Dr. Arjun Kumar</p>
                  <p style={{ margin: 0, fontSize: ".75rem", color: "var(--muted)", marginTop: "2px" }}>BDS, MDS — Chief Dental Surgeon</p>
                </div>
              </div>

              <p className="fu3" style={{ margin: 0, fontSize: "clamp(.9rem,1.6vw,1.05rem)", lineHeight: 1.72, color: "var(--muted)", maxWidth: "430px" }}>
                World-class dental care delivered with compassion. From routine cleanings to advanced cosmetic procedures — your best smile starts here.
              </p>

              <div className="fu4" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link href="/contact" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Appointment
                </Link>
                <a href="tel:+911234567890" className="btn-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>
              </div>

              <div className="fu5" style={{ display: "flex", flexWrap: "wrap", gap: "32px", paddingTop: "8px", borderTop: "1px solid var(--border)", marginTop: "4px" }}>
                {[{ value: "20+", label: "Years Experience" }, { value: "15K+", label: "Happy Patients" }, { value: "4.9★", label: "Google Rating" }].map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span style={{ fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1.8rem", lineHeight: 1, color: "var(--teal)" }}>{s.value}</span>
                    <span style={{ fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-img-col si" style={{ position: "relative" }}>
              <div className="dot-grid" style={{ position: "absolute", top: "-24px", right: "-24px", width: "180px", height: "180px", borderRadius: "16px", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "absolute", bottom: "-28px", left: "-28px", width: "140px", height: "140px", borderRadius: "50%", background: "var(--teal-light)", pointerEvents: "none", zIndex: 0 }} />
              <div className="img-wrap" style={{ position: "relative", zIndex: 1 }}>
                <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=760&q=85&auto=format&fit=crop" alt="Dr. Arjun Kumar" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,130,120,.18) 0%, transparent 55%)", pointerEvents: "none" }} />
              </div>
              <div className="stat-badge float-a" style={{ left: "-28px", top: "22%", zIndex: 2 }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1, color: "var(--ink)" }}>20+ Yrs</p>
                  <p style={{ margin: 0, fontSize: ".7rem", color: "var(--muted)", marginTop: "3px" }}>of Excellence</p>
                </div>
              </div>
              <div className="stat-badge float-b" style={{ right: "-20px", bottom: "14%", zIndex: 2 }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#FEF4EA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8913A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--font-cormorant, serif)", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1, color: "var(--ink)" }}>15K+</p>
                  <p style={{ margin: 0, fontSize: ".7rem", color: "var(--muted)", marginTop: "3px" }}>Happy Patients</p>
                </div>
              </div>
              <div className="stat-badge" style={{ top: "6%", right: "8%", zIndex: 2, padding: "10px 14px", animation: "floatA 6s 2s ease-in-out infinite" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <p style={{ margin: 0, fontWeight: 600, fontSize: ".8rem", color: "var(--ink)" }}>4.9 <span style={{ color: "var(--muted)", fontWeight: 400 }}>/ 5.0</span></p>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginTop: "-1px", width: "100%" }} preserveAspectRatio="none">
            <path d="M0 28 C360 58 720 0 1080 32 C1260 48 1380 20 1440 28 L1440 56 L0 56 Z" fill="#E6F4F2" />
          </svg>
        </section>

        {/* Services strip */}
        <section style={{ background: "var(--teal-light)", padding: "clamp(20px,4vw,40px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {[{ icon: "🦷", label: "Teeth Cleaning" }, { icon: "✨", label: "Teeth Whitening" }, { icon: "🦿", label: "Dental Implants" }, { icon: "🔲", label: "Orthodontics" }, { icon: "💎", label: "Veneers" }, { icon: "🩺", label: "Root Canal" }].map((s) => (
              <button key={s.label} className="chip">
                <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                {s.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "2px" }}><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ))}
          </div>
        </section>

        {/* Remaining sections */}
        {/* <TrustIndicators />
        <Treatments />
        <WhyChoose />
        <BeforeAfter />
        <Testimonials />
        <CTA />
        <ContactMap /> */}
      </main>
    </>
  );
}