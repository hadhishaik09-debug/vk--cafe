import { useReveal } from "@/hooks/use-reveal";
import { SectionHeader } from "./section-header";
import { useSettings } from "@/hooks/use-settings";

export function Location() {
  const ref = useReveal<HTMLDivElement>();
  const { settings } = useSettings();
  return (
    <section className="relative py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <SectionHeader
            eyebrow="Find Us"
            title="A quiet corner, waiting for you."
            subtitle="Visit us in person — for the slow conversations, the warm light, and the first sip you'll remember."
          />
          <div className="mt-10 space-y-3 text-cocoa/75 font-light">
            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>
              <span className="max-w-[280px]">{settings.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>
              <span>{settings.timings || "Open daily · 11:00 — 23:00"}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-champagne mt-1">·</span>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="hover:text-champagne transition-colors"
              >
                {settings.phone}
              </a>
            </div>
          </div>
          <div className="mt-10">
            <a
              href={settings.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe btn-luxe-ghost"
            >
              Open in Maps
            </a>
          </div>
        </div>

        <div
          ref={ref}
          className="reveal relative rounded-3xl overflow-hidden card-luxe aspect-[4/5] md:aspect-square"
        >
          <iframe
            title={`${settings.businessName} location`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(settings.businessName)}&output=embed`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "saturate(0.7) contrast(0.95)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, color-mix(in oklab, var(--ivory) 40%, transparent) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
