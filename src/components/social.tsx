import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import { useSettings } from "@/hooks/use-settings";

const TILES = Array.from({ length: 6 }).map((_, i) => i);

export function Social() {
  const ref = useReveal<HTMLDivElement>();
  const { settings } = useSettings();
  return (
    <section className="relative py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Follow Our Vibe"
          title="A look inside the moments."
          align="center"
        />

        <div
          ref={ref}
          className="reveal mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {TILES.map((i) => (
            <a
              key={i}
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="group aspect-square rounded-2xl overflow-hidden relative card-luxe"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: [
                    "linear-gradient(135deg, color-mix(in oklab, var(--champagne) 50%, var(--ivory)), color-mix(in oklab, var(--latte) 70%, var(--ivory)))",
                    "linear-gradient(135deg, color-mix(in oklab, var(--latte) 80%, var(--ivory)), color-mix(in oklab, var(--cocoa) 25%, var(--ivory)))",
                    "linear-gradient(135deg, color-mix(in oklab, var(--cocoa) 18%, var(--ivory)), color-mix(in oklab, var(--champagne) 35%, var(--ivory)))",
                    "linear-gradient(135deg, color-mix(in oklab, var(--ivory) 90%, transparent), color-mix(in oklab, var(--champagne) 55%, var(--ivory)))",
                    "linear-gradient(135deg, color-mix(in oklab, var(--latte) 90%, var(--ivory)), color-mix(in oklab, var(--cocoa) 30%, var(--ivory)))",
                    "linear-gradient(135deg, color-mix(in oklab, var(--champagne) 40%, var(--ivory)), var(--ivory))",
                  ][i % 6],
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[10px] tracking-luxe uppercase text-cocoa/80 glass rounded-full px-3 py-1.5">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-luxe uppercase text-cocoa/65 hover:text-champagne transition-colors"
          >
            @{settings.businessName.toLowerCase().replace(/\s/g, ".")} — Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
