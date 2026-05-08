export function UnicornBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Luxury Gradient Background */}
      <div
        className="absolute inset-0 animate-hero-zoom"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(201,164,106,0.18), transparent 60%),
            radial-gradient(ellipse 70% 70% at 75% 75%, rgba(245,235,220,0.16), transparent 65%),
            linear-gradient(135deg, #F8F5F0, #EDE3D2)
          `,
        }}
      />

      {/* Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              background:
                "radial-gradient(circle, rgba(201,164,106,0.7), transparent 70%)",
              filter: "blur(2px)",
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Soft Glow */}
      <div
        className="absolute inset-0 pointer-events-none animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,164,106,0.18), transparent 70%)",
        }}
      />

      {/* Bottom Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </div>
  );
}