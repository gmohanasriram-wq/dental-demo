"use client";
import Link from "next/link";

const treatments = [
  {
    title: "Root Canal Treatment",
    desc: "Painless, precision root canal therapy using rotary endodontics that saves your natural tooth and eliminates infection permanently.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 1.2.5 2.2.5 3 0 1.5-1 3.2-1 5.5 0 3 1.3 6.5 3 6.5 1.2 0 1.5-2.5 2-2.5s.8 2.5 2 2.5c1.7 0 3-3.5 3-6.5 0-2.3-1-4-1-5.5 0-.8.5-1.8.5-3C16.5 4.8 14.5 3 12 3z" />
        <line x1="12" y1="10" x2="12" y2="16" />
        <line x1="9.5" y1="13" x2="14.5" y2="13" />
      </svg>
    ),
    tag: "Most Popular",
    tagColor: "#0F8278",
    tagBg: "#E6F4F2",
    accentColor: "#0F8278",
    // ✅ FIX: was photo-1588776814546 (dental chair). Now correct root canal procedure image.
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80&auto=format&fit=crop",
  },
  {
    title: "Dental Implants",
    desc: "Permanent, natural-looking implants crafted from biocompatible titanium — the gold standard for missing tooth replacement.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8M8 6l4-4 4 4" />
        <rect x="7" y="10" width="10" height="5" rx="2" />
        <path d="M9 15v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5" />
      </svg>
    ),
    tag: "Long Lasting",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    accentColor: "#0EA5E9",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80&auto=format&fit=crop",
  },
  {
    title: "Braces & Aligners",
    desc: "Invisible aligners and modern ceramic braces to achieve a perfectly straight smile — discreetly and comfortably.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6a4 4 0 0 1 8 0v2H8V6z" />
        <rect x="4" y="8" width="16" height="10" rx="3" />
        <line x1="8" y1="13" x2="16" y2="13" />
      </svg>
    ),
    tag: "Invisible Option",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    accentColor: "#7C4DFF",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80&auto=format&fit=crop",
  },
  {
    title: "Teeth Whitening",
    desc: "Professional-grade laser and gel whitening that lifts stains safely — up to 8 shades brighter in a single session.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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
    tag: "Quick Results",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    accentColor: "#E8913A",
    // ✅ FIX: was photo-1601049541100 (generic smile). Now correct whitening result image.
    image: "https://images.unsplash.com/photo-1620775993977-0ca5dd7f1e8e?w=400&q=80&auto=format&fit=crop",
  },
];

export default function Treatments() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,130,120,.07) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
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
            Our Treatments
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
            Featured Treatments
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            From preventive care to advanced cosmetic dentistry, we offer comprehensive solutions tailored to your unique smile.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t) => (
            <div
              key={t.title}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-100 cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.06)";
              }}
            >
              {/* Image area */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  // ✅ FIX: onError fallback so broken images never show empty box
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80&auto=format&fit=crop";
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${t.accentColor}55 0%, transparent 60%)` }}
                />
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: t.tagBg, color: t.tagColor }}
                >
                  {t.tag}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: t.tagBg, color: t.accentColor }}
                  >
                    {t.icon}
                  </div>
                  <h3
                    className="font-semibold text-gray-900 leading-tight mt-1 text-sm"
                    style={{ fontFamily: "var(--font-cormorant, 'Georgia', serif)", fontSize: "1.1rem" }}
                  >
                    {t.title}
                  </h3>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-5">{t.desc}</p>

                {/* ✅ FIX: Link to /services instead of plain text button */}
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-xs font-semibold group/btn"
                  style={{ color: t.accentColor, textDecoration: "none" }}
                >
                  <span>Learn More</span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1"
                    style={{ background: t.tagBg }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </Link>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(to right, ${t.accentColor}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* ✅ FIX: View All Treatments now navigates to /services using Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium border-2 transition-all duration-300 hover:shadow-lg active:scale-95"
            style={{
              borderColor: "#0F8278",
              color: "#0F8278",
              background: "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E6F4F2"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            View All Treatments
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}