"use client";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #E6F4F2 0%, #fff 45%, #E0F2FE 100%)",
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,130,120,.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,.08) 0%, transparent 70%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,130,120,.12) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Pill */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{ background: "rgba(15,130,120,.12)", color: "#0F8278", border: "1px solid rgba(15,130,120,.2)" }}
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
          Free Consultation Available
        </div>

        {/* Headline */}
        <h2
          className="font-bold text-gray-900 mb-5"
          style={{
            fontFamily: "var(--font-cormorant, 'Georgia', serif)",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            lineHeight: 1.12,
            letterSpacing: "-.025em",
          }}
        >
          Ready for a <em style={{ color: "#0F8278", fontStyle: "italic" }}>Healthier Smile?</em>
        </h2>

        <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Book your dental consultation today and take the first step towards a brighter, healthier smile — our team is ready to care for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0F8278, #096158)",
              boxShadow: "0 8px 24px rgba(15,130,120,.35)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,130,120,.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,130,120,.35)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Appointment
          </a>

          <a
            href="https://wa.me/911234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95"
            style={{
              background: "#fff",
              color: "#128C7E",
              border: "2px solid #128C7E",
              boxShadow: "0 4px 16px rgba(18,140,126,.15)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "#F0FDF4";
              e.currentTarget.style.boxShadow = "0 14px 32px rgba(18,140,126,.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(18,140,126,.15)";
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Chat
          </a>
        </div>

        {/* Trust micro-strip */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "🕐", text: "Same-day appointments" },
            { icon: "💳", text: "Flexible EMI options" },
            { icon: "🏆", text: "ISO certified clinic" },
            { icon: "📞", text: "24/7 emergency line" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-gray-500">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}