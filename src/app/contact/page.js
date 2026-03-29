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
   CONTACT DETAIL CARD
───────────────────────────────────────────── */
function ContactCard({ icon, label, value, sub, href, color, bg, action }) {
  const inner = (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: "16px",
        padding: "24px 26px", borderRadius: "24px",
        background: "#fff", border: "1px solid #E5F0EF",
        boxShadow: "0 4px 24px rgba(0,0,0,.06)",
        transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        textDecoration: "none", color: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,.06)";
      }}
    >
      <div style={{
        width: "52px", height: "52px", borderRadius: "16px", flexShrink: 0,
        background: bg, color: color,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: "0 0 4px", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF" }}>{label}</p>
        <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: ".95rem", color: "#172625", lineHeight: 1.35, wordBreak: "break-word" }}>{value}</p>
        {sub && <p style={{ margin: 0, fontSize: ".75rem", color: "#8A9E9C", lineHeight: 1.5 }}>{sub}</p>}
        {action && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "8px", fontSize: ".75rem", fontWeight: 600, color: color }}>
            {action}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>;
  }
  return inner;
}

/* ─────────────────────────────────────────────
   HOURS DATA
───────────────────────────────────────────── */
const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM", open: true  },
  { day: "Saturday",        time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Sunday",          time: "10:00 AM – 2:00 PM", open: true  },
  { day: "Public Holidays", time: "Emergency only",     open: false },
];

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────── */
function Field({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{ fontSize: ".8rem", fontWeight: 600, color: "#3D5554", letterSpacing: ".02em" }}>
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ margin: 0, fontSize: ".72rem", color: "#EF4444", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INPUT STYLE HELPER
───────────────────────────────────────────── */
const inputStyle = (focused, hasError) => ({
  width: "100%",
  padding: "13px 18px",
  borderRadius: "14px",
  border: `1.5px solid ${hasError ? "#EF4444" : focused ? "#0F8278" : "#D8ECEA"}`,
  background: focused ? "#ffffff" : "#F8FAF9",
  fontSize: ".9rem",
  color: "#172625",
  outline: "none",
  transition: "border-color .2s ease, background .2s ease, box-shadow .2s ease",
  boxShadow: focused ? "0 0 0 4px rgba(15,130,120,.08)" : "none",
  boxSizing: "border-box",
});

/* ─────────────────────────────────────────────
   SELECT STYLE — fixed: no background shorthand conflict
───────────────────────────────────────────── */
const selectStyle = (focused) => ({
  width: "100%",
  padding: "13px 40px 13px 18px",
  borderRadius: "14px",
  border: `1.5px solid ${focused ? "#0F8278" : "#D8ECEA"}`,
  backgroundColor: focused ? "#ffffff" : "#F8FAF9",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23587070' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
  fontSize: ".9rem",
  color: "#172625",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  transition: "border-color .2s ease, background-color .2s ease, box-shadow .2s ease",
  boxShadow: focused ? "0 0 0 4px rgba(15,130,120,.08)" : "none",
  boxSizing: "border-box",
});

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function ContactPage() {
  const [focused,    setFocused]    = useState("");
  const [form,       setForm]       = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" });
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.date) e.date = "Please select a preferred date";
    return e;
  };

  /* ── FIXED handleSubmit — async fetch to API ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitting(false);
        setSubmitted(true);
      } else {
        setSubmitting(false);
        alert(`Error: ${data.error || "Something went wrong. Please call us directly."}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setSubmitting(false);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const WHATSAPP_URL = "https://wa.me/919999999999?text=Hello%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment.";

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

        @keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.88); } to { opacity:1; transform:scale(1); } }
        @keyframes waPulse { 0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,.5); } 60% { box-shadow:0 0 0 14px rgba(37,211,102,0); } }
        @keyframes spin    { to { transform:rotate(360deg); } }

        .fu1 { animation: fadeUp .7s .05s ease both; }
        .fu2 { animation: fadeUp .7s .18s ease both; }
        .fu3 { animation: fadeUp .7s .30s ease both; }
        .fu4 { animation: fadeUp .7s .44s ease both; }
        .si  { animation: scaleIn .5s ease both; }

        .wa-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 58px; height: 58px; border-radius: 50%;
          background: #25D366; color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(37,211,102,.45);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
          animation: waPulse 2.4s ease-in-out infinite;
        }
        .wa-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 14px 40px rgba(37,211,102,.55);
          animation: none;
        }
        .wa-btn:active { transform: scale(.94); }

        .wa-tooltip {
          position: absolute; right: 70px; top: 50%;
          transform: translateY(-50%);
          padding: 7px 14px; border-radius: 10px;
          background: #172625; color: #fff;
          font-size: .75rem; font-weight: 500; white-space: nowrap;
          opacity: 0; pointer-events: none;
          transition: opacity .2s ease;
        }
        .wa-btn:hover .wa-tooltip { opacity: 1; }
        .wa-tooltip::after {
          content: ''; position: absolute; right: -6px; top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #172625; border-right: none;
        }

        select option { background: #fff; color: #172625; }

        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{ fontFamily: "var(--font-dm-sans, sans-serif)", background: "var(--warm-white)", color: "var(--ink)", minHeight: "100vh" }}
      >
        <Navbar activePage="Contact" />

        {/* ══ PAGE HEADER ══ */}
        <header style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#E6F4F2 0%,#F8FAF9 50%,#E0F2FE 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(15,130,120,.1) 1.5px,transparent 1.5px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "40%", height: "140%", background: "radial-gradient(ellipse,rgba(15,130,120,.13) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(60px,9vw,100px) clamp(24px,6vw,80px) clamp(48px,6vw,72px)" }}>
            <div className="fu1" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <Link href="/" style={{ fontSize: ".78rem", color: "var(--muted)", textDecoration: "none" }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span style={{ fontSize: ".78rem", color: "var(--teal)", fontWeight: 600 }}>Contact</span>
            </div>

            <div style={{ maxWidth: "640px" }}>
              <div className="fu1" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "7px 16px", borderRadius: "999px", marginBottom: "20px",
                background: "var(--teal-light)", color: "var(--teal)",
                fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
              }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                We'd Love to Hear From You
              </div>

              <h1 className="fu2" style={{
                fontFamily: "var(--font-cormorant,'Georgia',serif)",
                fontWeight: 600, fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
                lineHeight: 1.1, letterSpacing: "-.025em",
                color: "var(--ink)", margin: "0 0 18px",
              }}>
                Contact &amp;{" "}
                <em style={{ color: "var(--teal)", fontStyle: "italic" }}>Appointment</em>
              </h1>

              <p className="fu3" style={{
                fontSize: "clamp(.9rem,1.6vw,1.05rem)", lineHeight: 1.75,
                color: "var(--muted)", margin: "0 0 28px", maxWidth: "500px",
              }}>
                Get in touch with BrightSmile Dental Care and book your visit today. Same-day appointments available for emergencies.
              </p>

              <div className="fu4" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {[
                  { icon: "📞", text: "Call Now",  href: "tel:+911234567890" },
                  { icon: "💬", text: "WhatsApp",  href: WHATSAPP_URL },
                  { icon: "📧", text: "Email Us",  href: "mailto:care@brightsmile.in" },
                ].map((c) => (
                  <a key={c.text} href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "9px 18px", borderRadius: "14px", textDecoration: "none",
                      background: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)",
                      border: "1px solid var(--border)", color: "var(--ink)",
                      fontSize: ".8rem", fontWeight: 500,
                      boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                      transition: "transform .25s ease, box-shadow .25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.05)"; }}
                  >
                    <span>{c.icon}</span>{c.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", marginTop: "-1px" }} preserveAspectRatio="none">
            <path d="M0 24C360 48 720 0 1080 28C1260 44 1380 14 1440 24L1440 48H0Z" fill="#fff"/>
          </svg>
        </header>

        {/* ══ CONTACT + FORM ══ */}
        <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,80px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>

              {/* ── LEFT: Info ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 14px", borderRadius: "999px", marginBottom: "12px",
                    background: "var(--teal-light)", color: "var(--teal)",
                    fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
                    Get In Touch
                  </div>
                  <h2 style={{
                    fontFamily: "var(--font-cormorant,'Georgia',serif)",
                    fontWeight: 600, fontSize: "clamp(1.8rem,3vw,2.4rem)",
                    letterSpacing: "-.02em", color: "var(--ink)", margin: 0, lineHeight: 1.15,
                  }}>
                    We're Here for You
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: ".875rem", lineHeight: 1.7, margin: "10px 0 0" }}>
                    Reach out through any channel below or fill in the form to request your appointment.
                  </p>
                </div>

                <ContactCard href="tel:+911234567890" label="Phone Number" value="+91 12345 67890" sub="+91 98765 43210 (Emergency)" action="Call Now" color="#0F8278" bg="#E6F4F2"
                  icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                />

                <ContactCard href="mailto:care@brightsmile.in" label="Email Address" value="care@brightsmile.in" sub="We reply within 2–4 business hours" action="Send Email" color="#0EA5E9" bg="#E0F2FE"
                  icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                />

                <ContactCard href="https://maps.google.com/?q=BrightSmile+Dental+Care+MG+Road+Bangalore" label="Clinic Address" value="12, MG Road, Near City Hospital" sub="Bangalore – 560 001, Karnataka, India" action="Get Directions" color="#7C4DFF" bg="#EDE7FF"
                  icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                />

                {/* Hours */}
                <div style={{ padding: "24px 26px", borderRadius: "24px", background: "#fff", border: "1px solid #E5F0EF", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#FEF4EA", color: "#E8913A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF" }}>Working Hours</p>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: ".95rem", color: "#172625" }}>Clinic Schedule</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {hours.map((h) => (
                      <div key={h.day} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                        <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>{h.day}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: h.open ? "#22C55E" : "#EF4444", flexShrink: 0 }} />
                          <span style={{ fontSize: ".82rem", fontWeight: 600, color: h.open ? "#172625" : "#9CA3AF" }}>{h.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "12px", background: "var(--teal-light)" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                    <span style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--teal)" }}>Open now · Closes at 8:00 PM</span>
                  </div>
                </div>

                {/* Map */}
                <div style={{ borderRadius: "24px", overflow: "hidden", border: "4px solid #fff", boxShadow: "0 8px 32px rgba(0,0,0,.08)" }}>
                  <iframe
                    title="BrightSmile Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.086082561!2d77.59455!3d12.97194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
                    width="100%" height="220"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* ── RIGHT: Form ── */}
              <div style={{
                padding: "clamp(28px,4vw,44px)", borderRadius: "32px",
                background: "#fff", border: "1px solid #E5F0EF",
                boxShadow: "0 8px 48px rgba(0,0,0,.08)",
                position: "sticky", top: "88px",
              }}>
                <div style={{ marginBottom: "28px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 14px", borderRadius: "999px", marginBottom: "12px",
                    background: "var(--teal-light)", color: "var(--teal)",
                    fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Book Appointment
                  </div>
                  <h2 style={{
                    fontFamily: "var(--font-cormorant,'Georgia',serif)",
                    fontWeight: 600, fontSize: "clamp(1.6rem,2.8vw,2.2rem)",
                    letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.2,
                  }}>
                    Request Your Visit
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: ".82rem", lineHeight: 1.6, margin: 0 }}>
                    Fill in the form and our team will confirm within 2 hours.
                  </p>
                </div>

                {/* SUCCESS */}
                {submitted ? (
                  <div className="si" style={{ textAlign: "center", padding: "48px 24px", borderRadius: "20px", background: "var(--teal-light)", border: "1.5px solid var(--border)" }}>
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 12px 32px rgba(15,130,120,.35)" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-cormorant,serif)", fontWeight: 600, fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 10px" }}>
                      Appointment Requested! 🎉
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: ".875rem", lineHeight: 1.7, margin: "0 0 24px" }}>
                      Thank you, <strong>{form.name}</strong>! We've received your request and will confirm within 2 hours.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" }); }}
                        style={{ padding: "11px 24px", borderRadius: "999px", fontSize: ".82rem", fontWeight: 600, background: "var(--teal)", color: "#fff", border: "none", cursor: "pointer" }}
                      >
                        Book Another
                      </button>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "999px", fontSize: ".82rem", fontWeight: 600, background: "#25D366", color: "#fff", textDecoration: "none" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  /* FORM */
                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    {/* Name + Phone */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                      <style>{`@media(max-width:560px){.form-row{grid-template-columns:1fr !important;}}`}</style>
                      <Field label="Full Name" required error={errors.name}>
                        <input type="text" value={form.name} onChange={set("name")} placeholder="Priya Sharma"
                          style={inputStyle(focused === "name", !!errors.name)}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused("")} />
                      </Field>
                      <Field label="Phone Number" required error={errors.phone}>
                        <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210"
                          style={inputStyle(focused === "phone", !!errors.phone)}
                          onFocus={() => setFocused("phone")} onBlur={() => setFocused("")} />
                      </Field>
                    </div>

                    {/* Email */}
                    <Field label="Email Address" error={errors.email}>
                      <input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com"
                        style={inputStyle(focused === "email", !!errors.email)}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
                    </Field>

                    {/* Service — FIXED select style */}
                    <Field label="Treatment Required">
                      <select value={form.service} onChange={set("service")}
                        style={selectStyle(focused === "service")}
                        onFocus={() => setFocused("service")} onBlur={() => setFocused("")}>
                        <option value="">— Select a treatment —</option>
                        <option value="general">General Checkup &amp; Cleaning</option>
                        <option value="rootcanal">Root Canal Treatment</option>
                        <option value="implants">Dental Implants</option>
                        <option value="whitening">Teeth Whitening</option>
                        <option value="braces">Braces &amp; Aligners</option>
                        <option value="veneers">Veneers</option>
                        <option value="emergency">Emergency Dental Care</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </Field>

                    {/* Date + Time */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                      <Field label="Preferred Date" required error={errors.date}>
                        <input type="date" value={form.date} onChange={set("date")}
                          min={new Date().toISOString().split("T")[0]}
                          style={inputStyle(focused === "date", !!errors.date)}
                          onFocus={() => setFocused("date")} onBlur={() => setFocused("")} />
                      </Field>
                      {/* Time — FIXED select style */}
                      <Field label="Preferred Time">
                        <select value={form.time} onChange={set("time")}
                          style={selectStyle(focused === "time")}
                          onFocus={() => setFocused("time")} onBlur={() => setFocused("")}>
                          <option value="">— Any time —</option>
                          <option value="9-10">9:00 AM – 10:00 AM</option>
                          <option value="10-11">10:00 AM – 11:00 AM</option>
                          <option value="11-12">11:00 AM – 12:00 PM</option>
                          <option value="12-1">12:00 PM – 1:00 PM</option>
                          <option value="2-3">2:00 PM – 3:00 PM</option>
                          <option value="3-4">3:00 PM – 4:00 PM</option>
                          <option value="4-5">4:00 PM – 5:00 PM</option>
                          <option value="5-6">5:00 PM – 6:00 PM</option>
                          <option value="6-7">6:00 PM – 7:00 PM</option>
                          <option value="7-8">7:00 PM – 8:00 PM</option>
                        </select>
                      </Field>
                    </div>

                    {/* Message */}
                    <Field label="Additional Notes">
                      <textarea value={form.message} onChange={set("message")}
                        placeholder="Describe your dental concern, symptoms or any special requirements..."
                        rows={4}
                        style={{ ...inputStyle(focused === "message", false), resize: "vertical", minHeight: "100px", lineHeight: 1.6 }}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused("")} />
                    </Field>

                    {/* Error summary */}
                    {Object.keys(errors).length > 0 && (
                      <div style={{ padding: "12px 16px", borderRadius: "12px", background: "#FEF2F2", border: "1px solid #FECACA", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <p style={{ margin: 0, fontSize: ".8rem", color: "#EF4444", lineHeight: 1.5 }}>Please fix the highlighted fields before submitting.</p>
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        padding: "15px 28px", borderRadius: "999px",
                        background: submitting ? "#8BBDB9" : "linear-gradient(135deg,#0F8278,#12A396)",
                        color: "#fff", fontSize: ".9rem", fontWeight: 600,
                        border: "none", cursor: submitting ? "not-allowed" : "pointer",
                        width: "100%",
                        boxShadow: submitting ? "none" : "0 8px 28px rgba(15,130,120,.32)",
                        transition: "transform .3s ease, box-shadow .3s ease",
                      }}
                      onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,130,120,.38)"; } }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = submitting ? "none" : "0 8px 28px rgba(15,130,120,.32)"; }}
                    >
                      {submitting ? (
                        <>
                          <span style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "#fff", animation: "spin .7s linear infinite", display: "inline-block" }} />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          Book Appointment
                        </>
                      )}
                    </button>

                    <p style={{ margin: 0, textAlign: "center", fontSize: ".72rem", color: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Your information is 100% private and will never be shared.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "#fff", padding: "24px clamp(24px,6vw,80px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,var(--teal),var(--teal-mid))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff"/></svg>
            </div>
            <span style={{ fontFamily: "var(--font-cormorant,serif)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>BrightSmile Dental Care</span>
          </div>
          <p style={{ fontSize: ".75rem", color: "#9CA3AF", margin: 0 }}>© {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Sitemap", href: "/sitemap" }].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: ".75rem", color: "#9CA3AF", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--teal)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}>
                {label}
              </Link>
            ))}
          </div>
        </footer>
      </div>

      {/* WhatsApp floating button */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
        <div className="wa-tooltip">Chat on WhatsApp</div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}