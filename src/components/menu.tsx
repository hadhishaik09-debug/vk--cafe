import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import { useMenu } from "@/hooks/use-menu";
import { formatPrice } from "@/lib/utils";

export function Menu() {
  const { menu, tabs, loading } = useMenu();
  const [active, setActive] = useState<string>("");
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (tabs.length > 0 && !active) {
      setActive(tabs[0]);
    }
  }, [tabs, active]);

  // Always render the base section so the layout and headings don't jump or disappear

  return (
    <section
      id="menu"
      className="relative py-32 md:py-48 px-6"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--latte) 35%, var(--ivory)) 30%, color-mix(in oklab, var(--latte) 35%, var(--ivory)) 70%, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Menu"
          title="Crafted simply. Served slowly."
          align="center"
        />

        <div ref={ref} className="reveal mt-16 md:mt-20">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-16 max-w-3xl mx-auto">
            {(tabs || []).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-5 md:px-6 py-3 text-[11px] md:text-xs tracking-soft uppercase rounded-full transition-all duration-700 ${active === tab
                  ? "bg-cocoa text-ivory shadow-[0_10px_30px_-10px_var(--cocoa)]"
                  : "text-cocoa/65 hover:text-cocoa hover:bg-ivory/60"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-1 max-w-5xl mx-auto min-h-[400px]">
            {loading ? (
              <div className="col-span-1 md:col-span-2 flex justify-center items-center h-40">
                <span className="text-cocoa/40 tracking-widest text-sm uppercase">Loading Menu...</span>
              </div>
            ) : (menu?.[active] || []).length === 0 ? (
              <div className="col-span-1 md:col-span-2 flex justify-center items-center h-40">
                <span className="text-cocoa/40 tracking-widest text-sm uppercase">Currently Unavailable</span>
              </div>
            ) : (menu?.[active] || []).map((item, i) => (
              <div
                key={item.id || item.name}
                className="group flex items-baseline gap-4 py-5 border-b border-cocoa/10"
                style={{ animation: `soft-rise 0.8s ease-out ${i * 60}ms both` }}
              >
                <span className="text-cocoa text-base md:text-lg font-light group-hover:text-champagne transition-colors duration-500">
                  {item.name}
                </span>
                <span className="flex-1 border-b border-dotted border-cocoa/20 translate-y-[-4px]" />
                <span className="font-display text-cocoa/80 text-base md:text-lg">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
