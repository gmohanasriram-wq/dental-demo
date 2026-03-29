"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Services",     href: "/services"     },
  { label: "About",        href: "/about"        },
  { label: "Gallery",      href: "/gallery"      },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact",      href: "/contact"      },
];

export default function Navbar({ activePage = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Close menu on route change / resize */
  useEffect(() => {
   const handleResize = () => {
  if (window.innerWidth >= 768) {
    setMenuOpen(false); // (if you're closing menu on desktop)
  }
};
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Add shadow when scrolled */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .nav-link-item {
          color: var(--muted, #587070);
          text-decoration: none;
          font-size: .875rem;
          font-weight: 500;
          position: relative;
          transition: color .2s ease;
          white-space: nowrap;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: var(--teal, #0F8278);
          transition: width .25s ease;
        }
        .nav-link-item:hover { color: var(--teal, #0F8278); }
        .nav-link-item:hover::after { width: 100%; }
        .nav-link-item--active { color: var(--teal, #0F8278) !important; }
        .nav-link-item--active::after { width: 100% !important; }

        /* Hamburger lines */
        .hb-line {
          display: block;
          width: 22px; height: 2px;
          background: var(--ink, #172625);
          border-radius: 2px;
          transition: transform .3s ease, opacity .3s ease, width .3s ease;
          transform-origin: center;
        }
        .hb-open .hb-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hb-open .hb-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hb-open .hb-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 99;
          display: flex;
          flex-direction: column;
          background: #fff;
          transform: translateX(100%);
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          overflow-y: auto;
        }
        .mobile-drawer--open { transform: translateX(0); }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #E5F0EF;
          text-decoration: none;
          color: var(--ink, #172625);
          font-size: 1.05rem;
          font-weight: 500;
          transition: color .2s ease, padding-left .2s ease;
        }
        .mobile-nav-link:hover { color: var(--teal, #0F8278); padding-left: 8px; }
        .mobile-nav-link--active { color: var(--teal, #0F8278); font-weight: 600; }
      `}</style>

      {/* ── Top accent bar ───────────────────── */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #096158, #12A396, #7DD4CE)" }} />

      {/* ── Main nav bar ─────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(20px, 5vw, 80px)",
          borderBottom: "1px solid #D8ECEA",
          background: "rgba(248,250,249,.97)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "box-shadow .3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.07)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}
          onClick={() => setMenuOpen(false)}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "linear-gradient(135deg, #0F8278, #12A396)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-cormorant, 'Georgia', serif)", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, color: "#172625", margin: 0 }}>BrightSmile</p>
            <p style={{ fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#0F8278", margin: 0, marginTop: "2px" }}>Dental Care</p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="nav-desktop-links">
          <style>{`@media(max-width:768px){ .nav-desktop-links{ display:none !important; } }`}</style>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`nav-link-item${activePage === label ? " nav-link-item--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: Book Now + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 20px", borderRadius: "999px", fontSize: ".8rem",
              fontWeight: 600, background: "#0F8278", color: "#fff",
              textDecoration: "none", transition: "transform .25s ease, box-shadow .25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(15,130,120,.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>

          {/* Hamburger — mobile only */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className={`hamburger-btn${menuOpen ? " hb-open" : ""}`}
            style={{
              display: "flex", flexDirection: "column", gap: "5px",
              justifyContent: "center", alignItems: "center",
              width: "40px", height: "40px", borderRadius: "10px",
              background: menuOpen ? "#E6F4F2" : "transparent",
              border: "1.5px solid",
              borderColor: menuOpen ? "#0F8278" : "#D8ECEA",
              cursor: "pointer", flexShrink: 0,
              transition: "background .2s ease, border-color .2s ease",
            }}
           
          >
            <style>{`@media(min-width:769px){ .hamburger-btn{ display:none !important; } }`}</style>
            <span className="hb-line" />
            <span className="hb-line" />
            <span className="hb-line" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────── */}
      <div className={`mobile-drawer${menuOpen ? " mobile-drawer--open" : ""}`}>
        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px clamp(20px,5vw,40px)",
          borderBottom: "1px solid #E5F0EF",
          background: "#fff", flexShrink: 0,
        }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => setMenuOpen(false)}>
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #0F8278, #12A396)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C9.5 3 7.5 4.8 7.5 7C7.5 8.2 8 9.2 8 10C8 11.5 7 13.2 7 15.5C7 18.5 8.3 22 10 22C11.2 22 11.5 19.5 12 19.5C12.5 19.5 12.8 22 14 22C15.7 22 17 18.5 17 15.5C17 13.2 16 11.5 16 10C16 9.2 16.5 8.2 16.5 7C16.5 4.8 14.5 3 12 3Z" fill="#fff"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-cormorant, 'Georgia', serif)", fontWeight: 700, fontSize: "1rem", lineHeight: 1, color: "#172625", margin: 0 }}>BrightSmile</p>
              <p style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#0F8278", margin: 0, marginTop: "2px" }}>Dental Care</p>
            </div>
          </Link>

          {/* Close button */}
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              border: "1.5px solid #D8ECEA", background: "#F8FAF9",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background .2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E6F4F2"; e.currentTarget.style.borderColor = "#0F8278"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F8FAF9"; e.currentTarget.style.borderColor = "#D8ECEA"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#172625" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, padding: "8px clamp(20px,5vw,40px) 24px", overflowY: "auto" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`mobile-nav-link${activePage === label ? " mobile-nav-link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          ))}

          {/* Book CTA inside drawer */}
          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "15px 24px", borderRadius: "999px", fontSize: ".9rem", fontWeight: 600,
                background: "linear-gradient(135deg, #0F8278, #12A396)", color: "#fff",
                textDecoration: "none", boxShadow: "0 8px 28px rgba(15,130,120,.3)",
                transition: "transform .25s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Appointment
            </Link>

            <a
              href="https://wa.me/919999999999?text=Hello%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "14px 24px", borderRadius: "999px", fontSize: ".9rem", fontWeight: 500,
                background: "transparent", color: "#0F8278",
                textDecoration: "none", border: "1.5px solid #0F8278",
                transition: "background .2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E6F4F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick contact info */}
          <div style={{ marginTop: "28px", padding: "18px", borderRadius: "16px", background: "#F8FAF9", border: "1px solid #E5F0EF" }}>
            <p style={{ margin: "0 0 12px", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF" }}>Quick Contact</p>
            <a href="tel:+911234567890" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#172625", marginBottom: "10px" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#E6F4F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F8278" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <span style={{ fontSize: ".82rem", fontWeight: 500 }}>+91 12345 67890</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#E6F4F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F8278" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </span>
              <span style={{ fontSize: ".78rem", color: "#587070" }}>Mon–Fri: 9AM – 8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Backdrop ─────────────────────────── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 98,
            background: "rgba(23,38,37,.4)", backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}