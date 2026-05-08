import { useReveal } from "@/hooks/use-reveal";
import { useSettings } from "@/hooks/use-settings";

export function Order() {
  const ref = useReveal<HTMLDivElement>();
  const ref2 = useReveal<HTMLDivElement>();
  const { settings, getWaLink } = useSettings();

  return (
    <section
      id="order"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Soft champagne glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--champagne) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div ref={ref} className="reveal">
          <p className="text-[11px] tracking-luxe uppercase text-champagne mb-6">
            — Delivered To You
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-cocoa text-balance">
            Craving something now?
          </h2>
          <p className="mt-6 text-cocoa/65 text-base md:text-lg font-light max-w-lg mx-auto">
            Have your favourites brought to your door — without leaving the moment.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={settings.swiggy}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe btn-luxe-primary w-full sm:w-auto"
            >
              Order on Swiggy
            </a>
            <a
              href={settings.zomato}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe btn-luxe-ghost w-full sm:w-auto"
            >
              Order on Zomato
            </a>
          </div>
        </div>

        <div
          ref={ref2}
          className="reveal mt-32 pt-20 border-t border-cocoa/10"
        >
          <p className="text-[11px] tracking-luxe uppercase text-champagne mb-4">
            — Private Hospitality
          </p>
          <h3 className="font-display text-3xl md:text-5xl text-cocoa">
            Bulk Orders & Private Events
          </h3>
          <p className="mt-5 text-cocoa/65 font-light max-w-lg mx-auto">
            From intimate gatherings to grand celebrations — let us craft the moment for you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={getWaLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe btn-luxe-primary"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="btn-luxe btn-luxe-ghost"
            >
              Call {settings.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
