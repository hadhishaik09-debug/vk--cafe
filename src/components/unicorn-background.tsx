import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
  }
}

export function UnicornBackground({ projectId }: { projectId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const SCRIPT_ID = "unicorn-studio-script";
    const init = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
      setTimeout(() => setLoaded(true), 200);
    };
    if (document.getElementById(SCRIPT_ID)) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Soft luxury gradient base — visible as fallback and underlay */}
      <div
        className="absolute inset-0 animate-hero-zoom"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 30%, color-mix(in oklab, var(--champagne) 35%, transparent), transparent 60%),
            radial-gradient(ellipse 70% 70% at 75% 75%, color-mix(in oklab, var(--latte) 80%, transparent), transparent 65%),
            linear-gradient(135deg, var(--ivory), color-mix(in oklab, var(--latte) 60%, var(--ivory)))
          `,
        }}
      />
      <div
        ref={containerRef}
        data-us-project={projectId}
        className={`absolute inset-0 transition-opacity duration-[2400ms] ease-out ${
          loaded ? "opacity-90" : "opacity-0"
        }`}
        style={{ width: "100%", height: "100%", mixBlendMode: "soft-light" }}
      />
      {/* Floating ambient particles */}
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
                "radial-gradient(circle, color-mix(in oklab, var(--champagne) 80%, white), transparent 70%)",
              filter: "blur(2px)",
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
      {/* Soft light bloom from top */}
      <div
        className="absolute inset-0 pointer-events-none animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklab, var(--champagne) 40%, transparent), transparent 70%)",
        }}
      />
      {/* Bottom fade */}
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
