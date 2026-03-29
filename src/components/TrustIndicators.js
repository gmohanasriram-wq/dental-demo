"use client";
import { useEffect, useRef, useState } from "react";

const indicators = [
  {
    value: 12,
    suffix: "+",
    label: "Years Experience",
    sub: "Trusted since 2012",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "#0F8278",
    bg: "#E6F4F2",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Happy Patients",
    sub: "And counting every day",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#E8913A",
    bg: "#FEF4EA",
  },
  {
    value: null,
    suffix: "",
    label: "Certified Dentist",
    sub: "BDS, MDS qualified",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    color: "#7C4DFF",
    bg: "#EDE7FF",
    staticLabel: "Certified",
  },
  {
    value: null,
    suffix: "",
    label: "Advanced Equipment",
    sub: "Latest dental tech",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "#0EA5E9",
    bg: "#E0F2FE",
    staticLabel: "Advanced",
  },
];

function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function TrustIndicators() {
  return (
    <section className="relative bg-white overflow-hidden py-20">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: "40px" }}>
          <path d="M0 28 C360 0 720 56 1080 24 C1260 8 1380 36 1440 28 L1440 0 L0 0 Z" fill="#E6F4F2" />
        </svg>
      </div>

      {/* BG mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(15,130,120,.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(14,165,233,.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center justify-center mb-14">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#0F8278", letterSpacing: ".14em" }}
            >
              Why Patients Trust Us
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, i) => (
            <div
              key={item.label}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 cursor-default"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,.06)",
                transition: "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
                animationDelay: `${i * 120}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,.06)";
              }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full transition-all duration-300 group-hover:w-20"
                style={{ background: item.color }}
              />

              {/* Icon bubble */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: item.bg, color: item.color }}
              >
                {item.icon}
              </div>

              {/* Number */}
              <div
                className="font-bold mb-1"
                style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  lineHeight: 1,
                  color: item.color,
                }}
              >
                {item.value !== null ? (
                  <>
                    <CountUp target={item.value} />
                    {item.suffix}
                  </>
                ) : (
                  item.staticLabel
                )}
              </div>

              {/* Label */}
              <p className="font-semibold text-gray-800 text-sm mb-1">{item.label}</p>

              {/* Sub */}
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}