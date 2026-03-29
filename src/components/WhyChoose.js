"use client";

const reasons = [
  {
    title: "Painless Treatments",
    desc: "Advanced anesthetic protocols and gentle techniques ensure every procedure is comfortable, even for the most anxious patients.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    color: "#EF4444",
    bg: "#FEF2F2",
    stat: "100%",
    statLabel: "Pain-free record",
  },
  {
    title: "Modern Dental Technology",
    desc: "Digital X-rays, 3D cone beam scans, CAD/CAM same-day crowns and laser dentistry for precise, efficient care.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 10 10 7 13 10 17 6" />
      </svg>
    ),
    color: "#0EA5E9",
    bg: "#E0F2FE",
    stat: "3D",
    statLabel: "Imaging & planning",
  },
  {
    title: "Friendly Environment",
    desc: "A warm, welcoming clinic designed to soothe dental anxiety — from our calming decor to our kind, patient team.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: "#0F8278",
    bg: "#E6F4F2",
    stat: "4.9★",
    statLabel: "Ambience rating",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs or surprise bills. We provide clear treatment plans with itemised pricing and flexible EMI options.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    color: "#7C4DFF",
    bg: "#EDE7FF",
    stat: "0",
    statLabel: "Hidden charges",
  },
];

export default function WhyChoose() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0F8278 0%, #096158 50%, #064F48 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,255,255,.07) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,255,255,.05) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.9)", backdropFilter: "blur(8px)" }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              Why Choose Us
            </div>
            <h2
              className="font-bold text-white mb-4"
              style={{
                fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
              }}
            >
              The BrightSmile<br />
              <em className="font-normal" style={{ color: "rgba(255,255,255,.75)", fontStyle: "italic" }}>Difference</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.75, fontSize: ".95rem", maxWidth: "400px" }}>
              We built a clinic where excellence meets compassion — every process, technology, and team member chosen with your comfort in mind.
            </p>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "12+", l: "Years Practice" },
              { n: "5K+", l: "Smiles Created" },
              { n: "98%", l: "Patient Retention" },
              { n: "24h", l: "Emergency Line" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center py-6 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.15)" }}
              >
                <span
                  className="font-bold text-white"
                  style={{ fontFamily: "var(--font-cormorant, 'Georgia', serif)", fontSize: "2rem", lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,.6)", letterSpacing: ".06em" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reason cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group relative flex flex-col p-7 rounded-3xl cursor-default overflow-hidden"
              style={{
                background: "rgba(255,255,255,.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,.18)",
                transition: "transform .35s cubic-bezier(.34,1.56,.64,1), background .25s ease, box-shadow .35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.background = "rgba(255,255,255,.18)";
                e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,0,0,.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Large bg stat */}
              <div
                className="absolute -bottom-2 -right-2 font-bold opacity-10 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-cormorant, 'Georgia', serif)",
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: "#fff",
                }}
              >
                {r.stat}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: r.bg, color: r.color }}
              >
                {r.icon}
              </div>

              <h3 className="font-semibold text-white text-base mb-3">{r.title}</h3>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".8rem", lineHeight: 1.7 }}>{r.desc}</p>

              {/* Stat chip */}
              <div className="flex items-center gap-2 mt-5">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: r.bg, color: r.color }}
                >
                  {r.stat}
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,.5)" }}>{r.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}